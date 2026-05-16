import { Router, type Request, type Response } from "express";
import { eq } from "drizzle-orm";
import { db, schema } from "../db";
import {
  registerEmailSchema,
  loginEmailSchema,
  requestOtpSchema,
  verifyOtpSchema,
} from "../../shared/schema";
import { hashPassword, verifyPassword } from "../auth/password";
import { signSession, setSessionCookie, clearSessionCookie, readSession } from "../auth/jwt";
import { issueOtp, consumeOtp, deliverOtpDev } from "../auth/otp";
import { buildAuthUrl, exchangeCode, newState, getConfig } from "../auth/google";
import { sendWelcome } from "../auth/welcome";

export const authRouter = Router();

function publicUser(u: typeof schema.users.$inferSelect) {
  return {
    id: u.id,
    email: u.email,
    phone: u.phone,
    name: u.name,
    avatarUrl: u.avatarUrl,
    emailVerified: u.emailVerified,
    phoneVerified: u.phoneVerified,
  };
}

// ─── Email + password ─────────────────────────────────────────────

authRouter.post("/register", async (req: Request, res: Response) => {
  const parsed = registerEmailSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Données invalides" });
  }
  const { email, password, name } = parsed.data;

  const existing = await db.select().from(schema.users).where(eq(schema.users.email, email)).limit(1);
  if (existing[0]) return res.status(409).json({ error: "Cet email est déjà utilisé" });

  const passwordHash = await hashPassword(password);
  const [user] = await db
    .insert(schema.users)
    .values({ email, passwordHash, name: name ?? null })
    .returning();

  sendWelcome(user).catch((e) => console.error("[welcome]", e));

  const token = signSession({ uid: user.id, email: user.email });
  setSessionCookie(res, token);
  res.status(201).json({ user: publicUser(user) });
});

authRouter.post("/login", async (req: Request, res: Response) => {
  const parsed = loginEmailSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Identifiants invalides" });
  }
  const { email, password } = parsed.data;

  const [user] = await db.select().from(schema.users).where(eq(schema.users.email, email)).limit(1);
  if (!user || !user.passwordHash) {
    return res.status(401).json({ error: "Identifiants invalides" });
  }
  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Identifiants invalides" });

  const token = signSession({ uid: user.id, email: user.email });
  setSessionCookie(res, token);
  res.json({ user: publicUser(user) });
});

// ─── Phone + OTP ──────────────────────────────────────────────────

authRouter.post("/phone/request-otp", async (req: Request, res: Response) => {
  const parsed = requestOtpSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Numéro invalide" });
  }
  const { phone } = parsed.data;
  const { code } = await issueOtp(phone);
  deliverOtpDev(phone, code);
  res.json({ ok: true, devHint: "Code affiché dans la console du serveur" });
});

authRouter.post("/phone/verify-otp", async (req: Request, res: Response) => {
  const parsed = verifyOtpSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Données invalides" });
  }
  const { phone, code, name } = parsed.data;

  const ok = await consumeOtp(phone, code);
  if (!ok) return res.status(401).json({ error: "Code invalide ou expiré" });

  let [user] = await db.select().from(schema.users).where(eq(schema.users.phone, phone)).limit(1);
  let isNewUser = false;
  if (!user) {
    isNewUser = true;
    [user] = await db
      .insert(schema.users)
      .values({ phone, name: name ?? null, phoneVerified: true })
      .returning();
  } else if (!user.phoneVerified) {
    [user] = await db
      .update(schema.users)
      .set({ phoneVerified: true })
      .where(eq(schema.users.id, user.id))
      .returning();
  }

  if (isNewUser) sendWelcome(user).catch((e) => console.error("[welcome]", e));

  const token = signSession({ uid: user.id, phone: user.phone });
  setSessionCookie(res, token);
  res.json({ user: publicUser(user) });
});

// ─── Google OAuth ─────────────────────────────────────────────────

const STATE_COOKIE = "sh_oauth_state";

authRouter.get("/config", (_req: Request, res: Response) => {
  res.json({ google: !!getConfig() });
});

authRouter.get("/google", (req: Request, res: Response) => {
  const appOrigin = process.env.APP_ORIGIN || "http://localhost:3000";
  if (!getConfig()) {
    return res.redirect(`${appOrigin}/login?error=google_not_configured`);
  }
  const state = newState();
  res.cookie(STATE_COOKIE, state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 10 * 60 * 1000,
    path: "/",
  });
  const url = buildAuthUrl(state)!;
  res.redirect(url);
});

authRouter.get("/google/callback", async (req: Request, res: Response) => {
  const appOrigin = process.env.APP_ORIGIN || "http://localhost:3000";
  try {
    const { code, state } = req.query as { code?: string; state?: string };
    const cookieState = req.cookies?.[STATE_COOKIE];
    res.clearCookie(STATE_COOKIE, { path: "/" });
    if (!code || !state || !cookieState || state !== cookieState) {
      return res.redirect(`${appOrigin}/login?error=oauth_state`);
    }

    const profile = await exchangeCode(code);
    if (!profile.email) return res.redirect(`${appOrigin}/login?error=oauth_email`);

    let [user] = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.googleId, profile.sub))
      .limit(1);

    let isNewUser = false;
    if (!user) {
      // Link to existing email account if any
      [user] = await db.select().from(schema.users).where(eq(schema.users.email, profile.email)).limit(1);
      if (user) {
        [user] = await db
          .update(schema.users)
          .set({
            googleId: profile.sub,
            emailVerified: true,
            name: user.name ?? profile.name ?? null,
            avatarUrl: user.avatarUrl ?? profile.picture ?? null,
          })
          .where(eq(schema.users.id, user.id))
          .returning();
      } else {
        isNewUser = true;
        [user] = await db
          .insert(schema.users)
          .values({
            email: profile.email,
            googleId: profile.sub,
            name: profile.name ?? null,
            avatarUrl: profile.picture ?? null,
            emailVerified: true,
          })
          .returning();
      }
    }

    if (isNewUser) sendWelcome(user).catch((e) => console.error("[welcome]", e));

    const token = signSession({ uid: user.id, email: user.email });
    setSessionCookie(res, token);
    res.redirect(`${appOrigin}/`);
  } catch (e) {
    console.error("[google/callback]", e);
    res.redirect(`${appOrigin}/login?error=oauth_failed`);
  }
});

// ─── Session ──────────────────────────────────────────────────────

authRouter.get("/me", async (req: Request, res: Response) => {
  const sess = readSession(req);
  if (!sess) return res.json({ user: null });
  const [user] = await db.select().from(schema.users).where(eq(schema.users.id, sess.uid)).limit(1);
  if (!user) return res.json({ user: null });
  res.json({ user: publicUser(user) });
});

authRouter.post("/logout", (_req: Request, res: Response) => {
  clearSessionCookie(res);
  res.json({ ok: true });
});

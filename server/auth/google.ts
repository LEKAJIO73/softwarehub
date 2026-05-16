import crypto from "crypto";
import { ProxyAgent, type Dispatcher } from "undici";

const AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";

const proxyUrl = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
const dispatcher: Dispatcher | undefined = proxyUrl ? new ProxyAgent(proxyUrl) : undefined;
if (proxyUrl) console.log(`[google] using proxy ${proxyUrl}`);

const SCOPES = ["openid", "email", "profile"];

export interface GoogleProfile {
  sub: string;
  email: string;
  email_verified: boolean;
  name?: string;
  picture?: string;
}

export function getConfig() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;
  if (!clientId || !clientSecret || !redirectUri) return null;
  return { clientId, clientSecret, redirectUri };
}

export function buildAuthUrl(state: string): string | null {
  const cfg = getConfig();
  if (!cfg) return null;
  const params = new URLSearchParams({
    client_id: cfg.clientId,
    redirect_uri: cfg.redirectUri,
    response_type: "code",
    scope: SCOPES.join(" "),
    state,
    access_type: "offline",
    prompt: "consent",
  });
  return `${AUTH_URL}?${params.toString()}`;
}

export function newState(): string {
  return crypto.randomBytes(24).toString("hex");
}

export async function exchangeCode(code: string): Promise<GoogleProfile> {
  const cfg = getConfig();
  if (!cfg) throw new Error("Google OAuth not configured");

  const body = new URLSearchParams({
    code,
    client_id: cfg.clientId,
    client_secret: cfg.clientSecret,
    redirect_uri: cfg.redirectUri,
    grant_type: "authorization_code",
  });

  const tokenResp = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
    // @ts-expect-error undici dispatcher option
    dispatcher,
  });
  if (!tokenResp.ok) {
    throw new Error(`Google token exchange failed: ${await tokenResp.text()}`);
  }
  const { access_token } = (await tokenResp.json()) as { access_token: string };

  const profileResp = await fetch(USERINFO_URL, {
    headers: { Authorization: `Bearer ${access_token}` },
    // @ts-expect-error undici dispatcher option
    dispatcher,
  });
  if (!profileResp.ok) {
    throw new Error(`Google userinfo failed: ${await profileResp.text()}`);
  }
  return (await profileResp.json()) as GoogleProfile;
}

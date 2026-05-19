import { pgTable, serial, text, timestamp, boolean, integer, index, uniqueIndex } from "drizzle-orm/pg-core";
import { z } from "zod";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    email: text("email"),
    phone: text("phone"),
    name: text("name"),
    avatarUrl: text("avatar_url"),
    passwordHash: text("password_hash"),
    googleId: text("google_id"),
    emailVerified: boolean("email_verified").default(false).notNull(),
    phoneVerified: boolean("phone_verified").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => ({
    emailIdx: uniqueIndex("users_email_idx").on(t.email),
    phoneIdx: uniqueIndex("users_phone_idx").on(t.phone),
    googleIdx: uniqueIndex("users_google_idx").on(t.googleId),
  }),
);

export const otpCodes = pgTable(
  "otp_codes",
  {
    id: serial("id").primaryKey(),
    phone: text("phone").notNull(),
    codeHash: text("code_hash").notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    consumed: boolean("consumed").default(false).notNull(),
    attempts: integer("attempts").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => ({
    phoneIdx: index("otp_phone_idx").on(t.phone),
  }),
);

export const orders = pgTable(
  "orders",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id),
    productId: text("product_id").notNull(),
    productName: text("product_name").notNull(),
    amountXaf: integer("amount_xaf").notNull(),
    currency: text("currency").default("XAF").notNull(),
    phone: text("phone"),
    status: text("status").default("pending").notNull(), // pending | paid | failed | cancelled
    provider: text("provider").default("notchpay").notNull(),
    providerRef: text("provider_ref"),
    checkoutUrl: text("checkout_url"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    paidAt: timestamp("paid_at", { withTimezone: true }),
  },
  (t) => ({
    userIdx: index("orders_user_idx").on(t.userId),
    refIdx: index("orders_ref_idx").on(t.providerRef),
  }),
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;

// ─── Zod schemas (shared validation) ────────────────────────────

export const emailSchema = z.string().email("Email invalide");
export const passwordSchema = z
  .string()
  .min(8, "Le mot de passe doit contenir au moins 8 caractères")
  .max(128);

export const phoneSchema = z
  .string()
  .regex(/^\+[1-9]\d{6,14}$/, "Numéro invalide (format international, ex: +33612345678)");

export const registerEmailSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().min(1).max(80).optional(),
});

export const loginEmailSchema = z.object({
  email: emailSchema,
  password: z.string().min(1),
});

export const requestOtpSchema = z.object({
  phone: phoneSchema,
});

export const verifyOtpSchema = z.object({
  phone: phoneSchema,
  code: z.string().regex(/^\d{6}$/, "Code à 6 chiffres"),
  name: z.string().min(1).max(80).optional(),
});

export type RegisterEmailInput = z.infer<typeof registerEmailSchema>;
export type LoginEmailInput = z.infer<typeof loginEmailSchema>;
export type RequestOtpInput = z.infer<typeof requestOtpSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;

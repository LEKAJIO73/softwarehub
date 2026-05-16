import { sqliteTable, integer, text, index, uniqueIndex } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { z } from "zod";

export const users = sqliteTable(
  "users",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    email: text("email"),
    phone: text("phone"),
    name: text("name"),
    avatarUrl: text("avatar_url"),
    passwordHash: text("password_hash"),
    googleId: text("google_id"),
    emailVerified: integer("email_verified", { mode: "boolean" }).default(false).notNull(),
    phoneVerified: integer("phone_verified", { mode: "boolean" }).default(false).notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
  },
  (t) => ({
    emailIdx: uniqueIndex("users_email_idx").on(t.email),
    phoneIdx: uniqueIndex("users_phone_idx").on(t.phone),
    googleIdx: uniqueIndex("users_google_idx").on(t.googleId),
  }),
);

export const otpCodes = sqliteTable(
  "otp_codes",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    phone: text("phone").notNull(),
    codeHash: text("code_hash").notNull(),
    expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
    consumed: integer("consumed", { mode: "boolean" }).default(false).notNull(),
    attempts: integer("attempts").default(0).notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
  },
  (t) => ({
    phoneIdx: index("otp_phone_idx").on(t.phone),
  }),
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

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

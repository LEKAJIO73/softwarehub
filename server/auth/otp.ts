import bcrypt from "bcryptjs";
import { eq, and, gt } from "drizzle-orm";
import { db, schema } from "../db";

const OTP_TTL_MS = 5 * 60 * 1000;

export function generateCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function issueOtp(phone: string): Promise<{ code: string; expiresAt: Date }> {
  const code = generateCode();
  const codeHash = await bcrypt.hash(code, 8);
  const expiresAt = new Date(Date.now() + OTP_TTL_MS);

  await db.insert(schema.otpCodes).values({
    phone,
    codeHash,
    expiresAt,
  });

  return { code, expiresAt };
}

export async function consumeOtp(phone: string, code: string): Promise<boolean> {
  const rows = await db
    .select()
    .from(schema.otpCodes)
    .where(
      and(
        eq(schema.otpCodes.phone, phone),
        eq(schema.otpCodes.consumed, false),
        gt(schema.otpCodes.expiresAt, new Date()),
      ),
    )
    .orderBy(schema.otpCodes.createdAt);

  // Try newest first
  for (let i = rows.length - 1; i >= 0; i--) {
    const row = rows[i];
    if (await bcrypt.compare(code, row.codeHash)) {
      await db
        .update(schema.otpCodes)
        .set({ consumed: true })
        .where(eq(schema.otpCodes.id, row.id));
      return true;
    }
  }
  return false;
}

export function deliverOtpDev(phone: string, code: string) {
  const line = `[OTP] ${phone} -> ${code}  (valid 5 min)`;
  console.log("\n" + "═".repeat(60));
  console.log(line);
  console.log("═".repeat(60) + "\n");
}

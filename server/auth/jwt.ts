// @ts-nocheck
import jwt from "jsonwebtoken";
import type { Response, Request } from "express";

const SECRET = process.env.JWT_SECRET || "dev-secret-do-not-use-in-production";
const COOKIE_NAME = "sh_session";
const MAX_AGE_DAYS = 30;
const MAX_AGE_MS = MAX_AGE_DAYS * 24 * 60 * 60 * 1000;

export interface SessionPayload {
  uid: number;
  email?: string | null;
  phone?: string | null;
}

export function signSession(payload: SessionPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: `${MAX_AGE_DAYS}d` });
}

export function verifySession(token: string): SessionPayload | null {
  try {
    return jwt.verify(token, SECRET) as SessionPayload;
  } catch {
    return null;
  }
}

export function setSessionCookie(res: Response, token: string) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: MAX_AGE_MS,
    path: "/",
  });
}

export function clearSessionCookie(res: Response) {
  res.clearCookie(COOKIE_NAME, { path: "/" });
}

export function readSession(req: Request): SessionPayload | null {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return null;
  return verifySession(token);
}

export { COOKIE_NAME };

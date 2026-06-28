import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const COOKIE_NAME = "dkl_token";

/**
 * Defer JWT_SECRET lookup to call-time, not module-init time.
 * Prevents Next.js build failure when JWT_SECRET is absent in Docker build context.
 */
function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error(
      "JWT_SECRET is not set. Add it to .env.local or as a runtime environment variable."
    );
  }
  return secret;
}

/* ── JWT ──────────────────────────────────────────────────── */

export interface JwtPayload {
  sub: string; // user id
  email: string;
  name: string;
  picture?: string;
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, getJwtSecret()) as JwtPayload;
  } catch {
    return null;
  }
}

/* ── Cookie helpers (Server Components / Route Handlers) ──── */

export async function setAuthCookie(token: string): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAuthCookie(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function getTokenFromCookie(): Promise<string | null> {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value ?? null;
}

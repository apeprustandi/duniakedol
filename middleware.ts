import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "dkl_token";

/* ── Routes ───────────────────────────────────────────────── */
/**
 * Routes that require authentication.
 * Unauthenticated users are redirected to /login.
 */
const PROTECTED_PREFIXES = ["/dashboard", "/materi", "/challenges", "/botlab", "/roadmap", "/settings"];

/**
 * Auth-only routes.
 * Authenticated users are redirected to /dashboard (they're already logged in).
 */
const AUTH_PREFIXES = ["/login", "/register"];

/* ── Middleware ───────────────────────────────────────────── */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isAuth = AUTH_PREFIXES.some((p) => pathname.startsWith(p));

  // Neither protected nor auth route — pass through
  if (!isProtected && !isAuth) return NextResponse.next();

  /* ── Verify JWT ─────────────────────────────────────────── */
  const token = req.cookies.get(COOKIE_NAME)?.value;
  let isValid = false;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      isValid = true;
    } catch {
      // Token expired or tampered — treat as unauthenticated
    }
  }

  /* ── Guard: Protected route, no valid session ───────────── */
  if (isProtected && !isValid) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname); // preserve intended destination
    return NextResponse.redirect(loginUrl);
  }

  /* ── Guard: Auth route, already logged in ───────────────── */
  if (isAuth && isValid) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

/* ── Matcher ──────────────────────────────────────────────── */
export const config = {
  matcher: [
    // Protected routes
    "/dashboard/:path*",
    "/materi/:path*",
    "/challenges/:path*",
    "/botlab/:path*",
    "/roadmap/:path*",
    "/settings/:path*",
    // Auth routes
    "/login",
    "/register",
  ],
};

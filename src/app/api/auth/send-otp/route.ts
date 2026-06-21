import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import {
  generateOtp,
  storeOtp,
  sendOtpEmail,
  isRateLimited,
} from "@/lib/otp";

interface UserRow {
  id: string;
}

/** Format nama ke ProperCase */
function toProperCase(str: string): string {
  return str
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export async function POST(req: NextRequest) {
  /* ── Cek Gmail env vars sebelum apapun ──────────────────── */
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error("[send-otp] GMAIL_USER atau GMAIL_APP_PASSWORD belum diset di environment.");
    return NextResponse.json(
      { error: "Konfigurasi email server belum lengkap. Hubungi admin." },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const {
      email,
      fullName,
      type,
      turnstileToken,
    } = body as {
      email?: string;
      fullName?: string;
      type?: "register" | "login";
      turnstileToken?: string;
    };

    /* ── Validasi Cloudflare Turnstile (khusus register) ────── */
    if (type === "register") {
      if (!turnstileToken) {
        return NextResponse.json(
          { error: "Verifikasi keamanan diperlukan. Selesaikan tantangan CAPTCHA." },
          { status: 400 }
        );
      }

      const secretKey = process.env.TURNSTILE_SECRET_KEY;
      if (!secretKey) {
        console.error("[send-otp] TURNSTILE_SECRET_KEY belum diset di environment.");
        return NextResponse.json(
          { error: "Konfigurasi keamanan server belum lengkap. Hubungi admin." },
          { status: 503 }
        );
      }

      const cfRes = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            secret: secretKey,
            response: turnstileToken,
            remoteip: req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? undefined,
          }),
        }
      );

      const cfData = await cfRes.json() as { success: boolean; "error-codes"?: string[] };

      if (!cfData.success) {
        console.warn("[send-otp] Turnstile gagal:", cfData["error-codes"]);
        return NextResponse.json(
          { error: "Verifikasi keamanan gagal. Coba muat ulang halaman dan ulangi." },
          { status: 403 }
        );
      }
    }

    /* ── Validation ─────────────────────────────────────────── */
    if (!email || !email.toLowerCase().endsWith("@gmail.com")) {
      return NextResponse.json(
        { error: "Email harus menggunakan akun Gmail (@gmail.com)." },
        { status: 400 }
      );
    }
    if (!type || !["register", "login"].includes(type)) {
      return NextResponse.json(
        { error: "Tipe OTP tidak valid." },
        { status: 400 }
      );
    }
    if (type === "register" && (!fullName || toProperCase(fullName).length < 2)) {
      return NextResponse.json(
        { error: "Nama lengkap minimal 2 karakter." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    /* ── Check user existence ───────────────────────────────── */
    const [existingUser] = await query<UserRow>(
      "SELECT id FROM users WHERE email = $1",
      [normalizedEmail]
    );

    if (type === "register" && existingUser) {
      return NextResponse.json(
        { error: "Email sudah terdaftar. Silakan login." },
        { status: 409 }
      );
    }
    if (type === "login" && !existingUser) {
      return NextResponse.json(
        { error: "Email belum terdaftar. Silakan daftar terlebih dahulu." },
        { status: 404 }
      );
    }

    /* ── Rate limit ─────────────────────────────────────────── */
    const limited = await isRateLimited(normalizedEmail, type);
    if (limited) {
      return NextResponse.json(
        { error: "Tunggu 60 detik sebelum meminta OTP baru." },
        { status: 429 }
      );
    }

    /* ── Generate, store & send OTP ─────────────────────────── */
    const otp = generateOtp();
    await storeOtp(normalizedEmail, otp, type);
    await sendOtpEmail(normalizedEmail, otp, type);

    return NextResponse.json({ sent: true, expiresIn: 600 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[send-otp] Error:", message);
    return NextResponse.json(
      {
        error: "Gagal mengirim OTP. Coba lagi.",
        // Detail hanya muncul di non-production untuk debugging
        ...(process.env.NODE_ENV !== "production" && { detail: message }),
      },
      { status: 500 }
    );
  }
}

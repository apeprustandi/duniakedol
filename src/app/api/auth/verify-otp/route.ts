import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyOtp, deleteOtp } from "@/lib/otp";
import { signToken, setAuthCookie } from "@/lib/auth";

interface UserRow {
  id: string;
  full_name: string;
  email: string;
  created_at: string;
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
  try {
    const body = await req.json();
    const { email, fullName, otp, type } = body as {
      email?: string;
      fullName?: string;
      otp?: string;
      type?: "register" | "login";
    };

    /* ── Validation ─────────────────────────────────────────── */
    if (!email || !otp || !type) {
      return NextResponse.json(
        { error: "Data tidak lengkap." },
        { status: 400 }
      );
    }
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        { error: "OTP harus 6 digit angka." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    /* ── Verify OTP ─────────────────────────────────────────── */
    const status = await verifyOtp(normalizedEmail, otp, type);

    if (status === "not_found") {
      return NextResponse.json(
        { error: "OTP tidak ditemukan. Minta OTP baru." },
        { status: 400 }
      );
    }
    if (status === "expired") {
      return NextResponse.json(
        { error: "OTP sudah kadaluarsa. Minta OTP baru." },
        { status: 400 }
      );
    }
    if (status === "wrong_code") {
      return NextResponse.json(
        { error: "Kode OTP salah. Periksa kembali email kamu." },
        { status: 400 }
      );
    }

    /* ── OTP valid — delete it ──────────────────────────────── */
    await deleteOtp(normalizedEmail, type);

    /* ── Register: create new user ──────────────────────────── */
    let user: UserRow;

    if (type === "register") {
      if (!fullName) {
        return NextResponse.json(
          { error: "Nama lengkap diperlukan untuk pendaftaran." },
          { status: 400 }
        );
      }
      const properName = toProperCase(fullName);
      const [created] = await query<UserRow>(
        `INSERT INTO users (full_name, email)
         VALUES ($1, $2)
         RETURNING id, full_name, email, created_at`,
        [properName, normalizedEmail]
      );
      user = created;
    } else {
      /* ── Login: lookup existing user ──────────────────────── */
      const [found] = await query<UserRow>(
        "SELECT id, full_name, email, created_at FROM users WHERE email = $1",
        [normalizedEmail]
      );
      if (!found) {
        return NextResponse.json(
          { error: "Akun tidak ditemukan." },
          { status: 404 }
        );
      }
      user = found;
    }

    /* ── Issue JWT cookie ───────────────────────────────────── */
    const token = signToken({
      sub: user.id,
      email: user.email,
      name: user.full_name,
    });
    await setAuthCookie(token);

    return NextResponse.json(
      {
        user: {
          id: user.id,
          fullName: user.full_name,
          email: user.email,
          createdAt: user.created_at,
        },
      },
      { status: type === "register" ? 201 : 200 }
    );
  } catch (err) {
    console.error("[verify-otp]", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan server. Coba lagi." },
      { status: 500 }
    );
  }
}

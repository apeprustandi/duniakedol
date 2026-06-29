import { NextResponse } from "next/server";
import { getTokenFromCookie, verifyToken } from "@/lib/auth";
import { query } from "@/lib/db";

interface UserRow {
  id: string;
  name: string;
  email: string;
  google_id: string;
  picture_url: string;
  created_at: string;
}

export async function GET() {
  try {
    const token = await getTokenFromCookie();
    if (!token) {
      return NextResponse.json({ error: "Tidak terautentikasi." }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Token tidak valid atau kadaluarsa." }, { status: 401 });
    }

    /* ── Fetch fresh user data from DB ──────────────────────── */
    const [user] = await query<UserRow>(
      "SELECT id, name, email, google_id, picture_url, created_at FROM users WHERE id = $1",
      [payload.sub]
    );

    if (!user) {
      return NextResponse.json({ error: "User tidak ditemukan." }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        googleId: user.google_id,
        pictureUrl: user.picture_url,
        createdAt: user.created_at,
      },
    });
  } catch (err) {
    console.error("[me]", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { query } from "@/lib/db";
import { setAuthCookie, signToken } from "@/lib/auth";

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

interface UserRow {
  id: string;
  name: string;
  email: string;
}

export async function POST(req: Request) {
  try {
    const { credential } = await req.json();

    if (!credential) {
      return NextResponse.json({ error: "Missing credential token" }, { status: 400 });
    }

    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return NextResponse.json({ error: "Invalid Google token" }, { status: 401 });
    }

    // Blokir akun Workspace / GSuite (memiliki hd) dan pastikan email berakhiran @gmail.com
    if (payload.hd || !payload.email.endsWith("@gmail.com")) {
      return NextResponse.json(
        { error: "Hanya akun @gmail.com standar yang diizinkan." },
        { status: 403 }
      );
    }

    const { email, name, sub: google_id, picture } = payload;

    // Gunakan UPSERT untuk mencegah race condition dan menghemat query
    const result = await query<UserRow>(
      `INSERT INTO users (email, name, google_id, picture_url)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (email) DO UPDATE 
       SET google_id = EXCLUDED.google_id, 
           name = EXCLUDED.name, 
           picture_url = EXCLUDED.picture_url
       RETURNING id, name, email`,
      [email, name, google_id, picture]
    );
    const user = result[0];

    // Create JWT token and set cookie
    const token = signToken({
      sub: user.id,
      email: user.email,
      name: user.name,
      picture: picture, // Include picture URL in the JWT payload
    });

    await setAuthCookie(token);

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    console.error("Google Auth Error:", error);
    return NextResponse.json(
      { error: "Authentication failed. " + (error.message || "") },
      { status: 500 }
    );
  }
}

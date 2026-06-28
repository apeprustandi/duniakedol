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

    // Check if user exists
    let [user] = await query<UserRow>("SELECT id, name, email FROM users WHERE email = $1", [email]);

    if (user) {
      // Update google_id and picture_url if they login with google but it was an existing email
      await query(
        "UPDATE users SET google_id = $1, name = $2, picture_url = $3 WHERE email = $4",
        [google_id, name, picture, email]
      );
    } else {
      // Create new user
      const result = await query<UserRow>(
        "INSERT INTO users (email, name, google_id, picture_url) VALUES ($1, $2, $3, $4) RETURNING id, name, email",
        [email, name, google_id, picture]
      );
      user = result[0];
    }

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

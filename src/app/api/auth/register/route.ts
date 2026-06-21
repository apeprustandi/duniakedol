import { NextResponse } from "next/server";

/** Endpoint ini sudah digantikan oleh /api/auth/send-otp + /api/auth/verify-otp */
export async function POST() {
  return NextResponse.json(
    { error: "Endpoint ini sudah tidak digunakan. Gunakan /api/auth/send-otp." },
    { status: 410 }
  );
}

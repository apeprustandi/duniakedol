"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";

/**
 * Singleton wrapper untuk Google OAuth SDK.
 * Ditempatkan di root layout agar hanya diinisialisasi sekali
 * sepanjang app lifecycle — mencegah "initialize() called multiple times".
 */
export function GoogleAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}>
      {children}
    </GoogleOAuthProvider>
  );
}

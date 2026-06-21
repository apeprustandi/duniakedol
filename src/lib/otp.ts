import nodemailer from "nodemailer";
import { randomInt } from "crypto";
import { query } from "@/lib/db";

/* ── OTP Generation ───────────────────────────────────────── */

/** Generate a cryptographically random 6-digit OTP string. */
export function generateOtp(): string {
  return String(randomInt(100000, 1000000)).padStart(6, "0");
}

/* ── Database helpers ─────────────────────────────────────── */

/**
 * Delete any existing OTPs for this email+type, then insert a new one
 * that expires in 10 minutes.
 */
export async function storeOtp(
  email: string,
  code: string,
  type: "register" | "login"
): Promise<void> {
  await query("DELETE FROM otp_codes WHERE email = $1 AND type = $2", [
    email,
    type,
  ]);
  await query(
    `INSERT INTO otp_codes (email, code, type, expires_at)
     VALUES ($1, $2, $3, NOW() + INTERVAL '10 minutes')`,
    [email, code, type]
  );
}

/** Returns true if an OTP for this email+type was created < 60 seconds ago (rate limit). */
export async function isRateLimited(
  email: string,
  type: string
): Promise<boolean> {
  const rows = await query<{ created_at: string }>(
    `SELECT created_at FROM otp_codes
     WHERE email = $1 AND type = $2
     ORDER BY created_at DESC LIMIT 1`,
    [email, type]
  );
  if (rows.length === 0) return false;
  const diffSeconds =
    (Date.now() - new Date(rows[0].created_at).getTime()) / 1000;
  return diffSeconds < 60;
}

/** Verify OTP. Returns status: valid / expired / not_found / wrong_code */
export async function verifyOtp(
  email: string,
  code: string,
  type: "register" | "login"
): Promise<"valid" | "expired" | "not_found" | "wrong_code"> {
  const rows = await query<{ code: string; expires_at: string }>(
    `SELECT code, expires_at FROM otp_codes
     WHERE email = $1 AND type = $2
     ORDER BY created_at DESC LIMIT 1`,
    [email, type]
  );

  if (rows.length === 0) return "not_found";

  const row = rows[0];
  if (new Date(row.expires_at) < new Date()) return "expired";
  if (row.code !== code) return "wrong_code";

  return "valid";
}

/** Delete OTP records for email+type after successful verification. */
export async function deleteOtp(
  email: string,
  type: string
): Promise<void> {
  await query("DELETE FROM otp_codes WHERE email = $1 AND type = $2", [
    email,
    type,
  ]);
}

/* ── Email sending ────────────────────────────────────────── */

function getMailer() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error(
      "GMAIL_USER or GMAIL_APP_PASSWORD is not set in environment variables."
    );
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

export async function sendOtpEmail(
  to: string,
  otp: string,
  type: "register" | "login"
): Promise<void> {
  const mailer = getMailer();
  const isRegister = type === "register";

  await mailer.sendMail({
    from: `"Dunia Kedol" <${process.env.GMAIL_USER}>`,    to,
    subject: isRegister
      ? "Kode OTP Pendaftaran — Dunia Kedol"
      : "Kode OTP Login — Dunia Kedol",
    html: buildEmailHtml(otp, isRegister),
  });
}

/* ── Email HTML template ──────────────────────────────────── */

function buildEmailHtml(otp: string, isRegister: boolean): string {
  const digits = otp.split("").map(
    (d) =>
      `<span style="display:inline-block;width:44px;height:52px;line-height:52px;text-align:center;font-size:28px;font-weight:700;color:#00ff88;background:#0a0f0a;border:1px solid #27272a;margin:0 4px;font-family:'Courier New',monospace;">${d}</span>`
  ).join("");

  return `<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0a0f0a;font-family:'Courier New',Courier,monospace;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f0a;padding:40px 0;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#1a1f1a;border:1px solid #27272a;max-width:520px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="padding:0;background:#0a0f0a;border-bottom:1px solid #27272a;">
            <div style="height:2px;background:linear-gradient(to right,#00ff88,transparent);"></div>
            <div style="padding:20px 32px;">
              <span style="color:#00ff88;font-size:18px;font-weight:700;letter-spacing:2px;">Dunia</span><span style="color:#f5f5f5;font-size:18px;font-weight:700;"> </span><span style="color:#a1a1aa;font-size:18px;font-weight:700;">Kedol</span>
            </div>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:36px 32px;">
            <p style="margin:0 0 8px;color:#00ff88;font-size:11px;letter-spacing:3px;text-transform:uppercase;">// ${isRegister ? "kode pendaftaran" : "kode masuk"}</p>
            <h1 style="margin:0 0 16px;color:#f5f5f5;font-size:22px;font-weight:700;">${isRegister ? "Selamat Datang di DKL! 👋" : "Verifikasi Login"}</h1>
            <p style="margin:0 0 28px;color:#a1a1aa;font-size:14px;line-height:1.6;">
              ${isRegister
      ? "Terima kasih telah mendaftar. Gunakan kode OTP berikut untuk menyelesaikan pendaftaranmu."
      : "Gunakan kode OTP berikut untuk masuk ke akun Dunia Kedol-mu."}
            </p>
            <!-- OTP Digits -->
            <div style="text-align:center;margin-bottom:28px;">
              ${digits}
            </div>
            <!-- Info box -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#0a0f0a;border:1px solid #27272a;padding:14px 18px;">
                  <p style="margin:0;color:#a1a1aa;font-size:12px;">
                    <span style="color:#00ff88;">$</span> expires_in: <span style="color:#f5f5f5;">10 menit</span>
                  </p>
                  <p style="margin:6px 0 0;color:#52525b;font-size:11px;">Jangan bagikan kode ini kepada siapapun.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:20px 32px;border-top:1px solid #27272a;">
            <p style="margin:0;color:#52525b;font-size:11px;text-align:center;">
              Email ini dikirim otomatis oleh sistem Dunia Kedol. Jika kamu tidak merasa memintanya, abaikan saja.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

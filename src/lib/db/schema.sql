-- ============================================================
-- Jalankan di Neon SQL Editor: https://console.neon.tech
-- Project → SQL Editor → paste dan run
-- ============================================================

-- Tabel users (tanpa password — auth via OTP email)
CREATE TABLE IF NOT EXISTS users (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name  TEXT NOT NULL,
  email      TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS users_email_idx ON users (email);

-- Tabel OTP codes
CREATE TABLE IF NOT EXISTS otp_codes (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT NOT NULL,
  code       TEXT NOT NULL,
  type       TEXT NOT NULL CHECK (type IN ('register', 'login')),
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS otp_email_idx ON otp_codes (email);

-- ============================================================
-- Jika tabel users SUDAH ADA dengan kolom password, jalankan:
-- ALTER TABLE users DROP COLUMN IF EXISTS password;
-- ============================================================

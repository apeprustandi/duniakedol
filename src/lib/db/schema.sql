-- ============================================================
-- Jalankan di Neon SQL Editor: https://console.neon.tech
-- Project → SQL Editor → paste dan run
-- ============================================================

-- Tabel users
CREATE TABLE IF NOT EXISTS users (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  email      TEXT UNIQUE NOT NULL,
  google_id  TEXT UNIQUE,
  picture_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS users_email_idx ON users (email);
CREATE INDEX IF NOT EXISTS users_google_id_idx ON users (google_id);

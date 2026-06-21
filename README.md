# Dunia Kedol (DKL)

> Komunitas belajar Node.js & automasi web — materi terstruktur, challenges, Bot Lab, dan komunitas aktif.

![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?logo=tailwindcss&logoColor=white)
![Neon](https://img.shields.io/badge/Neon-PostgreSQL-00E5CC?logo=postgresql&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-Gmail_OTP-EA4335?logo=gmail&logoColor=white)
![Cloudflare Turnstile](https://img.shields.io/badge/Cloudflare-Turnstile-F38020?logo=cloudflare&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📖 Tentang Proyek

**Dunia Kedol (DKL)** adalah platform komunitas berbasis web untuk belajar Node.js dan automasi web secara bersama-sama — lewat materi terstruktur, automation challenges, Bot Lab, dan forum diskusi yang aktif.

Dibangun menggunakan **Next.js 16 App Router**, **React 19**, **TypeScript**, dan **Tailwind CSS v4**, dengan:
- Tampilan dark-mode menggunakan font **JetBrains Mono** dan efek partikel animasi interaktif
- Sistem autentikasi **tanpa password** — login & register menggunakan **OTP 6 digit via Gmail** (Nodemailer)
- Halaman **dashboard** member yang dilindungi middleware Edge Runtime
- Custom 404 / halaman "fitur dalam pengembangan" dengan progress tracker

---

## 🚀 Tech Stack

| Teknologi | Versi | Keterangan |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.2.9 | Framework React dengan App Router |
| [React](https://react.dev) | 19.2.4 | UI library |
| [TypeScript](https://www.typescriptlang.org) | 5.x | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | 4.x | Utility-first CSS |
| [Neon](https://neon.tech) | serverless | PostgreSQL database |
| [Nodemailer](https://nodemailer.com) | ^6.x | Kirim OTP via Gmail SMTP |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | ^9.x | JWT session (API Routes) |
| [jose](https://github.com/panva/jose) | ^6.x | JWT verification (Edge middleware) |
| [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) | — | Font utama via `next/font/google` |
| [React Icons](https://react-icons.github.io) | ^5.6.0 | Icon library |
| [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile) | — | CAPTCHA-free bot protection pada form register |

---

## 📁 Struktur Proyek

```
etl-clone/
├── middleware.ts                       # Edge JWT guard — proteksi route
├── src/
│   ├── app/
│   │   ├── (marketing)/                # Route group: landing page
│   │   │   ├── layout.tsx              # Layout dengan Navbar, Footer, Particle
│   │   │   └── page.tsx                # Halaman utama (/)
│   │   ├── (auth)/                     # Route group: login & register
│   │   │   ├── layout.tsx              # Layout minimal tanpa Navbar
│   │   │   ├── login/page.tsx          # Halaman login via OTP (/login)
│   │   │   └── register/page.tsx       # Halaman register via OTP (/register)
│   │   ├── (protected)/                # Route group: halaman yang butuh auth
│   │   │   ├── layout.tsx              # Layout dashboard (sidebar)
│   │   │   └── dashboard/page.tsx      # Halaman dashboard (/dashboard)
│   │   ├── api/
│   │   │   └── auth/
│   │   │       ├── send-otp/route.ts   # POST /api/auth/send-otp
│   │   │       ├── verify-otp/route.ts # POST /api/auth/verify-otp
│   │   │       ├── logout/route.ts     # POST /api/auth/logout
│   │   │       └── me/route.ts         # GET  /api/auth/me
│   │   ├── not-found.tsx               # Custom 404 / coming-soon page
│   │   ├── globals.css                 # Global styles & animasi
│   │   └── layout.tsx                  # Root layout (html, font, ToastProvider)
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── DashboardSidebar.tsx    # Sidebar responsif + logout
│   │   │   ├── DashboardTopbar.tsx     # Topbar dengan user info
│   │   │   └── StatCard.tsx            # Kartu statistik reusable
│   │   ├── layout/
│   │   │   ├── Navbar.tsx              # Navigation bar landing
│   │   │   └── Footer.tsx              # Footer landing
│   │   ├── sections/                   # Seksi-seksi landing page
│   │   └── ui/
│   │       └── ToastProvider.tsx       # Toast notification system
│   └── lib/
│       ├── auth.ts                     # JWT + cookie helpers
│       ├── db.ts                       # Neon serverless client wrapper
│       ├── otp.ts                      # OTP service (generate, store, verify, email)
│       ├── db/
│       │   └── schema.sql              # Skema tabel users + otp_codes
│       └── types/
│           └── index.ts                # Shared TypeScript interfaces
├── public/
├── Dockerfile
├── docker-compose.yml
├── next.config.ts
└── package.json
```

---

## 🔐 Sistem Autentikasi (OTP Email)

DKL menggunakan autentikasi **passwordless** — tidak ada password yang disimpan. Login dan register menggunakan **OTP 6 digit** yang dikirim ke Gmail.

### Alur Register
```
1. User isi Nama Lengkap + Email @gmail.com
2. Selesaikan Cloudflare Turnstile (verifikasi keamanan anti-bot)
3. Klik [Kirim OTP] → POST /api/auth/send-otp {fullName, email, type:"register", turnstileToken}
   ├─ Validasi Turnstile token ke Cloudflare siteverify API
   ├─ Validasi email @gmail.com & nama minimal 2 karakter
   ├─ Cek email belum terdaftar
   ├─ Rate limit: tolak jika OTP dikirim < 60 detik yang lalu
   ├─ Generate OTP 6 digit (crypto.randomInt)
   ├─ Simpan di tabel otp_codes (expires 10 menit)
   └─ Kirim email via Nodemailer (Gmail SMTP)
4. User isi 6 kotak OTP (auto-focus, support paste)
5. Klik [Verifikasi] → POST /api/auth/verify-otp {fullName, email, otp, type:"register"}
   ├─ Verifikasi OTP valid & belum expired
   ├─ INSERT user ke tabel users (nama diformat ProperCase)
   ├─ Hapus OTP dari DB
   └─ Set JWT cookie (7 hari) → redirect /dashboard
```

### Alur Login
```
1. User isi Email @gmail.com
2. Klik [Kirim OTP] → POST /api/auth/send-otp {email, type:"login"}
   ├─ Cek email SUDAH terdaftar
   └─ Generate & kirim OTP
3. User isi OTP
4. Klik [Verifikasi] → POST /api/auth/verify-otp {email, otp, type:"login"}
   ├─ Verifikasi OTP
   └─ Set JWT cookie → redirect /dashboard
```

### Keamanan
| Aspek | Implementasi |
|---|---|
| **Bot protection** | Cloudflare Turnstile — verifikasi invisible/silent di form register |
| OTP | `crypto.randomInt(100000, 1000000)` — cryptographically random |
| OTP expiry | 10 menit sejak dikirim |
| Rate limit | Maksimal 1 OTP per 60 detik per email |
| Session | JWT `httpOnly` cookie, 7 hari, `secure` di production |
| Email | Hanya `@gmail.com` yang diterima |
| Nama | Diformat otomatis ke **ProperCase** sebelum disimpan |
| Middleware | JWT diverifikasi via `jose` di Edge Runtime setiap request |

### Route Protection (middleware.ts)
| Route | Behaviour |
|---|---|
| `/dashboard`, `/materi`, `/challenges`, dll. | Redirect `/login` jika tidak ada JWT valid |
| `/login`, `/register` | Redirect `/dashboard` jika sudah login |
| `/` | Pass-through |

---

## ⚙️ Memulai — Development

### Prasyarat
- **Node.js** ≥ 20.x
- Akun **[Neon.tech](https://neon.tech)** (gratis)
- Akun Gmail dengan **App Password** aktif

### 1. Clone & Install
```bash
git clone https://github.com/apeprustandi/duniakedol.git
cd duniakedol
npm install
```

### 2. Setup Environment
Buat file `.env.local` di root proyek:

```env
# Neon.tech — dari console.neon.tech → Connection Details
DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require

# JWT secret (min 32 karakter acak)
# Generate: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=ganti-dengan-secret-panjang

# Gmail SMTP — gunakan App Password, BUKAN password Gmail biasa
# Buat App Password: Google Account → Security → 2-Step Verification → App Passwords
GMAIL_USER=akunmu@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx

# Cloudflare Turnstile — dari dash.cloudflare.com → Turnstile
# Site key (publik, aman di-expose ke browser)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAA...
# Secret key (JANGAN di-commit ke Git!)
TURNSTILE_SECRET_KEY=0x4AAAAAAA...
```

### 3. Setup Database
Jalankan di **Neon SQL Editor** ([console.neon.tech](https://console.neon.tech)):

```sql
-- Tabel users (tanpa password)
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
```

> **Migrasi dari versi lama (dengan password)?**
> ```sql
> ALTER TABLE users DROP COLUMN IF EXISTS password;
> ```

### 4. Jalankan Dev Server
```bash
npm run dev
```

Buka [http://localhost:3003](http://localhost:3003).

### Scripts yang Tersedia
| Script | Perintah | Keterangan |
|---|---|---|
| Development | `npm run dev` | Dev server di port **3003** |
| Build | `npm run build` | Build production bundle |
| Start | `npm run start` | Production server di port **3003** |
| Lint | `npm run lint` | Cek kode dengan ESLint |

---

## 🗺️ Halaman & Routes

### Publik
| Route | Deskripsi |
|---|---|
| `/` | Landing page — Hero, Stats, Features, Pricing, dll. |
| `/login` | Login via OTP Gmail |
| `/register` | Daftar akun via OTP Gmail |

### Protected (wajib login)
| Route | Deskripsi |
|---|---|
| `/dashboard` | Dashboard member — stats, quick links, aktivitas |
| `/materi` | Kurikulum *(segera hadir)* |
| `/challenges` | Automation challenges *(segera hadir)* |
| `/botlab` | Bot Lab *(segera hadir)* |
| `/roadmap` | Peta belajar *(segera hadir)* |
| `/settings` | Pengaturan akun *(segera hadir)* |

### API
| Method | Route | Keterangan |
|---|---|---|
| `POST` | `/api/auth/send-otp` | Generate & kirim OTP ke email |
| `POST` | `/api/auth/verify-otp` | Verifikasi OTP → set JWT cookie |
| `POST` | `/api/auth/logout` | Logout, clear cookie |
| `GET` | `/api/auth/me` | Ambil data user dari JWT |

---

## 🐳 Deployment dengan Docker

### Menggunakan Docker Compose (Direkomendasikan)
```bash
docker compose up -d --build
docker compose logs -f
docker compose down
```

> Pastikan `docker-compose.yml` sudah menyertakan semua environment variables.

### Environment Variables untuk Container
```yaml
environment:
  - DATABASE_URL=postgresql://...
  - JWT_SECRET=your-secret
  - GMAIL_USER=akunmu@gmail.com
  - GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
  - NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAA...
  - TURNSTILE_SECRET_KEY=0x4AAAAAAA...
  - NODE_ENV=production
  - PORT=3003
  - HOSTNAME=0.0.0.0
```

### Catatan Docker
- Container menggunakan `restart: unless-stopped`.
- Next.js telemetry dinonaktifkan (`NEXT_TELEMETRY_DISABLED=1`).
- `libc6-compat` sudah ditambahkan agar SWC compiler tidak crash di Alpine.
- Build **tidak memerlukan** env vars — semua dibaca saat runtime (lazy init).

---

## 🌐 Konfigurasi Environment

| Variabel | Keterangan | Wajib |
|---|---|---|
| `DATABASE_URL` | Neon.tech PostgreSQL connection string | ✅ |
| `JWT_SECRET` | Secret untuk sign/verify JWT (min 32 kar.) | ✅ |
| `GMAIL_USER` | Alamat Gmail pengirim OTP | ✅ |
| `GMAIL_APP_PASSWORD` | Gmail App Password (16 karakter) | ✅ |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key (publik) | ✅ |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret key (server) | ✅ |
| `NODE_ENV` | `production` / `development` | — |
| `PORT` | Port aplikasi (default: `3003`) | — |
| `HOSTNAME` | Bind address container (`0.0.0.0`) | — |

---

## 🤝 Kontribusi

1. **Fork** repositori ini
2. Buat branch: `git checkout -b feat/nama-fitur`
3. Commit: `git commit -m "feat: deskripsi singkat"`
4. Push: `git push origin feat/nama-fitur`
5. Buka **Pull Request**

Gunakan [Conventional Commits](https://www.conventionalcommits.org).

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

<p align="center">
  Dibuat dengan ❤️ oleh komunitas <strong>Dunia Kedol</strong>
</p>

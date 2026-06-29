# Dunia Kedol (DKL)

> Komunitas belajar Node.js & automasi web — materi terstruktur, challenges, Bot Lab, dan komunitas aktif.

![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?logo=tailwindcss&logoColor=white)
![Neon](https://img.shields.io/badge/Neon-PostgreSQL-00E5CC?logo=postgresql&logoColor=white)
![Google OAuth](https://img.shields.io/badge/Google-OAuth_2.0-4285F4?logo=google&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-runtime-fbf0df?logo=bun&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📖 Tentang Proyek

**Dunia Kedol (DKL)** adalah platform komunitas berbasis web untuk belajar Node.js dan automasi web secara bersama-sama — lewat materi terstruktur, automation challenges, Bot Lab, dan forum diskusi yang aktif.

Dibangun menggunakan **Next.js 16 App Router**, **React 19**, **TypeScript**, dan **Tailwind CSS v4**, dengan:
- Tampilan dark-mode menggunakan efek partikel animasi interaktif dan terminal-style UI
- Sistem autentikasi **Google OAuth 2.0** — login & register menggunakan akun `@gmail.com`
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
| [@react-oauth/google](https://github.com/MomenSherif/react-oauth) | ^0.13.5 | Google OAuth 2.0 client |
| [google-auth-library](https://github.com/googleapis/google-auth-library-nodejs) | ^10.9.0 | Verifikasi Google ID token (server-side) |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | ^9.x | JWT session (API Routes) |
| [jose](https://github.com/panva/jose) | ^6.x | JWT verification (Edge middleware) |
| [Lucide React](https://lucide.dev) | ^1.18.0 | Icon library |
| [React Icons](https://react-icons.github.io) | ^5.6.0 | Icon library tambahan |
| [Bun](https://bun.sh) | 1.x | Runtime & package manager (Docker) |

---

## 📁 Struktur Proyek

```
dkl-google-auth/
├── middleware.ts                       # Edge JWT guard — proteksi route
├── src/
│   ├── app/
│   │   ├── (auth)/                     # Route group: halaman autentikasi
│   │   │   ├── layout.tsx              # Layout minimal tanpa Navbar
│   │   │   └── login/page.tsx          # Halaman login via Google OAuth (/login)
│   │   ├── (marketing)/                # Route group: landing page
│   │   │   ├── layout.tsx              # Layout dengan Navbar, Footer, Particle
│   │   │   └── page.tsx                # Halaman utama (/)
│   │   ├── (protected)/                # Route group: halaman yang butuh auth
│   │   │   ├── layout.tsx              # Layout dashboard (sidebar)
│   │   │   ├── dashboard/page.tsx      # Halaman dashboard (/dashboard)
│   │   │   ├── materi/page.tsx         # Halaman kurikulum (/materi)
│   │   │   ├── challenges/page.tsx     # Halaman automation challenges (/challenges)
│   │   │   ├── botlab/page.tsx         # Halaman eksperimental bot (/botlab)
│   │   │   ├── roadmap/page.tsx        # Halaman peta belajar (/roadmap)
│   │   │   └── settings/
│   │   │       ├── page.tsx            # Halaman pengaturan (/settings)
│   │   │       └── SettingsClient.tsx  # Interactive UI settings
│   │   ├── api/
│   │   │   └── auth/
│   │   │       ├── google/route.ts     # POST /api/auth/google — Google OAuth
│   │   │       ├── logout/route.ts     # POST /api/auth/logout
│   │   │       └── me/route.ts         # GET  /api/auth/me
│   │   ├── not-found.tsx               # Custom 404 / coming-soon page
│   │   ├── globals.css                 # Global styles & animasi
│   │   └── layout.tsx                  # Root layout (html, font, ToastProvider)
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── DashboardSidebar.tsx    # Sidebar responsif + logout
│   │   │   ├── DashboardTopbar.tsx     # Topbar dengan user info & avatar
│   │   │   └── StatCard.tsx            # Kartu statistik reusable
│   │   ├── layout/
│   │   │   ├── Navbar.tsx              # Navigation bar landing
│   │   │   └── Footer.tsx              # Footer landing
│   │   ├── sections/                   # Seksi-seksi landing page
│   │   │   ├── HeroSection.tsx
│   │   │   ├── StatsSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── MateriSection.tsx
│   │   │   ├── ChallengesSection.tsx
│   │   │   ├── BotLabSection.tsx
│   │   │   ├── RoadmapSection.tsx
│   │   │   ├── HowItWorksSection.tsx
│   │   │   ├── CommunitySection.tsx
│   │   │   ├── PricingSection.tsx
│   │   │   └── CtaSection.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── FeatureCard.tsx
│   │       ├── GoogleAuthProvider.tsx  # Singleton wrapper Google OAuth SDK
│   │       ├── ParticleCanvas.tsx
│   │       ├── ScrollReveal.tsx
│   │       ├── SectionHeader.tsx
│   │       ├── TerminalBlock.tsx
│   │       └── ToastProvider.tsx       # Toast notification system
│   ├── hooks/
│   │   └── useTerminalTyping.ts        # Custom hook — terminal typing effect
│   └── lib/
│       ├── auth.ts                     # JWT + cookie helpers
│       ├── db.ts                       # Neon serverless client wrapper (lazy init)
│       ├── data/                       # Static data: pricing, roadmap, challenges, dll.
│       │   ├── botlab.tsx
│       │   ├── challenges.tsx
│       │   ├── features.tsx
│       │   ├── materi.tsx
│       │   ├── pricing.ts
│       │   ├── roadmap.ts
│       │   └── steps.ts
│       ├── db/
│       │   └── schema.sql              # Skema tabel users
│       └── types/
│           └── index.ts                # Shared TypeScript interfaces
├── public/
├── Dockerfile                          # Multi-stage build (Bun + Alpine)
├── docker-compose.yml
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 🔐 Sistem Autentikasi (Google OAuth 2.0)

DKL menggunakan autentikasi **Google OAuth 2.0** — tidak ada password yang disimpan. Login dan register dilakukan dengan satu klik menggunakan akun `@gmail.com`.

### Alur Login / Register
```
1. User klik tombol [Continue with Google]
2. Google Sign-In popup terbuka
3. User pilih akun Google @gmail.com
4. Credential (ID Token) dikirim ke POST /api/auth/google
   ├─ Verifikasi token via Google Auth Library (server-side)
   ├─ Blokir akun Workspace / GSuite (cek payload.hd)
   ├─ Validasi hanya @gmail.com standar
   ├─ UPSERT user ke tabel users (insert jika baru, update jika sudah ada)
   │    kolom: email, name, google_id, picture_url
   └─ Set JWT cookie (7 hari) → redirect /dashboard
```

### Alur Logout
```
1. Klik tombol [Logout] di sidebar
2. googleLogout()              → revoke Google session di browser
3. POST /api/auth/logout       → hapus JWT cookie di server (maxAge: 0)
4. redirect /login
```

### Keamanan
| Aspek | Implementasi |
|---|---|
| **Auth provider** | Google OAuth 2.0 — verifikasi token via `google-auth-library` |
| Token verification | `OAuth2Client.verifyIdToken()` — validasi signature & audience |
| Email filter | Hanya `@gmail.com` personal (workspace/GSuite diblokir via `payload.hd`) |
| Session | JWT `httpOnly` cookie, 7 hari, `secure` di production |
| **Logout** | `googleLogout()` revoke Google session + cookie dihapus dengan `maxAge: 0` (cross-browser) |
| Middleware | JWT diverifikasi via `jose` di Edge Runtime setiap request |
| Cookie name | `dkl_token` |

### Route Protection (middleware.ts)
| Route | Behaviour |
|---|---|
| `/dashboard`, `/materi`, `/challenges`, dll. | Redirect `/login` jika tidak ada JWT valid |
| `/login` | Redirect `/dashboard` jika sudah login |
| `/` | Pass-through |

---

## ⚙️ Memulai — Development

### Prasyarat
- **Node.js** ≥ 20.x atau **[Bun](https://bun.sh)** ≥ 1.x
- Akun **[Neon.tech](https://neon.tech)** (gratis)
- **Google Cloud Console** — OAuth 2.0 Client ID

### 1. Clone & Install
```bash
git clone https://github.com/apeprustandi/duniakedol.git
cd duniakedol

# Menggunakan Bun (direkomendasikan)
bun install

# Atau npm
npm install
```

### 2. Setup Google OAuth
1. Buka [Google Cloud Console](https://console.cloud.google.com) → **APIs & Services** → **Credentials**
2. Buat **OAuth 2.0 Client ID** (tipe: *Web application*)
3. Tambahkan ke **Authorized JavaScript origins**:
   - `http://localhost:3003` (development)
   - `https://duniakedol.online` (production)
4. Salin **Client ID**

### 3. Setup Environment
Buat file `.env.local` di root proyek:

```env
# Neon.tech — dari console.neon.tech → Connection Details
DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require

# JWT secret (min 32 karakter acak)
# Generate: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=ganti-dengan-secret-panjang

# Google OAuth 2.0 Client ID
NEXT_PUBLIC_GOOGLE_CLIENT_ID=xxxxxxxxxxxx-xxxxxxxxxxxxxxxx.apps.googleusercontent.com
```

### 4. Setup Database
Jalankan di **Neon SQL Editor** ([console.neon.tech](https://console.neon.tech)):

```sql
-- Tabel users (tanpa password, auth via Google)
CREATE TABLE IF NOT EXISTS users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  email       TEXT UNIQUE NOT NULL,
  google_id   TEXT UNIQUE,
  picture_url TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS users_email_idx ON users (email);
CREATE INDEX IF NOT EXISTS users_google_id_idx ON users (google_id);
```

> **Migrasi dari versi lama (OTP Email)?**
> ```sql
> -- Hapus tabel OTP yang sudah tidak digunakan
> DROP TABLE IF EXISTS otp_codes;
>
> -- Tambah kolom baru jika belum ada
> ALTER TABLE users
>   ADD COLUMN IF NOT EXISTS google_id TEXT UNIQUE,
>   ADD COLUMN IF NOT EXISTS picture_url TEXT;
>
> -- Hapus kolom lama jika ada
> ALTER TABLE users
>   DROP COLUMN IF EXISTS full_name,
>   DROP COLUMN IF EXISTS password;
> ```

### 5. Jalankan Dev Server
```bash
# Bun
bun run dev

# Atau npm
npm run dev
```

Buka [http://localhost:3003](http://localhost:3003).

### Scripts yang Tersedia
| Script | Perintah | Keterangan |
|---|---|---|
| Development | `bun run dev` / `npm run dev` | Dev server di port **3003** |
| Build | `bun run build` / `npm run build` | Build production (dengan `--no-lint`) |
| Start | `bun run start` / `npm run start` | Production server di port **3003** |
| Lint | `bun run lint` / `npm run lint` | Cek kode dengan ESLint |

---

## 🗺️ Halaman & Routes

### Publik
| Route | Deskripsi |
|---|---|
| `/` | Landing page — Hero, Stats, Features, Pricing, Roadmap, dll. |
| `/login` | Login / Register via Google OAuth |

### Protected (wajib login)
| Route | Deskripsi |
|---|---|
| `/dashboard` | Dashboard member — stats, quick links, aktivitas |
| `/materi` | Kurikulum terstruktur (Node.js, Automasi, Tools, dll.) |
| `/challenges` | Automation challenges dengan tingkat kesulitan & reward poin |
| `/botlab` | Eksperimental workspace (cURL to code, flow mapper, AI agent) |
| `/roadmap` | Peta belajar dari fase Beginner hingga Master |
| `/settings` | Pengaturan interaktif (Profil, Preferensi, Notifikasi, Keamanan) |

### API
| Method | Route | Keterangan |
|---|---|---|
| `POST` | `/api/auth/google` | Verifikasi Google ID Token → set JWT cookie |
| `POST` | `/api/auth/logout` | Logout, clear cookie |
| `GET` | `/api/auth/me` | Ambil data user dari JWT + database |

---

## 🐳 Deployment dengan Docker

Proyek ini menggunakan **Bun** sebagai runtime di Docker (image `oven/bun:1-alpine`).

### Menggunakan Docker Compose (Direkomendasikan)
```bash
docker compose up -d --build
docker compose logs -f
docker compose down
```

### Environment Variables untuk Container
Buat file `.env` di root proyek (atau set langsung di server):

```env
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-min-32-chars
NEXT_PUBLIC_GOOGLE_CLIENT_ID=xxxxxxxxxxxx.apps.googleusercontent.com
NODE_ENV=production
PORT=3003
HOSTNAME=0.0.0.0
```

> `docker-compose.yml` sudah dikonfigurasi untuk membaca env vars dari file `.env` secara otomatis.

### Catatan Docker
- Base image: `oven/bun:1-alpine` (multi-stage build: `deps` → `builder` → `runner`)
- Package manager: **Bun** — `bun install --frozen-lockfile` & `bun run build`
- Container menggunakan `restart: unless-stopped`
- Next.js telemetry dinonaktifkan (`NEXT_TELEMETRY_DISABLED=1`)
- `libc6-compat` ditambahkan agar SWC compiler tidak crash di Alpine
- Next.js dikonfigurasi `output: "standalone"` — server dijalankan dengan `bun server.js`
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` di-embed ke JS bundle saat **build time** via Docker `ARG`
- Build **tidak memerlukan** `DATABASE_URL` atau `JWT_SECRET` — dibaca saat runtime (lazy init)

---

## 🌐 Konfigurasi Environment

| Variabel | Keterangan | Wajib |
|---|---|---|
| `DATABASE_URL` | Neon.tech PostgreSQL connection string | ✅ |
| `JWT_SECRET` | Secret untuk sign/verify JWT (min 32 kar.) | ✅ |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth 2.0 Client ID (publik, di-embed saat build) | ✅ |
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

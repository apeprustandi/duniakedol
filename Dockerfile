# 1. Gunakan base image resmi Bun versi ringan (Alpine)
FROM oven/bun:1-alpine AS deps
# Tambahkan libc6-compat jika Next.js SWC compiler membutuhkannya
RUN apk add --no-cache libc6-compat
WORKDIR /app
# PERUBAHAN: Salin bun.lockb, bukan package-lock.json
COPY package.json bun.lockb ./
# PERUBAHAN: Gunakan perintah bun install
RUN bun install --frozen-lockfile

# 2. Builder stage
FROM oven/bun:1-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# NEXT_PUBLIC_ vars harus tersedia saat build
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=${NEXT_PUBLIC_GOOGLE_CLIENT_ID}

# PERUBAHAN: Gunakan bun run build
RUN bun run build

# 3. Runner stage
FROM oven/bun:1-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3003
ENV PORT=3003
ENV HOSTNAME="0.0.0.0"

# PERUBAHAN: Eksekusi file server.js hasil standalone Next.js menggunakan Bun
CMD ["bun", "server.js"]
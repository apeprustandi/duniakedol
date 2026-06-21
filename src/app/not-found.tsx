"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiArrowLeft,
  FiGrid,
  FiClock,
  FiCode,
  FiZap,
} from "react-icons/fi";

/* ── Fitur yang sedang dikerjakan ─────────────────────────── */
const COMING_SOON_ROUTES: Record<string, { label: string; progress: number }> = {
  "/materi":     { label: "Kurikulum & Materi",      progress: 65 },
  "/challenges": { label: "Automation Challenges",   progress: 48 },
  "/botlab":     { label: "Bot Lab",                 progress: 30 },
  "/roadmap":    { label: "Learning Roadmap",         progress: 80 },
  "/settings":   { label: "Pengaturan Akun",          progress: 20 },
};

/** Selalu 1 bulan dari hari ini, format: "Juli 2026" */
function getEtaNextMonth(): string {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  return d.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
}

const TERMINAL_LINES = [
  { delay: 0, text: "$ dkl --check-status", color: "text-[#00ff88]" },
  { delay: 600, text: "> Connecting to DKL servers...", color: "text-[#a1a1aa]" },
  { delay: 1200, text: "> Fetching module status...", color: "text-[#a1a1aa]" },
  { delay: 1800, text: "> ERROR 404: Module not ready", color: "text-red-400" },
  { delay: 2400, text: "> [INFO] Fitur sedang dalam pengembangan aktif", color: "text-yellow-400" },
  { delay: 3000, text: "> Estimasi selesai: lihat progress di bawah ↓", color: "text-[#00ff88]" },
];

export default function NotFound() {
  const pathname = usePathname();
  const [visibleLines, setVisibleLines] = useState(0);
  const [progressVal, setProgressVal] = useState(0);

  /* ── Cek apakah route ini punya data "coming soon" ─────── */
  const featureInfo = Object.entries(COMING_SOON_ROUTES).find(([route]) =>
    pathname?.startsWith(route)
  )?.[1];

  const isComingSoon = Boolean(featureInfo);
  const targetProgress = featureInfo?.progress ?? 0;

  /* ── Terminal animation ─────────────────────────────────── */
  useEffect(() => {
    TERMINAL_LINES.forEach((_, i) => {
      setTimeout(() => setVisibleLines(i + 1), TERMINAL_LINES[i].delay);
    });
  }, []);

  /* ── Progress bar animation ─────────────────────────────── */
  useEffect(() => {
    if (!isComingSoon) return;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgressVal((v) => {
          if (v >= targetProgress) { clearInterval(interval); return targetProgress; }
          return v + 1;
        });
      }, 12);
      return () => clearInterval(interval);
    }, 2800);
    return () => clearTimeout(timer);
  }, [isComingSoon, targetProgress]);

  return (
    <div className="min-h-screen bg-[#0a0f0a] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#00ff88]/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#00ff88]/3 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,136,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full max-w-2xl">
        {/* 404 / Status */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 border border-[#00ff88]/30 px-3 py-1 mb-6">
            <FiCode className="text-[#00ff88] text-xs" />
            <span className="text-[#00ff88] text-xs tracking-widest uppercase">
              {isComingSoon ? "// fitur dalam pengembangan" : "// halaman tidak ditemukan"}
            </span>
          </div>

          <div className="relative">
            <h1 className="text-[120px] font-bold leading-none text-[#f5f5f5]/5 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-7xl font-bold text-[#00ff88] tabular-nums drop-shadow-[0_0_30px_rgba(0,255,136,0.4)]">
                {isComingSoon ? "WIP" : "404"}
              </span>
              <p className="text-[#a1a1aa] text-sm mt-2">
                {isComingSoon
                  ? "Work In Progress — Fitur sedang dibangun"
                  : "Halaman tidak ditemukan"}
              </p>
            </div>
          </div>
        </div>

        {/* Terminal block */}
        <div className="bg-[#0d120d] border border-[#27272a] p-5 mb-6 font-mono text-xs space-y-1.5">
          {/* Terminal header */}
          <div className="flex items-center gap-2 pb-3 border-b border-[#27272a] mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#00ff88]/70" />
            <span className="text-[#52525b] ml-2">dkl-terminal — bash</span>
          </div>

          {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
            <p key={i} className={line.color}>
              {line.text}
              {i === visibleLines - 1 && visibleLines < TERMINAL_LINES.length && (
                <span className="cursor-blink ml-0.5">█</span>
              )}
            </p>
          ))}
          {visibleLines >= TERMINAL_LINES.length && (
            <p className="text-[#a1a1aa]">
              <span className="text-[#00ff88]">$</span>{" "}
              <span className="cursor-blink">█</span>
            </p>
          )}
        </div>

        {/* Progress section — tampil hanya kalau route ada di daftar */}
        {isComingSoon && featureInfo && (
          <div className="bg-[#1a1f1a] border border-[#27272a] p-5 mb-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[#52525b] text-xs uppercase tracking-widest mb-1">
                  // fitur dalam antrian
                </p>
                <p className="text-[#f5f5f5] font-bold">{featureInfo.label}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="flex items-center gap-1.5 text-[#00ff88] mb-1">
                  <FiZap className="text-sm" />
                  <span className="text-2xl font-bold tabular-nums">{progressVal}%</span>
                </div>
                <p className="text-[#52525b] text-xs">progress</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-1.5">
              <div className="h-2 bg-[#27272a] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00ff88] to-[#00ff88]/60 rounded-full transition-all duration-100"
                  style={{ width: `${progressVal}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-[#52525b]">
                <span>Mulai</span>
                <div className="flex items-center gap-1">
                  <FiClock className="text-xs" />
                  <span>Target: {getEtaNextMonth()}</span>
                </div>
                <span>Selesai</span>
              </div>
            </div>

            {/* Checklist */}
            <div className="pt-2 border-t border-[#27272a] font-mono text-xs space-y-1.5 text-[#a1a1aa]">
              <p><span className="text-[#00ff88]">✓</span> Desain UI/UX</p>
              <p><span className="text-[#00ff88]">✓</span> Arsitektur database</p>
              <p><span className="text-yellow-400">◌</span> Pengembangan fitur utama</p>
              <p><span className="text-[#52525b]">○</span> Testing &amp; QA</p>
              <p><span className="text-[#52525b]">○</span> Deployment</p>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 bg-[#00ff88] text-[#0a0f0a] px-6 py-3 font-bold text-sm tracking-wide hover:bg-[#f5f5f5] transition-all duration-300 flex-1"
          >
            <FiGrid className="text-base" />
            Kembali ke Dashboard
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 border border-[#27272a] text-[#a1a1aa] px-6 py-3 text-sm hover:border-[#00ff88]/50 hover:text-[#00ff88] transition-all duration-300 flex-1"
          >
            <FiArrowLeft className="text-base" />
            Ke Halaman Utama
          </Link>
        </div>

        {/* Footer note */}
        <p className="text-center text-[#52525b] text-xs mt-6 font-mono">
          <span className="text-[#00ff88]">dkl</span> v0.1.0 — stay tuned for updates 🚀
        </p>
      </div>
    </div>
  );
}

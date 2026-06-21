"use client";

import { useEffect, useRef, useState } from "react";

/* ── Counter hook ─────────────────────────────────────────── */
function useCountUp(target: number, duration = 2000, started = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, started]);

  return value;
}

/* ── Stat card ────────────────────────────────────────────── */
interface StatProps {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  color: string;
  icon: string;
  started: boolean;
  duration?: number;
}

function StatCard({ value, suffix, label, sublabel, color, icon, started, duration }: StatProps) {
  const count = useCountUp(value, duration ?? 2000, started);

  return (
    <div className="group relative bg-[#1a1f1a] border border-[#27272a] p-6 sm:p-8 hover:border-[#3f3f46] transition-all duration-500 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700"
        style={{ backgroundColor: color }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-500"
        style={{ backgroundColor: color }}
      />

      {/* Icon */}
      <div
        className="text-2xl mb-4 w-10 h-10 flex items-center justify-center border"
        style={{ borderColor: `${color}30`, color }}
      >
        {icon}
      </div>

      {/* Number */}
      <div className="flex items-end gap-1 mb-1">
        <span
          className="text-4xl sm:text-5xl font-bold font-mono tabular-nums leading-none"
          style={{ color }}
        >
          {count.toLocaleString("id-ID")}
        </span>
        <span className="text-xl sm:text-2xl font-bold mb-0.5" style={{ color }}>
          {suffix}
        </span>
      </div>

      {/* Label */}
      <p className="text-[#f5f5f5] font-semibold text-sm mb-1">{label}</p>
      <p className="text-[#52525b] text-xs">{sublabel}</p>
    </div>
  );
}

/* ── Pulse dot ────────────────────────────────────────────── */
function PulseDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff88]" />
    </span>
  );
}

/* ── Section ──────────────────────────────────────────────── */
const STATS = [
  {
    value: 500,
    suffix: "+",
    label: "Member Aktif",
    sublabel: "dan terus bertambah tiap hari",
    color: "#00ff88",
    icon: "👥",
    duration: 1800,
  },
  {
    value: 1240,
    suffix: "+",
    label: "Challenge Diselesaikan",
    sublabel: "oleh member di seluruh Indonesia",
    color: "#60a5fa",
    icon: "⚡",
    duration: 2200,
  },
  {
    value: 50,
    suffix: "+",
    label: "Modul Pembelajaran",
    sublabel: "diperbarui secara berkala",
    color: "#a78bfa",
    icon: "📚",
    duration: 1500,
  },
  {
    value: 98,
    suffix: "%",
    label: "Tingkat Kepuasan",
    sublabel: "berdasarkan survei member",
    color: "#fbbf24",
    icon: "⭐",
    duration: 1600,
  },
];

export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative z-10 py-24 sm:py-32"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <div className="inline-block border border-[#00ff88]/30 px-3 py-1 mb-4">
              <span className="text-[#00ff88] text-xs tracking-widest uppercase font-mono">
                // live stats
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#f5f5f5] leading-tight">
              Komunitas yang Terus{" "}
              <span className="text-[#00ff88]">Tumbuh</span>
            </h2>
          </div>

          {/* Live indicator */}
          <div className="flex items-center gap-2 text-[#a1a1aa] text-sm">
            <PulseDot />
            <span className="font-mono text-xs">live · diperbarui otomatis</span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} started={started} />
          ))}
        </div>

        {/* Bottom bar — activity feed feel */}
        <div className="mt-8 border border-[#27272a] bg-[#1a1f1a] px-5 py-4 flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-2">
            <PulseDot />
            <span className="text-[#a1a1aa] text-xs font-mono">
              <span className="text-[#00ff88]">rizky_p</span> baru saja menyelesaikan challenge
              <span className="text-[#60a5fa]"> Puppeteer Scraper #3</span>
            </span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-[#27272a]" />
          <div className="flex items-center gap-2">
            <PulseDot />
            <span className="text-[#a1a1aa] text-xs font-mono">
              <span className="text-[#00ff88]">anisa_r</span> join sebagai member baru
            </span>
          </div>
          <div className="hidden lg:block w-px h-4 bg-[#27272a]" />
          <div className="hidden lg:flex items-center gap-2">
            <PulseDot />
            <span className="text-[#a1a1aa] text-xs font-mono">
              <span className="text-[#00ff88]">dimas_k</span> naik ke level
              <span className="text-[#a78bfa]"> Advanced</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

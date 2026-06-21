import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { StatCard } from "@/components/dashboard/StatCard";
import {
  FiBook,
  FiZap,
  FiStar,
  FiTrendingUp,
  FiArrowRight,
  FiCode,
  FiCpu,
  FiMap,
} from "react-icons/fi";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

// Force dynamic rendering — reads cookies at request time, must not be statically pre-rendered
export const dynamic = "force-dynamic";


const QUICK_LINKS = [
  {
    icon: FiBook,
    label: "Materi Node.js",
    desc: "Mulai belajar dari dasar",
    href: "/materi",
    color: "#00ff88",
  },
  {
    icon: FiZap,
    label: "Automation Challenges",
    desc: "Uji kemampuanmu",
    href: "/challenges",
    color: "#a78bfa",
  },
  {
    icon: FiCpu,
    label: "Bot Lab",
    desc: "Bangun bot pertamamu",
    href: "/botlab",
    color: "#38bdf8",
  },
  {
    icon: FiMap,
    label: "Roadmap",
    desc: "Lihat peta belajarmu",
    href: "/roadmap",
    color: "#fb923c",
  },
];

const RECENT_ACTIVITY = [
  { text: "Akun berhasil dibuat", time: "Baru saja", icon: "✓", color: "text-[#00ff88]" },
  { text: "Selamat bergabung di komunitas DKL!", time: "Baru saja", icon: "🎉", color: "text-yellow-400" },
];

export default async function DashboardPage() {
  /* ── User info from JWT ───────────────────────────────────── */
  const store = await cookies();
  const token = store.get("dkl_token")?.value;
  const payload = token ? verifyToken(token) : null;
  const userName = payload?.name ?? "Member";

  /* ── Greeting based on hour ──────────────────────────────── */
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Selamat pagi" : hour < 17 ? "Selamat siang" : "Selamat malam";

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Topbar */}
      <DashboardTopbar
        title="Dashboard"
        subtitle={`${greeting}, ${userName}!`}
        userName={userName}
      />

      {/* Page content */}
      <main className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Welcome banner */}
        <div className="relative bg-[#1a1f1a] border border-[#00ff88]/20 p-6 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00ff88] via-[#00ff88]/50 to-transparent" />
          <div className="absolute -right-8 -top-8 w-48 h-48 bg-[#00ff88]/3 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-[#00ff88] text-xs uppercase tracking-widest mb-1">
                // welcome back
              </p>
              <h1 className="text-2xl font-bold text-[#f5f5f5] mb-2">
                {greeting},{" "}
                <span className="text-[#00ff88]">{userName}</span>! 👋
              </h1>
              <p className="text-[#a1a1aa] text-sm max-w-md">
                Lanjutkan perjalanan belajarmu. Konsistensi adalah kunci menjadi developer
                andal.
              </p>
            </div>
            <div className="bg-[#0a0f0a] border border-[#27272a] px-4 py-3 font-mono text-xs text-[#a1a1aa] self-start">
              <span className="text-[#00ff88]">$</span> etl status{" "}
              <span className="text-[#00ff88] animate-pulse">▊</span>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <section>
          <h2 className="text-[#a1a1aa] text-xs uppercase tracking-widest mb-4">
            // statistik kamu
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={<FiBook />}
              label="Materi Selesai"
              value="0"
              sub="dari 24 materi"
              accentColor="#00ff88"
            />
            <StatCard
              icon={<FiZap />}
              label="Challenges"
              value="0"
              sub="belum ada yang selesai"
              accentColor="#a78bfa"
            />
            <StatCard
              icon={<FiStar />}
              label="Total Poin"
              value="0"
              sub="kumpulkan lebih banyak"
              accentColor="#fb923c"
            />
            <StatCard
              icon={<FiTrendingUp />}
              label="Streak"
              value="0"
              sub="hari berturut-turut"
              accentColor="#38bdf8"
            />
          </div>
        </section>

        {/* Bottom grid: Quick Links + Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Quick links */}
          <section>
            <h2 className="text-[#a1a1aa] text-xs uppercase tracking-widest mb-4">
              // akses cepat
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {QUICK_LINKS.map(({ icon: Icon, label, desc, href, color }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex flex-col gap-2 bg-[#1a1f1a] border border-[#27272a] p-4 hover:border-[#00ff88]/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div
                    className="w-8 h-8 flex items-center justify-center text-sm mb-1"
                    style={{
                      background: `${color}12`,
                      border: `1px solid ${color}30`,
                      color,
                    }}
                  >
                    <Icon />
                  </div>
                  <p className="text-[#f5f5f5] text-sm font-medium group-hover:text-[#00ff88] transition-colors leading-tight">
                    {label}
                  </p>
                  <p className="text-[#52525b] text-xs leading-tight">{desc}</p>
                  <FiArrowRight
                    className="text-xs mt-auto self-end opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color }}
                  />
                </Link>
              ))}
            </div>
          </section>

          {/* Recent activity */}
          <section>
            <h2 className="text-[#a1a1aa] text-xs uppercase tracking-widest mb-4">
              // aktivitas terbaru
            </h2>
            <div className="bg-[#1a1f1a] border border-[#27272a] divide-y divide-[#27272a]">
              {RECENT_ACTIVITY.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4">
                  <span className={`text-base mt-0.5 ${item.color}`}>{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#f5f5f5] text-sm">{item.text}</p>
                    <p className="text-[#52525b] text-xs mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}

              {/* Placeholder */}
              <div className="p-4 text-center">
                <p className="text-[#52525b] text-xs font-mono">
                  <span className="text-[#00ff88]">$</span> aktivitas akan muncul di sini...
                </p>
              </div>
            </div>

            {/* Feature coming soon */}
            <div className="mt-3 p-4 bg-[#1a1f1a] border border-[#27272a] border-dashed">
              <div className="flex items-center gap-2 text-[#52525b] text-xs font-mono">
                <FiCode className="text-[#00ff88]" />
                <span>Fitur komunitas &amp; leaderboard — segera hadir</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { ROADMAP_PHASES } from "@/lib/data/roadmap";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Roadmap" };
export const dynamic = "force-dynamic";

/* ── Badge warna per tag ─────────────────────────────────────── */
const TAG_COLORS: Record<string, string> = {
  Setup:        "bg-[#00ff88]/10 text-[#00ff88]",
  Fundamentals: "bg-[#60a5fa]/10 text-[#60a5fa]",
  Tools:        "bg-[#a78bfa]/10 text-[#a78bfa]",
  Networking:   "bg-[#38bdf8]/10 text-[#38bdf8]",
  Scraping:     "bg-[#fb923c]/10 text-[#fb923c]",
  Automation:   "bg-[#60a5fa]/10 text-[#60a5fa]",
  Output:       "bg-[#00ff88]/10 text-[#00ff88]",
  "E2E Testing":"bg-[#a78bfa]/10 text-[#a78bfa]",
  "Reverse Eng.":"bg-red-500/10 text-red-400",
  Advanced:     "bg-red-500/10 text-red-400",
  Security:     "bg-red-500/10 text-red-400",
  Architecture: "bg-[#fbbf24]/10 text-[#fbbf24]",
  DevOps:       "bg-[#38bdf8]/10 text-[#38bdf8]",
  Business:     "bg-[#fbbf24]/10 text-[#fbbf24]",
  Community:    "bg-[#00ff88]/10 text-[#00ff88]",
  Leadership:   "bg-[#a78bfa]/10 text-[#a78bfa]",
  Portfolio:    "bg-[#fb923c]/10 text-[#fb923c]",
};

export default async function RoadmapPage() {
  /* ── User from JWT ────────────────────────────────────────── */
  const store = await cookies();
  const token = store.get("dkl_token")?.value;
  const payload = token ? verifyToken(token) : null;
  const userName = payload?.name ?? "Member";

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <DashboardTopbar
        title="Roadmap"
        userName={userName}
        userEmail={payload?.email}
        userPicture={payload?.picture}
      />

      <main className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Header */}
        <div className="relative bg-[#1a1f1a] border border-[#00ff88]/20 p-6 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00ff88] via-[#00ff88]/50 to-transparent" />
          <div className="absolute -right-8 -top-8 w-48 h-48 bg-[#00ff88]/3 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <p className="text-[#00ff88] text-xs uppercase tracking-widest mb-1">
              // peta belajar
            </p>
            <h1 className="text-2xl font-bold text-[#f5f5f5] mb-2">
              Learning Roadmap
            </h1>
            <p className="text-[#a1a1aa] text-sm max-w-xl">
              Dari nol hingga production-ready. Ikuti jalur terstruktur ini untuk menjadi
              automation engineer yang andal — step by step, fase demi fase.
            </p>
          </div>
        </div>

        {/* Timeline connector hint */}
        <p className="text-[#52525b] text-xs font-mono text-center">
          <span className="text-[#00ff88]">$</span> dkl roadmap --show-all
        </p>

        {/* Phases */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-[31px] top-0 bottom-0 w-px bg-gradient-to-b from-[#00ff88]/40 via-[#27272a] to-transparent hidden md:block" />

          <div className="space-y-6">
            {ROADMAP_PHASES.map((phase, idx) => (
              <div key={phase.phase} className="relative flex gap-6 group">

                {/* Phase number bubble */}
                <div
                  className="relative z-10 shrink-0 w-16 h-16 border-2 flex flex-col items-center justify-center font-mono hidden md:flex"
                  style={{
                    borderColor: phase.status === "coming-soon" ? "#27272a" : phase.color,
                    background: phase.status === "coming-soon" ? "#0d120d" : `${phase.color}10`,
                    color: phase.status === "coming-soon" ? "#52525b" : phase.color,
                  }}
                >
                  <span className="text-[10px] opacity-60">phase</span>
                  <span className="text-lg font-bold leading-none">{phase.phase}</span>
                </div>

                {/* Card */}
                <div
                  className={`flex-1 bg-[#1a1f1a] border p-5 transition-all duration-300 ${
                    phase.status === "coming-soon"
                      ? "border-[#27272a] opacity-70"
                      : "border-[#27272a] hover:border-opacity-60 group-hover:shadow-lg"
                  }`}
                  style={
                    phase.status !== "coming-soon"
                      ? { ["--tw-shadow-color" as string]: phase.color }
                      : {}
                  }
                >
                  {/* Top accent */}
                  <div
                    className="absolute top-0 left-0 w-full h-[1px]"
                    style={{
                      background:
                        phase.status === "coming-soon"
                          ? "transparent"
                          : `linear-gradient(90deg, ${phase.color}80, transparent)`,
                    }}
                  />

                  {/* Card header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      {/* Phase badge (mobile) */}
                      <span
                        className="md:hidden text-xs font-bold font-mono px-2 py-1 border"
                        style={{
                          color: phase.status === "coming-soon" ? "#52525b" : phase.color,
                          borderColor: phase.status === "coming-soon" ? "#27272a" : phase.color,
                          background: phase.status === "coming-soon" ? "transparent" : `${phase.color}10`,
                        }}
                      >
                        Phase {phase.phase}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2
                            className="text-base font-bold"
                            style={{ color: phase.status === "coming-soon" ? "#a1a1aa" : phase.color }}
                          >
                            {phase.label}
                          </h2>
                          {phase.status === "coming-soon" && (
                            <span className="text-[10px] font-mono uppercase tracking-wider border border-[#27272a] text-[#52525b] px-1.5 py-0.5">
                              segera hadir
                            </span>
                          )}
                        </div>
                        <p className="text-[#52525b] text-xs font-mono mt-0.5">
                          ⏱ {phase.duration}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Modules list */}
                  <div className="space-y-2 mb-4">
                    {phase.modules.map((mod, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 py-2 px-3 bg-[#0a0f0a] border border-[#27272a] group/mod"
                      >
                        <span
                          className="text-xs font-mono shrink-0 w-5 text-center"
                          style={{ color: phase.status === "coming-soon" ? "#3f3f46" : phase.color }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 text-sm text-[#a1a1aa]">{mod.title}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 font-mono shrink-0 ${
                            TAG_COLORS[mod.tag] ?? "bg-[#27272a] text-[#52525b]"
                          }`}
                        >
                          {mod.tag}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Outcome */}
                  <div
                    className="flex items-start gap-2 px-3 py-2 border-l-2 text-sm"
                    style={{
                      borderColor: phase.status === "coming-soon" ? "#27272a" : phase.color,
                      background: phase.status === "coming-soon" ? "transparent" : `${phase.color}06`,
                    }}
                  >
                    <span className="text-[#52525b] text-xs font-mono mt-0.5 shrink-0">outcome</span>
                    <p className="text-[#a1a1aa] text-xs leading-relaxed">{phase.outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="bg-[#1a1f1a] border border-dashed border-[#27272a] p-4 text-center">
          <p className="text-[#52525b] text-xs font-mono">
            <span className="text-[#00ff88]">✓</span> Roadmap diperbarui secara berkala sesuai perkembangan komunitas DKL
          </p>
        </div>
      </main>
    </div>
  );
}

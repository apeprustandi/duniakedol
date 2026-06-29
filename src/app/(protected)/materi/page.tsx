import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { MATERI_LIST } from "@/lib/data/materi";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Materi" };
export const dynamic = "force-dynamic";

const BADGE_COLOR_MAP: Record<string, string> = {
  Fundamentals: "text-green-400 border-green-400/30 bg-green-400/5",
  Automasi:     "text-[#00ff88] border-[#00ff88]/30 bg-[#00ff88]/5",
  Tools:        "text-blue-400 border-blue-400/30 bg-blue-400/5",
  Advanced:     "text-red-400 border-red-400/30 bg-red-400/5",
};

export default async function MateriPage() {
  const store = await cookies();
  const token = store.get("dkl_token")?.value;
  const payload = token ? verifyToken(token) : null;
  const userName = payload?.name ?? "Member";

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <DashboardTopbar
        title="Materi"
        userName={userName}
        userEmail={payload?.email}
        userPicture={payload?.picture}
      />

      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Header */}
        <div className="relative bg-[#1a1f1a] border border-[#00ff88]/20 p-6 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00ff88] via-[#00ff88]/50 to-transparent" />
          <div className="absolute -right-8 -top-8 w-48 h-48 bg-[#00ff88]/3 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <p className="text-[#00ff88] text-xs uppercase tracking-widest mb-1">// kurikulum</p>
            <h1 className="text-2xl font-bold text-[#f5f5f5] mb-2">Materi Belajar</h1>
            <p className="text-[#a1a1aa] text-sm max-w-xl">
              Kurikulum terstruktur dari dasar hingga advanced — Node.js, automation, scraping, sampai
              bypass teknik keamanan. Semua ada di sini.
            </p>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Total Modul",   value: MATERI_LIST.length,      color: "#00ff88" },
            { label: "Tersedia",      value: MATERI_LIST.length,      color: "#60a5fa" },
            { label: "Selesai",       value: "0",                     color: "#a78bfa" },
          ].map((s) => (
            <div key={s.label} className="bg-[#1a1f1a] border border-[#27272a] p-4 text-center">
              <p className="text-2xl font-bold font-mono" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[#52525b] text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Grid modul */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {MATERI_LIST.map((m, i) => (
            <div
              key={i}
              className="group bg-[#1a1f1a] border border-[#27272a] p-5 hover:border-[#00ff88]/30 transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ff88]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Icon + badge */}
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-[#00ff88]/8 border border-[#00ff88]/20 flex items-center justify-center text-[#00ff88] text-lg">
                  {m.icon}
                </div>
                <span className={`text-[10px] font-mono uppercase border px-2 py-0.5 ${BADGE_COLOR_MAP[m.badge] ?? "text-[#52525b] border-[#27272a] bg-transparent"}`}>
                  {m.badge}
                </span>
              </div>

              {/* Title + desc */}
              <h3 className="text-[#f5f5f5] font-bold text-sm mb-1.5 group-hover:text-[#00ff88] transition-colors">
                {m.title}
              </h3>
              <p className="text-[#71717a] text-xs leading-relaxed mb-3">{m.desc}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {m.tags.map((t) => (
                  <span key={t} className="text-[10px] bg-[#27272a] text-[#71717a] px-2 py-0.5 font-mono">
                    {t}
                  </span>
                ))}
              </div>

              {/* Coming soon overlay */}
              <div className="mt-3 pt-3 border-t border-[#27272a] flex items-center justify-between">
                <span className="text-[10px] text-[#52525b] font-mono">// segera tersedia</span>
                <span className="text-[10px] border border-[#27272a] text-[#52525b] px-1.5 py-0.5">SOON</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#1a1f1a] border border-dashed border-[#27272a] p-4 text-center">
          <p className="text-[#52525b] text-xs font-mono">
            <span className="text-[#00ff88]">$</span> Konten materi dalam pengembangan — notifikasi akan dikirim saat live
          </p>
        </div>
      </main>
    </div>
  );
}

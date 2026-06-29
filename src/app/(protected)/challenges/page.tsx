import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { CHALLENGE_INFO_CARDS, CHALLENGE_CARDS } from "@/lib/data/challenges";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Challenges" };
export const dynamic = "force-dynamic";

export default async function ChallengesPage() {
  const store = await cookies();
  const token = store.get("dkl_token")?.value;
  const payload = token ? verifyToken(token) : null;
  const userName = payload?.name ?? "Member";

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <DashboardTopbar
        title="Challenges"
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
            <p className="text-[#00ff88] text-xs uppercase tracking-widest mb-1">// automation challenges</p>
            <h1 className="text-2xl font-bold text-[#f5f5f5] mb-2">Uji Skill Automasi Kamu</h1>
            <p className="text-[#a1a1aa] text-sm max-w-xl">
              Selesaikan tantangan dunia nyata. Kumpulkan poin, naikkan peringkatmu di leaderboard,
              dan buktikan bahwa kamu adalah automation engineer handal.
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CHALLENGE_INFO_CARDS.map((info, idx) => (
            <div key={idx} className="bg-[#1a1f1a] border border-[#27272a] p-5">
              <div className="w-10 h-10 bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center text-[#00ff88] mb-4">
                {info.icon}
              </div>
              <h3 className="text-[#f5f5f5] font-bold text-sm mb-2">{info.title}</h3>
              <p className="text-[#71717a] text-xs leading-relaxed">{info.desc}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-[#27272a]" />
          <span className="text-[#52525b] text-xs font-mono uppercase tracking-widest">Daftar Tantangan</span>
          <div className="h-px flex-1 bg-[#27272a]" />
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CHALLENGE_CARDS.map((challenge, idx) => (
            <div
              key={idx}
              className="group bg-[#0d120d] border border-[#27272a] hover:border-[#00ff88]/30 transition-colors p-5 relative overflow-hidden"
            >
              {/* Difficulty badge */}
              <div className="flex justify-between items-start mb-3">
                <span className={`text-[10px] font-mono uppercase border px-2 py-0.5 ${challenge.diffColor} bg-white/5`}>
                  {challenge.difficulty}
                </span>
                <span className="text-[#00ff88] text-xs font-mono font-bold bg-[#00ff88]/10 px-2 py-1">
                  +{challenge.points} pts
                </span>
              </div>

              <h3 className="text-[#f5f5f5] font-bold text-sm mb-2 group-hover:text-[#00ff88] transition-colors">
                {challenge.title}
              </h3>
              <p className="text-[#71717a] text-xs leading-relaxed mb-4">
                {challenge.desc}
              </p>

              <div className="border-t border-[#27272a] pt-4 mt-auto">
                <button
                  disabled
                  className="w-full py-2 bg-[#27272a] text-[#52525b] text-xs font-bold uppercase tracking-wider cursor-not-allowed border border-[#3f3f46]/50"
                >
                  Segera Hadir
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

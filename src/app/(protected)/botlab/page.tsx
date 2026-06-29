import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { BOT_LAB_FEATURES } from "@/lib/data/botlab";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Bot Lab" };
export const dynamic = "force-dynamic";

export default async function BotLabPage() {
  const store = await cookies();
  const token = store.get("dkl_token")?.value;
  const payload = token ? verifyToken(token) : null;
  const userName = payload?.name ?? "Member";

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <DashboardTopbar
        title="Bot Lab"
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
            <p className="text-[#00ff88] text-xs uppercase tracking-widest mb-1">// ruang eksperimen</p>
            <h1 className="text-2xl font-bold text-[#f5f5f5] mb-2">Bot Lab (Eksperimental)</h1>
            <p className="text-[#a1a1aa] text-sm max-w-xl">
              Workspace all-in-one untuk merancang, menguji, dan men-deploy bot automation kamu.
              Dilengkapi dengan AI assistant khusus dan template siap pakai.
            </p>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {BOT_LAB_FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="bg-[#1a1f1a] border border-[#27272a] p-5 hover:border-[#00ff88]/30 transition-colors group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative z-10">
                <div className="w-10 h-10 bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center text-[#00ff88] mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-[#f5f5f5] font-bold text-sm mb-2 group-hover:text-[#00ff88] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[#71717a] text-xs leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Terminal/Status Area */}
        <div className="bg-[#0a0f0a] border border-[#27272a] p-4 font-mono">
          <div className="flex items-center gap-2 text-xs mb-3 text-[#52525b]">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="w-2 h-2 rounded-full bg-yellow-500" />
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="ml-2">lab-status.sh</span>
          </div>
          <div className="text-xs text-[#a1a1aa] space-y-1">
            <p><span className="text-[#00ff88]">$</span> ping bot-lab-core</p>
            <p className="text-[#52525b]">Loading modules... [||||||||||          ] 50%</p>
            <p className="text-yellow-400">WARN: Area ini masih dalam tahap pengembangan aktif.</p>
            <p>Silakan pantau pembaruan di Discord atau grup Telegram DKL.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

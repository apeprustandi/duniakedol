import { SectionHeader } from "@/components/ui/SectionHeader";
import { HOW_IT_WORKS_STEPS } from "@/lib/data/steps";

/* ── Progress terminal mock ─────────────────────────────── */
function ProgressTerminal() {
  return (
    <div className="bg-[#1a1f1a] border border-[#27272a] overflow-hidden shadow-2xl shadow-[#00ff88]/5">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0a0f0a]/80 border-b border-[#27272a]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-[#a1a1aa] text-xs ml-2">~/progress</span>
      </div>
      <div className="p-5 text-sm leading-relaxed font-mono">
        <div className="space-y-3 text-xs">
          <p>
            <span className="text-[#00ff88]">$</span> etl status --user
          </p>
          <div className="border-t border-[#27272a] my-2" />
          <p className="text-[#a1a1aa]">
            <span className="text-[#f5f5f5]">Modul selesai:</span>{" "}
            <span className="text-[#00ff88]">--------</span> 80%
          </p>
          <p className="text-[#a1a1aa]">
            <span className="text-[#f5f5f5]">Challenge passed:</span>{" "}
            <span className="text-yellow-400">------</span> 60%
          </p>
          <p className="text-[#a1a1aa]">
            <span className="text-[#f5f5f5]">Ranking:</span>{" "}
            <span className="text-[#00ff88]">#12</span> dari 100+ member
          </p>
          <div className="border-t border-[#27272a] my-2" />
          <p className="text-[#00ff88] flex items-center gap-1.5">
            ✔ Keep going! Level up terus 🚀
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── How It Works Section ───────────────────────────────── */
export function HowItWorksSection() {
  return (
    <section id="how" className="relative z-10 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="// cara kerja"
          title="3 Langkah Simpel"
          subtitle="Mulai perjalanan belajar kamu dalam hitungan menit."
        />

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Steps */}
          <div className="space-y-10">
            {HOW_IT_WORKS_STEPS.map(({ num, title, desc, delay = 0 }) => (
              <div
                key={num}
                className="reveal relative"
                style={{ transitionDelay: `${delay}ms` }}
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 border border-[#00ff88] text-[#00ff88] flex items-center justify-center font-bold text-lg">
                    {num}
                  </div>
                  <div>
                    <h3 className="text-[#f5f5f5] font-semibold text-base mb-1.5">
                      {title}
                    </h3>
                    <p className="text-[#a1a1aa] text-sm leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress terminal (desktop only) */}
          <div className="hidden md:block">
            <div className="reveal" style={{ transitionDelay: "200ms" }}>
              <ProgressTerminal />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

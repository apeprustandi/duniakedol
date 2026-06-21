import { SectionHeader } from "@/components/ui/SectionHeader";
import { CHALLENGE_INFO_CARDS, CHALLENGE_CARDS } from "@/lib/data/challenges";

export function ChallengesSection() {
  return (
    <section id="challenges" className="relative z-10 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="// automation challenges"
          title="Tantangan Dunia Nyata"
          subtitle="Latihan automasi yang mensimulasikan skenario real-world. Selesaikan untuk dapat poin."
        />

        {/* Info cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {CHALLENGE_INFO_CARDS.map(({ icon, title, desc, delay = 0 }) => (
            <div
              key={title}
              className="reveal bg-[#1a1f1a] border border-[#27272a] p-5 transition-all duration-700 hover:border-[#00ff88]/30"
              style={{ transitionDelay: `${delay}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[#00ff88] text-lg leading-none">{icon}</span>
                <h4 className="text-[#f5f5f5] font-semibold text-sm">{title}</h4>
              </div>
              <p className="text-[#a1a1aa] text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Challenge preview cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CHALLENGE_CARDS.map(({ difficulty, diffColor, title, desc, points, delay = 0 }) => (
            <div
              key={title}
              className="reveal group relative bg-[#1a1f1a] border border-[#27272a] p-5 transition-all duration-700 hover:border-[#00ff88]/50 hover:shadow-lg hover:shadow-[#00ff88]/5"
              style={{ transitionDelay: `${delay}ms` }}
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ff88]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 border ${diffColor}`}>
                  {difficulty}
                </span>
                <span className="text-[#00ff88] text-xs font-mono">+{points} pts</span>
              </div>
              <h4 className="text-[#f5f5f5] font-semibold text-sm mb-2">{title}</h4>
              <p className="text-[#a1a1aa] text-xs leading-relaxed mb-4">{desc}</p>
              <button className="w-full border border-[#00ff88]/30 text-[#00ff88] py-2 text-xs tracking-wide hover:bg-[#00ff88]/10 transition-colors">
                Lihat Detail
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

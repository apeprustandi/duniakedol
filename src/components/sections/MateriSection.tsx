import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MATERI_LIST } from "@/lib/data/materi";

export function MateriSection() {
  return (
    <section id="materi" className="relative z-10 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="// learning path"
          title="Materi yang Kamu Pelajari"
          subtitle="Kurikulum terstruktur dari fondasi Node.js sampai teknik advanced. Setiap modul punya video, topik, dan praktik."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MATERI_LIST.map(({ icon, badge, badgeColor, title, desc, tags, delay = 0 }) => (
            <div
              key={title}
              className="reveal group relative bg-[#1a1f1a] border border-[#27272a] p-6 transition-all duration-700 hover:border-[#00ff88]/50 hover:shadow-lg hover:shadow-[#00ff88]/5"
              style={{ transitionDelay: `${delay}ms` }}
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ff88]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <div className="flex items-center justify-between mb-4">
                <div className="text-[#00ff88] text-2xl">{icon}</div>
                <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 border ${badgeColor}`}>
                  {badge}
                </span>
              </div>
              <h3 className="text-[#f5f5f5] font-semibold text-base mb-2">{title}</h3>
              <p className="text-[#a1a1aa] text-sm leading-relaxed mb-4">{desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] text-[#a1a1aa] bg-[#0a0f0a] border border-[#27272a] px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-[#a1a1aa] text-sm mb-4">
            Daftar untuk akses semua materi ini secara lengkap.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 text-[#00ff88] border border-[#00ff88]/40 px-6 py-3 text-sm font-semibold hover:bg-[#00ff88]/10 transition-colors"
          >
            Daftar Sekarang <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

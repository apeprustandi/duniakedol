import { SiDiscord, SiGithub } from "react-icons/si";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function CommunitySection() {
  return (
    <section id="komunitas" className="relative z-10 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="// komunitas"
          title="Gabung Komunitas Aktif"
          subtitle="Belajar bareng lebih efektif. Join Discord dan GitHub kami, connect dengan ratusan learner lain."
        />

        <div className="grid md:grid-cols-2 gap-5">
          {/* Discord */}
          <div className="reveal group relative bg-[#1a1f1a] border border-[#27272a] p-6 hover:border-[#5865F2]/50 transition-all duration-500">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#5865F2]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            <div className="flex items-center gap-3 mb-4">
              <SiDiscord className="text-[#5865F2] text-3xl" />
              <div>
                <h3 className="text-[#f5f5f5] font-semibold text-base">Discord Server</h3>
                <p className="text-[#a1a1aa] text-xs">500+ members online</p>
              </div>
            </div>
            <p className="text-[#a1a1aa] text-sm leading-relaxed mb-5">
              Server aktif dengan channel belajar, showcase bot, dan job hunting.
              Tanya apa aja, pasti ada yang jawab.
            </p>
            <a
              href="https://discord.gg/duniakedol"
              className="inline-flex items-center gap-2 bg-[#5865F2]/15 border border-[#5865F2]/30 text-[#5865F2] px-4 py-2 text-sm font-semibold hover:bg-[#5865F2]/25 transition-colors"
            >
              <SiDiscord /> Join Discord
            </a>
          </div>

          {/* GitHub */}
          <div className="reveal group relative bg-[#1a1f1a] border border-[#27272a] p-6 hover:border-[#00ff88]/50 transition-all duration-500">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ff88]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            <div className="flex items-center gap-3 mb-4">
              <SiGithub className="text-[#f5f5f5] text-3xl" />
              <div>
                <h3 className="text-[#f5f5f5] font-semibold text-base">GitHub Organization</h3>
                <p className="text-[#a1a1aa] text-xs">100+ repos & projects</p>
              </div>
            </div>
            <p className="text-[#a1a1aa] text-sm leading-relaxed mb-5">
              Akses koleksi bot, script, dan project member. Kontribusi dan
              pelajari kode orang lain secara langsung.
            </p>
            <a
              href="https://github.com/duniakedol"
              className="inline-flex items-center gap-2 bg-[#00ff88]/10 border border-[#00ff88]/30 text-[#00ff88] px-4 py-2 text-sm font-semibold hover:bg-[#00ff88]/20 transition-colors"
            >
              <SiGithub /> GitHub Org
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

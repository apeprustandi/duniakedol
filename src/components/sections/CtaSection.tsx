import Link from "next/link";
import { SiDiscord } from "react-icons/si";

export function CtaSection() {
  return (
    <section className="relative z-10 py-24 sm:py-32 text-center">
      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal">
          <span className="text-[#00ff88] text-xs tracking-widest">
            // ready?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f5f5f5] mt-3 mb-4">
            Siap Mulai Belajar?
          </h2>
          <p className="text-[#a1a1aa] text-sm max-w-lg mx-auto mb-8">
            Komunitas yang bikin kamu jago automasi. Materi lengkap, challenge
            seru, dan support dari sesama learner.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="bg-[#00ff88] text-[#0a0f0a] px-8 py-3 font-bold text-sm tracking-wide hover:bg-[#f5f5f5] transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-[#00ff88]/20"
            >
              Gabung Sekarang →
            </Link>
            <a
              href="https://discord.gg/duniakedol"
              className="border border-[#00ff88]/50 text-[#00ff88] px-8 py-3 text-sm tracking-wide hover:bg-[#00ff88]/10 transition-all duration-300 flex items-center gap-2"
            >
              <SiDiscord /> Join Discord
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

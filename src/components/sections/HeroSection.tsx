"use client";
import Link from "next/link";
import { useTerminalTyping } from "@/hooks/useTerminalTyping";

/* ── Terminal Typing Widget ─────────────────────────────── */
function TerminalTyping() {
  const typedRef = useTerminalTyping();

  return (
    <div className="p-5 text-sm leading-relaxed font-mono">
      <p className="text-[#a1a1aa] mb-1">
        <span className="text-[#00ff88]">$</span> node learn.js
      </p>
      <p className="text-[#a1a1aa] text-xs mb-3 flex items-center gap-1.5">
        <span className="text-[#00ff88] text-sm">&#9989;</span> Connected to DKL Community
      </p>
      <div className="border-t border-[#27272a] my-3" />
      <p className="text-[#a1a1aa] mb-1">
        <span className="text-yellow-400">const</span>{" "}
        <span className="text-blue-400">skill</span>{" "}
        <span className="text-[#f5f5f5]">=</span>{" "}
        <span className="text-[#00ff88]">
          <span ref={typedRef}></span>
          <span className="cursor-blink">|</span>
        </span>
      </p>
      <div className="border-t border-[#27272a] my-3" />
      <p className="text-xs text-[#a1a1aa] mt-2">
        <span className="text-[#00ff88]">&#8594;</span> 50+ modul pembelajaran
      </p>
      <p className="text-xs text-[#a1a1aa]">
        <span className="text-[#00ff88]">&#8594;</span> 10+ automation challenges
      </p>
      <p className="text-xs text-[#a1a1aa]">
        <span className="text-[#00ff88]">&#8594;</span>{" "}Komunitas aktif Discord &amp; GitHub
      </p>
    </div>
  );
}

/* ── Hero Section ───────────────────────────────────────── */
export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — headline & CTA */}
          <div className="relative z-10 reveal-hero reveal">
            <div className="inline-block border border-[#00ff88]/30 px-3 py-1 mb-6">
              <span className="text-[#00ff88] text-xs tracking-widest uppercase">
                // komunitas belajar automasi
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] mb-2">
              <span className="text-[#f5f5f5]">Belajar </span>
              <span className="text-[#00ff88]">Node.js</span>
              <br />
              <span className="text-[#f5f5f5]">&amp; Automasi</span>
              <br />
              <span className="text-[#a1a1aa] text-2xl sm:text-3xl lg:text-4xl font-light">
                dari Nol sampai Jago.
              </span>
            </h1>

            <p className="text-[#a1a1aa] text-sm sm:text-base leading-relaxed max-w-md mb-6">
              Gabung komunitas yang bikin belajar programming jadi gampang.
              Materi terstruktur, challenge seru, dan support dari sesama
              learner.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/login"
                className="bg-[#00ff88] text-[#0a0f0a] px-7 py-3 font-bold text-sm tracking-wide hover:bg-[#f5f5f5] transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-[#00ff88]/20"
              >
                Mulai Belajar →
              </Link>
              <button className="border border-[#00ff88]/50 text-[#00ff88] px-7 py-3 text-sm tracking-wide hover:bg-[#00ff88]/10 transition-all duration-300">
                Lihat Fitur
              </button>
            </div>
          </div>

          {/* Right — terminal widget */}
          <div
            className="relative z-10 reveal-hero reveal"
            style={{ transitionDelay: "300ms" }}
          >
            <div className="absolute -inset-1 bg-gradient-to-br from-[#00ff88]/20 via-transparent to-[#00ff88]/10 blur-xl" />
            <div className="bg-[#1a1f1a] border border-[#27272a] overflow-hidden shadow-2xl shadow-[#00ff88]/5">
              {/* Titlebar */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0a0f0a]/80 border-b border-[#27272a]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[#a1a1aa] text-xs ml-2">
                  ~/duniakedol
                </span>
              </div>
              <TerminalTyping />
            </div>
          </div>

        </div>
      </div>

      {/* Scroll down indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 reveal-hero reveal"
        style={{ transitionDelay: "700ms" }}
      >
        <button
          className="text-[#a1a1aa] hover:text-[#00ff88] transition-colors"
          aria-label="Scroll down"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs tracking-widest uppercase">scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-[#a1a1aa] to-transparent animate-pulse" />
          </div>
        </button>
      </div>
    </section>
  );
}

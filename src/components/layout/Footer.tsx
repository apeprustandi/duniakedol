"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  if (pathname === "/login") {
    return null;
  }

  return (
    <footer className="relative z-10 bg-[#0a0f0a] border-t border-[#27272a] py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/7.jpg" alt="DKL Logo" width={32} height={32} className="rounded-full" />
              <span className="text-[#00ff88] font-bold text-sm tracking-wide">
                Dunia<span className="text-[#f5f5f5]"> </span>Kedol
              </span>
            </div>
            <p className="text-[#a1a1aa] text-sm leading-relaxed max-w-xs">
              Komunitas belajar Node.js dan automasi. Belajar bareng, sharing
              ilmu, jadi jago bareng.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-[#f5f5f5] font-semibold text-xs uppercase tracking-widest mb-4">
              Platform
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Dashboard", href: "/dashboard" },
                { label: "Challenges", href: "/challenges" },
                { label: "Interactive Learning", href: "/materi" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[#a1a1aa] hover:text-[#00ff88] text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Komunitas */}
          <div>
            <h4 className="text-[#f5f5f5] font-semibold text-xs uppercase tracking-widest mb-4">
              Komunitas
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Discord Server", href: "https://discord.gg/duniakedol" },
                { label: "GitHub Organization", href: "https://github.com/duniakedol" },
                { label: "Forum Diskusi", href: "/forum" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-[#a1a1aa] hover:text-[#00ff88] text-sm transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#27272a] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#a1a1aa] text-xs">
            &copy; 2026 Dunia Kedol. Made with{" "}
            <span className="text-red-500">&#10084;</span> by DKLMaster
          </p>
          <p className="font-mono text-[#a1a1aa] text-xs">
            <span className="text-[#00ff88]">v1.0.0</span> // node.js automation
          </p>
        </div>
      </div>
    </footer>
  );
}

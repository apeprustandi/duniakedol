"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Fitur", href: "#features" },
  { label: "Bot Lab", href: "#botlab" },
  { label: "Cara Kerja", href: "#how" },
  { label: "Materi", href: "#materi" },
  { label: "Challenges", href: "#challenges" },
  { label: "Harga", href: "#harga" },
  { label: "Komunitas", href: "#komunitas" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0f0a]/95 border-b border-[#27272a]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/7.jpg"
            alt="DKL"
            width={32}
            height={32}
            className="rounded-full border border-[#00ff88]/50 group-hover:border-[#00ff88] transition-colors"
          />
          <span className="text-[#00ff88] font-bold text-sm tracking-wide">
            Dunia<span className="text-[#f5f5f5]"> </span>Kedol
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="text-[#a1a1aa] hover:text-[#00ff88] text-xs tracking-wide uppercase transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <Link
            href="/login"
            className="bg-[#00ff88] text-[#0a0f0a] px-5 py-2 text-xs font-bold tracking-wide uppercase hover:bg-[#f5f5f5] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Masuk
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#f5f5f5] p-2"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="space-y-1.5">
            <div
              className={`w-5 h-0.5 bg-[#f5f5f5] transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <div
              className={`w-5 h-0.5 bg-[#f5f5f5] transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <div
              className={`w-5 h-0.5 bg-[#f5f5f5] transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="bg-[#1a1f1a] border-t border-[#27272a] px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="block w-full text-left text-[#a1a1aa] hover:text-[#00ff88] text-sm py-2 transition-colors"
            >
              {link.label}
            </button>
          ))}
          <Link
            href="/login"
            className="block w-full text-center bg-[#00ff88] text-[#0a0f0a] px-5 py-2.5 text-sm font-bold hover:bg-[#f5f5f5] transition-all duration-300 mt-2"
          >
            Masuk
          </Link>
        </div>
      </div>
    </nav>
  );
}
"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiGrid,
  FiBook,
  FiZap,
  FiMap,
  FiCpu,
  FiSettings,
  FiMenu,
  FiX,
  FiChevronRight,
} from "react-icons/fi";

const NAV_ITEMS = [
  { label: "Dashboard",  href: "/dashboard",   icon: FiGrid },
  { label: "Materi",     href: "/materi",       icon: FiBook },
  { label: "Challenges", href: "/challenges",   icon: FiZap },
  { label: "Roadmap",    href: "/roadmap",      icon: FiMap },
  { label: "Bot Lab",    href: "/botlab",       icon: FiCpu },
  { label: "Settings",   href: "/settings",     icon: FiSettings },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-6 py-5 border-b border-[#27272a]">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center text-[#00ff88] font-bold text-xs group-hover:bg-[#00ff88]/20 transition-colors">
            DKL
          </div>
          <span className="text-sm font-bold">
            <span className="text-[#00ff88]">Dunia</span>
            <span className="text-[#f5f5f5]"> </span>
            <span className="text-[#a1a1aa]">Kedol</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-[#52525b] text-xs uppercase tracking-widest px-3 mb-3">
          // navigasi
        </p>
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-all duration-200 group relative ${
                isActive
                  ? "text-[#00ff88] bg-[#00ff88]/8"
                  : "text-[#a1a1aa] hover:text-[#f5f5f5] hover:bg-[#27272a]/60"
              }`}
            >
              {/* Active left bar */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-0.5 bg-[#00ff88]" />
              )}
              <Icon className="text-base shrink-0" />
              <span>{label}</span>
              <FiChevronRight
                className={`ml-auto text-xs transition-opacity ${
                  isActive ? "opacity-100 text-[#00ff88]" : "opacity-0 group-hover:opacity-50"
                }`}
              />
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-[#1a1f1a] border border-[#27272a] p-2 text-[#a1a1aa] hover:text-[#00ff88] transition-colors"
        onClick={() => setOpen(!open)}
        aria-label="Toggle sidebar"
      >
        {open ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#0d120d] border-r border-[#27272a] flex-shrink-0 transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}

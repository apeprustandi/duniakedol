"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { googleLogout } from "@react-oauth/google";
import { FiBell, FiLogOut, FiChevronDown } from "react-icons/fi";

interface DashboardTopbarProps {
  title: string;
  subtitle?: string;
  userName: string;
  userEmail?: string;
  userPicture?: string;
}

export function DashboardTopbar({ title, userName, userEmail, userPicture }: DashboardTopbarProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* ── Posisi dropdown berdasarkan posisi avatar button ──────── */
  const [pos, setPos] = useState({ top: 0, right: 0 });

  function updatePos() {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setPos({
      top: rect.bottom + 8,
      right: window.innerWidth - rect.right,
    });
  }

  /* ── Buka / tutup ──────────────────────────────────────────── */
  function handleToggle() {
    updatePos();
    setOpen((v) => !v);
  }

  /* ── Tutup jika klik di luar ───────────────────────────────── */
  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (
        btnRef.current?.contains(e.target as Node) ||
        dropdownRef.current?.contains(e.target as Node)
      ) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  /* ── Logout ────────────────────────────────────────────────── */
  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      googleLogout();
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      setLoggingOut(false);
    }
  };

  const initials = userName
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  /* ── Dropdown via Portal (keluar dari semua stacking context) ─ */
  const dropdown = open
    ? createPortal(
        <div
          ref={dropdownRef}
          style={{ position: "fixed", top: pos.top, right: pos.right, zIndex: 9999 }}
          className="w-56 bg-[#0d120d] border border-[#27272a] shadow-2xl shadow-black/80"
        >
          {/* Accent line */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#00ff88]/40 to-transparent" />

          {/* User info */}
          <div className="px-4 py-3 border-b border-[#27272a]">
            <p className="text-[#f5f5f5] text-sm font-medium truncate">{userName}</p>
            {userEmail && (
              <p className="text-[#52525b] text-xs mt-0.5 truncate">{userEmail}</p>
            )}
          </div>

          {/* Menu items */}
          <div className="py-1">
            {/* Notifikasi */}
            <button
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#a1a1aa] hover:text-[#00ff88] hover:bg-[#00ff88]/5 transition-colors text-left"
              aria-label="Notifikasi"
            >
              <span className="relative">
                <FiBell className="text-base" />
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#00ff88] rounded-full" />
              </span>
              <span>Notifikasi</span>
              <span className="ml-auto text-[10px] bg-[#00ff88]/10 text-[#00ff88] px-1.5 py-0.5 font-mono">0</span>
            </button>

            {/* Logout */}
            <button
              id="topbar-logout-btn"
              onClick={handleLogout}
              disabled={loggingOut}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#a1a1aa] hover:text-red-400 hover:bg-red-500/5 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Logout"
            >
              <FiLogOut className="text-base" />
              <span>{loggingOut ? "Keluar..." : "Logout"}</span>
            </button>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <header className="h-16 border-b border-[#27272a] px-6 flex items-center justify-between bg-[#0a0f0a]/80 backdrop-blur-sm shrink-0">
        {/* Page title */}
        <div className="pl-10 md:pl-0">
          <h2 className="text-[#f5f5f5] font-bold text-base leading-none">{title}</h2>
        </div>

        {/* Avatar trigger */}
        <button
          ref={btnRef}
          id="topbar-profile-btn"
          onClick={handleToggle}
          aria-label="Buka menu profil"
          aria-expanded={open}
          className="flex items-center gap-2 group focus:outline-none"
        >
          {userPicture ? (
            <img
              src={userPicture}
              alt={userName}
              className="w-9 h-9 rounded-none border border-[#00ff88]/30 object-cover group-hover:border-[#00ff88]/70 transition-colors"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-9 h-9 bg-[#00ff88]/15 border border-[#00ff88]/30 group-hover:border-[#00ff88]/70 flex items-center justify-center text-[#00ff88] text-xs font-bold transition-colors">
              {initials}
            </div>
          )}
          <FiChevronDown
            className={`text-xs text-[#52525b] group-hover:text-[#00ff88] transition-all duration-200 ${open ? "rotate-180 text-[#00ff88]" : ""}`}
          />
        </button>
      </header>

      {/* Portal dropdown — dirender di document.body, bebas dari semua stacking context */}
      {dropdown}
    </>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiBell, FiLogOut } from "react-icons/fi";

interface DashboardTopbarProps {
  title: string;
  subtitle?: string;
  userName: string;
  userPicture?: string;
}

export function DashboardTopbar({ title, subtitle, userName, userPicture }: DashboardTopbarProps) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
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

  return (
    <header className="h-16 border-b border-[#27272a] px-6 flex items-center justify-between bg-[#0a0f0a]/80 backdrop-blur-sm shrink-0">
      {/* Page title */}
      <div className="pl-10 md:pl-0">
        <h2 className="text-[#f5f5f5] font-bold text-base leading-none">{title}</h2>
        {subtitle && (
          <p className="text-[#52525b] text-xs mt-1 font-normal">{subtitle}</p>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notification bell */}
        <button
          aria-label="Notifikasi"
          className="relative text-[#a1a1aa] hover:text-[#00ff88] transition-colors p-1"
        >
          <FiBell className="text-lg" />
          {/* Badge */}
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#00ff88] rounded-full" />
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-2.5">
          {userPicture ? (
            <img src={userPicture} alt={userName} className="w-8 h-8 rounded-none border border-[#00ff88]/30 object-cover" referrerPolicy="no-referrer" />
          ) : (
            <div className="w-8 h-8 bg-[#00ff88]/15 border border-[#00ff88]/30 flex items-center justify-center text-[#00ff88] text-xs font-bold">
              {initials}
            </div>
          )}
          <span className="hidden sm:block text-[#a1a1aa] text-xs truncate max-w-[120px]">
            {userName}
          </span>

          {/* Logout */}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            aria-label="Logout"
            className="ml-2 relative text-[#a1a1aa] hover:text-red-500 transition-colors p-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiLogOut className="text-lg" />
          </button>
        </div>
      </div>
    </header>
  );
}

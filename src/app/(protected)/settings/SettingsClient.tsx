"use client";
import { useState } from "react";
import { FiSettings, FiUser, FiBell, FiShield, FiCheck, FiMonitor } from "react-icons/fi";

interface SettingsClientProps {
  userName: string;
  userEmail: string;
}

type TabType = "profil" | "preferensi" | "notifikasi" | "keamanan";

export function SettingsClient({ userName, userEmail }: SettingsClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>("profil");

  // Mock states for interactive UI
  const [animasiTerminal, setAnimasiTerminal] = useState(true);
  const [notifEmail, setNotifEmail] = useState({
    modul: true,
    forum: false,
    promo: false,
  });

  const TABS = [
    { id: "profil", icon: <FiUser />, label: "Profil" },
    { id: "preferensi", icon: <FiSettings />, label: "Preferensi" },
    { id: "notifikasi", icon: <FiBell />, label: "Notifikasi" },
    { id: "keamanan", icon: <FiShield />, label: "Keamanan" },
  ] as const;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Sidebar Menu */}
      <div className="md:col-span-1 space-y-1">
        {TABS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors text-left ${
              activeTab === item.id
                ? "bg-[#00ff88]/10 text-[#00ff88] border-l-2 border-[#00ff88]"
                : "text-[#a1a1aa] hover:bg-[#27272a]/50 hover:text-[#f5f5f5] border-l-2 border-transparent"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="md:col-span-3 space-y-6">
        
        {/* --- TAB: PROFIL --- */}
        {activeTab === "profil" && (
          <div className="bg-[#1a1f1a] border border-[#27272a] p-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-[#f5f5f5] font-bold mb-4">Informasi Profil</h2>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-[#a1a1aa] text-xs font-mono mb-1.5">Nama Lengkap</label>
                <input
                  type="text"
                  disabled
                  value={userName}
                  className="w-full bg-[#0a0f0a] border border-[#27272a] text-[#f5f5f5] px-3 py-2 text-sm focus:outline-none opacity-70 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-[#a1a1aa] text-xs font-mono mb-1.5">Email (Google)</label>
                <input
                  type="text"
                  disabled
                  value={userEmail}
                  className="w-full bg-[#0a0f0a] border border-[#27272a] text-[#f5f5f5] px-3 py-2 text-sm focus:outline-none opacity-70 cursor-not-allowed"
                />
                <p className="text-[#52525b] text-[10px] mt-1.5">
                  Data ini disinkronisasi dari akun Google Anda dan tidak dapat diubah di sini.
                </p>
              </div>
              <div className="pt-4 border-t border-[#27272a]">
                <label className="block text-[#a1a1aa] text-xs font-mono mb-1.5">Bio / Tagline</label>
                <input
                  type="text"
                  placeholder="Automator enthusiast..."
                  className="w-full bg-[#0a0f0a] border border-[#27272a] focus:border-[#00ff88]/50 text-[#f5f5f5] px-3 py-2 text-sm focus:outline-none transition-colors"
                />
                <div className="flex justify-end mt-3">
                  <button className="px-4 py-1.5 bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 hover:bg-[#00ff88]/20 transition-colors text-xs font-mono">
                    Simpan Bio
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB: PREFERENSI --- */}
        {activeTab === "preferensi" && (
          <div className="bg-[#1a1f1a] border border-[#27272a] p-6 animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">
            <h2 className="text-[#f5f5f5] font-bold mb-2">Preferensi Tampilan & Sistem</h2>
            
            <div className="space-y-4">
              {/* Tema */}
              <div className="flex items-center justify-between pb-4 border-b border-[#27272a]">
                <div>
                  <p className="text-[#f5f5f5] text-sm mb-1">Tema Tampilan</p>
                  <p className="text-[#a1a1aa] text-xs">Pilih tema warna untuk dashboard.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-[#0a0f0a] border border-[#00ff88] text-[#00ff88] text-xs font-mono flex items-center gap-2">
                    <FiMonitor /> Dark Mode (Default)
                  </span>
                </div>
              </div>

              {/* Animasi Terminal */}
              <div className="flex items-center justify-between pb-4 border-b border-[#27272a]">
                <div>
                  <p className="text-[#f5f5f5] text-sm mb-1">Animasi Efek Terminal</p>
                  <p className="text-[#a1a1aa] text-xs">Tampilkan animasi mengetik di header section.</p>
                </div>
                <button
                  onClick={() => setAnimasiTerminal(!animasiTerminal)}
                  className={`w-10 h-5 rounded-full relative transition-colors ${animasiTerminal ? "bg-[#00ff88]" : "bg-[#27272a]"}`}
                >
                  <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${animasiTerminal ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>

              {/* Bahasa */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#f5f5f5] text-sm mb-1">Bahasa Sistem</p>
                  <p className="text-[#a1a1aa] text-xs">Bahasa utama untuk antarmuka DKL.</p>
                </div>
                <select className="bg-[#0a0f0a] border border-[#27272a] text-[#f5f5f5] text-xs font-mono px-3 py-1.5 focus:outline-none focus:border-[#00ff88]/50 cursor-pointer">
                  <option value="id">Bahasa Indonesia</option>
                  <option value="en" disabled>English (Soon)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB: NOTIFIKASI --- */}
        {activeTab === "notifikasi" && (
          <div className="bg-[#1a1f1a] border border-[#27272a] p-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-[#f5f5f5] font-bold mb-4">Pengaturan Email Notifikasi</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-[#27272a]">
                <div>
                  <p className="text-[#f5f5f5] text-sm mb-1">Pembaruan Modul Baru</p>
                  <p className="text-[#a1a1aa] text-xs">Kirim email saat materi atau phase roadmap baru dirilis.</p>
                </div>
                <button
                  onClick={() => setNotifEmail({...notifEmail, modul: !notifEmail.modul})}
                  className={`w-10 h-5 rounded-full relative transition-colors ${notifEmail.modul ? "bg-[#00ff88]" : "bg-[#27272a]"}`}
                >
                  <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${notifEmail.modul ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-[#27272a]">
                <div>
                  <p className="text-[#f5f5f5] text-sm mb-1">Notifikasi Forum</p>
                  <p className="text-[#a1a1aa] text-xs">Beri tahu saya jika ada yang membalas komentar atau bertanya.</p>
                </div>
                <button
                  onClick={() => setNotifEmail({...notifEmail, forum: !notifEmail.forum})}
                  className={`w-10 h-5 rounded-full relative transition-colors ${notifEmail.forum ? "bg-[#00ff88]" : "bg-[#27272a]"}`}
                >
                  <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${notifEmail.forum ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#f5f5f5] text-sm mb-1">Info & Promo Komunitas</p>
                  <p className="text-[#a1a1aa] text-xs">Email tentang meetup, event, atau penawaran khusus DKL.</p>
                </div>
                <button
                  onClick={() => setNotifEmail({...notifEmail, promo: !notifEmail.promo})}
                  className={`w-10 h-5 rounded-full relative transition-colors ${notifEmail.promo ? "bg-[#00ff88]" : "bg-[#27272a]"}`}
                >
                  <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${notifEmail.promo ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB: KEAMANAN --- */}
        {activeTab === "keamanan" && (
          <div className="bg-[#1a1f1a] border border-[#27272a] p-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-[#f5f5f5] font-bold mb-4">Keamanan & Sesi</h2>
            
            <div className="space-y-6">
              {/* Linked Accounts */}
              <div>
                <p className="text-[#f5f5f5] text-sm mb-3">Akun Terhubung</p>
                <div className="flex items-center justify-between p-3 border border-[#27272a] bg-[#0a0f0a]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white flex items-center justify-center p-1 rounded-sm">
                      <img src="https://www.google.com/favicon.ico" alt="Google" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <p className="text-[#f5f5f5] text-sm">Google OAuth</p>
                      <p className="text-[#a1a1aa] text-xs">{userEmail}</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#00ff88] flex items-center gap-1 font-mono">
                    <FiCheck /> Terhubung
                  </span>
                </div>
              </div>

              {/* Session Management */}
              <div className="pt-4 border-t border-[#27272a]">
                <p className="text-[#f5f5f5] text-sm mb-3">Manajemen Sesi</p>
                <div className="flex items-center justify-between p-4 border border-red-500/20 bg-red-500/5">
                  <div>
                    <p className="text-[#f5f5f5] text-sm text-red-400 font-bold">Logout dari Semua Perangkat</p>
                    <p className="text-[#a1a1aa] text-xs mt-1 max-w-sm">
                      Ini akan menghapus semua sesi aktif kamu di perangkat lain. Kamu harus login kembali.
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-colors text-xs font-mono whitespace-nowrap">
                    Logout All
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

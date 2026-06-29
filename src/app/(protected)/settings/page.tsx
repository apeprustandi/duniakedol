import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { SettingsClient } from "./SettingsClient";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Settings" };
export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const store = await cookies();
  const token = store.get("dkl_token")?.value;
  const payload = token ? verifyToken(token) : null;
  const userName = payload?.name ?? "Member";

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <DashboardTopbar
        title="Settings"
        userName={userName}
        userEmail={payload?.email}
        userPicture={payload?.picture}
      />

      <main className="flex-1 overflow-y-auto p-6 space-y-8">
        <div className="relative bg-[#1a1f1a] border border-[#27272a] p-6 overflow-hidden">
          <div className="absolute -right-8 -top-8 w-48 h-48 bg-[#a1a1aa]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <h1 className="text-2xl font-bold text-[#f5f5f5] mb-1">Pengaturan Akun</h1>
            <p className="text-[#a1a1aa] text-sm max-w-xl">
              Kelola preferensi akun, notifikasi, dan keamanan profil kamu.
            </p>
          </div>
        </div>

        <SettingsClient userName={userName} userEmail={payload?.email || ""} />
      </main>
    </div>
  );
}

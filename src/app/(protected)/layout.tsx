import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

// Force dynamic rendering — this layout reads cookies and must not be statically pre-rendered
export const dynamic = "force-dynamic";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* ── Verify auth (defense-in-depth — middleware handles the main check) ── */
  const store = await cookies();
  const token = store.get("dkl_token")?.value;
  const payload = token ? verifyToken(token) : null;

  if (!payload) redirect("/login");

  const user = { name: payload.name, email: payload.email, picture: payload.picture };

  return (
    <div className="flex h-screen bg-[#0a0f0a] overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {children}
      </div>
    </div>
  );
}

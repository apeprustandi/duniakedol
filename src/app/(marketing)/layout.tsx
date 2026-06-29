import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ParticleCanvas } from "@/components/ui/ParticleCanvas";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* ── Background layers (sama dengan /login) ──────────── */}

      {/* Ambient glow blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#00ff88]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#00ff88]/3 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Animated particle background (di atas grid) */}
      <ParticleCanvas />

      {/* Fixed navigation */}
      <Navbar />

      {/* Page content */}
      <div className="min-h-screen bg-[#0a0f0a] text-[#f5f5f5] overflow-x-hidden">
        {children}
      </div>

      {/* Footer */}
      <Footer />

      {/* Scroll-reveal observer */}
      <ScrollReveal />
    </>
  );
}

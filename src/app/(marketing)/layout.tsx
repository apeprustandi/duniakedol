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
      {/* Animated particle background */}
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

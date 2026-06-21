import { FeatureCard } from "@/components/ui/FeatureCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FEATURES } from "@/lib/data/features";

export function FeaturesSection() {
  return (
    <section id="features" className="relative z-10 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="// fitur unggulan"
          title="Semua yang Kamu Butuhkan"
          subtitle="Platform lengkap buat belajar Node.js dan automasi web dari awal sampai mahir."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

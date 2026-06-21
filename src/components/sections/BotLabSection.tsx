import { FeatureCard } from "@/components/ui/FeatureCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BOT_LAB_FEATURES } from "@/lib/data/botlab";

export function BotLabSection() {
  return (
    <section id="botlab" className="relative z-10 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="// bot lab & AI"
          title="Toolkit Bikin Bot + AI"
          subtitle="Bukan cuma teori — ada toolkit lengkap & AI yang bantu kamu dari nol sampai bot jadi."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BOT_LAB_FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

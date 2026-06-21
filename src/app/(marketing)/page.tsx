import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { BotLabSection } from "@/components/sections/BotLabSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { MateriSection } from "@/components/sections/MateriSection";
import { ChallengesSection } from "@/components/sections/ChallengesSection";
import { RoadmapSection } from "@/components/sections/RoadmapSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { CtaSection } from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <BotLabSection />
      <HowItWorksSection />
      <MateriSection />
      <ChallengesSection />
      <RoadmapSection />
      <PricingSection />
      <CommunitySection />
      <CtaSection />
    </main>
  );
}

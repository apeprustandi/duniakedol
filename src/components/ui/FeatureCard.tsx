import type { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
}: FeatureCardProps) {
  return (
    <div
      className="reveal group relative bg-[#1a1f1a] border border-[#27272a] p-6 transition-all duration-700 hover:border-[#00ff88]/50 hover:shadow-lg hover:shadow-[#00ff88]/5"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Top shimmer on hover */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ff88]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      <div className="text-[#00ff88] text-2xl mb-4">{icon}</div>
      <h3 className="text-[#f5f5f5] font-semibold text-base mb-2">{title}</h3>
      <p className="text-[#a1a1aa] text-sm leading-relaxed">{description}</p>
    </div>
  );
}

import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  accentColor?: string;
  trend?: "up" | "down" | "neutral";
}

export function StatCard({
  icon,
  label,
  value,
  sub,
  accentColor = "#00ff88",
  trend = "neutral",
}: StatCardProps) {
  const trendColor =
    trend === "up" ? "text-[#00ff88]" : trend === "down" ? "text-red-400" : "text-[#a1a1aa]";
  const trendArrow = trend === "up" ? "↑" : trend === "down" ? "↓" : "—";

  return (
    <div className="group relative bg-[#1a1f1a] border border-[#27272a] p-5 hover:border-[#00ff88]/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#00ff88]/5 overflow-hidden">
      {/* Top accent */}
      <div
        className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
        style={{ background: accentColor }}
      />

      {/* Icon */}
      <div
        className="w-10 h-10 flex items-center justify-center mb-4 text-lg"
        style={{
          background: `${accentColor}15`,
          border: `1px solid ${accentColor}30`,
          color: accentColor,
        }}
      >
        {icon}
      </div>

      {/* Value */}
      <p className="text-3xl font-bold text-[#f5f5f5] mb-1 tabular-nums">{value}</p>

      {/* Label */}
      <p className="text-[#a1a1aa] text-xs uppercase tracking-widest">{label}</p>

      {/* Sub / trend */}
      {sub && (
        <p className={`text-xs mt-2 ${trendColor}`}>
          {trendArrow} {sub}
        </p>
      )}
    </div>
  );
}

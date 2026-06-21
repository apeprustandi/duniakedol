import type { PricingTier } from "@/lib/types";

const COMMON_FEATURES = [
  "Semua video learning path",
  "Automation challenges + poin",
  "Bot Lab lengkap + Template Bot",
  "etlAI + AI Agent Playground",
  "Flow Mapper & HAR→kode (AI)",
  "Project Board (cari kerjaan)",
  "Akses Discord & GitHub org",
] as const;

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "6 Bulan",
    duration: "akses 180 hari",
    price: "Rp350.000",
    accentColor: "#00ff88",
    hoverBorder: "hover:border-[#00ff88]/30",
    features: [...COMMON_FEATURES, "Update materi berkala"],
    ctaLabel: "Pilih 6 Bulan",
    ctaClass:
      "block w-full text-center border border-[#00ff88]/40 text-[#00ff88] py-2.5 text-sm font-semibold hover:bg-[#00ff88]/10 transition-colors",
  },
  {
    name: "1 Tahun",
    duration: "akses 365 hari",
    price: "Rp550.000",
    popular: true,
    accentColor: "#00ff88",
    hoverBorder: "hover:border-[#00ff88]",
    features: [...COMMON_FEATURES, "Update materi berkala"],
    ctaLabel: "Pilih 1 Tahun →",
    ctaClass:
      "block w-full text-center bg-[#00ff88] text-[#0a0f0a] py-2.5 text-sm font-bold hover:bg-[#f5f5f5] transition-all duration-300",
  },
  {
    name: "👑 Lifetime",
    duration: "akses selamanya",
    price: "Rp3.000.000",
    accentColor: "#eab308",
    hoverBorder: "hover:border-yellow-500/30",
    features: [...COMMON_FEATURES, "Akses selamanya, tanpa perpanjang"],
    ctaLabel: "Pilih Lifetime",
    ctaClass:
      "block w-full text-center border border-yellow-500/40 text-yellow-400 py-2.5 text-sm font-semibold hover:bg-yellow-400/10 transition-colors",
  },
];

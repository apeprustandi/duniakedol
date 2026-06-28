import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PRICING_TIERS } from "@/lib/data/pricing";

export function PricingSection() {
  return (
    <section id="harga" className="relative z-10 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          tag="// harga"
          title="Pilih Paketmu"
          subtitle="Sekali bayar via QRIS, langsung akses semua materi, challenge, tools, dan komunitas."
        />

        <div className="grid md:grid-cols-3 gap-5">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`reveal relative bg-[#1a1f1a] p-6 transition-all duration-700 ${
                tier.popular
                  ? "border border-[#00ff88]/50 hover:border-[#00ff88] shadow-lg shadow-[#00ff88]/10"
                  : `border border-[#27272a] ${tier.hoverBorder}`
              }`}
            >
              {/* Popular badge */}
              {tier.popular && (
                <>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[#00ff88] text-[#0a0f0a] text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                      Paling Populer
                    </span>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ff88]/50 to-transparent" />
                </>
              )}

              {/* Price */}
              <div className="mb-6">
                <h3
                  className={`font-bold text-lg mb-1 ${
                    tier.accentColor === "#eab308"
                      ? "text-yellow-400 flex items-center gap-2"
                      : "text-[#f5f5f5]"
                  }`}
                >
                  {tier.name}
                </h3>
                <p className="text-[#a1a1aa] text-xs mb-4">{tier.duration}</p>
                <span
                  className={`text-4xl font-bold ${
                    tier.accentColor === "#eab308"
                      ? "text-yellow-400"
                      : "text-[#00ff88]"
                  }`}
                >
                  {tier.price}
                </span>
              </div>

              {/* Features list */}
              <ul className="space-y-3 mb-6">
                {tier.features.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <span
                      className={`text-base flex-shrink-0 ${
                        tier.accentColor === "#eab308"
                          ? "text-yellow-400"
                          : "text-[#00ff88]"
                      }`}
                    >
                      &#10004;
                    </span>
                    <span className="text-[#a1a1aa]">{item}</span>
                  </li>
                ))}
              </ul>

              <Link href="/login" className={tier.ctaClass}>
                {tier.ctaLabel}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

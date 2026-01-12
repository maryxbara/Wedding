"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";

export function Address() {
  const t = useTranslations("venue");

  const addressLines = [
    t("address.0"),
    t("address.1"),
    t("address.2"),
  ];

  const mapSrc =
    "https://www.google.com/maps?q=Charlton%20Estate%20Yablunytsia%20Ivano-Frankivsk%20Horishkiv%20St.%20333B%2078592&output=embed";

  return (
    <section id="venue" className="section-spacing bg-[var(--bg)]">
      <div className="container-page">
        <FadeIn>
          <SectionHeader label={t("label")} title={t("title")} />
        </FadeIn>

        <FadeIn delay={0.2} className="mt-16">
          <GlassCard className="overflow-hidden p-0">
            <div className="p-8 sm:p-10">
              <div className="mb-8 space-y-2 text-center">
                {addressLines.map((line, idx) => (
                  <p
                    key={line}
                    className={`font-serif text-[var(--text)] ${
                      idx === 0 
                        ? "text-[clamp(24px,3vw,32px)] font-medium" 
                        : "text-[clamp(18px,2vw,22px)]"
                    }`}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <div className="relative aspect-[16/9] w-full">
              <iframe
                title="Charlton Estate map"
                src={mapSrc}
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </section>
  );
}

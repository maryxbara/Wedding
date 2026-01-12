"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";

export function DressCode() {
  const t = useTranslations("dressCode");

  const palette = [
    { name: t("colors.olive"), color: "#2F4A3A" },
    { name: t("colors.sage"), color: "#8FA58B" },
    { name: t("colors.cream"), color: "#F7F4EF" },
    { name: t("colors.charcoal"), color: "#3A3A3A" },
  ];

  return (
    <section id="dress-code" className="section-spacing bg-[var(--bg)]">
      <div className="container-page">
        <FadeIn>
          <SectionHeader label={t("label")} title={t("title")} />
        </FadeIn>

        <FadeIn delay={0.2} className="mt-16">
          <GlassCard className="p-10 sm:p-14">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-serif text-[clamp(20px,2.5vw,24px)] leading-relaxed text-[var(--text)]">
                {t("themeText")}{" "}
                <span className="text-[var(--lightGreen)]">{t("themeName")}</span>
              </p>

              <div className="mt-10 flex items-center justify-center gap-4 sm:gap-5">
                {palette.map((item) => (
                  <div key={item.name} className="flex flex-col items-center gap-1.5 sm:gap-2">
                    <div
                      className="h-12 w-12 sm:h-14 sm:w-14 rounded-full border-2 border-[var(--border)] shadow-sm transition-transform hover:scale-110"
                      style={{ background: item.color }}
                      aria-label={item.name}
                      title={item.name}
                    />
                    <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.08em] sm:tracking-[0.1em] text-[var(--muted)]">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mx-auto mt-10 max-w-xl font-sans text-[13px] leading-relaxed text-[var(--muted)]">
                {t("whiteNote")}
              </p>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </section>
  );
}

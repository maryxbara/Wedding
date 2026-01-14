"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";

export function Schedule() {
  const t = useTranslations("schedule");

  const items = [
    { time: t("items.0.time"), title: t("items.0.title"), details: t("items.0.details") },
    { time: t("items.1.time"), title: t("items.1.title"), details: t("items.1.details") },
    { time: t("items.2.time"), title: t("items.2.title"), details: t("items.2.details") },
  ];

  return (
    <section id="schedule" className="section-spacing bg-[var(--bg)]">
      <div className="container-page">
        <FadeIn>
          <SectionHeader label={t("label")} title={t("title")} />
        </FadeIn>

        <div className="mt-16 space-y-6">
          {items.map((item, idx) => (
            <FadeIn key={idx} delay={idx * 0.2} scale>
              <GlassCard className="p-8 sm:p-10">
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="w-[110px] sm:w-[140px] flex-shrink-0 flex justify-center">
                    <div className="rounded-full border-2 border-[var(--lightGreen)] bg-[var(--bg)] px-3 sm:px-5 py-2">
                      <p className="font-sans text-[10px] sm:text-[12px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[var(--lightGreen)] whitespace-nowrap">
                        {item.time}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-[20px] sm:text-[24px] leading-tight text-[var(--text)] md:text-[28px]">
                      {item.title}
                    </h3>
                    <p className="mt-1 font-sans text-[13px] sm:text-[14px] text-[var(--muted)]">
                      {item.details}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

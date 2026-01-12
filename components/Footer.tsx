"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/FadeIn";

export function Footer() {
  const t = useTranslations("footer");
  const tNames = useTranslations("names");

  return (
    <footer id="thank-you" className="section-spacing bokeh-lights bg-[var(--bg)]">
      <div className="container-page">
        <FadeIn delay={0.2} className="text-center">
          <h2 className="font-serif text-[clamp(40px,6vw,64px)] tracking-[-0.02em] text-[var(--text)]">
            {t("thankYou")}
          </h2>
          <div className="mx-auto mt-8 flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-[var(--border)]" />
            <div className="h-0.5 w-0.5 rounded-full bg-[var(--lightGreen)]/50" />
            <div className="h-px w-16 bg-[var(--border)]" />
            <div className="h-0.5 w-0.5 rounded-full bg-[var(--lightGreen)]/50" />
            <div className="h-px w-8 bg-[var(--border)]" />
          </div>
          <p className="mt-8 font-script text-[clamp(22px,3vw,28px)] italic text-[var(--lightGreen)]">
            {tNames("couple")}
          </p>
        </FadeIn>
      </div>
    </footer>
  );
}

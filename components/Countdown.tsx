"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/FadeIn";
import { getCountdownParts, WEDDING_DAY } from "@/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function Countdown() {
  const t = useTranslations("countdown");
  const target = useMemo(() => WEDDING_DAY, []);
  const [mounted, setMounted] = useState(false);
  const [parts, setParts] = useState(() => getCountdownParts(target));

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setParts(getCountdownParts(target)), 1000);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <section id="countdown" className="section-spacing bg-[var(--bg)]">
      <div className="container-page">
        <FadeIn>
          <div className="section-header">
            <div className="section-label">{t("label")}</div>
            <h2 className="section-title">{t("title")}</h2>
            <div className="section-divider" />
          </div>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-16" scale>
          <GlassCard className="p-10 sm:p-14">
            <motion.div
              className="text-center"
              animate={{ scale: [1, 1.008, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }}
            >
              <div className="flex items-center justify-center gap-1 sm:gap-4">
                <div className="flex flex-col items-center min-w-[50px] sm:min-w-[60px]">
                  <motion.span
                    key={mounted ? parts.days : "days-static"}
                    initial={mounted ? { opacity: 0, y: -10 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    suppressHydrationWarning
                    className="font-serif text-[28px] sm:text-[clamp(32px,5vw,48px)] tracking-[0.05em] text-[var(--text)]"
                  >
                    {parts.days}
                  </motion.span>
                  <span className="mt-1 sm:mt-2 font-sans text-[9px] sm:text-[11px] uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[var(--muted)]">{t("days")}</span>
                </div>
                <span className="font-serif text-[28px] sm:text-[clamp(32px,5vw,48px)] text-[var(--lightGreen)]/30 self-start">:</span>
                <div className="flex flex-col items-center min-w-[40px] sm:min-w-[50px]">
                  <motion.span
                    key={mounted ? parts.hours : "hours-static"}
                    initial={mounted ? { opacity: 0, y: -10 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    suppressHydrationWarning
                    className="font-serif text-[28px] sm:text-[clamp(32px,5vw,48px)] tracking-[0.05em] text-[var(--text)]"
                  >
                    {pad2(parts.hours)}
                  </motion.span>
                  <span className="mt-1 sm:mt-2 font-sans text-[9px] sm:text-[11px] uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[var(--muted)]">{t("hours")}</span>
                </div>
                <span className="font-serif text-[28px] sm:text-[clamp(32px,5vw,48px)] text-[var(--lightGreen)]/30 self-start">:</span>
                <div className="flex flex-col items-center min-w-[40px] sm:min-w-[50px]">
                  <motion.span
                    key={mounted ? parts.minutes : "minutes-static"}
                    initial={mounted ? { opacity: 0, y: -10 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    suppressHydrationWarning
                    className="font-serif text-[28px] sm:text-[clamp(32px,5vw,48px)] tracking-[0.05em] text-[var(--text)]"
                  >
                    {pad2(parts.minutes)}
                  </motion.span>
                  <span className="mt-1 sm:mt-2 font-sans text-[9px] sm:text-[11px] uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[var(--muted)]">{t("min")}</span>
                </div>
                <span className="font-serif text-[28px] sm:text-[clamp(32px,5vw,48px)] text-[var(--lightGreen)]/30 self-start">:</span>
                <div className="flex flex-col items-center min-w-[40px] sm:min-w-[50px]">
                  <motion.span
                    key={mounted ? parts.seconds : "seconds-static"}
                    initial={mounted ? { opacity: 0, y: -10 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    suppressHydrationWarning
                    className="font-serif text-[28px] sm:text-[clamp(32px,5vw,48px)] tracking-[0.05em] text-[var(--text)]"
                  >
                    {pad2(parts.seconds)}
                  </motion.span>
                  <span className="mt-1 sm:mt-2 font-sans text-[9px] sm:text-[11px] uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[var(--muted)]">{t("sec")}</span>
                </div>
              </div>
            </motion.div>
          </GlassCard>
        </FadeIn>
      </div>
    </section>
  );
}

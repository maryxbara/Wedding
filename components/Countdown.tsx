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
              <div className="font-serif text-[clamp(32px,5vw,48px)] tracking-[0.05em] text-[var(--text)]">
                <motion.span
                  key={mounted ? parts.days : "days-static"}
                  initial={mounted ? { opacity: 0, y: -10 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  suppressHydrationWarning
                >
                  {parts.days}
                </motion.span>
                <span className="mx-2 text-[var(--lightGreen)]/30">:</span>
                <motion.span
                  key={mounted ? parts.hours : "hours-static"}
                  initial={mounted ? { opacity: 0, y: -10 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  suppressHydrationWarning
                >
                  {pad2(parts.hours)}
                </motion.span>
                <span className="mx-2 text-[var(--lightGreen)]/30">:</span>
                <motion.span
                  key={mounted ? parts.minutes : "minutes-static"}
                  initial={mounted ? { opacity: 0, y: -10 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  suppressHydrationWarning
                >
                  {pad2(parts.minutes)}
                </motion.span>
                <span className="mx-2 text-[var(--lightGreen)]/30">:</span>
                <motion.span
                  key={mounted ? parts.seconds : "seconds-static"}
                  initial={mounted ? { opacity: 0, y: -10 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  suppressHydrationWarning
                >
                  {pad2(parts.seconds)}
                </motion.span>
              </div>
              <motion.div 
                className="mt-6 flex items-center justify-center gap-8 font-sans text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span>{t("days")}</span>
                <span>{t("hours")}</span>
                <span>{t("min")}</span>
                <span>{t("sec")}</span>
              </motion.div>
            </motion.div>
          </GlassCard>
        </FadeIn>
      </div>
    </section>
  );
}

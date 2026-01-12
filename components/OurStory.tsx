"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";

export function OurStory() {
  const t = useTranslations("ourStory");

  return (
    <section id="our-story" className="section-spacing bg-[var(--bg)]">
      <div className="container-page">
        <FadeIn>
          <SectionHeader label={t("label")} title={t("title")} />
        </FadeIn>

        <FadeIn delay={0.2} className="mt-16" scale>
          <GlassCard className="p-10 sm:p-14">
            <div className="mx-auto max-w-2xl text-center">
              {/* Big quote line */}
              <motion.div 
                className="mb-8 flex items-center justify-center gap-4"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div 
                  className="h-px flex-1 bg-[var(--border)]"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
                />
                <motion.svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-[var(--lightGreen)]"
                  initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <path
                    d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </motion.svg>
                <motion.div 
                  className="h-px flex-1 bg-[var(--border)]"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
                />
              </motion.div>

              <motion.p 
                className="font-serif text-[clamp(18px,2.5vw,22px)] leading-relaxed text-[var(--text)]"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {t("text1")}{" "}
                <motion.span 
                  className="text-[var(--lightGreen)]"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.8, ease: [0.19, 1, 0.22, 1] }}
                >
                  {t("date")}
                </motion.span>.
                <br />
                <br />
                {t("text2")}
                <br />
                <br />
                {t("text3")}
              </motion.p>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </section>
  );
}

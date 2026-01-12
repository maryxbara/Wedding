"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";

export function SheSaidYes() {
  const t = useTranslations("sheSaidYes");
  const tNames = useTranslations("names");

  return (
    <section id="she-said-yes" className="section-spacing bg-[var(--bg)]">
      <div className="container-page">
        <FadeIn>
          <SectionHeader label={t("label")} title={t("title")} />
        </FadeIn>

        <FadeIn delay={0.2} className="mt-16" scale>
          <GlassCard className="p-10 sm:p-14">
            <div className="mx-auto max-w-2xl text-center">
              <motion.p 
                className="font-serif text-[clamp(20px,3vw,26px)] leading-relaxed text-[var(--text)]"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {t("inviteText")}
                <br />
                <motion.span 
                  className="text-[var(--lightGreen)]"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
                >
                  {t("date")}
                </motion.span>
              </motion.p>
              <motion.p 
                className="mt-8 font-script text-[clamp(20px,3vw,24px)] italic text-[var(--lightGreen)]"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {tNames("couple")}
              </motion.p>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </section>
  );
}

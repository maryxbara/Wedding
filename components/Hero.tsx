"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const t = useTranslations("hero");
  const tNames = useTranslations("names");

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bokeh-lights"
    >
      {/* Subtle light green gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--lightGreen)]/5 via-transparent to-transparent" />
      
      {/* Subtle film grain texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(255, 255, 255, 0.3) 100%)",
        }}
      />

      <div className="container-page relative z-10 text-center">
        <FadeIn delay={0.2} scale>
          <div className="mx-auto max-w-2xl">
            {/* Tiny label */}
            <motion.p 
              className="mb-6 font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]"
              initial={{ opacity: 0, y: 8, letterSpacing: "0.2em", filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, letterSpacing: "0.3em", filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ 
                duration: 1.8, 
                delay: 0.2, 
                ease: [0.16, 1, 0.3, 1],
                letterSpacing: { duration: 2, delay: 0.2, ease: [0.19, 1, 0.22, 1] },
                filter: { duration: 2, ease: [0.19, 1, 0.22, 1] }
              }}
            >
              {t("gettingMarried")}
            </motion.p>

            {/* Names */}
            <motion.h1 
              className="mb-6 font-serif text-[clamp(48px,8vw,96px)] leading-[0.9] tracking-[-0.02em] text-[var(--text)]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.span 
                className="block"
                initial={{ opacity: 0, x: -24, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 1.8, 
                  delay: 0.4, 
                  ease: [0.16, 1, 0.3, 1],
                  filter: { duration: 2, ease: [0.19, 1, 0.22, 1] }
                }}
              >
                {tNames("groom")}
              </motion.span>
              <motion.span 
                className="my-2 block font-script text-[clamp(28px,4vw,40px)] italic text-[var(--lightGreen)]"
                initial={{ opacity: 0, scale: 0.9, rotate: -1.5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 1.6, 
                  delay: 0.65, 
                  ease: [0.16, 1, 0.3, 1],
                  rotate: { duration: 1.4, ease: [0.19, 1, 0.22, 1] }
                }}
              >
                &amp;
              </motion.span>
              <motion.span 
                className="block"
                initial={{ opacity: 0, x: 24, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 1.8, 
                  delay: 0.55, 
                  ease: [0.16, 1, 0.3, 1],
                  filter: { duration: 2, ease: [0.19, 1, 0.22, 1] }
                }}
              >
                {tNames("bride")}
              </motion.span>
            </motion.h1>

            {/* Date with arch accent */}
            <motion.div 
              className="relative mx-auto mb-12 inline-block"
              initial={{ opacity: 0, scale: 0.92, y: 12, filter: "blur(3px)" }}
              whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ 
                duration: 1.8, 
                delay: 0.8, 
                ease: [0.16, 1, 0.3, 1],
                scale: { duration: 2, ease: [0.16, 1, 0.3, 1] },
                filter: { duration: 2, ease: [0.19, 1, 0.22, 1] }
              }}
            >
              <motion.div 
                className="absolute -inset-1 rounded-full border border-[var(--border)]"
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 1, ease: [0.19, 1, 0.22, 1] }}
              />
              <motion.p 
                className="relative rounded-full border border-[var(--lightGreen)] bg-[var(--surface)] px-8 py-3 font-sans text-[13px] uppercase tracking-[0.24em] text-[var(--lightGreen)] backdrop-blur-sm cursor-default"
                initial={{ letterSpacing: "0.18em" }}
                whileInView={{ letterSpacing: "0.24em" }}
                viewport={{ once: true }}
                whileHover={{ 
                  letterSpacing: "0.26em",
                  borderColor: "var(--lightGreenHover)",
                  boxShadow: "0 4px 16px rgba(156, 175, 136, 0.25)"
                }}
                transition={{ 
                  letterSpacing: { duration: 1.6, delay: 0.9, ease: [0.19, 1, 0.22, 1] },
                  borderColor: { duration: 0.3, ease: [0.19, 1, 0.22, 1] },
                  boxShadow: { duration: 0.3, ease: [0.19, 1, 0.22, 1] }
                }}
              >
                26.04.2026
              </motion.p>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 8, filter: "blur(2px)" }}
                whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Button href="#rsvp">RSVP</Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 8, filter: "blur(2px)" }}
                whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <Button variant="secondary" href="#schedule">
                  {t("viewSchedule")}
                </Button>
              </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div 
              className="mt-12 flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.span 
                className="font-sans text-[9px] uppercase tracking-[0.2em] text-[var(--muted)]"
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  ease: [0.4, 0, 0.6, 1]
                }}
              >
                {t("scroll")}
              </motion.span>
              <motion.div 
                className="relative h-10 w-px"
                animate={{ 
                  scaleY: [0.8, 1, 0.8],
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  ease: [0.4, 0, 0.6, 1]
                }}
              >
                <div className="h-full w-full bg-gradient-to-b from-[var(--lightGreen)] via-[var(--lightGreen)]/60 to-transparent" />
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--lightGreen)]"
                  animate={{ 
                    y: [0, 36, 0],
                    opacity: [0.6, 1, 0.6],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.6, 1],
                    times: [0, 0.5, 1]
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

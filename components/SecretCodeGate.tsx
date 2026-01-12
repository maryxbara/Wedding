"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const SECRET_CODE = "Luke 11:9";

interface SecretCodeGateProps {
  onUnlock: () => void;
}

export function SecretCodeGate({ onUnlock }: SecretCodeGateProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const t = useTranslations("secretCode");
  const tNames = useTranslations("names");

  const handleSubmit = () => {
    if (code.trim().toLowerCase() === SECRET_CODE.toLowerCase()) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bokeh-lights">
      {/* Language Switcher */}
      <motion.div 
        className="absolute top-4 right-4 z-20 sm:top-6 sm:right-8"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <LanguageSwitcher />
      </motion.div>
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
        <div className="mx-auto max-w-2xl">
          {/* Tiny label */}
          <motion.p 
            className="mb-6 font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]"
            initial={{ opacity: 0, y: 8, letterSpacing: "0.2em", filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.3em", filter: "blur(0px)" }}
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
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span 
              className="block"
              initial={{ opacity: 0, x: -24, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
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
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
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
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
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

          {/* Enter Code Button / Input */}
          <AnimatePresence mode="wait">
            {!showInput ? (
              <motion.div
                key="button"
                className="mt-8"
                initial={{ opacity: 0, scale: 0.94, y: 8, filter: "blur(2px)" }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.94, y: -8, filter: "blur(2px)" }}
                transition={{ duration: 1.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.button
                  className="btn-secondary relative overflow-hidden"
                  onClick={() => setShowInput(true)}
                  whileHover={{ 
                    scale: 1.04,
                    y: -3,
                  }}
                  whileTap={{ 
                    scale: 0.96,
                    y: 0
                  }}
                  transition={{ 
                    duration: 0.5, 
                    ease: [0.16, 1, 0.3, 1],
                    scale: { duration: 0.4, ease: [0.19, 1, 0.22, 1] },
                    y: { duration: 0.4, ease: [0.19, 1, 0.22, 1] }
                  }}
                  style={{ transformOrigin: "center" }}
                >
                  <span className="relative z-10">{t("enterCode")}</span>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="input"
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0, scale: 0.94, y: 8, filter: "blur(2px)" }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.94, y: -8, filter: "blur(2px)" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div 
                  className="relative"
                  animate={error ? { x: [-8, 8, -6, 6, -4, 4, 0] } : {}}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <motion.div 
                    className="absolute -inset-1 rounded-full border border-[var(--border)]"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                  />
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t("placeholder")}
                    autoFocus
                    className={`relative rounded-full border bg-[var(--surface)] px-6 py-2.5 font-sans text-[11px] text-center uppercase tracking-[0.14em] text-[var(--text)] backdrop-blur-sm outline-none transition-all duration-300 w-48 ${
                      error 
                        ? "border-red-400 placeholder:text-red-400" 
                        : "border-[var(--lightGreen)] placeholder:text-[var(--muted)]"
                    }`}
                  />
                </motion.div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="font-sans text-[10px] uppercase tracking-[0.15em] text-red-400"
                    >
                      {t("wrongCode")}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.button
                  className="btn-secondary relative overflow-hidden"
                  onClick={handleSubmit}
                  whileHover={{ 
                    scale: 1.04,
                    y: -3,
                  }}
                  whileTap={{ 
                    scale: 0.96,
                    y: 0
                  }}
                  transition={{ 
                    duration: 0.5, 
                    ease: [0.16, 1, 0.3, 1],
                    scale: { duration: 0.4, ease: [0.19, 1, 0.22, 1] },
                    y: { duration: 0.4, ease: [0.19, 1, 0.22, 1] }
                  }}
                  style={{ transformOrigin: "center" }}
                >
                  <span className="relative z-10">{t("submit")}</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}


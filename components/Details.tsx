"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";

type DetailsProps = {
  menuRequests: string;
  onMenuRequestsChange: (v: string) => void;
};

export function Details({ menuRequests, onMenuRequestsChange }: DetailsProps) {
  const t = useTranslations("details");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: t("faqs.0.question"),
      answer: t("faqs.0.answer"),
      isInput: false,
    },
    {
      question: t("faqs.1.question"),
      answerPrompt: t("faqs.1.answerPrompt"),
      placeholder: t("faqs.1.placeholder"),
      isInput: true,
    },
    {
      question: t("faqs.2.question"),
      answer: t("faqs.2.answer"),
      isInput: false,
    },
  ];

  return (
    <section id="details" className="section-spacing bg-[var(--bg)]">
      <div className="container-page">
        <FadeIn>
          <SectionHeader label={t("label")} title={t("title")} />
        </FadeIn>

        <div className="mt-16 space-y-4">
          {faqs.map((faq, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <GlassCard>
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full p-8 text-left"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-[20px] text-[var(--text)]">
                      {faq.question}
                    </h3>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className={`transition-transform duration-300 ${
                        openIndex === idx ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="var(--lightGreen)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>
                {openIndex === idx && (
                  <div className="border-t border-[var(--border)] px-8 pb-8 pt-4">
                    <div className="font-sans text-[14px] leading-relaxed text-[var(--muted)]">
                      {faq.isInput ? (
                        <div>
                          <p className="mb-3">{faq.answerPrompt}</p>
                          <input
                            type="text"
                            value={menuRequests}
                            onChange={(e) => onMenuRequestsChange(e.target.value)}
                            placeholder={faq.placeholder}
                            className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[14px] text-[var(--text)] outline-none transition focus:border-[var(--lightGreen)] focus:ring-2 focus:ring-[var(--lightGreen)] focus:ring-opacity-20"
                          />
                        </div>
                      ) : (
                        <p>{faq.answer}</p>
                      )}
                    </div>
                  </div>
                )}
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

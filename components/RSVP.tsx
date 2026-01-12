"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

type FormState = {
  fullName: string;
  attending: "Yes" | "No";
  guestsCount: string;
  additionalGuests: string[];
  dietaryPreferences: string;
};

const initialState: FormState = {
  fullName: "",
  attending: "Yes",
  guestsCount: "",
  additionalGuests: [],
  dietaryPreferences: "",
};

// Client-side validation
function validateForm(form: FormState, additionalGuestsCount: number): { valid: boolean; error?: string } {
  const name = form.fullName.trim();
  
  if (name.length < 2) {
    return { valid: false, error: "Name must be at least 2 characters" };
  }
  
  if (name.length > 100) {
    return { valid: false, error: "Name must be under 100 characters" };
  }
  
  // Allow letters (including Unicode for Lithuanian/Ukrainian), spaces, hyphens, apostrophes
  const nameRegex = /^[a-zA-Z\u00C0-\u024F\u0400-\u04FF\s'-]+$/;
  if (!nameRegex.test(name)) {
    return { valid: false, error: "Name contains invalid characters" };
  }
  
  // Validate additional guests
  for (let i = 0; i < additionalGuestsCount; i++) {
    const guestName = (form.additionalGuests[i] || "").trim();
    if (guestName.length > 0 && !nameRegex.test(guestName)) {
      return { valid: false, error: `Guest ${i + 2} name contains invalid characters` };
    }
  }
  
  if (form.dietaryPreferences.length > 500) {
    return { valid: false, error: "Dietary preferences must be under 500 characters" };
  }
  
  return { valid: true };
}

export function RSVP() {
  const t = useTranslations("rsvp");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState<string>("");

  const additionalGuestsCount = Math.max(0, Number(form.guestsCount || 1) - 1);

  const canSubmit = useMemo(() => {
    const hasName = form.fullName.trim().length >= 2;
    const allAdditionalGuestsFilled = form.additionalGuests
      .slice(0, additionalGuestsCount)
      .every((name) => name.trim().length > 0);
    return hasName && (additionalGuestsCount === 0 || allAdditionalGuestsFilled);
  }, [form.fullName, form.additionalGuests, additionalGuestsCount]);

  const updateAdditionalGuest = (index: number, value: string) => {
    setForm((s) => {
      const newGuests = [...s.additionalGuests];
      newGuests[index] = value;
      return { ...s, additionalGuests: newGuests };
    });
  };

  async function submit() {
    // Client-side validation
    const validation = validateForm(form, additionalGuestsCount);
    if (!validation.valid) {
      setStatus("error");
      setError(validation.error || t("modal.error"));
      return;
    }

    setSubmitting(true);
    setStatus("idle");
    setError("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          attending: form.attending,
          guestsCount: Number(form.guestsCount || 1),
          additionalGuests: form.additionalGuests
            .slice(0, additionalGuestsCount)
            .map((name) => name.trim())
            .filter((name) => name.length > 0),
          dietaryPreferences: form.dietaryPreferences.trim(),
        }),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || t("modal.error"));
      }

      setStatus("success");
      setForm(initialState);
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : t("modal.error"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="rsvp" className="section-spacing bg-[var(--bg)]">
      <div className="container-page">
        <FadeIn>
          <SectionHeader
            label={t("label")}
            title={t("title")}
          />
        </FadeIn>

        <FadeIn delay={0.2} className="mt-16">
          <GlassCard arch className="p-10 sm:p-14">
            <div className="mx-auto max-w-xl text-center">
              <p className="font-serif text-[clamp(18px,2vw,20px)] leading-relaxed text-[var(--text)]">
                {t("deadline")}{" "}
                <span className="text-[var(--lightGreen)]">{t("deadlineDate")}</span>{" "}
                {t("deadlineEnd")}
              </p>

              <div className="mt-10">
                <Button
                  onClick={() => {
                    setOpen(true);
                    setStatus("idle");
                    setError("");
                  }}
                >
                  {t("button")}
                </Button>
              </div>
            </div>
          </GlassCard>
        </FadeIn>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              aria-label="Close"
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              type="button"
            />

            <motion.div
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto"
              initial={{ y: 20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <GlassCard className="p-8 sm:p-10">
                <div className="mb-8 border-b border-[var(--border)] pb-6">
                  <h3 className="font-serif text-[28px] text-[var(--text)]">{t("modal.title")}</h3>
                  <p className="mt-1 font-sans text-[12px] uppercase tracking-[0.14em] text-[var(--muted)]">
                    {t("modal.subtitle")}
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Guest Name */}
                  <label className="block">
                    <span className="mb-2 block font-sans text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
                      {t("modal.nameLabel")}
                    </span>
                    <input
                      value={form.fullName}
                      onChange={(e) => setForm((s) => ({ ...s, fullName: e.target.value }))}
                      className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[14px] text-[var(--text)] outline-none transition focus:border-[var(--lightGreen)] focus:ring-2 focus:ring-[var(--lightGreen)] focus:ring-opacity-20"
                      placeholder={t("modal.namePlaceholder")}
                      maxLength={100}
                    />
                  </label>

                  {/* Attending Status */}
                  <div>
                    <span className="mb-2 block font-sans text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
                      {t("modal.attendLabel")}
                    </span>
                    <div className="flex gap-3">
                      {(["Yes", "No"] as const).map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setForm((s) => ({ ...s, attending: v }))}
                          className={`flex-1 rounded-lg border-2 px-4 py-2.5 text-[13px] font-medium transition ${
                            v === form.attending
                              ? "border-[var(--lightGreen)] bg-[var(--lightGreen)] text-[var(--bg)]"
                              : "border-[var(--border)] bg-transparent text-[var(--muted)] hover:border-[var(--lightGreen)] hover:text-[var(--lightGreen)]"
                          }`}
                        >
                          {v === "Yes" ? t("modal.yes") : t("modal.no")}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Number of Guests */}
                  <label className="block">
                    <span className="mb-2 block font-sans text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
                      {t("modal.guestsLabel")}
                    </span>
                    <input
                      inputMode="numeric"
                      value={form.guestsCount}
                      onChange={(e) =>
                        setForm((s) => ({
                          ...s,
                          guestsCount: e.target.value.replace(/[^\d]/g, "").slice(0, 2),
                        }))
                      }
                      className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[14px] text-[var(--text)] outline-none transition focus:border-[var(--lightGreen)] focus:ring-2 focus:ring-[var(--lightGreen)] focus:ring-opacity-20"
                      placeholder="1"
                    />
                  </label>

                  {/* Additional Guest Names */}
                  <AnimatePresence>
                    {Array.from({ length: additionalGuestsCount }).map((_, index) => (
                      <motion.label
                        key={index}
                        className="block"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <span className="mb-2 block font-sans text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
                          {t("modal.additionalGuestLabel", { number: index + 2 })}
                        </span>
                        <input
                          value={form.additionalGuests[index] || ""}
                          onChange={(e) => updateAdditionalGuest(index, e.target.value)}
                          className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[14px] text-[var(--text)] outline-none transition focus:border-[var(--lightGreen)] focus:ring-2 focus:ring-[var(--lightGreen)] focus:ring-opacity-20"
                          placeholder={t("modal.additionalGuestPlaceholder")}
                          maxLength={100}
                        />
                      </motion.label>
                    ))}
                  </AnimatePresence>

                  {/* Dietary Preferences */}
                  <label className="block">
                    <span className="mb-2 block font-sans text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
                      {t("modal.foodLabel")}
                    </span>
                    <textarea
                      value={form.dietaryPreferences}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, dietaryPreferences: e.target.value }))
                      }
                      className="min-h-[100px] w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[14px] text-[var(--text)] outline-none transition focus:border-[var(--olive)] focus:ring-2 focus:ring-[var(--olive)] focus:ring-opacity-20"
                      placeholder={t("modal.foodPlaceholder")}
                      maxLength={500}
                    />
                  </label>

                  {status === "error" && (
                    <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-[13px] text-red-800">
                      {error}
                    </div>
                  )}
                  {status === "success" && (
                    <div className="rounded-lg border border-[var(--lightGreen)] bg-[var(--lightGreenLight)] px-4 py-3 text-[13px] text-[var(--lightGreen)]">
                      {t("modal.success")}
                    </div>
                  )}
                </div>

                <div className="mt-8 flex items-center justify-end gap-3 border-t border-[var(--border)] pt-6">
                  <Button variant="secondary" onClick={() => setOpen(false)}>
                    {t("modal.cancel")}
                  </Button>
                  <Button
                    disabled={!canSubmit || submitting}
                    onClick={submit}
                  >
                    {submitting ? t("modal.sending") : t("modal.submit")}
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

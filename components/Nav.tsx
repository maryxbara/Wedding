"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Nav() {
  const t = useTranslations("nav");
  const tNames = useTranslations("names");
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { href: "#hero", label: t("home") },
    { href: "#our-story", label: t("story") },
    { href: "#schedule", label: t("schedule") },
    { href: "#venue", label: t("venue") },
    { href: "#rsvp", label: t("rsvp") },
  ] as const;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-[var(--border)] bg-[var(--surface)] backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="container-page flex items-center justify-between py-4">
        <a
          href="#hero"
          className="font-serif text-[15px] tracking-wide text-[var(--lightGreen)] transition-colors hover:text-[var(--lightGreenHover)]"
        >
          {tNames("couple")}
        </a>
        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-8 sm:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative font-sans text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--lightGreen)] before:absolute before:bottom-0 before:left-0 before:h-px before:w-0 before:bg-[var(--lightGreen)] before:transition-all before:duration-300 hover:before:w-full"
              >
                {l.label}
              </a>
            ))}
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}

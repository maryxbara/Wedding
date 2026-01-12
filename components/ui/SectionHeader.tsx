"use client";

import type { ReactNode } from "react";

type SectionHeaderProps = {
  label?: string;
  title: ReactNode;
  className?: string;
};

export function SectionHeader({ label, title, className = "" }: SectionHeaderProps) {
  return (
    <div className={`section-header ${className}`}>
      {label && <div className="section-label">{label}</div>}
      <h2 className="section-title">{title}</h2>
      <div className="section-divider" />
    </div>
  );
}


"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  arch?: boolean;
};

export function GlassCard({ children, className = "", arch = false }: GlassCardProps) {
  return (
    <motion.div 
      className={`glass-card ${arch ? "arch-shape" : ""} ${className}`}
      whileHover={{ 
        y: -4,
        scale: 1.01,
        transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] }
      }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}


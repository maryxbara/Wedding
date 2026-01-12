"use client";

import { motion } from "framer-motion";
import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type BaseButtonProps = {
  variant?: "primary" | "secondary";
  children: ReactNode;
  className?: string;
};

type ButtonProps = BaseButtonProps &
  (
    | (ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
    | (AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; as?: "a" })
  );

export function Button({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  const baseClass = variant === "primary" ? "btn-primary" : "btn-secondary";
  
  const motionProps = {
    whileHover: { 
      scale: 1.04,
      y: -3,
    },
    whileTap: { 
      scale: 0.96,
      y: 0
    },
    transition: { 
      duration: 0.5, 
      ease: [0.16, 1, 0.3, 1] as const,
      scale: { duration: 0.4, ease: [0.19, 1, 0.22, 1] },
      y: { duration: 0.4, ease: [0.19, 1, 0.22, 1] }
    },
    style: { transformOrigin: "center" }
  };
  
  if (props.href) {
    const { as, ...anchorProps } = props;
    return (
      <motion.a 
        className={`${baseClass} ${className} relative overflow-hidden`}
        {...motionProps}
        {...(anchorProps as any)}
      >
        <span className="relative z-10">{children}</span>
      </motion.a>
    );
  }
  
  return (
    <motion.button 
      className={`${baseClass} ${className} relative overflow-hidden`}
      {...motionProps}
      {...(props as any)}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}


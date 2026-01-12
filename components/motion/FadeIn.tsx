"use client";

import { motion, type MotionProps } from "framer-motion";
import type { PropsWithChildren } from "react";

type FadeInProps = PropsWithChildren<
  MotionProps & {
    className?: string;
    delay?: number;
    y?: number;
    scale?: boolean;
  }
>;

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 20,
  scale = false,
  ...rest
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        y,
        filter: "blur(6px)",
        ...(scale && { scale: 0.96 })
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        filter: "blur(0px)",
        ...(scale && { scale: 1 })
      }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ 
        duration: 1.8, 
        ease: [0.16, 1, 0.3, 1], 
        delay,
        opacity: { duration: 1.6, ease: [0.19, 1, 0.22, 1] },
        y: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
        filter: { duration: 2, ease: [0.19, 1, 0.22, 1] },
        ...(scale && { scale: { duration: 2, ease: [0.16, 1, 0.3, 1] } })
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}



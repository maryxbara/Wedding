"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

type PhotoSectionProps = {
  src: string;
  alt: string;
  priority?: boolean;
  objectPosition?: string;
};

export function PhotoSection({ 
  src, 
  alt, 
  priority = false,
  objectPosition = "center center"
}: PhotoSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.02, 1, 1.01]);

  return (
    <section ref={ref} className="relative w-full overflow-hidden">
      {/* Flexible aspect ratio container - adapts to content but has max constraints */}
      <div className="relative aspect-[3/4] w-full sm:aspect-[4/3] md:aspect-[16/10] lg:aspect-[16/9]">
        <motion.div
          initial={{ opacity: 0, scale: 1.03, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ 
            duration: 1.8, 
            ease: [0.22, 1, 0.36, 1],
            opacity: { duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] },
            filter: { duration: 2, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 1.8, ease: [0.22, 1, 0.36, 1] }
          }}
          style={{ y, opacity, scale }}
          className="relative h-full w-full"
        >
          <motion.div
            whileHover={{ scale: 1.008 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative h-full w-full"
          >
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              quality={95}
              className="grayscale-[0.12] transition-all duration-700"
              style={{
                objectFit: "cover",
                objectPosition: objectPosition,
              }}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
            />
          </motion.div>
          
          {/* Subtle light green overlay for style consistency */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--lightGreen)]/4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          
          {/* Elegant border overlay with subtle animation */}
          <motion.div 
            className="absolute inset-0 border border-white/25"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          
          {/* Subtle vignette for depth */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/5 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}

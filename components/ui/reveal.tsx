"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** `up` for text and blocks, `fade` for quiet elements, `image` for a curtain reveal on media. */
  variant?: "up" | "fade" | "image";
};

const EASE = [0.22, 1, 0.36, 1] as const;

const STATES = {
  up: { hidden: { opacity: 0, y: 18 }, shown: { opacity: 1, y: 0 }, duration: 0.55 },
  fade: { hidden: { opacity: 0 }, shown: { opacity: 1 }, duration: 0.6 },
  image: {
    hidden: { opacity: 0, clipPath: "inset(0% 0% 100% 0%)" },
    shown: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" },
    duration: 0.85,
  },
} as const;

export function Reveal({ children, className, delay = 0, y, variant = "up" }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const state = STATES[variant];
  const hidden = variant === "up" && y !== undefined ? { opacity: 0, y } : state.hidden;

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : hidden}
      whileInView={state.shown}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: state.duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

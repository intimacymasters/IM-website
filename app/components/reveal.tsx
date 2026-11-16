"use client";

import { motion, useReducedMotion } from "motion/react";

/** Lifts its children into focus the first time they scroll into view. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li";
}) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];
  if (reduceMotion) return <Component className={className}>{children}</Component>;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  );
}

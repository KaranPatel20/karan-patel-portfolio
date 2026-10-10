"use client";

import { motion, useReducedMotion } from "framer-motion";

// Once-only entrance as a section scrolls into view. Critically damped spring, so it
// settles without bounce; reduced motion gets a plain cross-fade.
export default function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={reduce ? { duration: 0.2 } : { type: "spring", bounce: 0, duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
}

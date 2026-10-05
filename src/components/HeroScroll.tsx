"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Subtle scroll-linked motion for the hero: background shapes drift at different
// speeds, and the content eases up and fades as the hero leaves the viewport.
export function HeroParallax({ speed, className }: { speed: number; className: string }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, reduce ? 0 : speed * 700]);

  return (
    <motion.div aria-hidden style={{ y }} className="pointer-events-none">
      <div className={className} />
    </motion.div>
  );
}

export function HeroFade({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, reduce ? 0 : -60]);
  const opacity = useTransform(scrollY, [0, 450], [1, reduce ? 1 : 0.15]);

  return (
    <motion.div style={{ y, opacity }} className="relative mx-auto max-w-7xl px-8 pb-8 pt-16 sm:px-12 sm:pt-24 lg:px-16">
      {children}
    </motion.div>
  );
}

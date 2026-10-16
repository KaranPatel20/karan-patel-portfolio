"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

// Scroll-scrubbed entrance: opacity and lift are tied to where the element sits in the
// viewport, so content loads in as you scroll, keeps pace with the scroll speed, and
// reverses when you scroll back up. `order` shifts the range a little so neighbours
// follow one after another. Reduced motion shows everything immediately.
function useScrubbedStyle(order: number) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const shift = Math.min(order, 6) * 0.03;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${0.98 - shift}`, `start ${0.7 - shift}`],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });
  const opacity = useTransform(progress, [0, 1], [0, 1]);
  const y = useTransform(progress, [0, 1], [44, 0]);
  const scale = useTransform(progress, [0, 1], [0.985, 1]);

  return { ref, style: reduce ? undefined : { opacity, y, scale } };
}

export function RevealItem({
  children,
  className,
  order = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  order?: number;
  as?: "div" | "li";
}) {
  const { ref, style } = useScrubbedStyle(order);
  const Tag = as === "li" ? motion.li : motion.div;

  return (
    <Tag ref={ref as React.RefObject<never>} className={className} style={style}>
      {children}
    </Tag>
  );
}

// Block that scrubs in as a whole.
export default function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <RevealItem className={className}>{children}</RevealItem>;
}

// Plain wrapper kept so sections can group items; the items scrub themselves.
export function RevealGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

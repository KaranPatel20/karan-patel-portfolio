"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Adapted from Vengeance UI's SocialFlipButton: Organic tokens, click handlers on
// links (for analytics), and icons shown straight away on touch devices where
// there is no hover.
export interface SocialItem {
  letter: string;
  icon: React.ReactNode;
  label: string;
  href: string;
  onClick?: () => void;
}

function SocialFlipNode({
  item,
  index,
  isHovered,
  tooltipIndex,
  setTooltipIndex,
}: {
  item: SocialItem;
  index: number;
  isHovered: boolean;
  tooltipIndex: number | null;
  setTooltipIndex: (val: number | null) => void;
}) {
  const external = item.href.startsWith("http");

  return (
    <a
      href={item.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      aria-label={item.label}
      onClick={item.onClick}
      className="relative h-11 w-11"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setTooltipIndex(index)}
      onMouseLeave={() => setTooltipIndex(null)}
      onFocus={() => setTooltipIndex(index)}
      onBlur={() => setTooltipIndex(null)}
    >
      <AnimatePresence>
        {tooltipIndex === index && (
          <motion.div
            initial={{ opacity: 0, y: 6, x: "-50%" }}
            animate={{ opacity: 1, y: -46, x: "-50%" }}
            exit={{ opacity: 0, y: 6, x: "-50%" }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="pointer-events-none absolute left-1/2 z-50 whitespace-nowrap rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background"
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="relative h-full w-full"
        initial={false}
        animate={{ rotateY: isHovered ? 180 : 0 }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 120,
          damping: 15,
          delay: index * 0.06,
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center rounded-full border border-border bg-surface font-mono text-lg text-foreground"
          style={{ backfaceVisibility: "hidden" }}
        >
          {item.letter}
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center rounded-full bg-accent text-lg text-background"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {item.icon}
        </div>
      </motion.div>
    </a>
  );
}

export default function SocialFlipButton({
  items,
  className,
}: {
  items: SocialItem[];
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) setIsHovered(true);
  }, []);

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div
        className="flex items-center justify-center gap-3 rounded-full border border-border bg-background p-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          if (!window.matchMedia("(hover: none)").matches) setIsHovered(false);
          setTooltipIndex(null);
        }}
      >
        {items.map((item, index) => (
          <SocialFlipNode
            key={item.label}
            item={item}
            index={index}
            isHovered={isHovered}
            tooltipIndex={tooltipIndex}
            setTooltipIndex={setTooltipIndex}
          />
        ))}
      </div>
    </div>
  );
}

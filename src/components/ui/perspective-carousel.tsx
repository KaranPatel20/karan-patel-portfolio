"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { cn } from "@/lib/utils";

// Adapted from Vengeance UI's PerspectiveCarousel: slides are cards (summary always
// visible, details only on the active slide) instead of images, plus swipe support.
export interface CarouselItem {
  id: string;
  title: string;
  summary: React.ReactNode;
  details: React.ReactNode;
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export default function PerspectiveCarousel({
  items,
  className,
  rotationStep = 52,
  label = "Projects",
  heightClassName = "h-[600px] sm:h-[520px]",
}: {
  items: CarouselItem[];
  className?: string;
  rotationStep?: number;
  label?: string;
  heightClassName?: string;
}) {
  const [index, setIndex] = React.useState(0);
  const [slideWidth, setSlideWidth] = React.useState(340);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const maxIndex = items.length - 1;

  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const update = () => setSlideWidth(clamp(el.clientWidth * 0.8, 250, 400));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const select = (next: number) => setIndex(clamp(next, 0, maxIndex));
  const transition = reduceMotion
    ? { duration: 0 }
    : ({ type: "spring", bounce: 0.14, duration: 0.8 } as const);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          select(index - 1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          select(index + 1);
        }
      }}
      className={cn("w-full outline-none", className)}
    >
      <motion.div
        ref={viewportRef}
        className={cn("relative overflow-hidden", heightClassName)}
        style={{ perspective: "1200px", touchAction: "pan-y" }}
        onPanEnd={(_, info) => {
          if (info.offset.x < -60) select(index + 1);
          else if (info.offset.x > 60) select(index - 1);
        }}
      >
        <motion.div
          className="absolute left-1/2 top-0 flex h-full items-center"
          animate={{ x: -(index * slideWidth + slideWidth / 2) }}
          transition={transition}
        >
          {items.map((item, i) => {
            const distance = i - index;
            const isActive = distance === 0;
            return (
              <div
                key={item.id}
                className="shrink-0 px-2"
                style={{ width: slideWidth, perspective: "1200px" }}
              >
                <motion.div
                  className="relative"
                  animate={{
                    rotateY: clamp(-distance * rotationStep, -70, 70),
                    scale: isActive ? 1 : 0.9,
                    opacity: isActive ? 1 : Math.abs(distance) === 1 ? 0.75 : 0.35,
                  }}
                  transition={transition}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="rounded-[32px] border border-border bg-surface p-5">
                    {item.summary}
                    <div
                      className={cn(
                        "grid transition-[grid-template-rows,opacity] duration-300 ease-in-out",
                        isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                      inert={!isActive}
                    >
                      <div className="overflow-hidden">
                        <div className="pt-4">{item.details}</div>
                      </div>
                    </div>
                  </div>
                  {!isActive && (
                    <button
                      type="button"
                      aria-label={`Show ${item.title}`}
                      onClick={() => select(i)}
                      className="absolute inset-0 z-10 cursor-pointer rounded-[32px]"
                    />
                  )}
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </motion.div>

      <div className="mt-2 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label={`Previous ${label.toLowerCase()} item`}
          disabled={index === 0}
          onClick={() => select(index - 1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-35"
        >
          <FaChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Show ${i + 1}: ${item.title}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => select(i)}
              className={cn(
                "h-2 rounded-full transition-[width,background-color] duration-300",
                i === index ? "w-7 bg-accent" : "w-2 bg-foreground/25",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label={`Next ${label.toLowerCase()} item`}
          disabled={index === maxIndex}
          onClick={() => select(index + 1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-35"
        >
          <FaChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

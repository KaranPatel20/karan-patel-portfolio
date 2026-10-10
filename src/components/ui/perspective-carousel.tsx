"use client";

import * as React from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { cn } from "@/lib/utils";

// Adapted from Vengeance UI's PerspectiveCarousel. Slides are cards. The track follows the
// pointer 1:1 while dragging, rubber-bands at the ends, and on release projects the
// momentum forward and springs to the nearest slide at the release velocity.
export interface CarouselItem {
  id: string;
  title: string;
  summary: React.ReactNode;
  details: React.ReactNode;
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

// Where a flick at `velocity` (px/s) would come to rest, relative to the release point.
const project = (velocity: number, rate = 0.99) => ((velocity / 1000) * rate) / (1 - rate);

// Progressive resistance past a boundary instead of a hard stop.
const rubberband = (overshoot: number, dimension: number, constant = 0.55) =>
  (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));

export default function PerspectiveCarousel({
  items,
  className,
  rotationStep = 40,
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
  const [dragging, setDragging] = React.useState(false);
  const [slideWidth, setSlideWidth] = React.useState(340);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const maxIndex = items.length - 1;
  const indexRef = React.useRef(0);
  const x = useMotionValue(-170);

  const targetFor = React.useCallback(
    (i: number) => -(i * slideWidth + slideWidth / 2),
    [slideWidth],
  );

  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const update = () => setSlideWidth(clamp(el.clientWidth * 0.8, 250, 400));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Keep the track aligned when the slide width changes (resize), without animating.
  React.useEffect(() => {
    x.jump(targetFor(indexRef.current));
  }, [targetFor, x]);

  const goTo = (next: number, velocity = 0) => {
    const clamped = clamp(next, 0, maxIndex);
    indexRef.current = clamped;
    setIndex(clamped);
    if (reduceMotion) {
      x.jump(targetFor(clamped));
      return;
    }
    animate(x, targetFor(clamped), { type: "spring", bounce: 0.12, duration: 0.55, velocity });
  };

  const slideTransition = reduceMotion
    ? { duration: 0 }
    : ({ type: "spring", bounce: 0, duration: 0.6 } as const);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goTo(index - 1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          goTo(index + 1);
        }
      }}
      className={cn("w-full outline-none", className)}
    >
      <motion.div
        ref={viewportRef}
        className={cn("relative touch-pan-y select-none overflow-hidden", heightClassName)}
        style={{ perspective: "1200px", cursor: dragging ? "grabbing" : "grab" }}
        onPanStart={() => {
          x.stop();
          setDragging(true);
        }}
        onPan={(_, info) => {
          const base = targetFor(indexRef.current);
          const min = targetFor(maxIndex);
          const max = targetFor(0);
          const raw = base + info.offset.x;
          if (raw > max) x.set(max + rubberband(raw - max, slideWidth));
          else if (raw < min) x.set(min - rubberband(min - raw, slideWidth));
          else x.set(raw);
        }}
        onPanEnd={(_, info) => {
          setDragging(false);
          const base = targetFor(indexRef.current);
          const projected = base + info.offset.x + project(info.velocity.x);
          const nearest = Math.round(-(projected + slideWidth / 2) / slideWidth);
          const step = clamp(nearest, indexRef.current - 2, indexRef.current + 2);
          goTo(step, info.velocity.x);
        }}
      >
        <motion.div className="absolute left-1/2 top-0 flex h-full items-center" style={{ x }}>
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
                    rotateY: clamp(-distance * rotationStep, -60, 60),
                    scale: isActive ? 1 : 0.92,
                    opacity: isActive ? 1 : Math.abs(distance) === 1 ? 0.8 : 0.4,
                  }}
                  transition={slideTransition}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="rounded-[28px] border border-border bg-surface p-6 shadow-card">
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
                      onClick={() => goTo(i)}
                      className="absolute inset-0 z-10 cursor-pointer rounded-[28px]"
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
          onClick={() => goTo(index - 1)}
          className="press inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 text-foreground hover:text-accent disabled:cursor-not-allowed disabled:opacity-35"
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
              onClick={() => goTo(i)}
              className={cn(
                "h-2 rounded-full transition-[width,background-color] duration-300",
                i === index ? "w-7 bg-accent" : "w-2 bg-foreground/20",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label={`Next ${label.toLowerCase()} item`}
          disabled={index === maxIndex}
          onClick={() => goTo(index + 1)}
          className="press inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 text-foreground hover:text-accent disabled:cursor-not-allowed disabled:opacity-35"
        >
          <FaChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

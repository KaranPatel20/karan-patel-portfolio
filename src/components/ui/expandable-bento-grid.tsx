"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaXmark } from "react-icons/fa6";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

// Adapted from Vengeance UI's ExpandableBentoGrid: real links in the footer
// instead of a hardcoded "Visit" button, Organic tokens instead of the blue theme.
export interface BentoItem {
  id: string;
  title: string;
  subtitle?: string;
  period?: string;
  tag?: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  links?: { label: string; href: string }[];
}

export default function ExpandableBentoGrid({
  items,
  className,
}: {
  items: BentoItem[];
  className?: string;
}) {
  const [active, setActive] = useState<BentoItem | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/35 backdrop-blur-md"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 z-[10001] grid place-items-center p-4">
            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              role="dialog"
              aria-modal="true"
              aria-label={active.title}
              className="relative flex max-h-[90%] w-full max-w-[560px] flex-col overflow-hidden rounded-[28px] border border-border bg-surface shadow-2xl"
              transition={{ type: "spring", bounce: 0, duration: 0.5 }}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-foreground/5"
              >
                <FaXmark className="h-4 w-4" />
              </button>

              <div className="flex items-start gap-4 p-6 pr-16">
                <motion.div
                  layoutId={`icon-${active.id}-${id}`}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent"
                >
                  {active.icon}
                </motion.div>
                <div className="min-w-0">
                  <motion.h3
                    layoutId={`title-${active.id}-${id}`}
                    className="text-xl text-foreground"
                  >
                    {active.title}
                  </motion.h3>
                  {active.subtitle && (
                    <p className="mt-1 text-xs text-muted">{active.subtitle}</p>
                  )}
                  {active.period && <p className="text-xs text-muted">{active.period}</p>}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="overflow-auto px-6 pb-2"
              >
                {active.content}
              </motion.div>

              {active.links && active.links.length > 0 && (
                <div className="flex flex-wrap gap-2 border-t border-border p-6">
                  {active.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => trackEvent("project_link_click", { project: active.title, link: link.label, location: "projects" })}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-on-accent press hover:bg-accent-hover"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ul className={cn("grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3", className)}>
        {items.map((item) => (
          <motion.li
            layoutId={`card-${item.id}-${id}`}
            key={item.id}
            role="button"
            tabIndex={0}
            aria-label={`Open ${item.title}`}
            onClick={() => {
              trackEvent("project_open", { project: item.title });
              setActive(item);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setActive(item);
              }
            }}
            className="flex cursor-pointer flex-col gap-4 rounded-[28px] border border-border bg-surface p-6 shadow-card press hover:border-accent/50"
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
          >
            <div className="flex items-start gap-3">
              <motion.div
                layoutId={`icon-${item.id}-${id}`}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent"
              >
                {item.icon}
              </motion.div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <motion.h3
                    layoutId={`title-${item.id}-${id}`}
                    className="text-base text-foreground"
                  >
                    {item.title}
                  </motion.h3>
                  {item.tag && (
                    <span className="shrink-0 rounded-full bg-surface-2 px-2.5 py-0.5 text-[11px] font-medium text-muted">
                      {item.tag}
                    </span>
                  )}
                </div>
                {item.subtitle && (
                  <p className="mt-1 text-xs text-muted">{item.subtitle}</p>
                )}
                {item.period && <p className="text-xs text-muted">{item.period}</p>}
              </div>
            </div>
            <span className="text-xs text-accent">View details</span>
          </motion.li>
        ))}
      </ul>
    </>
  );
}

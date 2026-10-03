"use client";

import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { cn } from "@/lib/utils";

// Adapted from Vengeance UI's FaqAccordion: header is a node (logo + title + dates),
// restyled with the site's Organic tokens.
export interface AccordionItem {
  id: string;
  header: React.ReactNode;
  content: React.ReactNode;
}

export function FaqAccordion({
  items,
  className,
}: {
  items: AccordionItem[];
  className?: string;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <ul className={cn("flex w-full flex-col gap-4", className)}>
      {items.map((item) => {
        const isActive = activeId === item.id;
        return (
          <li
            key={item.id}
            className="overflow-hidden rounded-[32px] border border-border bg-surface"
          >
            <button
              type="button"
              onClick={() => setActiveId(isActive ? null : item.id)}
              aria-expanded={isActive}
              className="flex w-full items-center gap-4 p-4 text-left"
            >
              <div className="min-w-0 flex-1">{item.header}</div>
              <FaChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-muted transition-transform duration-200",
                  isActive && "rotate-180 text-accent",
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="border-t border-border px-4 pb-5 pt-4 sm:pl-[4.5rem]">
                  {item.content}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default FaqAccordion;

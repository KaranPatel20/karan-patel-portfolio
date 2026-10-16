"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";
import { card, cardGap } from "@/lib/layout";

export type SkillCategory = "data" | "software" | "ai" | "cloud" | "delivery";

export type SkillGroup = {
  title: string;
  category: SkillCategory;
  items: string[];
};

const filters: { id: "all" | SkillCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "data", label: "Data analysis" },
  { id: "software", label: "Software development" },
  { id: "ai", label: "AI/ML" },
  { id: "cloud", label: "Cloud and MLOps" },
  { id: "delivery", label: "Ways of working" },
];

export default function SkillsFilter({ groups }: { groups: SkillGroup[] }) {
  const [active, setActive] = useState<"all" | SkillCategory>("all");
  const reduce = useReducedMotion();

  const visible = active === "all" ? groups : groups.filter((group) => group.category === active);
  const count = (id: "all" | SkillCategory) =>
    id === "all" ? groups.length : groups.filter((group) => group.category === id).length;

  const spring = reduce
    ? { duration: 0 }
    : ({ type: "spring", bounce: 0, duration: 0.5 } as const);

  return (
    <div>
      <div role="group" aria-label="Filter skills" className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const selected = active === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={selected}
              onClick={() => {
                setActive(filter.id);
                trackEvent("skills_filter", { filter: filter.id });
              }}
              className={`press rounded-full px-4 py-1.5 text-sm font-medium ${
                selected
                  ? "bg-accent text-on-accent"
                  : "bg-surface text-foreground ring-1 ring-border hover:text-accent"
              }`}
            >
              {filter.label}
              <span className={`ml-1.5 text-xs ${selected ? "opacity-80" : "text-muted"}`}>
                {count(filter.id)}
              </span>
            </button>
          );
        })}
      </div>

      <motion.div
        layout
        className={`mt-6 grid ${cardGap} ${
          visible.length === 1 ? "mx-auto max-w-md" : "sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((group) => (
            <motion.div
              key={group.title}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={spring}
              className={card}
            >
              <h3 className="text-base text-foreground">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-surface-2 px-3 py-1 text-xs text-foreground transition-colors hover:bg-accent-soft hover:text-accent"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

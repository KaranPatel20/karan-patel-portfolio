"use client";

import { useEffect, useState } from "react";

const words = ["dashboards", "KPI reports", "SQL pipelines", "Flutter apps", "ML models"];

export default function HeroRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), 2600);
    return () => clearInterval(timer);
  }, []);

  return (
    <p className="text-base text-muted">
      Currently building{" "}
      <span className="relative inline-block h-[1.5em] overflow-hidden align-bottom">
        <span
          key={words[index]}
          className="hero-materialize inline-block font-medium text-accent"
          style={{ animationDuration: "0.5s" }}
          aria-live="polite"
        >
          {words[index]}
        </span>
      </span>
    </p>
  );
}

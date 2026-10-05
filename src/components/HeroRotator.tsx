"use client";

import { useEffect, useState } from "react";

const words = ["AI Automations", "ML models", "Dashboards", "KPI Reports", "Flutter apps"];

export default function HeroRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <p className="font-mono text-base text-muted sm:text-lg">
      Currently building{" "}
      <span className="relative inline-block h-[1.5em] overflow-hidden align-bottom">
        <span
          key={words[index]}
          className="hero-rise inline-block text-accent"
          style={{ animationDuration: "0.45s" }}
          aria-live="polite"
        >
          {words[index]}
        </span>
      </span>
    </p>
  );
}

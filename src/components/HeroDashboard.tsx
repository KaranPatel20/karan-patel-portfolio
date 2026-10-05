"use client";

import { useEffect, useState } from "react";

// Illustrative mini dashboard. Numbers are sample data, labelled as such.
const bars = [
  { label: "Jan", value: 42 },
  { label: "Feb", value: 58 },
  { label: "Mar", value: 51 },
  { label: "Apr", value: 74 },
  { label: "May", value: 66 },
  { label: "Jun", value: 88 },
];

const line = [30, 38, 34, 52, 49, 68, 80];
const lineWidth = 220;
const lineHeight = 56;
const points = line
  .map((v, i) => `${(i / (line.length - 1)) * lineWidth},${lineHeight - (v / 100) * lineHeight}`)
  .join(" ");

function useCount(target: number) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    const begin = performance.now() + 600;
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(Math.max((now - begin) / 1400, 0), 1);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return value;
}

export default function HeroDashboard() {
  const [active, setActive] = useState<number | null>(null);
  const [shown, setShown] = useState(false);
  const total = useCount(128);
  const current = active ?? bars.length - 1;

  useEffect(() => {
    const timer = setTimeout(() => setShown(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{ "--i": 3 } as React.CSSProperties}
      className="hero-rise hidden w-full max-w-[380px] justify-self-end rounded-[32px] border border-border bg-surface p-5 shadow-sm lg:block"
      role="img"
      aria-label="Sample analytics dashboard with a KPI, a bar chart and a trend line"
    >
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs text-muted">Sample KPI dashboard</p>
        <span className="flex items-center gap-1.5 text-[11px] text-accent-2">
          <span className="hero-pulse h-1.5 w-1.5 rounded-full bg-accent-2" />
          Live
        </span>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <p className="font-mono text-4xl text-foreground">{total}k</p>
        <p className="text-xs text-accent-2">+18% vs last quarter</p>
      </div>

      <div className="mt-8 flex h-28 items-end gap-2">
        {bars.map((bar, i) => (
          <div
            key={bar.label}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className="relative flex h-full flex-1 flex-col justify-end"
          >
            <span
              className={`block w-full rounded-t-xl transition-[height,background-color] duration-700 ease-out ${
                i === current ? "bg-accent" : "bg-accent/35"
              }`}
              style={{ height: shown ? `${bar.value}%` : "4%", transitionDelay: `${i * 70}ms` }}
            />
            {i === current && (
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-foreground px-2 py-0.5 font-mono text-[10px] text-background">
                {bar.label}: {bar.value}k
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex gap-2">
        {bars.map((bar) => (
          <span key={bar.label} className="flex-1 text-center text-[10px] text-muted">
            {bar.label}
          </span>
        ))}
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <p className="mb-2 text-[11px] text-muted">Trend</p>
        <svg viewBox={`0 0 ${lineWidth} ${lineHeight}`} className="h-14 w-full overflow-visible" aria-hidden>
          <polyline
            points={points}
            fill="none"
            stroke="var(--accent-2)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            className="hero-draw"
          />
        </svg>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

const stats = [
  { value: 3, suffix: "+", label: "years in data and software" },
  { value: 5, suffix: "", label: "shipped projects" },
  { value: 6, suffix: "", label: "certifications" },
];

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    const duration = 1100;
    const begin = performance.now() + 700;
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(Math.max((now - begin) / duration, 0), 1);
      setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [to]);

  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}

export default function HeroStats() {
  return (
    <dl className="mt-8 flex flex-wrap gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-baseline gap-2 rounded-full border border-border bg-surface px-4 py-2"
        >
          <dt className="font-mono text-lg text-accent">
            <CountUp to={stat.value} suffix={stat.suffix} />
          </dt>
          <dd className="text-xs text-muted">{stat.label}</dd>
        </div>
      ))}
    </dl>
  );
}

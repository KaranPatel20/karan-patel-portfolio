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
    <dl className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-4 sm:gap-8">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <dt className="text-3xl font-semibold tracking-tight text-foreground">
            <CountUp to={stat.value} suffix={stat.suffix} />
          </dt>
          <dd className="mt-1 text-xs text-muted">{stat.label}</dd>
        </div>
      ))}
    </dl>
  );
}

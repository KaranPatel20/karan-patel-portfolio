"use client";

import { useEffect, useState } from "react";
import TrackedLink from "@/components/TrackedLink";

// Real result from the Living Flood Map hackathon project (see Projects).
const before = 0.65;
const after = 0.91;

function useCount(target: number, decimals: number) {
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
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Number((target * eased).toFixed(decimals)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, decimals]);
  return value;
}

export default function HeroResult() {
  const [shown, setShown] = useState(false);
  const score = useCount(after, 2);

  useEffect(() => {
    const timer = setTimeout(() => setShown(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{ "--i": 8 } as React.CSSProperties}
      className="hero-rise mx-auto mt-10 w-full max-w-4xl rounded-[32px] border border-border bg-surface p-6 text-left shadow-card sm:p-8"
    >
      <p className="text-sm text-muted">Living Flood Map, hackathon project</p>

      <div className="mt-6 grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm text-muted">Flood report classifier, F1 score</p>
          <p className="mt-1 flex items-baseline gap-3">
            <span className="text-5xl font-semibold tracking-tight text-foreground">
              {score.toFixed(2)}
            </span>
            <span className="text-sm text-accent-2">up from 0.65</span>
          </p>
          <p className="mt-4 max-w-sm text-justify text-sm leading-relaxed text-muted">
            A free local model labels every tweet, and Gemini only reviews the ones it is unsure
            about. It separates flood reports from noise, then plots the places they mention.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Local model alone</span>
              <span className="font-medium text-foreground">{before.toFixed(2)}</span>
            </div>
            <div className="mt-2 h-3 rounded-full bg-surface-2">
              <div
                className="h-3 rounded-full bg-accent/40 transition-[width] duration-1000 ease-out"
                style={{ width: shown ? `${before * 100}%` : "0%" }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">With Gemini review</span>
              <span className="font-medium text-foreground">{after.toFixed(2)}</span>
            </div>
            <div className="mt-2 h-3 rounded-full bg-surface-2">
              <div
                className="h-3 rounded-full bg-accent transition-[width] delay-150 duration-1000 ease-out"
                style={{ width: shown ? `${after * 100}%` : "0%" }}
              />
            </div>
          </div>
          <p className="text-xs text-muted">Measured on 17,632 held-out tweets.</p>
          <div className="flex flex-wrap gap-3">
            <TrackedLink
              href="https://living-flood-map.streamlit.app/"
              target="_blank"
              rel="noreferrer"
              event="project_link_click"
              eventProps={{ project: "living-flood-map", link: "live-demo", location: "hero" }}
              className="press inline-flex items-center rounded-full bg-accent px-5 py-2 text-sm font-medium text-on-accent hover:bg-accent-hover"
            >
              Live demo
            </TrackedLink>
            <TrackedLink
              href="https://github.com/KaranPatel20/Hackathon"
              target="_blank"
              rel="noreferrer"
              event="project_link_click"
              eventProps={{ project: "living-flood-map", link: "github", location: "hero" }}
              className="press inline-flex items-center rounded-full bg-surface-2 px-5 py-2 text-sm font-medium text-foreground hover:text-accent"
            >
              GitHub
            </TrackedLink>
          </div>
        </div>
      </div>
    </div>
  );
}

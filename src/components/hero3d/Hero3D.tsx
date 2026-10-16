"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { FaChevronDown } from "react-icons/fa6";
import TrackedLink from "@/components/TrackedLink";
import HeroTitle from "@/components/HeroTitle";
import { container } from "@/lib/layout";
import type { SceneApi } from "./createFloodScene";

// The scene code (three) is a separate chunk that loads after first paint.
const FloodCanvas = dynamic(() => import("./FloodCanvas"), { ssr: false });

// Height of the sticky site header; the stage pins just under it.
const HEADER_HEIGHT = 52;
const LOCAL_F1 = 0.65;
const FINAL_F1 = 0.91;

const captions = [
  "Flood reports and noise, all mixed together.",
  "A free local model labels every tweet. F1 0.65 on its own.",
  "Gemini only reviews the ones it is unsure about. F1 0.91.",
];
const stageLabels = ["Mixed", "Local model", "Gemini review"];
// Scroll progress each rail button jumps to.
const railTargets = [0.02, 0.45, 0.95];

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
const stageForProgress = (p: number) => (p < 0.12 ? 0 : p < 0.55 ? 1 : 2);

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

const rise = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default function Hero3D() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const upFromRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<SceneApi | null>(null);
  const progressRef = useRef({ cur: 0, t1: 0, t2: 0 });
  const pointerRef = useRef({ x: 0, y: 0 });
  const stageIndexRef = useRef(0);

  const [stage, setStage] = useState(0);
  const [sceneFailed, setSceneFailed] = useState(false);
  // Server and first client render assume the scroll experience; the real values swap in after
  // hydration without a state-setting effect.
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
  // No up-front WebGL probe (creating a context during hydration is expensive). If the scene
  // cannot be created, FloodCanvas reports it and the static layout takes over.
  const staticMode = reducedMotion || sceneFailed;
  const [loadScene, setLoadScene] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  // Where the readout stands for the given stage values. Writes straight to the DOM so the
  // scroll loop never re-renders React.
  const written = useRef({ text: "", up: "", hint: "" });
  const writeReadout = useCallback((t1: number, t2: number, p: number) => {
    const value = t2 > 0 ? LOCAL_F1 + (FINAL_F1 - LOCAL_F1) * t2 : LOCAL_F1 * t1;
    const text = value.toFixed(2);
    const last = written.current;
    // Only touch the DOM when something changed, so an idle hero causes no style work.
    if (text !== last.text) {
      last.text = text;
      if (numberRef.current) numberRef.current.textContent = text;
      if (barRef.current) barRef.current.style.transform = `scaleX(${value.toFixed(3)})`;
    }
    const up = t2 > 0 ? "1" : "0";
    if (up !== last.up) {
      last.up = up;
      if (upFromRef.current) upFromRef.current.style.opacity = up;
    }
    const hint = p > 0.04 ? "0" : "1";
    if (hint !== last.hint) {
      last.hint = hint;
      if (hintRef.current) hintRef.current.style.opacity = hint;
    }
    const next = stageForProgress(p);
    if (next !== stageIndexRef.current) {
      stageIndexRef.current = next;
      setStage(next);
    }
  }, []);

  // Paint the scene once with the current progress (used on layout and theme changes, and as
  // the single frame in static mode).
  const renderOnce = useCallback(() => {
    const { cur, t1, t2 } = progressRef.current;
    apiRef.current?.render(t1, t2, 0, cur, 0, 0);
  }, []);

  // Load the scene after the page has loaded, in an idle slot, so it never competes with
  // hydration or the first interaction.
  useEffect(() => {
    let cancelled = false;
    let handle = 0;
    const hasIdle = typeof window.requestIdleCallback === "function";
    const start = () => {
      if (!cancelled) setLoadScene(true);
    };
    // The headline and readout are already usable; the cloud arrives shortly after load.
    const schedule = () => {
      handle = window.setTimeout(() => {
        handle = hasIdle
          ? window.requestIdleCallback(start, { timeout: 1500 })
          : window.setTimeout(start, 0);
      }, 2000);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
      window.clearTimeout(handle);
      if (hasIdle) window.cancelIdleCallback(handle);
    };
  }, []);

  // Static mode: final state, one frame, no loop.
  useEffect(() => {
    if (!staticMode) return;
    progressRef.current = { cur: 1, t1: 1, t2: 1 };
    writeReadout(1, 1, 1);
    renderOnce();
  }, [staticMode, sceneReady, writeReadout, renderOnce]);

  // Scroll mode: smooth the track progress and drive the scene and the readout.
  useEffect(() => {
    if (staticMode) return;
    const track = trackRef.current;
    if (!track) return;

    // Cache the track geometry so the frame loop never forces layout. Re-measured on resize.
    let trackTop = 0;
    let scrollable = 1;
    const measure = () => {
      const rect = track.getBoundingClientRect();
      trackTop = rect.top + window.scrollY;
      scrollable = Math.max(1, rect.height - (window.innerHeight - HEADER_HEIGHT));
    };
    measure();
    const sizeObserver = new ResizeObserver(measure);
    sizeObserver.observe(track);
    window.addEventListener("resize", measure);
    const targetProgress = () =>
      clamp((window.scrollY - (trackTop - HEADER_HEIGHT)) / scrollable, 0, 1);

    const state = progressRef.current;
    state.cur = targetProgress();
    let raf = 0;
    let last = performance.now();
    let visible = true;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      state.cur += (targetProgress() - state.cur) * (1 - Math.pow(0.0008, dt));
      state.t1 = smoothstep(0.08, 0.42, state.cur);
      state.t2 = smoothstep(0.58, 0.92, state.cur);
      writeReadout(state.t1, state.t2, state.cur);
      apiRef.current?.render(
        state.t1,
        state.t2,
        now / 1000,
        state.cur,
        pointerRef.current.x,
        pointerRef.current.y,
      );
    };
    const run = () => {
      if (raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const halt = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) run();
      else halt();
    });
    observer.observe(track);
    const onVisibility = () => (document.hidden ? halt() : run());
    document.addEventListener("visibilitychange", onVisibility);

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const onPointer = (event: PointerEvent) => {
      pointerRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    if (finePointer) window.addEventListener("pointermove", onPointer, { passive: true });

    run();
    return () => {
      halt();
      observer.disconnect();
      sizeObserver.disconnect();
      window.removeEventListener("resize", measure);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [staticMode, writeReadout]);

  const goToStage = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const stageHeight = window.innerHeight - HEADER_HEIGHT;
    const scrollable = track.getBoundingClientRect().height - stageHeight;
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: trackTop - HEADER_HEIGHT + railTargets[index] * scrollable,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <div
      ref={trackRef}
      className="hero-track"
      data-static={staticMode ? "true" : undefined}
    >
      <div ref={stageRef} className="hero-stage">
        {loadScene && (
          <FloodCanvas
            stageRef={stageRef}
            copyRef={copyRef}
            cardRef={cardRef}
            apiRef={apiRef}
            onReady={() => setSceneReady(true)}
            onFail={() => setSceneFailed(true)}
            onLayout={renderOnce}
          />
        )}

        <div className={`relative z-10 flex flex-1 flex-col justify-between gap-6 py-6 ${container}`}>
          <div ref={copyRef} className="hero-copy w-full min-[900px]:w-[45%]">
            <p style={rise(0)} className="hero-rise text-sm font-semibold text-accent">
              Data Analyst / Software Developer
            </p>
            <div className="hero-title mt-3">
              <HeroTitle text="Hi, I'm Karan." />
            </div>
            <p
              style={rise(4)}
              className="hero-rise hero-sub mt-4 max-w-xl text-lg leading-[1.55] text-foreground/85"
            >
              I turn data into decisions, and ideas into software. 3+ years building dashboards,
              KPIs, and the software behind them.
            </p>
            <div style={rise(5)} className="hero-rise hero-ctas mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <TrackedLink
                href="#projects"
                event="cta_click"
                eventProps={{ cta: "see-my-work", location: "hero" }}
                className="press inline-flex items-center justify-center rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-on-accent hover:bg-accent-hover"
              >
                See my work
              </TrackedLink>
              <TrackedLink
                href="mailto:karankp20120@gmail.com"
                event="social_click"
                eventProps={{ platform: "email", location: "hero" }}
                className="press inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover"
              >
                Email me <span aria-hidden>&rsaquo;</span>
              </TrackedLink>
            </div>
          </div>

          <div className="w-full min-[900px]:w-[45%]">
            <div
              ref={cardRef}
              className="hero-card rounded-[32px] border border-border bg-surface p-5 shadow-card sm:p-6"
            >
              <p className="text-xs text-muted sm:text-sm">Living Flood Map, hackathon project</p>

              <div className="mt-2 flex items-baseline gap-3">
                <span
                  ref={numberRef}
                  aria-hidden="true"
                  className="hero-num text-4xl font-semibold tracking-tight text-foreground tabular-nums sm:text-5xl"
                >
                  0.00
                </span>
                <span className="text-sm text-muted">F1 score</span>
                <span
                  ref={upFromRef}
                  aria-hidden="true"
                  className="text-sm text-accent-2 transition-opacity duration-300"
                  style={{ opacity: 0 }}
                >
                  up from 0.65
                </span>
              </div>
              <p className="sr-only">
                F1 score is 0.65 with the local model alone and 0.91 with Gemini review, measured on
                17,632 held-out tweets.
              </p>

              <div className="relative mt-3 h-2 rounded-full bg-surface-2" aria-hidden="true">
                <div
                  ref={barRef}
                  className="h-2 origin-left rounded-full bg-accent"
                  style={{ transform: "scaleX(0)" }}
                />
                <span
                  className="absolute -top-1 h-4 w-0.5 rounded-full bg-foreground/60"
                  style={{ left: "65%" }}
                />
              </div>

              <ol className="hero-captions mt-3 grid list-none text-sm leading-snug text-foreground/85">
                {captions.map((text, i) => (
                  <li
                    key={text}
                    className={`col-start-1 row-start-1 transition-opacity duration-300 ${
                      stage === i ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {text}
                  </li>
                ))}
              </ol>

              <ul className="hero-legend mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: "var(--scene-flood)" }} />
                  Flood report
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: "var(--scene-noise)" }} />
                  Noise
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: "var(--scene-review)" }} />
                  Reviewed by Gemini
                </li>
              </ul>

              <div className="hero-card-actions mt-4 flex flex-wrap gap-2">
                <TrackedLink
                  href="https://living-flood-map.streamlit.app/"
                  target="_blank"
                  rel="noreferrer"
                  event="project_link_click"
                  eventProps={{ project: "Living Flood Map", link: "Live demo", location: "hero" }}
                  className="press inline-flex items-center rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-on-accent hover:bg-accent-hover"
                >
                  Live demo
                </TrackedLink>
                <TrackedLink
                  href="https://github.com/KaranPatel20/Hackathon"
                  target="_blank"
                  rel="noreferrer"
                  event="project_link_click"
                  eventProps={{ project: "Living Flood Map", link: "GitHub", location: "hero" }}
                  className="press inline-flex items-center rounded-full bg-surface-2 px-4 py-1.5 text-sm font-medium text-foreground hover:text-accent"
                >
                  GitHub
                </TrackedLink>
              </div>
            </div>
            <p className="hero-foot mt-2 text-[11px] leading-snug text-muted">
              F1 measured on 17,632 held-out tweets. Points illustrate the pipeline, not real tweets.
            </p>
          </div>
        </div>

        {!staticMode && (
          <div
            ref={hintRef}
            aria-hidden="true"
            className="hero-hint pointer-events-none absolute bottom-2 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-0.5 text-[11px] text-muted transition-opacity duration-300 min-[900px]:flex"
          >
            Scroll to explore
            <FaChevronDown className="h-3 w-3" />
          </div>
        )}

        <nav
          aria-label="Hero stages"
          className="hero-rail absolute right-2 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-1 sm:right-4"
        >
          {stageLabels.map((label, i) => (
            <button
              key={label}
              type="button"
              aria-label={`Show stage ${i + 1}: ${label}`}
              aria-current={stage === i ? "step" : undefined}
              onClick={() => goToStage(i)}
              className="press group flex h-8 w-8 items-center justify-center rounded-full"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  stage === i
                    ? "h-3 w-3 bg-accent"
                    : "h-2 w-2 bg-foreground/30 group-hover:bg-foreground/60"
                }`}
              />
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

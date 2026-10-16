"use client";

import { useEffect, useRef } from "react";
import { createFloodScene, type SceneApi, type SceneColors } from "./createFloodScene";

// Scene colours come from CSS variables, so the theme toggle (and the system theme) just works.
export function readSceneColors(el: Element): SceneColors {
  const cs = getComputedStyle(el);
  const get = (name: string) => cs.getPropertyValue(name).trim();
  return {
    flood: get("--scene-flood"),
    noise: get("--scene-noise"),
    neutral: get("--scene-neutral"),
    review: get("--scene-review"),
  };
}

export default function FloodCanvas({
  stageRef,
  copyRef,
  cardRef,
  apiRef,
  onReady,
  onFail,
  onLayout,
}: {
  stageRef: React.RefObject<HTMLElement | null>;
  copyRef: React.RefObject<HTMLElement | null>;
  cardRef: React.RefObject<HTMLElement | null>;
  apiRef: React.MutableRefObject<SceneApi | null>;
  onReady: () => void;
  onFail: () => void;
  onLayout: () => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const stage = stageRef.current;
    const copy = copyRef.current;
    const card = cardRef.current;
    if (!host || !stage || !copy || !card) return;

    // A fresh canvas per mount: React dev mode mounts twice, and a disposed WebGL context
    // cannot be reused on the same element.
    const canvas = document.createElement("canvas");
    canvas.className = "h-full w-full";
    host.appendChild(canvas);

    let disposed = false;
    let api: SceneApi | null = null;
    let cleanup = () => {};

    createFloodScene(canvas, { stage, copy, card }, readSceneColors(stage)).then(
      (created) => {
        if (disposed) {
          created.dispose();
          return;
        }
        api = created;
        apiRef.current = created;

        const relayout = () => {
          created.layout();
          onLayout();
        };
        const resizeObserver = new ResizeObserver(relayout);
        [stage, copy, card].forEach((el) => resizeObserver.observe(el));
        window.addEventListener("resize", relayout);
        document.fonts?.ready.then(relayout);

        const recolor = () => {
          created.setColors(readSceneColors(stage));
          onLayout();
        };
        const themeObserver = new MutationObserver(recolor);
        themeObserver.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["data-theme"],
        });
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        media.addEventListener("change", recolor);

        cleanup = () => {
          resizeObserver.disconnect();
          window.removeEventListener("resize", relayout);
          themeObserver.disconnect();
          media.removeEventListener("change", recolor);
        };
        onReady();
      },
      () => {
        if (!disposed) onFail();
      },
    );

    return () => {
      disposed = true;
      cleanup();
      apiRef.current = null;
      api?.dispose();
      canvas.remove();
    };
    // The refs and callbacks are stable for the lifetime of the hero.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={hostRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />;
}

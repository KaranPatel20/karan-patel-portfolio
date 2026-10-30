"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

// Everything heavy lives in AskPanel, which only loads when the visitor opens the chat.
const AskPanel = dynamic(() => import("./AskPanel"), { ssr: false });

type Status = { turnstileSiteKey: string | null };

// A small button in the corner. It asks /api/ask whether the assistant is switched on and renders
// nothing if it is not (kill switch), so a turned-off assistant leaves no trace on the page.
export default function AskLauncher() {
  const [status, setStatus] = useState<Status | null>(null);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      try {
        const res = await fetch("/api/ask", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { enabled?: boolean; turnstileSiteKey?: string | null };
        if (!cancelled && data.enabled) setStatus({ turnstileSiteKey: data.turnstileSiteKey ?? null });
      } catch {
        // Stay hidden if the check fails.
      }
    };
    // After the page has loaded, in an idle slot, so it never competes with first paint.
    const run = () => {
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(check, { timeout: 4000 });
      } else {
        window.setTimeout(check, 1500);
      }
    };
    if (document.readyState === "complete") run();
    else window.addEventListener("load", run, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", run);
    };
  }, []);

  if (!status) return null;

  return (
    <>
      {!open && (
        <button
          ref={buttonRef}
          type="button"
          onClick={() => {
            trackEvent("ask_open");
            setOpen(true);
          }}
          aria-label="Ask the assistant"
          className="press fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-on-accent shadow-card hover:bg-accent-hover sm:bottom-6 sm:right-6"
        >
          <span className="rounded-full bg-on-accent/20 px-1.5 py-0.5 text-[10px] font-semibold">
            AI
          </span>
          Ask me
        </button>
      )}
      {open && (
        <AskPanel
          turnstileSiteKey={status.turnstileSiteKey}
          onClose={() => {
            setOpen(false);
            // Return focus to the launcher once it is back in the DOM.
            window.setTimeout(() => buttonRef.current?.focus(), 0);
          }}
        />
      )}
    </>
  );
}

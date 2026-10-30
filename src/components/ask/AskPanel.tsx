"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FaXmark, FaStop, FaArrowUp } from "react-icons/fa6";
import { trackEvent } from "@/lib/analytics";
import { site } from "@/data/portfolio";

type Message = { role: "user" | "assistant"; content: string };
type Failure = { message: string };

const MAX_CHARS = 500;
const HISTORY = 6;

const suggestions = [
  "What did you build for the Living Flood Map?",
  "What's your strongest ML project?",
  "Where have you worked?",
];

type TurnstileApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  execute: (id: string) => void;
  reset: (id: string) => void;
  remove: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

function loadTurnstile(): Promise<TurnstileApi> {
  return new Promise((resolve, reject) => {
    if (window.turnstile) return resolve(window.turnstile);
    const existing = document.querySelector<HTMLScriptElement>("script[data-turnstile]");
    const script = existing ?? document.createElement("script");
    const done = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("no api")));
    script.addEventListener("load", done, { once: true });
    script.addEventListener("error", () => reject(new Error("load failed")), { once: true });
    if (!existing) {
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.dataset.turnstile = "true";
      document.head.appendChild(script);
    }
  });
}

export default function AskPanel({
  turnstileSiteKey,
  onClose,
}: {
  turnstileSiteKey: string | null;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [failure, setFailure] = useState<Failure | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const turnstileHost = useRef<HTMLDivElement>(null);
  const turnstileId = useRef<string | null>(null);
  const tokenResolver = useRef<((token: string) => void) | null>(null);

  // Focus the input on open and again whenever a reply (or error) has finished.
  useEffect(() => {
    if (!pending) inputRef.current?.focus();
  }, [pending]);

  // Esc closes from anywhere on the page while the panel is open, not only when focus is inside.
  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      abortRef.current?.abort();
      onClose();
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [onClose]);

  // Keep the newest message in view.
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, pending, failure]);

  // Bot challenge: an invisible Turnstile widget, executed once per message.
  useEffect(() => {
    if (!turnstileSiteKey) return;
    let cancelled = false;
    loadTurnstile()
      .then((api) => {
        if (cancelled || !turnstileHost.current) return;
        turnstileId.current = api.render(turnstileHost.current, {
          sitekey: turnstileSiteKey,
          execution: "execute",
          appearance: "interaction-only",
          callback: (token: string) => tokenResolver.current?.(token),
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      if (turnstileId.current && window.turnstile) window.turnstile.remove(turnstileId.current);
      turnstileId.current = null;
    };
  }, [turnstileSiteKey]);

  const getToken = useCallback((): Promise<string | undefined> => {
    if (!turnstileSiteKey) return Promise.resolve(undefined);
    return new Promise((resolve) => {
      const api = window.turnstile;
      const id = turnstileId.current;
      if (!api || !id) return resolve(undefined);
      const timer = window.setTimeout(() => resolve(undefined), 10_000);
      tokenResolver.current = (token) => {
        window.clearTimeout(timer);
        resolve(token);
      };
      api.reset(id);
      api.execute(id);
    });
  }, [turnstileSiteKey]);

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || text.length > MAX_CHARS || pending) return;
      const next: Message[] = [...messages, { role: "user", content: text }];
      setMessages(next);
      setInput("");
      setFailure(null);
      setPending(true);
      trackEvent("ask_message");

      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const token = await getToken();
        const res = await fetch("/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: next.slice(-HISTORY), turnstileToken: token }),
          signal: controller.signal,
        });
        const data = (await res.json().catch(() => ({}))) as { reply?: string; error?: string };
        if (res.ok && data.reply) {
          setMessages((current) => [...current, { role: "assistant", content: data.reply as string }]);
        } else {
          setFailure({ message: data.error ?? "Sorry, I couldn't answer that just now." });
        }
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setFailure({ message: "Sorry, I couldn't reach the assistant just now." });
        }
      } finally {
        abortRef.current = null;
        setPending(false);
      }
    },
    [messages, pending, getToken],
  );

  const stop = () => abortRef.current?.abort();

  // Tab stays inside the panel.
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "Tab") return;
    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), a[href]',
    );
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-label="Ask the assistant"
      onKeyDown={onKeyDown}
      className="fixed bottom-4 right-4 z-50 flex h-[min(34rem,calc(100svh-2rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[32px] border border-border bg-surface shadow-card sm:bottom-6 sm:right-6"
    >
      <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold text-accent">
              AI
            </span>
            Ask about Karan&apos;s work
          </p>
          <p className="mt-1 text-xs leading-snug text-muted">
            An AI assistant, not Karan. Answers come from his site and resume. Questions are
            processed by Google&apos;s Gemini API, so please don&apos;t enter personal information.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            stop();
            onClose();
          }}
          aria-label="Close assistant"
          className="press -mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-2 text-foreground hover:text-accent"
        >
          <FaXmark className="h-4 w-4" />
        </button>
      </div>

      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-label="Conversation"
        className="flex-1 space-y-3 overflow-y-auto px-5 py-4"
      >
        {messages.length === 0 && (
          <div className="space-y-2">
            <p className="text-sm text-muted">Try one of these:</p>
            {suggestions.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => send(question)}
                className="press block w-full rounded-2xl border border-border bg-surface px-4 py-2.5 text-left text-sm text-foreground hover:border-accent hover:text-accent"
              >
                {question}
              </button>
            ))}
          </div>
        )}

        {messages.map((message, i) => (
          <div key={i} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <p
              className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                message.role === "user"
                  ? "bg-accent text-on-accent"
                  : "bg-surface-2 text-foreground"
              }`}
            >
              <span className="sr-only">{message.role === "user" ? "You: " : "Assistant: "}</span>
              {message.content}
            </p>
          </div>
        ))}

        {pending && (
          <div className="flex justify-start" aria-label="The assistant is typing">
            <p className="flex items-center gap-1 rounded-2xl bg-surface-2 px-4 py-3 text-muted">
              <span className="sr-only">Thinking</span>
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  aria-hidden="true"
                  className="h-1.5 w-1.5 animate-pulse rounded-full bg-current motion-reduce:animate-none"
                  style={{ animationDelay: `${dot * 180}ms` }}
                />
              ))}
            </p>
          </div>
        )}

        {failure && (
          <p className="rounded-2xl border border-border px-4 py-3 text-sm leading-snug text-foreground">
            {failure.message} You can also reach Karan at{" "}
            <a href={`mailto:${site.email}`} className="text-accent underline underline-offset-2">
              {site.email}
            </a>
            .
          </p>
        )}
      </div>

      <div ref={turnstileHost} aria-hidden="true" />

      <form
        onSubmit={(event) => {
          event.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t border-border px-4 py-3"
      >
        <label htmlFor="ask-input" className="sr-only">
          Your question
        </label>
        <input
          id="ask-input"
          ref={inputRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          maxLength={MAX_CHARS}
          placeholder="Ask about his work"
          autoComplete="off"
          readOnly={pending}
          className="min-w-0 flex-1 rounded-full bg-surface-2 px-4 py-2 text-sm text-foreground placeholder:text-muted read-only:opacity-60"
        />
        {pending ? (
          <button
            type="button"
            onClick={stop}
            aria-label="Stop"
            className="press flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-2 text-foreground hover:text-accent"
          >
            <FaStop className="h-3.5 w-3.5" />
          </button>
        ) : (
          <button
            type="submit"
            aria-label="Send"
            disabled={!input.trim()}
            className="press flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaArrowUp className="h-3.5 w-3.5" />
          </button>
        )}
      </form>
    </div>
  );
}

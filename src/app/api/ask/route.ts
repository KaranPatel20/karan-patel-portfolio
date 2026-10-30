import { buildCorpus, buildProfile } from "@/lib/corpus";
import { checkDailyCap, checkIpLimit } from "@/lib/ratelimit";
import { site } from "@/data/portfolio";

// POST /api/ask: validates the chat, applies limits and the bot challenge, then forwards the chat
// and the site corpus to the n8n webhook with a shared secret. The browser never sees the n8n URL,
// the secret, or any Gemini key. Visitor questions are never logged here.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 12_000;
const MAX_MESSAGES = 6;
const MAX_LAST_USER_CHARS = 500;
const MAX_MESSAGE_CHARS = 2_000;
const MAX_TOTAL_CHARS = 6_000;
const UPSTREAM_TIMEOUT_MS = 28_000;

type ChatMessage = { role: "user" | "assistant"; content: string };

const noStore = { "Cache-Control": "no-store" };

function fail(status: number, error: string, extra: Record<string, unknown> = {}) {
  return Response.json({ error, email: site.email, ...extra }, { status, headers: noStore });
}

// "stuffing" (default): the whole site content goes in every request, for the Gemini-call workflow.
// "agent": only the short profile goes in; the n8n AI agent fetches details from its vector store.
function agentMode() {
  return (process.env.ASK_MODE ?? "").toLowerCase() === "agent";
}

function enabled() {
  const flag = (process.env.ASK_ENABLED ?? "").toLowerCase();
  return flag === "true" || flag === "1";
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function parseMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== "object") return null;
  const messages = (body as { messages?: unknown }).messages;
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
    return null;
  }
  const parsed: ChatMessage[] = [];
  let total = 0;
  for (const item of messages) {
    if (!item || typeof item !== "object") return null;
    const { role, content } = item as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim();
    if (!text || text.length > MAX_MESSAGE_CHARS) return null;
    total += text.length;
    parsed.push({ role, content: text });
  }
  const last = parsed[parsed.length - 1];
  if (last.role !== "user" || last.content.length > MAX_LAST_USER_CHARS) return null;
  if (total > MAX_TOTAL_CHARS) return null;
  return parsed;
}

async function verifyTurnstile(token: unknown, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // challenge is off until the keys are configured
  if (typeof token !== "string" || !token || token.length > 2048) return false;
  try {
    const form = new URLSearchParams({ secret, response: token });
    if (ip !== "unknown") form.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
      signal: AbortSignal.timeout(5_000),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

// Lets the widget decide whether to show itself, and which Turnstile site key to use. When the
// assistant is off this answers 200 with enabled:false (not an error), so a switched-off assistant
// leaves nothing in the browser console. POST still answers 503 when off.
export async function GET() {
  if (!enabled()) {
    return Response.json({ enabled: false }, { headers: { "Cache-Control": "public, max-age=0, s-maxage=30" } });
  }
  return Response.json(
    { enabled: true, turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? null },
    { headers: { "Cache-Control": "public, max-age=0, s-maxage=30" } },
  );
}

export async function POST(request: Request) {
  if (!enabled()) return fail(503, "The assistant is turned off right now.");

  const url = process.env.N8N_ASK_URL;
  const secret = process.env.N8N_ASK_SECRET;
  if (!url || !secret) return fail(503, "The assistant is not set up yet.");

  // Cheap checks first: size, then shape.
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) return fail(400, "That message is too long.");
  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return fail(400, "I couldn't read that message.");
  }
  if (raw.length > MAX_BODY_BYTES) return fail(400, "That message is too long.");
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return fail(400, "I couldn't read that message.");
  }
  const messages = parseMessages(body);
  if (!messages) {
    return fail(400, `Please keep questions under ${MAX_LAST_USER_CHARS} characters.`);
  }

  const ip = clientIp(request);

  const ipLimit = await checkIpLimit(ip);
  if (!ipLimit.ok) {
    return fail(429, "You've asked a lot of questions in a short time. Please try again later.");
  }

  if (!(await verifyTurnstile((body as { turnstileToken?: unknown }).turnstileToken, ip))) {
    return fail(403, "I couldn't confirm you're a person. Please reload and try again.");
  }

  const dailyLimit = await checkDailyCap();
  if (!dailyLimit.ok) {
    return fail(429, "The assistant has reached its limit for today. Please try again tomorrow.");
  }

  try {
    const upstream = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Portfolio-Secret": secret },
      body: JSON.stringify({
        // n8n and Gemini call the assistant's turns "model".
        messages: messages.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          content: m.content,
        })),
        ...(agentMode() ? { profile: buildProfile() } : { corpus: buildCorpus() }),
      }),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      cache: "no-store",
    });
    if (!upstream.ok) throw new Error("upstream status");
    const data = (await upstream.json()) as { reply?: unknown };
    if (typeof data.reply !== "string" || !data.reply.trim()) throw new Error("empty reply");
    return Response.json({ reply: data.reply.trim().slice(0, 2_000) }, { headers: noStore });
  } catch {
    // Never pass upstream details to the browser.
    return fail(502, "Sorry, I couldn't answer that just now.");
  }
}

import { Redis } from "@upstash/redis";

// Fixed-window counters. Uses Upstash Redis when its env vars are present (Vercel's Redis
// integration provides KV_REST_API_URL and KV_REST_API_TOKEN), and an in-memory map otherwise
// (local dev, or if Redis is unreachable). The memory fallback is per server instance, so it only
// slows abuse down; Redis is what enforces the limits in production.

let redis: Redis | null | undefined;

function getRedis(): Redis | null {
  if (redis !== undefined) return redis;
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  redis = url && token ? new Redis({ url, token }) : null;
  return redis;
}

const memory = new Map<string, { count: number; resetAt: number }>();

function memoryHit(key: string, windowSeconds: number) {
  const now = Date.now();
  if (memory.size > 5000) {
    for (const [k, v] of memory) if (v.resetAt <= now) memory.delete(k);
  }
  const entry = memory.get(key);
  if (!entry || entry.resetAt <= now) {
    memory.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return 1;
  }
  entry.count += 1;
  return entry.count;
}

// Increments the counter for `key` and returns the new count.
async function hit(key: string, windowSeconds: number): Promise<number> {
  const client = getRedis();
  if (client) {
    try {
      const count = await client.incr(key);
      if (count === 1) await client.expire(key, windowSeconds);
      return count;
    } catch {
      // Fall through to the in-memory counter.
    }
  }
  return memoryHit(key, windowSeconds);
}

export type LimitResult = { ok: true } | { ok: false; reason: "ip" | "daily" };

const IP_LIMIT = Number(process.env.ASK_IP_LIMIT ?? 10);
const IP_WINDOW_SECONDS = Number(process.env.ASK_IP_WINDOW_SECONDS ?? 600);
const DAILY_CAP = Number(process.env.ASK_DAILY_CAP ?? 300);

export async function checkIpLimit(ip: string): Promise<LimitResult> {
  const count = await hit(`ask:ip:${ip}`, IP_WINDOW_SECONDS);
  return count > IP_LIMIT ? { ok: false, reason: "ip" } : { ok: true };
}

// Global cap for the day (UTC). Keep it under the Gemini free-tier daily request quota.
export async function checkDailyCap(): Promise<LimitResult> {
  const day = new Date().toISOString().slice(0, 10);
  const count = await hit(`ask:day:${day}`, 60 * 60 * 26);
  return count > DAILY_CAP ? { ok: false, reason: "daily" } : { ok: true };
}

// Best-effort per-IP rate limiting for public endpoints (contact form + AI
// surfaces). Guards against the real-world threats those endpoints carry: LLM
// cost abuse, lead-notification email bombing, and junk-row DB flooding.
//
// IMPORTANT — serverless scope: this store lives in module memory, so on Vercel
// it is per-warm-instance, NOT globally shared. That still throttles the
// realistic threat (a single IP running a request loop, which lands on a small
// pool of warm instances) at zero infra cost. For bulletproof distributed
// limiting, swap `store` for Upstash Redis / Vercel KV — `checkRateLimit()` and
// `rateLimit()` keep the same signature, so only this file changes.

type Bucket = { count: number; resetAt: number };

const store = new Map<string, Bucket>();

// Opportunistic sweep so the Map can't grow unbounded on a long-lived instance.
let lastSweep = 0;
function sweep(now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [k, b] of store) if (b.resetAt <= now) store.delete(k);
}

/** Pull the client IP from Vercel's forwarding headers (first XFF hop). */
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim() || "unknown";
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfterSec: number;
}

/**
 * Fixed-window counter. `identifier` should already namespace the endpoint
 * (e.g. "chat:1.2.3.4") so each IP gets an independent budget per surface.
 */
export function checkRateLimit(
  identifier: string,
  opts: { limit: number; windowMs: number },
): RateLimitResult {
  const now = Date.now();
  sweep(now);
  const b = store.get(identifier);
  if (!b || b.resetAt <= now) {
    store.set(identifier, { count: 1, resetAt: now + opts.windowMs });
    return { ok: true, remaining: opts.limit - 1, retryAfterSec: 0 };
  }
  if (b.count >= opts.limit) {
    return { ok: false, remaining: 0, retryAfterSec: Math.ceil((b.resetAt - now) / 1000) };
  }
  b.count += 1;
  return { ok: true, remaining: opts.limit - b.count, retryAfterSec: 0 };
}

/** Convenience wrapper: rate-limit a request by `<key>:<ip>`. */
export function rateLimit(
  req: Request,
  key: string,
  opts: { limit: number; windowMs: number },
): RateLimitResult {
  return checkRateLimit(`${key}:${clientIp(req)}`, opts);
}

/** Standard 429 response with a Retry-After header. */
export function tooManyRequests(result: RateLimitResult, message: string): Response {
  return new Response(JSON.stringify({ error: message }), {
    status: 429,
    headers: {
      "Content-Type": "application/json",
      "Retry-After": String(Math.max(result.retryAfterSec, 1)),
    },
  });
}

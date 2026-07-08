// Minimal self-contained admin auth: one shared password (ADMIN_PASSWORD env)
// exchanged for an HMAC-signed, expiring httpOnly cookie. No user table, no
// third-party auth — a single-operator back office. The signing secret is
// ADMIN_SESSION_SECRET (falls back to a digest of ADMIN_PASSWORD so a single
// env var is enough to go live).

import { createHmac, createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "f1_admin_session";
const SESSION_HOURS = 24 * 7;

function secret(): string | null {
  const s = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!s) return null;
  return createHash("sha256").update(`f1-admin:${s}`).digest("hex");
}

function sign(payload: string, key: string): string {
  return createHmac("sha256", key).update(payload).digest("hex");
}

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

/** Constant-time password check. */
export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = createHash("sha256").update(input).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

/** Create the signed session cookie value. */
export function createSessionValue(): string | null {
  const key = secret();
  if (!key) return null;
  const exp = Date.now() + SESSION_HOURS * 3600_000;
  const payload = String(exp);
  return `${payload}.${sign(payload, key)}`;
}

export function verifySessionValue(value: string | undefined | null): boolean {
  if (!value) return false;
  const key = secret();
  if (!key) return false;
  const dot = value.lastIndexOf(".");
  if (dot <= 0) return false;
  const payload = value.slice(0, dot);
  const sig = value.slice(dot + 1);
  const expected = sign(payload, key);
  if (sig.length !== expected.length) return false;
  if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  const exp = Number(payload);
  return Number.isFinite(exp) && exp > Date.now();
}

/** True when the current request carries a valid admin session cookie. */
export async function isAdminRequest(): Promise<boolean> {
  const store = await cookies();
  return verifySessionValue(store.get(ADMIN_COOKIE)?.value);
}

export const SESSION_MAX_AGE_S = SESSION_HOURS * 3600;

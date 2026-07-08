// Minimal self-contained admin auth: one shared password exchanged for an
// HMAC-signed, expiring httpOnly cookie. No user table, no third-party auth —
// a single-operator back office.
//
// Password precedence: a scrypt hash in admin_settings (set via the back
// office "change password" panel) overrides ADMIN_PASSWORD env. The env var
// remains the bootstrap credential and the session-signing anchor; changing
// the password does NOT invalidate existing sessions (they expire naturally).

import { createHmac, createHash, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { getAdminSetting, setAdminSetting } from "@/lib/catalog/db";

const PASSWORD_KEY = "admin_password_scrypt"; // value: salthex:hashhex

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

function scryptHash(password: string, saltHex: string): Buffer {
  return scryptSync(password, Buffer.from(saltHex, "hex"), 32);
}

/** Constant-time password check: DB-stored scrypt hash wins over env. */
export async function checkPassword(input: string): Promise<boolean> {
  let stored: string | null = null;
  try {
    stored = await getAdminSetting(PASSWORD_KEY);
  } catch {
    stored = null; // DB unreachable → fall back to env bootstrap credential
  }
  if (stored) {
    const [saltHex, hashHex] = stored.split(":");
    if (saltHex && hashHex) {
      const expected = Buffer.from(hashHex, "hex");
      const actual = scryptHash(input, saltHex);
      return expected.length === actual.length && timingSafeEqual(actual, expected);
    }
  }
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = createHash("sha256").update(input).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

/** Store a new admin password (scrypt, random salt). Returns false if no DB. */
export async function setPassword(next: string): Promise<boolean> {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptHash(next, salt).toString("hex");
  return setAdminSetting(PASSWORD_KEY, `${salt}:${hash}`);
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

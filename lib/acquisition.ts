/** Acquisition is separate from `source`, which describes the on-site entry. */
export const ACQUISITION_VERSION = 1;
export const FIRST_TOUCH_MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;
export const SESSION_IDLE_MS = 30 * 60 * 1000;
export const ACQUISITION_MAX_BYTES = 6000;
const UTM_KEYS = ["source", "medium", "campaign", "id", "content", "term"] as const;
type UtmKey = typeof UTM_KEYS[number];
export interface AcquisitionTouch {
  capturedAt: string;
  landingPath: string;
  referrerOrigin: string | null;
  utm: Partial<Record<UtmKey, string>>;
}
export interface Acquisition {
  version: 1;
  consent: "explicit" | "regional_default";
  firstTouch: AcquisitionTouch;
  sessionTouch: AcquisitionTouch;
}

function record(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/** Keep known page-shaped paths only; never keep URL query strings or hashes. */
export function acquisitionPath(value: unknown): string | null {
  if (typeof value !== "string" || value.length > 4096) return null;
  try {
    const path = new URL(value, "https://www.f1composite.com").pathname;
    return path.length <= 240 && /^\/[a-zA-Z0-9/_-]*$/.test(path) && !/\d{7,}/.test(path) ? path : null;
  } catch { return null; }
}

/** A referral origin is enough to identify the observed site, without its search/user paths. */
export function acquisitionReferrer(value: unknown, currentOrigin?: string): string | null {
  if (typeof value !== "string" || value.length > 4096) return null;
  try {
    const url = new URL(value);
    const hostname = url.hostname.replace(/\.$/, "");
    if (hostname === "f1composite.com" || hostname === "www.f1composite.com") return null;
    if (currentOrigin && url.origin === new URL(currentOrigin).origin) return null;
    return (url.protocol === "https:" || url.protocol === "http:") && !url.username && !url.password && url.hostname.length <= 200
      ? url.origin : null;
  } catch { return null; }
}

function campaignToken(value: unknown): string | null {
  // Campaign identifiers only. Free text, emails, phone-like strings and URLs are dropped.
  return typeof value === "string" && /^[a-zA-Z0-9_.~-]{1,100}$/.test(value) && !/\d{7,}/.test(value) ? value : null;
}

function sanitizeTouch(value: unknown, now: number): AcquisitionTouch | null {
  if (!record(value)) return null;
  const landingPath = acquisitionPath(value.landingPath);
  const timestamp = typeof value.capturedAt === "string" ? Date.parse(value.capturedAt) : NaN;
  if (!landingPath || !Number.isFinite(timestamp) || timestamp > now + 60_000 || now - timestamp > FIRST_TOUCH_MAX_AGE_MS) return null;
  const utm: AcquisitionTouch["utm"] = {};
  if (record(value.utm)) for (const key of UTM_KEYS) {
    const token = campaignToken(value.utm[key]);
    if (token) utm[key] = token;
  }
  return { capturedAt: new Date(timestamp).toISOString(), landingPath, referrerOrigin: acquisitionReferrer(value.referrerOrigin), utm };
}

/** Revalidate untrusted optional metadata at the API boundary; ignore invalid metadata. */
export function parseAcquisition(value: unknown, now = Date.now()): Acquisition | null {
  try {
    if (typeof value === "string") {
      if (value.length > ACQUISITION_MAX_BYTES) return null;
      value = JSON.parse(value);
    }
    if (!record(value) || value.version !== ACQUISITION_VERSION || (value.consent !== "explicit" && value.consent !== "regional_default")) return null;
    const firstTouch = sanitizeTouch(value.firstTouch, now);
    const sessionTouch = sanitizeTouch(value.sessionTouch, now);
    if (!firstTouch || !sessionTouch || firstTouch.capturedAt > sessionTouch.capturedAt) return null;
    return { version: 1, consent: value.consent, firstTouch, sessionTouch };
  } catch { return null; }
}

export function createAcquisitionTouch(href: string, referrer: string, now = Date.now()): AcquisitionTouch | null {
  try {
    const url = new URL(href);
    const utm: AcquisitionTouch["utm"] = {};
    for (const key of UTM_KEYS) {
      const token = campaignToken(url.searchParams.get(`utm_${key}`));
      if (token) utm[key] = token;
    }
    return sanitizeTouch({ landingPath: url.pathname, capturedAt: new Date(now).toISOString(), referrerOrigin: acquisitionReferrer(referrer, url.origin), utm }, now);
  } catch { return null; }
}

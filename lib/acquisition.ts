/** Acquisition is separate from `source`, which describes the on-site entry. */
export const ACQUISITION_VERSION = 1;
export const FIRST_TOUCH_MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;
export const SESSION_IDLE_MS = 30 * 60 * 1000;
export const ACQUISITION_MAX_BYTES = 6000;
const UTM_KEYS = ["source", "medium", "campaign", "id", "content", "term"] as const;
type UtmKey = typeof UTM_KEYS[number];
// Google Ads click IDs let a qualified inquiry be uploaded back as an offline conversion.
const CLICK_ID_KEYS = ["gclid", "gbraid", "wbraid"] as const;
type ClickIdKey = typeof CLICK_ID_KEYS[number];
export interface AcquisitionTouch {
  capturedAt: string;
  landingPath: string;
  referrerOrigin: string | null;
  utm: Partial<Record<UtmKey, string>>;
  clickIds?: Partial<Record<ClickIdKey, string>>;
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

function clickIdToken(value: unknown): string | null {
  // Opaque ad-click identifiers only; never free text, emails or URLs.
  return typeof value === "string" && /^[a-zA-Z0-9_-]{8,256}$/.test(value) ? value : null;
}

function sanitizeClickIds(value: unknown): AcquisitionTouch["clickIds"] | null {
  if (!record(value)) return null;
  const clickIds: AcquisitionTouch["clickIds"] = {};
  for (const key of CLICK_ID_KEYS) {
    const token = clickIdToken(value[key]);
    if (token) clickIds[key] = token;
  }
  return Object.keys(clickIds).length ? clickIds : null;
}

/** Drop ad-click identifiers when advertising consent is absent or withdrawn. */
export function withoutClickIds(touch: AcquisitionTouch): AcquisitionTouch {
  if (!touch.clickIds) return touch;
  const rest = { ...touch };
  delete rest.clickIds;
  return rest;
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
  const clickIds = sanitizeClickIds(value.clickIds);
  return { capturedAt: new Date(timestamp).toISOString(), landingPath, referrerOrigin: acquisitionReferrer(value.referrerOrigin), utm, ...(clickIds ? { clickIds } : {}) };
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

export function createAcquisitionTouch(href: string, referrer: string, now = Date.now(), includeClickIds = false): AcquisitionTouch | null {
  try {
    const url = new URL(href);
    const utm: AcquisitionTouch["utm"] = {};
    for (const key of UTM_KEYS) {
      const token = campaignToken(url.searchParams.get(`utm_${key}`));
      if (token) utm[key] = token;
    }
    const clickIds = includeClickIds ? Object.fromEntries(CLICK_ID_KEYS.map(key => [key, url.searchParams.get(key)])) : null;
    return sanitizeTouch({ landingPath: url.pathname, capturedAt: new Date(now).toISOString(), referrerOrigin: acquisitionReferrer(referrer, url.origin), utm, clickIds }, now);
  } catch { return null; }
}

export type AcquisitionChannel = "paid_search" | "organic_search" | "ai_assistant" | "campaign" | "referral" | "direct" | "not_recorded";
const SEARCH_HOST = /(^|\.)(google|bing|duckduckgo|yahoo|baidu|yandex|ecosia|startpage|naver)\.[a-z.]+$|(^|\.)search\.brave\.com$/;
const AI_HOST = /(^|\.)(chatgpt\.com|openai\.com|perplexity\.ai|claude\.ai|gemini\.google\.com|copilot\.microsoft\.com|you\.com|phind\.com|deepseek\.com)$/;
const PAID_MEDIUM = /^(cpc|ppc|paid|paidsearch|paid_search|sem|display|paid_social)$/;

/**
 * One reporting channel per inquiry, from the session touch that led to the submission.
 * `not_recorded` covers visitors who declined measurement: it is unknown, not direct.
 */
export function acquisitionChannel(touch: {
  recorded: boolean;
  referrerOrigin?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  hasClickId?: boolean;
}): AcquisitionChannel {
  if (!touch.recorded) return "not_recorded";
  if (touch.hasClickId || PAID_MEDIUM.test((touch.utmMedium ?? "").toLowerCase())) return "paid_search";
  let host = "";
  try { host = touch.referrerOrigin ? new URL(touch.referrerOrigin).hostname.toLowerCase() : ""; } catch { host = ""; }
  // AI hosts first: gemini.google.com would otherwise read as a Google search.
  if (AI_HOST.test(host) || /^(chatgpt|openai|perplexity|claude|gemini|copilot)/.test((touch.utmSource ?? "").toLowerCase())) return "ai_assistant";
  if (touch.utmSource) return "campaign";
  if (SEARCH_HOST.test(host)) return "organic_search";
  return host ? "referral" : "direct";
}

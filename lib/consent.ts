// Google Consent Mode v2 settings, shared by the inline gtag bootstrap in the
// root layout and the cookie banner. The visitor's choice lives in
// localStorage (strictly necessary storage), never in a cookie.

export const CONSENT_STORAGE_KEY = "f1c_consent";
/** Bump to ask every visitor again, e.g. after adding a new tag. */
export const CONSENT_VERSION = 1;
/** Ask again after a year, the upper end of what EU regulators accept. */
export const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;
/** Window events: open the settings panel / a choice was saved. */
export const CONSENT_OPEN_EVENT = "f1c:consent-open";
export const CONSENT_CHANGE_EVENT = "f1c:consent-change";

/** EEA, UK and Switzerland (ISO 3166-1): Google tags start with consent denied here. */
export const CONSENT_REGIONS = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE",
  "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
  "IS", "LI", "NO", "GB", "CH",
] as const;

// The banner only has the browser's time zone to go on. Europe/* plus the EU
// territories and EEA islands outside that prefix. A wrong guess is safe:
// Google tags stay denied in the regions above until the visitor chooses.
const EXTRA_CONSENT_TIMEZONES = new Set([
  "Arctic/Longyearbyen",
  "Asia/Famagusta",
  "Asia/Nicosia",
  "Atlantic/Azores",
  "Atlantic/Canary",
  "Atlantic/Faroe",
  "Atlantic/Madeira",
  "Atlantic/Reykjavik",
  "America/Cayenne",
  "America/Guadeloupe",
  "America/Martinique",
  "Indian/Mayotte",
  "Indian/Reunion",
]);

export type ConsentChoice = { analytics: boolean; ads: boolean };

/** Should the banner ask this visitor? Unknown time zone: ask. */
export function isConsentTimeZone(timeZone: string | undefined): boolean {
  if (!timeZone) return true;
  return timeZone.startsWith("Europe/") || EXTRA_CONSENT_TIMEZONES.has(timeZone);
}

/** Parse the stored choice; null when missing, malformed, outdated or expired. */
export function parseConsent(raw: string | null, now = Date.now()): ConsentChoice | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as { v?: unknown; t?: unknown; analytics?: unknown; ads?: unknown };
    if (value.v !== CONSENT_VERSION || typeof value.t !== "number") return null;
    if (now - value.t > CONSENT_MAX_AGE_MS) return null;
    return { analytics: value.analytics === true, ads: value.ads === true };
  } catch {
    return null;
  }
}

export function serializeConsent(choice: ConsentChoice, now = Date.now()): string {
  return JSON.stringify({ v: CONSENT_VERSION, t: now, analytics: choice.analytics, ads: choice.ads });
}

/** Map a choice onto the four Consent Mode v2 signals. */
export function consentSignals(choice: ConsentChoice) {
  const ads = choice.ads ? "granted" : "denied";
  return {
    analytics_storage: choice.analytics ? "granted" : "denied",
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
  } as const;
}

/**
 * Inline script for <head>. Order matters: consent defaults, then the stored
 * choice, then the tag config. The same parsing rules as parseConsent() are
 * repeated in plain JS because this runs before any bundle loads.
 */
export function consentBootstrapScript(measurementIds: readonly string[]): string {
  const denied = JSON.stringify({
    ...consentSignals({ analytics: false, ads: false }),
    region: CONSENT_REGIONS,
  });
  const granted = JSON.stringify(consentSignals({ analytics: true, ads: true }));
  return `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', ${denied});
gtag('consent', 'default', ${granted});
gtag('set', 'ads_data_redaction', true);
try {
  var c = JSON.parse(localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)}) || 'null');
  if (c && c.v === ${CONSENT_VERSION} && typeof c.t === 'number' && Date.now() - c.t <= ${CONSENT_MAX_AGE_MS}) {
    var a = c.ads === true ? 'granted' : 'denied';
    gtag('consent', 'update', { analytics_storage: c.analytics === true ? 'granted' : 'denied', ad_storage: a, ad_user_data: a, ad_personalization: a });
  }
} catch (e) {}
gtag('js', new Date());
${measurementIds.map((id) => `gtag('config', ${JSON.stringify(id)});`).join("\n")}`;
}

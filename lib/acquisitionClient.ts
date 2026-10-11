"use client";

import { CONSENT_STORAGE_KEY, getVisitConsent, isConsentTimeZone, parseConsent } from "@/lib/consent";
import { createAcquisitionTouch, FIRST_TOUCH_MAX_AGE_MS, parseAcquisition, SESSION_IDLE_MS, type Acquisition } from "@/lib/acquisition";

export const ACQUISITION_FIRST_KEY = "f1c_acquisition_first";
export const ACQUISITION_SESSION_KEY = "f1c_acquisition_session";
let memory: { acquisition: Acquisition; lastSeen: number } | null = null;

function read(key: string, session = false): string | null {
  try { return (session ? window.sessionStorage : window.localStorage).getItem(key); } catch { return null; }
}
function write(key: string, value: unknown, session = false) {
  try {
    const storage = session ? window.sessionStorage : window.localStorage;
    const json = JSON.stringify(value);
    if (storage.getItem(key) !== json) storage.setItem(key, json);
  } catch { /* Memory-only for this page when storage is blocked. */ }
}
export function clearAcquisition(): void {
  memory = null;
  if (typeof window === "undefined") return;
  try { window.localStorage.removeItem(ACQUISITION_FIRST_KEY); } catch { /* Storage blocked. */ }
  try { window.sessionStorage.removeItem(ACQUISITION_SESSION_KEY); } catch { /* Storage blocked. */ }
}

/** Mirrors the site's analytics preference. Unknown time zones default to denied. */
function consentBasis(): Acquisition["consent"] | null {
  const choice = getVisitConsent() ?? parseConsent(read(CONSENT_STORAGE_KEY));
  if (choice) return choice.analytics ? "explicit" : null;
  try { return isConsentTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone) ? null : "regional_default"; }
  catch { return null; }
}

/** Safe to call before a form POST. No identifiers, raw queries or hash data are stored. */
export function getAcquisition(): Acquisition | null {
  if (typeof window === "undefined") return null;
  const consent = consentBasis();
  if (!consent) { clearAcquisition(); return null; }
  const now = Date.now();
  const touch = createAcquisitionTouch(window.location.href, document.referrer, now);
  if (!touch) return null;
  let firstTouch = touch;
  let sessionTouch = touch;
  try {
    const storedFirst = parseAcquisition(read(ACQUISITION_FIRST_KEY), now);
    if (storedFirst) firstTouch = storedFirst.firstTouch;
    const storedSession = JSON.parse(read(ACQUISITION_SESSION_KEY, true) || "null");
    const parsed = parseAcquisition(storedSession?.acquisition, now);
    if (parsed && typeof storedSession.lastSeen === "number" && storedSession.lastSeen <= now && now - storedSession.lastSeen < SESSION_IDLE_MS) sessionTouch = parsed.sessionTouch;
  } catch { /* Corrupt/expired storage starts a fresh permitted touch. */ }
  if (memory && now - Date.parse(memory.acquisition.firstTouch.capturedAt) <= FIRST_TOUCH_MAX_AGE_MS) {
    if (memory.acquisition.firstTouch.capturedAt <= firstTouch.capturedAt) firstTouch = memory.acquisition.firstTouch;
    if (now - memory.lastSeen < SESSION_IDLE_MS) sessionTouch = memory.acquisition.sessionTouch;
  }
  if (sessionTouch.capturedAt < firstTouch.capturedAt) firstTouch = sessionTouch;
  const acquisition: Acquisition = { version: 1, consent, firstTouch, sessionTouch };
  memory = { acquisition, lastSeen: now };
  write(ACQUISITION_FIRST_KEY, { ...acquisition, sessionTouch: firstTouch });
  write(ACQUISITION_SESSION_KEY, memory, true);
  return acquisition;
}

export function appendAcquisition(formData: FormData): void {
  const acquisition = getAcquisition();
  if (acquisition) formData.set("acquisition", JSON.stringify(acquisition));
  else formData.delete("acquisition");
}

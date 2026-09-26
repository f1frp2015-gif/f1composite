"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  CONSENT_CHANGE_EVENT,
  CONSENT_OPEN_EVENT,
  CONSENT_STORAGE_KEY,
  consentSignals,
  isConsentTimeZone,
  parseConsent,
  serializeConsent,
  type ConsentChoice,
} from "@/lib/consent";

type TrackingWindow = Window & { gtag?: (...args: unknown[]) => void };

const NONE: ConsentChoice = { analytics: false, ads: false };
const ALL: ConsentChoice = { analytics: true, ads: true };

function readStored(): string | null {
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
}

function visitorTimeZone(): string | undefined {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return undefined;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** "ask" when this visitor has no valid choice and is probably in Europe. */
function promptSnapshot(): "ask" | "quiet" {
  return parseConsent(readStored()) === null && isConsentTimeZone(visitorTimeZone()) ? "ask" : "quiet";
}

/** Withdrawing consent also removes the Google cookies already set. */
function clearGoogleCookies(choice: ConsentChoice) {
  const host = window.location.hostname;
  const parts = host.split(".");
  const domains = ["", host, `.${parts.slice(-2).join(".")}`];
  for (const entry of document.cookie.split(";")) {
    const name = entry.split("=")[0]?.trim();
    if (!name) continue;
    const analytics = /^(_ga|_gid|_gat)/.test(name);
    const ads = /^_gcl_/.test(name);
    if ((analytics && !choice.analytics) || (ads && !choice.ads)) {
      for (const domain of domains) {
        document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
      }
    }
  }
}

const buttonClass =
  "inline-flex min-h-[42px] items-center justify-center rounded-[7px] bg-teal-text px-[18px] text-f14 font-bold text-white transition-colors hover:bg-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2";

export default function CookieConsent() {
  const prompt = useSyncExternalStore(subscribe, promptSnapshot, () => "quiet");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [draft, setDraft] = useState<ConsentChoice>(NONE);
  // Hides the banner for this visit even when localStorage is unavailable.
  const [answered, setAnswered] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function open() {
      setDraft(parseConsent(readStored()) ?? NONE);
      setCustomizing(true);
      setSettingsOpen(true);
    }
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
  }, []);

  useEffect(() => {
    if (settingsOpen) panelRef.current?.focus();
  }, [settingsOpen]);

  if (!settingsOpen && (prompt === "quiet" || answered)) return null;

  function save(choice: ConsentChoice) {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, serializeConsent(choice));
    } catch {
      /* Storage blocked: the choice still applies to this visit. */
    }
    try {
      (window as TrackingWindow).gtag?.("consent", "update", consentSignals(choice));
    } catch {
      /* Analytics never blocks the page. */
    }
    clearGoogleCookies(choice);
    setAnswered(true);
    setSettingsOpen(false);
    setCustomizing(false);
    window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
  }

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-text"
      tabIndex={-1}
      className="fixed bottom-[13px] left-[13px] right-[13px] z-[70] max-h-[calc(100vh-26px)] overflow-y-auto rounded-[10px] border border-border-default bg-white p-[20px] shadow-2xl outline-none sm:right-auto sm:max-w-[520px]"
    >
      <h2 id="cookie-consent-title" className="text-f16 font-bold text-t1">
        Cookies on this site
      </h2>
      <p id="cookie-consent-text" className="mt-[8px] text-f14 leading-golden text-t2">
        With your permission we use Google Analytics to count visits and Google Ads to see which ads lead to
        enquiries. Both set cookies. Vercel and Ahrefs statistics run without cookies. You can change your choice
        at any time under &ldquo;Cookie settings&rdquo; at the foot of each page.{" "}
        <Link href="/privacy#cookies" className="font-semibold text-teal-text underline underline-offset-4">
          Privacy policy
        </Link>
      </p>

      {customizing && (
        <fieldset className="mt-[14px] space-y-[10px]">
          <legend className="sr-only">Choose which cookies to allow</legend>
          <label className="flex gap-[10px] text-f14 leading-golden text-t2">
            <input
              type="checkbox"
              className="mt-[4px] h-[16px] w-[16px] shrink-0 accent-teal-text"
              checked={draft.analytics}
              onChange={(event) => setDraft({ ...draft, analytics: event.target.checked })}
            />
            <span>
              <span className="font-semibold text-t1">Analytics (Google Analytics).</span> Page views and visit
              counts, so we can see which pages people use.
            </span>
          </label>
          <label className="flex gap-[10px] text-f14 leading-golden text-t2">
            <input
              type="checkbox"
              className="mt-[4px] h-[16px] w-[16px] shrink-0 accent-teal-text"
              checked={draft.ads}
              onChange={(event) => setDraft({ ...draft, ads: event.target.checked })}
            />
            <span>
              <span className="font-semibold text-t1">Advertising (Google Ads).</span> Measures which ads lead to an
              enquiry, and may be used to show our ads to past visitors.
            </span>
          </label>
        </fieldset>
      )}

      <div className="mt-[16px] flex flex-wrap items-center gap-[10px]">
        <button type="button" className={buttonClass} onClick={() => save(NONE)}>
          Reject all
        </button>
        <button type="button" className={buttonClass} onClick={() => save(ALL)}>
          Accept all
        </button>
        {customizing ? (
          <button
            type="button"
            className="min-h-[42px] px-[6px] text-f14 font-semibold text-teal-text underline underline-offset-4"
            onClick={() => save(draft)}
          >
            Save my choices
          </button>
        ) : (
          <button
            type="button"
            className="min-h-[42px] px-[6px] text-f14 font-semibold text-teal-text underline underline-offset-4"
            onClick={() => {
              setDraft(parseConsent(readStored()) ?? NONE);
              setCustomizing(true);
            }}
          >
            Choose
          </button>
        )}
      </div>
    </div>
  );
}

"use client";

import { CONSENT_OPEN_EVENT } from "@/lib/consent";

/** Footer control that reopens the cookie banner with the current choices. */
export default function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}>
      Cookie settings
    </button>
  );
}

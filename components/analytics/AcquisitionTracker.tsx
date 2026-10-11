"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getAcquisition } from "@/lib/acquisitionClient";
import { CONSENT_CHANGE_EVENT, CONSENT_STORAGE_KEY, setVisitConsent } from "@/lib/consent";

export default function AcquisitionTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    getAcquisition();
    let lastActivity = Date.now();
    const update = () => { getAcquisition(); };
    // Keep a working visit alive without storing keys, clicks or user-entered values.
    const activity = () => {
      if (Date.now() - lastActivity < 60_000) return;
      lastActivity = Date.now();
      getAcquisition();
    };
    const storageUpdate = (event: StorageEvent) => {
      if (event.key === CONSENT_STORAGE_KEY || event.key === null) {
        setVisitConsent(null);
        getAcquisition();
      }
    };
    window.addEventListener(CONSENT_CHANGE_EVENT, update);
    window.addEventListener("storage", storageUpdate);
    window.addEventListener("pointerdown", activity, { passive: true });
    window.addEventListener("keydown", activity);
    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, update);
      window.removeEventListener("storage", storageUpdate);
      window.removeEventListener("pointerdown", activity);
      window.removeEventListener("keydown", activity);
    };
  }, [pathname, searchParams]);
  return null;
}

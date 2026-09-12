"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { attributionPath } from "@/lib/rfq";

/** Track destinations only; never send inquiry text, query strings or drawings. */
export default function HomeJourneyAnalytics() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("main a[href]");
      if (!link || link.origin !== window.location.origin) return;
      const targetPath = attributionPath(link.pathname);
      if (!targetPath) return;
      trackEvent("homepage_navigation", { target_path: targetPath });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}

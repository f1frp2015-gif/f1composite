"use client";

import { useEffect } from "react";
import { company } from "@/content/data/company";
import { trackEvent } from "@/lib/analytics";
import { CONTACT_CLICK_EVENTS, contactMethod, whatsappHref, whatsappMessage } from "@/lib/contact";
import { attributionPath } from "@/lib/rfq";

function linkLocation(link: HTMLAnchorElement): string {
  const tagged = link.closest<HTMLElement>("[data-contact-location]")?.dataset.contactLocation;
  if (tagged) return tagged;
  if (link.closest("footer")) return "footer";
  if (link.closest("header, nav")) return "header";
  return "content";
}

/**
 * One listener for every WhatsApp, email and phone link on the site: sends a
 * GA4 event per click and, for WhatsApp buttons that carry a topic, adds the
 * page address to the pre-filled message before the link opens.
 */
export default function ContactClickTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target : null;
      const link = target?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const method = contactMethod(link.getAttribute("href"));
      if (!method) return;
      const pagePath = attributionPath(window.location.pathname);
      if (method === "whatsapp" && link.dataset.whatsappTopic !== undefined) {
        link.href = whatsappHref(whatsappMessage(link.dataset.whatsappTopic || undefined, `${company.url}${pagePath}`));
      }
      trackEvent(CONTACT_CLICK_EVENTS[method], { link_location: linkLocation(link), page_path: pagePath });
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}

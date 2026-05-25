"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

interface DorisWidgetProps {
  /** Page slug for analytics. */
  pageId: string;
}

const WHATSAPP_NUMBER = "8613883333993";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi Doris — I'm on the F1 Composite site and have a project question.",
)}`;

/**
 * Floating bottom-right widget — "Talk to Doris" with WhatsApp QR + 4-hour
 * reply promise. Differentiator for the China-direct B2B export use case
 * where WhatsApp is the highest-converting channel for overseas leads.
 *
 * Renders only after a small scroll to avoid stealing first-impression real
 * estate. Persists open/closed state via localStorage so dismissed users
 * aren't pestered again.
 */
export default function DorisWidget({ pageId }: DorisWidgetProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = localStorage.getItem("doris-widget-dismissed") === "1";
    } catch {
      // ignore localStorage failure (e.g. Safari private mode)
    }
    if (dismissed) return;

    const onScroll = () => {
      if (window.scrollY > 600) {
        setOpen(true);
        window.removeEventListener("scroll", onScroll);
        trackEvent("doris_widget_view", { cta_location: `${pageId}:doris-widget` });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pageId]);

  const handleDismiss = () => {
    setOpen(false);
    try {
      localStorage.setItem("doris-widget-dismissed", "1");
    } catch {
      // ignore
    }
    trackEvent("doris_widget_dismiss", { cta_location: `${pageId}:doris-widget` });
  };

  const handleWhatsapp = () => {
    trackEvent("whatsapp_link_click", {
      cta_location: `${pageId}:doris-widget`,
      destination_url: WHATSAPP_LINK,
      intent_layer: "transact",
      value: 7,
    });
  };

  const handleEmail = () => {
    trackEvent("cta_click", {
      cta_label: "Email Doris",
      cta_location: `${pageId}:doris-widget`,
      destination_url: "mailto:Doris.li@f1composite.com",
      intent_layer: "transact",
    });
  };

  if (!open) return null;

  return (
    <div
      role="complementary"
      aria-label="Talk to Doris — F1 Composite sales director"
      className="fixed bottom-[21px] right-[21px] z-40 hidden w-[320px] rounded-[12px] border border-teal-border bg-white p-[21px] shadow-2xl md:block"
    >
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Close"
        className="absolute right-[13px] top-[13px] text-f13 text-t3 hover:text-t1"
      >
        ×
      </button>
      <div className="flex items-center gap-[13px]">
        <div className="relative h-[56px] w-[56px] overflow-hidden rounded-full bg-bg2">
          {/* Falls back to a coloured circle if the asset is not yet uploaded. */}
          <Image
            src="/brand/doris-li.jpg"
            alt="Doris Li, Sales Director at F1 Composite"
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-f15 font-bold text-t1">Doris Li</p>
          <p className="text-f11 text-t3">Sales Director · F1 Composite</p>
          <p className="mt-[3px] text-f11 font-semibold text-teal-text">Replies within 4 h CST</p>
        </div>
      </div>
      <p className="mt-[13px] text-f13 leading-golden text-t2">
        Live project, tight RFQ deadline, or a tricky spec question? WhatsApp is fastest.
      </p>
      <div className="mt-[13px] flex flex-col gap-[8px]">
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsapp}
          className="block w-full rounded-[8px] bg-teal px-[13px] py-[10px] text-center text-f13 font-bold uppercase tracking-wide text-white hover:bg-teal-text"
        >
          WhatsApp Doris →
        </a>
        <a
          href="mailto:Doris.li@f1composite.com"
          onClick={handleEmail}
          className="block w-full rounded-[8px] border border-border-default px-[13px] py-[10px] text-center text-f13 font-semibold text-t1 hover:border-teal hover:text-teal-text"
        >
          Email Doris
        </a>
      </div>
    </div>
  );
}

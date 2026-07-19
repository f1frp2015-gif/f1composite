"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

interface ExitIntentModalProps {
  /** Page slug for analytics, e.g. "what-is-frp". */
  pageId: string;
  /** Headline shown in the modal. */
  headline: string;
  /** Subtext shown under the headline. */
  body: string;
  /** Primary CTA — typically points to the most relevant lead magnet or AI advisor. */
  primary: { label: string; href: string };
  /** Optional secondary CTA. */
  secondary?: { label: string; href: string };
}

const SUPPRESSION_KEY = "exit-modal-shown";

/**
 * Exit-intent modal that fires once per browser when the cursor leaves the
 * viewport upwards (desktop) or after 30s on mobile. Used to give a leaving
 * visitor one last, low-friction off-ramp before they close the tab.
 */
export default function ExitIntentModal({
  pageId,
  headline,
  body,
  primary,
  secondary,
}: ExitIntentModalProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let shown = false;
    try {
      shown = sessionStorage.getItem(SUPPRESSION_KEY) === "1";
    } catch {
      // ignore
    }
    if (shown) return;

    const trigger = () => {
      setOpen(true);
      try {
        sessionStorage.setItem(SUPPRESSION_KEY, "1");
      } catch {
        // ignore
      }
      trackEvent("exit_modal_view", { cta_location: `${pageId}:exit-modal` });
      window.removeEventListener("mouseout", onMouseOut);
      clearTimeout(mobileTimer);
    };

    const onMouseOut = (e: MouseEvent) => {
      // Cursor crossed above the document — strongest exit-intent signal.
      if (e.clientY <= 0 && !e.relatedTarget) trigger();
    };

    const mobileTimer = window.setTimeout(() => {
      if (window.innerWidth < 768) trigger();
    }, 30_000);

    window.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mouseout", onMouseOut);
      clearTimeout(mobileTimer);
    };
  }, [pageId]);

  if (!open) return null;

  const handleDismiss = () => {
    setOpen(false);
    trackEvent("exit_modal_dismiss", { cta_location: `${pageId}:exit-modal` });
  };

  const handlePrimary = () => {
    trackEvent("exit_modal_submit", {
      cta_label: primary.label,
      cta_location: `${pageId}:exit-modal`,
      destination_url: primary.href,
      intent_layer: "explore",
      value: 4,
    });
  };

  const handleSecondary = () => {
    if (!secondary) return;
    trackEvent("cta_click", {
      cta_label: secondary.label,
      cta_location: `${pageId}:exit-modal`,
      destination_url: secondary.href,
      intent_layer: "info",
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-modal-headline"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-[21px]"
      onClick={handleDismiss}
    >
      <div
        className="relative w-full max-w-[480px] rounded-[12px] bg-white p-[34px] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Close"
          className="absolute right-[13px] top-[13px] text-f19 text-t3 hover:text-t1"
        >
          ×
        </button>
        <p className="text-f11 font-bold uppercase tracking-wide text-teal-text">Before you go</p>
        <h3 id="exit-modal-headline" className="mt-[8px] text-f24 font-bold leading-[1.2] text-t1">
          {headline}
        </h3>
        <p className="mt-[13px] text-f15 leading-golden text-t2">{body}</p>
        <div className="mt-[21px] flex flex-col gap-[8px]">
          <Link
            href={primary.href}
            onClick={handlePrimary}
            className="block w-full rounded-[8px] bg-teal px-[21px] py-[13px] text-center text-f13 font-bold uppercase tracking-wide text-white hover:bg-teal-text"
          >
            {primary.label} →
          </Link>
          {secondary ? (
            <Link
              href={secondary.href}
              onClick={handleSecondary}
              className="block w-full rounded-[8px] border border-border-default px-[21px] py-[13px] text-center text-f13 font-semibold text-t1 hover:border-teal hover:text-teal-text"
            >
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

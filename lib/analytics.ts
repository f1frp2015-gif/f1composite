/**
 * Unified event tracking for GA4 + Microsoft Clarity.
 *
 * - GA4 is loaded via `@next/third-parties/google` and exposes `window.gtag`.
 * - Clarity is loaded inline in `app/layout.tsx` and exposes `window.clarity`.
 *
 * `trackEvent` is safe to call from any client component or DOM handler.
 * On the server (or before scripts load) it is a no-op.
 *
 * Naming convention: snake_case verb_noun. Keep parameter keys stable across
 * events so funnels in GA4 Looker Studio stay coherent.
 */

export type CtaIntentLayer = "info" | "explore" | "transact";

export interface TrackEventParams {
  /** Stable label for the CTA — shown verbatim in GA4 reports. */
  cta_label?: string;
  /** Where on the page the CTA appears, e.g. "hero", "section:limitations". */
  cta_location?: string;
  /** Page section anchor id (matches the `<section id="...">`). */
  page_section?: string;
  /** Funnel layer this CTA represents. */
  intent_layer?: CtaIntentLayer;
  /** Destination href if the event is a navigation. */
  destination_url?: string;
  /** Lead-magnet id, e.g. "pocket-spec-card". */
  magnet_id?: string;
  /** Product slug for product-card actions. */
  product_id?: string;
  /** Resin system slug for resin-row actions. */
  resin_id?: string;
  /** Application slug for application-card actions. */
  application_id?: string;
  /** AI advisor prefill variant id. */
  prefill_variant?: string;
  /** Scroll milestone (25 / 50 / 75 / 100). */
  scroll_depth?: number;
  /** Free-form notes — keep short. */
  note?: string;
  /** Monetary value assigned to the event (used for lead scoring). */
  value?: number;
  /** Allow ad-hoc params without losing type safety on the common ones. */
  [key: string]: string | number | boolean | undefined;
}

interface GtagWindow extends Window {
  gtag?: (
    command: "event" | "config" | "set",
    eventNameOrId: string,
    params?: Record<string, unknown>,
  ) => void;
  clarity?: (
    command: "event" | "identify" | "set" | "consent" | "upgrade",
    ...args: unknown[]
  ) => void;
  dataLayer?: Record<string, unknown>[];
}

/**
 * Fire a single analytics event to both GA4 (via gtag) and Microsoft Clarity.
 * Never throws — fails silently if either tracker is unavailable.
 */
export function trackEvent(eventName: string, params: TrackEventParams = {}): void {
  if (typeof window === "undefined") return;
  const w = window as GtagWindow;

  // GA4
  try {
    if (typeof w.gtag === "function") {
      w.gtag("event", eventName, params);
    } else if (Array.isArray(w.dataLayer)) {
      // Fallback push when gtag wrapper has not initialized yet.
      w.dataLayer.push({ event: eventName, ...params });
    }
  } catch {
    // swallow — analytics must never break UX
  }

  // Microsoft Clarity custom event + tag
  try {
    if (typeof w.clarity === "function") {
      w.clarity("event", eventName);
      // Tag the session with the most useful breadcrumb for filtering recordings.
      if (params.cta_label) {
        w.clarity("set", "last_cta_label", params.cta_label);
      }
      if (params.page_section) {
        w.clarity("set", "last_section", params.page_section);
      }
    }
  } catch {
    // swallow
  }
}

/**
 * Helper for navigation CTAs — fire the event then let the browser follow the
 * link. Use as `onClick={trackCta({ cta_label: "...", ... })}` on an `<a>` /
 * `<Link>` element; never preventDefault.
 */
export function trackCta(params: TrackEventParams) {
  return () => trackEvent("cta_click", params);
}

/**
 * Lead score mapping. Sum across a session in GA4 with a user-scoped custom
 * dimension or in BigQuery Export. Keep this table in sync with
 * `2026-05-25-页内转化修复包/01-埋点方案-Clarity-GA4.md`.
 */
export const EVENT_VALUE: Readonly<Record<string, number>> = {
  scroll_depth_75: 1,
  section_view: 1,
  toc_jump: 1,
  faq_open: 1,
  intent_chip_select: 2,
  lead_magnet_form_open: 3,
  ai_advisor_open: 4,
  vs_table_view: 3,
  calc_compute: 4,
  lead_magnet_email_submit: 5,
  spec_sheet_download: 6,
  product_card_action_specs: 3,
  product_card_action_download: 6,
  product_card_action_sample: 7,
  rfq_add: 5,
  whatsapp_widget_open: 6,
  whatsapp_qr_view: 5,
  whatsapp_link_click: 7,
  form_submit: 10,
  rfq_submit: 10,
};

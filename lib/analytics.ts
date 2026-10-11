"use client";

import { attributionPath, attributionToken } from "@/lib/rfq";
import { WINDOW_SERIES, WINDOW_STAGES } from "@/lib/windowInquiry";
import { CONSENT_STORAGE_KEY, getVisitConsent, isConsentTimeZone, parseConsent } from "@/lib/consent";

type TrackingWindow = Window & { gtag?: (...args: unknown[]) => void };
const sentReceipts = new Set<string>();
const RFQ_ADS_CONVERSION = "AW-18301008520/05-1CMqRwv0cEIj1zJZE";

/** Reuses the unified gtag initialization; previews without gtag stay quiet. */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  try { (window as TrackingWindow).gtag?.("event", name, params); } catch { /* Analytics never blocks a customer action. */ }
}

const PROFILE_CATEGORIES = ["i_beam", "channel", "angle", "shs", "rhs", "tube", "rod", "flat"] as const;
const MACHINING_FEATURES = {
  "Cut length": "cut_length",
  "Hole diameter": "hole_diameter",
  "Distance from datum": "datum_distance",
  "Slot width": "slot_width",
  "Notch depth": "notch_depth",
} as const;
const CORROSIVITY_CLASSES = ["C1", "C2", "C3", "C4", "C5", "CX"] as const;
type ProfileCategory = typeof PROFILE_CATEGORIES[number];
export type ProcurementInteraction =
  | { action: "shortlist_add" | "shortlist_remove"; category: ProfileCategory; count: number }
  | { action: "compare" | "profile_rfq"; count: number; categoryCount: number }
  | { action: "machining_rfq"; feature: string }
  | { action: "lcc_rfq"; steelType: "galvanized" | "other" }
  | { action: "lcc_scenario"; corrosivity: string }
  | { action: "lcc_share"; steelType: "galvanized" | "other"; corrosivity: string };

const PROCUREMENT_PAGES = {
  finder: { source: "profile-finder", path: "/tools/profile-finder", title: "FRP Profile Finder" },
  machining: { source: "machining-tolerance-planner", path: "/technology/frp-profile-machining", title: "FRP Profile Machining" },
  lcc: { source: "life-cycle-cost-calculator", path: "/tools/frp-life-cycle-cost-calculator", title: "FRP Life-Cycle Cost Calculator" },
} as const;

/** Build from scratch: never spread caller data or read the current URL. */
export function procurementEvent(interaction: ProcurementInteraction): { name: string; params: Record<string, string | number> } | null {
  if (!interaction || typeof interaction !== "object") return null;
  const countIn = (value: number, min: number, max = 4) => Number.isInteger(value) && value >= min && value <= max;
  const event = (name: string, page: keyof typeof PROCUREMENT_PAGES, fields: Record<string, string | number>) => {
    const fixed = PROCUREMENT_PAGES[page];
    return { name, params: {
      ...fields, source: fixed.source,
      // GA otherwise attaches the current URL/referrer, including private tool state.
      page_location: `https://www.f1composite.com${fixed.path}`,
      page_title: fixed.title, page_referrer: "",
    } };
  };
  switch (interaction.action) {
    case "shortlist_add":
    case "shortlist_remove": {
      const add = interaction.action === "shortlist_add";
      if (!PROFILE_CATEGORIES.includes(interaction.category) || !countIn(interaction.count, add ? 1 : 0, add ? 4 : 3)) return null;
      return event(add ? "profile_shortlist_add" : "profile_shortlist_remove", "finder", { category: interaction.category, selection_count: interaction.count });
    }
    case "compare":
    case "profile_rfq":
      if (!countIn(interaction.count, interaction.action === "compare" ? 2 : 1) || !countIn(interaction.categoryCount, 1, interaction.count)) return null;
      return event(interaction.action === "compare" ? "profile_compare_open" : "profile_rfq_handoff", "finder", { selection_count: interaction.count, category_count: interaction.categoryCount });
    case "machining_rfq":
      if (typeof interaction.feature !== "string" || !Object.hasOwn(MACHINING_FEATURES, interaction.feature)) return null;
      return event("machining_rfq_handoff", "machining", { feature: MACHINING_FEATURES[interaction.feature as keyof typeof MACHINING_FEATURES] });
    case "lcc_rfq":
      if (interaction.steelType !== "galvanized" && interaction.steelType !== "other") return null;
      // Preserve the existing event name; deliberately remove the old saving amount.
      return event("lcc_quote_click", "lcc", { steel_type: interaction.steelType });
    case "lcc_scenario":
      if (!CORROSIVITY_CLASSES.some(value => value === interaction.corrosivity)) return null;
      return event("lcc_scenario", "lcc", { corrosivity: interaction.corrosivity });
    case "lcc_share":
      if (interaction.steelType !== "galvanized" && interaction.steelType !== "other") return null;
      if (interaction.steelType === "galvanized" && !CORROSIVITY_CLASSES.some(value => value === interaction.corrosivity)) return null;
      return event("lcc_share", "lcc", { steel_type: interaction.steelType, ...(interaction.steelType === "galvanized" ? { corrosivity: interaction.corrosivity } : {}) });
    default:
      return null;
  }
}

/** Same preference/region rule as acquisition; never grants consent or stores data. */
function procurementConsentAllowed(): boolean {
  let choice = getVisitConsent();
  try { choice ??= parseConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY)); } catch { /* Storage may be unavailable. */ }
  if (choice) return choice.analytics;
  try { return !isConsentTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone); }
  catch { return false; }
}

export function trackProcurement(interaction: ProcurementInteraction): void {
  if (typeof window === "undefined" || !procurementConsentAllowed()) return;
  const event = procurementEvent(interaction);
  if (event) trackEvent(event.name, event.params);
}

export function trackInquirySuccess(receiptId: string | null | undefined, source: string, productPath = "", inquiryType = "rfq", windowContext?: { mode?: string; series?: string; stage?: string }) {
  if (!receiptId || sentReceipts.has(receiptId)) return;
  sentReceipts.add(receiptId);
  const params = {
    receipt_id: receiptId,
    source: attributionToken(source),
    product_path: attributionPath(productPath),
    form_path: typeof window === "undefined" ? "" : attributionPath(window.location.pathname),
    inquiry_type: attributionToken(inquiryType),
    ...(windowContext?.mode === "profiles" || windowContext?.mode === "finished" ? {
      window_mode: windowContext.mode,
      ...(WINDOW_SERIES.some(series => series === windowContext.series) ? { window_series: windowContext.series } : {}),
      ...(WINDOW_STAGES.some(stage => stage === windowContext.stage) ? { window_stage: windowContext.stage } : {}),
    } : {}),
  };
  trackEvent("inquiry_submit_success", params);
  if (inquiryType === "rfq") {
    trackEvent("rfq_submit_success", params);
    // The Ads conversion is sent only after /api/contact accepted the RFQ.
    // The receipt ID prevents a re-render or retry from double-counting it.
    trackEvent("conversion", {
      send_to: RFQ_ADS_CONVERSION,
      transaction_id: receiptId,
    });
  }
}

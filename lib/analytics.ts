"use client";

import { attributionPath, attributionToken } from "@/lib/rfq";

type TrackingWindow = Window & { gtag?: (...args: unknown[]) => void };
const sentReceipts = new Set<string>();
const RFQ_ADS_CONVERSION = "AW-18301008520/05-1CMqRwv0cEIj1zJZE";

/** Reuses the unified gtag initialization; previews without gtag stay quiet. */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  try { (window as TrackingWindow).gtag?.("event", name, params); } catch { /* Analytics never blocks a customer action. */ }
}

export function trackInquirySuccess(receiptId: string | null | undefined, source: string, productPath = "", inquiryType = "rfq") {
  if (!receiptId || sentReceipts.has(receiptId)) return;
  sentReceipts.add(receiptId);
  const params = {
    receipt_id: receiptId,
    source: attributionToken(source),
    product_path: attributionPath(productPath),
    form_path: typeof window === "undefined" ? "" : attributionPath(window.location.pathname),
    inquiry_type: attributionToken(inquiryType),
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

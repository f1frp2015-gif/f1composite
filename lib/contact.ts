import { company } from "@/content/data/company";

/** wa.me link to the sales WhatsApp number, optionally with a pre-filled first message. */
export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${company.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** A page title as a product name: "FRP solar profiles — module frames, rails and supports" → "FRP solar profiles". */
function topicName(title: string): string {
  return title.split(/\s+[—–|]\s+|:\s+/)[0].replace(/\s+(manufacturer|supplier)s?$/i, "").trim();
}

/**
 * The first message a buyer sends from a page: the product or topic they were
 * reading and, when known, the page address, so sales can answer without asking.
 */
export function whatsappMessage(topic?: string, pageUrl?: string): string {
  const name = topic ? topicName(topic) : "";
  const intro = name ? `Hello F1 Composite, I'm interested in ${name}.` : "Hello F1 Composite, I have a question.";
  return pageUrl ? `${intro} ${pageUrl}` : intro;
}

export type ContactMethod = "whatsapp" | "email" | "phone";

/** Classify a link for contact-click analytics; null for any other link. */
export function contactMethod(href: string | null | undefined): ContactMethod | null {
  if (!href) return null;
  if (/^https:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//i.test(href)) return "whatsapp";
  if (/^mailto:/i.test(href)) return "email";
  if (/^tel:/i.test(href)) return "phone";
  return null;
}

/** GA4 event names for contact clicks; mark these as key events to import them into Google Ads. */
export const CONTACT_CLICK_EVENTS: Record<ContactMethod, string> = {
  whatsapp: "whatsapp_click",
  email: "email_click",
  phone: "phone_click",
};

import { Resend } from "resend";

/**
 * Single source of truth for who receives inquiry / lead notifications.
 *
 * Every lead-capture path (contact form, AI chat, AI sourcing, lead magnets)
 * MUST notify this list — never hardcode recipients in a route. Override the
 * recipients without a code deploy by setting the Vercel env var
 * INQUIRY_NOTIFY_EMAILS to a comma-separated list.
 */
export const NOTIFY_EMAILS: string[] = (
  process.env.INQUIRY_NOTIFY_EMAILS ??
  "Doris.li@f1composite.com,orion.woo@f1composite.com"
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

/** Verified Resend sender used for all internal inquiry notifications. */
export const INQUIRY_FROM = "F1 Composite Inquiry <inquiry@f1composite.com>";

let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

/** Escape user-supplied text before interpolating into a notification email. */
export function escapeHtml(input: unknown): string {
  return String(input ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Best-effort pull of a reply-to contact out of free-form text (chat/sourcing). */
export function extractContact(text: string): { email?: string; phone?: string } {
  const email = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0];
  // Require a leading "+" so we don't mistake profile dimensions (e.g. 200x100x10)
  // for phone numbers.
  const phone = text.match(/\+\d[\d\s().-]{7,}\d/)?.[0]?.trim();
  return { email, phone };
}

/**
 * Send a single notification to ALL {@link NOTIFY_EMAILS} (one email, both
 * mailboxes receive it simultaneously). Never throws — returns `{ ok, error }`
 * so callers can log the full lead and degrade gracefully when Resend fails.
 */
export async function notifyTeam(opts: {
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<{ ok: boolean; error: unknown }> {
  try {
    const { error } = await getResend().emails.send({
      from: INQUIRY_FROM,
      to: NOTIFY_EMAILS,
      ...(opts.replyTo ? { replyTo: opts.replyTo } : {}),
      subject: opts.subject,
      html: opts.html,
    });
    return { ok: !error, error: error ?? null };
  } catch (e) {
    return { ok: false, error: e };
  }
}

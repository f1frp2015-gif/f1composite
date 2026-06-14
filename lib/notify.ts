/**
 * Single source of truth for inquiry / lead-notification recipients.
 *
 * Notification paths should import this rather than hardcoding addresses.
 * Override the recipients without a code deploy by setting the env var
 * INQUIRY_NOTIFY_EMAILS to a comma-separated list — e.g. point it at the
 * "inquiry@f1composite.com" group once that group is verified in Aliyun.
 */
export const NOTIFY_EMAILS: string[] = (
  process.env.INQUIRY_NOTIFY_EMAILS ??
  "Doris.li@f1composite.com,orion.woo@f1composite.com"
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

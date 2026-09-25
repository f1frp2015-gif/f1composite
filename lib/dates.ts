// Display helpers for ISO dates (YYYY-MM-DD). Formatting in UTC keeps the
// printed day stable whatever time zone the build or the browser runs in.

const toDate = (iso: string) => new Date(`${iso}T00:00:00Z`);

/** "Sep 25, 2026": page and article update lines. */
export const formatShortDate = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" }).format(toDate(iso));

/** "25 September 2026": report issue and validity dates. */
export const formatLongDate = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(toDate(iso));

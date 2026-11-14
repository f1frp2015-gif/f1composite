import { acquisitionChannel, type Acquisition, type AcquisitionTouch } from "./acquisition";

/**
 * Plain-language rendering of the machine fields carried with an inquiry.
 * The database keeps the structured JSON; the notification email shows the
 * same facts as labelled lines a salesperson can read on a phone.
 */

const SITE = "https://www.f1composite.com";

/** On-site entry points, keyed by the `source` token each form or tool sends. */
const SOURCE_LABELS: Record<string, string> = {
  contact: "Contact page form",
  "product-rfq": "Product page quote form",
  "ai-sourcing": "AI sourcing assistant",
  "ai-sourcing-email": "AI sourcing assistant (sent directly)",
  "ai-chat": "AI chat",
  "ai-chat-email": "AI chat (conversation sent directly)",
  calculator: "Profile calculator (beam check)",
  "calculator-equivalence": "Profile calculator (steel equivalence)",
  "price-estimator": "Profile price estimator",
  "price-estimator-email": "Profile price estimator (sent directly)",
  "u-value-calculator": "Window U-value calculator",
  "passive-house-selector": "Passive House window selector",
  "access-geometry-checker": "Access geometry checker",
  "column-calculator": "FRP column calculator",
  "cut-list-optimizer": "Cut list optimizer",
  "gfrp-rebar-calculator": "GFRP rebar calculator",
  "handrail-load-calculator": "Handrail load calculator",
  "life-cycle-cost-calculator": "Life-cycle cost calculator",
  "thermal-expansion-calculator": "Thermal expansion calculator",
  "unit-converter": "FRP unit converter",
  "profile-finder": "Profile finder",
  "span-tables": "Span tables",
  "machining-tolerance-planner": "Machining tolerance planner",
  "grating-selector": "Grating selector",
  "grating-project": "Grating project planner",
  "grating-quote": "Grating quote request",
  "grating-drawing": "Grating drawing request",
  "evidence-library": "Document library",
};

const LABELS: Record<string, string> = {
  product: "Product",
  productPath: "Product page",
  specification: "Specification",
  evidenceId: "Document reference",
  toolResult: "Tool result",
  toolPath: "Tool page",
  calculatorSnapshot: "Calculation",
  calculationId: "Calculation ID",
  calculationInputs: "Inputs",
  window: "Window request",
  raw: "Details",
};

/** Bookkeeping keys the reader does not need; they stay in the database record. */
const HIDDEN_KEYS = new Set(["version", "schemaVersion", "inheritedContext"]);
const MAX_ROWS = 40;
const MAX_VALUE = 600;

function words(key: string): string {
  if (LABELS[key]) return LABELS[key];
  const spaced = key.replace(/[_-]+/g, " ").replace(/([a-z0-9])([A-Z])/g, "$1 $2").trim().toLowerCase();
  return spaced ? spaced[0].toUpperCase() + spaced.slice(1) : key;
}

export function inquirySourceLabel(source: string | null | undefined): string {
  const token = (source ?? "").trim() || "contact";
  if (SOURCE_LABELS[token]) return SOURCE_LABELS[token];
  // Tool pages link to the contact form with a `tool-<name>` token.
  if (token.startsWith("tool-")) return `${words(token.slice(5))} tool page`;
  return words(token.slice(0, 100));
}

function scalar(value: unknown, key: string): string {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") return Number.isFinite(value) ? String(value) : "";
  if (typeof value !== "string") return "";
  const text = value.trim();
  if (!text) return "";
  if (/path$/i.test(key) && /^\/[a-zA-Z0-9/_-]*$/.test(text)) return `${SITE}${text}`;
  return text.length > MAX_VALUE ? `${text.slice(0, MAX_VALUE)}…` : text;
}

function isScalar(value: unknown) {
  return value === null || ["string", "number", "boolean"].includes(typeof value);
}

function walk(value: unknown, key: string, trail: string[], rows: [string, string][], depth: number): void {
  if (value == null || HIDDEN_KEYS.has(key) && isScalar(value)) return;
  const label = [...trail, words(key)].filter(Boolean).join(" › ");
  if (isScalar(value)) {
    const text = scalar(value, key);
    if (text) rows.push([label, text]);
    return;
  }
  if (depth > 6) return;
  // A calculation snapshot holds units, design basis and full results for replay.
  // The email shows its ID and inputs; the message already carries the result summary.
  if (key === "calculatorSnapshot" && !Array.isArray(value)) {
    const snapshot = value as Record<string, unknown>;
    walk(snapshot.calculationId, "calculationId", trail, rows, depth + 1);
    walk(snapshot.inputs, "calculationInputs", trail, rows, depth + 1);
    return;
  }
  if (Array.isArray(value)) {
    if (value.every(isScalar)) {
      const text = value.map(item => scalar(item, key)).filter(Boolean).join(", ");
      if (text) rows.push([label, text.length > MAX_VALUE ? `${text.slice(0, MAX_VALUE)}…` : text]);
      return;
    }
    value.forEach((item, index) => walk(item, `${words(key)} ${index + 1}`, trail, rows, depth + 1));
    return;
  }
  for (const [childKey, child] of Object.entries(value as Record<string, unknown>)) {
    // A hidden wrapper (e.g. a null-safe `inheritedContext` object) is flattened into its parent.
    walk(child, childKey, key && !HIDDEN_KEYS.has(key) ? [...trail, words(key)] : trail, rows, depth + 1);
  }
}

/** Labelled lines for the context a form or tool attached; empty values are dropped. */
export function inquiryContextRows(context: unknown): { rows: [string, string][]; omitted: number } {
  const rows: [string, string][] = [];
  if (isScalar(context)) {
    const text = scalar(context, "");
    if (text) rows.push(["Details", text]);
  } else if (Array.isArray(context)) {
    walk(context, "item", [], rows, 0);
  } else {
    for (const [key, value] of Object.entries(context as Record<string, unknown>)) walk(value, key, [], rows, 0);
  }
  return { rows: rows.slice(0, MAX_ROWS), omitted: Math.max(0, rows.length - MAX_ROWS) };
}

const CHANNEL_LABELS: Record<ReturnType<typeof acquisitionChannel>, string> = {
  paid_search: "Paid ads",
  organic_search: "Organic search",
  ai_assistant: "AI assistant",
  campaign: "Campaign link",
  referral: "Referral from another website",
  direct: "Direct visit (typed address, bookmark or app)",
  not_recorded: "Not recorded",
};

function host(origin: string | null): string {
  if (!origin) return "";
  try { return new URL(origin).hostname.replace(/^www\./, ""); } catch { return ""; }
}

function when(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Shanghai" })} (China time)`;
}

function touchLine(touch: AcquisitionTouch): string {
  const from = [
    host(touch.referrerOrigin) && `from ${host(touch.referrerOrigin)}`,
    touch.utm.source && `tagged source ${touch.utm.source}`,
    touch.utm.medium && `medium ${touch.utm.medium}`,
    touch.utm.campaign && `campaign ${touch.utm.campaign}`,
    touch.utm.term && `keyword ${touch.utm.term}`,
    touch.utm.content && `ad content ${touch.utm.content}`,
    touch.clickIds && Object.keys(touch.clickIds).length ? "Google Ads click recorded" : "",
  ].filter(Boolean);
  return [when(touch.capturedAt), `landed on ${SITE}${touch.landingPath}`, from.length ? from.join(", ") : "no referring site or campaign tag"].filter(Boolean).join(" · ");
}

/** How the visitor reached the site, one fact per line. */
export function inquiryAcquisitionLines(acquisition: Acquisition | null): string[] {
  if (!acquisition) return ["Not recorded (the visitor declined measurement, or the browser blocked it)."];
  const { firstTouch, sessionTouch } = acquisition;
  const channelOf = (touch: AcquisitionTouch) => acquisitionChannel({
    recorded: true,
    referrerOrigin: touch.referrerOrigin,
    utmSource: touch.utm.source,
    utmMedium: touch.utm.medium,
    hasClickId: Boolean(touch.clickIds && Object.keys(touch.clickIds).length),
  });
  const sameVisit = firstTouch.capturedAt === sessionTouch.capturedAt && firstTouch.landingPath === sessionTouch.landingPath;
  const first = channelOf(firstTouch);
  const session = channelOf(sessionTouch);
  const named = (channel: typeof first, touch: AcquisitionTouch) => {
    const name = touch.utm.source || host(touch.referrerOrigin);
    return name && channel !== "direct" ? `${CHANNEL_LABELS[channel]} (${name})` : CHANNEL_LABELS[channel];
  };
  if (sameVisit) return [`Channel: ${named(session, sessionTouch)}`, `Visit: ${touchLine(sessionTouch)}`];
  return [
    `First found us through: ${named(first, firstTouch)}`,
    `First visit: ${touchLine(firstTouch)}`,
    `This visit: ${named(session, sessionTouch)}`,
    `This visit started: ${touchLine(sessionTouch)}`,
  ];
}

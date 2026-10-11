export interface RfqSelection {
  source: string;
  product?: string;
  productPath?: string;
  specification?: string;
  evidenceId?: string;
  message?: string;
  context?: Record<string, unknown>;
}

export const RFQ_CONTEXT_MAX_BYTES = 19_000;
export const RFQ_MESSAGE_MAX_BYTES = 10_000;
/** URLSearchParams percent-encodes at most three characters per UTF-8 byte. */
export const RFQ_FRAGMENT_MAX_LENGTH = 90_000; // excludes the leading #
const utf8Bytes = (value: string) => new TextEncoder().encode(value).byteLength;
export interface RfqFragmentPrefill { context: Record<string, unknown> | null; message: string; error?: string }

export function buildRfqHref(selection: RfqSelection): string {
  const params = new URLSearchParams({ source: selection.source, inquiry_type: "rfq" });
  if (selection.product) params.set("product", selection.product);
  if (selection.productPath) params.set("product_path", selection.productPath);
  if (selection.specification) params.set("specification", selection.specification);
  if (selection.evidenceId) params.set("evidence_id", selection.evidenceId);
  const message = selection.message ?? `Please review ${selection.product ?? "my FRP project"}${selection.specification ? ` (${selection.specification})` : ""}. Please contact me to discuss the details and quotation.`;
  if (utf8Bytes(message) > RFQ_MESSAGE_MAX_BYTES) throw new Error("RFQ message exceeds its UTF-8 size limit");
  // Snapshots belong in the fragment: they are not sent in HTTP requests or referrers.
  if (selection.context) {
    const json = JSON.stringify(selection.context);
    if (utf8Bytes(json) > RFQ_CONTEXT_MAX_BYTES) throw new Error("RFQ context exceeds its UTF-8 size limit");
    const fragment = new URLSearchParams({ context: json, message }).toString();
    // The producer and consumer must agree, including structure and encoded size.
    const parsed = parseRfqFragment(`#${fragment}`);
    if (parsed.error || !parsed.context) throw new Error(parsed.error || "RFQ context is invalid");
    return `/contact?${params.toString()}#${fragment}`;
  }
  params.set("message", message);
  return `/contact?${params.toString()}`;
}

function safeContext(value: unknown, depth = 0): boolean {
  if (depth > 12) return false;
  if (value === null || typeof value === "boolean") return true;
  if (typeof value === "number") return Number.isFinite(value);
  if (typeof value === "string") return true; // aggregate UTF-8 budget is checked before parsing
  if (Array.isArray(value)) return value.length <= 500 && value.every(item => safeContext(item, depth + 1));
  if (typeof value !== "object") return false;
  return Object.entries(value).every(([key, item]) => !["__proto__", "constructor", "prototype"].includes(key) && safeContext(item, depth + 1));
}

/** Treat fragment data as untrusted input, not verified engineering evidence. */
export function parseRfqFragment(hash: string): RfqFragmentPrefill {
  const empty = { context: null, message: "" };
  if (!hash) return empty;
  const fragment = hash.replace(/^#/, "");
  if (fragment.length > RFQ_FRAGMENT_MAX_LENGTH) return { ...empty, error: "The shared RFQ link is too large. Return to the selection and create a shorter request, or enter your requirements below." };
  try {
    const params = new URLSearchParams(fragment);
    if (!params.has("context") && !params.has("message")) return empty;
    const raw = params.get("context");
    const message = params.get("message") ?? "";
    if (!raw || utf8Bytes(raw) > RFQ_CONTEXT_MAX_BYTES || utf8Bytes(message) > RFQ_MESSAGE_MAX_BYTES) {
      return { ...empty, error: "The shared RFQ details are missing or exceed the UTF-8 size limit. Recreate the request or enter your requirements below." };
    }
    const context: unknown = JSON.parse(raw);
    if (!context || typeof context !== "object" || Array.isArray(context) || !safeContext(context)) throw new Error("Invalid context");
    return { context: context as Record<string, unknown>, message };
  } catch { return { ...empty, error: "The shared RFQ details could not be read. Recreate the request or enter your requirements below." }; }
}

export interface RfqFragmentState { fragment: string; formKey: string }

/** Ordinary page anchors must preserve both the loaded payload and the form draft. */
export function applyRfqFragment(state: RfqFragmentState, hash: string): RfqFragmentState {
  const params = new URLSearchParams(hash.replace(/^#/, ""));
  if (!params.has("context") && !params.has("message")) return state;
  const parsed = parseRfqFragment(hash);
  const formKey = parsed.context ? JSON.stringify([parsed.context, parsed.message]) : state.formKey;
  return state.fragment === hash && state.formKey === formKey ? state : { fragment: hash, formKey };
}

/** Only prefill inputs reset a draft; campaign and unrelated query changes do not. */
export function contactPrefillKey(params: Pick<URLSearchParams, "get">): string {
  return JSON.stringify([
    "source", "ref", "company", "country", "inquiry_type", "message", "context", "product", "product_path",
    "specification", "evidence_id", "grating_project", "rebar_stage", "rebar_form", "rebar_draft",
    "window_mode", "window_series", "window_stage", "window_role",
  ].map(key => [key, params.get(key)]));
}

/** Restrict attribution to a path: query strings can contain email or drawings. */
export function attributionPath(value: string | null | undefined): string {
  if (!value) return "";
  try {
    const path = new URL(value, "https://www.f1composite.com").pathname;
    return /^\/[a-zA-Z0-9/_-]*$/.test(path) ? path.slice(0, 180) : "";
  } catch { return ""; }
}

export function attributionToken(value: string | null | undefined): string {
  return value && /^[a-zA-Z0-9_-]{1,100}$/.test(value) ? value : "other";
}

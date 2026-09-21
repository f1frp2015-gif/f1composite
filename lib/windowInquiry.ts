import { attributionPath, attributionToken } from "./rfq";

export const WINDOW_SERIES = ["50", "55", "60", "65", "70", "80", "90-casement", "90-sliding", "140"] as const;
export const WINDOW_STAGES = ["sample", "budget", "quote", "technical"] as const;
export const WINDOW_ROLES = ["fabricator", "oem", "profile-distributor", "finished-distributor", "contractor", "specifier", "architect", "owner", "other", "distributor"] as const;
export const WINDOW_OPTION_LABELS: Record<string, string> = {
  "90-casement": "90 casement", "90-sliding": "90 sliding (CP001–CP005)", "140": "140 compression-seal sliding door (CP006–CP011)",
  "profile-distributor": "Profile distributor", "finished-distributor": "Finished window / door distributor", oem: "OEM manufacturer", specifier: "Specifier / consultant",
  fabricator: "Fabricator", contractor: "Contractor", architect: "Architect", owner: "Building owner", other: "Other", distributor: "Distributor",
  profiles: "Profiles for fabrication", finished: "Finished windows / doors", sample: "Sample evaluation", budget: "Budget estimate", quote: "Formal quotation review", technical: "Technical discussion",
  unknown: "Not sure — please advise", "rough-opening": "Rough opening", "frame-size": "Overall frame size", pieces: "Pieces", metres: "Metres", feet: "Feet", kg: "Kilograms", mm: "Millimetres", inches: "Inches",
  "section-cut": "Cut profile sections", "corner-sample": "Fabricated corner sample", "system-kit": "Profile system / accessory kit", "drawing-review": "Drawing review before sampling",
};
export type WindowMode = "profiles" | "finished";
export type WindowInquiry = { mode: WindowMode } & Record<string, string>;
export const WINDOW_FIELDS: Record<string, { label: string; max: number; values?: readonly string[] }> = {
  series: { label: "System series", max: 30, values: [...WINDOW_SERIES, "unknown"] },
  stage: { label: "Requested next step", max: 20, values: WINDOW_STAGES },
  role: { label: "Buyer role", max: 30, values: WINDOW_ROLES },
  city: { label: "Project city / destination", max: 160 },
  sections: { label: "Profile section list, lengths and quantities", max: 3000 },
  profileUnit: { label: "Profile quantity unit", max: 20, values: ["pieces", "metres", "feet", "kg", "unknown"] },
  fabricationScope: { label: "Fabrication and accessory scope", max: 700 },
  interfaces: { label: "Critical interfaces and tolerances", max: 700 },
  sampleType: { label: "Preferred sample type", max: 30, values: ["section-cut", "corner-sample", "system-kit", "drawing-review", "unknown"] },
  demand: { label: "First order and estimated annual demand", max: 700 },
  performance: { label: "Performance targets and documents needed", max: 1000 },
  schedule: { label: "Window / door schedule (ID, width × height, quantity)", max: 3000 },
  dimensionBasis: { label: "Dimension basis", max: 30, values: ["rough-opening", "frame-size", "unknown"] },
  dimensionUnit: { label: "Dimension unit", max: 20, values: ["mm", "inches", "unknown"] },
  handing: { label: "Opening / handing and viewing side", max: 500 },
  glass: { label: "Glass requirements", max: 700 },
  hardware: { label: "Hardware requirements", max: 500 },
  colors: { label: "Interior / exterior color and finish", max: 500 },
  installation: { label: "Installation / fixing scope", max: 700 },
  delivery: { label: "Delivery timing and shipping scope", max: 700 },
};
const profileOnly = new Set(["sections", "profileUnit", "fabricationScope", "interfaces", "sampleType", "demand"]);
const finishedOnly = new Set(["schedule", "dimensionBasis", "dimensionUnit", "handing", "glass", "hardware", "installation"]);
export function parseWindowInquiry(raw: unknown): WindowInquiry | null {
  if (raw === null || raw === undefined || raw === "") return null;
  if (typeof raw !== "object" || Array.isArray(raw)) throw new Error("Invalid window inquiry.");
  const input = raw as Record<string, unknown>;
  if (input.mode !== "profiles" && input.mode !== "finished") throw new Error("Choose profiles or finished windows / doors.");
  const result: WindowInquiry = { mode: input.mode };
  for (const [key, spec] of Object.entries(WINDOW_FIELDS)) {
    if ((input.mode === "profiles" && finishedOnly.has(key)) || (input.mode === "finished" && profileOnly.has(key))) continue;
    if (input[key] === undefined || input[key] === "") continue;
    if (typeof input[key] !== "string") throw new Error(`Invalid ${spec.label.toLowerCase()}.`);
    const value = input[key].trim();
    if (value.length > spec.max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value) || (spec.values && !spec.values.includes(value))) throw new Error(`Please check ${spec.label.toLowerCase()}.`);
    result[key] = value;
  }
  return result;
}
export function windowInquirySummary(input: WindowInquiry): string {
  // The preview must remain renderable even when pasted input needs server-side
  // correction. POST validates strictly before using this same summary builder.
  const data = input;
  return [data.mode === "profiles" ? "WINDOW RFQ — Profiles for fabrication" : "WINDOW RFQ — Finished windows / doors", ...Object.entries(WINDOW_FIELDS).filter(([key]) => data[key] && !(data.mode === "profiles" ? finishedOnly : profileOnly).has(key)).map(([key, spec]) => `${spec.label}: ${spec.values ? WINDOW_OPTION_LABELS[data[key]] || data[key] : data[key]}`), "Unspecified technical details: to be confirmed during review."].join("\n");
}
export function mergeWindowContext(context: unknown, inquiry: WindowInquiry): Record<string, unknown> {
  return { ...(context && typeof context === "object" && !Array.isArray(context) ? context : { inheritedContext: context }), windowInquiry: inquiry };
}
export function buildWindowRfqHref(selection: { mode: WindowMode; series?: string; stage?: string; role?: string; source?: string; productPath?: string }): string {
  const params = new URLSearchParams({ window_mode: selection.mode, source: attributionToken(selection.source || "window-system"), inquiry_type: "rfq" });
  for (const key of ["series", "stage", "role"] as const) {
    const value = selection[key];
    if (value && WINDOW_FIELDS[key].values?.includes(value)) params.set(`window_${key}`, value);
  }
  const path = attributionPath(selection.productPath) || (selection.mode === "profiles" ? "/products/window-door-profiles" : "/products/fiberglass-windows-doors");
  if (path) params.set("product_path", path);
  return `/contact?${params.toString()}`;
}

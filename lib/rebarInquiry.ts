export const REBAR_DRAFT_KEY = "f1-rebar-inquiry-v1";
export const REBAR_STAGES = { quote: "Project quotation", technical: "Technical review", sample: "Sample evaluation", distributor: "Distributor supply" } as const;
export const REBAR_FORMS = { straight: "Straight GFRP rebar", bends: "Factory-formed stirrups / bends", mesh: "GFRP reinforcement mesh", unsure: "Please advise" } as const;
export type RebarStage = keyof typeof REBAR_STAGES;
export type RebarForm = keyof typeof REBAR_FORMS;
export type RebarLine = { form: RebarForm; mark: string; diameter: string; length: string; lengthUnit: "m" | "mm" | "ft" | "in"; quantity: string; quantityUnit: "pieces" | "metres" | "feet" | "sheets"; details: string };
export type RebarInquiry = { stage: RebarStage; application: string; standard: string; documents: string; delivery: string; lines: RebarLine[] };
export function emptyRebarLine(form: RebarForm = "straight"): RebarLine {
  return { form, mark: "", diameter: "", length: "", lengthUnit: "m", quantity: "", quantityUnit: form === "mesh" ? "sheets" : "pieces", details: "" };
}
export function emptyRebarInquiry(stage: RebarStage = "quote", form?: RebarForm): RebarInquiry {
  return { stage, application: "", standard: "", documents: "", delivery: "", lines: form ? [emptyRebarLine(form)] : [] };
}
function clean(value: unknown, label: string, max: number): string {
  if (value === undefined || value === "") return "";
  if (typeof value !== "string" || value.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)) throw new Error(`Please check ${label}.`);
  return value.trim();
}
function choice<T extends string>(value: unknown, allowed: readonly T[], label: string): T {
  if (typeof value !== "string" || !allowed.includes(value as T)) throw new Error(`Please check ${label}.`);
  return value as T;
}
function positive(value: unknown, label: string): string {
  const result = clean(value, label, 20);
  if (result && (!/^\d+(\.\d+)?$/.test(result) || Number(result) <= 0 || Number(result) > 1e9)) throw new Error(`${label} must be a positive number, or leave it blank.`);
  return result;
}
export function parseRebarInquiry(raw: unknown): RebarInquiry | null {
  if (raw === null || raw === undefined || raw === "") return null;
  if (typeof raw !== "object" || Array.isArray(raw)) throw new Error("Invalid rebar inquiry.");
  const value = raw as Record<string, unknown>;
  const stage = choice(value.stage, Object.keys(REBAR_STAGES) as RebarStage[], "rebar inquiry stage");
  if (!Array.isArray(value.lines) || value.lines.length > 20) throw new Error("Use up to 20 rebar line items, or attach a bar schedule.");
  const lines = value.lines.map((rawLine): RebarLine => {
    if (!rawLine || typeof rawLine !== "object" || Array.isArray(rawLine)) throw new Error("Invalid rebar line item.");
    const line = rawLine as Record<string, unknown>;
    const form = choice(line.form, Object.keys(REBAR_FORMS) as RebarForm[], "supply form");
    const quantityUnit = choice(line.quantityUnit, ["pieces", "metres", "feet", "sheets"], "quantity unit");
    const quantity = positive(line.quantity, "Quantity");
    if (quantity && ["pieces", "sheets"].includes(quantityUnit) && !Number.isInteger(Number(quantity))) throw new Error("Pieces and sheets must be whole numbers.");
    return { form, mark: clean(line.mark, "bar mark", 60), diameter: clean(line.diameter, "diameter / designation", 60), length: form === "straight" ? positive(line.length, "Cut length") : "", lengthUnit: choice(line.lengthUnit, ["m", "mm", "ft", "in"], "length unit"), quantity, quantityUnit, details: clean(line.details, "shape / mesh details", 500) };
  });
  return { stage, application: clean(value.application, "application", 500), standard: clean(value.standard, "project standard", 500), documents: clean(value.documents, "requested documents", 1000), delivery: clean(value.delivery, "delivery requirements", 500), lines };
}
export function rebarInquirySummary(data: RebarInquiry): string {
  const unknown = "To be confirmed";
  return ["FRP REBAR INQUIRY", `Requested next step: ${REBAR_STAGES[data.stage]}`, `Application: ${data.application || unknown}`, `Project standard / edition: ${data.standard || unknown}`, ...data.lines.map((line, index) => [
    `Item ${index + 1}${line.mark ? ` — ${line.mark}` : ""}: ${REBAR_FORMS[line.form]}`,
    `Diameter / designation: ${line.diameter || unknown}`,
    ...(line.form === "straight" ? [`Cut length: ${line.length ? `${line.length} ${line.lengthUnit}` : unknown}`] : []),
    `Quantity: ${line.quantity ? `${line.quantity} ${line.quantityUnit}` : unknown}`,
    `Shape / mesh / surface / drawing details: ${line.details || unknown}`,
  ].join("\n")), `Documents requested: ${data.documents || unknown}`, `Delivery / destination: ${data.delivery || unknown}`, "Product grade, qualification, availability and all unspecified details require quotation review."].join("\n\n");
}
export function buildRebarRfqHref(stage: RebarStage = "quote", form?: RebarForm, draft = false): string {
  const params = new URLSearchParams({ source: "rebar-procurement", inquiry_type: stage === "technical" ? "technical" : "rfq", product: "FRP Rebar — Concrete Reinforcement", product_path: "/products/frp-rebar", rebar_stage: stage });
  if (form) params.set("rebar_form", form);
  if (draft) params.set("rebar_draft", "1");
  return `/contact?${params}`;
}

export interface RfqSelection {
  source: string;
  product?: string;
  productPath?: string;
  specification?: string;
  evidenceId?: string;
  message?: string;
}

export function buildRfqHref(selection: RfqSelection): string {
  const params = new URLSearchParams({ source: selection.source, inquiry_type: "rfq" });
  if (selection.product) params.set("product", selection.product);
  if (selection.productPath) params.set("product_path", selection.productPath);
  if (selection.specification) params.set("specification", selection.specification);
  if (selection.evidenceId) params.set("evidence_id", selection.evidenceId);
  params.set("message", selection.message ?? `Please review ${selection.product ?? "my FRP project"}${selection.specification ? ` (${selection.specification})` : ""}. I will provide the quantity, service environment and delivery requirements below.`);
  return `/contact?${params.toString()}`;
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

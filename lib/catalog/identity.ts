import type { CatalogEvidenceAssessment } from "@/content/data/evidenceApplicability";

/** Website catalog references, not manufacturer SKUs, mold IDs or certificates.
 * Keep assigned IDs and canonical slugs when display names change. New geometry
 * needs a new registry entry; a nearby size never inherits the same identity. */
export const ROUND_TUBE_IDENTITIES = [
  ["f1-rt-001", "chs-25x3", 25, 3],
  ["f1-rt-002", "chs-32x3", 32, 3],
  ["f1-rt-003", "chs-38x3-2", 38, 3.2],
  ["f1-rt-004", "chs-42x4", 42, 4],
  ["f1-rt-005", "chs-50x4", 50, 4],
  ["f1-rt-006", "chs-50x5", 50, 5],
  ["f1-rt-007", "chs-60x5", 60, 5],
  ["f1-rt-008", "chs-63-5x6-4", 63.5, 6.4],
  ["f1-rt-009", "chs-70x5", 70, 5],
  ["f1-rt-010", "chs-76x6-4", 76, 6.4],
  ["f1-rt-011", "chs-80x5", 80, 5],
  ["f1-rt-012", "chs-80x7", 80, 7],
  ["f1-rt-013", "chs-89x6-4", 89, 6.4],
  ["f1-rt-014", "chs-100x6", 100, 6],
  ["f1-rt-015", "chs-114x6-4", 114, 6.4],
  ["f1-rt-016", "chs-127x6-4", 127, 6.4],
  ["f1-rt-017", "chs-150x8", 150, 8],
] as const;

export function modelToSlug(model: string): string {
  return model.toLowerCase().replace(/×/g, "x").replace(/ø/g, "")
    .replace(/[^a-z0-9.]+/g, "-").replace(/\./g, "-").replace(/^-+|-+$/g, "");
}

export function catalogIdentity(model: string, category: string, dims: Record<string, number> | null) {
  const registered = category === "round-tube" && dims
    ? ROUND_TUBE_IDENTITIES.find(([, , od, t]) => dims.OD === od && dims.t === t)
    : undefined;
  const slug = registered?.[1] ?? modelToSlug(model);
  return { sectionId: registered?.[0] ?? null, slug, catalogKey: registered?.[0] ?? `profile:${slug}` };
}

export interface CatalogConfiguration {
  sectionId: string | null;
  catalogKey: string;
  model: string;
  formulationCode: string | null;
  catalogRevision: string;
  dimensionsMm: Record<string, number> | null;
  publishedMassKgPerM: number | null;
  massBasis: string;
  evidence: CatalogEvidenceAssessment;
  supplyStatus: "confirm-with-engineering";
}

export function catalogRfqContext(configurations: CatalogConfiguration[]): Record<string, unknown> {
  return {
    catalogSelections: configurations.map(({ evidence, ...configuration }) => ({
      ...configuration,
      evidenceStatus: evidence.status,
      matchedEvidenceIds: evidence.matchedEvidenceIds,
      referenceEvidenceIds: evidence.referenceEvidenceIds,
    })),
    unknowns: ["cutLength", "quantity", "resinConfirmation", "color", "serviceEnvironment", "deliveryLocation"],
  };
}

export function catalogEvidenceHref(configuration: CatalogConfiguration, categorySlug: string): string {
  const params = new URLSearchParams({ category: categorySlug, profile: configuration.catalogKey, revision: configuration.catalogRevision });
  if (configuration.sectionId) params.set("section", configuration.sectionId);
  if (configuration.formulationCode) params.set("formulation", configuration.formulationCode);
  return `/resources/evidence?${params.toString()}`;
}

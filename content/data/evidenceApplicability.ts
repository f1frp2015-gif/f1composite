import { engineeringEvidence, type EvidenceRecord } from "./engineeringEvidence";
import { reportVerifications } from "./reportVerification";

/** This revision describes applicability notes, never a new laboratory issue date. */
export const applicabilityRevision = "2026-10-11";

export const structuralCategories = ["i-beam", "channel", "angle", "square-tube", "round-tube", "rod", "flat-bar"] as const;

export function catalogEvidenceProductPath(categorySlug: string): string {
  const segments: Record<string, string> = { "i-beam": "frp-i-beam", channel: "frp-channel", angle: "frp-angle", "square-tube": "frp-square-tube", "round-tube": "frp-tube", rod: "frp-rod", "flat-bar": "frp-flat-bar" };
  return segments[categorySlug] ? `/products/fiberglass-structural-shapes/${segments[categorySlug]}` : "/products/fiberglass-structural-shapes";
}

export interface CatalogEvidenceInput {
  /** Internal catalog section identity, not a certification or manufacturer's SKU. */
  sectionId: string | null;
  categorySlug: string;
  formulationCode: string | null;
}

export interface CatalogEvidenceAssessment {
  status: "direct-match" | "reference-only" | "needs-review" | "no-public-evidence";
  summary: string;
  matchedEvidenceIds: string[];
  referenceEvidenceIds: string[];
}

export interface EvidenceTarget extends Partial<CatalogEvidenceInput> {
  productPath?: string;
  windowSeries?: string;
  openingType?: string;
  materialCode?: string;
  thicknessMm?: number;
  coating?: string;
}

export type DocumentApplicability = {
  status: "reference-only" | "needs-review" | "not-applicable" | "expired";
  reason: string;
};

/**
 * A family relationship is not an approved configuration mapping. No published
 * third-party document currently binds a catalog section ID AND formulation
 * code to its specimen. Add a direct match only after a documented technical
 * review, with its version, conditions and expiry; never infer one from a name.
 */
export function assessCatalogEvidence(input: CatalogEvidenceInput): CatalogEvidenceAssessment {
  const structural = structuralCategories.some((category) => category === input.categorySlug);
  if (!structural) return {
    status: "no-public-evidence",
    summary: "No catalog configuration mapping is published for this product family. Request evidence for the proposed product and material.",
    matchedEvidenceIds: [], referenceEvidenceIds: [],
  };
  if (!input.sectionId || !input.formulationCode || input.formulationCode !== "E23-ISO") return {
    status: "needs-review",
    summary: "Confirm the section and material together with engineering. The design manual is a general reference; no public test report is mapped to this exact configuration. Supply and performance require confirmation.",
    matchedEvidenceIds: [], referenceEvidenceIds: ["structural-design"],
  };
  return {
    status: "reference-only",
    summary: "The design manual provides general-purpose E23 laminate and sizing references. No public test report is mapped to this exact section and formulation; this is not configuration certification or confirmed availability.",
    matchedEvidenceIds: [], referenceEvidenceIds: ["structural-design"],
  };
}

export const catalogEvidenceLabels: Record<CatalogEvidenceAssessment["status"], string> = {
  "direct-match": "Configuration evidence available",
  "reference-only": "Technical reference only",
  "needs-review": "Engineering confirmation needed",
  "no-public-evidence": "No public configuration evidence",
};

export interface DocumentScope {
  evidenceId: string;
  productPath: string;
  scopeType: "Tested specimen only" | "Certificate configuration only" | "Technical reference";
  holder: string;
  issued?: string;
  validUntil?: string;
  scope: string;
  /** Explicitly no technical sign-off inferred from publication in the library. */
  catalogBinding: "not-verified";
}

export function documentScope(record: EvidenceRecord): DocumentScope {
  const verification = reportVerifications.find((item) => item.evidenceId === record.id);
  return {
    evidenceId: record.id,
    productPath: record.product,
    scopeType: record.kind === "Technical reference" ? "Technical reference" : record.kind === "Component certificate" ? "Certificate configuration only" : "Tested specimen only",
    holder: verification?.holder ?? "Published by F1 Composite; see the document for its data sources",
    issued: verification?.issued,
    validUntil: verification?.validUntil,
    scope: record.scope,
    catalogBinding: "not-verified",
  };
}

/** Compare known scope boundaries. A plausible match still needs engineering review. */
export function assessDocumentApplicability(evidenceId: string, target: EvidenceTarget, asOf: string): DocumentApplicability {
  const record = engineeringEvidence.find((item) => item.id === evidenceId);
  if (!record) return { status: "not-applicable", reason: "This document is not in the public evidence index." };
  const scope = documentScope(record);
  if (scope.validUntil && /^\d{4}-\d{2}-\d{2}$/.test(asOf) && asOf > scope.validUntil) {
    return { status: "expired", reason: `The published certificate was valid until ${scope.validUntil}. Request the current certificate before specifying it.` };
  }
  const category = target.categorySlug;
  const knownStructural = category && structuralCategories.some((item) => item === category);
  const notApplicable = (reason: string): DocumentApplicability => ({ status: "not-applicable", reason });
  const review = (reason: string): DocumentApplicability => ({ status: "needs-review", reason });

  if (record.id === "structural-design") {
    if (category && !knownStructural) return notApplicable("This manual is a structural-profile sizing reference, not evidence for this product family.");
    return { status: "reference-only", reason: "Use the stated design basis and material assumptions. The manual is not a specimen test, batch certificate or project approval." };
  }
  if (record.id.startsWith("sgs-e40-")) {
    if (category && category !== "square-tube") return notApplicable("The SGS full-section report concerns a square-tube specimen. It does not verify round tubes or other section families.");
    return review("The report's specification and specimen dimensions need reconciliation. Neither size similarity nor an E40 label binds the report to a catalog section or resin.");
  }
  if (["phi-2491wi03", "intertek-turn-tilt", "intertek-sliding", "window-catalog"].includes(record.id)) {
    if (category || (target.productPath && !["/products/frp-window-frames", "/products/window-door-profiles", "/products/fiberglass-windows-doors"].includes(target.productPath))) {
      return notApplicable("This document concerns a window or door configuration, not the selected structural profile.");
    }
    if (record.id === "window-catalog") return { status: "reference-only", reason: "Purchasing reference only. Each proposed window or door needs its own configuration and evidence check." };
    const series = record.id === "phi-2491wi03" ? "90" : record.id === "intertek-turn-tilt" ? "80" : "140";
    if (target.windowSeries && target.windowSeries !== series) return notApplicable(`This document concerns series ${series}, not the selected series.`);
    if (record.id === "intertek-sliding" && target.openingType && target.openingType !== "lift-sliding") {
      return notApplicable("The report tests the historical lift-sliding specimen; it does not establish equivalence to the current compression-seal sliding door.");
    }
    if (record.id === "intertek-turn-tilt" && target.openingType && target.openingType !== "turn-and-tilt") return notApplicable("This report tests the stated turn-and-tilt window specimen.");
    return review("Confirm the named manufacturer/applicant, frame, size, glazing, hardware, climate or test conditions. Matching a series alone does not establish applicability.");
  }
  if (record.id === "sgs-gzmr260702529004") {
    if (category || (target.materialCode && target.materialCode !== "E-TS-AB") || (target.thicknessMm != null && target.thicknessMm !== 10.1)) {
      return notApplicable("The UL 94 result is for E-TS-AB longitudinal sheet specimens at 10.1 mm. It cannot establish V-0 for a different material, tube or thickness.");
    }
    return review("Check the exact E-TS-AB material identity and 10.1 mm test specimen. This result does not replace a profile-specific fire assessment.");
  }
  if (record.id.startsWith("tuv-") || record.id.startsWith("cpvt-")) {
    if (category || (target.productPath && target.productPath !== record.product)) return notApplicable("This report concerns the identified PV frame and material/coating, not the selected structural profile.");
    const coating = record.id === "tuv-cn24kz3a-002" ? "Jotun Jota Solar CL" : record.id === "tuv-cn24kz3a-003" ? "B9986S" : null;
    if (coating && target.coating && target.coating !== coating) return notApplicable(`This coating-change report concerns ${coating}, not the selected coating.`);
    return review("Match the frame, material and coating to the original report. The other coating or a generic resin label does not establish equivalence.");
  }
  if (record.id === "pu-gf-data") {
    if (target.formulationCode && !target.formulationCode.startsWith("PU-")) return notApplicable("The PU-GF material sheet does not establish properties of the selected non-PU formulation.");
    return { status: "reference-only", reason: "Material reference only. Confirm reinforcement, resin, value provenance and applicability to the selected section." };
  }
  if (record.id === "wind-laminate") {
    if (category || (target.productPath && target.productPath !== record.product)) return notApplicable("This laminate data sheet concerns wind-energy panels, not the selected structural section.");
    return { status: "reference-only", reason: "Only the laminate and reinforcement described in the sheet; not approval of another spar-cap or blade design." };
  }
  return review("Engineering must compare the proposed configuration with the original document.");
}

export const documentApplicabilityLabels: Record<DocumentApplicability["status"], string> = {
  "reference-only": "Reference only",
  "needs-review": "Confirm applicability",
  "not-applicable": "Does not establish this configuration",
  expired: "Renewal required",
};

export function parseCatalogEvidenceTarget(params: Record<string, string | string[] | undefined>): CatalogEvidenceInput | null {
  const category = typeof params.category === "string" ? params.category : "";
  if (!structuralCategories.some((item) => item === category)) return null;
  const token = (value: string | string[] | undefined) => typeof value === "string" && /^[a-zA-Z0-9._:-]{1,100}$/.test(value) ? value : null;
  return { categorySlug: category, sectionId: token(params.section), formulationCode: token(params.formulation) };
}

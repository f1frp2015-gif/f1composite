import { engineeringEvidence } from "@/content/data/engineeringEvidence";
import { CAD_SLUGS } from "@/lib/cadManifest";
import { matchesStandardGeometry } from "./drawingGeometry";
import { catalogEvidenceHref, catalogRfqContext, type CatalogConfiguration } from "./identity";
import { configurationFor, type PublishedCatalog, type PublishedProfile } from "./published";

export const firstArticleTemplatePath = "/downloads/frp-first-article-inspection-template.csv";
export const procurementRevision = "profile-procurement-v1";

/** Published references only. A drawing generated from nominal geometry is not
 * an approved manufacturing drawing, and a blank record is not a test result. */
export function profileProcurementPack(profile: PublishedProfile, configuration: CatalogConfiguration = profile.configuration) {
  const pdfParams = new URLSearchParams({ profiles: profile.catalogKey, revision: configuration.catalogRevision });
  if (configuration.formulationCode) pdfParams.set("materials", configuration.formulationCode);
  const alternative = configuration.formulationCode !== profile.configuration.formulationCode;
  if (alternative) pdfParams.set("reference", "1");
  const references = engineeringEvidence.filter((record) => configuration.evidence.referenceEvidenceIds.includes(record.id));
  const hasDrawing = CAD_SLUGS.has(profile.slug) && matchesStandardGeometry(profile.slug, profile.product.geometry);
  return {
    version: procurementRevision,
    configuration,
    evidencePage: catalogEvidenceHref(configuration, profile.category?.slug ?? ""),
    datasheet: {
      html: `/datasheets/${profile.slug}`,
      htmlScope: "Default material dataset; use the selected PDF for an alternative formulation.",
      pdf: `/api/datasheet?${pdfParams}`,
      status: "catalog-reference" as const,
      scope: "Nominal dimensions and reference material data. Not a batch certificate, confirmed stock or project approval.",
    },
    drawing: {
      href: hasDrawing ? `/cad/${profile.slug}.dxf` : null,
      status: hasDrawing ? "nominal-geometry-reference" as const : "not-published" as const,
      approvedDrawingRevision: null,
      scope: "Confirm drawing number, revision, dimensions, tolerances, resin and machining before order release. Catalog revision is not a manufacturing drawing revision.",
    },
    technicalReferences: references.map(({ id, title, reference, file, scope }) => ({ id, title, reference, href: file, scope, status: "reference-only" as const })),
    firstArticle: {
      status: "not-published" as const,
      template: firstArticleTemplatePath,
      scope: "No measured first-article result is published for this selection. The blank template records requirements, methods, measured results and disposition after inspection.",
    },
    requiredForRelease: ["Approved drawing number and revision", "Confirmed section and formulation", "Applicable report and specimen mapping", "Agreed machining and inspection plan", "First-article disposition where required", "Quantity, packing and delivery agreement"],
  };
}

export type ProcurementSelection =
  | { status: "family" }
  | { status: "invalid" | "stale"; message: string }
  | { status: "selected"; profile: PublishedProfile; configuration: CatalogConfiguration; pack: ReturnType<typeof profileProcurementPack> };

/** Resolve against the live catalog. Unknown, mismatched and stale links never
 * quietly become a different configuration. Legacy section links still work. */
export function resolveProcurementSelection(catalog: PublishedCatalog, params: Record<string, string | string[] | undefined>): ProcurementSelection {
  const keys = ["category", "profile", "section", "formulation", "revision"];
  if (keys.some((key) => params[key] !== undefined && (typeof params[key] !== "string" || !(params[key] as string).trim()))) {
    return { status: "invalid", message: "This selection is incomplete or ambiguous. Select a current catalog profile below." };
  }
  const category = typeof params.category === "string" ? params.category : "";
  if (!catalog.categories.some((item) => item.slug === category)) return { status: "invalid", message: "Select a published structural profile family." };
  if (typeof params.revision === "string" && params.revision !== catalog.revision) {
    return { status: "stale", message: "The catalog has changed since this link was created. Select the current profile below and review its dimensions and material again." };
  }
  if (!params.profile && !params.section) return { status: "family" };
  const profile = params.profile
    ? catalog.profiles.find((item) => item.catalogKey === params.profile)
    : catalog.profiles.find((item) => item.sectionId === params.section);
  if (!profile || profile.category?.slug !== category || (params.section && params.section !== profile.sectionId)) {
    return { status: "invalid", message: "This profile is unknown, no longer published or belongs to another family. Select a current profile below." };
  }
  const formulation = params.formulation && params.formulation !== "default" ? catalog.formulations.find((item) => item.code === params.formulation) : profile.formulation;
  if (params.formulation && params.formulation !== "default" && !formulation) return { status: "invalid", message: "This material dataset is unknown. No default has been substituted; select a current profile below." };
  const configuration = configurationFor(profile, formulation ?? null, catalog.revision);
  return { status: "selected", profile, configuration, pack: profileProcurementPack(profile, configuration) };
}

export function procurementRfqContext(pack: ReturnType<typeof profileProcurementPack>) {
  return {
    ...catalogRfqContext([pack.configuration]),
    procurementReview: {
      version: pack.version,
      drawingStatus: pack.drawing.status,
      approvedDrawingRevision: pack.drawing.approvedDrawingRevision,
      firstArticleStatus: pack.firstArticle.status,
      requiredForRelease: pack.requiredForRelease,
    },
  };
}

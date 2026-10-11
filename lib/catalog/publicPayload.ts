import type { PublishedCatalog } from "./published";
import { designation } from "./shapes";
import { profileProcurementPack } from "./procurement";

/** Shared projection: AI consumers and the datasheet picker see the same
 * identities, revision and evidence scope as the published catalog reader. */
export function catalogPublicPayload({ categories, profiles, formulations, revision }: PublishedCatalog) {
  return {
    ok: true,
    revision,
    procurementScope: "References only. Keep the catalog key, formulation and revision together. A nominal DXF is not an approved manufacturing drawing. Confirm specimen mapping and first-article disposition before release.",
    categories: categories.map((c) => ({ id: Number(c.id), slug: c.slug, name: c.name })),
    formulations: formulations.map((f) => ({ id: Number(f.id), code: f.code, name: f.name, resinFamily: f.resin_family, grade: f.en13706_grade })),
    products: profiles.map((profile) => {
      const pack = profileProcurementPack(profile);
      return {
      key: profile.catalogKey,
      id: profile.source === "database" ? Number(profile.product.id) : null,
      model: profile.product.model,
      name: profile.product.name,
      categoryId: profile.category?.id ?? null,
      designation: profile.product.geometry ? designation(profile.product.geometry) : null,
      weightPerM: profile.product.weight_per_m,
      configuration: profile.configuration,
      procurement: {
        version: pack.version,
        reviewUrl: pack.evidencePage,
        htmlDatasheetUrl: pack.datasheet.html,
        selectedPdfUrl: pack.datasheet.pdf,
        nominalDrawingUrl: pack.drawing.href,
        drawingStatus: pack.drawing.status,
        approvedDrawingRevision: pack.drawing.approvedDrawingRevision,
        firstArticleStatus: pack.firstArticle.status,
        blankInspectionTemplateUrl: pack.firstArticle.template,
      },
    };
    }),
  };
}

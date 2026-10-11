import type { PublishedCatalog } from "./published";
import { designation } from "./shapes";

/** Shared projection: AI consumers and the datasheet picker see the same
 * identities, revision and evidence scope as the published catalog reader. */
export function catalogPublicPayload({ categories, profiles, formulations, revision }: PublishedCatalog) {
  return {
    ok: true,
    revision,
    categories: categories.map((c) => ({ id: Number(c.id), slug: c.slug, name: c.name })),
    formulations: formulations.map((f) => ({ id: Number(f.id), code: f.code, name: f.name, resinFamily: f.resin_family, grade: f.en13706_grade })),
    products: profiles.map((profile) => ({
      key: profile.catalogKey,
      id: profile.source === "database" ? Number(profile.product.id) : null,
      model: profile.product.model,
      name: profile.product.name,
      categoryId: profile.category?.id ?? null,
      designation: profile.product.geometry ? designation(profile.product.geometry) : null,
      weightPerM: profile.product.weight_per_m,
      configuration: profile.configuration,
    })),
  };
}

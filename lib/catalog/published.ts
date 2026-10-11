// Server reader for every published catalog surface. Browser components receive
// serializable records, never this module or database access.
import { createHash } from "node:crypto";
import { cache } from "react";
import { listCategories, listFormulations, listProducts } from "./db";
import type { CategoryRow, FormulationRow, ProductRow } from "./db";
import { buildStaticCatalogFallback, SEED_FORMULATIONS } from "./seed";
import { catalogIdentity, type CatalogConfiguration } from "./identity";
import { assessCatalogEvidence } from "@/content/data/evidenceApplicability";

export interface PublishedProfile {
  product: ProductRow;
  category: CategoryRow | null;
  formulation: FormulationRow | null;
  source: "database" | "seed";
  slug: string;
  catalogKey: string;
  sectionId: string | null;
  configuration: CatalogConfiguration;
}

export interface PublishedCatalog {
  revision: string;
  profiles: PublishedProfile[];
  categories: CategoryRow[];
  formulations: FormulationRow[];
}

type CatalogInput = { products: ProductRow[]; formulations: FormulationRow[]; categories: CategoryRow[] };
const finite = (value: unknown): number | null => value == null || !Number.isFinite(Number(value)) ? null : Number(value);

/** Pure merge, also exercised with partial/deactivated database fixtures. Seed
 * numeric IDs are negative transport keys and never resolve legacy DB links. */
export function buildPublishedCatalog(database: CatalogInput = { products: [], formulations: [], categories: [] }): PublishedCatalog {
  const seed = buildStaticCatalogFallback();
  const categories = seed.categories.map((category, index) => ({ id: -(index + 1), ...category } as CategoryRow));
  for (const category of database.categories) {
    const index = categories.findIndex((c) => c.slug === category.slug);
    const normalized = { ...category, id: Number(category.id) };
    if (index < 0) categories.push(normalized); else categories[index] = normalized;
  }
  const formulations: FormulationRow[] = SEED_FORMULATIONS.map((formulation, index) => ({ id: -(index + 1), ...formulation }));
  for (const formulation of database.formulations) {
    const index = formulations.findIndex((f) => f.code === formulation.code);
    const normalized = { ...formulation, id: Number(formulation.id) };
    if (index < 0) formulations.push(normalized); else formulations[index] = normalized;
  }
  const categoryById = new Map(categories.map((category) => [category.id, category]));
  const formulationById = new Map(formulations.map((formulation) => [formulation.id, formulation]));
  const defaultFormulation = formulations.find((formulation) => formulation.code === seed.formulation.code)!;
  const raw: Omit<PublishedProfile, "configuration">[] = [];
  const occupiedKeys = new Set<string>();
  const occupiedModels = new Set(database.products.map((product) => product.model));
  for (const product of database.products) {
    const category = categoryById.get(Number(product.category_id)) ?? null;
    const identity = catalogIdentity(product.model, category?.slug ?? "", product.geometry?.kind === "parametric" ? product.geometry.dims : null);
    occupiedKeys.add(identity.catalogKey);
    if (product.status !== "active") continue;
    raw.push({
      ...identity, source: "database", category,
      formulation: formulationById.get(Number(product.formulation_id)) ?? null,
      product: { ...product, id: Number(product.id), category_id: category?.id ?? null, formulation_id: product.formulation_id == null ? null : Number(product.formulation_id), weight_per_m: finite(product.weight_per_m) },
    });
  }
  seed.products.forEach((product, index) => {
    const identity = catalogIdentity(product.model, product.cat, product.geometry.dims);
    if (occupiedKeys.has(identity.catalogKey) || occupiedModels.has(product.model)) return;
    const category = categories.find((c) => c.slug === product.cat) ?? null;
    raw.push({
      ...identity, source: "seed", category, formulation: defaultFormulation,
      product: { id: -(index + 1), model: product.model, name: null, category_id: category?.id ?? null,
        formulation_id: defaultFormulation.id, geometry: product.geometry as ProductRow["geometry"],
        weight_per_m: product.weight, standards: "EN 13706 Grade E23", applications: null,
        tolerances: null, status: "active", sort: index + 1 },
    });
  });
  raw.sort((a, b) => (a.category?.sort ?? 99) - (b.category?.sort ?? 99) || a.product.sort - b.product.sort || a.catalogKey.localeCompare(b.catalogKey));
  // Source, generated time and database IDs do not define a product revision.
  const revisionData = raw.map(({ product: p, formulation, category, catalogKey }) => ({
    catalogKey, model: p.model, geometry: p.geometry, mass: p.weight_per_m, category: category?.slug,
    formulation: formulation?.code, standards: p.standards, tolerances: p.tolerances,
    evidence: assessCatalogEvidence({ sectionId: catalogIdentity(p.model, category?.slug ?? "", p.geometry?.kind === "parametric" ? p.geometry.dims : null).sectionId, categorySlug: category?.slug ?? "", formulationCode: formulation?.code ?? null }),
  }));
  const materials = formulations.map((formulation) => {
    const { id, ...values } = formulation;
    void id;
    return values;
  }).sort((a, b) => a.code.localeCompare(b.code));
  const revision = `catalog-${createHash("sha256").update(JSON.stringify({ profiles: revisionData, materials })).digest("hex").slice(0, 12)}`;
  const profiles = raw.map((profile): PublishedProfile => ({ ...profile, configuration: configurationFor(profile, profile.formulation, revision) }));
  return { revision, profiles, categories, formulations };
}

export function configurationFor(profile: Omit<PublishedProfile, "configuration">, formulation: FormulationRow | null, revision: string): CatalogConfiguration {
  const isDefault = profile.formulation?.code === formulation?.code;
  return {
    sectionId: profile.sectionId, catalogKey: profile.catalogKey, model: profile.product.model,
    formulationCode: formulation?.code ?? null, catalogRevision: revision,
    dimensionsMm: profile.product.geometry?.kind === "parametric" ? profile.product.geometry.dims : null,
    publishedMassKgPerM: isDefault ? finite(profile.product.weight_per_m) : null,
    massBasis: isDefault ? "Published catalog mass for the default dataset; confirm finished-product mass." : "No published mass for this section and formulation. Calculated mass is a reference only.",
    evidence: assessCatalogEvidence({ sectionId: profile.sectionId, categorySlug: profile.category?.slug ?? "", formulationCode: formulation?.code ?? null }),
    supplyStatus: "confirm-with-engineering",
  };
}

export const getPublishedCatalog = cache(async (): Promise<PublishedCatalog> => {
  try {
    const [products, formulations, categories] = await Promise.all([
      listProducts(), listFormulations(), listCategories(),
    ]);
    return buildPublishedCatalog({ products, formulations, categories });
  } catch {
    return buildPublishedCatalog();
  }
});

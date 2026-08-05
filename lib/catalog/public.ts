// Public catalog readers for product pages and HTML datasheets.
//
// Product pages render DB rows when the catalog is populated and fall back to
// their historical hardcoded arrays otherwise, so `next build` (which
// prerenders with live queries) and the live pages survive an empty or
// unreachable database.

import { listCategories, listFormulations, listProducts } from "./db";
import type { FormulationRow, ProductRow, CategoryRow } from "./db";
import { buildStaticCatalogFallback } from "./seed";

/** Dims + published weight for one product, as product pages consume them. */
export interface CatalogSize {
  id: number;
  model: string;
  dims: Record<string, number>;
  /** F1-published mass per meter (kg/m) — authoritative. */
  weight: number | null;
  slug: string;
}

/** URL slug for a product model: "I 240×120×12" → "i-240x120x12". */
export function modelToSlug(model: string): string {
  return model
    .toLowerCase()
    .replace(/×/g, "x")
    .replace(/ø/g, "")
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/\./g, "-")
    .replace(/^-+|-+$/g, "");
}

/** All active products in one category (by slug), with parametric dims. */
export async function getCategorySizes(categorySlug: string): Promise<CatalogSize[]> {
  try {
    const [categories, products] = await Promise.all([
      listCategories(),
      listProducts({ activeOnly: true }),
    ]);
    const cat = categories.find((c) => c.slug === categorySlug);
    if (!cat) return [];
    return products
      .filter((p) => p.category_id != null && Number(p.category_id) === Number(cat.id))
      .map((p) => ({
        id: Number(p.id),
        model: p.model,
        dims: p.geometry?.kind === "parametric" ? p.geometry.dims : {},
        weight: p.weight_per_m == null ? null : Number(p.weight_per_m),
        slug: modelToSlug(p.model),
      }));
  } catch {
    return [];
  }
}

export interface DatasheetPageData {
  product: ProductRow;
  formulation: FormulationRow | null;
  category: CategoryRow | null;
  slug: string;
  /** Database rows can generate a PDF by BIGSERIAL id; seed rows cannot. */
  source: "database" | "seed";
}

function getSeedDatasheetPages(): DatasheetPageData[] {
  const seed = buildStaticCatalogFallback();
  const categories: CategoryRow[] = seed.categories.map((category, index) => ({
    id: index + 1,
    ...category,
  }));
  const categoryBySlug = new Map(categories.map((category) => [category.slug, category]));
  const formulation: FormulationRow = {
    id: 1,
    ...seed.formulation,
  };

  return seed.products.map((product, index) => {
    const category = categoryBySlug.get(product.cat) ?? null;
    return {
      product: {
        id: index + 1,
        model: product.model,
        name: null,
        category_id: category?.id ?? null,
        formulation_id: formulation.id,
        geometry: product.geometry as ProductRow["geometry"],
        weight_per_m: product.weight,
        standards: "EN 13706 Grade E23",
        applications: null,
        tolerances: null,
        status: "active",
        sort: index + 1,
      },
      formulation,
      category,
      slug: modelToSlug(product.model),
      source: "seed",
    };
  });
}

/**
 * Every active product with its formulation/category, keyed by slug.
 *
 * Database rows win when present. Missing rows are filled from the same static
 * seed used to populate production, so customer-facing datasheet URLs remain
 * valid during an empty, partial, or unavailable catalog database.
 */
export async function getAllDatasheetPages(): Promise<DatasheetPageData[]> {
  const seedPages = getSeedDatasheetPages();

  try {
    const [products, formulations, categories] = await Promise.all([
      listProducts({ activeOnly: true }),
      listFormulations(),
      listCategories(),
    ]);
    const fMap = new Map(formulations.map((f) => [Number(f.id), f]));
    const cMap = new Map(categories.map((c) => [Number(c.id), c]));
    const databasePages: DatasheetPageData[] = products.map((p) => ({
      product: p,
      formulation: p.formulation_id == null ? null : (fMap.get(Number(p.formulation_id)) ?? null),
      category: p.category_id == null ? null : (cMap.get(Number(p.category_id)) ?? null),
      slug: modelToSlug(p.model),
      source: "database",
    }));
    const databaseSlugs = new Set(databasePages.map((page) => page.slug));
    return [...databasePages, ...seedPages.filter((page) => !databaseSlugs.has(page.slug))];
  } catch {
    return seedPages;
  }
}

export async function getDatasheetPage(slug: string): Promise<DatasheetPageData | null> {
  const all = await getAllDatasheetPages();
  return all.find((d) => d.slug === slug) ?? null;
}

// Compatibility facade: all public surfaces use the same published reader.
import { getPublishedCatalog, type PublishedProfile } from "./published";
export { modelToSlug } from "./identity";
export type DatasheetPageData = PublishedProfile;

export async function getCategorySizes(categorySlug: string) {
  const catalog = await getPublishedCatalog();
  return catalog.profiles.filter((profile) => profile.category?.slug === categorySlug).map((profile) => ({
    id: profile.product.id, model: profile.product.model,
    dims: profile.product.geometry?.kind === "parametric" ? profile.product.geometry.dims : {},
    weight: profile.product.weight_per_m, slug: profile.slug,
    configuration: profile.configuration,
  }));
}

export async function getAllDatasheetPages(): Promise<PublishedProfile[]> {
  return (await getPublishedCatalog()).profiles;
}

export async function getDatasheetPage(slug: string): Promise<PublishedProfile | null> {
  return (await getPublishedCatalog()).profiles.find((profile) => profile.slug === slug) ?? null;
}

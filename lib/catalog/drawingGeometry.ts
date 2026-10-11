import { buildProducts } from "./standardProfiles";
import { modelToSlug } from "./identity";
import type { Geometry } from "./shapes";

/** Static drawings and span references describe committed nominal geometry.
 * A database edit must not attach an old drawing merely because its label stayed.
 */
export function matchesStandardGeometry(slug: string, geometry: Geometry | null): boolean {
  if (geometry?.kind !== "parametric") return false;
  const standard = buildProducts().find((product) => modelToSlug(product.model) === slug);
  return Boolean(standard && standard.geometry.shape === geometry.shape &&
    Object.keys(standard.geometry.dims).length === Object.keys(geometry.dims).length &&
    Object.entries(standard.geometry.dims).every(([key, value]) => geometry.dims[key] === value));
}

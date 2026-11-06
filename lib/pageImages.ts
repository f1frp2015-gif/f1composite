import { blogPosts } from "@/content/data/blogPosts";
import { caseStudyContentImages, caseStudyImages } from "@/content/data/caseStudyImages";
import { OWNED_PHOTO_DIR, ownedPhotoPath, ownedPhotos } from "@/content/data/ownedPhotos";
import { finishedWindowSystems } from "@/content/data/finishedWindowSystems";
import {
  applicationCovers,
  caseStudyCovers,
  industryCovers,
  productCovers,
  regionCovers,
  resourceCovers,
  technologyCovers,
  toolCovers,
  type Cover,
} from "@/lib/covers";
import { buildProducts } from "@/lib/catalog/standardProfiles";
import { catalogIdentity } from "@/lib/catalog/identity";
import { INDEXED_DATASHEET_SLUGS } from "@/lib/datasheetContent";
import { sectionDrawingPath } from "@/lib/sectionDrawings";

/**
 * Which images each page claims for the image sitemap (<image:image> entries
 * in app/sitemap.ts).
 *
 * Google Images indexes an image against the page it is found on and links
 * the result to that page. The sitemap tells the crawler which page that is,
 * so a photo that appears on several pages (the plant-floor photo is on seven
 * product pages) is tied to the pages where it carries the content, and an
 * image loaded late or behind a breakpoint is still discovered.
 *
 * Sources, in order: the registered cover of every page (lib/covers.ts: a
 * page's cover is its own lead figure), blog cover and supporting images,
 * the case-study figures, the beam-bridge drawings, the group's own photos
 * where they are placed, and the dimensioned section drawing that leads each
 * indexed datasheet (lib/sectionDrawings.ts). Only static /images paths are listed; generated
 * social cards (/opengraph-image) are text and stay out.
 */

const owned = (file: string) => `${OWNED_PHOTO_DIR}/${file}`;

/**
 * Where the group's own photos sit on static pages whose lead figure is
 * something else. scripts/image-seo.test.mjs checks each page really renders
 * the file. Pages that open on the photo already list it through their cover.
 */
export const ownedPhotoPlacements: Record<string, string[]> = {
  "/about": [owned("f1-composite-pultrusion-production-line-aerial.webp"), owned("f1-composite-pultrusion-hall-krauss-maffei-lines.webp")],
  "/what-is-frp": [owned("f1-composite-pultrusion-plant-floor.webp")],
  "/technology/pultrusion-process": [owned("f1-composite-pultrusion-plant-floor.webp")],
  "/products/pultrusion-carbon-fiber": [owned("f1-composite-pultrusion-hall-krauss-maffei-rows.webp")],
  "/products/frp-facade-panels": [owned("pultruded-frp-sunshade-plate-multilayer-fabric-e40.webp")],
  "/products/fiberglass-sheets": [owned("pultruded-fiberglass-sheet-black-surface.webp"), owned("pultruded-frp-sheet-formed-edge-sample.webp")],
  "/products/frp-pultrusion-manufacturer-factory-direct": [owned("f1-composite-pultrusion-production-line-aerial.webp")],
  "/products/fiberglass-structural-shapes/frp-i-beam": [owned("frp-factory-staircase-structural-view.webp"), owned("f1-composite-pultrusion-plant-floor.webp")],
  "/products/fiberglass-structural-shapes/frp-channel": [owned("f1-composite-pultrusion-plant-floor.webp")],
  "/products/fiberglass-structural-shapes/frp-angle": [owned("f1-composite-pultrusion-plant-floor.webp")],
  "/products/fiberglass-structural-shapes/frp-square-tube": [owned("f1-composite-pultrusion-plant-floor.webp")],
  "/products/fiberglass-structural-shapes/frp-tube": [owned("f1-composite-pultrusion-plant-floor.webp")],
  "/products/fiberglass-structural-shapes/frp-rod": [owned("f1-composite-pultrusion-hall-krauss-maffei-lines.webp"), owned("f1-composite-pultrusion-plant-floor.webp")],
  "/products/fiberglass-structural-shapes/frp-flat-bar": [owned("f1-composite-pultrusion-hall-krauss-maffei-lines.webp"), owned("f1-composite-pultrusion-plant-floor.webp")],
  "/case-studies/beam-bridge": [owned("frp-factory-access-staircase-hero.webp")],
};

/** The drawn figures of the beam-bridge case, which has no cover-driven list. */
export const beamBridgeDrawings = [
  "/images/case-studies/beam-bridge/pedestrian-cycle-beam-bridge-load-path.svg",
  "/images/case-studies/beam-bridge/pedestrian-cycle-bridge-section.svg",
  "/images/case-studies/beam-bridge/footbridge-vibration-serviceability.svg",
  "/images/case-studies/beam-bridge/moggill-road-cycle-bridge-case-study.svg",
  "/images/case-studies/beam-bridge/coronation-drive-frp-cycleway-case-study.svg",
  "/images/case-studies/beam-bridge/sao-silvestre-gfrp-footbridge-case-study.svg",
];

const isStaticImage = (src: string) => src.startsWith("/images/");

function coverSources(): Map<string, string[]> {
  const map = new Map<string, string[]>();
  const groups: Record<string, Cover>[] = [
    productCovers as Record<string, Cover>,
    industryCovers,
    applicationCovers,
    toolCovers as Record<string, Cover>,
    caseStudyCovers as Record<string, Cover>,
    technologyCovers as Record<string, Cover>,
    regionCovers as Record<string, Cover>,
    resourceCovers as Record<string, Cover>,
  ];
  for (const group of groups) {
    for (const [path, cover] of Object.entries(group)) map.set(path, [cover.src]);
  }
  return map;
}

/** Indexed datasheet route → its section drawing (noindex datasheets stay out of the sitemap). */
function datasheetDrawings(): [string, string][] {
  const indexed = new Set(INDEXED_DATASHEET_SLUGS);
  return buildProducts()
    .map((product) => [catalogIdentity(product.model, product.cat, product.geometry.dims).slug, product] as const)
    .filter(([slug]) => indexed.has(slug))
    .map(([slug, product]) => [`/datasheets/${slug}`, sectionDrawingPath(product.model, product.geometry.shape)]);
}

let cache: Map<string, string[]> | undefined;

/** Every route with the static images it claims, deduplicated and in page order. */
export function routeImages(): Map<string, string[]> {
  if (cache) return cache;
  const map = coverSources();
  const add = (path: string, sources: string[]) => {
    const current = map.get(path) ?? [];
    for (const src of sources) if (isStaticImage(src) && !current.includes(src)) current.push(src);
    map.set(path, current);
  };

  for (const post of blogPosts) add(`/resources/blog/${post.slug}`, [post.coverImage, post.supportingImage]);
  for (const [slug, src] of Object.entries(caseStudyImages)) add(`/case-studies/${slug}`, [src]);
  for (const [slug, figures] of Object.entries(caseStudyContentImages)) add(`/case-studies/${slug}`, figures.map((figure) => figure.src));
  add("/case-studies/beam-bridge", beamBridgeDrawings);
  add("/products/fiberglass-windows-doors", [...finishedWindowSystems.map((system) => system.image), "/images/products/finished-windows/pu-profile-section.webp"]);
  for (const [path, sources] of Object.entries(ownedPhotoPlacements)) add(path, sources);
  for (const [path, src] of datasheetDrawings()) add(path, [src]);
  // The photo library renders every owned photo from the same registry.
  add("/about/photos", ownedPhotos.map(ownedPhotoPath));

  cache = map;
  return map;
}

/** The static images a page claims, for its sitemap entry; empty when none is registered. */
export function imagesForRoute(path: string): string[] {
  return routeImages().get(path.split(/[?#]/)[0]) ?? [];
}

// Dimensioned section drawings (lib/sectionDrawings.ts, drawn by
// scripts/covers/draw-section-drawings.mjs) and the owned-photo library page.
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { loadProjectModule } from "./load-project-module.mjs";

const root = resolve(import.meta.dirname, "..");
const read = (file) => readFileSync(resolve(root, file), "utf8");
const { buildProducts } = loadProjectModule("lib/catalog/standardProfiles.ts");
const { catalogIdentity } = loadProjectModule("lib/catalog/identity.ts");
const { INDEXED_DATASHEET_SLUGS } = loadProjectModule("lib/datasheetContent.ts");
const { sectionDrawingPath, sectionDrawingAlt } = loadProjectModule("lib/sectionDrawings.ts");
const { imagesForRoute } = loadProjectModule("lib/pageImages.ts");
const { ownedPhotos, ownedPhotoPath } = loadProjectModule("content/data/ownedPhotos.ts");

test("every catalog size has its drawing file under a unique, descriptive name", () => {
  const names = new Set();
  for (const product of buildProducts()) {
    const path = sectionDrawingPath(product.model, product.geometry.shape);
    assert.match(path, /^\/images\/sections\/fiberglass-[a-z-]+-[0-9x-]+-mm-cross-section\.webp$/, path);
    assert.ok(existsSync(resolve(root, `public${path}`)), `${path} is missing: run node scripts/covers/draw-section-drawings.mjs`);
    assert.ok(!names.has(path), `${path} is used twice`);
    names.add(path);
  }
});

test("each indexed datasheet claims its drawing in the image sitemap", () => {
  const bySlug = new Map(buildProducts().map((p) => [catalogIdentity(p.model, p.cat, p.geometry.dims).slug, p]));
  for (const slug of INDEXED_DATASHEET_SLUGS) {
    const product = bySlug.get(slug);
    assert.ok(product, `${slug} is not a catalog size`);
    assert.deepEqual(imagesForRoute(`/datasheets/${slug}`), [sectionDrawingPath(product.model, product.geometry.shape)]);
  }
});

test("the datasheet renders the drawing file and names it as the page's lead image", () => {
  const page = read("app/datasheets/[slug]/page.tsx");
  assert.match(page, /sectionDrawingPath\(product\.model, shape\)/);
  assert.match(page, /<Image\s+src=\{drawing\}\s+alt=\{drawingAlt\}/);
  assert.match(page, /image: drawing \?\? "\/opengraph-image"/);
  assert.match(sectionDrawingAlt("I 100×50×6", "i_beam"), /^Dimensioned cross-section drawing of a 100 × 50 × 6 mm pultruded fiberglass i-beam$/i);
});

test("the photo library shows every owned photo and is listed in the sitemap", () => {
  assert.deepEqual(imagesForRoute("/about/photos"), ownedPhotos.map(ownedPhotoPath));
  assert.match(read("app/sitemap.ts"), /\$\{BASE\}\/about\/photos/);
  assert.match(read("app/about/photos/page.tsx"), /"@type": "ImageGallery"/);
  assert.match(read("app/about/page.tsx"), /href="\/about\/photos"/);
});

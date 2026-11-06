// Landing pages for the design manual PDF and the DXF library.
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { loadProjectModule } from "./load-project-module.mjs";

const root = resolve(import.meta.dirname, "..");
const read = (file) => readFileSync(resolve(root, file), "utf8");

test("the manual page reads the manual identity and links the published file", () => {
  const { DESIGN_MANUAL } = loadProjectModule("content/data/designManual.ts");
  assert.ok(existsSync(resolve(root, `public${DESIGN_MANUAL.file}`)));
  const page = read("app/resources/frp-profile-design-manual/page.tsx");
  assert.match(page, /"@type": "DigitalDocument"/);
  assert.match(page, /href: DESIGN_MANUAL\.file/);
  assert.match(page, /encodingFormat: "application\/pdf"/);
});

test("every catalog DXF and grating clip DXF is listed in the CAD library and exists", () => {
  const { CAD_SLUGS } = loadProjectModule("lib/cadManifest.ts");
  const { buildProducts } = loadProjectModule("lib/catalog/standardProfiles.ts");
  const { catalogIdentity } = loadProjectModule("lib/catalog/identity.ts");
  const catalog = new Set(buildProducts().map((p) => catalogIdentity(p.model, p.cat, p.geometry.dims).slug));
  for (const slug of CAD_SLUGS) {
    assert.ok(catalog.has(slug), `${slug} has a DXF but is not a catalog size, so the library would drop it`);
    assert.ok(existsSync(resolve(root, `public/cad/${slug}.dxf`)), `${slug}.dxf missing`);
  }
  const page = read("app/resources/cad-library/page.tsx");
  assert.match(page, /\.filter\(\(row\) => CAD_SLUGS\.has\(row\.slug\)\)/);
  assert.match(page, /GRATING_CLIP_DXF_HREF/);
  assert.match(page, /gratingProducts\[family\]\.cad/);
});

test("both pages are in the sitemap, have covers and are linked from the resource pages", () => {
  const sitemap = read("app/sitemap.ts"), covers = read("lib/covers.ts");
  for (const route of ["/resources/frp-profile-design-manual", "/resources/cad-library"]) {
    assert.ok(sitemap.includes(`\${BASE}${route}\``), `${route} not in sitemap`);
    assert.ok(covers.includes(`"${route}"`), `${route} has no cover`);
    assert.ok(read("app/resources/design-guides/page.tsx").includes(`href: "${route}"`), `${route} not linked from design guides`);
    assert.ok(read("app/resources/downloads/page.tsx").includes(`href="${route}"`), `${route} not linked from downloads`);
  }
});

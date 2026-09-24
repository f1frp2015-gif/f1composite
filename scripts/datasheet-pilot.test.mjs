import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { loadProjectModule } from "./load-project-module.mjs";

const ds = loadProjectModule("lib/datasheetContent.ts");
const { buildProducts } = loadProjectModule("lib/catalog/standardProfiles.ts");
const { modelToSlug } = loadProjectModule("lib/catalog/public.ts");
const { CAD_SLUGS } = loadProjectModule("lib/cadManifest.ts");
const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const productsBySlug = new Map(buildProducts().map((product) => [modelToSlug(product.model), product]));

test("the pilot is 24 published sizes, each with a span table and a CAD drawing", () => {
  assert.equal(ds.INDEXED_DATASHEET_SLUGS.length, 24);
  assert.equal(new Set(ds.INDEXED_DATASHEET_SLUGS).size, 24);
  for (const slug of ds.INDEXED_DATASHEET_SLUGS) {
    const product = productsBySlug.get(slug);
    assert.ok(product, `${slug} is not in the catalog`);
    assert.ok(ds.spanRowForModel(product.model), `${slug} has no span-table row`);
    assert.ok(ds.spanLoads(ds.spanRowForModel(product.model)).length > 0, `${slug} has no usable span load`);
    assert.ok(CAD_SLUGS.has(slug), `${slug} has no DXF`);
    assert.ok(ds.isIndexedDatasheet(slug));
  }
  assert.equal(ds.isIndexedDatasheet("l-50x50x5"), false);
});

test("pilot titles and descriptions meet the SEO length limits", () => {
  for (const slug of ds.INDEXED_DATASHEET_SLUGS) {
    const product = productsBySlug.get(slug);
    const title = ds.datasheetSeoTitle(product.model, product.geometry.shape);
    const description = ds.datasheetSeoDescription(product.model, product.geometry.shape, product.weight, true);
    assert.ok(title.length <= 60, `${slug} title is ${title.length} chars`);
    assert.ok(description.length >= 120 && description.length <= 160, `${slug} description is ${description.length} chars`);
    assert.match(title, /mm: Specs, Weight & Span Loads$/);
  }
});

test("size helpers convert units and link only published models", () => {
  assert.equal(ds.dimensionLabel("I 152×76×6.4"), "152×76×6.4");
  assert.equal(ds.approximateInchSize("I 152×76×6.4"), "5.984 × 2.992 × 0.252");
  assert.equal(ds.approximateInchSize("Rod Ø12"), "0.472");
  assert.equal(ds.datasheetHrefForModel("I 152×76×6.4"), "/datasheets/i-152x76x6-4");
  assert.equal(ds.datasheetHrefForModel("I 999×1×1"), null);
  const rhs = ds.relatedSizes("rhs").map((size) => size.model);
  assert.ok(rhs.includes("SHS 50×50×5") && rhs.includes("RHS 120×60×5"), "square and rectangular tubes share one list");
});

test("answers come from the size's own data and the supply terms", () => {
  const product = productsBySlug.get("i-152x76x6-4");
  const row = ds.spanRowForModel(product.model);
  const withCad = ds.datasheetFaq({ model: product.model, shape: "i_beam", weightKgPerM: product.weight, hasCad: true, row });
  assert.match(withCad[0].answer, /2\.9 kg per meter \(about 1\.95 lb\/ft\), so a standard 6 m length weighs about 17\.4 kg/);
  assert.ok(withCad.some((item) => /kN\/m over a simply supported 1 m span/.test(item.answer)));
  assert.ok(withCad.some((item) => /2–4 weeks/.test(item.answer)));
  const withoutCad = ds.datasheetFaq({ model: product.model, shape: "i_beam", weightKgPerM: product.weight, hasCad: false, row });
  assert.ok(!withoutCad.some((item) => /CAD/.test(item.question)));
});

test("only the pilot overrides the datasheet noindex, and the sitemap lists the pilot", () => {
  const page = read("app/datasheets/[slug]/page.tsx");
  assert.match(page, /if \(isIndexedDatasheet\(slug\)\) \{[\s\S]*robots: \{ index: true, follow: true/);
  assert.match(read("app/datasheets/layout.tsx"), /index: false/);
  const sitemap = read("app/sitemap.ts");
  assert.match(sitemap, /INDEXED_DATASHEET_SLUGS\.map\(\(slug\) => \(\{\s*url: `\$\{BASE\}\/datasheets\/\$\{slug\}`/);
  assert.match(sitemap, /\.\.\.datasheetEntries/);
});

test("family size tables and the span tables link sizes to their datasheets", () => {
  for (const family of ["frp-angle", "frp-channel", "frp-flat-bar", "frp-i-beam", "frp-rod"]) {
    assert.match(read(`app/products/fiberglass-structural-shapes/${family}/page.tsx`), /<DatasheetModelLink model=\{s\.model\} \/>/);
  }
  assert.match(read("components/sections/TubeSizeTable.tsx"), /<DatasheetModelLink model=\{size\.model\} \/>/);
  assert.match(read("app/frp-span-tables/page.tsx"), /datasheetHrefs=\{datasheetHrefs\}/);
});

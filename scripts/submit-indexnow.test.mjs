import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { loadProjectModule } from "./load-project-module.mjs";
import {
  affectsDatasheetPages,
  affectsSpecialistGuides,
  changedSlugs,
  indexedDatasheetRoutes,
  isSubmittableRoute,
  normalizeUrls,
  parseIndexedDatasheetSlugs,
  parseSlugBlocks,
  parseSpecialistGuideRoutes,
  routeFromPageFile,
} from "./submit-indexnow.mjs";

test("specialist guides are submitted for content and template changes", () => {
  const source = readFileSync(new URL("../content/data/pultrusionGuideIndex.ts", import.meta.url), "utf8");
  const { pultrusionGuides } = loadProjectModule("content/data/pultrusionGuides.ts");
  const expected = pultrusionGuides.map(page => `/${page.kind === "application" ? "applications" : "products"}/${page.slug}`);
  assert.deepEqual(parseSpecialistGuideRoutes(source), expected);
  assert.deepEqual(parseSpecialistGuideRoutes(""), []);
  for (const file of ["content/data/pultrusionGridGuides.ts", "content/data/pultrusionGuideIndex.ts", "components/sections/PultrusionGuidePage.tsx", "app/products/[slug]/page.tsx"]) assert.ok(affectsSpecialistGuides(file));
  assert.ok(!affectsSpecialistGuides("content/data/navigation.ts"));
});

test("maps static App Router page files to canonical paths", () => {
  assert.equal(routeFromPageFile("app/page.tsx"), "/");
  assert.equal(routeFromPageFile("app/products/frp-gratings/page.tsx"), "/products/frp-gratings");
  assert.equal(routeFromPageFile("app/(marketing)/about/page.tsx"), "/about");
  assert.equal(routeFromPageFile("app/resources/blog/[slug]/page.tsx"), null);
});

test("leaves private and noindex routes out of automatic submissions", () => {
  for (const route of ["/admin", "/api/chat", "/datasheets/i-100x50x6", "/search", "/tools/profile-finder/embed"]) {
    assert.equal(isSubmittableRoute(route), false, route);
  }
  for (const route of ["/", "/tools/profile-finder", "/searchlight", "/resources/downloads"]) {
    assert.equal(isSubmittableRoute(route), true, route);
  }
});

test("extracts stable slug records from content data", () => {
  const source = `export const records = [\n  {\n    slug: "first",\n    title: "First",\n  },\n  {\n    slug: "second",\n    title: "Second",\n  },\n];\n`;
  assert.deepEqual([...parseSlugBlocks(source).keys()], ["first", "second"]);
});

test("normalizes only canonical-host URLs", () => {
  assert.deepEqual(normalizeUrls("/one, https://www.f1composite.com/two#section /one"), [
    "https://www.f1composite.com/one",
    "https://www.f1composite.com/two",
  ]);
  assert.throws(() => normalizeUrls("https://example.com/not-ours"), /must belong/);
});

test("detects added, edited, and removed slug records", () => {
  const before = `export const records = [\n  {\n    slug: "edited",\n    title: "Old",\n  },\n  {\n    slug: "removed",\n    title: "Removed",\n  },\n];\n`;
  const after = `export const records = [\n  {\n    slug: "edited",\n    title: "New",\n  },\n  {\n    slug: "added",\n    title: "Added",\n  },\n];\n`;
  assert.deepEqual([...changedSlugs(before, after)].sort(), ["added", "edited", "removed"]);
});

test("reads the datasheet pilot list the way the site does", () => {
  const source = readFileSync(new URL("../lib/datasheetContent.ts", import.meta.url), "utf8");
  const { INDEXED_DATASHEET_SLUGS } = loadProjectModule("lib/datasheetContent.ts");
  assert.deepEqual([...parseIndexedDatasheetSlugs(source)], [...INDEXED_DATASHEET_SLUGS]);
  assert.equal(parseIndexedDatasheetSlugs("").size, 0);
});

test("submits pilot datasheets, including sizes that left the pilot", () => {
  const list = (...slugs) =>
    `export const INDEXED_DATASHEET_SLUGS: readonly string[] = [\n${slugs.map((slug) => `  "${slug}",\n`).join("")}];\n`;
  assert.deepEqual(indexedDatasheetRoutes(list("i-100x50x6", "chs-50x4"), list("i-100x50x6", "shs-50x50x5")), [
    "/datasheets/chs-50x4",
    "/datasheets/i-100x50x6",
    "/datasheets/shs-50x50x5",
  ]);
  assert.deepEqual(indexedDatasheetRoutes("", list("u-100x50x6")), ["/datasheets/u-100x50x6"]);
});

test("recognizes the files that render datasheet pages", () => {
  for (const file of [
    "app/datasheets/[slug]/page.tsx",
    "app/datasheets/layout.tsx",
    "lib/datasheetContent.ts",
    "lib/spanTables.ts",
    "lib/catalog/standardProfiles.ts",
  ]) {
    assert.ok(affectsDatasheetPages(file), file);
  }
  for (const file of ["app/datasheets/page.tsx", "app/products/frp-gratings/page.tsx", "lib/datasheetHighlights.ts"]) {
    assert.ok(!affectsDatasheetPages(file), file);
  }
});

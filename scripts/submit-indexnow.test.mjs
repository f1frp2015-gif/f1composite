import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { loadProjectModule } from "./load-project-module.mjs";
import {
  affectsDatasheetPages,
  changedBuiltRoutes,
  changedSlugs,
  indexedDatasheetRoutes,
  isBuiltSite,
  isSubmittableRoute,
  normalizePageHtml,
  normalizeUrls,
  parseIndexedDatasheetSlugs,
  parseSlugBlocks,
  routeFromHtmlFile,
  routeFromPageFile,
  sitemapRoutes,
} from "./submit-indexnow.mjs";

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

test("compares pages the way a reader sees them, not build hashes", () => {
  const page = (chunk, alt, schema) =>
    `<html><head><link rel="stylesheet" href="/_next/static/css/${chunk}.css"/><script type="application/ld+json">{"name":"${schema}"}</script></head>` +
    `<body><img alt="${alt}" src="/_next/image?url=%2Fimages%2Fa.webp&w=640&q=75"/><script src="/_next/static/chunks/${chunk}.js" async=""></script>` +
    `<script>self.__next_f.push([1,"${chunk}"])</script></body></html>`;
  assert.equal(normalizePageHtml(page("a1b2", "Grating", "F1")), normalizePageHtml(page("c3d4", "Grating", "F1")));
  assert.notEqual(normalizePageHtml(page("a1b2", "Grating", "F1")), normalizePageHtml(page("a1b2", "Deck panel", "F1")));
  assert.notEqual(normalizePageHtml(page("a1b2", "Grating", "F1")), normalizePageHtml(page("a1b2", "Grating", "F1 Composite")));
});

test("maps prerendered HTML files to routes", () => {
  assert.equal(routeFromHtmlFile("index.html"), "/");
  assert.equal(routeFromHtmlFile("about.html"), "/about");
  assert.equal(routeFromHtmlFile("products/fiberglass-structural-shapes/frp-rod.html"), "/products/fiberglass-structural-shapes/frp-rod");
  assert.equal(routeFromHtmlFile("_not-found.html"), null);
  assert.equal(routeFromHtmlFile("_global-error.html"), null);
});

test("finds changed, added and removed indexable pages between two builds", () => {
  const root = mkdtempSync(join(tmpdir(), "indexnow-"));
  const write = (build, file, content) => {
    const path = join(root, build, file);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, content);
  };
  const sitemap = (...routes) =>
    `<urlset>${routes.map((route) => `<url><loc>https://www.f1composite.com${route === "/" ? "" : route}</loc><image:image><image:loc>https://www.f1composite.com/images/a.webp</image:loc></image:image></url>`).join("")}</urlset>`;
  try {
    // "/" and /about only differ in hashed asset names; /industries/marine lost a label;
    // /old was removed; /new was added; /search changed but is not in either sitemap.
    write("before", "index.html", `<link href="/_next/static/chunks/aaa.js"/>Home`);
    write("after", "index.html", `<link href="/_next/static/chunks/bbb.js"/>Home`);
    write("before", "about.html", "About");
    write("after", "about.html", "About");
    write("before", "industries/marine.html", `<img alt="Marina dock"/><span>AI concept</span>`);
    write("after", "industries/marine.html", `<img alt="Marina dock"/>`);
    write("before", "old.html", "Old");
    write("after", "new.html", "New");
    write("before", "search.html", "Search v1");
    write("after", "search.html", "Search v2");
    write("before", "_not-found.html", "Not found v1");
    write("after", "_not-found.html", "Not found v2");
    write("before", "sitemap.xml.body", sitemap("/", "/about", "/industries/marine", "/old"));
    write("after", "sitemap.xml.body", sitemap("/", "/about", "/industries/marine", "/new"));

    const before = join(root, "before");
    const after = join(root, "after");
    assert.deepEqual([...sitemapRoutes(after)].sort(), ["/", "/about", "/industries/marine", "/new"]);
    assert.ok(isBuiltSite(before) && isBuiltSite(after));
    assert.ok(!isBuiltSite(join(root, "missing")) && !isBuiltSite(""));
    assert.deepEqual(changedBuiltRoutes(before, after), ["/industries/marine", "/new", "/old"]);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

import assert from "node:assert/strict";
import test from "node:test";
import { existsSync } from "node:fs";
import { loadProjectModule } from "./load-project-module.mjs";

const { pultrusionGuides } = loadProjectModule("content/data/pultrusionGuides.ts");
const { pultrusionGuidePath } = loadProjectModule("content/data/pultrusionGuideTypes.ts");
const { specialistProductIndex } = loadProjectModule("content/data/pultrusionGuideIndex.ts");
const { applicationPages } = loadProjectModule("lib/applicationPages.ts");
const { applicationGroups } = loadProjectModule("content/data/productTaxonomy.ts");
const { buildPageMetadata } = loadProjectModule("lib/seo.ts");
const { coverFor } = loadProjectModule("lib/covers.ts");
const sitemap = loadProjectModule("app/sitemap.ts").default;

test("every specialist page has a unique discoverable route and current compact metadata", async () => {
  const routes = pultrusionGuides.map(pultrusionGuidePath);
  assert.equal(new Set(routes).size, routes.length);
  const sitemapUrls = new Set((await sitemap()).map((entry) => new URL(entry.url).pathname));
  for (const page of pultrusionGuides) {
    const route = pultrusionGuidePath(page);
    assert.ok(sitemapUrls.has(route), `${route}: missing sitemap entry`);
    assert.ok(coverFor(route), `${route}: missing directory cover`);
    const indexed = page.kind === "application"
      ? applicationPages.find((item) => item.slug === page.slug)
      : specialistProductIndex.find((item) => item.slug === page.slug);
    assert.equal(indexed?.title, page.title, `${route}: regenerate guides:index`);
    assert.equal(indexed?.description, page.description);
    assert.equal(indexed?.image, page.image);
    if (page.kind === "application") {
      assert.equal(applicationPages.filter((item) => item.slug === page.slug).length, 1);
      assert.ok(applicationGroups.some((item) => item.href === route), `${route}: orphaned application`);
    } else {
      assert.ok(!existsSync(new URL(`../app/products/${page.slug}/page.tsx`, import.meta.url)), `${route}: shadows another product page`);
    }
    assert.doesNotThrow(() => buildPageMetadata({ title: page.title, description: page.description, path: route }));
  }
});

test("standard claims and section references resolve to identified sources", () => {
  for (const page of pultrusionGuides) {
    const sourceIds = new Set(page.sources.map((item) => item.id));
    assert.equal(sourceIds.size, page.sources.length, page.slug);
    const anchors = ["scope", ...page.sections.map((item) => item.id), "standards", "faq", "sources", "quote"];
    assert.equal(new Set(anchors).size, anchors.length, `${page.slug}: conflicting anchors`);
    for (const source of page.sources) {
      assert.equal(new URL(source.url).protocol, "https:");
      assert.ok(source.note.trim(), `${page.slug}: source scope missing`);
    }
    for (const section of [...page.sections, ...page.standards]) {
      assert.ok(section.sourceIds.length > 0, `${page.slug}: uncited section`);
      for (const id of section.sourceIds) assert.ok(sourceIds.has(id), `${page.slug}: unresolved source ${id}`);
    }
    for (const standard of page.standards) {
      assert.ok(standard.jurisdiction && standard.applies && standard.limits);
      assert.ok(standard.sourceIds.some((id) => page.sources.find((item) => item.id === id)?.kind === "authority"), `${page.slug}: ${standard.name} lacks authority evidence`);
    }
    for (const section of page.sections) if (section.table) {
      for (const row of section.table.rows) assert.equal(row.length, section.table.columns.length, `${page.slug}: malformed table`);
    }
  }
});

test("application and component pages link to real routes and real artwork", () => {
  const dynamic = new Set(pultrusionGuides.map(pultrusionGuidePath));
  for (const page of applicationPages) dynamic.add(`/applications/${page.slug}`);
  for (const page of pultrusionGuides) {
    assert.ok(existsSync(new URL(`../public${page.image}`, import.meta.url)), page.image);
    assert.ok(page.related.some((link) => link.href.startsWith(page.kind === "application" ? "/products/" : "/applications/")), `${page.slug}: missing counterpart`);
    for (const link of page.related) {
      const path = link.href.split(/[?#]/)[0];
      assert.ok(dynamic.has(path) || existsSync(new URL(`../app${path}/page.tsx`, import.meta.url)), `${page.slug}: missing route ${path}`);
    }
  }
});


test("application and product navigation categories cover their directories exactly once", () => {
  const { applicationNavigation, specialistProductCategories } = loadProjectModule("content/data/applicationNavigation.ts");
  const appRoutes = applicationNavigation.flatMap(category => category.links.map(link => link.href));
  assert.equal(new Set(appRoutes).size, appRoutes.length);
  assert.deepEqual([...appRoutes].sort(), applicationGroups.map(group => group.href).sort());
  const productSlugs = specialistProductCategories.flatMap(category => category.slugs);
  assert.equal(new Set(productSlugs).size, productSlugs.length);
  assert.deepEqual([...productSlugs].sort(), specialistProductIndex.map(page => page.slug).sort());
});

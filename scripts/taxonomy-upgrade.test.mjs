import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { loadTestData } from "./load-test-data.mjs";
const { productFamilies, standardProfileLinks, applicationGroups } = await loadTestData("content/data/productTaxonomy.ts");
const { windowProcurement } = await loadTestData("content/data/windowProcurement.ts");
const { seoQueryTargets } = await loadTestData("content/data/seoQueryTargets.ts");
const { buildRfqHref } = await loadTestData("lib/rfq.ts");

test("one commercial family owns each buying route", () => {
  assert.deepEqual(productFamilies.map(family => family.id), ["standard", "custom", "windows", "grating"]);
  assert.equal(new Set(productFamilies.map(family => family.href)).size, 4);
  assert.equal(standardProfileLinks.length, 7);
  for (const group of applicationGroups) for (const familyId of group.products) {
    assert.ok(productFamilies.some(family => family.id === familyId), `${group.label}: unknown family ${familyId}`);
  }
});

test("long-tail products remain linked after leaving the primary product menu", () => {
  const routes = new Set(applicationGroups.flatMap(group => group.links.map(link => link.href)));
  for (const route of ["frp-rebar", "fiberglass-snow-markers", "fiberglass-stakes", "frp-ladders", "frp-handrail-systems", "frp-sound-barrier-wall", "wind-turbine-blade-panels", "frp-solar-mounting-systems", "frp-facade-panels"]) {
    assert.ok(routes.has(`/products/${route}`), `orphaned commercial entry: ${route}`);
  }
});

test("window purchase routes preserve distinct requirements into the RFQ", () => {
  const routes = Object.values(windowProcurement);
  assert.notEqual(routes[0].path, routes[1].path);
  assert.notEqual(routes[0].message, routes[1].message);
  assert.match(routes[0].message, /Sections and cut lengths/);
  assert.match(routes[1].message, /Glass and hardware/);
  for (const page of routes) {
    const url = new URL(buildRfqHref({ source: "window-procurement", product: page.h1, productPath: page.path, message: page.message }), "https://www.f1composite.com");
    assert.equal(url.pathname, "/contact");
    assert.equal(url.searchParams.get("inquiry_type"), "rfq");
    assert.equal(url.searchParams.get("product_path"), page.path);
    assert.equal(url.searchParams.get("message"), page.message);
  }
});

test("new indexable routes have real pages, unique intent and sitemap entries", async () => {
  const sitemap = await readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8");
  const routes = ["/products/window-door-profiles", "/products/fiberglass-windows-doors", "/products/grating", "/industries/water-wastewater"];
  const queries = [];
  for (const route of routes) {
    await access(new URL(`../app${route}/page.tsx`, import.meta.url));
    assert.ok(sitemap.includes(`\${BASE}${route}`));
    const target = seoQueryTargets.find(target => target.targetUrl === route);
    assert.ok(target, `missing query owner: ${route}`);
    assert.ok(target.title.length <= 60);
    assert.ok(target.description.length >= 120 && target.description.length <= 160);
    queries.push(target.primaryQuery);
  }
  assert.equal(new Set(queries).size, routes.length);
});

test("product and application images resolve to local assets", async () => {
  for (const page of [...productFamilies, ...Object.values(windowProcurement)]) {
    await access(new URL(`../public${page.image}`, import.meta.url));
  }
});

import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import { loadProjectModule } from "./load-project-module.mjs";

// Guards for the basalt FRP rebar page and its product manual (2026-11-01): every open-licensed
// photograph is credited, every figure exists, the values stay labelled as published classes, no
// unit price or approval is claimed, and the manual is registered, present and linked.

const { basaltCatalog, basaltScenePhotos } = loadProjectModule("content/data/basaltRebar.ts");
const { basaltRebarManual, fallbackDownloads } = loadProjectModule("content/data/downloads.ts");
const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const onDisk = (path) => existsSync(new URL(`../public${path}`, import.meta.url));
const PAGE = "app/products/basalt-frp-rebar/page.tsx";

test("every basalt scene photo exists, is described and carries its license", () => {
  assert.ok(Object.keys(basaltScenePhotos).length >= 5);
  for (const [id, photo] of Object.entries(basaltScenePhotos)) {
    assert.ok(onDisk(photo.src), photo.src);
    assert.ok(photo.alt.length > 30 && photo.shows.length > 20, id);
    assert.match(photo.credit.sourceHref, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/, id);
    assert.ok(photo.credit.author && photo.credit.license, id);
    if (!/public domain/i.test(photo.credit.license)) assert.match(photo.credit.licenseHref ?? "", /^https:\/\/creativecommons\.org\//, `${id} needs a license link`);
    assert.doesNotMatch(photo.shows, /F1 (part|product|project|installation)(?! or project)|FengDu/, id);
  }
  for (const src of Object.values(basaltCatalog.images)) assert.ok(onDisk(src), src);
});

test("the page is picture-led, credited and dated", () => {
  const page = read(PAGE);
  assert.ok(page.includes('id="photo-credits"') && page.includes("creditedPhotos.map"), "credits block");
  assert.ok(page.includes("catalog.properties.map") && page.includes("catalog.substitution.map") && page.includes("catalog.published.map"), "tables");
  for (const figure of ["rockToBar", "stressStrain", "sizeLadder"]) assert.ok(page.includes(`catalog.images.${figure}`), figure);
  assert.ok(page.includes("dateModified: catalog.revision") && page.includes("updated={catalog.revision}"), "dates");
  assert.ok(page.includes('href="/products/frp-rebar"') && page.includes("/resources/blog/basalt-rebar-vs-fiberglass-rebar"), "family links");
  assert.doesNotMatch(page, /Illustrative photo/, "open-licensed photos are not stock photos");
  assert.doesNotMatch(page, /HSLG|Hesheng|hslg-tech/i, "the manufacturer is not named until the owner confirms");
});

test("values stay published classes; no unit price, approval or stock claim", () => {
  const text = `${read(PAGE)} ${read("content/data/basaltRebar.ts")}`;
  assert.match(text, /qualification report/i);
  assert.match(text, /published (typical )?values/i);
  // Ranges with one decimal and an observation date are allowed (owner rule 2026-10-23); a quoted unit price is not.
  assert.doesNotMatch(text, /\$\s?\d+\.\d{2}\s*(per|\/)|\$\s?\d[\d,]*\s*(per|\/)\s*(kg|t\b|ton|tonne)|USD\s?\d/i, "a specific unit price");
  assert.doesNotMatch(text, /(?<!no |not |hold no |claim an? |claims an? )(ICC-ES listed|ESR-\d|DOT approved|CE marked|ETA-\d)/i, "an approval claim");
  assert.doesNotMatch(text, /in stock|ex stock|ready stock/i, "a stock claim");
  assert.doesNotMatch(text, /ACI (CODE-)?440\.11[^.]{0,80}(covers|includes|accepts) basalt/i, "ACI 440.11 covers glass bars only");
});

test("the manual is registered, on disk, linked from the page and classified under the product", () => {
  assert.equal(basaltRebarManual.file, "/downloads/f1composite-basalt-frp-rebar-manual-2026-11.pdf");
  assert.ok(fallbackDownloads.includes(basaltRebarManual), "listed on the downloads page");
  const file = new URL(`../public${basaltRebarManual.file}`, import.meta.url);
  assert.ok(existsSync(file), "manual PDF missing: run python3 scripts/build-basalt-rebar-manual.py");
  const size = statSync(file).size;
  assert.ok(size > 100_000 && size < 3_000_000, `manual size ${size}`);
  assert.ok(read(PAGE).includes("basaltRebarManual.file"), "page links the manual");
  const { classifyDocument } = loadProjectModule("lib/documents.ts");
  assert.equal(classifyDocument(basaltRebarManual).productHref, "/products/basalt-frp-rebar");
});

test("the page is registered in the taxonomy, sitemap, covers and the query map", () => {
  // The product menu is at its 40-destination bound, so the page is reached from the GFRP page, the rebar family card, the comparison post and the downloads page.
  const route = "/products/basalt-frp-rebar";
  for (const file of ["content/data/productTaxonomy.ts", "app/sitemap.ts", "lib/covers.ts", "content/data/seoQueryTargets.ts"]) assert.ok(read(file).includes(route), file);
  assert.ok(read("app/products/frp-rebar/page.tsx").includes(route), "GFRP page links the basalt page");
  assert.ok(read("content/data/blogPosts.ts").includes(`](${route})`), "basalt-vs-fiberglass post links the basalt page");
});

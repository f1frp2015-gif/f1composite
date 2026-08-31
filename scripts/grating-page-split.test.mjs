import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDirectory, "..");

const files = {
  pultrudedPage: path.join(root, "app/products/frp-gratings/page.tsx"),
  profileHub: path.join(root, "app/pultruded-frp-profiles/page.tsx"),
  moldedPage: path.join(root, "app/products/molded-frp-grating/page.tsx"),
  deckPage: path.join(root, "app/products/frp-deck-panels/page.tsx"),
  moldedOg: path.join(root, "app/products/molded-frp-grating/opengraph-image.tsx"),
  deckOg: path.join(root, "app/products/frp-deck-panels/opengraph-image.tsx"),
  moldedSpecs: path.join(root, "content/data/moldedGratingSpecs.ts"),
  pultrudedSpecs: path.join(root, "content/data/pultrudedGratingSpecs.ts"),
  deckSpecs: path.join(root, "content/data/frpDeckPanelSpecs.ts"),
  seo: path.join(root, "content/data/seoQueryTargets.ts"),
  sitemap: path.join(root, "app/sitemap.ts"),
  navigation: path.join(root, "content/data/navigation.ts"),
  products: path.join(root, "content/data/products.ts"),
  redirects: path.join(root, "next.config.ts"),
};

const imagePaths = [
  "public/images/products/molded-frp-grating/molded-grating-coastal-walkway.webp",
  "public/images/products/molded-frp-grating/molded-grating-grit-mesh-closeup.webp",
  "public/images/products/molded-frp-grating/grating-clips-hardware-reference.webp",
].map((relativePath) => path.join(root, relativePath));

const pultrudedImagePaths = [
  "public/images/products/pultruded-frp-grating/pultruded-grating-rooftop-walkway.webp",
  "public/images/products/pultruded-frp-grating/pultruded-grating-t-bar-closeup.webp",
].map((relativePath) => path.join(root, relativePath));

const deckDrawingPaths = [
  "deck-01.webp",
  "deck-02.webp",
  "deck-03.webp",
  "deck-04.webp",
  "deck-05.webp",
  "deck-06-07.webp",
  "deck-08-09.webp",
  "deck-10.webp",
  "deck-11.webp",
  "deck-12.webp",
].map((name) => path.join(root, "public/images/products/frp-deck-panels", name));

const forbiddenPublicTokens = ["Strongrate", "Nantong Strongrate", "南通盛世"];

test("molded, pultruded and deck products have separate static routes", async () => {
  const [pultruded, molded, deck, moldedOg, deckOg, redirects] = await Promise.all([
    readFile(files.pultrudedPage, "utf8"),
    readFile(files.moldedPage, "utf8"),
    readFile(files.deckPage, "utf8"),
    readFile(files.moldedOg, "utf8"),
    readFile(files.deckOg, "utf8"),
    readFile(files.redirects, "utf8"),
  ]);

  assert.match(pultruded, /Pultruded FRP Grating Manufacturer/);
  assert.match(pultruded, /T-Bar, I-Bar & High-Load Series/);
  assert.doesNotMatch(pultruded, /moldedGratingSpecGroups/);
  assert.doesNotMatch(pultruded, /frp-structural-deck-panel-hero/);
  assert.doesNotMatch(pultruded, /Pultruded Cover & Deck Panels/);

  assert.match(molded, /Molded FRP Grating Manufacturer/);
  assert.match(molded, /moldedGratingSpecGroups/);
  assert.match(molded, /manual-verified panel sizes/i);
  assert.match(moldedOg, /Molded FRP Grating/);

  assert.match(deck, /Structural FRP Deck Panels/);
  assert.match(deck, /frpDeckPanelSpecs/);
  assert.match(deck, /frp-structural-deck-panel-hero/);
  assert.match(deckOg, /Structural FRP Deck Panels/);

  assert.doesNotMatch(
    redirects,
    /source:\s*["']\/products\/frp-gratings["'][\s\S]{0,180}destination:\s*["']\/products\/molded-frp-grating["']/,
  );
  assert.doesNotMatch(
    redirects,
    /source:\s*["']\/products\/frp-gratings["'][\s\S]{0,180}destination:\s*["']\/products\/frp-deck-panels["']/,
  );
});

test("molded catalog specifications are transcribed as structured HTML data", async () => {
  const specs = await readFile(files.moldedSpecs, "utf8");

  assert.equal([...specs.matchAll(/\{ depth: "/g)].length, 26);
  assert.match(specs, /38\.1 × 38\.1 mm square mesh/);
  assert.match(specs, /19\.05 × 19\.05 \/ 38\.1 × 38\.1 mm mini mesh/);
  assert.match(specs, /50 \(HD\)/);
  assert.match(specs, /40\.0/);
  assert.match(specs, /moldedAdditionalMeshFamilies/);
});

test("pultruded manual summary and deck source values remain structured and bounded", async () => {
  const [pultrudedSpecs, deckSpecs] = await Promise.all([
    readFile(files.pultrudedSpecs, "utf8"),
    readFile(files.deckSpecs, "utf8"),
  ]);

  assert.equal([...pultrudedSpecs.matchAll(/\{ type: "/g)].length, 36);
  assert.match(pultrudedSpecs, /T-1210/);
  assert.match(pultrudedSpecs, /HL-6020/);
  assert.match(pultrudedSpecs, /SI-8315/);
  assert.match(pultrudedSpecs, /summary-table values/);

  assert.equal([...deckSpecs.matchAll(/profile: "Profile /g)].length, 12);
  assert.match(deckSpecs, /a: "609\.6", b: "28\.58", t1t2: "4\.5 \/ 4\.5"/);
  assert.match(deckSpecs, /does not state a measurement unit/i);
  assert.doesNotMatch(deckSpecs, /JB-\d+/);
});

test("all three product routes are discoverable without changing the existing canonical path", async () => {
  const [seo, sitemap, navigation, products] = await Promise.all([
    readFile(files.seo, "utf8"),
    readFile(files.sitemap, "utf8"),
    readFile(files.navigation, "utf8"),
    readFile(files.products, "utf8"),
  ]);

  for (const source of [seo, sitemap, navigation, products]) {
    assert.match(source, /\/products\/molded-frp-grating/);
    assert.match(source, /\/products\/frp-gratings/);
    assert.match(source, /\/products\/frp-deck-panels/);
  }
  assert.match(seo, /primaryQuery: "molded FRP grating"/);
  assert.match(seo, /primaryQuery: "pultruded FRP grating manufacturer"/);
  assert.match(seo, /primaryQuery: "structural FRP deck panels"/);
});

test("pultruded grating synonyms are scoped, explained and not stacked", async () => {
  const [page, seo, hub] = await Promise.all([
    readFile(files.pultrudedPage, "utf8"),
    readFile(files.seo, "utf8"),
    readFile(files.profileHub, "utf8"),
  ]);

  const seoBlock = seo.match(
    /targetUrl:\s*"\/products\/frp-gratings",[\s\S]*?\n\s*supportingUrls:/,
  )?.[0];
  assert.ok(seoBlock, "pultruded grating SEO target should exist");

  const metaDescription = seoBlock.match(/description:\s*\n?\s*"([^"]+)"/)?.[1];
  assert.ok(metaDescription, "pultruded grating meta description should exist");
  assert.match(metaDescription, /\bpultruded fiberglass grating\b/i);
  assert.doesNotMatch(metaDescription, /\bpultruded FRP grating\b/i);

  const intro = page.match(
    /<SectionTag>Directional Stiffness · Longer Spans<\/SectionTag>([\s\S]*?)<aside/,
  )?.[1];
  assert.ok(intro, "visible pultruded grating intro should exist");
  assert.match(intro, /\bpultruded fiberglass grating\b/i);
  assert.match(intro, /\bpultruded FRP grating\b/i);
  assert.match(intro, /\bGFRP\b/);
  assert.match(intro, /For F1(?:&apos;|['’])s glass-reinforced products/i);
  assert.match(intro, /\bsame product\b/i);

  const synonymFaq = page.match(
    /\{\s*question:\s*"[^"]*pultruded fiberglass grating[^"]*pultruded FRP grating[^"]*\?",[\s\S]*?\n\s*\},/,
  )?.[0];
  assert.ok(synonymFaq, "the scoped synonym FAQ should exist");
  assert.match(synonymFaq, /For F1(?:&apos;|['’])s glass-reinforced products, yes/i);
  assert.match(synonymFaq, /\bGFRP\b/);
  assert.match(synonymFaq, /\bI-bar\b/i);
  assert.match(synonymFaq, /\bT-bar\b/i);
  assert.match(synonymFaq, /Molded FRP grating/);
  assert.match(synonymFaq, /closed structural FRP deck panels/);

  const gratingCard = hub.match(
    /\{\s*slug:\s*"gratings",[\s\S]*?href:\s*"\/products\/frp-gratings",[\s\S]*?\n\s*\},/,
  )?.[0];
  assert.ok(gratingCard, "pultruded grating hub card should exist");
  assert.match(gratingCard, /name:\s*"Pultruded FRP Grating"/);
  assert.match(gratingCard, /keyword:\s*"Also called:\s*pultruded fiberglass grating"/i);
});

test("manual-derived public images exist and public copy is supplier-neutral", async () => {
  for (const imagePath of imagePaths) {
    const info = await stat(imagePath);
    assert.ok(info.size > 20_000, `${path.basename(imagePath)} should be a real image asset`);
  }
  for (const imagePath of pultrudedImagePaths) {
    const info = await stat(imagePath);
    assert.ok(info.size > 20_000, `${path.basename(imagePath)} should be a real manual-derived image asset`);
  }
  for (const imagePath of deckDrawingPaths) {
    const info = await stat(imagePath);
    assert.ok(info.size > 1_000, `${path.basename(imagePath)} should be a real deck section drawing`);
  }

  const publicCopy = (
    await Promise.all([
      readFile(files.moldedPage, "utf8"),
      readFile(files.pultrudedPage, "utf8"),
      readFile(files.deckPage, "utf8"),
      readFile(files.moldedSpecs, "utf8"),
      readFile(files.pultrudedSpecs, "utf8"),
      readFile(files.deckSpecs, "utf8"),
      readFile(files.products, "utf8"),
      readFile(files.navigation, "utf8"),
    ])
  ).join("\n");

  for (const token of forbiddenPublicTokens) {
    assert.doesNotMatch(publicCopy, new RegExp(token, "i"));
  }
  assert.doesNotMatch(publicCopy, /JB-\d+/);
});

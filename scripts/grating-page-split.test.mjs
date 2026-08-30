import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDirectory, "..");

const files = {
  pultrudedPage: path.join(root, "app/products/frp-gratings/page.tsx"),
  moldedPage: path.join(root, "app/products/molded-frp-grating/page.tsx"),
  moldedOg: path.join(root, "app/products/molded-frp-grating/opengraph-image.tsx"),
  specs: path.join(root, "content/data/moldedGratingSpecs.ts"),
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

const forbiddenPublicTokens = ["Strongrate", "Nantong Strongrate", "南通盛世"];

test("molded and pultruded grating have separate static product routes", async () => {
  const [pultruded, molded, og, redirects] = await Promise.all([
    readFile(files.pultrudedPage, "utf8"),
    readFile(files.moldedPage, "utf8"),
    readFile(files.moldedOg, "utf8"),
    readFile(files.redirects, "utf8"),
  ]);

  assert.match(pultruded, /Pultruded FRP Grating Manufacturer/);
  assert.match(pultruded, /I-Bar, T-Bar & Structural Deck Panels/);
  assert.doesNotMatch(pultruded, /moldedGratingSpecGroups/);

  assert.match(molded, /Molded FRP Grating Manufacturer/);
  assert.match(molded, /moldedGratingSpecGroups/);
  assert.match(molded, /manual-verified panel sizes/i);
  assert.match(og, /Molded FRP Grating/);

  assert.doesNotMatch(
    redirects,
    /source:\s*["']\/products\/frp-gratings["'][\s\S]{0,180}destination:\s*["']\/products\/molded-frp-grating["']/,
  );
});

test("molded catalog specifications are transcribed as structured HTML data", async () => {
  const specs = await readFile(files.specs, "utf8");

  assert.equal([...specs.matchAll(/\{ depth: "/g)].length, 26);
  assert.match(specs, /38\.1 × 38\.1 mm square mesh/);
  assert.match(specs, /19\.05 × 19\.05 \/ 38\.1 × 38\.1 mm mini mesh/);
  assert.match(specs, /50 \(HD\)/);
  assert.match(specs, /40\.0/);
  assert.match(specs, /moldedAdditionalMeshFamilies/);
});

test("new molded route is discoverable without changing the existing canonical path", async () => {
  const [seo, sitemap, navigation, products] = await Promise.all([
    readFile(files.seo, "utf8"),
    readFile(files.sitemap, "utf8"),
    readFile(files.navigation, "utf8"),
    readFile(files.products, "utf8"),
  ]);

  for (const source of [seo, sitemap, navigation, products]) {
    assert.match(source, /\/products\/molded-frp-grating/);
    assert.match(source, /\/products\/frp-gratings/);
  }
  assert.match(seo, /primaryQuery: "molded FRP grating"/);
  assert.match(seo, /primaryQuery: "pultruded FRP grating manufacturer"/);
});

test("manual-derived public images exist and public copy is supplier-neutral", async () => {
  for (const imagePath of imagePaths) {
    const info = await stat(imagePath);
    assert.ok(info.size > 20_000, `${path.basename(imagePath)} should be a real image asset`);
  }

  const publicCopy = (
    await Promise.all([
      readFile(files.moldedPage, "utf8"),
      readFile(files.specs, "utf8"),
      readFile(files.products, "utf8"),
      readFile(files.navigation, "utf8"),
    ])
  ).join("\n");

  for (const token of forbiddenPublicTokens) {
    assert.doesNotMatch(publicCopy, new RegExp(token, "i"));
  }
});

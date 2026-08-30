import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDirectory, "..");
const fromRoot = (relativePath) => path.join(root, relativePath);
const read = (relativePath) => readFile(fromRoot(relativePath), "utf8");

const route = "/products/fiberglass-stakes";

const imagePaths = [
  "public/images/products/fiberglass-stakes/fiberglass-stakes-size-range.webp",
  "public/images/products/fiberglass-stakes/frp-stakes-vineyard-training.webp",
  "public/images/products/fiberglass-stakes/fiberglass-tree-stakes-nursery.webp",
];

test("fiberglass stakes page owns a complete, bounded commercial intent", async () => {
  const [page, specs, og] = await Promise.all([
    read("app/products/fiberglass-stakes/page.tsx"),
    read("content/data/frpStakeSpecs.ts"),
    read("app/products/fiberglass-stakes/opengraph-image.tsx"),
  ]);

  assert.match(page, /Fiberglass stakes for plants, trees, vineyards and marking/);
  assert.match(page, /Common fiberglass stake sizes for RFQ planning/);
  assert.match(page, /FRP plant stakes, fiberglass tree stakes and visible marker rods/);
  assert.match(page, /These two application visualizations/);
  assert.match(page, /Fiberglass stakes vs bamboo, wood and steel markers/);
  assert.match(page, /Product visualization/);
  assert.match(page, /application visualizations/);
  assert.match(page, /rel="noopener noreferrer nofollow"/);
  assert.doesNotMatch(page, /in stock|buy now|add to cart/i);

  assert.equal([...specs.matchAll(/\n    nominalDiameter: /g)].length, 6);
  assert.match(specs, /1\/5 in/);
  assert.match(specs, /3\/4 in/);
  assert.match(specs, /public wholesale-market references/i);
  assert.match(og, /Fiberglass Stakes Manufacturer/);
});

test("fiberglass stakes route is discoverable across every buyer and AI surface", async () => {
  const sources = await Promise.all(
    [
      "content/data/navigation.ts",
      "content/data/products.ts",
      "content/data/seoQueryTargets.ts",
      "app/sitemap.ts",
      "app/pultruded-frp-profiles/page.tsx",
      "app/products/product-lines/page.tsx",
      "app/api/ai-context/route.ts",
      "app/api/chat/route.ts",
      "app/api/sourcing/route.ts",
      "lib/sourcingSchema.ts",
      "lib/llmsContent.ts",
    ].map(read),
  );

  for (const source of sources) assert.match(source, new RegExp(route.replaceAll("/", "\\/")));
  assert.match(sources[2], /primaryQuery: "fiberglass stakes manufacturer"/);
  assert.match(sources[6], /Public wholesale planning band only/);
  assert.match(sources[7], /Never present that band as certified F1 stock or design data/);
});

test("common FRP stake aliases consolidate to the plural fiberglass-stakes canonical", async () => {
  const redirects = await read("next.config.ts");
  for (const alias of [
    "/products/frp-stake",
    "/products/frp-stakes",
    "/products/fiberglass-stake",
  ]) {
    assert.match(redirects, new RegExp(alias.replaceAll("/", "\\/")));
  }
  assert.match(redirects, /destination: "\/products\/fiberglass-stakes"/);
});

test("the product hero and two selected application visuals are present and production-sized", async () => {
  for (const imagePath of imagePaths) {
    const info = await stat(fromRoot(imagePath));
    assert.ok(info.size > 80_000, `${path.basename(imagePath)} should be a production image asset`);
    const header = await readFile(fromRoot(imagePath));
    assert.equal(header.subarray(0, 4).toString("ascii"), "RIFF");
    assert.equal(header.subarray(8, 12).toString("ascii"), "WEBP");
  }
});

test("public dimensions remain explicitly separated from performance claims", async () => {
  const [page, specs, context] = await Promise.all([
    read("app/products/fiberglass-stakes/page.tsx"),
    read("content/data/frpStakeSpecs.ts"),
    read("app/api/ai-context/route.ts"),
  ]);
  const combined = `${page}\n${specs}\n${context}`;

  assert.match(combined, /confirm/i);
  assert.match(combined, /No universal stiffness, breaking load, UV life or electrical-safety claim applies/);
  assert.doesNotMatch(combined, /forever|guaranteed lifetime|zero maintenance|always returns to straight/i);
});

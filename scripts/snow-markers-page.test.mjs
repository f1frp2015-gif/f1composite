import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDirectory, "..");
const read = (relativePath) => readFile(path.join(root, relativePath), "utf8");

const route = "/products/fiberglass-snow-markers";
const pagePath = "app/products/fiberglass-snow-markers/page.tsx";
const heroImagePath =
  "public/images/products/fiberglass-snow-markers/fiberglass-snow-markers-reflective-stakes.webp";
const applicationImagePath =
  "public/images/products/fiberglass-snow-markers/reflective-fiberglass-snow-markers-winter-road.webp";

test("snow-marker page owns a complete, quote-ready product specification", async () => {
  const page = await read(pagePath);

  assert.match(page, /Fiberglass Snow Markers & Driveway Stakes Manufacturer/);
  assert.match(page, /6\.35 mm \(1\/4 in\)/);
  assert.match(page, /7\.9 mm \(5\/16 in\)/);
  assert.match(page, /610, 914, 1,219, 1,524 and 1,829 mm/);
  assert.match(page, /Solid fiberglass stakes/);
  assert.match(page, /Hollow fiberglass stakes/);
  assert.match(page, /One, two or three wraparound reflective bands/);
  assert.match(page, /Public-road use needs a separate compliance decision/);
  assert.match(page, /buildProductFamilyPageSchema/);
  assert.match(page, /schemaType: "ItemPage"/);
  assert.doesNotMatch(page, /\$\d|Add to Cart|Wellco|wellcowholesale/i);
});

test("snow-marker imagery is local, SEO-named, compressed and responsibly loaded", async () => {
  const [page, heroImageInfo, applicationImageInfo] = await Promise.all([
    read(pagePath),
    stat(path.join(root, heroImagePath)),
    stat(path.join(root, applicationImagePath)),
  ]);

  assert.ok(heroImageInfo.size > 20_000, "hero should be a real product-category image");
  assert.ok(heroImageInfo.size < 120_000, "hero should remain compressed for fast delivery");
  assert.ok(applicationImageInfo.size > 20_000, "application image should be a real scene");
  assert.ok(
    applicationImageInfo.size < 150_000,
    "application image should remain compressed for fast delivery",
  );
  assert.match(page, /<Image[\s\S]*preload[\s\S]*sizes="\(max-width: 1024px\) 100vw, 48vw"/);
  assert.match(page, /reflective-fiberglass-snow-markers-winter-road\.webp/);
  assert.match(page, /alt="Orange fiberglass snow markers lining a plowed mountain road after heavy snowfall"/);
  assert.match(page, /loading="lazy"/);
  assert.match(page, /quality=\{75\}/);
  assert.match(page, /sizes="\(max-width: 1024px\) calc\(100vw - 68px\), 40vw"/);
  assert.doesNotMatch(page, /src=\{?[^\n]*(\.png|\.jpe?g)/i);
  assert.match(page, /Catalog visualization of solid and hollow marker configurations/);
  assert.match(page, /Final[\s\S]*approved sample/);
});

test("canonical snow-marker route is discoverable across buyer and crawler surfaces", async () => {
  const sources = await Promise.all(
    [
      "content/data/navigation.ts",
      "content/data/products.ts",
      "app/pultruded-frp-profiles/page.tsx",
      "app/sitemap.ts",
      "lib/llmsContent.ts",
    ].map(read),
  );

  for (const source of sources) {
    assert.match(source, new RegExp(route.replaceAll("/", "\\/")));
  }
});

test("common snow-marker aliases redirect to the canonical product page", async () => {
  const redirects = await read("next.config.ts");

  assert.match(
    redirects,
    /\["\/products\/snow-markers", "\/products\/fiberglass-snow-markers"\]/,
  );
  assert.match(
    redirects,
    /\["\/products\/snow-stakes", "\/products\/fiberglass-snow-markers"\]/,
  );
});

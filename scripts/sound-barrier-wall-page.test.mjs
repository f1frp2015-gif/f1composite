import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDirectory, "..");
const fromRoot = (relativePath) => path.join(root, relativePath);
const read = (relativePath) => readFile(fromRoot(relativePath), "utf8");

const route = "/products/frp-sound-barrier-wall";
const imageAssets = [
  {
    path: "public/images/products/frp-sound-barrier-wall/frp-sound-barrier-wall-highway.webp",
    minBytes: 50_000,
  },
  {
    path: "public/images/products/frp-sound-barrier-wall/interlocking-frp-noise-barrier-panel-system.webp",
    minBytes: 50_000,
  },
  {
    path: "public/images/products/frp-sound-barrier-wall/interlocking-frp-sound-barrier-panel-section.webp",
    minBytes: 4_000,
  },
  {
    path: "public/images/products/frp-sound-barrier-wall/outdoor-post-and-panel-wall-layout-reference.webp",
    minBytes: 50_000,
  },
];

test("sound-barrier page owns a bounded, assembly-specific product intent", async () => {
  const [page, specs, og, seo, aiContext, chat, llms, sourcing] = await Promise.all([
    read("app/products/frp-sound-barrier-wall/page.tsx"),
    read("content/data/frpSoundBarrierWallSpecs.ts"),
    read("app/products/frp-sound-barrier-wall/opengraph-image.tsx"),
    read("content/data/seoQueryTargets.ts"),
    read("app/api/ai-context/route.ts"),
    read("app/api/chat/route.ts"),
    read("lib/llmsContent.ts"),
    read("app/api/sourcing/route.ts"),
  ]);

  assert.match(page, /FRP Sound Barrier Wall Panels/);
  assert.match(page, /soundBarrierConfigurations/);
  assert.match(page, /soundBarrierMetricGuide/);
  assert.match(page, /schemaType: "CollectionPage"/);
  assert.match(specs, /Reflective FRP sound barrier panels/);
  assert.match(specs, /Absorptive FRP noise barrier panels/);
  assert.match(specs, /NRC is assembly-specific/);
  assert.match(og, /FRP Sound Barrier Wall Panels/);
  assert.match(seo, /primaryQuery: "FRP sound barrier wall"/);
  assert.doesNotMatch(`${specs}\n${og}`, /Fibergrate|Soundscape|Intertek certified/i);
  assert.doesNotMatch(page, /Soundscape|Intertek certified/i);
  assert.match(page, /Supplier reference rendering from/);
  assert.match(page, /src=\{frpSoundBarrierImageAssets\.panelSection\}/);
  assert.doesNotMatch(page, /src=\{frpSoundBarrierImageAssets\.system\}/);
  assert.match(
    page,
    /href="https:\/\/www\.fibergrate\.com\/products\/unique-product-solutions\/sound-barrier-wall\/"/,
  );
  assert.match(page, /not an F1 project image/);

  const guardedSurfaces = `${page}\n${specs}\n${og}\n${aiContext}\n${chat}\n${llms}\n${sourcing}`;
  for (const prohibitedClaim of [
    /NRC\s*(?:of|=|:)?\s*1\.0/i,
    /STC\s*(?:of|=|:)?\s*(?:30|31)\b/i,
    /OITC\s*(?:of|=|:)?\s*20\b/i,
    /(?:12[- ]?in(?:ch)?|14[- ]?ft|3\.52\s*lb|35\s*psf)/i,
    /(?:8|eight)\s+standard colors/i,
    /meet(?:s| or exceed)?\s+all\s+AASHTO\s+and\s+DOT/i,
  ]) {
    assert.doesNotMatch(guardedSurfaces, prohibitedClaim);
  }
});

test("canonical sound-barrier route is present across buyer and crawler surfaces", async () => {
  const [navigation, products, seo, sitemap, hub, soundBarrierPage, platePage] = await Promise.all([
    read("content/data/navigation.ts"),
    read("content/data/products.ts"),
    read("content/data/seoQueryTargets.ts"),
    read("app/sitemap.ts"),
    read("app/pultruded-frp-profiles/page.tsx"),
    read("app/products/frp-sound-barrier-wall/page.tsx"),
    read("app/products/fiberglass-plates/page.tsx"),
  ]);
  const mainNavigation = navigation.slice(
    navigation.indexOf("export const mainNav"),
    navigation.indexOf("export const footerNav"),
  );
  const footerNavigation = navigation.slice(navigation.indexOf("export const footerNav"));
  const routePattern = new RegExp(route.replaceAll("/", "\\/"));

  assert.match(mainNavigation, routePattern);
  assert.match(footerNavigation, routePattern);
  for (const source of [products, seo, sitemap, hub]) assert.match(source, routePattern);
  assert.match(products, /frp-sound-barrier-wall-highway\.webp/);
  assert.match(hub, /interlocking-frp-noise-barrier-panel-system\.webp/);
  assert.match(soundBarrierPage, /href="\/products\/fiberglass-plates"/);
  assert.match(platePage, /href="\/products\/frp-sound-barrier-wall"/);
  assert.doesNotMatch(sitemap, /`\$\{BASE\}\/products\/sound-barrier-wall`/);
});

test("legacy sound-barrier alias redirects to the canonical route", async () => {
  const redirects = await read("next.config.ts");

  assert.match(
    redirects,
    /\["\/products\/sound-barrier-wall", "\/products\/frp-sound-barrier-wall"\]/,
  );
  assert.doesNotMatch(redirects, /\["\/products\/frp-sound-barrier-wall",/);
});

test("all sound-barrier images are local, compressed WebP assets", async () => {
  for (const { path: imagePath, minBytes } of imageAssets) {
    const info = await stat(fromRoot(imagePath));
    assert.ok(info.size > minBytes, `${path.basename(imagePath)} should be a production image asset`);
    assert.ok(info.size < 200_000, `${path.basename(imagePath)} should remain web-compressed`);

    const header = await readFile(fromRoot(imagePath));
    assert.equal(header.subarray(0, 4).toString("ascii"), "RIFF");
    assert.equal(header.subarray(8, 12).toString("ascii"), "WEBP");
  }
});

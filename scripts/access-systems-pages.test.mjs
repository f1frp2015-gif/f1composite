import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDirectory, "..");
const fromRoot = (relativePath) => path.join(root, relativePath);

const files = {
  ladderPage: fromRoot("app/products/frp-ladders/page.tsx"),
  ladderOg: fromRoot("app/products/frp-ladders/opengraph-image.tsx"),
  handrailPage: fromRoot("app/products/frp-handrail-systems/page.tsx"),
  handrailOg: fromRoot("app/products/frp-handrail-systems/opengraph-image.tsx"),
  ladderSpecs: fromRoot("content/data/frpLadderSpecs.ts"),
  handrailSpecs: fromRoot("content/data/frpHandrailSpecs.ts"),
  seo: fromRoot("content/data/seoQueryTargets.ts"),
  sitemap: fromRoot("app/sitemap.ts"),
  navigation: fromRoot("content/data/navigation.ts"),
  products: fromRoot("content/data/products.ts"),
  hub: fromRoot("app/pultruded-frp-profiles/page.tsx"),
  llms: fromRoot("lib/llmsContent.ts"),
  aiContext: fromRoot("app/api/ai-context/route.ts"),
  chat: fromRoot("app/api/chat/route.ts"),
  sourcing: fromRoot("app/api/sourcing/route.ts"),
  sourcingSchema: fromRoot("lib/sourcingSchema.ts"),
  redirects: fromRoot("next.config.ts"),
  productLines: fromRoot("app/products/product-lines/page.tsx"),
  applicationPages: fromRoot("lib/applicationPages.ts"),
  stairTreads: fromRoot("app/products/frp-stair-treads/page.tsx"),
  industrial: fromRoot("app/industries/industrial/page.tsx"),
  infrastructure: fromRoot("app/industries/infrastructure/page.tsx"),
  roundTube: fromRoot("app/products/fiberglass-structural-shapes/frp-tube/page.tsx"),
  squareTube: fromRoot("app/products/fiberglass-structural-shapes/frp-square-tube/page.tsx"),
};

const imagePaths = [
  "public/images/products/frp-ladders/fiberglass-fixed-ladder-cage.webp",
  "public/images/products/frp-ladders/frp-safety-cage-layout.webp",
  "public/images/products/frp-ladders/fiberglass-ladder-rung-covers.webp",
  "public/images/products/frp-handrail-systems/fiberglass-handrail-industrial-platform.webp",
  "public/images/products/frp-handrail-systems/frp-square-handrail-system-layout.webp",
  "public/images/products/frp-handrail-systems/frp-round-handrail-system-components.webp",
].map(fromRoot);

const forbiddenSupplierTokens = [
  "Strongrate",
  "Strongrail",
  "Nantong Strongrate",
  "Nantong",
  "南通盛世",
];

test("ladder and handrail are separate static product routes with dedicated metadata", async () => {
  const [ladder, ladderOg, handrail, handrailOg] = await Promise.all([
    readFile(files.ladderPage, "utf8"),
    readFile(files.ladderOg, "utf8"),
    readFile(files.handrailPage, "utf8"),
    readFile(files.handrailOg, "utf8"),
  ]);

  assert.match(ladder, /Fiberglass Fixed Ladders and FRP Access Systems/);
  assert.match(ladder, /frpFixedLadderCatalogSpecs/);
  assert.match(ladder, /C-shape and U-shape fiberglass ladder rung covers/);
  assert.match(ladderOg, /Fiberglass Fixed Ladder Systems/);
  assert.doesNotMatch(ladder, /Square and round FRP handrail system specifications/);

  assert.match(handrail, /Fiberglass Handrail and Guardrail Systems/);
  assert.match(handrail, /frpHandrailCatalogSystems/);
  assert.match(handrail, /Square and round FRP handrail system specifications/);
  assert.match(handrailOg, /Fiberglass Handrail Systems/);
  assert.doesNotMatch(handrail, /frpFixedLadderCatalogSpecs/);
});

test("manual-derived ladder and handrail specifications remain structured and bounded", async () => {
  const [ladderSpecs, handrailSpecs] = await Promise.all([
    readFile(files.ladderSpecs, "utf8"),
    readFile(files.handrailSpecs, "utf8"),
  ]);

  assert.equal([...ladderSpecs.matchAll(/\{ item: /g)].length, 23);
  assert.match(ladderSpecs, /7,300 mm/);
  assert.match(ladderSpecs, /10,200 mm/);
  assert.match(ladderSpecs, /50\.8 × 50\.8 × 6\.4 mm/);
  assert.match(ladderSpecs, /1,219 mm maximum/);
  assert.match(ladderSpecs, /Top rung level with walkout surface/);
  assert.match(ladderSpecs, /Chinese line shows 10 mm/);
  assert.match(ladderSpecs, /38 × 38 × 38 × 3 mm/);

  assert.equal([...handrailSpecs.matchAll(/\{\n    name: .*\n    shortName: /g)].length, 2);
  assert.equal([...handrailSpecs.matchAll(/\{ item: /g)].length, 20);
  assert.match(handrailSpecs, /50 × 50 × 6\.4 mm/);
  assert.match(handrailSpecs, /BMC elbow, tee, cross and foot base/);
  assert.match(handrailSpecs, /anomalous and is intentionally omitted/);
  assert.doesNotMatch(handrailSpecs, /45 mm wide × 10 mm long/);
});

test("both access-system routes are discoverable with distinct SEO ownership", async () => {
  const sources = await Promise.all(
    [
      files.seo,
      files.sitemap,
      files.navigation,
      files.products,
      files.hub,
      files.llms,
      files.aiContext,
      files.chat,
      files.sourcing,
      files.sourcingSchema,
      files.productLines,
      files.applicationPages,
      files.stairTreads,
    ].map((file) => readFile(file, "utf8")),
  );

  for (const source of sources) {
    assert.match(source, /\/products\/frp-ladders/);
    assert.match(source, /\/products\/frp-handrail-systems/);
  }
  assert.match(sources[0], /primaryQuery: "fiberglass fixed ladder"/);
  assert.match(sources[0], /primaryQuery: "fiberglass handrail systems"/);
  assert.match(sources[0], /optional cage components/);
});

test("canonical access routes are not redirected and legacy handrail path remains supported", async () => {
  const redirects = await readFile(files.redirects, "utf8");
  assert.doesNotMatch(redirects, /\["\/products\/frp-ladders",/);
  assert.doesNotMatch(redirects, /\["\/products\/frp-handrail-systems",/);
  assert.match(redirects, /\["\/products\/handrail-systems", "\/products\/frp-handrail-systems"\]/);
});

test("related industry and raw-profile pages preserve the complete-system compliance boundary", async () => {
  const [industrial, infrastructure, roundTube, squareTube] = await Promise.all([
    readFile(files.industrial, "utf8"),
    readFile(files.infrastructure, "utf8"),
    readFile(files.roundTube, "utf8"),
    readFile(files.squareTube, "utf8"),
  ]);

  assert.match(industrial, /href="\/products\/frp-ladders"/);
  assert.match(industrial, /href="\/products\/frp-handrail-systems"/);
  assert.match(industrial, /OSHA 1910\.29/);
  assert.doesNotMatch(industrial, /handrail systems meet OSHA 1910\.23/i);
  assert.doesNotMatch(infrastructure, /All handrail systems undergo third-party structural testing/i);

  assert.match(roundTube, /Complete fiberglass handrail systems/);
  assert.doesNotMatch(roundTube, /typically meet or exceed the 200 lbs/i);
  assert.doesNotMatch(roundTube, /50\+ years with negligible mechanical loss/i);
  assert.match(squareTube, /Complete fiberglass fixed ladder systems/);
  assert.doesNotMatch(squareTube, /75% lighter than steel and electrically insulating/i);
});

test("manual-derived public assets exist and contain no supplier identifiers", async () => {
  for (const imagePath of imagePaths) {
    const info = await stat(imagePath);
    assert.ok(info.size > 20_000, `${path.basename(imagePath)} should be a real image asset`);
    const binaryText = (await readFile(imagePath)).toString("latin1");
    for (const token of forbiddenSupplierTokens) {
      assert.doesNotMatch(binaryText, new RegExp(token, "i"));
    }
  }

  const publicCopy = (
    await Promise.all([
      readFile(files.ladderPage, "utf8"),
      readFile(files.handrailPage, "utf8"),
      readFile(files.ladderSpecs, "utf8"),
      readFile(files.handrailSpecs, "utf8"),
      readFile(files.products, "utf8"),
      readFile(files.navigation, "utf8"),
    ])
  ).join("\n");

  for (const token of forbiddenSupplierTokens) {
    assert.doesNotMatch(publicCopy, new RegExp(token, "i"));
  }
  assert.doesNotMatch(publicCopy, /engineered to OSHA|OSHA compliant|ISO 14122-\d compliant/i);
});

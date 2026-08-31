import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDirectory, "..");
const read = (relativePath) => readFile(path.join(root, relativePath), "utf8");

const drawingNames = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07-09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15-17",
  "18",
  "19",
];

test("fiberglass sheet and plate have separate static product routes", async () => {
  const [sheetPage, platePage, profileHub] = await Promise.all([
    read("app/products/fiberglass-sheets/page.tsx"),
    read("app/products/fiberglass-plates/page.tsx"),
    read("app/pultruded-frp-profiles/page.tsx"),
  ]);

  assert.match(sheetPage, /Solid Flat Sheet · F1-FORM/);
  assert.match(sheetPage, /solid FRP sheet cut to size/);
  assert.match(sheetPage, /href="\/products\/fiberglass-plates"/);
  assert.doesNotMatch(sheetPage, /fiberglassPlateSpecs/);

  assert.match(platePage, /19 Hollow Profile References/);
  assert.match(platePage, /fiberglassPlateSpecs/);
  assert.match(platePage, /href="\/products\/fiberglass-sheets"/);
  assert.match(platePage, /href="\/products\/frp-deck-panels"/);

  assert.match(profileHub, /href: "\/products\/fiberglass-sheets"/);
  assert.match(profileHub, /href: "\/products\/fiberglass-plates"/);
  assert.match(profileHub, /rangeLabel: "Catalog scope"/);
  assert.doesNotMatch(profileHub, /Every geometry listed below is produced in-house/);
});

test("all 19 supplied plate records remain structured and source-bounded", async () => {
  const specs = await read("content/data/fiberglassPlateSpecs.ts");

  assert.equal([...specs.matchAll(/profile: "Plate /g)].length, 19);
  assert.match(specs, /catalogId: "KF-0665", a: "634", b: "60", t1t2: "3\.2 \/ 3\.5"/);
  assert.match(specs, /catalogId: "KF-1019", a: "380", b: "140", t1t2: "15 \/ 10"/);
  assert.match(specs, /catalogId: "JB-0294-B", a: "301", b: "160", t1t2: "6 \/ 4"/);
  assert.match(specs, /catalogId: "J-0846", a: "800", b: "300", t1t2: "3\.5 \/ 10"/);
  assert.match(specs, /does not state a measurement unit/i);
  assert.match(specs, /Shared source schematic for Plates 07–09/);
  assert.match(specs, /Shared source schematic for Plates 15–17/);
});

test("the 15 exact plate schematics exist as optimized public assets", async () => {
  for (const name of drawingNames) {
    const info = await stat(
      path.join(root, `public/images/products/fiberglass-plates/plate-${name}.webp`),
    );
    assert.ok(info.size > 1_000, `plate-${name}.webp should contain a real section drawing`);
  }
});

test("sheet production photos use descriptive SEO-safe WebP assets", async () => {
  const sheetPage = await read("app/products/fiberglass-sheets/page.tsx");
  const photoNames = [
    "pultruded-fiberglass-sheet-black-surface.webp",
    "pultruded-frp-sheet-formed-edge-sample.webp",
  ];

  for (const name of photoNames) {
    assert.match(sheetPage, new RegExp(name.replaceAll(".", "\\.")));
    const info = await stat(path.join(root, `public/images/products/fiberglass-sheets/${name}`));
    assert.ok(info.size > 20_000, `${name} should contain a real optimized product photo`);
    assert.ok(info.size < 150_000, `${name} should remain compressed for web delivery`);
  }
});

test("sheet and plate are separately discoverable and own distinct queries", async () => {
  const [navigation, sitemap, seo, platePage] = await Promise.all([
    read("content/data/navigation.ts"),
    read("app/sitemap.ts"),
    read("content/data/seoQueryTargets.ts"),
    read("app/products/fiberglass-plates/page.tsx"),
  ]);

  for (const source of [navigation, sitemap, seo]) {
    assert.match(source, /\/products\/fiberglass-sheets/);
    assert.match(source, /\/products\/fiberglass-plates/);
  }

  assert.match(navigation, /label: "Fiberglass Sheets", href: "\/products\/fiberglass-sheets"/);
  assert.match(navigation, /label: "Fiberglass Plate Profiles", href: "\/products\/fiberglass-plates"/);
  assert.doesNotMatch(navigation, /Fiberglass Sheets & Plate/);
  assert.match(seo, /primaryQuery: "fiberglass sheets manufacturer"/);
  assert.match(seo, /primaryQuery: "pultruded FRP plate"/);
  const plateTitle = "Pultruded FRP Plate Profiles — 19 Section Drawings";
  assert.match(platePage, new RegExp(plateTitle));
  assert.match(seo, new RegExp(plateTitle));
});

import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fromRoot = (relativePath) => path.join(root, relativePath);

const pagePath = fromRoot("app/products/frp-stair-treads/page.tsx");
const dataPath = fromRoot("content/data/frpStairTreadSpecs.ts");
const imagePaths = [
  "public/images/products/frp-stair-treads/frp-stair-tread-covers-installed.webp",
  "public/images/products/frp-stair-treads/metal-grating-stairs-before-retrofit.webp",
  "public/images/products/frp-stair-treads/frp-stair-tread-cover-fastener-detail.webp",
].map(fromRoot);

test("stair-tread page presents a decision-first three-family selection flow", async () => {
  const page = await readFile(pagePath, "utf8");

  assert.match(page, /Three tread families, three different jobs/);
  assert.match(page, /Four Decision Gates/);
  assert.match(page, /Selection Reference Matrix/);
  assert.match(page, /MeasurementDiagram/);
  assert.match(page, /When a Cover Is Not Enough/);
  assert.match(page, /Survey, dry-fit, fasten, inspect/);
  assert.match(page, /preload/);
  assert.match(page, /Supplier-reference retrofit photography/);
  assert.doesNotMatch(page, /National Grating|M-C183|\$175|\$195/);
});

test("supplier reference dimensions remain explicit and bounded", async () => {
  const data = await readFile(dataPath, "utf8");

  assert.equal([...data.matchAll(/family: "/g)].length, 4);
  assert.match(data, /305 mm \(12 in\)/);
  assert.match(data, /343 mm \(13\.5 in\)/);
  assert.match(data, /3,658 mm \(144 in\)/);
  assert.match(data, /3\.2 mm \(1\/8 in\)/);
  assert.match(data, /not F1 inventory or order-code commitments/);
  assert.match(data, /load table/);
});

test("stair-tread photography is local and production-sized", async () => {
  for (const imagePath of imagePaths) {
    const info = await stat(imagePath);
    assert.ok(info.size > 100_000, `${path.basename(imagePath)} should be a real optimized image`);
  }
});

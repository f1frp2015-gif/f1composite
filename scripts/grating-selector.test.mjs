import test from "node:test";
import assert from "node:assert/strict";
import { loadProjectModule } from "./load-project-module.mjs";

const { buildGratingRows, filterGratingRows, gratingAreaWeight, squareMeshPitch, KG_M2_TO_LB_FT2 } = loadProjectModule("lib/gratingSelector.ts");
const { moldedGratingSpecGroups } = loadProjectModule("content/data/moldedGratingSpecs.ts");
const { pultrudedGratingSpecGroups } = loadProjectModule("content/data/pultrudedGratingSpecs.ts");
const { toolCovers } = loadProjectModule("lib/covers.ts");

const rows = buildGratingRows();
const near = (a, b, tol = 1e-6) => assert.ok(Math.abs(a - b) <= tol, `${a} != ${b}`);

test("every published molded and pultruded row appears once with numeric values", () => {
  const molded = moldedGratingSpecGroups.reduce((n, g) => n + g.rows.length, 0);
  const pultruded = pultrudedGratingSpecGroups.reduce((n, g) => n + g.rows.length, 0);
  assert.equal(rows.filter((r) => r.family === "molded").length, molded);
  assert.equal(rows.filter((r) => r.family === "pultruded").length, pultruded);
  assert.equal(new Set(rows.map((r) => r.id)).size, rows.length);
  for (const row of rows) {
    for (const key of ["depthMm", "openAreaPct", "weightKgM2"]) assert.ok(Number.isFinite(row[key]) && row[key] > 0, `${row.id} ${key}`);
    assert.match(row.quoteHref, /^\/contact\?/);
    assert.match(decodeURIComponent(row.quoteHref), /tool-grating-selector/);
  }
});

test("top opening is computed only for single square molded meshes", () => {
  assert.equal(squareMeshPitch("38.1 × 38.1 mm square mesh"), 38.1);
  assert.equal(squareMeshPitch("19.05 × 19.05 / 38.1 × 38.1 mm mini mesh"), null);
  assert.equal(squareMeshPitch("83 × 83 mm large-open mesh"), null);
  const row = rows.find((r) => r.group === "38.1 × 38.1 mm square mesh" && r.depthMm === 38);
  near(row.clearOpeningMm, 31.1); // 38.1 pitch − 7.0 top bar
  assert.ok(rows.filter((r) => r.family === "pultruded").every((r) => r.clearOpeningMm === null));
  assert.ok(rows.filter((r) => /mini mesh/.test(r.group)).every((r) => r.clearOpeningMm === null));
});

test("filters combine and unknown openings are excluded when an opening limit is set", () => {
  const deep = filterGratingRows(rows, { family: "pultruded", depthMin: 50 });
  assert.ok(deep.length > 0 && deep.every((r) => r.family === "pultruded" && r.depthMm >= 50));
  const open = filterGratingRows(rows, { family: "all", openMin: 80 });
  assert.ok(open.length > 0 && open.every((r) => r.openAreaPct >= 80));
  const small = filterGratingRows(rows, { family: "all", openingMax: 35 });
  assert.ok(small.length > 0 && small.every((r) => r.clearOpeningMm !== null && r.clearOpeningMm <= 35));
  assert.equal(filterGratingRows(rows, { family: "all" }).length, rows.length);
});

test("area weight converts kg and lb; selector has a cover", () => {
  const { kg, lb } = gratingAreaWeight(19.5, 100);
  near(kg, 1950);
  near(lb, 1950 / 0.45359237);
  near(1 * KG_M2_TO_LB_FT2, (1 / 0.45359237) * 0.3048 ** 2, 1e-5);
  assert.ok(toolCovers["/tools/frp-grating-selector"]);
});

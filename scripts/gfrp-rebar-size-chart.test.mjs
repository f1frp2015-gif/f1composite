import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { loadProjectModule } from "./load-project-module.mjs";

const rebar = loadProjectModule("lib/gfrpRebar.ts");
const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("the ASTM chart lists No. 2 to No. 10 with nominal values and calculated masses", () => {
  const rows = rebar.astmGfrpChartRows();
  assert.deepEqual(rows.map((row) => row.designation), ["No. 2", "No. 3", "No. 4", "No. 5", "No. 6", "No. 7", "No. 8", "No. 9", "No. 10"]);
  const no4 = rows[2];
  assert.equal(no4.areaMm2, 129);
  assert.equal(no4.areaIn2.toFixed(2), "0.20");
  assert.equal(no4.diameterIn.toFixed(3), "0.500");
  assert.deepEqual(rows.map((row) => row.diameterIn.toFixed(3)), ["0.250", "0.375", "0.500", "0.625", "0.750", "0.875", "1.000", "1.128", "1.270"]);
  assert.equal(no4.gfrpKgPerM.toFixed(3), "0.245");
  assert.equal(no4.steelLbPerFt.toFixed(2), "0.68");
  for (const row of rows) assert.ok(Math.abs(row.gfrpKgPerM / row.steelKgPerM - 1.9 / 7.85) < 1e-9);
});

test("the metric chart covers every F1 inquiry diameter", () => {
  const rows = rebar.metricGfrpChartRows();
  assert.deepEqual(rows.map((row) => row.diameterMm), [...rebar.F1_GFRP_DIAMETERS]);
  assert.equal(rows.find((row) => row.diameterMm === 12).closestAstm, "No. 4");
  assert.equal(rows.find((row) => row.diameterMm === 12).areaMm2, 113);
});

test("the chart page states its mass basis and links the rebar pages", () => {
  const page = read("app/resources/gfrp-rebar-size-chart/page.tsx");
  assert.match(page, /GFRP_CHART_DENSITY_GCM3/);
  assert.match(page, /dateModified: PAGE_UPDATED/);
  for (const href of ["/products/frp-rebar", "/tools/gfrp-rebar-calculator", "/resources/blog/fiberglass-rebar-cost-per-foot"]) {
    assert.ok(page.includes(href), `chart page does not link ${href}`);
  }
  for (const file of ["app/products/frp-rebar/page.tsx", "app/tools/gfrp-rebar-calculator/page.tsx"]) {
    assert.ok(read(file).includes("/resources/gfrp-rebar-size-chart"), `${file} does not link the size chart`);
  }
});

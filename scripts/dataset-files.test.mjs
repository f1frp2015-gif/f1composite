// Static CSV data files and their schema.org Dataset (lib/datasetFiles.ts).
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { loadProjectModule } from "./load-project-module.mjs";

const root = resolve(import.meta.dirname, "..");
const read = (file) => readFileSync(resolve(root, file), "utf8");
const { DATASET_FILES, datasetSchema } = loadProjectModule("lib/datasetFiles.ts");
const pageFile = (path) => `app${path}/page.tsx`;

test("each committed CSV matches the data it is built from", () => {
  for (const file of DATASET_FILES) {
    assert.match(file.path, /^\/downloads\/data\/[a-z0-9-]+\.csv$/);
    const out = resolve(root, `public${file.path}`);
    assert.ok(existsSync(out), `${file.path} missing: run node scripts/build-dataset-files.mjs`);
    assert.equal(readFileSync(out, "utf8"), file.csv(), `${file.path} is stale: run node scripts/build-dataset-files.mjs`);
  }
});

test("the span-table CSV has one row per published profile and every span", () => {
  const { buildSpanTables, SPANS_MM } = loadProjectModule("lib/spanTables.ts");
  const lines = DATASET_FILES.find((f) => f.id === "span-tables").csv().trim().split(/\r\n/);
  const rows = buildSpanTables().reduce((n, family) => n + family.rows.length, 0);
  assert.equal(lines.length, rows + 1);
  assert.equal(lines[0].split(",").length, 9 + SPANS_MM.length * 2);
});

test("each table page emits a Dataset whose distribution is its static CSV", () => {
  for (const file of DATASET_FILES) {
    const schema = datasetSchema(file.id);
    assert.equal(schema["@type"], "Dataset");
    assert.equal(schema.url, `https://www.f1composite.com${file.pagePath}`);
    assert.deepEqual(schema.distribution, [{ "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: `https://www.f1composite.com${file.path}` }]);
    assert.ok(schema.license && schema.creator && file.variableMeasured.length > 0);
    assert.match(read(pageFile(file.pagePath)), new RegExp(`datasetSchema\\("${file.id}"\\)`), `${file.pagePath} does not emit its Dataset`);
  }
});

test("download links point at the static files, not the /api route robots.txt blocks", () => {
  assert.doesNotMatch(read("components/sections/GratingBuyingGuide.tsx"), /\/api\/grating-specifications/);
  assert.match(read("app/frp-span-tables/page.tsx"), /datasetFile\("span-tables"\)\.path/);
  assert.match(read("app/resources/gfrp-rebar-size-chart/page.tsx"), /datasetFile\("gfrp-rebar-size-chart"\)\.path/);
});

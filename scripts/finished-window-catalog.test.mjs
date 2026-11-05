import test from "node:test";
import assert from "node:assert/strict";
import { loadProjectModule } from "./load-project-module.mjs";
const { finishedWindowSystems: systems } = loadProjectModule("content/data/finishedWindowSystems.ts");
const { buildWindowRfqHref } = loadProjectModule("lib/windowInquiry.ts");
const { assembleDocuments } = loadProjectModule("lib/documents.ts");
const { finishedWindowCatalogDownload } = loadProjectModule("content/data/downloads.ts");

// Independently transcribed from supplied product pages 10–20.
const expected = [
  ["pu-65", ["1.6/1.5", "1.35/1.3"], [8, 5, 7, 40]],
  ["pu-72", ["1.5/1.4", "1.4/1.3", "1.3/1.2"], [8, 5, 8, 40]],
  ["pu-83", ["1.4/1.3", "1.2/1.1", "1.0/0.9"], [8, 6, 8, 40]],
  ["pu-85", ["1.3/1.2", "1.15/1.05", "0.9/0.8"], [9, 6, 8, 42]],
  ["pu-95", ["1.1/1.0", "0.85/0.75"], [9, 6, 8, 42]],
  ["pu-103", ["0.8/0.7"], [9, 6, 8, 42]],
  ["pu-103-microvent", ["0.8/0.7"], [9, 6, 8, 42]],
  ["pu-114", ["0.9/0.8"], [9, 6, 8, 42]],
  ["pu-entry", ["0.8"], [9, 6, 8, 42]],
  ["pu-132", ["1.4/1.3"], [9, 5, 7, 40]],
  ["pu-145", ["1.3/1.2"], [9, 5, 7, 40]],
];
test("all eleven finished systems preserve source thermal pairs and physical classes", () => {
  assert.deepEqual(systems.map(s => s.id), expected.map(row => row[0]));
  assert.equal(systems.filter(s => s.kind === "window").length, 8);
  assert.equal(systems.filter(s => s.kind === "door").length, 3);
  for (const [id, values, [wind, water, air, sound]] of expected) {
    const system = systems.find(s => s.id === id);
    assert.deepEqual(system.glazing.map(row => row.uValue.replaceAll(" ", "")), values, id);
    assert.deepEqual(system.performance, { wind: `Class ${wind}`, water: `Class ${water}`, air: `Class ${air}`, sound: `>${sound} dB` }, id);
  }
});
test("finished catalogue selections survive the RFQ builder without colliding with profile series", () => {
  for (const system of systems) {
    const url = new URL(buildWindowRfqHref({ mode: "finished", series: system.id, productPath: "/products/fiberglass-windows-doors", source: "finished-window-series" }), "https://example.com");
    assert.equal(url.searchParams.get("window_series"), system.id);
    assert.equal(url.searchParams.get("window_mode"), "finished");
    assert.equal(url.searchParams.get("source"), "finished-window-series");
  }
});

test("finished catalogue remains published when database downloads replace fallback rows", () => {
  const databaseDocument = { title: "Project drawing template", format: "CSV", size: "Editable template", description: "Database-supplied document.", file: "/downloads/project-drawing-template.csv" };
  const documents = assembleDocuments([databaseDocument]);
  assert.equal(documents.filter(document => document.file === finishedWindowCatalogDownload.file).length, 1);
  assert.ok(documents.some(document => document.file === databaseDocument.file));
  assert.ok(documents.some(document => document.file === "/downloads/f1composite-frp-window-door-catalog.pdf"), "The separate profile catalogue must remain available.");
});

test("repeated database catalogue rows cannot duplicate or replace the published edition", () => {
  const staleRow = { ...finishedWindowCatalogDownload, title: "Outdated window catalog", description: "Stale database copy." };
  const matches = assembleDocuments([staleRow, { ...staleRow }, finishedWindowCatalogDownload])
    .filter(document => document.file === finishedWindowCatalogDownload.file);
  assert.equal(matches.length, 1);
  assert.equal(matches[0].title, finishedWindowCatalogDownload.title);
  assert.equal(matches[0].description, finishedWindowCatalogDownload.description);
});

test("finished catalogue is classified as a catalog for the finished-unit product route", () => {
  const document = assembleDocuments([]).find(item => item.file === finishedWindowCatalogDownload.file);
  assert.ok(document);
  assert.equal(document.type, "Catalog");
  assert.equal(document.product, "Finished fiberglass windows and doors");
  assert.equal(document.productHref, "/products/fiberglass-windows-doors");
  assert.equal(document.issuer, "F1 Composite");
  assert.equal(document.reference, undefined, "A product catalogue must not inherit a specimen test reference.");
});

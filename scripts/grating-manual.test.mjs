import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import { loadProjectModule } from "./load-project-module.mjs";
import { buildHtml, toc, MANUAL } from "./build-grating-manual.mjs";

const { gratingManual, fallbackDownloads } = loadProjectModule("content/data/downloads.ts");
const { classifyDocument, assembleDocuments } = loadProjectModule("lib/documents.ts");
const { moldedGratingSpecGroups, moldedAdditionalMeshFamilies } = loadProjectModule("content/data/moldedGratingSpecs.ts");
const { moldedAdditionalMeshSpecGroups } = loadProjectModule("content/data/moldedGratingAdditionalSpecs.ts");
const { pultrudedGratingSpecGroups } = loadProjectModule("content/data/pultrudedGratingSpecs.ts");
const html = buildHtml();
const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), "utf8");

test("the manual prints every molded and pultruded row of the site data", () => {
  const molded = [...moldedGratingSpecGroups, ...moldedAdditionalMeshSpecGroups];
  assert.equal(molded.reduce((n, g) => n + g.rows.length, 0), 49);
  for (const group of [...molded, ...pultrudedGratingSpecGroups]) assert.ok(html.includes((group.mesh ?? group.name).replace(/&/g, "&amp;")), group.mesh ?? group.name);
  for (const row of pultrudedGratingSpecGroups.flatMap((g) => g.rows)) assert.ok(html.includes(`<th scope="row">${row.type}`), row.type);
  assert.equal((html.match(/<tr><th scope="row">/g) ?? []).length >= 49 + 36, true);
});

test("the additional mesh rows agree with the families listed on the molded page", () => {
  assert.deepEqual(moldedAdditionalMeshSpecGroups.map((g) => g.mesh), moldedAdditionalMeshFamilies.map((f) => f.mesh));
  for (const family of moldedAdditionalMeshFamilies) {
    const group = moldedAdditionalMeshSpecGroups.find((g) => g.mesh === family.mesh);
    assert.deepEqual(group.rows.map((r) => r.depth.replace(" (HD)", " HD")).sort(), family.depths.replace(" mm", "").split(", ").sort(), family.mesh);
  }
});

test("the manual names no outside manufacturer and prints no load table", () => {
  for (const word of [/strongrate/i, /nantong/i, /STRONG(MESH|SPAN|SAFE|FIX)/, /FengDu/i, /Xianju/i]) assert.ok(!word.test(html), String(word));
  assert.ok(html.includes("does not print an allowable-load table"));
});

test("eight sections, published file and library entry", () => {
  assert.deepEqual(toc.map((t) => t.number), ["01", "02", "03", "04", "05", "06", "07", "08"]);
  assert.equal(gratingManual.file, MANUAL.file);
  assert.ok(fallbackDownloads.includes(gratingManual));
  const pdf = new URL(`../public${MANUAL.file}`, import.meta.url);
  assert.ok(statSync(pdf).size > 500_000);
  assert.equal((readFileSync(pdf).toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length, MANUAL.pages);
  assert.equal(classifyDocument(gratingManual).productHref, "/products/grating");
  assert.ok(assembleDocuments().some((d) => d.file === MANUAL.file));
  for (const page of ["app/products/grating/page.tsx", "app/products/molded-frp-grating/page.tsx", "app/products/frp-gratings/page.tsx"]) assert.ok(read(page).includes("gratingManual.file"), page);
});

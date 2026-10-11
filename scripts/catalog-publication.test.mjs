import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { loadProjectModule } from "./load-project-module.mjs";

const { buildPublishedCatalog } = loadProjectModule("lib/catalog/published.ts");
const { selectDatasheetConfigurations } = loadProjectModule("lib/catalog/datasheetSelection.ts");
const { finderRows } = loadProjectModule("lib/profileFinder.ts");
const { catalogRfqContext } = loadProjectModule("lib/catalog/identity.ts");
const { buildRfqHref, parseRfqFragment } = loadProjectModule("lib/rfq.ts");
const baseline = buildPublishedCatalog();
const tubes = baseline.profiles.filter((profile) => profile.category?.slug === "round-tube");

function databaseFixture(status = "active") {
  const tube = tubes[0];
  return {
    categories: [{ ...tube.category, id: 500 }],
    formulations: [{ ...tube.formulation, id: 600 }],
    products: [{ ...tube.product, id: 700, category_id: 500, formulation_id: 600, status }],
  };
}

test("all 17 tube configurations preserve identity, dimensions and mass through finder, PDF selection and RFQ", () => {
  assert.equal(tubes.length, 17);
  assert.equal(new Set(tubes.map((profile) => profile.sectionId)).size, 17);
  const rows = finderRows(baseline.profiles);
  for (const tube of tubes) {
    const row = rows.find((item) => item.configuration.sectionId === tube.sectionId);
    const [pdf] = selectDatasheetConfigurations(baseline, new URLSearchParams({ profiles: tube.catalogKey }));
    assert.deepEqual(row.dims, pdf.profile.product.geometry.dims);
    assert.equal(row.mass, pdf.configuration.publishedMassKgPerM);
    assert.deepEqual(row.configuration, tube.configuration);
    assert.equal(pdf.configuration.formulationCode, "E23-ISO");
    assert.notEqual(pdf.configuration.evidence.status, "direct-match");
    assert.deepEqual(pdf.configuration.evidence.matchedEvidenceIds, []);
    const url = new URL(buildRfqHref({ source: "test", context: catalogRfqContext([row.configuration]) }), "https://example.test");
    const snapshot = parseRfqFragment(url.hash).context.catalogSelections[0];
    assert.equal(snapshot.sectionId, tube.sectionId);
    assert.equal(snapshot.catalogRevision, baseline.revision);
    assert.equal(snapshot.formulationCode, "E23-ISO");
    assert.deepEqual(snapshot.dimensionsMm, tube.product.geometry.dims);
    assert.ok(parseRfqFragment(url.hash).context.unknowns.includes("quantity"));
  }
});

test("partial DB overlays every reader without dropping seed sizes or reviving deactivated tube IDs", () => {
  const input = databaseFixture();
  input.products[0].weight_per_m = 0.37;
  const catalog = buildPublishedCatalog(input);
  assert.equal(catalog.profiles.length, 114);
  const profile = catalog.profiles.find((item) => item.sectionId === tubes[0].sectionId);
  assert.equal(profile.product.weight_per_m, 0.37);
  assert.equal(finderRows(catalog.profiles).find((row) => row.configuration.sectionId === profile.sectionId).mass, 0.37);
  assert.notEqual(catalog.revision, baseline.revision);
  const inactive = buildPublishedCatalog(databaseFixture("inactive"));
  assert.equal(inactive.profiles.filter((item) => item.category?.slug === "round-tube").length, 16);
  assert.ok(!inactive.profiles.some((item) => item.sectionId === tubes[0].sectionId));
});

test("renaming a registered section keeps its internal reference and URL; changed geometry does not inherit its ID", () => {
  const input = databaseFixture();
  input.products[0].model = "Round tube commercial label";
  const renamed = buildPublishedCatalog(input).profiles.find((item) => item.source === "database");
  assert.equal(renamed.sectionId, tubes[0].sectionId);
  assert.equal(renamed.slug, tubes[0].slug);
  input.products[0].geometry = { kind: "parametric", shape: "tube", dims: { OD: 26, t: 3 } };
  const changed = buildPublishedCatalog(input);
  assert.equal(changed.profiles.find((item) => item.source === "database").sectionId, null);
  assert.equal(finderRows(changed.profiles).find((row) => row.model === input.products[0].model).dxf, false);
});

test("seed IDs never resolve legacy DB URLs and invalid explicit material selection never substitutes the default", () => {
  assert.throws(() => selectDatasheetConfigurations(baseline, new URLSearchParams({ ids: "1" })), /unknown|no longer/);
  for (const materialQuery of ["f=999999", "materials=NOT-A-MATERIAL", "materials="]) {
    assert.throws(() => selectDatasheetConfigurations(baseline, new URLSearchParams(`profiles=${tubes[0].catalogKey}&${materialQuery}`)), /No default has been substituted/);
  }
  const catalog = buildPublishedCatalog(databaseFixture());
  assert.equal(selectDatasheetConfigurations(catalog, new URLSearchParams({ ids: "700" }))[0].profile.sectionId, tubes[0].sectionId);
  assert.throws(() => selectDatasheetConfigurations(catalog, new URLSearchParams({ profiles: tubes[0].catalogKey, revision: "outdated" })), /catalog changed/);
});

test("alternative resin is an explicit reference and does not inherit default mass or a report match", () => {
  const params = new URLSearchParams({ profiles: tubes[0].catalogKey, materials: "VE-E23" });
  assert.throws(() => selectDatasheetConfigurations(baseline, params), /reference comparison mode/);
  params.set("reference", "1");
  const [selection] = selectDatasheetConfigurations(baseline, params);
  assert.equal(selection.configuration.formulationCode, "VE-E23");
  assert.equal(selection.configuration.publishedMassKgPerM, null);
  assert.equal(selection.configuration.evidence.status, "needs-review");
  assert.deepEqual(selection.configuration.evidence.matchedEvidenceIds, []);
  assert.ok(!selection.configuration.evidence.referenceEvidenceIds.some((id) => id.startsWith("sgs-e40")));
});

test("shared comparison state is present in initial server HTML, including both configuration snapshots", () => {
  const ProfileFinder = loadProjectModule("components/tools/ProfileFinder.tsx").default;
  const rows = finderRows(baseline.profiles);
  const selected = tubes.slice(0, 2);
  const html = renderToStaticMarkup(React.createElement(ProfileFinder, { rows, initialSearch: `cmp=${selected.map((item) => item.slug).join(",")}` }));
  assert.match(html, /Compare 2 sizes/);
  for (const profile of selected) assert.ok(html.includes(profile.sectionId));
  assert.ok(html.includes(baseline.revision));
  const rfq = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1].replaceAll("&amp;", "&")).find((href) => href.startsWith("/contact?") && href.includes("#context="));
  const snapshot = parseRfqFragment(new URL(rfq, "https://example.test").hash).context;
  assert.equal(snapshot.catalogSelections.length, 2);
  assert.deepEqual(snapshot.catalogSelections.map((item) => item.sectionId), selected.map((item) => item.sectionId));
});

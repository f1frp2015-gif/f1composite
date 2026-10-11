import test from "node:test";
import assert from "node:assert/strict";
import { loadProjectModule } from "./load-project-module.mjs";

const { machiningLimits } = loadProjectModule("lib/machiningTolerance.ts");
const { buildPublishedCatalog } = loadProjectModule("lib/catalog/published.ts");
const { catalogPublicPayload } = loadProjectModule("lib/catalog/publicPayload.ts");
const { buildPublicKnowledge } = loadProjectModule("lib/publicKnowledge.ts");
const { materialComparisonContext } = loadProjectModule("content/data/materialComparison.ts");
const { buildRfqHref, parseRfqFragment } = loadProjectModule("lib/rfq.ts");

test("drawing limits preserve bilateral and unilateral requirements", () => {
  assert.deepEqual(machiningLimits(100, -0.5, 0.5), { lower: 99.5, upper: 100.5, band: 1 });
  assert.deepEqual(machiningLimits(100, -0.1, 0), { lower: 99.9, upper: 100, band: 0.1 });
  assert.deepEqual(machiningLimits(12.5, 0, 0.2), { lower: 12.5, upper: 12.7, band: 0.2 });
  assert.equal(machiningLimits(100000, 0, 1e-9), null);
  for (const args of [[NaN, 0, 1], [100, -Infinity, 1], [0, 0, 1], [-1, 0, 1], [10, 0.2, -0.2], [10, -10, 0], [100001, 0, 1], [10, -1, Infinity]]) assert.equal(machiningLimits(...args), null);
});

test("machining RFQ preserves requirement status and datum text in a fragment", () => {
  const context = { version: "machining-requirement-v1", status: "buyer-request-unconfirmed", feature: "Hole diameter", units: "mm", nominal: 12.5, lowerDeviation: 0, upperDeviation: 0.2, limits: machiningLimits(12.5, 0, 0.2), datum: "A / B / C; after coating" };
  const message = "Required fit only, pending feasibility.\nDrawing revision: A & B";
  const url = new URL(buildRfqHref({ source: "machining-tolerance-planner", context, message }), "https://www.f1composite.com");
  assert.equal(url.searchParams.has("message"), false);
  assert.deepEqual(parseRfqFragment(url.hash), { context, message });
});

test("AI knowledge and the catalog share identities, evidence and live-overlay revision", () => {
  const baseline = buildPublishedCatalog();
  const first = baseline.profiles[0];
  const database = {
    categories: [{ ...first.category, id: 501 }],
    formulations: [{ ...first.formulation, id: 601 }],
    products: [{ ...first.product, id: 701, category_id: 501, formulation_id: 601, weight_per_m: 9.876 }],
  };
  for (const catalog of [baseline, buildPublishedCatalog(database)]) {
    const publicFeed = catalogPublicPayload(catalog);
    const knowledge = buildPublicKnowledge(catalog);
    assert.deepEqual(knowledge.catalogDiscovery.snapshot, publicFeed);
    assert.equal(knowledge.catalogDiscovery.snapshot.revision, catalog.revision);
    for (const product of publicFeed.products) {
      assert.equal(product.configuration.catalogRevision, catalog.revision);
      assert.ok(product.configuration.evidence.status);
      assert.equal(product.configuration.supplyStatus, "confirm-with-engineering");
    }
    assert.deepEqual(knowledge.materialComparison, materialComparisonContext);
    assert.equal(knowledge.productFamilies.find(f => f.id === "standard-profiles").sizeRange, undefined);
  }
  assert.notEqual(buildPublishedCatalog(database).revision, baseline.revision);
});

test("deactivated profiles stay absent from both catalog and AI snapshot", () => {
  const seed = buildPublishedCatalog();
  const first = seed.profiles[0];
  const catalog = buildPublishedCatalog({ categories: [{ ...first.category, id: 501 }], formulations: [{ ...first.formulation, id: 601 }], products: [{ ...first.product, id: 701, category_id: 501, formulation_id: 601, status: "inactive" }] });
  assert.ok(!catalogPublicPayload(catalog).products.some(p => p.key === first.catalogKey));
  assert.ok(!buildPublicKnowledge(catalog).catalogDiscovery.snapshot.products.some(p => p.key === first.catalogKey));
});

import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { loadProjectModule } from "./load-project-module.mjs";

const { engineeringEvidence } = loadProjectModule("content/data/engineeringEvidence.ts");
const { assessCatalogEvidence, assessDocumentApplicability, documentScope, parseCatalogEvidenceTarget } = loadProjectModule("content/data/evidenceApplicability.ts");
const today = "2026-10-11";
const tube = { sectionId: "f1-section-rt-001", categorySlug: "round-tube", formulationCode: "E23-ISO" };

test("all public documents retain original files, holders and explicit unverified catalog bindings", () => {
  assert.equal(engineeringEvidence.length, 13);
  for (const record of engineeringEvidence) {
    const scope = documentScope(record);
    assert.equal(scope.evidenceId, record.id);
    assert.equal(scope.catalogBinding, "not-verified");
    assert.ok(scope.holder && scope.scope);
    assert.ok(existsSync(join(import.meta.dirname, "../public", record.file)), record.file);
    if (record.kind !== "Technical reference") assert.ok(scope.issued || scope.validUntil, record.id);
  }
});

test("catalog material changes cannot inherit specimen or fire certification", () => {
  const standard = assessCatalogEvidence(tube);
  const changed = assessCatalogEvidence({ ...tube, formulationCode: "VE-E23" });
  assert.equal(standard.status, "reference-only");
  assert.equal(changed.status, "needs-review");
  assert.deepEqual(standard.matchedEvidenceIds, []);
  assert.deepEqual(changed.matchedEvidenceIds, []);
  assert.deepEqual(changed.referenceEvidenceIds, ["structural-design"]);
});

test("missing identity, missing and unknown material remain unconfirmed", () => {
  for (const input of [{ ...tube, sectionId: null }, { ...tube, formulationCode: null }, { ...tube, formulationCode: "UNAPPROVED-RESIN" }]) {
    assert.equal(assessCatalogEvidence(input).status, "needs-review");
  }
  assert.equal(assessCatalogEvidence({ ...tube, categorySlug: "windows" }).status, "no-public-evidence");
});

const checks = [
  ["manual provides a reference for a round tube", "structural-design", tube, "reference-only"],
  ["square-tube modulus does not verify round tubes", "sgs-e40-cm01", tube, "not-applicable"],
  ["even the square-tube family needs specimen reconciliation", "sgs-e40-cm02", { ...tube, categorySlug: "square-tube", formulationCode: "E40" }, "needs-review"],
  ["PHI 90 cannot cover 80 series", "phi-2491wi03", { windowSeries: "80" }, "not-applicable"],
  ["PHI 90 alone does not establish glazing and climate equivalence", "phi-2491wi03", { windowSeries: "90" }, "needs-review"],
  ["a window certificate does not cover a tube", "phi-2491wi03", tube, "not-applicable"],
  ["historical lift-sliding does not cover compression-seal", "intertek-sliding", { windowSeries: "140", openingType: "compression-seal" }, "not-applicable"],
  ["a matching opening still requires specimen review", "intertek-sliding", { windowSeries: "140", openingType: "lift-sliding" }, "needs-review"],
  ["turn-and-tilt report does not cover another opening", "intertek-turn-tilt", { windowSeries: "80", openingType: "sliding" }, "not-applicable"],
  ["10.1 mm UL94 specimen cannot verify a thin wall", "sgs-gzmr260702529004", { materialCode: "E-TS-AB", thicknessMm: 3 }, "not-applicable"],
  ["UL94 identity and thickness still need material confirmation", "sgs-gzmr260702529004", { materialCode: "E-TS-AB", thicknessMm: 10.1 }, "needs-review"],
  ["UL94 named material does not verify another resin", "sgs-gzmr260702529004", { materialCode: "VE-E23", thicknessMm: 10.1 }, "not-applicable"],
  ["coating report does not transfer to another coating", "tuv-cn24kz3a-002", { coating: "B9986S" }, "not-applicable"],
  ["matching coating alone needs complete frame verification", "tuv-cn24kz3a-003", { coating: "B9986S" }, "needs-review"],
  ["PV material report does not cover the tube catalog", "cpvt-2025dacs20319", tube, "not-applicable"],
  ["PU data cannot supply a VE material value", "pu-gf-data", { ...tube, formulationCode: "VE-E23" }, "not-applicable"],
  ["PU data is a material reference rather than a section approval", "pu-gf-data", { ...tube, formulationCode: "PU-E23" }, "reference-only"],
  ["blade laminate does not verify structural tubing", "wind-laminate", tube, "not-applicable"],
];
for (const [name, id, target, status] of checks) test(name, () => {
  assert.equal(assessDocumentApplicability(id, target, today).status, status);
});

test("expired certificate is flagged without altering the original document", () => {
  assert.equal(assessDocumentApplicability("phi-2491wi03", { windowSeries: "90" }, "2026-12-31").status, "needs-review");
  assert.equal(assessDocumentApplicability("phi-2491wi03", { windowSeries: "90" }, "2027-01-01").status, "expired");
});

test("unknown document and unsafe shared selection cannot acquire evidence", () => {
  assert.equal(assessDocumentApplicability("invented", tube, today).status, "not-applicable");
  assert.equal(parseCatalogEvidenceTarget({ category: ["round-tube", "windows"] }), null);
  assert.deepEqual(parseCatalogEvidenceTarget({ category: "round-tube", section: "<script>", formulation: "VE-E23" }), { categorySlug: "round-tube", sectionId: null, formulationCode: "VE-E23" });
  assert.deepEqual(parseCatalogEvidenceTarget({ category: "round-tube", section: "catalog:rt-01", formulation: "UNKNOWN" }), { categorySlug: "round-tube", sectionId: "catalog:rt-01", formulationCode: "UNKNOWN" });
});

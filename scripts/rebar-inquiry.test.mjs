import test from "node:test";
import assert from "node:assert/strict";
import { loadProjectModule } from "./load-project-module.mjs";
const { emptyRebarInquiry, emptyRebarLine, parseRebarInquiry, rebarInquirySummary, buildRebarRfqHref } = loadProjectModule("lib/rebarInquiry.ts");

test("mixed schedule keeps dimensional and quantity units with each supply form", () => {
  const inquiry = emptyRebarInquiry("quote");
  inquiry.lines = [
    { ...emptyRebarLine(), mark: "B01", diameter: "#4", length: "20", lengthUnit: "ft", quantity: "100" },
    { ...emptyRebarLine("bends"), diameter: "10 mm", length: "999", quantity: "40", details: "200 × 300 mm inside; R40; drawing C" },
    { ...emptyRebarLine("mesh"), diameter: "8 / 8 mm", quantity: "12", details: "150 × 150 mm centers; 2 × 3 m sheets" },
  ];
  const parsed = parseRebarInquiry(inquiry);
  assert.equal(parsed.lines[0].lengthUnit, "ft");
  assert.equal(parsed.lines[1].length, "");
  assert.equal(parsed.lines[2].quantityUnit, "sheets");
  const summary = rebarInquirySummary(parsed);
  for (const text of ["20 ft", "100 pieces", "R40", "12 sheets", "150 × 150 mm"]) assert.ok(summary.includes(text));
});

test("early-stage technical inquiries accept unknown specifications", () => {
  const parsed = parseRebarInquiry(emptyRebarInquiry("technical"));
  assert.deepEqual(parsed.lines, []);
  assert.match(rebarInquirySummary(parsed), /Technical review/);
  assert.match(rebarInquirySummary(parsed), /To be confirmed/);
});

test("malformed schedules and unsafe or ambiguous quantities cannot reach delivery", () => {
  const base = emptyRebarInquiry("quote", "straight");
  for (const quantity of ["-2", "0", "1.5", "Infinity", "1e4", "1000000001"]) {
    assert.throws(() => parseRebarInquiry({ ...base, lines: [{ ...base.lines[0], quantity }] }));
  }
  for (const raw of [[], { ...base, stage: "__proto__" }, { ...base, lines: Array(21).fill(base.lines[0]) }, { ...base, documents: "x".repeat(1001) }, { ...base, lines: [{ ...base.lines[0], lengthUnit: "unknown" }] }]) assert.throws(() => parseRebarInquiry(raw));
  assert.equal(parseRebarInquiry(null), null);
  assert.equal(parseRebarInquiry({ ...base, lines: [{ ...base.lines[0], quantity: "1.5", quantityUnit: "metres" }] }).lines[0].quantity, "1.5");
});

test("RFQ URLs carry intent but never the private schedule", () => {
  for (const stage of ["quote", "technical", "sample", "distributor"]) {
    const url = new URL(buildRebarRfqHref(stage, "mesh", true), "https://www.f1composite.com");
    assert.equal(url.pathname, "/contact");
    assert.equal(url.searchParams.get("rebar_stage"), stage);
    assert.equal(url.searchParams.get("rebar_form"), "mesh");
    assert.equal(url.searchParams.get("rebar_draft"), "1");
    assert.equal(url.searchParams.has("message"), false);
    assert.equal(url.searchParams.has("lines"), false);
  }
});

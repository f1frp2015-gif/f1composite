import test from "node:test";
import assert from "node:assert/strict";
import { loadProjectModule } from "./load-project-module.mjs";

const { equalStiffnessExample: input, equalStiffnessResults: result } = loadProjectModule("content/data/materialComparison.ts");

test("published beam example matches bending stiffness and keeps GPa/mm units consistent", () => {
  const steelEI = input.steelModulusGPa * input.steelInertiaMm4;
  const frpEI = input.frpModulusGPa * result.requiredFrpInertiaMm4;
  assert.ok(Math.abs(frpEI / steelEI - 1) < 1e-12);
  // Independently evaluated 3 m beam, 1 kN/m, E = 200 GPa, I = 1e6 mm4.
  assert.ok(Math.abs(result.steelBendingDeflectionMm - 5.2734375) < 1e-9);
  assert.ok(Math.abs(result.sameSectionFrpBendingDeflectionMm / result.steelBendingDeflectionMm - result.inertiaRatio) < 1e-12);
  const matchingFrpDeflection = result.sameSectionFrpBendingDeflectionMm * input.steelInertiaMm4 / result.requiredFrpInertiaMm4;
  assert.ok(Math.abs(matchingFrpDeflection - result.steelBendingDeflectionMm) < 1e-12);
});

test("life-cycle RFQ retains full assumptions in the fragment without exposing them in the HTTP query", () => {
  const { lifeCycleCostRfqHref } = loadProjectModule("lib/lifeCycleCostInquiry.ts");
  const { parseRfqFragment } = loadProjectModule("lib/rfq.ts");
  const { lifeCycleCostExample } = loadProjectModule("content/data/lifeCycleCostExample.ts");
  const input = { ...lifeCycleCostExample, residualValue: false, downtimePerEvent: 7.5, frp: { ...lifeCycleCostExample.frp, initial: 173.25, annualCost: 2.5 } };
  const steelBasis = { steelType: "galvanized", corrosivity: "C4", coatingMicrons: 70 };
  const summary = "Chosen quote assumptions: 173.25; review required.";
  const url = new URL(lifeCycleCostRfqHref(input, steelBasis, summary), "https://www.f1composite.com");
  assert.equal(url.searchParams.has("message"), false);
  assert.equal(url.searchParams.has("context"), false);
  assert.ok(!url.search.includes("173.25"));
  const prefill = parseRfqFragment(url.hash);
  assert.equal(prefill.error, undefined);
  assert.equal(prefill.context.status, "user-assumptions-unverified");
  assert.deepEqual(prefill.context.input, input);
  assert.deepEqual(prefill.context.steelBasis, steelBasis);
  assert.ok(prefill.message.startsWith(summary));
  const other = new URL(lifeCycleCostRfqHref(input, { ...steelBasis, steelType: "other" }, summary), url.origin);
  assert.deepEqual(parseRfqFragment(other.hash).context.steelBasis, { steelType: "other" });
});

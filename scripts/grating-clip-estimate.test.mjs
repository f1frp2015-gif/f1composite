import assert from "node:assert/strict";
import test from "node:test";
import { loadProjectModule } from "./load-project-module.mjs";

const { estimateGratingClips } = loadProjectModule("lib/gratingClipEstimate.ts");

test("clip estimate applies the published starting layout minimums and spacing", () => {
  // 1220 mm along a support at <=1200 mm spacing with clips at both ends: 3 per line.
  const molded = estimateGratingClips({ family: "molded", panels: 10, widthAlongSupportMm: 1220, supportLinesPerPanel: 2, jointLengthMm: 12000 });
  assert.equal(molded.holdDownsPerSupportLine, 3);
  assert.equal(molded.holdDownsPerPanel, 6);
  assert.equal(molded.holdDownsTotal, 60);
  assert.deepEqual(molded.connectors, { low: 15, high: 21 });

  // Short panel on one support line still gets the 2-per-line and 4-per-panel minimums.
  const small = estimateGratingClips({ family: "pultruded", panels: 1, widthAlongSupportMm: 600, supportLinesPerPanel: 1, jointLengthMm: 5000 });
  assert.equal(small.holdDownsPerSupportLine, 2);
  assert.equal(small.holdDownsPerPanel, 4);
  assert.equal(small.connectors, null, "C connectors are molded-only");
});

test("clip estimate rejects empty layouts instead of returning zero clips", () => {
  assert.equal(estimateGratingClips({ family: "molded", panels: 0, widthAlongSupportMm: 1000, supportLinesPerPanel: 2, jointLengthMm: 0 }), null);
  assert.equal(estimateGratingClips({ family: "molded", panels: 2, widthAlongSupportMm: 0, supportLinesPerPanel: 2, jointLengthMm: 0 }), null);
});

import test from "node:test";
import assert from "node:assert/strict";

import { findStandardProfile } from "../lib/catalog/standardProfiles.ts";
import { getSectionDimensionError } from "../lib/frpSectionProperties.ts";
import { getPriceGeometryError } from "../lib/pricing/geometry.ts";
import { calcWindowUw } from "../lib/windowUValue.ts";

test("structural screen rejects non-positive and impossible sections", () => {
  assert.match(getSectionDimensionError("i-beam", 200, 100, 10, 100), /2·tf/);
  assert.match(getSectionDimensionError("square-tube", 10, 10, 5, 5), /2·t/);
  assert.match(getSectionDimensionError("round-tube", 50, 50, -1, 5), /greater than zero/);
  assert.equal(getSectionDimensionError("i-beam", 152, 76, 6.4, 6.4), null);
});

test("price geometry rejects wall dimensions that cannot exist", () => {
  assert.match(getPriceGeometryError({ type: "square", side: 10, t: 50 }), /2·t/);
  assert.match(getPriceGeometryError({ type: "rect", w: 100, h: 20, t: 10 }), /2·t/);
  assert.match(getPriceGeometryError({ type: "i_beam", h: 40, bf: 20, tf: 20, tw: 2 }), /2·tf/);
  assert.equal(getPriceGeometryError({ type: "round", od: 50, id: 40 }), null);
});

test("exact standard sections resolve the published catalog mass", () => {
  const match = findStandardProfile({ shape: "i-beam", h: 152, b: 76, tw: 6.4, tf: 6.4 });
  assert.equal(match?.model, "I 152×76×6.4");
  assert.equal(match?.weight, 2.9);
  assert.equal(findStandardProfile({ shape: "i-beam", h: 152, b: 80, tw: 6.4, tf: 6.4 }), null);
});

test("PHI 2491wi03 locked reference reproduces certified Uw after rounding", () => {
  const result = calcWindowUw(1230, 1480, 109, 0.78, 0.70, 0.023, 0);
  assert.ok(result);
  assert.equal(result.Uw.toFixed(2), "0.78");
});

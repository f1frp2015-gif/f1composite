import test from "node:test";
import assert from "node:assert/strict";
import { calculateDensity, densityFactors } from "../lib/frpDensity.ts";
const input = {
  shape: "rect-tube",
  h: 50,
  b: 50,
  t: 5,
  tf: 5,
  area: 900,
  length: 6,
  quantity: 10,
  mode: "weight",
  density: 1.9,
  densityUnit: "g/cm³",
  mass: 10.26,
};
const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} != ${b}`);
test("hollow tube example and single sample reverse calculation", () => {
  const r = calculateDensity(input);
  near(r.area, 900);
  near(r.kgPerM, 1.71);
  near(r.pieceKg, 10.26);
  near(r.totalKg, 102.6);
  const reverse = calculateDensity({
    ...input,
    mode: "density",
    quantity: 100,
  });
  near(reverse.densityKg, 1900);
  near(reverse.totalKg, 1026);
});
test("equivalent density units preserve mass", () => {
  for (const [densityUnit, factor] of Object.entries(densityFactors))
    near(
      calculateDensity({ ...input, densityUnit, density: 1900 / factor })
        .totalKg,
      102.6,
    );
});
test("independent known section areas", () => {
  const cases = [
    ["round-tube", 225 * Math.PI],
    ["rod", 625 * Math.PI],
    ["flat", 2500],
    ["angle", 475],
    ["channel", 700],
    ["i-beam", 700],
    ["custom", 900],
  ];
  for (const [shape, area] of cases)
    near(calculateDensity({ ...input, shape }).area, area);
  near(
    calculateDensity({
      ...input,
      shape: "i-beam",
      h: 200,
      b: 100,
      t: 8,
      tf: 10,
    }).area,
    3440,
  );
});
test("reject invalid geometry, blanks, non-finite values, overflow and fractional quantity", () => {
  for (const change of [
    { t: 25 },
    { shape: "round-tube", t: 25 },
    { shape: "angle", t: 50 },
    { shape: "channel", tf: 25 },
    { shape: "i-beam", t: 50 },
    { h: 0 },
    { density: 0 },
    { length: -1 },
    { quantity: 1.2 },
    { area: NaN, shape: "custom" },
    { mass: 0, mode: "density" },
    { density: Infinity },
    { shape: "flat", h: 1e308, b: 1e308 },
  ])
    assert.ok(
      calculateDensity({ ...input, ...change }).error,
      JSON.stringify(change),
    );
});

const { calculateMixture, exampleRecipe } =
  await import("../lib/frpMixture.ts");
test("weight-fraction inverse mixture and explicit void adjustment", () => {
  const r = calculateMixture(exampleRecipe, "weight", "2");
  near(r.theoretical, 1 / (0.7 / 2.54 + 0.3 / 1.2));
  near(r.adjusted, r.theoretical * 0.98);
  near(
    r.fractions.reduce((sum, x) => sum + x.solidVolumePercent, 0),
    100,
  );
  const volumeRows = exampleRecipe.map((row, i) => ({
    ...row,
    percent: String(r.fractions[i].solidVolumePercent),
  }));
  const v = calculateMixture(volumeRows, "volume", "2");
  near(v.theoretical, r.theoretical);
  near(v.adjusted, r.adjusted);
});
test("same glass content gives same density regardless of architecture split", () => {
  const rows = exampleRecipe.map((row, i) => ({
    ...row,
    percent: i === 0 ? "70" : i === 1 || i === 2 ? "0" : row.percent,
  }));
  near(
    calculateMixture(rows, "weight", "0").theoretical,
    calculateMixture(exampleRecipe, "weight", "0").theoretical,
  );
});
test("reject invalid formulation and void values; ignore inactive density", () => {
  for (const [rows, voids] of [
    [[], "0"],
    [exampleRecipe.slice(1), "0"],
    [exampleRecipe, ""],
    [exampleRecipe, "100"],
    [exampleRecipe, "-1"],
    [exampleRecipe.map((x, i) => (i === 0 ? { ...x, density: "0" } : x)), "0"],
    [exampleRecipe.map((x, i) => (i === 0 ? { ...x, percent: "" } : x)), "0"],
  ])
    assert.ok(calculateMixture(rows, "weight", voids).error);
  assert.ok(
    !calculateMixture(
      exampleRecipe.map((x, i) => (i === 4 ? { ...x, density: "" } : x)),
      "weight",
      "0",
    ).error,
  );
});

const { calculateLayup, sectionPerimeters, exampleLayers, exampleRovings } =
  await import("../lib/frpLayup.ts");
test("GSM, surface paths, local strip and tex volume balance reproduce hand calculation", () => {
  const p = sectionPerimeters("rect-tube", 50, 50, 5);
  assert.deepEqual(p, { outer: 200, inner: 160 });
  const r = calculateLayup(900, p, exampleLayers, exampleRovings, "1.2", "0");
  near(r.reinforcementGrams, 1170);
  near(r.reinforcementArea, 1170 / 2.54);
  near(r.matrixArea, 900 - 1170 / 2.54);
  near(r.kgPerM, (1170 + (900 - 1170 / 2.54) * 1.2) / 1000);
  near(r.density, r.kgPerM / 0.0009 / 1000);
});
test("layer coverage, overlap, repeats and feed factor retain mass once", () => {
  const r = calculateLayup(
    900,
    { outer: 200, inner: 160 },
    [
      {
        ...exampleLayers[0],
        coverage: "50",
        overlap: "10",
        layers: "2",
        factor: "1.1",
      },
    ],
    [],
    "1.2",
    "2",
  );
  near(r.reinforcementGrams, 450 * 0.11 * 2 * 1.1);
  near(r.voidArea, 18);
  near(r.matrixArea + r.reinforcementArea + r.voidArea, 900);
});
test("reject impossible packed section and missing inner surface; custom CAD paths work", () => {
  assert.ok(
    calculateLayup(
      100,
      { outer: 200, inner: 160 },
      exampleLayers,
      exampleRovings,
      "1.2",
      "0",
    ).error,
  );
  assert.ok(
    calculateLayup(900, { outer: 200, inner: 0 }, exampleLayers, [], "1.2", "0")
      .error,
  );
  assert.ok(
    !calculateLayup(
      900,
      { outer: 0, inner: 0 },
      [{ ...exampleLayers[0], path: "custom", width: "185" }],
      [],
      "1.2",
      "0",
    ).error,
  );
  assert.ok(
    calculateLayup(
      900,
      { outer: 200, inner: 160 },
      [{ ...exampleLayers[0], layers: "1.5" }],
      [],
      "1.2",
      "0",
    ).error,
  );
});

test("weight per meter conversion preserves linear mass", async () => {
  const { weightPerMeterFactors } = await import("../lib/frpDensity.ts");
  near(1.71 * weightPerMeterFactors["g/m"], 1710);
  near(1.71 * weightPerMeterFactors["lb/ft"], (1.71 / 0.45359237) * 0.3048);
});

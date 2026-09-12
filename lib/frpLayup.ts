import type { DensityShape } from "./frpDensity";
export interface LayupLayer {
  name: string;
  gsm: string;
  path: "outer" | "inner" | "custom";
  width: string;
  coverage: string;
  overlap: string;
  layers: string;
  factor: string;
  density: string;
}
export interface RovingGroup {
  tex: string;
  ends: string;
  factor: string;
  density: string;
}
export const exampleLayers: LayupLayer[] = [
  {
    name: "Outer glass mat",
    gsm: "450",
    path: "outer",
    width: "200",
    coverage: "100",
    overlap: "0",
    layers: "1",
    factor: "1",
    density: "2.54",
  },
  {
    name: "Inner glass mat",
    gsm: "450",
    path: "inner",
    width: "160",
    coverage: "100",
    overlap: "0",
    layers: "1",
    factor: "1",
    density: "2.54",
  },
  {
    name: "Local glass fabric",
    gsm: "600",
    path: "custom",
    width: "80",
    coverage: "100",
    overlap: "0",
    layers: "1",
    factor: "1",
    density: "2.54",
  },
];
export const exampleRovings: RovingGroup[] = [
  { tex: "2400", ends: "400", factor: "1", density: "2.54" },
];
export function sectionPerimeters(
  shape: DensityShape,
  h: number,
  b: number,
  t: number,
) {
  switch (shape) {
    case "rect-tube":
      return { outer: 2 * (h + b), inner: 2 * (h + b - 4 * t) };
    case "round-tube":
      return { outer: Math.PI * h, inner: Math.PI * (h - 2 * t) };
    case "rod":
      return { outer: Math.PI * h, inner: 0 };
    case "flat":
    case "angle":
      return { outer: 2 * (h + b), inner: 0 };
    case "channel":
    case "i-beam":
      return { outer: 2 * h + 4 * b - 2 * t, inner: 0 };
    default:
      return { outer: 0, inner: 0 };
  }
}
export function calculateLayup(
  area: number,
  perimeters: { outer: number; inner: number },
  layers: LayupLayer[],
  rovings: RovingGroup[],
  matrixDensity: string,
  voids: string,
) {
  const valid = (v: string, min: number, inclusive = false) =>
    v.trim() !== "" &&
    Number.isFinite(Number(v)) &&
    (inclusive ? Number(v) >= min : Number(v) > min);
  if (!Number.isFinite(area) || area <= 0)
    return { error: "Enter a valid net section area first." };
  if (
    !valid(matrixDensity, 0) ||
    !valid(voids, 0, true) ||
    Number(voids) >= 100
  )
    return {
      error:
        "Enter a positive cured matrix density and void volume from 0% to less than 100%.",
    };
  const breakdown: {
    name: string;
    grams: number;
    area: number;
    width?: number;
  }[] = [];
  for (const [i, row] of layers.entries()) {
    if (
      ![row.gsm, row.layers, row.factor, row.density].every((v) =>
        valid(v, 0),
      ) ||
      !valid(row.coverage, 0) ||
      Number(row.coverage) > 100 ||
      !valid(row.overlap, 0, true) ||
      !Number.isSafeInteger(Number(row.layers))
    )
      return {
        error: `Layer ${i + 1}: enter positive GSM, whole layer count, consumption factor and density; coverage must be 0–100% (excluding 0).`,
      };
    const base =
      row.path === "custom"
        ? valid(row.width, 0)
          ? Number(row.width)
          : NaN
        : perimeters[row.path];
    if (!Number.isFinite(base) || base <= 0)
      return {
        error: `Layer ${i + 1}: this perimeter is unavailable. Use a measured developed width for this path.`,
      };
    const width = (base * Number(row.coverage)) / 100 + Number(row.overlap);
    const grams =
      ((Number(row.gsm) * width) / 1000) *
      Number(row.layers) *
      Number(row.factor);
    breakdown.push({
      name: row.name || `Layer ${i + 1}`,
      grams,
      area: grams / Number(row.density),
      width,
    });
  }
  for (const [i, row] of rovings.entries()) {
    if (
      ![row.tex, row.factor, row.density].every((v) => valid(v, 0)) ||
      !valid(row.ends, 0, true) ||
      !Number.isSafeInteger(Number(row.ends))
    )
      return {
        error: `Roving group ${i + 1}: enter positive tex, factor and density, and a non-negative whole end count.`,
      };
    const grams =
      (Number(row.tex) * Number(row.ends) * Number(row.factor)) / 1000;
    breakdown.push({
      name: `Roving group ${i + 1}`,
      grams,
      area: grams / Number(row.density),
    });
  }
  const reinforcementArea = breakdown.reduce((sum, row) => sum + row.area, 0);
  const reinforcementGrams = breakdown.reduce((sum, row) => sum + row.grams, 0);
  const voidArea = (area * Number(voids)) / 100;
  const matrixArea = area - voidArea - reinforcementArea;
  if (matrixArea <= 0)
    return {
      error:
        "Reinforcement and void volume fill or exceed the net section. No resin volume remains; check layer widths, counts, tex and area.",
    };
  const matrixGrams = matrixArea * Number(matrixDensity);
  const grams = reinforcementGrams + matrixGrams;
  if (
    ![reinforcementArea, reinforcementGrams, matrixGrams, grams].every(
      Number.isFinite,
    )
  )
    return { error: "These inputs exceed the calculation range." };
  return {
    density: grams / area,
    kgPerM: grams / 1000,
    reinforcementArea,
    reinforcementGrams,
    matrixArea,
    matrixGrams,
    voidArea,
    reinforcementWeightPercent: (reinforcementGrams / grams) * 100,
    reinforcementVolumePercent: (reinforcementArea / area) * 100,
    breakdown,
  };
}

export type DensityShape =
  | "rect-tube"
  | "round-tube"
  | "rod"
  | "flat"
  | "angle"
  | "channel"
  | "i-beam"
  | "custom";
export type DensityUnit = "g/cm³" | "kg/m³" | "lb/in³";
export const densityFactors: Record<DensityUnit, number> = {
  "g/cm³": 1000,
  "kg/m³": 1,
  "lb/in³": 27679.904710203125,
};
export interface DensityInput {
  shape: DensityShape;
  h: number;
  b: number;
  t: number;
  tf: number;
  area: number;
  length: number;
  quantity: number;
  mode: "weight" | "density";
  density: number;
  densityUnit: DensityUnit;
  mass: number;
}
export function calculateDensity(input: DensityInput) {
  const { shape, h, b, t, tf, length, quantity, mode, mass } = input;
  const positive = (values: number[]) =>
    values.every((v) => Number.isFinite(v) && v > 0);
  const dimensions =
    shape === "custom"
      ? [input.area]
      : shape === "rod"
        ? [h]
        : shape === "round-tube"
          ? [h, t]
          : shape === "flat"
            ? [h, b]
            : shape === "channel" || shape === "i-beam"
              ? [h, b, t, tf]
              : [h, b, t];
  if (!positive(dimensions))
    return {
      error: "Enter a positive, finite value for every section dimension.",
    };
  if (!positive([length]) || !Number.isSafeInteger(quantity) || quantity < 1)
    return {
      error:
        "Length must be positive and quantity must be a positive whole number.",
    };
  if (shape === "rect-tube" && 2 * t >= Math.min(h, b))
    return {
      error:
        "Twice the wall thickness must be less than both outside dimensions.",
    };
  if (shape === "round-tube" && 2 * t >= h)
    return {
      error: "Twice the wall thickness must be less than the outside diameter.",
    };
  if (shape === "angle" && t >= Math.min(h, b))
    return { error: "Thickness must be less than both angle legs." };
  if ((shape === "channel" || shape === "i-beam") && (2 * tf >= h || t >= b))
    return {
      error:
        "Twice the flange thickness must be less than height; web thickness must be less than width.",
    };
  let area: number;
  switch (shape) {
    case "rect-tube":
      area = 2 * t * (h + b - 2 * t);
      break;
    case "round-tube":
      area = Math.PI * t * (h - t);
      break;
    case "rod":
      area = (Math.PI * h * h) / 4;
      break;
    case "flat":
      area = h * b;
      break;
    case "angle":
      area = t * (h + b - t);
      break;
    case "channel":
    case "i-beam":
      area = 2 * b * tf + (h - 2 * tf) * t;
      break;
    case "custom":
      area = input.area;
      break;
    default:
      return { error: "Choose a supported section shape." };
  }
  if (!positive([mode === "weight" ? input.density : mass]))
    return {
      error:
        mode === "weight"
          ? "Enter a positive, finite material density."
          : "Enter the measured mass of one sample in kg.",
    };
  const volume = area * 1e-6 * length;
  const densityKg =
    mode === "weight"
      ? input.density * densityFactors[input.densityUnit]
      : mass / volume;
  const kgPerM = densityKg * area * 1e-6;
  const pieceKg = kgPerM * length;
  const totalKg = pieceKg * quantity;
  if (!positive([area, volume, densityKg, kgPerM, pieceKg, totalKg]))
    return {
      error:
        "These inputs exceed the calculation range. Check the units and dimensions.",
    };
  return { area, volume, densityKg, kgPerM, pieceKg, totalKg };
}

/** Unit multipliers from profile linear mass in kg/m. */
export const weightPerMeterFactors = {
  "kg/m": 1,
  "g/m": 1000,
  "lb/ft": 0.3048 / 0.45359237,
};

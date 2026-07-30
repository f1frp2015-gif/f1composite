export type FrpSectionShape =
  | "i-beam"
  | "channel"
  | "angle"
  | "square-tube"
  | "round-tube";

/**
 * Strong-axis second moment of area, Ix, in mm^4.
 *
 * These are geometry-only closed-form equations. Material design values and
 * resistance factors are applied by the calculator and span-table layers.
 */
export function calcIx(
  shape: string,
  h: number,
  b: number,
  tw: number,
  tf: number,
): number {
  if (shape === "i-beam" || shape === "channel") {
    return (b * h ** 3 - (b - tw) * (h - 2 * tf) ** 3) / 12;
  }
  if (shape === "angle") {
    const t = tw;
    const yBar = (h * t * h / 2 + (b - t) * t * t / 2) / (h * t + (b - t) * t);
    const Iv = (t * h ** 3) / 12 + h * t * (h / 2 - yBar) ** 2;
    const Ih = ((b - t) * t ** 3) / 12 + (b - t) * t * (yBar - t / 2) ** 2;
    return Iv + Ih;
  }
  if (shape === "square-tube") {
    return (b * h ** 3 - (b - 2 * tw) * (h - 2 * tw) ** 3) / 12;
  }
  if (shape === "round-tube") {
    const Ro = h / 2;
    const Ri = Ro - tw;
    return (Math.PI / 4) * (Ro ** 4 - Ri ** 4);
  }
  return 0;
}

/** Strong-axis elastic section modulus, Wx, in mm^3. */
export function calcWx(
  Ix: number,
  h: number,
  shape?: string,
  b?: number,
  tw?: number,
): number {
  if (shape === "angle" && b && tw) {
    const t = tw;
    const yBar = (h * t * h / 2 + (b - t) * t * t / 2) / (h * t + (b - t) * t);
    const maxDist = Math.max(yBar, h - yBar);
    return Ix / maxDist;
  }
  return Ix / (h / 2);
}

/** Gross cross-sectional area in mm^2. */
export function calcArea(
  shape: string,
  h: number,
  b: number,
  tw: number,
  tf: number,
): number {
  if (shape === "i-beam" || shape === "channel") {
    return 2 * b * tf + (h - 2 * tf) * tw;
  }
  if (shape === "angle") return h * tw + (b - tw) * tw;
  if (shape === "square-tube") {
    return b * h - (b - 2 * tw) * (h - 2 * tw);
  }
  if (shape === "round-tube") {
    const Ro = h / 2;
    const Ri = Ro - tw;
    return Math.PI * (Ro ** 2 - Ri ** 2);
  }
  return 0;
}

/** Effective area used for the calculator's transverse-shear check, in mm^2. */
export function calcShearArea(
  shape: string,
  h: number,
  b: number,
  tw: number,
  tf: number,
): number {
  if (shape === "i-beam" || shape === "channel") return (h - 2 * tf) * tw;
  if (shape === "angle") return h * tw;
  if (shape === "square-tube") return 2 * h * tw;
  if (shape === "round-tube") {
    const Ro = h / 2;
    const Ri = Ro - tw;
    return (Math.PI * (Ro ** 2 - Ri ** 2)) / 2;
  }
  return 0;
}

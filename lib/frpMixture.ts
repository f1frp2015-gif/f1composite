export type MixtureBasis = "weight" | "volume";
export interface Constituent {
  name: string;
  percent: string;
  density: string;
}
export const exampleRecipe: Constituent[] = [
  { name: "Glass roving", percent: "50", density: "2.54" },
  { name: "Glass mat", percent: "10", density: "2.54" },
  { name: "Glass fabric", percent: "10", density: "2.54" },
  { name: "Cured resin", percent: "30", density: "1.20" },
  { name: "Filler / additive", percent: "0", density: "2.41" },
];
// Volume percentages describe the non-void material; porosity is a separate
// percentage of final laminate volume. Constituent densities use g/cm³.
export function calculateMixture(
  rows: Constituent[],
  basis: MixtureBasis,
  voidPercent: string,
) {
  if (rows.length === 0) return { error: "Add at least one constituent." };
  const parts = rows.map((row) => ({
    ...row,
    p: Number(row.percent),
    rho: Number(row.density),
  }));
  if (
    parts.some(
      (row) =>
        row.percent.trim() === "" ||
        !Number.isFinite(row.p) ||
        row.p < 0 ||
        row.p > 100 ||
        (row.p > 0 &&
          (!row.name.trim() || !Number.isFinite(row.rho) || row.rho <= 0)),
    )
  )
    return {
      error:
        "Enter a name, a percentage from 0 to 100, and a positive density for every active constituent.",
    };
  const total = parts.reduce((sum, row) => sum + row.p, 0);
  if (Math.abs(total - 100) > 0.000001)
    return {
      error: `Constituent percentages must total 100%. Current total: ${Number(total.toFixed(6))}%.`,
    };
  const porosity = Number(voidPercent);
  if (
    voidPercent.trim() === "" ||
    !Number.isFinite(porosity) ||
    porosity < 0 ||
    porosity >= 100
  )
    return {
      error:
        "Void content must be from 0% up to, but not including, 100% of final laminate volume.",
    };
  const active = parts.filter((row) => row.p > 0);
  const theoretical =
    basis === "weight"
      ? 1 / active.reduce((sum, row) => sum + row.p / 100 / row.rho, 0)
      : active.reduce((sum, row) => sum + (row.p / 100) * row.rho, 0);
  const adjusted = theoretical * (1 - porosity / 100);
  if (
    ![theoretical, adjusted].every(
      (value) => Number.isFinite(value) && value > 0,
    )
  )
    return {
      error:
        "The recipe exceeds the calculation range. Check constituent densities.",
    };
  const fractions = parts.map((row) => ({
    name: row.name,
    weightPercent:
      row.p === 0
        ? 0
        : basis === "weight"
          ? row.p
          : (row.p * row.rho) / theoretical,
    solidVolumePercent:
      row.p === 0
        ? 0
        : basis === "volume"
          ? row.p
          : (row.p * theoretical) / row.rho,
  }));
  return { theoretical, adjusted, fractions };
}

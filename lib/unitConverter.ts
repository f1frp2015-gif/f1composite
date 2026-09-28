// Unit conversions for FRP engineering between US customary and SI units.
//
// Factors are the exact or NIST SP 811 values: 1 in = 25.4 mm and
// 1 lb = 0.45359237 kg exactly, standard gravity 9.80665 m/s², and the
// International Table Btu for the thermal units. Each unit stores the factor
// that takes it to the quantity's base unit (and an offset for temperature).

import { nearestStandardProfile, nominalSection, type StandardSection } from "@/lib/catalog/standardProfiles";

export interface Unit {
  id: string;
  label: string;
  /** Multiply by this to get the base unit. */
  toBase: number;
  /** Added after the multiplication (temperature only). */
  offset?: number;
}

export interface Quantity {
  id: string;
  label: string;
  units: readonly Unit[];
  /** Typical FRP values to try, in the first unit's terms. */
  examples: readonly { label: string; value: number; unit: string }[];
}

const IN = 0.0254; // m
const FT = 0.3048; // m
const LB = 0.45359237; // kg
const G0 = 9.80665; // m/s²
const LBF = LB * G0; // N, 4.4482216152605
const PSI = LBF / (IN * IN); // Pa, 6894.757293168
const BTU_IT = 1055.05585262; // J
const HOUR = 3600;
const RANKINE = 5 / 9; // K per °F interval

export const QUANTITIES: readonly Quantity[] = [
  {
    id: "stress",
    label: "Stress and strength",
    units: [
      { id: "MPa", label: "MPa (N/mm²)", toBase: 1e6 },
      { id: "psi", label: "psi", toBase: PSI },
      { id: "ksi", label: "ksi", toBase: PSI * 1000 },
      { id: "kgf/cm2", label: "kgf/cm²", toBase: G0 * 1e4 },
      { id: "kPa", label: "kPa", toBase: 1e3 },
    ],
    examples: [
      { label: "EN 13706 E23 tensile strength", value: 240, unit: "MPa" },
      { label: "EN 13706 E17 tensile strength", value: 170, unit: "MPa" },
      { label: "E23 interlaminar shear", value: 25, unit: "MPa" },
    ],
  },
  {
    id: "modulus",
    label: "Modulus",
    units: [
      { id: "GPa", label: "GPa", toBase: 1e9 },
      { id: "MPa", label: "MPa", toBase: 1e6 },
      { id: "Msi", label: "Msi (10⁶ psi)", toBase: PSI * 1e6 },
      { id: "ksi", label: "ksi", toBase: PSI * 1000 },
    ],
    examples: [
      { label: "E23 lengthwise modulus", value: 23, unit: "GPa" },
      { label: "E17 lengthwise modulus", value: 17, unit: "GPa" },
      { label: "Structural steel", value: 200, unit: "GPa" },
    ],
  },
  {
    id: "force",
    label: "Force",
    units: [
      { id: "kN", label: "kN", toBase: 1e3 },
      { id: "N", label: "N", toBase: 1 },
      { id: "lbf", label: "lbf", toBase: LBF },
      { id: "kip", label: "kip (1,000 lbf)", toBase: LBF * 1000 },
      { id: "kgf", label: "kgf", toBase: G0 },
    ],
    examples: [
      { label: "OSHA guardrail test load (200 lb)", value: 0.89, unit: "kN" },
      { label: "NBC guard concentrated load", value: 1, unit: "kN" },
    ],
  },
  {
    id: "line-load",
    label: "Line load",
    units: [
      { id: "kN/m", label: "kN/m", toBase: 1e3 },
      { id: "N/m", label: "N/m", toBase: 1 },
      { id: "lbf/ft", label: "lbf/ft (plf)", toBase: LBF / FT },
      { id: "kip/ft", label: "kip/ft (klf)", toBase: (LBF * 1000) / FT },
      { id: "kgf/m", label: "kgf/m", toBase: G0 },
    ],
    examples: [
      { label: "IBC guard line load (50 lb/ft)", value: 0.73, unit: "kN/m" },
      { label: "UK industrial barrier (NA.8)", value: 0.74, unit: "kN/m" },
    ],
  },
  {
    id: "pressure",
    label: "Area load and pressure",
    units: [
      { id: "kPa", label: "kPa (kN/m²)", toBase: 1e3 },
      { id: "psf", label: "psf (lbf/ft²)", toBase: LBF / (FT * FT) },
      { id: "psi", label: "psi", toBase: PSI },
      { id: "kgf/m2", label: "kgf/m²", toBase: G0 },
      { id: "bar", label: "bar", toBase: 1e5 },
    ],
    examples: [
      { label: "ASCE 7 catwalk live load (40 psf)", value: 1.92, unit: "kPa" },
      { label: "EN ISO 14122-2 walkway load", value: 2, unit: "kPa" },
    ],
  },
  {
    id: "moment",
    label: "Moment",
    units: [
      { id: "kN·m", label: "kN·m", toBase: 1e3 },
      { id: "N·m", label: "N·m", toBase: 1 },
      { id: "lbf·ft", label: "lbf·ft", toBase: LBF * FT },
      { id: "kip·ft", label: "kip·ft", toBase: LBF * 1000 * FT },
      { id: "lbf·in", label: "lbf·in", toBase: LBF * IN },
    ],
    examples: [{ label: "Guardrail post base, 0.89 kN at 1.07 m", value: 0.95, unit: "kN·m" }],
  },
  {
    id: "length",
    label: "Length",
    units: [
      { id: "mm", label: "mm", toBase: 1e-3 },
      { id: "m", label: "m", toBase: 1 },
      { id: "in", label: "in", toBase: IN },
      { id: "ft", label: "ft", toBase: FT },
    ],
    examples: [
      { label: "F1 standard bar length", value: 6000, unit: "mm" },
      { label: "OSHA top-rail height (42 in)", value: 1067, unit: "mm" },
    ],
  },
  {
    id: "area",
    label: "Section area",
    units: [
      { id: "mm2", label: "mm²", toBase: 1e-6 },
      { id: "cm2", label: "cm²", toBase: 1e-4 },
      { id: "in2", label: "in²", toBase: IN ** 2 },
    ],
    examples: [{ label: "I 200×100×10", value: 3800, unit: "mm2" }],
  },
  {
    id: "inertia",
    label: "Second moment of area",
    units: [
      { id: "mm4", label: "mm⁴", toBase: 1e-12 },
      { id: "cm4", label: "cm⁴", toBase: 1e-8 },
      { id: "in4", label: "in⁴", toBase: IN ** 4 },
    ],
    examples: [{ label: "I 200×100×10, strong axis", value: 2.29e7, unit: "mm4" }],
  },
  {
    id: "section-modulus",
    label: "Section modulus",
    units: [
      { id: "mm3", label: "mm³", toBase: 1e-9 },
      { id: "cm3", label: "cm³", toBase: 1e-6 },
      { id: "in3", label: "in³", toBase: IN ** 3 },
    ],
    examples: [{ label: "I 200×100×10, strong axis", value: 2.29e5, unit: "mm3" }],
  },
  {
    id: "mass-length",
    label: "Mass per length",
    units: [
      { id: "kg/m", label: "kg/m", toBase: 1 },
      { id: "lb/ft", label: "lb/ft", toBase: LB / FT },
      { id: "g/m", label: "g/m", toBase: 1e-3 },
    ],
    examples: [
      { label: "I 200×100×10", value: 5.8, unit: "kg/m" },
      { label: "SHS 50×50×5", value: 1.4, unit: "kg/m" },
    ],
  },
  {
    id: "density",
    label: "Density",
    units: [
      { id: "g/cm3", label: "g/cm³", toBase: 1000 },
      { id: "kg/m3", label: "kg/m³", toBase: 1 },
      { id: "lb/ft3", label: "lb/ft³", toBase: LB / FT ** 3 },
      { id: "lb/in3", label: "lb/in³", toBase: LB / IN ** 3 },
    ],
    examples: [
      { label: "Pultruded glass FRP", value: 1.9, unit: "g/cm3" },
      { label: "Carbon steel", value: 7.85, unit: "g/cm3" },
    ],
  },
  {
    id: "mass",
    label: "Mass",
    units: [
      { id: "kg", label: "kg", toBase: 1 },
      { id: "t", label: "tonne", toBase: 1000 },
      { id: "lb", label: "lb", toBase: LB },
      { id: "short-ton", label: "US short ton", toBase: LB * 2000 },
    ],
    examples: [{ label: "One 6 m I 200×100×10 bar", value: 34.8, unit: "kg" }],
  },
  {
    id: "temperature",
    label: "Temperature",
    units: [
      { id: "C", label: "°C", toBase: 1, offset: 273.15 },
      { id: "F", label: "°F", toBase: RANKINE, offset: 273.15 - 32 * RANKINE },
      { id: "K", label: "K", toBase: 1 },
    ],
    examples: [
      { label: "Dark member in full sun", value: 60, unit: "C" },
      { label: "Cold design temperature", value: -20, unit: "C" },
    ],
  },
  {
    id: "expansion",
    label: "Thermal expansion coefficient",
    units: [
      { id: "1e-6/K", label: "10⁻⁶/K (= 10⁻⁶/°C)", toBase: 1e-6 },
      { id: "1e-6/F", label: "10⁻⁶/°F", toBase: 1e-6 / RANKINE },
    ],
    examples: [
      { label: "Pultruded FRP lengthwise", value: 8, unit: "1e-6/K" },
      { label: "Aluminum", value: 23, unit: "1e-6/K" },
    ],
  },
  {
    id: "u-value",
    label: "U-value (thermal transmittance)",
    units: [
      { id: "W/m2K", label: "W/(m²·K)", toBase: 1 },
      { id: "Btu/hft2F", label: "Btu/(h·ft²·°F)", toBase: BTU_IT / HOUR / (FT * FT) / RANKINE },
    ],
    examples: [
      { label: "Passive House window, cool-temperate climate", value: 0.8, unit: "W/m2K" },
      { label: "ENERGY STAR Canada v5.0 window", value: 1.22, unit: "W/m2K" },
    ],
  },
  {
    id: "r-value",
    label: "R-value (thermal resistance)",
    units: [
      { id: "m2K/W", label: "m²·K/W (RSI)", toBase: 1 },
      { id: "hft2F/Btu", label: "h·ft²·°F/Btu (R)", toBase: 1 / (BTU_IT / HOUR / (FT * FT) / RANKINE) },
    ],
    examples: [{ label: "RSI 0.5 window", value: 0.5, unit: "m2K/W" }],
  },
  {
    id: "conductivity",
    label: "Thermal conductivity",
    units: [
      { id: "W/mK", label: "W/(m·K)", toBase: 1 },
      { id: "Btu-in", label: "Btu·in/(h·ft²·°F)", toBase: (BTU_IT * IN) / HOUR / (FT * FT) / RANKINE },
      { id: "Btu-ft", label: "Btu/(h·ft·°F)", toBase: BTU_IT / HOUR / FT / RANKINE },
    ],
    examples: [
      { label: "Pultruded glass FRP (typical)", value: 0.3, unit: "W/mK" },
      { label: "Aluminum alloy", value: 160, unit: "W/mK" },
    ],
  },
  {
    id: "speed",
    label: "Wind speed",
    units: [
      { id: "m/s", label: "m/s", toBase: 1 },
      { id: "km/h", label: "km/h", toBase: 1000 / 3600 },
      { id: "mph", label: "mph", toBase: 1609.344 / 3600 },
      { id: "kn", label: "knot", toBase: 1852 / 3600 },
    ],
    examples: [{ label: "Basic wind speed", value: 45, unit: "m/s" }],
  },
];

export function quantity(id: string): Quantity | undefined {
  return QUANTITIES.find((item) => item.id === id);
}

export function convert(value: number, from: Unit, to: Unit): number {
  const base = value * from.toBase + (from.offset ?? 0);
  return (base - (to.offset ?? 0)) / to.toBase;
}

/** Every unit of a quantity for one input value. */
export function convertAll(quantityId: string, value: number, fromId: string) {
  const q = quantity(quantityId);
  const from = q?.units.find((unit) => unit.id === fromId);
  if (!q || !from || !Number.isFinite(value)) return [];
  return q.units.map((unit) => ({ unit, value: convert(value, from, unit) }));
}

/** Readable number: 5 significant figures, no exponent between 0.001 and 10⁹. */
export function formatValue(value: number): string {
  if (!Number.isFinite(value)) return "—";
  if (value === 0) return "0";
  const abs = Math.abs(value);
  if (abs < 1e-3 || abs >= 1e9) return value.toExponential(4).replace(/\.?0+e/, "e");
  return new Intl.NumberFormat("en-US", { maximumSignificantDigits: 5 }).format(value);
}

/**
 * Parse inch dimensions as written on US drawings: "4", "0.25", "1/4",
 * "1-1/2", "1 1/2", with or without a trailing inch mark.
 */
export function parseInches(text: string): number | null {
  const clean = text.trim().replace(/(″|"|in\.?)$/i, "").trim();
  if (!clean) return null;
  const mixed = clean.match(/^(\d+(?:\.\d+)?)[\s-]+(\d+)\/(\d+)$/);
  if (mixed) return Number(mixed[3]) === 0 ? null : Number(mixed[1]) + Number(mixed[2]) / Number(mixed[3]);
  const fraction = clean.match(/^(\d+)\/(\d+)$/);
  if (fraction) return Number(fraction[2]) === 0 ? null : Number(fraction[1]) / Number(fraction[2]);
  const decimal = clean.match(/^\d*\.?\d+$/);
  return decimal ? Number(clean) : null;
}

export type InchShape = StandardSection["shape"];

export const INCH_SHAPES: { id: InchShape; label: string; dims: [string, string, string] }[] = [
  { id: "i-beam", label: "I-beam / wide flange", dims: ["Depth", "Flange width", "Thickness"] },
  { id: "channel", label: "Channel", dims: ["Depth", "Flange width", "Thickness"] },
  { id: "angle", label: "Equal or unequal angle", dims: ["Leg", "Other leg", "Thickness"] },
  { id: "square-tube", label: "Square or rectangular tube", dims: ["Depth", "Width", "Wall"] },
  { id: "round-tube", label: "Round tube", dims: ["Outside diameter", "—", "Wall"] },
];

/**
 * An inch profile size and the closest metric catalog size of the same
 * shape, with the differences in each dimension.
 */
export function inchSizeToCatalog(shape: InchShape, depthIn: number, widthIn: number, thicknessIn: number) {
  const h = depthIn * 25.4;
  const b = (shape === "round-tube" ? depthIn : widthIn) * 25.4;
  const t = thicknessIn * 25.4;
  if (![h, b, t].every((value) => Number.isFinite(value) && value > 0)) return null;
  const product = nearestStandardProfile(shape, h, b, t);
  const nominal = product ? nominalSection(product) : null;
  if (!product || !nominal) return { mm: { h, b, t }, product: null, nominal: null, exact: false, maxDeviation: Infinity };
  const deviations = [nominal.h / h - 1, shape === "round-tube" ? 0 : nominal.b / b - 1, nominal.t / t - 1];
  const maxDeviation = Math.max(...deviations.map(Math.abs));
  return { mm: { h, b, t }, product, nominal, exact: maxDeviation <= 0.02, maxDeviation };
}

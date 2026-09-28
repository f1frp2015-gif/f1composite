// Axial compression screen for pultruded FRP columns: I-beams, square and
// rectangular tubes and round tubes, concentric load, uniform section.
//
// The limit states are the textbook ones for pultruded columns, and every
// equation below is plate or column mechanics, not a coefficient copied from a
// design code (docs/audits/2026-09-28-tools-round-2.md explains why):
//
//  - Global flexural buckling about each axis: Euler load with the Engesser
//    shear correction, P = P_E / (1 + P_E / (G·A_v)). FRP's low shear modulus
//    makes the correction worth a few per cent on stocky members.
//  - Local buckling of the walls, each treated as a long orthotropic plate
//    with simply supported junctions, which ignores the rotational restraint
//    one wall gives the next and is therefore a lower bound:
//      flange outstand (one edge free):  σ = G_LT · (t / b)²
//      web or tube wall (both edges held): σ = (π²/6)(t / b)² [√(E_L·E_T) + ν_LT·E_T + 2·G_LT]
//  - Crushing: the longitudinal compressive strength times the area.
//
// Design strength: every mode takes the resistance factor the calculator uses
// for bending (lib/frpDesignBasis.ts). ASCE/SEI 74-23 is understood to allow
// higher factors for buckling, but they could not be confirmed against the
// published text, so the lower bending factor is the conservative choice.
// Local–global interaction, eccentric load, flexural–torsional buckling of
// open sections and creep under sustained load are flagged, not calculated.

import { buildProducts, type StandardProfileProduct } from "@/lib/catalog/standardProfiles";
import { DESIGN_MATERIALS, designResistance, type DesignMethod } from "@/lib/frpDesignBasis";

export type ColumnShape = "i-beam" | "rect-tube" | "round-tube";

export interface ColumnSection {
  shape: ColumnShape;
  /** Depth (I-beam, tube) or outside diameter (round tube), mm. */
  h: number;
  /** Flange or tube width, mm (ignored for round tubes). */
  b: number;
  /** Flange thickness (I-beam) or wall thickness (tubes), mm. */
  tf: number;
  /** Web thickness (I-beam), mm; tubes use tf. */
  tw: number;
}

/** Effective length factors: the recommended design values for ideal end conditions (AISC 360 Commentary Table C-A-7.1). */
export const END_CONDITIONS = [
  { id: "pinned-pinned", label: "Pinned at both ends", K: 1.0 },
  { id: "fixed-pinned", label: "Fixed base, pinned top", K: 0.8 },
  { id: "fixed-fixed", label: "Fixed at both ends", K: 0.65 },
  { id: "fixed-free", label: "Fixed base, free top (flagpole)", K: 2.1 },
] as const;

export const WEAK_AXIS_BRACING = [
  { id: "none", label: "No intermediate bracing", divisor: 1 },
  { id: "mid", label: "Braced at mid-height", divisor: 2 },
  { id: "thirds", label: "Braced at third points", divisor: 3 },
] as const;

/** Poisson's ratio ν_LT when no test value is given; typical of pultruded E-glass laminates. */
export const DEFAULT_NU_LT = 0.3;

export interface SectionProps {
  A: number;
  Ix: number;
  Iy: number;
  rx: number;
  ry: number;
  /** Shear areas for buckling about x and y, mm². */
  Avx: number;
  Avy: number;
}

export function columnSectionError(section: ColumnSection): string | null {
  const { shape, h, b, tf, tw } = section;
  if (![h, tf].every((value) => Number.isFinite(value) && value > 0)) return "Enter positive section dimensions.";
  if (shape === "round-tube") return 2 * tf < h ? null : "The wall is too thick for the diameter.";
  if (!(b > 0)) return "Enter the section width.";
  if (shape === "rect-tube") return 2 * tf < h && 2 * tf < b ? null : "The walls are too thick for the size.";
  if (!(tw > 0)) return "Enter the web thickness.";
  return 2 * tf < h && tw < b ? null : "The flanges or web are too thick for the size.";
}

export function columnSectionProps(section: ColumnSection): SectionProps {
  const { shape, h, b, tf, tw } = section;
  let A: number;
  let Ix: number;
  let Iy: number;
  let Avx: number;
  let Avy: number;
  if (shape === "i-beam") {
    const hw = h - 2 * tf;
    A = 2 * b * tf + hw * tw;
    Ix = (b * h ** 3 - (b - tw) * hw ** 3) / 12;
    Iy = (2 * tf * b ** 3 + hw * tw ** 3) / 12;
    Avx = hw * tw; // web carries shear for bending about the strong axis
    Avy = (5 / 6) * 2 * b * tf; // flanges for bending about the weak axis
  } else if (shape === "rect-tube") {
    const t = tf;
    A = h * b - (h - 2 * t) * (b - 2 * t);
    Ix = (b * h ** 3 - (b - 2 * t) * (h - 2 * t) ** 3) / 12;
    Iy = (h * b ** 3 - (h - 2 * t) * (b - 2 * t) ** 3) / 12;
    Avx = 2 * (h - 2 * t) * t;
    Avy = 2 * (b - 2 * t) * t;
  } else {
    const d = h - 2 * tf;
    A = (Math.PI / 4) * (h ** 2 - d ** 2);
    Ix = (Math.PI / 64) * (h ** 4 - d ** 4);
    Iy = Ix;
    Avx = A / 2; // thin-walled tube
    Avy = A / 2;
  }
  return { A, Ix, Iy, rx: Math.sqrt(Ix / A), ry: Math.sqrt(Iy / A), Avx, Avy };
}

export interface ColumnInput {
  section: ColumnSection;
  lengthMm: number;
  K: number;
  /** Weak-axis unbraced length = length ÷ this (1 = no intermediate bracing). */
  weakAxisDivisor: number;
  /** Service axial load, kN. */
  loadKn: number;
  materialId: string;
  method: DesignMethod;
  envId: string;
  durationId: string;
  nuLT?: number;
}

export type ColumnMode = "global-x" | "global-y" | "local-flange" | "local-web" | "crushing";

export interface ModeResult {
  mode: ColumnMode;
  label: string;
  /** Critical (nominal) stress, MPa. */
  stressMPa: number;
  /** Nominal capacity, kN. */
  nominalKn: number;
  /** Design capacity after the resistance factor (and λ on the ASCE path), kN. */
  designKn: number;
}

export interface ColumnResult {
  props: SectionProps;
  modes: ModeResult[];
  governing: ModeResult;
  factoredLoadKn: number;
  loadFactor: number;
  resistanceFactor: number;
  lambda: number;
  utilisation: number;
  slenderness: { x: number; y: number };
  flags: {
    /** KL/r above 200, a limit commonly recommended for compression members. */
    slender: boolean;
    /** Lowest local and global modes within 30 % of each other. */
    interaction: boolean;
    /** Round tube: local buckling of the wall is not calculated. */
    roundTubeLocalNotChecked: boolean;
  };
}

export function columnInputError(input: ColumnInput): string | null {
  const material = DESIGN_MATERIALS[input.materialId];
  if (!material || material.group !== "FRP") return "Choose an FRP material.";
  const sectionError = columnSectionError(input.section);
  if (sectionError) return sectionError;
  if (!Number.isFinite(input.lengthMm) || input.lengthMm <= 0) return "Enter the column length.";
  if (!Number.isFinite(input.K) || input.K <= 0) return "Choose the end conditions.";
  if (!Number.isFinite(input.loadKn) || input.loadKn < 0) return "Enter the axial load (0 or more).";
  return null;
}

export function checkColumn(input: ColumnInput): ColumnResult | null {
  if (columnInputError(input)) return null;
  const material = DESIGN_MATERIALS[input.materialId];
  const resistance = designResistance({ material, method: input.method, envId: input.envId, durationId: input.durationId });
  const phi = resistance.basis.phiFlex;
  const factor = phi * resistance.lambda;
  const EL = material.E * 1000 * resistance.envStiffness; // MPa
  const ET = (material.E_T ?? material.E / 3) * 1000 * resistance.envStiffness;
  const G = (material.G_LT ?? material.E / 2.6) * 1000 * resistance.envStiffness;
  const nu = input.nuLT ?? DEFAULT_NU_LT;
  const Fc = (material.sigma_c ?? material.sigma) * resistance.envStrength;

  const { section } = input;
  const props = columnSectionProps(section);
  const Lx = input.K * input.lengthMm;
  const Ly = (input.K * input.lengthMm) / Math.max(1, input.weakAxisDivisor);

  const global = (I: number, Av: number, L: number) => {
    const PE = (Math.PI ** 2 * EL * I) / L ** 2; // N
    return PE / (1 + PE / (G * Av));
  };
  const plateBothEdges = (t: number, width: number) => (Math.PI ** 2 / 6) * (t / width) ** 2 * (Math.sqrt(EL * ET) + nu * ET + 2 * G);
  const plateOneFree = (t: number, outstand: number) => G * (t / outstand) ** 2;

  const modes: ModeResult[] = [];
  const add = (mode: ColumnMode, label: string, stressMPa: number) => {
    const nominalKn = (stressMPa * props.A) / 1000;
    modes.push({ mode, label, stressMPa, nominalKn, designKn: nominalKn * factor });
  };
  const open = section.shape === "i-beam";
  add("global-x", open ? "Global buckling, strong axis" : "Global buckling about x (depth)", global(props.Ix, props.Avx, Lx) / props.A);
  add("global-y", open ? "Global buckling, weak axis" : "Global buckling about y (width)", global(props.Iy, props.Avy, Ly) / props.A);
  if (section.shape === "i-beam") {
    add("local-flange", "Local buckling, flange", plateOneFree(section.tf, section.b / 2));
    add("local-web", "Local buckling, web", plateBothEdges(section.tw, section.h - section.tf));
  } else if (section.shape === "rect-tube") {
    const wide = Math.max(section.h, section.b) - section.tf;
    add("local-web", "Local buckling, widest wall", plateBothEdges(section.tf, wide));
  }
  add("crushing", "Crushing (compressive strength)", Fc);

  const governing = modes.reduce((low, mode) => (mode.designKn < low.designKn ? mode : low));
  const factoredLoadKn = input.loadKn * resistance.loadFactor;
  const globalLow = Math.min(...modes.filter((mode) => mode.mode.startsWith("global")).map((mode) => mode.nominalKn));
  const locals = modes.filter((mode) => mode.mode.startsWith("local")).map((mode) => mode.nominalKn);
  const localLow = locals.length ? Math.min(...locals) : Infinity;
  const slenderness = { x: Lx / props.rx, y: Ly / props.ry };

  return {
    props,
    modes,
    governing,
    factoredLoadKn,
    loadFactor: resistance.loadFactor,
    resistanceFactor: phi,
    lambda: resistance.lambda,
    utilisation: governing.designKn > 0 ? factoredLoadKn / governing.designKn : Infinity,
    slenderness,
    flags: {
      slender: Math.max(slenderness.x, slenderness.y) > 200,
      interaction: Number.isFinite(localLow) && Math.max(globalLow, localLow) / Math.min(globalLow, localLow) <= 1.3,
      roundTubeLocalNotChecked: section.shape === "round-tube",
    },
  };
}

/**
 * Longest column (mm) that still passes, with the other inputs unchanged.
 * Null when the section fails at any length (local buckling or crushing
 * governs) or passes beyond 30 m.
 */
export function maxColumnLength(input: ColumnInput): number | null {
  const at = (lengthMm: number) => checkColumn({ ...input, lengthMm })?.utilisation ?? Infinity;
  if (at(1) > 1) return null;
  let low = 1;
  let high = 30000;
  if (at(high) <= 1) return null;
  for (let i = 0; i < 40; i += 1) {
    const mid = (low + high) / 2;
    if (at(mid) <= 1) low = mid;
    else high = mid;
  }
  return low;
}

/** Catalog product → column section, for the shapes this screen covers. */
export function catalogColumnSection(product: StandardProfileProduct): ColumnSection | null {
  const d = product.geometry.dims;
  switch (product.geometry.shape) {
    case "i_beam": return { shape: "i-beam", h: d.H, b: d.B, tf: d.tf, tw: d.tw };
    case "shs": return { shape: "rect-tube", h: d.D, b: d.D, tf: d.t, tw: d.t };
    case "rhs": return { shape: "rect-tube", h: d.H, b: d.B, tf: d.t, tw: d.t };
    case "tube": return { shape: "round-tube", h: d.OD, b: d.OD, tf: d.t, tw: d.t };
    default: return null;
  }
}

export const COLUMN_PRODUCTS = buildProducts().filter((product) => catalogColumnSection(product) !== null);

/** The lightest catalog sections that pass, lightest first. */
export function lightestPassing(input: Omit<ColumnInput, "section">, count = 3, shapes?: ColumnShape[]) {
  const passing: { product: StandardProfileProduct; section: ColumnSection; utilisation: number }[] = [];
  for (const product of COLUMN_PRODUCTS) {
    const section = catalogColumnSection(product)!;
    if (shapes && !shapes.includes(section.shape)) continue;
    const result = checkColumn({ ...input, section });
    if (result && result.utilisation <= 1) passing.push({ product, section, utilisation: result.utilisation });
  }
  return passing.sort((a, b) => a.product.weight - b.product.weight || a.utilisation - b.utilisation).slice(0, count);
}

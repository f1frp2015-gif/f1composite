import type { Geometry, ShapeId } from "../catalog/shapes";

export const PROFILE_NAMING_VERSION = "F1-GPN-2.0";

export interface ShapeNamingRule {
  shape: ShapeId;
  code: string;
  canonicalName: string;
  en13706ShapeCode: "B" | "I" | "L" | "O" | "T" | "U" | "W" | "Z";
  euAliases: string[];
  usAliases: string[];
  dimensionOrder: string;
}

export const SHAPE_NAMING_RULES: Record<ShapeId, ShapeNamingRule> = {
  i_beam: {
    shape: "i_beam", code: "I", canonicalName: "I-section / I-beam", en13706ShapeCode: "I",
    euAliases: ["I-profile"], usAliases: ["I-beam", "wide-flange beam"], dimensionOrder: "H×B×tw×tf",
  },
  channel: {
    shape: "channel", code: "C", canonicalName: "equal-flange channel", en13706ShapeCode: "U",
    euAliases: ["U-profile"], usAliases: ["channel"], dimensionOrder: "H×B×tw×tf",
  },
  angle: {
    shape: "angle", code: "L", canonicalName: "angle", en13706ShapeCode: "L",
    euAliases: ["EA", "UA", "L-profile"], usAliases: ["angle"], dimensionOrder: "a×b×t",
  },
  tee: {
    shape: "tee", code: "T", canonicalName: "T-section", en13706ShapeCode: "T",
    euAliases: ["T-profile"], usAliases: ["tee"], dimensionOrder: "B×H×tw×tf",
  },
  offset_tee: {
    shape: "offset_tee", code: "OT", canonicalName: "offset T-section", en13706ShapeCode: "Z",
    euAliases: ["offset T", "asymmetric T"], usAliases: ["offset tee"], dimensionOrder: "BL+BR×H×t",
  },
  unequal_channel: {
    shape: "unequal_channel", code: "UC", canonicalName: "unequal-flange channel", en13706ShapeCode: "Z",
    euAliases: ["unequal U-profile"], usAliases: ["unequal channel"], dimensionOrder: "B1×H×B2×t",
  },
  strut_channel: {
    shape: "strut_channel", code: "STRUT", canonicalName: "lipped strut channel", en13706ShapeCode: "Z",
    euAliases: ["strut profile"], usAliases: ["Unistrut-type channel"], dimensionOrder: "B×H×t; lip/return per drawing",
  },
  shs: {
    shape: "shs", code: "SHS", canonicalName: "square hollow section", en13706ShapeCode: "B",
    euAliases: ["SHS"], usAliases: ["HSS square", "square tube"], dimensionOrder: "B×H×t",
  },
  rhs: {
    shape: "rhs", code: "RHS", canonicalName: "rectangular hollow section", en13706ShapeCode: "B",
    euAliases: ["RHS"], usAliases: ["HSS rectangular", "rectangular tube"], dimensionOrder: "B×H×t",
  },
  tube: {
    shape: "tube", code: "CHS", canonicalName: "circular hollow section", en13706ShapeCode: "O",
    euAliases: ["CHS", "round tube"], usAliases: ["HSS round", "round tube"], dimensionOrder: "OD×t",
  },
  rod: {
    shape: "rod", code: "RB", canonicalName: "solid round bar", en13706ShapeCode: "Z",
    euAliases: ["round bar"], usAliases: ["rod"], dimensionOrder: "ØD",
  },
  flat: {
    shape: "flat", code: "FB", canonicalName: "flat bar", en13706ShapeCode: "Z",
    euAliases: ["flat bar"], usAliases: ["flat bar"], dimensionOrder: "B×t",
  },
};

const cleanNumber = (value: number) => Number(value.toFixed(3)).toString();
const dim = (value: number) => cleanNumber(value);
const codeDim = (value: number) => {
  const [whole, fraction] = value.toFixed(3).replace(/0+$/, "").replace(/\.$/, "").split(".");
  return `${whole.padStart(3, "0")}${fraction ? `P${fraction}` : ""}`;
};
const codeThickness = (value: number) => {
  const normalized = value.toFixed(3).replace(/0+$/, "").replace(/\.$/, "");
  return normalized.includes(".") ? normalized.replace(".", "P") : `${normalized}P0`;
};

export function shapeCodeForGeometry(geometry: Geometry): string | null {
  if (geometry.kind !== "parametric") return null;
  if (geometry.shape === "angle") {
    return geometry.dims.a === geometry.dims.b ? "EA" : "UA";
  }
  return SHAPE_NAMING_RULES[geometry.shape].code;
}

export function enShapeCodeForGeometry(geometry: Geometry): string | null {
  if (geometry.kind !== "parametric") return "Z";
  return SHAPE_NAMING_RULES[geometry.shape].en13706ShapeCode;
}

export function globalDesignation(geometry: Geometry): string | null {
  if (geometry.kind !== "parametric") return null;
  const d = geometry.dims;
  const code = shapeCodeForGeometry(geometry);
  switch (geometry.shape) {
    case "i_beam":
    case "channel":
    case "tee":
      return `P-GFRP ${code} H${dim(d.H)}×B${dim(d.B)}×tw${dim(d.tw)}×tf${dim(d.tf)} mm`;
    case "angle":
      return `P-GFRP ${code} a${dim(d.a)}×b${dim(d.b)}×t${dim(d.t)} mm`;
    case "offset_tee":
      return `P-GFRP OT BL${dim(d.BL)}+BR${dim(d.BR)}×H${dim(d.H)}×t${dim(d.t)} mm`;
    case "unequal_channel":
      return `P-GFRP UC B1${dim(d.B1)}×H${dim(d.H)}×B2${dim(d.B2)}×t${dim(d.t)} mm`;
    case "strut_channel":
      return `P-GFRP STRUT B${dim(d.B)}×H${dim(d.H)}×t${dim(d.t)} L${dim(d.lip)} R${dim(d.return)} mm`;
    case "shs":
      return `P-GFRP SHS B${dim(d.D)}×H${dim(d.D)}×t${dim(d.t)} mm`;
    case "rhs":
      return `P-GFRP RHS B${dim(d.B)}×H${dim(d.H)}×t${dim(d.t)} mm`;
    case "tube":
      return `P-GFRP CHS OD${dim(d.OD)}×t${dim(d.t)} mm`;
    case "rod":
      return `P-GFRP RB Ø${dim(d.D)} mm`;
    case "flat":
      return `P-GFRP FB B${dim(d.H)}×t${dim(d.B)} mm`;
  }
}

/** Geometry-only identifier. Never includes supplier, tooling status, resin, grade, finish or revision. */
export function baseSectionCode(geometry: Geometry): string | null {
  if (geometry.kind !== "parametric") return null;
  const d = geometry.dims;
  const code = shapeCodeForGeometry(geometry);
  switch (geometry.shape) {
    case "i_beam":
    case "channel":
    case "tee":
      return `F1-${code}-H${codeDim(d.H)}-B${codeDim(d.B)}-TW${codeThickness(d.tw)}-TF${codeThickness(d.tf)}`;
    case "angle":
      return `F1-${code}-A${codeDim(d.a)}-B${codeDim(d.b)}-T${codeThickness(d.t)}`;
    case "offset_tee":
      return `F1-OT-BL${codeDim(d.BL)}-BR${codeDim(d.BR)}-H${codeDim(d.H)}-T${codeThickness(d.t)}`;
    case "unequal_channel":
      return `F1-UC-B1${codeDim(d.B1)}-H${codeDim(d.H)}-B2${codeDim(d.B2)}-T${codeThickness(d.t)}`;
    case "strut_channel":
      return `F1-STRUT-B${codeDim(d.B)}-H${codeDim(d.H)}-T${codeThickness(d.t)}-L${codeDim(d.lip)}-R${codeDim(d.return)}`;
    case "shs":
      return `F1-SHS-B${codeDim(d.D)}-H${codeDim(d.D)}-T${codeThickness(d.t)}`;
    case "rhs":
      return `F1-RHS-B${codeDim(d.B)}-H${codeDim(d.H)}-T${codeThickness(d.t)}`;
    case "tube":
      return `F1-CHS-OD${codeDim(d.OD)}-T${codeThickness(d.t)}`;
    case "rod":
      return `F1-RB-D${codeDim(d.D)}`;
    case "flat":
      return `F1-FB-B${codeDim(d.H)}-T${codeThickness(d.B)}`;
  }
}

const variantToken = (value: string) =>
  value.trim().toUpperCase().replace(/[^A-Z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export function manufacturingVariantCode(input: {
  baseSectionCode: string;
  grade: string;
  resin: string;
  resinProperties?: string[];
  additionalProcesses?: string[];
  color?: string;
  fabrication?: string[];
}): string {
  const parts = [
    input.grade,
    input.resin,
    ...(input.resinProperties ?? []),
    ...(input.additionalProcesses ?? []),
    input.color,
    ...(input.fabrication ?? []),
  ].filter((part): part is string => Boolean(part));
  return `${input.baseSectionCode}@${parts.map(variantToken).join("-")}`;
}

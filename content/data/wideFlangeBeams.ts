/**
 * Wide flange (WF) beam reference data for
 * /products/fiberglass-structural-shapes/frp-wide-flange-beam.
 *
 * The catalog row (I 305×305×12.7) comes from the published standard-profile
 * catalog. The nominal inch designations below are geometry only: they are the
 * depth × flange width × thickness series commonly written into North American
 * FRP specifications. Their section properties are calculated from the nominal
 * sharp-cornered section; no mass, load rating or stock status is implied.
 */

export const WF_FLANGE_RATIO_MIN = 0.9;

export const wideFlangeCatalogModel = "I 305×305×12.7" as const;

/** The deep narrow-flange I-beam used to compare weak-axis properties at a similar depth. */
export const comparisonIBeamModel = "I 300×150×15" as const;

export interface NominalWideFlange {
  /** Inch designation as written in specifications: depth × flange width × thickness. */
  designation: string;
  depthIn: number;
  widthIn: number;
  thicknessIn: number;
}

export const nominalWideFlanges: readonly NominalWideFlange[] = [
  { designation: "4 × 4 × ¼", depthIn: 4, widthIn: 4, thicknessIn: 0.25 },
  { designation: "6 × 6 × ¼", depthIn: 6, widthIn: 6, thicknessIn: 0.25 },
  { designation: "6 × 6 × ⅜", depthIn: 6, widthIn: 6, thicknessIn: 0.375 },
  { designation: "8 × 8 × ⅜", depthIn: 8, widthIn: 8, thicknessIn: 0.375 },
  { designation: "8 × 8 × ½", depthIn: 8, widthIn: 8, thicknessIn: 0.5 },
  { designation: "10 × 10 × ½", depthIn: 10, widthIn: 10, thicknessIn: 0.5 },
  { designation: "12 × 12 × ½", depthIn: 12, widthIn: 12, thicknessIn: 0.5 },
];

export const MM_PER_INCH = 25.4;

/** Flange outstand slenderness: half the flange width over the flange thickness. */
export const flangeOutstandRatio = (width: number, thickness: number) => width / 2 / thickness;

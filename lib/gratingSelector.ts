import { moldedGratingSpecGroups } from "@/content/data/moldedGratingSpecs";
import { pultrudedGratingSpecGroups } from "@/content/data/pultrudedGratingSpecs";
import { moldedGratingClearOpening } from "@/lib/accessGeometry";
import { gratingInquiryHref, moldedGratingSelection, pultrudedGratingSelection, type GratingFamily } from "@/lib/gratingInquiry";

/**
 * Grating selector rows: the published molded and pultruded catalog
 * configurations in one comparable list. Selection data only: nominal depth,
 * open area and weight. Load and deflection come from the project table.
 */
export interface GratingRow {
  id: string;
  family: GratingFamily;
  /** Mesh designation (molded) or series family (pultruded). */
  group: string;
  /** Pultruded type code; empty for molded rows. */
  type: string;
  depthMm: number;
  /** Heavy-duty molded rows are marked "(HD)" in the catalog. */
  heavyDuty: boolean;
  openAreaPct: number;
  weightKgM2: number;
  /** Bearing-bar center (pultruded) in mm. */
  bearingBarCenterMm: number | null;
  /** Approximate clear top opening of a single square molded mesh (pitch minus top bar), mm. */
  clearOpeningMm: number | null;
  barThickness: string;
  panelSizes: string;
  quoteHref: string;
}

export const KG_M2_TO_LB_FT2 = 0.204816;
export const M2_PER_FT2 = 0.09290304;

const num = (value: string) => Number.parseFloat(value);

/** "38.1 × 38.1 mm square mesh" → 38.1; mini, rectangular and large meshes return null. */
export function squareMeshPitch(mesh: string): number | null {
  const match = /^(\d+(?:\.\d+)?) × (\d+(?:\.\d+)?) mm square mesh$/.exec(mesh);
  return match && match[1] === match[2] ? Number(match[1]) : null;
}

export function buildGratingRows(source = "tool-grating-selector"): GratingRow[] {
  const molded = moldedGratingSpecGroups.flatMap((group) =>
    group.rows.map((row, index): GratingRow => {
      const pitch = squareMeshPitch(group.mesh);
      const topBar = num(row.barThickness.split("/")[0]);
      return {
        id: `m-${group.mesh.replace(/[^0-9a-z]+/gi, "-")}-${index}`,
        family: "molded",
        group: group.mesh,
        type: "",
        depthMm: num(row.depth),
        heavyDuty: /HD/.test(row.depth),
        openAreaPct: num(row.openArea),
        weightKgM2: num(row.weight),
        bearingBarCenterMm: null,
        clearOpeningMm: pitch !== null && Number.isFinite(topBar) ? Math.round(moldedGratingClearOpening(pitch, topBar) * 10) / 10 : null,
        barThickness: row.barThickness,
        panelSizes: row.panelSizes,
        quoteHref: gratingInquiryHref("molded", moldedGratingSelection(group.mesh, row), source),
      };
    }),
  );
  const pultruded = pultrudedGratingSpecGroups.flatMap((group) =>
    group.rows.map((row): GratingRow => ({
      id: `p-${row.type}`,
      family: "pultruded",
      group: group.name,
      type: row.type,
      depthMm: num(row.depth),
      heavyDuty: false,
      openAreaPct: num(row.openArea),
      weightKgM2: num(row.weight),
      bearingBarCenterMm: num(row.bearingBarCenter),
      clearOpeningMm: null,
      barThickness: "",
      panelSizes: "",
      quoteHref: gratingInquiryHref("pultruded", pultrudedGratingSelection(row), source),
    })),
  );
  return [...molded, ...pultruded];
}

export interface GratingFilter {
  family: "all" | GratingFamily;
  depthMin?: number;
  depthMax?: number;
  openMin?: number;
  openMax?: number;
  weightMax?: number;
  /** Largest acceptable clear top opening, mm. Rows without a computed opening are kept only when includeUnknownOpening is true. */
  openingMax?: number;
  includeUnknownOpening?: boolean;
}

const ok = (value: number | undefined) => value !== undefined && Number.isFinite(value);

export function filterGratingRows(rows: readonly GratingRow[], filter: GratingFilter): GratingRow[] {
  return rows.filter((row) => {
    if (filter.family !== "all" && row.family !== filter.family) return false;
    if (ok(filter.depthMin) && row.depthMm < filter.depthMin!) return false;
    if (ok(filter.depthMax) && row.depthMm > filter.depthMax!) return false;
    if (ok(filter.openMin) && row.openAreaPct < filter.openMin!) return false;
    if (ok(filter.openMax) && row.openAreaPct > filter.openMax!) return false;
    if (ok(filter.weightMax) && row.weightKgM2 > filter.weightMax!) return false;
    if (ok(filter.openingMax)) {
      if (row.clearOpeningMm === null) return Boolean(filter.includeUnknownOpening);
      if (row.clearOpeningMm > filter.openingMax!) return false;
    }
    return true;
  });
}

/** Nominal grating weight for a floor area; excludes clips, cut waste and packing. */
export function gratingAreaWeight(weightKgM2: number, areaM2: number) {
  const kg = weightKgM2 * areaM2;
  return { kg, lb: kg / 0.45359237 };
}

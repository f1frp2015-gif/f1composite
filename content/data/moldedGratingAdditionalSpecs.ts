import type { MoldedGratingSpecGroup } from "./moldedGratingSpecs";

/**
 * The additional mini and rectangular meshes of the same product manual
 * (catalog pages 12-14), row by row. They are printed in the FRP Grating
 * Product Manual (scripts/build-grating-manual.mjs) and are not part of the
 * 26-row web table or its CSV. Nominal values as printed; several rows repeat
 * a weight across depths in the source, so the order datasheet controls. Kept
 * apart from moldedGratingSpecs.ts, whose 26 rows are the web table and CSV.
 */
export const moldedAdditionalMeshSpecGroups: readonly MoldedGratingSpecGroup[] = [
  {
    mesh: "20 × 20 / 40 × 40 mm mini mesh",
    rows: [
      { depth: "14", barThickness: "7.0 / 5.0", panelSizes: "1247 × 4047; 1247 × 3687; 1007 × 4007; 1007 × 3007", weight: "10.5", openArea: "42%" },
      { depth: "22", barThickness: "7.0 / 5.0", panelSizes: "1247 × 4047; 1247 × 3687; 1007 × 4007; 1007 × 3007", weight: "14.5", openArea: "42%" },
      { depth: "30", barThickness: "7.0 / 5.0", panelSizes: "1527 × 4047; 1247 × 3687; 1007 × 4007; 1007 × 3007", weight: "18.0", openArea: "42%" },
      { depth: "40", barThickness: "7.0 / 5.0", panelSizes: "1527 × 4047; 1247 × 3687; 1007 × 4007; 1007 × 3007", weight: "23.5", openArea: "42%" },
      { depth: "60", barThickness: "7.0 / 5.0", panelSizes: "1007 × 4007; 1007 × 3007; 1007 × 2007", weight: "38.5", openArea: "42%" },
    ],
  },
  {
    mesh: "26 × 26 / 52 × 52 mm mini mesh",
    rows: [
      { depth: "30", barThickness: "6.5 / 5.0", panelSizes: "1532 × 4050", weight: "15.5", openArea: "60%" },
      { depth: "38", barThickness: "6.5 / 5.0", panelSizes: "1205 × 4011", weight: "19.5", openArea: "60%" },
    ],
  },
  {
    mesh: "13 × 13 / 40 × 40 mm mini mesh",
    rows: [
      { depth: "22", barThickness: "7.0 / 5.0", panelSizes: "1527 × 4047; 1247 × 4047; 1007 × 4007; 1007 × 3007", weight: "15.0", openArea: "30%" },
      { depth: "30", barThickness: "7.0 / 5.0", panelSizes: "1527 × 4047; 1247 × 4047; 1007 × 4007; 1007 × 3007", weight: "19.0", openArea: "30%" },
      { depth: "40", barThickness: "7.0 / 5.0", panelSizes: "1527 × 4047; 1247 × 4047; 1007 × 4007; 1007 × 3007", weight: "25.0", openArea: "30%" },
    ],
  },
  {
    mesh: "25 × 100 mm rectangular mesh",
    rows: [
      { depth: "25", barThickness: "7.0 / 5.0", panelSizes: "1007 × 4007; 1007 × 3007", weight: "13.0", openArea: "67%", span: "Width" },
      { depth: "30", barThickness: "7.0 / 5.0", panelSizes: "1007 × 4007; 1007 × 3007", weight: "15.6", openArea: "67%", span: "Width" },
    ],
  },
  {
    mesh: "25.4 × 101.6 mm rectangular mesh",
    rows: [
      { depth: "25", barThickness: "6.5 / 5.0", panelSizes: "1220 × 3660; 921 × 3050", weight: "13.0", openArea: "67%", span: "Width or length" },
      { depth: "25 (HD)", barThickness: "9.5 / 8.0", panelSizes: "1220 × 3660; 921 × 3050", weight: "15.6", openArea: "67%", span: "Width" },
      { depth: "38", barThickness: "15.0 / 5.0", panelSizes: "1220 × 3660", weight: "21.0", openArea: "62%", span: "Length" },
    ],
  },
  {
    mesh: "38.1 × 101.6 mm rectangular mesh",
    rows: [
      { depth: "38", barThickness: "8.0 / 6.0", panelSizes: "1220 × 3660; 921 × 3050", weight: "13.0", openArea: "65%", span: "Length" },
      { depth: "50", barThickness: "8.0 / 5.0", panelSizes: "1220 × 3660", weight: "15.3", openArea: "68%", span: "Length" },
    ],
  },
  {
    mesh: "25.4 × 152.4 mm rectangular mesh",
    rows: [
      { depth: "38", barThickness: "9.0 / 6.5", panelSizes: "1220 × 3660; 921 × 3050", weight: "22.5", openArea: "63%", span: "Length" },
    ],
  },
  {
    mesh: "38.1 × 152.4 mm rectangular mesh",
    rows: [
      { depth: "38", barThickness: "8.0 / 6.0", panelSizes: "1220 × 3660; 921 × 3050", weight: "15.9", openArea: "67%", span: "Length" },
    ],
  },
  {
    mesh: "25.4 × 50.8 mm rectangular mesh",
    rows: [
      { depth: "38", barThickness: "11.0 / 9.0", panelSizes: "1220 × 1830; 1220 × 3660", weight: "30.7", openArea: "49%", span: "Width or length" },
      { depth: "50", barThickness: "12.0 / 9.0", panelSizes: "1220 × 1830; 1220 × 3660", weight: "41.8", openArea: "48%", span: "Width or length" },
    ],
  },
  {
    mesh: "60 × 100 mm rectangular mesh",
    rows: [
      { depth: "28", barThickness: "6.5 / 5.0", panelSizes: "1500 × 4000; 1500 × 2000", weight: "7.2", openArea: "78%", span: "Length" },
    ],
  },
  {
    mesh: "60 × 220 mm rectangular mesh",
    rows: [
      { depth: "40", barThickness: "6.3 / 5.0", panelSizes: "1788 × 4476; 1788 × 2238", weight: "8.8", openArea: "67%", span: "Length" },
    ],
  },
] as const;

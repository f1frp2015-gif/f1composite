export interface MoldedGratingSpecRow {
  depth: string;
  barThickness: string;
  panelSizes: string;
  weight: string;
  openArea: string;
}

export interface MoldedGratingSpecGroup {
  mesh: string;
  note?: string;
  rows: readonly MoldedGratingSpecRow[];
}

const COMMON_PANELS = "1524 × 4000; 1220 × 3660; 1220 × 2440; 921 × 3050";
const HD_PANELS = "1220 × 3660; 1220 × 2440; 921 × 3050";

/**
 * Nominal catalog configurations transcribed from the supplied molded-grating
 * product manual (catalog pages 10-11). Dimensions are millimeters and weights
 * are kg/m². Project approval drawings and certified order documents control.
 */
export const moldedGratingSpecGroups: readonly MoldedGratingSpecGroup[] = [
  {
    mesh: "38.1 × 38.1 mm square mesh",
    note: "Standard industrial square mesh; HD rows are high-depth configurations.",
    rows: [
      { depth: "13", barThickness: "6.0 / 5.0", panelSizes: COMMON_PANELS, weight: "6.1", openArea: "78%" },
      { depth: "15", barThickness: "6.0 / 5.0", panelSizes: COMMON_PANELS, weight: "7.1", openArea: "78%" },
      { depth: "20", barThickness: "6.5 / 5.0", panelSizes: COMMON_PANELS, weight: "9.6", openArea: "68%" },
      { depth: "25", barThickness: "6.5 / 5.0", panelSizes: COMMON_PANELS, weight: "12.3", openArea: "68%" },
      { depth: "30", barThickness: "6.5 / 5.0", panelSizes: COMMON_PANELS, weight: "14.6", openArea: "68%" },
      { depth: "38", barThickness: "7.0 / 5.0", panelSizes: COMMON_PANELS, weight: "19.5", openArea: "68%" },
      { depth: "40", barThickness: "7.0 / 5.0", panelSizes: COMMON_PANELS, weight: "20.6", openArea: "68%" },
      { depth: "50 (HD)", barThickness: "9.5 / 7.5", panelSizes: HD_PANELS, weight: "40.0", openArea: "56%" },
      { depth: "60 (HD)", barThickness: "10.5 / 8.5", panelSizes: HD_PANELS, weight: "48.0", openArea: "54%" },
      { depth: "65 (HD)", barThickness: "11.0 / 9.0", panelSizes: HD_PANELS, weight: "52.0", openArea: "52%" },
    ],
  },
  {
    mesh: "40 × 40 mm square mesh",
    rows: [
      { depth: "25", barThickness: "7.0 / 5.0", panelSizes: "1007 × 3007; 1007 × 4007; 1247 × 3687; 1527 × 4047", weight: "12.3", openArea: "67%" },
      { depth: "30", barThickness: "7.0 / 5.0", panelSizes: "1007 × 3007; 1007 × 4007; 1247 × 3687; 1527 × 4047", weight: "14.5", openArea: "67%" },
      { depth: "40", barThickness: "7.0 / 5.0", panelSizes: "1007 × 3007; 1007 × 4007; 967 × 2967; 1527 × 4047", weight: "19.2", openArea: "67%" },
    ],
  },
  {
    mesh: "50.8 × 50.8 mm square mesh",
    rows: [
      { depth: "13", barThickness: "6.0 / 5.0", panelSizes: COMMON_PANELS, weight: "5.8", openArea: "82%" },
      { depth: "15", barThickness: "7.0 / 6.0", panelSizes: COMMON_PANELS, weight: "6.8", openArea: "82%" },
      { depth: "25", barThickness: "7.5 / 6.0", panelSizes: "1220 × 3660; 1220 × 2440", weight: "11.8", openArea: "78%" },
      { depth: "40", barThickness: "7.0 / 5.0", panelSizes: "1788 × 4531; 1220 × 3660; 1220 × 2440; 921 × 3050", weight: "17.8", openArea: "78%" },
      { depth: "50", barThickness: "7.5 / 5.0", panelSizes: COMMON_PANELS, weight: "21.5", openArea: "78%" },
      { depth: "50", barThickness: "8.0 / 6.0", panelSizes: COMMON_PANELS, weight: "23.5", openArea: "78%" },
    ],
  },
  {
    mesh: "83 × 83 mm large-open mesh",
    rows: [
      { depth: "25", barThickness: "7.0 / 5.0", panelSizes: "1007 × 4007; 1173 × 4007", weight: "6.1", openArea: "84%" },
      { depth: "40", barThickness: "7.0 / 5.0", panelSizes: "1007 × 4007; 1173 × 4007", weight: "9.6", openArea: "84%" },
    ],
  },
  {
    mesh: "19.05 × 19.05 / 38.1 × 38.1 mm mini mesh",
    note: "Small top opening for pedestrian and heel-resistant layouts; verify the governing accessibility requirement.",
    rows: [
      { depth: "25", barThickness: "6.5 / 5.0", panelSizes: COMMON_PANELS, weight: "16.8", openArea: "30%" },
      { depth: "30", barThickness: "6.5 / 5.0", panelSizes: COMMON_PANELS, weight: "18.5", openArea: "30%" },
      { depth: "38", barThickness: "6.5 / 5.0", panelSizes: HD_PANELS, weight: "23.5", openArea: "30%" },
    ],
  },
  {
    mesh: "25.4 × 25.4 / 50.8 × 50.8 mm mini mesh",
    rows: [
      { depth: "15", barThickness: "6.5 / 5.0", panelSizes: "1220 × 3660; 1220 × 2440; 921 × 3050", weight: "7.5", openArea: "55%" },
      { depth: "50", barThickness: "8.0 / 6.0", panelSizes: COMMON_PANELS, weight: "28.5", openArea: "55%" },
    ],
  },
] as const;

export const moldedAdditionalMeshFamilies = [
  { mesh: "20 × 20 / 40 × 40 mm mini mesh", depths: "14, 22, 30, 40, 60 mm" },
  { mesh: "26 × 26 / 52 × 52 mm mini mesh", depths: "30, 38 mm" },
  { mesh: "13 × 13 / 40 × 40 mm mini mesh", depths: "22, 30, 40 mm" },
  { mesh: "25 × 100 mm rectangular mesh", depths: "25, 30 mm" },
  { mesh: "25.4 × 101.6 mm rectangular mesh", depths: "25, 25 HD, 38 mm" },
  { mesh: "38.1 × 101.6 mm rectangular mesh", depths: "38, 50 mm" },
  { mesh: "25.4 × 152.4 mm rectangular mesh", depths: "38 mm" },
  { mesh: "38.1 × 152.4 mm rectangular mesh", depths: "38 mm" },
  { mesh: "25.4 × 50.8 mm rectangular mesh", depths: "38, 50 mm" },
  { mesh: "60 × 100 mm rectangular mesh", depths: "28 mm" },
  { mesh: "60 × 220 mm rectangular mesh", depths: "40 mm" },
] as const;

export const moldedGratingManualImageAssets = {
  hero: "/images/products/molded-frp-grating/molded-grating-coastal-walkway.webp",
  closeup: "/images/products/molded-frp-grating/molded-grating-grit-mesh-closeup.webp",
  hardware: "/images/products/molded-frp-grating/grating-clips-hardware-reference.webp",
} as const;

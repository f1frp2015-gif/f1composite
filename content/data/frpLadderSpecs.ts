import type { CatalogSpecRow } from "@/content/data/accessSystemTypes";

export type { CatalogSpecRow } from "@/content/data/accessSystemTypes";

export interface RungCoverGroup {
  shape: "C-shape" | "U-shape";
  fitReference: string;
  sizes: readonly string[];
}

/**
 * Supplier-neutral transcription of the fixed-ladder catalog spread.
 * These are nominal catalog values, not a released project drawing or a load rating.
 */
export const frpFixedLadderCatalogSpecs: readonly CatalogSpecRow[] = [
  { item: "Maximum length without a splice", nominalValue: "7,300 mm" },
  { item: "Maximum ladder length with catalog cage", nominalValue: "10,200 mm" },
  { item: "Outside width, rail to rail", nominalValue: "500 mm" },
  { item: "Rung spacing, center to center", nominalValue: "300 mm" },
  { item: "Fluted round-tube rung", nominalValue: "32 mm outside diameter × 6.4 mm wall" },
  { item: "Square-tube side rail / post", nominalValue: "50.8 × 50.8 × 6.4 mm" },
  { item: "Solid square splice bar", nominalValue: "38 × 38 mm × 200 mm long" },
  { item: "Rung gasket", nominalValue: "Black rubber" },
  { item: "Catalog rung-to-rail rivet", nominalValue: "4 × 20 mm" },
] as const;

export const frpLadderCageComponents: readonly CatalogSpecRow[] = [
  { item: "Ladder hoop", nominalValue: "76 mm wide × 13 mm thick; hand lay-up; predrilled with bolt assemblies" },
  { item: "Hoop thickness source check", nominalValue: "English table and section detail show 13 mm; the Chinese line shows 10 mm — approved drawing controls" },
  { item: "Hoop bracket", nominalValue: "75 × 140 × 10 mm U-shape; predrilled with bolt assemblies" },
  { item: "Cage strip", nominalValue: "Pultruded C-channel 50 × 14 × 3 mm" },
  { item: "Wall-mount bracket", nominalValue: "Pultruded angle 76 × 200 × 9.5 mm; 457 mm long" },
  { item: "Floor mount", nominalValue: "Pultruded angle 102 × 102 × 9.5 mm; two per set with bolt assemblies" },
  { item: "Optional foot-base mount", nominalValue: "Molded BMC base" },
] as const;

export const frpLadderCageLayoutReferences: readonly CatalogSpecRow[] = [
  { item: "Equal hoop spacing", nominalValue: "1,219 mm maximum" },
  { item: "Wall-bracket spacing", nominalValue: "1,829 mm maximum" },
  { item: "Bottom-of-cage clearance", nominalValue: "2,100 mm minimum / 2,400 mm maximum" },
  { item: "Front cage width", nominalValue: "813 mm" },
  { item: "Walk-through side clear dimension", nominalValue: "400 mm ID" },
  { item: "Top-rung transition", nominalValue: "Top rung level with walkout surface" },
  { item: "Catalog platform-height reference", nominalValue: "9,144 mm maximum" },
] as const;

export const frpLadderRungCoverGroups: readonly RungCoverGroup[] = [
  {
    shape: "C-shape",
    fitReference: "D × T",
    sizes: ["20 × 3 mm", "25 × 3 mm", "30 × 3 mm", "35 × 3 mm"],
  },
  {
    shape: "U-shape",
    fitReference: "A × B × C × T",
    sizes: [
      "20 × 20 × 20 × 3 mm",
      "25 × 25 × 25 × 3 mm",
      "30 × 30 × 30 × 3 mm",
      "38 × 38 × 38 × 3 mm",
    ],
  },
] as const;

export const frpLadderManualImageAssets = {
  hero: "/images/products/frp-ladders/fiberglass-fixed-ladder-cage.webp",
  cageLayout: "/images/products/frp-ladders/frp-safety-cage-layout.webp",
  rungCovers: "/images/products/frp-ladders/fiberglass-ladder-rung-covers.webp",
} as const;

import type { CatalogSpecRow } from "@/content/data/accessSystemTypes";

export interface HandrailCatalogSystem {
  name: string;
  shortName: "Square" | "Round";
  description: string;
  rows: readonly CatalogSpecRow[];
  releaseNote: string;
}

/**
 * Supplier-neutral transcription of the square- and round-tube handrail spreads.
 * Values remain catalog references until the project BOM, loads and anchors are approved.
 */
export const frpHandrailCatalogSystems: readonly HandrailCatalogSystem[] = [
  {
    name: "Square-tube FRP handrail system",
    shortName: "Square",
    description:
      "A rectilinear post-and-rail arrangement with internal splices, kick plate, corner fittings and an optional base detail.",
    rows: [
      { item: "Post spacing", nominalValue: "1,500 mm maximum" },
      { item: "Handrail height", nominalValue: "1,220 mm maximum" },
      { item: "Top rail", nominalValue: "Square tube 50 × 50 × 6.4 mm" },
      { item: "Middle rail", nominalValue: "Square tube 50 × 50 × 6.4 mm" },
      { item: "Insert splice", nominalValue: "Square tube 38 × 38 × 6.4 mm" },
      { item: "Kick plate", nominalValue: "100 × 14 × 3 mm" },
      { item: "Kick-plate splice plate", nominalValue: "45 mm wide × 101 mm long × 6 mm thick" },
      { item: "90° kick-plate splice angle", nominalValue: "54 × 29 × 6.4 mm" },
      { item: "90° handrail fitting", nominalValue: "3 × FRP angles, 152 × 152 × 13 mm; 38 mm long" },
      { item: "Adjustable fitting", nominalValue: "Plastic fitting, 39°–180°" },
      { item: "Catalog connection rivet", nominalValue: "4 × 20 mm" },
    ],
    releaseNote:
      "The source illustration and table disagree on part of the middle-rail geometry. The approved project BOM and connection drawing therefore control the released assembly.",
  },
  {
    name: "Round-tube FRP handrail system",
    shortName: "Round",
    description:
      "A round post-and-rail arrangement using molded elbow, tee, cross and foot-base fittings with a separate kick plate.",
    rows: [
      { item: "Post spacing", nominalValue: "1,500 mm maximum" },
      { item: "Handrail height", nominalValue: "1,220 mm maximum" },
      { item: "Post", nominalValue: "Round tube 50 × 5 mm (catalog notation)" },
      { item: "Top rail", nominalValue: "Round tube 50 × 5 mm (catalog notation)" },
      { item: "Middle rail", nominalValue: "Round tube 50 × 5 mm (catalog notation)" },
      { item: "Kick plate", nominalValue: "101 × 14 × 3 mm" },
      { item: "Fittings", nominalValue: "BMC elbow, tee, cross and foot base" },
      { item: "Catalog fitting screws", nominalValue: "M5 × 55; elbow 2, tee 2, cross 3" },
      { item: "Catalog foot-base anchors", nominalValue: "M6 × 90; two per foot base" },
    ],
    releaseNote:
      "A kick-plate splice length in the source table appears anomalous and is intentionally omitted. Final splice size, fastener material and anchorage come from the approved project drawing.",
  },
] as const;

export const frpHandrailManualImageAssets = {
  hero: "/images/products/frp-handrail-systems/fiberglass-handrail-industrial-platform.webp",
  squareSystem: "/images/products/frp-handrail-systems/frp-square-handrail-system-layout.webp",
  roundSystem: "/images/products/frp-handrail-systems/frp-round-handrail-system-components.webp",
} as const;

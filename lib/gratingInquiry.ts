import { moldedGratingSpecGroups, type MoldedGratingSpecRow } from "@/content/data/moldedGratingSpecs";
import { pultrudedGratingSpecGroups, type PultrudedGratingSpec } from "@/content/data/pultrudedGratingSpecs";
import { buildRfqHref } from "@/lib/rfq";

export type GratingFamily = "molded" | "pultruded";
export const gratingProducts = {
  molded: { name: "Molded FRP Grating", path: "/products/molded-frp-grating", specifications: "molded-grating-specifications", clips: "M/C/J", cad: "/cad/f1-molded-grating-clips-m-c-j-316ss.dxf" },
  pultruded: { name: "Pultruded FRP Grating", path: "/products/frp-gratings", specifications: "pultruded-grating-specifications", clips: "M/J/T", cad: "/cad/f1-pultruded-grating-clips-m-j-t-316ss.dxf" },
} as const;

export function moldedGratingSelection(mesh: string, row: MoldedGratingSpecRow) {
  return `${mesh}; depth ${row.depth} mm; bar top/bottom ${row.barThickness} mm; panel options ${row.panelSizes} mm; nominal weight ${row.weight} kg/m²; open area ${row.openArea}`;
}

export function pultrudedGratingSelection(row: PultrudedGratingSpec) {
  return `${row.type}; depth ${row.depth} mm; bearing-bar center ${row.bearingBarCenter} mm; cross-bar center ${row.crossBarCenter} mm; nominal weight ${row.weight} kg/m²; open area ${row.openArea}`;
}

export function gratingInquiryHref(family?: GratingFamily, specification?: string, source = "grating-quote") {
  const product = family ? gratingProducts[family] : { name: "FRP Grating", path: "/products/grating" };
  return buildRfqHref({
    source, product: product.name, productPath: product.path, specification,
    message: `Please review and quote ${product.name}.${specification ? `\nSelected configuration: ${specification}` : "\nProduct type or help with selection:"}\n\nRequired panel size / cut plan:\nQuantity (panels or total area):\nApplication / resin / chemical exposure / temperature:\nSurface and color:\nClear span / support width / bearing direction:\nUniform or concentrated load / footprint / deflection limit:\nFixing clips and required documents:\nDelivery country / port or postcode / target date:\nSample requirement:\n\nPlease confirm the order quantity, applicable load data, cutting, packing, production timing and delivery scope.`,
  });
}

// Download and HTML views share the current website data, never a second manual copy.
export function gratingSpecificationsCsv(family: GratingFamily) {
  const rows: string[][] = family === "molded"
    ? [["Mesh designation", "Depth (mm)", "Bar top / bottom (mm)", "Panel options (mm)", "Nominal weight (kg/m²)", "Open area"], ...moldedGratingSpecGroups.flatMap(group => group.rows.map(row => [group.mesh, row.depth, row.barThickness, row.panelSizes, row.weight, row.openArea]))]
    : [["Series family", "Type", "Depth (mm)", "Bearing-bar center (mm)", "Cross-bar center (mm)", "Nominal weight (kg/m²)", "Open area"], ...pultrudedGratingSpecGroups.flatMap(group => group.rows.map(row => [group.name, row.type, row.depth, row.bearingBarCenter, row.crossBarCenter, row.weight, row.openArea]))];
  const notes = [
    ["F1 Composite", gratingProducts[family].name, `https://www.f1composite.com${gratingProducts[family].path}`],
    ["Selection data only. Nominal website dimensions and weights; not a load table, live inventory or certified order datasheet."],
    ["Mesh designations and bar center distances are not clear openings. Confirm openings, tolerances, resin, surface and load data for the order."],
    [],
  ];
  return "\uFEFF" + [...notes, ...rows].map(row => row.map(cell => `"${cell.replaceAll('"', '""')}"`).join(",")).join("\r\n") + "\r\n";
}

import { buildRfqHref } from "@/lib/rfq";

export function approximateInches(mm: number): string {
  return Number.isFinite(mm) && mm > 0 ? (mm / 25.4).toFixed(3) : "—";
}

export function tubeInquiryHref(productPath: string, product: string, specification: string): string {
  return buildRfqHref({
    source: "tube-size-selection",
    product,
    productPath,
    specification,
    message: `Please quote ${product}: ${specification}.\n\nCut length and pieces: \nService environment and temperature: \nResin / color / finish: \nDimensional tolerances and machining: \nLoad case and required documents: \nDelivery country / postcode and target date: \nSample requirement: \n\nPlease confirm the minimum production quantity, tooling, packing and lead time.`,
  });
}

export const sheetInquiryPath = "/products/fiberglass-sheets";

export interface SheetSelection {
  thickness: string;
  width: string;
  length: string;
  quantity: string;
  unit: "mm" | "in";
  surface: string;
}

export function sheetInquiry(selection: SheetSelection) {
  const { thickness, width, length, quantity, unit, surface } = selection;
  const specification = `Requested solid sheet: ${length} × ${width} × ${thickness} ${unit} (length × width × thickness); ${quantity} pieces; surface: ${surface}`;
  return {
    specification,
    message: `Please review and quote ${specification}.\n\nApplication and service temperature: \nChemical exposure, if any: \nResin preference or help needed: \nHoles, edge finish and tolerances: \nSupport, span and loads, if structural: \nRequired test documents: \nDelivery country / postcode and target date: \nSample requirement: \n\nPlease confirm feasibility, minimum production quantity, cutting layout, packing and lead time.`,
  };
}

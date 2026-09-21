import { buildRfqHref } from "@/lib/rfq";

export const agriculturePath = "/applications/agriculture-horticulture-stakes";
export const agricultureStages = {
  selection: "Help selecting stakes",
  sample: "Sample and field trial",
  quote: "Bulk quotation",
} as const;

export type AgricultureStage = keyof typeof agricultureStages;
export interface AgricultureBrief {
  application?: string;
  crop?: string;
  dimensions?: string;
  environment?: string;
  quantity?: string;
  destination?: string;
  timing?: string;
}

export function buildAgricultureInquiry(stage: AgricultureStage, brief: AgricultureBrief = {}) {
  const detail = (value?: string) => value?.trim() || "To be confirmed";
  return buildRfqHref({
    source: `agriculture-${stage}`,
    product: "Fiberglass planting stakes",
    productPath: "/products/fiberglass-stakes",
    specification: brief.application || "Agriculture and horticulture",
    message: [
      `Request: ${agricultureStages[stage]}`,
      `Application: ${detail(brief.application)}`,
      `Crop / plant and growth stage: ${detail(brief.crop)}`,
      `Diameter, overall / exposed length and embedment: ${detail(brief.dimensions)}`,
      `Wind, soil, ties / tube interface and outdoor exposure: ${detail(brief.environment)}`,
      `Quantity / repeat order plan: ${detail(brief.quantity)}`,
      `Delivery country / port: ${detail(brief.destination)}`,
      `Planting date / required arrival: ${detail(brief.timing)}`,
      "",
      stage === "sample"
        ? "Please propose sample options, costs and a field-trial checklist before volume approval."
        : stage === "quote"
          ? "Please confirm the offered specification, MOQ by SKU, unit price, packing, Incoterm, lead time and freight scope."
          : "Please help narrow the stake configuration and identify any missing application details.",
      "Please confirm resin / UV package, surface finish, end treatment and any accessory supply separately.",
    ].join("\n"),
  });
}

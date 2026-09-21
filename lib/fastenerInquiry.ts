import { fastenersPath } from "@/content/data/frpFasteners";
import { buildRfqHref } from "@/lib/rfq";

export function fastenerInquiryHref(product = "FRP Fasteners and Fittings", specification?: string) {
  return buildRfqHref({
    source: "fasteners-selection",
    product,
    productPath: fastenersPath,
    specification,
    message: `Please quote ${product}${specification ? `: ${specification}` : ""}.\n\nThread system / diameter / pitch: \nRod or bolt length / nut and washer dimensions: \nQuantity per size: \nResin or chemical exposure and service temperature: \nConnection drawing / loads / electrical requirements: \nRequired tests and installation instructions: \nDelivery country / postcode and target date: \n\nPlease confirm matching components, availability, MOQ, samples and lead time.`,
  });
}

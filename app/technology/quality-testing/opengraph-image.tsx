import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Quality and Testing",
    title: "Quality control, mechanical testing and batch traceability",
    description:
      "How F1 Composite profiles are inspected and tested, which EN and ASTM methods apply, and which reports come with an order.",
    accent: "#106f68",
    chips: ["EN and ASTM methods", "Published test reports", "Batch traceability"],
  });
}

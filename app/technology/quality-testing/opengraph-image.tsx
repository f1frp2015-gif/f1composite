import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Quality and Testing",
    title: "Certifications, QC Procedures, Mechanical Testing, and Batch Traceability",
    description:
      "An overview of F1 Composite quality systems, EN and ASTM references, and the testing workflow behind each production run.",
    accent: "#106f68",
    chips: ["ISO 9001", "EN and ASTM", "Batch traceability"],
  });
}

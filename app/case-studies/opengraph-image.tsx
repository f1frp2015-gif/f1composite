import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Case Studies",
    title: "Bridge, Marine, Industrial, Fenestration, and Energy Projects with Measurable FRP Outcomes",
    description:
      "Real application stories showing how pultruded FRP reduces weight, corrosion maintenance, and lifecycle cost across multiple sectors.",
    accent: "#0d7d76",
    chips: ["Measured results", "Project evidence", "Lifecycle savings"],
  });
}

import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Electrical Insulation Profiles",
    title: "Fiberglass Dog Bone Profiles",
    description: "Drawing-led pultruded GFRP supports for transformer and high-voltage equipment assemblies.",
    accent: "#0d7f79",
    chips: ["Custom cross-section", "Insulation requirements", "Drawing-led RFQ"],
  });
}

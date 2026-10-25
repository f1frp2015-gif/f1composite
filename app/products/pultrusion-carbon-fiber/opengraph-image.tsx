import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Carbon fiber pultrusion: plates, tubes and rods from F1 Composite";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Carbon Fiber Pultrusion",
    title: "Plates, Tubes & Rods",
    description: "Continuous carbon reinforcement. Drawing-led profiles for lightweight, stiffness-driven components.",
    accent: "#00A199",
    chips: ["CFRP profiles", "Custom sections", "Project quotation"],
  });
}

import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Four FRP bridge manufacturing routes with transparent calculations and F1 fabrication capabilities";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "F1 Composite / Bridge Engineering",
    title: "FRP Beam Bridges. Four Routes.",
    description:
      "Compare modular boxes, deep boxes, I-beam assemblies and curved moulded forms.",
    accent: "#245cce",
    chips: ["F1 capabilities", "Worked calculations", "Public case evidence"],
  });
}

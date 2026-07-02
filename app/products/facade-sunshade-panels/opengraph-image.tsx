import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Facade Sunshade Panels",
    title: "Pultruded FRP Sunshade Blades with E40 High-Modulus Multi-Layer Fabric Plates",
    description:
      "Vertical fins and horizontal louvers for curtain walls — long spans, no thermal bridge, no corrosion.",
    accent: "#13756f",
    chips: ["40 GPa (E40)", "No thermal bridge", "Any RAL color"],
  });
}

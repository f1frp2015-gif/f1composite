import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "FRP Flat Bar",
    title: "Solid Rectangular FRP Bars for Stiffeners, Wear Strips, Splice Plates, and General Fabrication",
    description:
      "Flat pultruded sections with consistent tolerances, corrosion resistance, and optional high glass content for higher stiffness.",
    accent: "#146a64",
    chips: ["Solid bar", "Tight tolerances", "General fabrication"],
  });
}

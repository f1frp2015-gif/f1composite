import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Grating Comparison",
    title: "FRP vs Steel Gratings — Corrosion, Weight, Slip Resistance, and Electrical Safety",
    description:
      "Compare load capacity, corrosion resistance, weight, slip resistance, and lifecycle cost between pultruded FRP gratings and hot-dip galvanized steel gratings.",
    accent: "#0f7069",
    chips: ["Gratings", "Load capacity", "Corrosion"],
  });
}

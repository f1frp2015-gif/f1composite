import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Siding panels",
    title: "Fiberglass Siding Panels for Industrial and Agricultural Buildings",
    description: "Corrugated, ribbed and flat FRP wall panels: ASTM D3841, weights, resins, fire class and fixing.",
    accent: "#0f8a83",
    chips: ["Corrugated", "ASTM D3841", "Fire-retardant grades"],
  });
}

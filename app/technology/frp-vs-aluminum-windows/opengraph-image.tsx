import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Window Frame Comparison",
    title: "FRP vs Aluminum Window Frames — Thermal Performance, Cost, and Passive House Suitability",
    description:
      "Compare U-value, thermal bridging, condensation risk, lifecycle cost, and PHI certification between FRP and thermally-broken aluminum window frames.",
    accent: "#0f7069",
    chips: ["U-value", "Passive house", "Fenestration"],
  });
}

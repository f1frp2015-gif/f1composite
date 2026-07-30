import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Free Tool",
    title: "Window U-value calculator — EN ISO 10077-1 for FRP and aluminum fenestration",
    description:
      "Free U-value calculator for window assemblies per EN ISO 10077-1. Compare frame, glazing, and edge thermal bridge contributions for FRP, aluminum, PVC, and timber window systems.",
    accent: "#117d76",
    chips: ["EN ISO 10077-1", "Frame · Glass · Edge", "Passivhaus reference"],
  });
}

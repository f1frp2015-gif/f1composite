import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Window Frame Comparison",
    title: "FRP vs PVC Window Frames — Thermal Performance, Durability, and Structural Capacity",
    description:
      "Compare U-value, thermal expansion, structural reinforcement, UV stability, fire performance, and large-span suitability between pultruded FRP and PVC/uPVC window frames.",
    accent: "#0f7069",
    chips: ["U-value", "Window frames", "Durability"],
  });
}

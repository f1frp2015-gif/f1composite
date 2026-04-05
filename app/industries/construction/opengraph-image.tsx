import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Construction",
    title: "FRP for Facades, Fenestration, Envelope Supports, and Lightweight Building Systems",
    description:
      "Construction use cases where pultruded FRP improves thermal performance, corrosion resistance, and low-maintenance envelope detailing.",
    accent: "#0f7a73",
    chips: ["Facade systems", "Thermal break advantage", "Lightweight framing"],
  });
}

import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Pultruded FRP Grating",
    title: "T-Bar, I-Bar & High-Load Grating",
    description:
      "Open one-way bearing-bar systems with manual-derived series tables and matched M/J/T 316SS clip kits.",
    accent: "#0d7f79",
    chips: ["I-bar & T-bar", "One-way spans", "M/J/T clips"],
  });
}

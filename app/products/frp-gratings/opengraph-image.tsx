import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Pultruded FRP Grating",
    title: "I-Bar, T-Bar & Structural Deck Panels",
    description:
      "Directional bearing-bar systems, high-load and high-open series, closed-top decks and matched M/J/T 316SS clip kits.",
    accent: "#0d7f79",
    chips: ["I-bar & T-bar", "One-way spans", "M/J/T clips"],
  });
}

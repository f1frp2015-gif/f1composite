import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Material Technology",
    title: "Polyurethane Pultrusion Windows — GFRP-PU Frame Technology Explained",
    description:
      "Why polyurethane resin outperforms polyester in pultruded fiberglass window frames: cross-fiber strength, thin walls, deep-cold toughness, and PHI-certified passive-house results.",
    accent: "#0f7069",
    chips: ["GFRP-PU", "Window frames", "Pultrusion"],
  });
}

import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "FRP I-Beam",
    title: "Wide Flange FRP I-Beams for Walkways, Platforms, Bridges, and Structural Frames",
    description:
      "Pultruded I-beam profiles from 76 x 38 mm to 305 x 305 mm with high strength-to-weight performance and corrosion resistance.",
    accent: "#0f8a83",
    chips: ["Wide flange", "Bridge and platform use", "Full size chart"],
  });
}

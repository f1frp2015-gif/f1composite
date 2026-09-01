import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Outdoor Noise Control",
    title: "FRP Sound Barrier Wall Panels",
    description:
      "Reflective or absorptive fiberglass noise barriers released against project acoustics, loads and drawings.",
    accent: "#0d7f79",
    chips: ["Reflective / absorptive", "Modular FRP panels", "Assembly-specific"],
  });
}

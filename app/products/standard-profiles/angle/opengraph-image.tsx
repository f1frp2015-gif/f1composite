import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "FRP Angle",
    title: "Equal and Unequal Leg FRP Angle Profiles for Stiffeners, Bracing, and Supports",
    description:
      "L-section pultruded profiles with corrosion resistance, low maintenance, and compatibility with concrete and mixed-material assemblies.",
    accent: "#117b74",
    chips: ["L-profiles", "Bracing and stiffeners", "Concrete compatible"],
  });
}

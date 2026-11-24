import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "FRP baffles",
    title: "Fiberglass Baffles for Clarifiers and Chlorine Contact Tanks",
    description: "Density current, scum and inlet baffles and baffle walls, with EPA baffling factors and design head.",
    accent: "#0f8a83",
    chips: ["Clarifiers", "Contact tanks", "316SS fixings"],
  });
}

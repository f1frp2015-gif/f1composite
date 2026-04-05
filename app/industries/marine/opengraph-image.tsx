import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Marine",
    title: "FRP for Docks, Offshore Platforms, Coastal Walkways, and Vessel Structures",
    description:
      "Marine applications where pultruded FRP avoids saltwater corrosion, lowers structural weight, and cuts maintenance cycles.",
    accent: "#0e6f69",
    chips: ["Saltwater resistant", "Offshore and dock use", "Lower maintenance"],
  });
}

import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Plant Support & Site Marking",
    title: "Fiberglass Stakes Manufacturer",
    description:
      "FRP plant, tree, vineyard and nursery stakes with a 5–19 mm public-market planning band.",
    accent: "#0d7f79",
    chips: ["5–19 mm planning band", "Custom color & length", "Tapered or flat ends"],
  });
}

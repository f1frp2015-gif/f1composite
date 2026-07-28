import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Glass fiber reinforced plastic",
    title: "Glass fiber reinforced plastic (FRP), explained for engineers",
    description:
      "A practical guide to GFRP terminology, composition, pultrusion, structural properties, standards, applications, and design limits.",
    accent: "#0d9a92",
    chips: ["GFRP materials", "Pultrusion basics", "Engineering reference"],
  });
}

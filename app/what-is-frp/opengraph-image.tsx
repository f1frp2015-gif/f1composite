import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "What is FRP",
    title: "What is FRP? Fiber reinforced polymer composites explained for engineers",
    description:
      "A complete guide to fiber reinforced polymer (FRP) composites — definition, materials, pultrusion process, structural properties, and where pultruded FRP outperforms steel and aluminum.",
    accent: "#0d9a92",
    chips: ["Materials guide", "Pultrusion basics", "Engineering reference"],
  });
}

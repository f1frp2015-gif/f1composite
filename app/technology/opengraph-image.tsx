import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Technology",
    title: "Pultrusion Process, Material Performance, Quality Testing, and Know-How",
    description:
      "Explore how F1 Composite controls process, validates performance, and transfers pultrusion expertise into real projects and production lines.",
    accent: "#0c6d68",
    chips: ["Process control", "Material comparison", "Quality testing"],
  });
}

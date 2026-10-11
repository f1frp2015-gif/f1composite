import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Materials Science",
    title: "Pultrusion Resin Systems: Choosing the Right Matrix",
    description:
      "Compare resin families through chemical exposure, UV protection, temperature, fire evidence and the offered formulation.",
    accent: "#c77f1e",
    chips: ["Resin matrix", "Vinyl ester vs polyester", "EN 13706"],
  });
}

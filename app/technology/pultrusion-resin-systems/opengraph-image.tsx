import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Materials Science",
    title: "Pultrusion Resin Systems: Choosing the Right Matrix",
    description:
      "Polyester, vinyl ester, polyurethane, epoxy, phenolic — compare HDT, corrosion, fire, and cost with an interactive resin selection matrix.",
    accent: "#c77f1e",
    chips: ["Resin matrix", "Vinyl ester vs polyester", "EN 13706"],
  });
}

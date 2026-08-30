import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Structural FRP Deck Panels",
    title: "12 Cross-Section Families",
    description:
      "Closed-profile fiberglass decking with neutral section drawings, nominal A/B/t1/t2 references and project-release guidance.",
    accent: "#0d7f79",
    chips: ["12 profiles", "Joint geometry", "Drawing support"],
  });
}

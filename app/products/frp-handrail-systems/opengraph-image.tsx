import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Industrial Edge Protection",
    title: "Fiberglass Handrail Systems",
    description:
      "Square- and round-tube systems with manual-verified component tables and drawing-led release notes.",
    accent: "#0d7f79",
    chips: ["Square & round", "Posts + rails", "Project load basis"],
  });
}

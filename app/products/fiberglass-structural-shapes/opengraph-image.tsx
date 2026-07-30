import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Standard Profiles",
    title: "I-Beams, Channels, Angles, Tubes, Flat Bars, and Rods in Pultruded FRP",
    description:
      "Stock structural profile range designed to replace steel in corrosive, lightweight, non-conductive, and low-maintenance applications.",
    accent: "#10837c",
    chips: ["7 core shapes", "ISO 9001", "75% lighter than steel"],
  });
}

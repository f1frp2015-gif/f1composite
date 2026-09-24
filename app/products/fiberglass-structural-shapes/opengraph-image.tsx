import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Standard Profiles",
    title: "I-Beams, Channels, Angles, Tubes, Flat Bars, and Rods in Pultruded FRP",
    description:
      "Catalog I-beams, channels, angles, tubes, flat bars and rods in pultruded fiberglass, with sizes and weights per metre.",
    accent: "#10837c",
    chips: ["7 core shapes", "114 catalog sizes", "6 m standard lengths"],
  });
}

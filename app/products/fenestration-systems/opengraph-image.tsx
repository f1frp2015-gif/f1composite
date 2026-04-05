import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Fenestration Systems",
    title: "Pultruded FRP Window and Door Frames with Low U-Values and Zero Thermal Bridging",
    description:
      "60, 70, 80, and 90-series frame systems designed for passive-house, commercial, and extreme-climate envelope performance.",
    accent: "#13756f",
    chips: ["0.8 W/m2K", "Passive-house ready", "Corrosion free"],
  });
}

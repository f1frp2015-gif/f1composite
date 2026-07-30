import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "FRP Windows · Frames · Profiles",
    title: "FRP Window Frames: Profiles & Finished Units",
    description:
      "Finished units or 65–140 series pultruded window profiles for local fabrication, with U-values to 0.78 W/m²K.",
    accent: "#13756f",
    chips: ["0.78 W/m2K", "Passive-house ready", "Corrosion free"],
  });
}

import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "FRP Windows · Frames · Profiles",
    title: "FRP Window Frames: Profiles & Finished Units",
    description:
      "Explore nine FRP window and door systems. Source profiles for local fabrication or specify complete units for your project.",
    accent: "#13756f",
    chips: ["9 systems", "System profiles", "Finished units"],
  });
}

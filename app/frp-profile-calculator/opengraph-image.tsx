import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Free Tool",
    title: "FRP profile load and deflection calculator — beam sizing for pultruded sections",
    description:
      "Free engineering calculator for pultruded FRP profiles. Beam deflection, load capacity, and section sizing for I-beams, channels, angles, tubes, and flat bars based on EN 13706 and ASTM D3917 properties.",
    accent: "#0f8a83",
    chips: ["Beam deflection", "EN 13706 properties", "Free · No login"],
  });
}

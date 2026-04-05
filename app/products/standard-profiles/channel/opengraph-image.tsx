import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "FRP Channel",
    title: "Pultruded U-Profiles for Framing, Cable Management, and Modular Assemblies",
    description:
      "UV-protected, non-conductive channel sections for industrial and infrastructure systems that need corrosion-free performance.",
    accent: "#0e746e",
    chips: ["U-profiles", "Non-conductive", "UV-protected"],
  });
}

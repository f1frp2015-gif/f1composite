import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "F1 Composite",
    title: "Pultruded FRP Profiles Manufacturer for Global Projects",
    description:
      "Structural shapes, custom sections, window and door profiles and grating from FengDu's 370-line production network, exported by F1 Composite.",
    accent: "#0d9a92",
    chips: ["30+ countries", "370 pultrusion lines", "Custom dies"],
  });
}

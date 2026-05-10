import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Pultruded FRP Profiles",
    title: "Pultruded FRP profiles — structural shapes, fenestration, gratings, and custom",
    description:
      "Direct-from-factory pultruded fiberglass profiles to EN 13706 and ASTM D3917. 4 product families covering structural, fenestration, gratings, and custom pultrusions.",
    accent: "#0f8a83",
    chips: ["EN 13706 / ASTM D3917", "ISO 9001", "30+ countries"],
  });
}

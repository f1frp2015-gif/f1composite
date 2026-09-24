import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Pultruded FRP Profiles",
    title: "Pultruded FRP profiles — structural shapes, fenestration, gratings, and custom",
    description:
      "Pultruded fiberglass profiles supplied to EN 13706 and ASTM D3917: structural shapes, window and door profiles, grating and custom sections.",
    accent: "#0f8a83",
    chips: ["EN 13706 / ASTM D3917", "Custom dies", "30+ countries"],
  });
}

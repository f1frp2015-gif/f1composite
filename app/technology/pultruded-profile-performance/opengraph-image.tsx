import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Engineering / Performance",
    title: "Pultruded FRP Profile Performance & Standards",
    description: "Dimensions, mechanical, thermal, electrical, fire and chemical properties. Define the method, conditions and evidence for your profile.",
    accent: "#107972",
    chips: ["Six performance areas", "GB / EN / ASTM", "Specification guide"],
  });
}

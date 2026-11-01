import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "F1 Composite carbon-fiber roller tubes";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Component specification",
    title: "Carbon-Fiber Roller Tubes",
    description: "A fifth of the mass, a third of the sag, 1.8 times the critical speed. Roller shells and blanks to the roller builder's drawing.",
    accent: "#117d76",
    chips: ["Idlers & guides", "1.8 × critical speed", "Shell to drawing"],
  });
}

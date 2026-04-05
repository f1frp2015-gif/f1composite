import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Infrastructure",
    title: "FRP for Bridge Decks, Walkways, Utility Structures, and Civil Assets",
    description:
      "Infrastructure applications where pultruded FRP reduces dead load, eliminates corrosion maintenance, and supports longer design life.",
    accent: "#11857d",
    chips: ["Bridges and walkways", "75+ year design life", "Lower dead load"],
  });
}

import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Infrastructure",
    title: "FRP for Bridge Decks, Walkways, Utility Structures, and Civil Assets",
    description:
      "Infrastructure applications where pultruded FRP cuts dead load and avoids the recoating cycle of steel.",
    accent: "#11857d",
    chips: ["Bridges and walkways", "No rust or recoating", "Lower dead load"],
  });
}

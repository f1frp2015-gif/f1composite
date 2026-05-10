import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "FRP Applications",
    title: "Pultruded FRP applications — bridge decks, cooling towers, cable trays, solar mounts",
    description:
      "Application-led FRP solutions: cable tray supports, cooling tower profiles, bridge deck panels, solar mounting, chemical-plant platforms — with profile, resin, and standards guidance per use case.",
    accent: "#117d76",
    chips: ["Use-case engineering", "Profile + resin guidance", "5 application families"],
  });
}

import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "FRP Round Rod",
    title: "Solid FRP Rods with High Longitudinal Glass Content for Anchoring and Tie Applications",
    description:
      "Pultruded solid rods for soil nails, rock bolts, marine tie-rods, and non-magnetic, non-conductive reinforcement uses.",
    accent: "#146f68",
    chips: ["Solid rod", "65-70% glass", "Anchoring uses"],
  });
}

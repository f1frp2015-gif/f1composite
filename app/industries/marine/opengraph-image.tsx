import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Marine",
    title: "FRP for Docks, Coastal Walkways and Offshore Access",
    description:
      "Grating, deck panels, structural profiles and handrails for marinas, boardwalks, offshore access routes and seawater facilities.",
    accent: "#0e6f69",
    chips: ["No rust in seawater", "Docks and boardwalks", "Offshore access"],
  });
}

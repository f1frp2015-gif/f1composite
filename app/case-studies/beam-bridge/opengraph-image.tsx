import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Pedestrian and cycle beam bridge design guide with source-backed case studies";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Pedestrian + Cycle Beam Bridges",
    title: "Beam Bridge Design for Active-Use Crossings",
    description:
      "Load path, clear width, vibration, FRP detailing and three public research cases.",
    accent: "#0a9b91",
    chips: ["Owner guidance", "Academic evidence", "Original diagrams"],
  });
}

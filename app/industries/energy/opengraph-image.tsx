import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Energy",
    title: "FRP for Cable Trays, Insulating Supports, Solar Structures, and Utility Installations",
    description:
      "Energy-sector applications where non-conductivity, UV durability, and lower weight make FRP attractive in power and renewables.",
    accent: "#126f68",
    chips: ["Non-conductive", "UV durable", "Power and renewables"],
  });
}

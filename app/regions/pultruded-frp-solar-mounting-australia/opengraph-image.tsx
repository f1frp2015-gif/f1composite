import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Australia · Solar Mounting",
    title: "Pultruded FRP solar mounting profiles for Australian PV and agri-PV projects",
    description:
      "Lightweight, UV-stable, corrosion-immune pultruded FRP profiles for Australian solar farm structures, cable management, and coastal PV installations.",
    accent: "#0d9a92",
    chips: ["AS/NZS compliant", "25-year UV stable", "Coastal corrosion-immune"],
  });
}

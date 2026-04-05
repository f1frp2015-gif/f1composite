import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Industries",
    title: "FRP Solutions for Construction, Infrastructure, Marine, Industrial, and Energy Applications",
    description:
      "Explore where pultruded FRP profiles deliver lighter weight, corrosion resistance, insulation, and longer service life across major sectors.",
    accent: "#0f7e78",
    chips: ["5 sectors", "Application guidance", "Corrosion-free design"],
  });
}

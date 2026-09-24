import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "About F1 Composite",
    title: "F1 Composite, FengDu New Material's export company",
    description:
      "Pultruded FRP profiles from FengDu's production network: 5 bases, 370 pultrusion lines, about 150,000 tonnes a year. Shipped to 30+ countries.",
    accent: "#117d76",
    chips: ["FengDu · 370 lines", "150,000 t/year", "30+ countries"],
  });
}

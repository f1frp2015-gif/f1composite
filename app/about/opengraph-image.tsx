import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "About F1 Composite",
    title: "F1 Composite — pultruded FRP profiles manufacturer, exporting to 30+ countries",
    description:
      "FengDu New Material's international export company — pultruded FRP profiles, 370 production lines, 150,000 t/year, ISO 9001.",
    accent: "#117d76",
    chips: ["FengDu · 370 lines", "150,000 t/year", "30+ countries"],
  });
}

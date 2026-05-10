import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "About F1 Composite",
    title: "F1 Composite — pultruded FRP profiles manufacturer, exporting to 30+ countries",
    description:
      "International contracting entity behind one of China's largest vertically integrated pultrusion manufacturers. 5 manufacturing bases, 370 pultrusion lines, 150,000 t/year, ISO 9001.",
    accent: "#117d76",
    chips: ["5 bases · 370 lines", "150,000 t/year", "30+ countries"],
  });
}

import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "About F1 Composite",
    title: "F1 Composite — pultruded FRP profiles manufacturer, exporting to 30+ countries",
    description:
      "International contracting entity exporting pultruded FRP from its Chongqing FengDu base — 370 pultrusion lines, 150,000 t/year, ISO 9001.",
    accent: "#117d76",
    chips: ["FengDu · 370 lines", "150,000 t/year", "30+ countries"],
  });
}

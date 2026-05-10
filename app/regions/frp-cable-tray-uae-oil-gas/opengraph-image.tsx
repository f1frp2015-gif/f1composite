import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "UAE · Oil & Gas Cable Tray",
    title: "FRP cable tray for UAE oil and gas — corrosion-immune, EMI-transparent, fire-rated",
    description:
      "Pultruded FRP cable tray systems for UAE upstream and downstream projects. Vinyl ester resin for sour-service tolerance, ASTM E84 Class 1 fire ratings.",
    accent: "#117d76",
    chips: ["NEMA VE 1 / IEC 61537", "ASTM E84 Class 1", "Corrosion-immune"],
  });
}

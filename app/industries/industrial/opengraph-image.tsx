import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Industrial",
    title: "FRP for Chemical Plants, Cooling Towers and Industrial Access",
    description:
      "Grating, platforms, handrails, ladders and cable supports for corrosive and wash-down areas, with the resin chosen for the chemicals on site.",
    accent: "#11726c",
    chips: ["Chemical-resistant resins", "Access structures", "Cable supports"],
  });
}

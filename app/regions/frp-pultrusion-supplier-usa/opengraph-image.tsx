import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "United States · FRP Pultrusion",
    title: "ASTM-compliant FRP pultrusions, DDP USA from F1 Composite",
    description:
      "Custom and standard pultruded FRP for US infrastructure, energy, and Passive House projects. ASTM E84 Class A, AAMA 2604/2605, PHIUS-certified frames.",
    accent: "#0f5fa3",
    chips: ["ASTM E84 Class A", "PHIUS 2491wi03", "DDP USA · 24-hour quote"],
  });
}

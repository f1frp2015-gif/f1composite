import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "United States · FRP Pultrusion",
    title: "Pultruded FRP profiles for US projects, delivered DDP",
    description:
      "Custom and standard pultruded FRP for US infrastructure, energy and Passive House projects, with ASTM test methods and PHI-certified 90-series window frames.",
    accent: "#0f5fa3",
    chips: ["ASTM test methods", "PHI 2491wi03", "DDP USA"],
  });
}

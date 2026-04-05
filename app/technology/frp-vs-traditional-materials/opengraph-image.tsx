import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Material Comparison",
    title: "FRP vs Steel, Aluminium, Timber, and Concrete in Structural and Envelope Applications",
    description:
      "Compare strength-to-weight ratio, corrosion resistance, thermal conductivity, electrical insulation, and lifecycle cost across major material options.",
    accent: "#0f7069",
    chips: ["Material comparison", "Lifecycle cost", "Property table"],
  });
}

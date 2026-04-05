import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "FRP Round Tube",
    title: "Circular Hollow FRP Tubes for Handrails, Guardrails, and Structural Applications",
    description:
      "Pultruded round tubes with smooth bore, low weight, and corrosion resistance for marine, industrial, and utility projects.",
    accent: "#0f786f",
    chips: ["Circular hollow", "Handrail systems", "Corrosion free"],
  });
}

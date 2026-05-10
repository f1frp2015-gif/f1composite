import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Ask the FRP Engineering Advisor",
    title: "FRP Engineering Advisor — ask anything about pultruded FRP profiles",
    description:
      "AI-powered engineering advisor for pultruded FRP composite profiles. Material selection, specifications, comparisons, and application guidance — instant answers grounded in F1 Composite's product knowledge base.",
    accent: "#0f8a83",
    chips: ["Free · Instant answer", "Material + spec guidance", "Product knowledge base"],
  });
}

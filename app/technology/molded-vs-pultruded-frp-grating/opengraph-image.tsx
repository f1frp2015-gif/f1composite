import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Grating comparison",
    title: "Molded vs Pultruded FRP Grating: Construction, Spans, Open Area and Clips",
    description: "Side-by-side ranges from published catalog rows, with a when-to-choose table for platforms and walkways.",
    accent: "#0f8a83",
    chips: ["Two-way mesh", "One-way bearing bars", "Selection table"],
  });
}

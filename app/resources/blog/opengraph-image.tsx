import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "F1 Composite Blog",
    title: "FRP engineering, from selection to installation",
    description:
      "Browse fiberglass materials, structural design, windows, grating, cable management and reinforcement. Find the guidance for your next project decision.",
    accent: "#0d9a92",
    chips: ["Material selection", "Design checks", "Installation guides"],
  });
}

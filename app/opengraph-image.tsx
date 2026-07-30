import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "F1 Composite",
    title: "Pultruded FRP Profiles Manufacturer for Global Projects",
    description:
      "Manufacturer of structural profiles, custom pultrusions, FRP window frames, and gratings & decks — with full technical resources for global buyers and engineers.",
    accent: "#0d9a92",
    chips: ["30+ countries", "ISO 9001", "Custom tooling"],
  });
}

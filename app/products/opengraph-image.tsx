import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Products",
    title: "FRP Profiles, Window Frames, Gratings & Decks, and Custom Pultrusions",
    description:
      "Browse F1 Composite's engineered product range for corrosion-resistant, lightweight, and dimensionally stable pultruded FRP systems.",
    accent: "#138b84",
    chips: ["Standard shapes", "Custom profiles", "Export ready"],
  });
}

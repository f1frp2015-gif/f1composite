import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Products",
    title: "FRP Profiles, Fenestration Systems, Gratings, and Custom Pultrusions",
    description:
      "Browse F1 Composite's engineered product range for corrosion-resistant, lightweight, and dimensionally stable composite systems.",
    accent: "#138b84",
    chips: ["Standard shapes", "Custom profiles", "Export ready"],
  });
}

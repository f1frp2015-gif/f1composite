import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "F1 Composite FRP supply for Los Angeles and Southern California";

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Los Angeles & Southern California",
    title: "FRP supply for your California project",
    description: "Structural profiles, grating and custom pultrusions. Contact Kevin Tang in Chino through the F1 Composite inquiry form.",
    accent: "#0f5fa3",
    chips: ["Structural profiles", "FRP grating", "Custom sections"],
  });
}

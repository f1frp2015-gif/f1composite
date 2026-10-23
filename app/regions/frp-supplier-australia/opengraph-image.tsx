import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Australia · Gold Coast contact",
    title: "FRP supply for Australian projects",
    description: "Fibreglass profiles, grating, window and door sections, and custom pultrusions. Send your project enquiry to F1 Composite.",
    accent: "#0f5fa3",
    chips: ["Structural profiles", "FRP / GRP grating", "Custom sections"],
  });
}

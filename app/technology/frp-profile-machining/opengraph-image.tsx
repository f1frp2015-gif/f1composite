import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
export const size = ogSize;
export const contentType = ogContentType;
export default function OpenGraphImage() {
  return renderOgImage({ eyebrow: "Fabrication guide", title: "FRP profile machining", description: "Cutting, drilling, slots, datum planning and first-article inspection for fiberglass profiles.", accent: "#00877f", chips: ["Illustrated operations", "Feature-specific tolerances", "Inspection planning"] });
}

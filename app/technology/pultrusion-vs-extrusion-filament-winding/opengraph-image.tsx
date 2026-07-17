import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Process Comparison",
    title: "Pultrusion vs Extrusion vs Filament Winding",
    description:
      "Process, fiber orientation, achievable shapes, and mechanical properties compared for composite and plastic profiles.",
    accent: "#0f7069",
    chips: ["Pultrusion", "Extrusion", "Filament winding"],
  });
}

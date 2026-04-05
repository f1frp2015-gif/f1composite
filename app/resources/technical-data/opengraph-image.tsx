import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Technical Data",
    title: "Mechanical Properties, Test Standards, and Material Benchmarks for FRP Profiles",
    description:
      "Reference data covering tensile, flexural, compressive, shear, density, glass content, and environmental performance.",
    accent: "#0d7a73",
    chips: ["ASTM references", "Material properties", "Specification support"],
  });
}

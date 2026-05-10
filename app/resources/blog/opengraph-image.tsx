import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "F1 Composite Blog",
    title: "Engineering content on pultruded FRP profiles, materials, and applications",
    description:
      "Material comparisons, application engineering, industry analysis, and procurement guides — written by named application engineers, R&D leads, and industry researchers at F1 Composite.",
    accent: "#0d9a92",
    chips: ["Named-author E-E-A-T", "Standards-grounded", "Updated 2026"],
  });
}

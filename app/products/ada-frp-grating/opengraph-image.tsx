import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "ADA grating",
    title: "ADA Fiberglass Grating: Small-Opening Molded and Pultruded FRP Panels",
    description: "The ½ in (13 mm) opening rule, the smallest-opening catalog rows and how to verify a panel for an accessible route.",
    accent: "#0f8a83",
    chips: ["½ in sphere rule", "13 mm mini mesh", "T-1210 / T-1215"],
  });
}

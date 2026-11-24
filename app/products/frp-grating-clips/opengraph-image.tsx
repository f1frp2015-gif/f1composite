import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "FRP Grating Clips",
    title: "Fiberglass Grating Clips: M, C, J and T Hold-Downs in 316 Stainless Steel",
    description: "Clip types, molded and pultruded compatibility, a per-panel quantity estimator and free DXF details.",
    accent: "#0f8a83",
    chips: ["Saddle clips", "No-drill J clamp", "Quantity estimator"],
  });
}

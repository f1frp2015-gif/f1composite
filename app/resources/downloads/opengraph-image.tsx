import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Downloads",
    title: "Catalogs, Certificates, CAD Files, and Technical Brochures",
    description:
      "Document library for buyers, fabricators, and engineers requesting product data, certifications, and design files.",
    accent: "#11857d",
    chips: ["Catalogs", "Certificates", "CAD library"],
  });
}

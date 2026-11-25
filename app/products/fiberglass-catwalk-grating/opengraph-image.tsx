import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Catwalk grating",
    title: "Fiberglass Catwalk Grating: Molded and Pultruded FRP Walkway Panels",
    description: "Catwalk loads and widths, the catalog rows used for maintenance walkways, supports, clips and edge protection.",
    accent: "#0f8a83",
    chips: ["40 psf + 300 lb", "600 mm clear width", "38 mm mesh · I-bar"],
  });
}

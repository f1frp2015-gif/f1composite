import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Molded FRP Grating",
    title: "Square Mesh, Mini Mesh & 316SS Clip Kits",
    description:
      "Manual-verified molded grating sizes, nominal weights, open area and M/C/J installation hardware for industrial and corrosive-service platforms.",
    accent: "#0d7f79",
    chips: ["13–65 mm depths", "Two-way mesh", "M/C/J clips"],
  });
}

import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Solid composite rods",
    title: "Carbon Fiber Rods",
    description: "Solid pultruded CFRP round bars. Specify diameter, cut length, material and end details for a project quotation.",
    accent: "#146f68",
    chips: ["Solid round bar", "Pultruded CFRP", "3/8 inch inquiries"],
  });
}

import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Industrial",
    title: "FRP for Chemical Plants, Water Facilities, Food Processing, and Industrial Access Systems",
    description:
      "Industrial material guidance for corrosive, wash-down, and process-heavy environments where steel maintenance becomes expensive.",
    accent: "#11726c",
    chips: ["Chemical resistance", "Access structures", "Lower maintenance"],
  });
}

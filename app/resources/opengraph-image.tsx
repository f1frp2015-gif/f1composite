import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Resources",
    title: "Design Guides, Technical Data, Downloads, and FRP Engineering Articles",
    description:
      "Technical content built for specifiers, buyers, and AI search tools evaluating pultruded composite applications.",
    accent: "#127d76",
    chips: ["Design guidance", "Testing references", "Downloadable docs"],
  });
}

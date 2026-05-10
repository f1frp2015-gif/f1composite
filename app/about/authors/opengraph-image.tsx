import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Authors",
    title: "Named experts behind F1 Composite engineering content",
    description:
      "Application engineering, materials R&D, and industry research — three named expertise tracks behind every article on f1composite.com.",
    accent: "#0d9a92",
    chips: ["Application engineering", "Materials R&D", "Industry research"],
  });
}

import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Design Guides",
    title: "FRP Selection, Connection Design, Fire Strategy, and Installation Guidance",
    description:
      "Engineering resources that help specifiers detail composite structures, jointing methods, and fenestration systems with more confidence.",
    accent: "#0f7069",
    chips: ["Selection guide", "Connection detail", "Engineering support"],
  });
}

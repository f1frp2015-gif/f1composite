import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Know-How and Services",
    title: "Pultrusion Consulting, Technology Transfer, and Turnkey Line Support",
    description:
      "Structured engineering support for startups and manufacturers covering process setup, tooling, training, commissioning, and handover.",
    accent: "#0f766f",
    chips: ["Consulting", "Technology transfer", "Turnkey support"],
  });
}

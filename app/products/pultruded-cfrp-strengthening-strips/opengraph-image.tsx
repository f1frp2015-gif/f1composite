import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "F1 Composite pultruded CFRP strengthening strips";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Component specification",
    title: "Pultruded CFRP Strengthening Strips",
    description: "A steel plate's tension at a tenth of the weight, bonded on by hand. Strips to the schedule, with laminate data and bonding face.",
    accent: "#117d76",
    chips: ["EB & NSM", "150–170 GPa class", "To the schedule"],
  });
}

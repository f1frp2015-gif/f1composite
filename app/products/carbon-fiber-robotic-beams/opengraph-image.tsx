import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "F1 Composite carbon-fiber robotic beams and struts";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Component specification",
    title: "Carbon-Fiber Robotic Beams & Struts",
    description: "A quarter of the moving mass at the same stiffness, twice the first frequency. Beam blanks, tubes and rods to the OEM drawing.",
    accent: "#117d76",
    chips: ["Gantry & delta", "≈ 23% of steel mass", "To drawing"],
  });
}

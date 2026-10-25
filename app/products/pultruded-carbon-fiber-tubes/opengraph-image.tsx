import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "F1 Composite pultruded carbon fiber tubes — custom CFRP tubing";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "F1-FORM · Carbon tubing",
    title: "Pultruded Carbon Fiber Tubes",
    description: "Specify the geometry, load path and connections. Compare CFRP with fiberglass tubing.",
    accent: "#00a199",
    chips: ["Longitudinal fibers", "Custom dimensions", "Drawing review"],
  });
}

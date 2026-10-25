import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "F1 Composite pultruded carbon fiber plates, strips and flat bars";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "F1-FORM · Carbon plates",
    title: "Pultruded Carbon Fiber Plates",
    description: "Flat CFRP profiles for reinforcement and lightweight stiffeners. Specify the section and bonding face.",
    accent: "#00a199",
    chips: ["Plates & strips", "Longitudinal fibers", "Custom dimensions"],
  });
}

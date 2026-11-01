import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "F1 Composite basalt FRP rebar";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Concrete reinforcement",
    title: "Basalt FRP Rebar (BFRP)",
    description: "1,100 MPa and 50 GPa classes drawn from rock. Eleven sizes from Ø3 to Ø25 mm, straight or coiled, with a product manual to download.",
    accent: "#117d76",
    chips: ["Ø3–Ø25 mm", "ASTM D8505 · CSA S807", "Manual PDF"],
  });
}

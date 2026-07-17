import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Canada · FRP Passive House Windows",
    title: "Fiberglass passive house windows, DDP Canada from F1 Composite",
    description:
      "Pultruded FRP fenestration for Canada's net-zero and step-code buildings. PHIUS-aligned PHI Cert 2491wi03, U_w 0.78 — not caught by the 25% surtax.",
    accent: "#d52b1e",
    chips: ["PHIUS 2491wi03 · U-factor 0.14", "CSA A440 / NAFS", "Surtax-free · DDP Canada"],
  });
}

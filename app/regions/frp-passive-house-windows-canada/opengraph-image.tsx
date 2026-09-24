import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Canada · FRP Passive House Windows",
    title: "Fiberglass passive house windows, DDP Canada from F1 Composite",
    description:
      "Pultruded FRP window frames for Canada's net-zero and Step Code buildings, with PHI component certificate 2491wi03 (Uw 0.78).",
    accent: "#d52b1e",
    chips: ["PHI 2491wi03 · U-factor 0.14", "NAFS / CSA A440 on request", "DDP Canada"],
  });
}

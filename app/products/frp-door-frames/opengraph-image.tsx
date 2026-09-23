import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "F1 Composite · Door Frame Profiles",
    title: "FRP Door Frame Profiles",
    description: "Custom pultruded fiberglass door frame sections for jambs, heads and matched seal interfaces.",
    accent: "#0d7f79",
    chips: ["Jambs & heads", "Custom sections", "Profile supply"],
  });
}

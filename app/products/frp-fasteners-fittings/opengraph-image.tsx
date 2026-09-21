import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "F1 Composite FRP Fasteners and Fittings: threaded rods, nuts, washers and molded fittings";

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "F1 Composite · Connection Components",
    title: "FRP Fasteners & Fittings",
    description: "Threaded rods, matching nuts, washers and molded fittings for your FRP assembly.",
    accent: "#0d7f79",
    chips: ["UNC & metric", "VE · Epoxy · Polyester", "Project quotations"],
  });
}

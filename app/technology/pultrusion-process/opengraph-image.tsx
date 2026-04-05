import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Pultrusion Process",
    title: "How Pultruded FRP Profiles Are Made, from Fiber Creel to Heated Die and Cut-Off",
    description:
      "A process-level view of fiber arrangement, resin impregnation, die cure, pull speed control, and the production logic behind pultruded FRP.",
    accent: "#107972",
    chips: ["Process steps", "Injection vs open-bath", "Manufacturing control"],
  });
}

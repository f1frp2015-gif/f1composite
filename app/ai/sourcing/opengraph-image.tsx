import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Free AI Tool",
    title: "FRP Sourcing Assistant — describe your project, get spec + factory price path in 60 seconds",
    description:
      "Free, no-login AI sourcing assistant. Tell our AI your application — environment, load, standards, geography — and get an instant FRP spec, recommended resin, certifications, and 48-hour quote path.",
    accent: "#0d9a92",
    chips: ["Free · No login", "Spec in 60 seconds", "48-hour quote path"],
  });
}

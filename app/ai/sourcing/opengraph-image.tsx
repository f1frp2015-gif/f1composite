import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Free AI Tool",
    title: "FRP Sourcing Assistant — describe your project and get a specification and factory-pricing path in 60 seconds",
    description:
      "Free, no-login AI sourcing assistant. Describe the application, environment, loads, standards and destination, and get a draft FRP specification to send for a quote.",
    accent: "#0d9a92",
    chips: ["Free · No login", "Draft spec in minutes", "Reply within 1 business day"],
  });
}

import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import ProfileCalculator from "./ProfileCalculator";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Profile Engineering Calculator",
  description:
    "Calculate FRP beam deflection, stress, and equivalent strength vs steel and aluminium. Based on EN 13706 and ASTM D3917 standards.",
  path: "/technology/calculator",
});

export default function CalculatorPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "FRP Profile Engineering Calculator",
          applicationCategory: "EngineeringApplication",
          operatingSystem: "Web",
          description:
            "Structural calculator for pultruded FRP profiles. EN 13706 / ASTM D3917 compliant. Beam deflection, bending stress, and steel/aluminium equivalence.",
          creator: {
            "@type": "Organization",
            name: "F1 Composite",
            url: "https://f1composite.com",
          },
        }}
      />
      <PageHeader
        tag="Engineering Tool"
        title="FRP Profile Calculator"
        description="Calculate beam deflection, bending stress, and find equivalent FRP replacements for steel and aluminium sections. Based on EN 13706, ASTM D3917, and ASCE Pre-Standard for FRP composites."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Technology", href: "/technology" },
          { label: "Calculator" },
        ]}
      />

      <ProfileCalculator />

      <InnerCTA title="Need engineering support for your FRP profile selection?" />
    </>
  );
}

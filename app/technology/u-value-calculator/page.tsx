import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import UValueCalculator from "./UValueCalculator";

export const metadata: Metadata = buildPageMetadata({
  title: "Window U-Value Calculator — FRP Frame & Glass Configuration",
  description:
    "Calculate whole-window U-value (Uw) per EN ISO 10077-1. Compare FRP, aluminium, PVC, and timber frames with double, triple, and quadruple glazing configurations.",
  path: "/technology/u-value-calculator",
});

export default function UValueCalculatorPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Window U-Value Calculator",
          applicationCategory: "EngineeringApplication",
          operatingSystem: "Web",
          description:
            "Whole-window thermal transmittance calculator per EN ISO 10077-1. Compare FRP, aluminium, PVC, and timber frames with common glass configurations.",
          creator: {
            "@type": "Organization",
            name: "F1 Composite",
            url: "https://f1composite.com",
          },
        }}
      />
      <PageHeader
        tag="Engineering Tool"
        title="Window U-Value Calculator"
        description="Calculate the whole-window thermal transmittance (Uw) per EN ISO 10077-1. Select frame material, glazing configuration, spacer type, and window dimensions to compare thermal performance across materials."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Technology", href: "/technology" },
          { label: "U-Value Calculator" },
        ]}
      />

      <UValueCalculator />

      {/* Cross-link to fenestration */}
      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px] text-center">
          <p className="text-f15 leading-golden text-t2">
            Explore our complete range of pultruded FRP window and door frame systems —
            60/70/80/90-series with U<sub>f</sub> values from 0.85 to 1.5 W/m²K.
          </p>
          <Link
            href="/products/fenestration-systems"
            className="mt-[21px] inline-block rounded-[8px] bg-teal px-[34px] py-[13px] text-f13 font-bold uppercase tracking-wide text-white transition-colors hover:bg-teal-text"
          >
            View Fenestration Systems →
          </Link>
        </div>
      </section>

      <InnerCTA title="Need help selecting the right frame and glass for your project?" />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import SectionGlyph, { type GlyphShape } from "@/components/ui/SectionGlyph";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

const pagePath = "/tools";
const pageDescription =
  "Free engineering tools for pultruded FRP: profile finder, beam and deflection calculator, span tables, density and weight, prices and window U-values.";

export const metadata: Metadata = buildPageMetadata({ title: "FRP Engineering Tools & Calculators", description: pageDescription, path: pagePath });

const tools: { href: string; title: string; text: string; glyph: GlyphShape }[] = [
  { href: "/tools/profile-finder", title: "Profile finder", text: "Filter the standard sizes by shape, size, mass and stiffness, and compare up to four.", glyph: "i_beam" },
  { href: "/frp-profile-calculator", title: "FRP profile calculator", text: "Bending, shear and Timoshenko-corrected deflection for a section, span and load, with steel and aluminum equivalents.", glyph: "channel" },
  { href: "/frp-span-tables", title: "Span tables", text: "Allowable uniform loads for the published I-beams, channels and tubes over 1 to 6 m spans.", glyph: "shs" },
  { href: "/frp-density-calculator", title: "Density and weight", text: "FRP density from mat, fabric and roving, and profile weight from the section.", glyph: "flat" },
  { href: "/fiberglass-pultruded-profile-price", title: "Price estimator", text: "Planning prices per meter and per kilogram by section, resin, finish and volume.", glyph: "rhs" },
  { href: "/technology/frp-u-value-calculator", title: "Window U-value calculator", text: "Whole-window U-value to EN ISO 10077-1, comparing FRP with aluminum, PVC and timber.", glyph: "window" },
  { href: "/ask", title: "Engineering assistant", text: "Questions on profile selection, resins, standards and documents, answered from catalog data and test reports.", glyph: "custom" },
  { href: "/ai/sourcing", title: "Sourcing assistant", text: "Match profiles, resins and standards to a project and send the result as a quote request.", glyph: "multicell" },
  { href: "/ai/passive-house", title: "Passive House window selector", text: "Match climate, target U-value and opening type to PHI-certified FRP window series.", glyph: "window" },
];

export default function ToolsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "FRP engineering tools",
          url: absoluteUrl(pagePath),
          description: pageDescription,
          hasPart: tools.map((tool) => ({ "@type": "WebApplication", name: tool.title, url: absoluteUrl(tool.href), applicationCategory: "EngineeringApplication" })),
        }}
      />
      <PageHeader
        tag="Tools"
        title="Engineering tools"
        description="Find a standard size, check it against a span and load, estimate weight and price, and prepare the details a quotation needs. The tools are free and need no login."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools" }]}
      />
      <section className="bg-white py-[48px]">
        <div className="site-container">
          <ul className="grid gap-[16px] sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <li key={tool.href}>
                <Link href={tool.href} className="flex h-full gap-[14px] rounded-card border border-border-default bg-white p-[18px] transition-shadow hover:border-teal-border hover:shadow-card">
                  <SectionGlyph shape={tool.glyph} size={36} />
                  <span>
                    <span className="block text-f18 font-bold text-t1">{tool.title}</span>
                    <span className="mt-[4px] block text-f14 text-t2">{tool.text}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

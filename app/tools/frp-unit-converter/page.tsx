import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ToolSection from "@/components/layout/ToolSection";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { FAQList } from "@/components/ui/FAQ";
import RelatedLinks from "@/components/sections/RelatedLinks";
import UnitConverter from "@/components/tools/UnitConverter";
import { QUANTITIES, convertAll, formatValue } from "@/lib/unitConverter";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

const pagePath = "/tools/frp-unit-converter";
const pageDescription =
  "Convert FRP engineering units between metric and US: MPa, ksi, GPa, Msi, kN/m, plf, psf, kg/m, lb/ft, in⁴, U-values and R-values, and inch profile sizes.";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Unit Converter | MPa, ksi, Msi, kg/m, lb/ft",
  description: pageDescription,
  path: pagePath,
});

// Reference rows: common FRP values in both systems, computed from the same factors.
const REFERENCE: { label: string; quantity: string; value: number; from: string; to: string; toLabel: string; fromLabel: string }[] = [
  { label: "E23 lengthwise tensile strength", quantity: "stress", value: 240, from: "MPa", fromLabel: "MPa", to: "ksi", toLabel: "ksi" },
  { label: "E23 lengthwise modulus", quantity: "modulus", value: 23, from: "GPa", fromLabel: "GPa", to: "Msi", toLabel: "Msi" },
  { label: "E17 lengthwise modulus", quantity: "modulus", value: 17, from: "GPa", fromLabel: "GPa", to: "Msi", toLabel: "Msi" },
  { label: "OSHA guardrail test load", quantity: "force", value: 200, from: "lbf", fromLabel: "lbf", to: "kN", toLabel: "kN" },
  { label: "IBC guard line load", quantity: "line-load", value: 50, from: "lbf/ft", fromLabel: "lb/ft", to: "kN/m", toLabel: "kN/m" },
  { label: "ASCE 7 catwalk live load", quantity: "pressure", value: 40, from: "psf", fromLabel: "psf", to: "kPa", toLabel: "kPa" },
  { label: "Pultruded FRP density", quantity: "density", value: 1.9, from: "g/cm3", fromLabel: "g/cm³", to: "lb/ft3", toLabel: "lb/ft³" },
  { label: "FRP lengthwise thermal expansion", quantity: "expansion", value: 8, from: "1e-6/K", fromLabel: "× 10⁻⁶/K", to: "1e-6/F", toLabel: "× 10⁻⁶/°F" },
  { label: "Window U-value", quantity: "u-value", value: 0.8, from: "W/m2K", fromLabel: "W/(m²·K)", to: "Btu/hft2F", toLabel: "Btu/(h·ft²·°F)" },
];

const faqs = [
  {
    question: "Which conversion factors does the converter use?",
    answer:
      "The exact definitions, 1 in = 25.4 mm and 1 lb = 0.45359237 kg, with standard gravity 9.80665 m/s² for pound-force and kilogram-force, and the International Table Btu for the thermal units, as listed in NIST Special Publication 811. Results show five significant figures; round them to the precision the drawing needs.",
  },
  {
    question: "Is 1 Msi the same as 6.9 GPa?",
    answer:
      "Yes. 1 Msi is one million pounds per square inch, 6.895 GPa. The EN 13706 minimum lengthwise moduli of the E23 and E17 grades, 23 and 17 GPa, are 3.34 and 2.47 Msi, which makes them easy to compare with a US data sheet.",
  },
  {
    question: "Can a metric profile replace an inch size from a US drawing?",
    answer:
      "Often, but check the section. Several F1 catalog sizes correspond to inch sizes, such as I 305×305×12.7 (12 × 12 × 1/2 in) and L 102×102×9.5 (4 × 4 × 3/8 in), so they match exactly. Where the closest metric size differs by a few per cent, its area, stiffness and strength differ too; run it through the profile or column calculator before substituting, and ask if the exact inch size is needed.",
  },
  {
    question: "Why convert U-values and R-values separately?",
    answer:
      "A U-value is the heat flow through an element, and an R-value its resistance, the inverse for a single layer. US and Canadian window ratings quote U-factors in Btu/(h·ft²·°F), while Europe uses W/(m²·K); 1 Btu/(h·ft²·°F) is 5.678 W/(m²·K). Rating methods also differ (NFRC 100 against EN ISO 10077), so a converted number is not a like-for-like rating.",
  },
];

export default function UnitConverterPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "FRP Engineering Unit Converter",
          url: absoluteUrl(pagePath),
          description: pageDescription,
          applicationCategory: "EngineeringApplication",
          operatingSystem: "Any",
          isAccessibleForFree: true,
          publisher: { "@id": "https://www.f1composite.com/#organization" },
        }}
      />
      <PageHeader
        tag="Tools"
        title="FRP engineering unit converter"
        description="Convert strengths, moduli, loads, section properties, weights and thermal values between metric and US units, and find the metric catalog size closest to an inch profile on a US drawing."
        facts={[
          { label: "Quantities", value: String(QUANTITIES.length) },
          { label: "Factors", value: "Exact / NIST SP 811" },
          { label: "Inch sizes", value: "Fractions accepted" },
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "Unit converter" }]}
      />

      <PageNav items={[{ id: "tool", label: "Converter" }, { id: "reference", label: "Common values" }, { id: "faq", label: "FAQ" }]} />

      <ToolSection label="FRP engineering unit converter">
        <UnitConverter />
      </ToolSection>

      <PageSection id="reference" title="Common FRP values in both systems" intro="Values that come up in FRP specifications and codes, converted with the same factors as the tool." tone="muted">
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[560px] border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Value</th>
                <th scope="col" className="px-[14px] py-[8px] text-right font-semibold text-t1">Given as</th>
                <th scope="col" className="px-[14px] py-[8px] text-right font-semibold text-t1">Converted</th>
              </tr>
            </thead>
            <tbody>
              {REFERENCE.map((row) => {
                const converted = convertAll(row.quantity, row.value, row.from).find((item) => item.unit.id === row.to)?.value ?? NaN;
                return (
                  <tr key={row.label} className="border-b border-border-default last:border-b-0">
                    <th scope="row" className="px-[14px] py-[8px] font-normal text-t2">{row.label}</th>
                    <td className="px-[14px] py-[8px] text-right tabular-nums text-t1">{row.value} {row.fromLabel}</td>
                    <td className="px-[14px] py-[8px] text-right tabular-nums text-t1">{formatValue(Number(converted.toPrecision(3)))} {row.toLabel}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-[16px] max-w-[820px] text-f14 leading-golden text-t2">
          Material values for F1 profiles are on the{" "}
          <Link href="/resources/technical-data" className="font-semibold text-teal-text hover:underline">technical data page</Link>, and
          guardrail and walkway loads by market are in the{" "}
          <Link href="/tools/handrail-load-calculator" className="font-semibold text-teal-text hover:underline">handrail load check</Link>.
        </p>
      </PageSection>

      <PageSection id="faq" title="Frequently asked questions" tone="white">
        <FAQList items={faqs} />
      </PageSection>

      <RelatedLinks
        background="bg2"
        groups={[
          { title: "Other tools", links: [
            { href: "/tools", label: "All engineering tools" },
            { href: "/tools/profile-finder", label: "Profile finder" },
            { href: "/tools/frp-column-calculator", label: "Column buckling calculator" },
          ] },
          { title: "Profiles", links: [
            { href: "/products/fiberglass-structural-shapes", label: "Fiberglass structural shapes" },
            { href: "/technology/china-alternative-to-strongwell-fiberline-exel", label: "Alternatives to US and EU profile suppliers" },
            { href: "/products/custom-pultruded-profiles", label: "Custom pultruded profiles" },
          ] },
          { title: "Data", links: [
            { href: "/resources/technical-data", label: "FRP technical data" },
            { href: "/technology/frp-u-value-calculator", label: "Window U-value calculator" },
            { href: "/resources/glossary", label: "FRP glossary" },
          ] },
        ]}
      />
      <InnerCTA
        title="Working from a US or European drawing?"
        quoteHref="/contact?source=tool-unit-converter&inquiry_type=rfq"
        text="Send the drawing with the sizes as given; engineering confirms the matching catalog sizes or quotes the exact ones."
      />
    </>
  );
}

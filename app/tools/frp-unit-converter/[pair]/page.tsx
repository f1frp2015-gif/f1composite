import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ToolSection from "@/components/layout/ToolSection";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import { FAQList } from "@/components/ui/FAQ";
import UnitConverter from "@/components/tools/UnitConverter";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import {
  UNIT_CONVERSION_PAGES,
  unitConversionPagesUpdated,
  conversionDescription,
  conversionFactor,
  conversionLabels,
  conversionPage,
  conversionPath,
  conversionTitle,
  convertPair,
  referenceRows,
  tableValue,
} from "@/lib/unitConversionPages";

interface PageProps {
  params: Promise<{ pair: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return UNIT_CONVERSION_PAGES.map((page) => ({ pair: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { pair } = await params;
  const page = conversionPage(pair);
  if (!page) return {};
  return buildPageMetadata({ title: conversionTitle(page), description: conversionDescription(page), path: conversionPath(page.slug) });
}

const th = "px-[14px] py-[8px] font-semibold text-t1";
const td = "px-[14px] py-[8px] tabular-nums text-t1";
const link = "font-semibold text-teal-text hover:underline";

export default async function UnitConversionPage({ params }: PageProps) {
  const { pair } = await params;
  const page = conversionPage(pair);
  if (!page) notFound();
  const { from, to } = conversionLabels(page);
  const factor = conversionFactor(page);
  const references = referenceRows(page);
  const path = conversionPath(page.slug);
  const reverse = UNIT_CONVERSION_PAGES.find((other) => other.from === page.to && other.to === page.from);
  const others = UNIT_CONVERSION_PAGES.filter((other) => other.slug !== page.slug);
  const psiNote =
    page.quantity === "modulus"
      ? "1 Msi is one million pounds per square inch (psi) and 1 ksi is one thousand. With 1 lbf = 4.4482216 N and 1 in = 25.4 mm exactly, 1 psi = 6,894.757 Pa, so 1 Msi = 6.894757 GPa = 6,894.757 MPa."
      : "1 ksi is one thousand pounds per square inch (psi). With 1 lbf = 4.4482216 N and 1 in = 25.4 mm exactly, 1 psi = 6,894.757 Pa, so 1 ksi = 6.894757 MPa (N/mm²).";

  const faqs = [
    {
      question: `How many ${to} is 1 ${from}?`,
      answer: `1 ${from} = ${factor.forward} ${to}, and 1 ${to} = ${factor.reverse} ${from}. Multiply a value in ${from} by ${factor.forward} to get ${to}.`,
    },
    {
      question: "Which conversion factors are these?",
      answer:
        "The exact definitions 1 in = 25.4 mm and 1 lb = 0.45359237 kg, with standard gravity 9.80665 m/s² for pound-force, as listed in NIST Special Publication 811. The table rounds to four significant figures; use the converter above for full precision.",
    },
    {
      question: page.quantity === "modulus" ? "What modulus does pultruded FRP have in both units?" : "What strength does pultruded FRP have in both units?",
      answer: `${references.map((row) => `${row.label}: ${row.from} ${from} = ${row.to} ${to}`).join("; ")}. Values for F1 profiles are on the technical data page.`,
    },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: `${from} to ${to} converter`,
          url: absoluteUrl(path),
          description: conversionDescription(page),
          applicationCategory: "EngineeringApplication",
          operatingSystem: "Any",
          isAccessibleForFree: true,
          isPartOf: { "@id": `${absoluteUrl("/tools/frp-unit-converter")}#webapp` },
          publisher: { "@id": "https://www.f1composite.com/#organization" },
          dateModified: unitConversionPagesUpdated,
        }}
      />
      <PageHeader
        updated={unitConversionPagesUpdated}
        tag="Unit conversion"
        title={`${from} to ${to}`}
        description={`${page.context} Multiply ${from} by ${factor.forward} to get ${to}.`}
        facts={[
          { label: `1 ${from}`, value: `${factor.forward} ${to}` },
          { label: `1 ${to}`, value: `${factor.reverse} ${from}` },
          { label: "Factors", value: "Exact / NIST SP 811" },
        ]}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Unit converter", href: "/tools/frp-unit-converter" },
          { label: `${from} to ${to}` },
        ]}
      />

      <PageNav items={[{ id: "tool", label: "Converter" }, { id: "table", label: `${from} to ${to} table` }, { id: "frp-values", label: "FRP values" }, { id: "faq", label: "FAQ" }]} />

      <ToolSection label={`${from} to ${to} converter`}>
        <UnitConverter initialQuantity={page.quantity} initialFrom={page.from} initialValue="1" />
      </ToolSection>

      <PageSection id="table" title={`${from} to ${to} conversion table`} intro={psiNote} tone="white">
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white sm:max-w-[520px]">
          <table className="w-full border-collapse text-left text-f14">
            <caption className="sr-only">{`${from} to ${to} conversion table`}</caption>
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className={`${th} text-right`}>{from}</th>
                <th scope="col" className={`${th} text-right`}>{to}</th>
              </tr>
            </thead>
            <tbody>
              {page.values.map((value) => (
                <tr key={value} className="border-b border-border-default last:border-b-0">
                  <th scope="row" className={`${td} text-right font-semibold`}>{tableValue(value)}</th>
                  <td className={`${td} text-right`}>{tableValue(convertPair(page, value))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {reverse && (
          <p className="mt-[16px] text-f16">
            Going the other way? <Link href={conversionPath(reverse.slug)} className={link}>{to} to {from}</Link>.
          </p>
        )}
      </PageSection>

      <PageSection id="frp-values" title={`FRP values in ${from} and ${to}`} intro="Reference values from the converter, converted with the same factors." tone="muted">
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[480px] border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className={th}>Value</th>
                <th scope="col" className={`${th} text-right`}>{from}</th>
                <th scope="col" className={`${th} text-right`}>{to}</th>
              </tr>
            </thead>
            <tbody>
              {references.map((row) => (
                <tr key={row.label} className="border-b border-border-default last:border-b-0">
                  <th scope="row" className="px-[14px] py-[8px] font-normal text-t2">{row.label}</th>
                  <td className={`${td} text-right`}>{row.from}</td>
                  <td className={`${td} text-right`}>{row.to}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-[16px] max-w-[820px] text-f14 leading-golden text-t2">
          Laminate values for F1 profiles are on the <Link href="/resources/technical-data" className={link}>technical data page</Link>. For
          loads, weights, section properties and thermal values, use the full{" "}
          <Link href="/tools/frp-unit-converter" className={link}>FRP engineering unit converter</Link>.
        </p>
      </PageSection>

      <PageSection id="faq" title="Frequently asked questions" tone="white">
        <FAQList items={faqs} />
      </PageSection>

      <RelatedLinks
        groups={[
          { title: "Other conversions", links: others.map((other) => { const l = conversionLabels(other); return { href: conversionPath(other.slug), label: `${l.from} to ${l.to}` }; }) },
          { title: "Tools", links: [
            { href: "/tools/frp-unit-converter", label: "FRP engineering unit converter" },
            { href: "/frp-profile-calculator", label: "FRP beam and section calculator" },
            { href: "/frp-span-tables", label: "FRP span tables" },
          ] },
        ]}
      />

      <InnerCTA />
    </>
  );
}

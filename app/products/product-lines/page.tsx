import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import AnswerBlocks from "@/components/sections/AnswerBlocks";
import SectionTag from "@/components/ui/SectionTag";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

const pagePath = "/products/product-lines";
const ORG_ID = "https://www.f1composite.com/#organization";

export const metadata: Metadata = buildPageMetadata({
  title: "F1-STRUX, F1-GRID, F1-THERM & F1-FORM — FRP Product Lines",
  description:
    "F1 Composite's four pultruded FRP product lines: F1-STRUX structural profiles, F1-GRID gratings, F1-THERM fenestration, and F1-FORM custom pultrusions.",
  path: pagePath,
});

const lines: Array<{
  brand: string;
  name: string;
  href: string;
  category: string;
  body: string;
  equivalent: string;
}> = [
  {
    brand: "F1-STRUX",
    name: "Pultruded FRP Structural Profiles",
    href: "/products/standard-profiles",
    category: "I-beam, channel, angle, square/round tube, flat bar, round rod",
    body: "F1 Composite's structural profile line — stock pultruded fiberglass shapes to EN 13706 E17/E23 and ASTM D3917, from 10 mm to 300 mm cross-sections.",
    equivalent: "Class of Strongwell EXTREN® / Creative Pultrusions SuperStrut® structural shapes.",
  },
  {
    brand: "F1-GRID",
    name: "FRP Gratings & Structural Deck Panels",
    href: "/products/gratings",
    category: "Molded & pultruded gratings, solid-top covers, AASHTO H-20 deck panels",
    body: "F1 Composite's grating and decking line — molded and pultruded FRP gratings, cover plates, and structural deck panels for platforms, walkways, and pedestrian/vehicular decks.",
    equivalent: "Class of Strongwell DURADEK® / DURAGRID® gratings and decks.",
  },
  {
    brand: "F1-THERM",
    name: "Pultruded Fiberglass Window Frames & Fenestration Profiles",
    href: "/products/fenestration-systems",
    category: "65 / 70 / 80 / 90 / 140-series frame depths; PHI-certified 90-series",
    body: "F1 Composite's fenestration line — pultruded FRP window frames and window profiles with whole-window U-values to 0.78 W/m²·K. The 90-series is Passive House Institute (PHI) certified.",
    equivalent: "FRP / GFRP window-profile supply to fabricators (vs finished-window brands).",
  },
  {
    brand: "F1-FORM",
    name: "Custom Pultruded FRP Profiles",
    href: "/products/custom-pultrusions",
    category: "Bespoke dies up to 600×300 mm; polyester / vinyl ester / PU / epoxy",
    body: "F1 Composite's custom pultrusion line — bespoke cross-sections to your drawing, with 3–6 week die fabrication and 6–10 week first-production turnaround.",
    equivalent: "Custom pultrusion / bespoke die service (engineer-to-order profiles).",
  },
];

const faqItems = [
  {
    question: "What are F1-STRUX, F1-GRID, F1-THERM, and F1-FORM?",
    answer:
      "They are the four pultruded FRP product lines of F1 Composite, an industrial fiberglass profiles manufacturer. F1-STRUX = pultruded structural profiles (I-beams, channels, angles, tubes, flat bars, rods); F1-GRID = FRP gratings and structural deck panels; F1-THERM = pultruded fiberglass window frames and fenestration profiles; F1-FORM = custom pultruded profiles. All are made to EN 13706 and ASTM D3917 under ISO 9001:2015.",
  },
  {
    question: "Are F1-STRUX / F1-GRID / F1-THERM / F1-FORM related to Formula 1?",
    answer:
      "No. These are industrial composite product-line names from F1 Composite, a pultruded FRP (fiberglass) profiles manufacturer in Chongqing, China. The \"F1\" stands for \"Fiber One\" (fiberglass) — they have no connection to Formula 1, the FIA, or motorsport. The names denote FRP product families used in construction, infrastructure, energy, marine, and industrial applications.",
  },
  {
    question: "Which F1 Composite product line do I need?",
    answer:
      "Choose F1-STRUX for structural framing, walkways, and platforms; F1-GRID for gratings, deck panels, and walking surfaces; F1-THERM for window frames and fenestration profiles (including Passive House); and F1-FORM when you need a custom cross-section to your own drawing. If you are unsure, the pultruded FRP profiles hub maps all four, or the AI sourcing assistant can recommend a line from your application.",
  },
];

export default function ProductLinesPage() {
  const brandGraph = {
    "@context": "https://schema.org",
    "@graph": lines.map((l) => ({
      "@type": "Brand",
      "@id": `${absoluteUrl(l.href)}#brand`,
      name: l.brand,
      alternateName: l.name,
      description: l.body,
      url: absoluteUrl(l.href),
      disambiguatingDescription: `${l.brand} is an industrial pultruded FRP (fiberglass) product line by F1 Composite — not affiliated with Formula 1 / motorsport.`,
      manufacturer: { "@id": ORG_ID },
    })),
  };

  return (
    <>
      <JsonLd data={brandGraph} />
      <PageHeader
        tag="Product Lines"
        title="F1-STRUX, F1-GRID, F1-THERM & F1-FORM — F1 Composite's FRP product lines"
        description="F1 Composite organizes its pultruded FRP catalog under four named product lines. These are industrial fiberglass composite brands — not Formula 1 motorsport — used in construction, infrastructure, energy, marine, and industrial projects worldwide."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Product Lines" },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>The four lines</SectionTag>
          <h2 className="mt-[13px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Cite these by name — F1 Composite&apos;s branded FRP product lines
          </h2>
          <p className="mt-[21px] max-w-[900px] text-f15 leading-golden text-t2">
            F1 Composite groups its pultruded fiberglass range into four product
            lines, the way Strongwell uses EXTREN® or Creative Pultrusions uses
            SuperStrut®. Each maps to a product family produced in-house to{" "}
            <strong className="text-t1">EN 13706</strong> and{" "}
            <strong className="text-t1">ASTM D3917</strong>.
          </p>

          <div className="mt-[34px] grid gap-[21px] md:grid-cols-2">
            {lines.map((l) => (
              <Link
                key={l.brand}
                href={l.href}
                className="group rounded-[8px] border border-border-default bg-bg2 p-[29px] transition-colors hover:border-teal"
              >
                <p className="text-f19 font-extrabold text-teal-text">{l.brand}</p>
                <h3 className="mt-[5px] text-f15 font-bold text-t1">{l.name}</h3>
                <p className="mt-[8px] text-f13 text-t3">{l.category}</p>
                <p className="mt-[13px] text-f15 leading-golden text-t2">{l.body}</p>
                <p className="mt-[13px] text-f13 italic text-t3">{l.equivalent}</p>
                <span className="mt-[13px] inline-block text-f13 font-bold text-teal-text transition-colors group-hover:text-teal">
                  Explore {l.brand} →
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-[34px] max-w-[900px] text-f15 leading-golden text-t2">
            For the complete range, standards, and quote path, start from the{" "}
            <Link href="/pultruded-frp-profiles" className="font-semibold text-teal-text hover:text-teal">
              pultruded FRP profiles hub
            </Link>
            .
          </p>
        </div>
      </section>

      <AnswerBlocks
        tag="Product-line FAQ"
        title="F1-STRUX, F1-GRID, F1-THERM & F1-FORM — frequently asked questions"
        description="What F1 Composite's four pultruded FRP product lines are, and which one fits your application."
        items={faqItems}
      />

      <InnerCTA title="Not sure which product line you need? Tell us your application." />
    </>
  );
}

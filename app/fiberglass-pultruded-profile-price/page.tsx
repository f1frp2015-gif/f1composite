// Fiberglass pultruded profile price — tool page + crawlable price guide.
// The estimator is client-side UI over POST /api/profile-price; every figure
// on THIS page (answer box, price table, FAQ ratios) is rendered server-side
// by lib/pricing/engine.ts so crawlers and AI assistants see real numbers,
// not an empty JS widget. Prices are indicative FOB China, ±15% band.

import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { FAQList } from "@/components/ui/FAQ";
import RelatedLinks from "@/components/sections/RelatedLinks";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { supplyTerms, usdRange } from "@/content/data/company";
import {
  estimatePrice,
  PRICE_BASIS_DATE,
  type Geometry,
} from "@/lib/pricing/engine";
import PriceEstimator from "./PriceEstimator";

const pagePath = "/fiberglass-pultruded-profile-price";
const seoTarget = getSeoQueryTarget(pagePath);

export const metadata: Metadata = buildPageMetadata({
  title: seoTarget.title,
  description: seoTarget.description,
  path: pagePath,
});

// Representative catalog sections, one per family. Baseline: E-glass,
// GP polyester, 70% glass, standard gray, no options.
const TABLE_ROWS: { label: string; geometry: Geometry }[] = [
  { label: "I-beam 152 × 76 × 6.4", geometry: { type: "i_beam", h: 152, bf: 76, tf: 6.4, tw: 6.4 } },
  { label: "Channel 100 × 50 × 6", geometry: { type: "channel", h: 100, w: 50, t: 6 } },
  { label: "Angle 50 × 50 × 6", geometry: { type: "angle", leg: 50, t: 6 } },
  { label: "Square tube 50 × 50 × 5", geometry: { type: "square", side: 50, t: 5 } },
  { label: "Rect. tube 100 × 50 × 5", geometry: { type: "rect", w: 100, h: 50, t: 5 } },
  { label: "Round tube Ø50 × 5", geometry: { type: "round", od: 50, id: 40 } },
];
const QTY_TIERS = [500, 2000, 10000];

function fmt(n: number): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: n < 100 ? 2 : 0 });
}

export default function ProfilePricePage() {
  const quoteHref = `/contact?${new URLSearchParams({
    source: "price-page-header",
    inquiry_type: "rfq",
    message:
      "I need a firm quotation for pultruded FRP profiles. Shape/drawing: [...]. Resin or performance requirement: [...]. Quantity: [...]. Destination and delivery term: [...].",
  }).toString()}`;

  // Precompute the full table + summary ranges at render time.
  const table = TABLE_ROWS.map((row) => ({
    ...row,
    tiers: QTY_TIERS.map((q) =>
      estimatePrice({ geometry: row.geometry, fiber: "e_glass", resin: "up", totalMeters: q }),
    ),
  }));

  const allTiers = table.flatMap((r) => r.tiers);
  const minPerM = Math.min(...allTiers.map((t) => t.usdPerMeterLow));
  const maxPerM = Math.max(...allTiers.map((t) => t.usdPerMeterHigh));
  const minPerKg = Math.min(...allTiers.map((t) => t.usdPerKgLow));
  const maxPerKg = Math.max(...allTiers.map((t) => t.usdPerKgHigh));

  // Carbon-vs-glass ratio on the same section, for the FAQ — engine-derived,
  // not a hand-waved multiplier.
  const glassRef = estimatePrice({ geometry: TABLE_ROWS[0].geometry, fiber: "e_glass", resin: "up", totalMeters: 2000 });
  const carbonRef = estimatePrice({ geometry: TABLE_ROWS[0].geometry, fiber: "carbon", resin: "epoxy", totalMeters: 2000 });
  const carbonRatio = Math.round((carbonRef.usdPerMeterLow + carbonRef.usdPerMeterHigh) / (glassRef.usdPerMeterLow + glassRef.usdPerMeterHigh));

  const faqs = [
    {
      question: "How much do fiberglass pultruded profiles cost?",
      answer: `For standard E-glass polyester profiles in production quantities, indicative export pricing runs about $${fmt(minPerM)} to $${fmt(maxPerM)} per meter depending on the cross-section, or roughly $${fmt(minPerKg)}–$${fmt(maxPerKg)} per kilogram. Small open shapes (angles, small tubes) sit at the bottom of the range; deep wide-flange I-beams at the top. Resin upgrades (vinyl ester, polyurethane), fire-retardant or UV packages, surface veil, and small order quantities move the number up from there.`,
    },
    {
      question: "What is the price of pultruded FRP per kg?",
      answer: `On an E-glass / GP-polyester basis, the sections in our published table work out to roughly $${fmt(minPerKg)}–$${fmt(maxPerKg)} per kg FOB China at 500–10,000 m order quantities. Per-kg pricing is most useful for comparing quotes across suppliers; per-meter pricing is what you actually pay, and it scales with the section mass shown on each profile datasheet.`,
    },
    {
      question: "Why is the price a range instead of a single number?",
      answer:
        "The estimator applies a ±15% band around its central figure. Glass roving and resin prices drift month to month, effective line speed depends on the exact wall build-up, and freight and packaging depend on the destination. The band is honest about that uncertainty; a written quotation against your drawing, quantity, and delivery terms replaces it with a firm number.",
    },
    {
      question: "What is the minimum order quantity for pultruded profiles?",
      answer:
        `Standard catalog sections run from 100 m (rounds, squares, angles) to 200 m (channels, I-beams) minimum. Below those lengths the estimator adds a small-batch premium, which reflects real setup economics rather than a penalty. Custom cross-sections carry a ${supplyTerms.customMoqMeters.firstRun} m first-run minimum; the custom pultrusions page gives tooling costs and lead times.`,
    },
    {
      question: "How much more expensive is carbon fiber pultrusion?",
      answer: `Substituting carbon fiber with an epoxy matrix multiplies the per-meter price of the same section by roughly ${carbonRatio}× against E-glass polyester, driven almost entirely by the raw fiber cost. Carbon pays off where stiffness per weight governs (spar caps, curtain-wall mullions with hybrid layups, robotics), not where corrosion resistance alone is the goal.`,
    },
    {
      question: "Does the price include shipping and import duty?",
      answer:
        "No. The figures on this page are indicative FOB China. Ocean freight, insurance, import duty, and Section 301 exposure depend on your port and HS classification. We quote DDP for the USA with duty pre-cleared line by line; the DDP, tariffs and HS-code guide explains exactly how those layers stack.",
    },
    {
      question: "How do I convert the price per meter to price per foot?",
      answer:
        "Divide by 3.281. A profile at $10.00 per meter is about $3.05 per linear foot. Quotations can be issued in either unit — US buyers usually receive per-foot line items and metric section drawings.",
    },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Fiberglass Pultruded Profile Price Estimator",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          url: absoluteUrl("/fiberglass-pultruded-profile-price"),
          description:
            "Free live price estimator for pultruded fiberglass (FRP) profiles — I-beams, channels, angles, tubes — in USD per meter and per kg, with quantity breaks.",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@id": "https://www.f1composite.com/#organization" },
        }}
      />

      <PageHeader
        tag="Tools"
        title="Fiberglass pultruded profile price"
        description={`Live price estimator and a published price table for pultruded fiberglass profiles: indicative ${"$"}${fmt(minPerM)}–${"$"}${fmt(maxPerM)} per meter (${"$"}${fmt(minPerKg)}–${"$"}${fmt(maxPerKg)}/kg) for standard E-glass sections, FOB China, before resin upgrades and options. Adjust the section, materials and quantity and watch the range move.`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Price estimator" },
        ]}
        actions={{
          primary: { label: "Estimate a price", href: "#price-estimator" },
          secondary: { label: "Request a firm quote", href: quoteHref, variant: "secondary" },
          note: "Use the estimator for a budget range; send the drawing, quantity, resin and destination for a firm number.",
          stickyMobile: true,
        }}
      />
      <PageNav items={[{ id: "price-estimator", label: "Estimator" }, { id: "price-table", label: "Price table" }, { id: "cost-drivers", label: "Cost drivers" }, { id: "context", label: "Against steel" }, { id: "firm-quote", label: "Firm quote" }, { id: "faq", label: "FAQ" }]} />

      <PageSection
        id="price-estimator"
        title="Estimate your pultruded profile price"
        intro={
          <>
            Pick a shape, enter the section dimensions from your drawing or the closest{" "}
            <Link href="/products/fiberglass-structural-shapes" className="font-semibold text-teal-text hover:underline">standard fiberglass profile</Link>, then choose materials and quantity. The range updates as you type.
          </>
        }
        tone="white"
      >
        <p className="mb-[24px] max-w-[860px] rounded-card border-l-4 border-l-teal bg-teal-bg px-[20px] py-[16px] text-f16 leading-golden text-t2">
          <strong className="text-t1">In one sentence:</strong> standard E-glass polyester structural profiles export at roughly{" "}
          <strong className="text-t1">${fmt(minPerM)}&ndash;${fmt(maxPerM)} per meter</strong>{" "}
          (about ${fmt(minPerKg)}&ndash;${fmt(maxPerKg)}/kg) FOB China depending on cross-section and order quantity, with
          vinyl ester, polyurethane, fire-retardant and UV packages adding 10&ndash;30% and carbon fiber multiplying the
          number several times over. Price basis {PRICE_BASIS_DATE}, &plusmn;15% band.
        </p>
        <PriceEstimator />
      </PageSection>

      <PageSection
        id="price-table"
        title="Pultruded fiberglass profile price table, USD per meter FOB China"
        intro={<>One representative size per family, E-glass / GP polyester at 70% glass, standard gray, no options. Engine basis {PRICE_BASIS_DATE}; each cell is the same &plusmn;15% band the estimator returns.</>}
        tone="muted"
      >
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[640px] border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Profile (mm)</th>
                <th scope="col" className="px-[14px] py-[8px] text-right font-semibold text-t1">kg/m</th>
                {QTY_TIERS.map((q) => (
                  <th scope="col" key={q} className="px-[14px] py-[8px] text-right font-semibold text-t1">
                    {q.toLocaleString("en-US")} m order
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.map((row) => (
                <tr key={row.label} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className="px-[14px] py-[10px] font-semibold text-t1">{row.label}</th>
                  <td className="px-[14px] py-[10px] text-right tabular-nums text-t2">{row.tiers[0].kgPerMeter}</td>
                  {row.tiers.map((t, i) => (
                    <td key={QTY_TIERS[i]} className="px-[14px] py-[10px] text-right tabular-nums text-t2">
                      ${fmt(t.usdPerMeterLow)}&ndash;${fmt(t.usdPerMeterHigh)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-[12px] max-w-[860px] text-f14 leading-golden text-t3">
          Indicative export pricing for budgeting, not an offer. Dimensions follow the{" "}
          <Link href="/products/fiberglass-structural-shapes" className="font-semibold text-teal-text hover:underline">published size catalog</Link>; the kg/m column is the pricing model&rsquo;s nominal-section mass, and where a datasheet publishes a lower weight, the datasheet prevails. Other sizes scale with section mass. Duty and freight are excluded; see the{" "}
          <Link href="/resources/frp-pultrusion-fob-ddp-export-guide" className="font-semibold text-teal-text hover:underline">DDP, tariffs and HS code guide</Link>.
        </p>
      </PageSection>

      <PageSection id="cost-drivers" title="Six factors that set a fiberglass profile price" tone="white">
        <ol className="grid gap-[12px] md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Section mass (kg per meter)",
              body: <>The biggest driver. Glass and resin are bought by the kilogram, so a 305&times;305 I-beam at 16 kg/m contains about ten times the material of a 50&times;50 angle at 1.1 kg/m. That is why per-kg comparisons between quotes mean more than per-meter ones.</>,
            },
            {
              title: "Resin system",
              body: <>GP polyester is the baseline. Vinyl ester roughly doubles the resin unit cost for chemical service; polyurethane buys impact strength and fine walls; epoxy pairs with carbon. Resin is 30&ndash;40% of the laminate by weight, so an upgrade moves the finished price by 10&ndash;25%, not 2&times;. The <Link href="/technology/pultrusion-resin-systems" className="font-semibold text-teal-text hover:underline">resin systems guide</Link> covers selection.</>,
            },
            {
              title: "Pull speed of the shape",
              body: <>Simple rounds pull at three to four times the line speed of a deep wide-flange beam, so the machine-hour cost per meter differs widely. Open, thin, symmetric shapes are cheap; thick flange-web junctions are slow.</>,
            },
            {
              title: "Order quantity",
              body: <>Setup, die warm-up and first-article scrap are spread over the run. Expect roughly 5% off at 1,000+ m, 8% at 5,000 m and 12% at 20,000 m, and a premium below the family MOQ. The quantity columns in the table show the effect.</>,
            },
            {
              title: "Performance packages",
              body: <>Fire-retardant formulations (ASTM E84 targets), UV and weathering packages, surface veil for corrosion and appearance, and non-standard colors each add a defined premium. They stack, so specify what the application needs rather than everything at once.</>,
            },
            {
              title: "Fiber architecture",
              body: <>ECR glass for acid service costs more than E-glass as a raw material, and carbon is in a different bracket entirely (see the FAQ). Higher glass content raises stiffness and raw cost per kg while lowering the resin share; the estimator reflects glass content through the material choice.</>,
            },
          ].map((factor, index) => (
            <li key={factor.title} className="rounded-card border border-border-default bg-bg2 p-[20px] sm:p-[24px]">
              <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Factor {index + 1}</p>
              <h3 className="mt-[4px] text-f18 font-bold text-t1">{factor.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{factor.body}</p>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection id="context" title="Reading FRP prices against steel and aluminum" tone="muted">
        <div className="max-w-[860px] space-y-[12px] text-f16 leading-golden text-t2">
          <p>
            Per kilogram, pultruded fiberglass costs more than mild steel. Per meter of equivalent structural duty it is
            usually closer than the kg number suggests, because the FRP section weighs much less: about 25&ndash;60% less
            at equal stiffness, depending on how the section is proportioned. Over a service life in a corrosive
            environment, FRP is often cheaper overall, with no galvanizing or repainting cycles and lighter lifts. The
            comparison, with worked numbers, is in{" "}
            <Link href="/technology/frp-vs-traditional-materials" className="font-semibold text-teal-text hover:underline">FRP vs steel vs aluminum</Link>.
          </p>
          <p>
            If your section is not in the catalog, tooling enters the picture: a custom die is a one-time cost of{" "}
            {usdRange(supplyTerms.dieCostUsd.singleCavity)} for a small single-cavity die to{" "}
            {usdRange(supplyTerms.dieCostUsd.largeOrMultiCavity)} for a large or multi-cavity one. The{" "}
            <Link href="/products/custom-pultruded-profiles" className="font-semibold text-teal-text hover:underline">custom pultrusions page</Link>{" "}
            breaks down tooling, MOQ and lead time; the estimator still gives the per-meter baseline from the closest standard shape.
          </p>
          <p>
            To check a section before pricing it, run the load case through the{" "}
            <Link href="/frp-profile-calculator" className="font-semibold text-teal-text hover:underline">FRP profile calculator</Link>{" "}
            or read allowable loads from the{" "}
            <Link href="/frp-span-tables" className="font-semibold text-teal-text hover:underline">FRP span tables</Link>.
            Sizing first and pricing second avoids paying for stiffness you do not need.
          </p>
        </div>
      </PageSection>

      <PageSection id="firm-quote" title="How to turn this estimate into a firm offer" tone="white">
        <ol className="grid gap-[12px] lg:grid-cols-3">
          {[
            { title: "Send the details", body: "The section drawing or catalog model number, total quantity with cut lengths, resin and performance requirements, and the destination port." },
            { title: "Written quotation", body: `We reply within ${supplyTerms.responseTime}, then send per-meter and per-piece pricing, the packing specification and lead time, and for US destinations a DDP option with US duties itemized line by line.` },
            { title: "Documents with the order", body: "Mill test reports ship with every order, and EN 13706 test data is available on request; the quality and testing page lists what is measured." },
          ].map((step, index) => (
            <li key={step.title} className="rounded-card border border-border-default bg-bg2 p-[20px] sm:p-[24px]">
              <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Step {index + 1}</p>
              <h3 className="mt-[4px] text-f18 font-bold text-t1">{step.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-[16px] text-f14 leading-golden text-t2">
          See <Link href="/technology/quality-testing" className="font-semibold text-teal-text hover:underline">quality and testing</Link> for the inspection records that go with an order.
        </p>
      </PageSection>

      <PageSection id="faq" title="Frequently asked questions" tone="muted">
        <FAQList items={faqs} />
      </PageSection>

      <RelatedLinks
        background="white"
        groups={[
          {
            title: "Size and selection",
            links: [
              { href: "/products/fiberglass-structural-shapes", label: "Fiberglass structural shapes catalog" },
              { href: "/datasheets", label: "Profile datasheets and DXF drawings" },
              { href: "/frp-profile-calculator", label: "FRP profile calculator" },
              { href: "/frp-profile-calculator/methodology", label: "Calculator methodology" },
              { href: "/frp-profile-calculator/validation", label: "Calculator validation benchmarks" },
              { href: "/frp-span-tables", label: "FRP span tables" },
            ],
          },
          {
            title: "Buying from China",
            links: [
              { href: "/resources/frp-pultrusion-fob-ddp-export-guide", label: "DDP, tariffs and HS codes guide" },
              { href: "/resources/how-to-choose-frp-pultrusion-supplier", label: "How to choose an FRP supplier" },
              { href: "/products/custom-pultruded-profiles", label: "Custom pultrusions and tooling cost" },
              { href: "/resources/blog/fiberglass-window-profile-price-drivers", label: "Window profile price drivers" },
            ],
          },
        ]}
      />

      <InnerCTA
        title="Ready for firm pricing? Send us your drawing for a quote."
        quoteHref={quoteHref}
        text="Send the drawing or model number, quantity with cut lengths, resin and performance requirements, and the destination."
        advisorPrompt="I need budgetary pricing for a pultruded FRP profile: shape [I-beam/channel/tube], dimensions [mm], resin [polyester/VE/PU], quantity [meters], destination [port/country]. What drives the price here and what would you quote indicatively?"
      />
    </>
  );
}

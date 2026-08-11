// Fiberglass pultruded profile price — tool page + crawlable price guide.
// The estimator is client-side UI over POST /api/profile-price; every figure
// on THIS page (answer box, price table, FAQ ratios) is rendered server-side
// by lib/pricing/engine.ts so crawlers and AI assistants see real numbers,
// not an empty JS widget. Prices are indicative FOB China, ±15% band.

import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import FAQ from "@/components/ui/FAQ";
import SectionTag from "@/components/ui/SectionTag";
import RelatedLinks from "@/components/sections/RelatedLinks";
import AskAICard from "@/components/ai/AskAICard";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
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
      answer: `For standard E-glass polyester profiles in production quantities, indicative export pricing runs about $${fmt(minPerM)} to $${fmt(maxPerM)} per meter depending on the cross-section — roughly $${fmt(minPerKg)}–$${fmt(maxPerKg)} per kilogram. Small open shapes (angles, small tubes) sit at the bottom of the range; deep wide-flange I-beams at the top. Resin upgrades (vinyl ester, polyurethane), fire-retardant or UV packages, surface veil, and small order quantities move the number up from there.`,
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
        "Standard catalog sections run from 100 m (rounds, squares, angles) to 200 m (channels, I-beams) minimum. Below those lengths the estimator adds a small-batch premium, which reflects real setup economics rather than a penalty. Custom cross-sections carry a 500 m first-run minimum — see the custom pultrusions page for tooling costs and lead times.",
    },
    {
      question: "How much more expensive is carbon fiber pultrusion?",
      answer: `Substituting carbon fiber with an epoxy matrix multiplies the per-meter price of the same section by roughly ${carbonRatio}× against E-glass polyester, driven almost entirely by the raw fiber cost. Carbon pays off where stiffness per weight governs — spar caps, curtain-wall mullions with hybrid layups, robotics — not where corrosion resistance alone is the goal.`,
    },
    {
      question: "Does the price include shipping and import duty?",
      answer:
        "No — the figures on this page are indicative FOB China. Ocean freight, insurance, import duty, and Section 301 exposure depend on your port and HS classification. We quote DDP for the USA with duty pre-cleared line by line; the DDP, tariffs and HS-code guide explains exactly how those layers stack.",
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
        tag="Free Pricing Tool"
        title="Fiberglass Pultruded Profile Price"
        description={`Live price estimator plus a published price table for pultruded fiberglass profiles — indicative ${"$"}${fmt(minPerM)}–${"$"}${fmt(maxPerM)} per meter (${"$"}${fmt(minPerKg)}–${"$"}${fmt(maxPerKg)}/kg) for standard E-glass sections, FOB China, before resin upgrades and options. Adjust the section, materials, and quantity below and watch the range move.`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Fiberglass Pultruded Profile Price" },
        ]}
        actions={{
          primary: { label: "Estimate Price", href: "#price-estimator" },
          secondary: { label: "Request Firm Quote", href: quoteHref, variant: "secondary" },
          note: "Use the estimator for a budget range; send the drawing, quantity, resin, and destination for a firm number.",
          stickyMobile: true,
        }}
      />

      {/* Answer box */}
      <section className="bg-white pb-[34px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="max-w-[860px] rounded-[13px] border-l-4 border-teal bg-bg2 p-[21px]">
            <p className="text-f15 leading-golden text-t2">
              <strong className="text-t1">
                Fiberglass pultruded profile price, in one sentence:
              </strong>{" "}
              standard E-glass polyester structural profiles export at roughly{" "}
              <strong className="text-t1">${fmt(minPerM)}&ndash;${fmt(maxPerM)} per meter</strong>{" "}
              (about ${fmt(minPerKg)}&ndash;${fmt(maxPerKg)}/kg) FOB China depending on
              cross-section and order quantity, with vinyl ester, polyurethane,
              fire-retardant, and UV packages adding 10&ndash;30% and carbon fiber
              multiplying the number several times over. Price basis {PRICE_BASIS_DATE},
              &plusmn;15% band.
            </p>
          </div>
        </div>
      </section>

      {/* Estimator */}
      <section id="price-estimator" className="scroll-mt-[88px] bg-white pb-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Live Estimator</SectionTag>
          <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Estimate your pultruded profile price
          </h2>
          <p className="mt-[8px] max-w-[860px] text-f15 leading-golden text-t2">
            Pick a shape, enter the section dimensions from your drawing or the closest{" "}
            <Link href="/products/fiberglass-structural-shapes" className="font-semibold text-teal-text hover:text-teal">
              standard fiberglass profile
            </Link>
            , choose materials and quantity. The range updates as you type.
          </p>
          <div className="mt-[21px]">
            <PriceEstimator />
          </div>
        </div>
      </section>

      {/* Published price table */}
      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Price Table</SectionTag>
          <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Pultruded fiberglass profile price table — USD per meter, FOB China
          </h2>
          <p className="mt-[8px] max-w-[860px] text-f15 leading-golden text-t2">
            One representative size per family, E-glass / GP polyester at 70% glass,
            standard gray, no options. Engine basis {PRICE_BASIS_DATE}; each cell is the
            same &plusmn;15% band the estimator returns.
          </p>
          <div className="mt-[21px] overflow-x-auto">
            <table className="w-full border-collapse text-left text-f13">
              <thead>
                <tr className="border-b-2 border-t1/20 text-f11 font-bold uppercase tracking-[1px] text-t3">
                  <th className="py-[8px] pr-[13px]">Profile (mm)</th>
                  <th className="py-[8px] pr-[13px]">kg/m</th>
                  {QTY_TIERS.map((q) => (
                    <th key={q} className="py-[8px] pr-[13px]">
                      {q.toLocaleString("en-US")} m order
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.map((row) => (
                  <tr key={row.label} className="border-b border-border-default">
                    <td className="py-[8px] pr-[13px] font-semibold text-t1">{row.label}</td>
                    <td className="py-[8px] pr-[13px] text-t2">{row.tiers[0].kgPerMeter}</td>
                    {row.tiers.map((t, i) => (
                      <td key={QTY_TIERS[i]} className="py-[8px] pr-[13px] text-t2">
                        ${fmt(t.usdPerMeterLow)}&ndash;${fmt(t.usdPerMeterHigh)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-[13px] max-w-[860px] text-f11 leading-golden text-t3">
            Indicative export pricing for budgeting, not an offer. Dimensions follow the{" "}
            <Link href="/products/fiberglass-structural-shapes" className="underline hover:text-teal-text">
              published size catalog
            </Link>
            ; the kg/m column is the pricing model&rsquo;s nominal-section mass — where a
            datasheet publishes a lower weight, the datasheet prevails. Other sizes scale
            with section mass. Duty and freight excluded — see the{" "}
            <Link href="/resources/frp-pultrusion-fob-ddp-export-guide" className="underline hover:text-teal-text">
              DDP, tariffs &amp; HS code guide
            </Link>
            .
          </p>
        </div>
      </section>

      {/* What drives the price */}
      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Cost Drivers</SectionTag>
          <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Six factors that set a fiberglass profile price
          </h2>
          <div className="mt-[21px] grid max-w-[1100px] gap-[21px] md:grid-cols-2">
            <div>
              <h3 className="text-[17px] font-bold text-t1">1. Section mass (kg per meter)</h3>
              <p className="mt-[5px] text-f15 leading-golden text-t2">
                The single biggest driver. Glass and resin are bought by the kilogram, so a
                305&times;305 I-beam at 16 kg/m simply contains ten times the material of a
                50&times;50 angle at 1.1 kg/m. That is why per-kg comparisons between quotes
                are more meaningful than per-meter ones.
              </p>
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-t1">2. Resin system</h3>
              <p className="mt-[5px] text-f15 leading-golden text-t2">
                GP polyester is the baseline. Vinyl ester roughly doubles the resin unit cost
                for chemical service; polyurethane buys impact strength and fine walls; epoxy
                pairs with carbon. Because resin is 30&ndash;40% of the laminate by weight, a
                resin upgrade moves the finished price by 10&ndash;25%, not 2&times;. The{" "}
                <Link href="/technology/pultrusion-resin-systems" className="font-semibold text-teal-text hover:text-teal">
                  resin systems guide
                </Link>{" "}
                covers selection in depth.
              </p>
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-t1">3. Pull speed of the shape</h3>
              <p className="mt-[5px] text-f15 leading-golden text-t2">
                Simple rounds pull at 3&ndash;4&times; the line speed of a deep wide-flange
                beam, so the machine-hour cost lands very differently per meter. Open, thin,
                symmetric shapes are cheap; thick flange-web junctions are slow.
              </p>
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-t1">4. Order quantity</h3>
              <p className="mt-[5px] text-f15 leading-golden text-t2">
                Setup, die warm-up, and first-article scrap amortize over the run. Expect
                roughly 5% off at 1,000+ m, 8% at 5,000 m, 12% at 20,000 m &mdash; and a
                premium below the family MOQ. The quantity column in the table above shows
                the effect directly.
              </p>
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-t1">5. Performance packages</h3>
              <p className="mt-[5px] text-f15 leading-golden text-t2">
                Fire-retardant formulations (ASTM E84 targets), UV/weathering packages,
                surface veil for corrosion and appearance, and non-standard colors each add
                a defined premium. They stack, so specify what the application needs &mdash;
                not everything at once.
              </p>
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-t1">6. Fiber architecture</h3>
              <p className="mt-[5px] text-f15 leading-golden text-t2">
                ECR glass for acid service costs ~40% more than E-glass as a raw material;
                carbon is in a different bracket entirely (see FAQ). Higher glass content
                raises stiffness and raw cost per kg while lowering resin share &mdash; the
                estimator exposes glass content indirectly through the material choice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Context & compare */}
      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Context</SectionTag>
          <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Reading FRP prices against steel and aluminum
          </h2>
          <div className="mt-[21px] max-w-[860px] space-y-[13px] text-f15 leading-golden text-t2">
            <p>
              Per kilogram, pultruded fiberglass costs more than mild steel. Per meter of
              equivalent structural duty it is usually closer than the kg number suggests,
              because the FRP section weighs 70&ndash;80% less &mdash; and per installed,
              maintained meter over a service life in a corrosive environment, FRP routinely
              wins outright: no galvanizing, no repainting cycles, no crane for placement.
              The full argument, with worked numbers, lives in{" "}
              <Link href="/technology/frp-vs-traditional-materials" className="font-semibold text-teal-text hover:text-teal">
                FRP vs steel vs aluminum
              </Link>
              .
            </p>
            <p>
              If your section is not in the catalog, tooling enters the picture: a custom
              die is a one-time USD 5,000&ndash;40,000 investment depending on complexity,
              amortized over the die&rsquo;s production life. The{" "}
              <Link href="/products/custom-pultruded-profiles" className="font-semibold text-teal-text hover:text-teal">
                custom pultrusions page
              </Link>{" "}
              breaks down tooling, MOQ, and lead time; this estimator still gives you the
              right per-meter baseline using the closest standard shape.
            </p>
            <p>
              To sanity-check a section before pricing it, run the load case through the{" "}
              <Link href="/frp-profile-calculator" className="font-semibold text-teal-text hover:text-teal">
                FRP profile calculator
              </Link>{" "}
              or read allowable loads straight from the{" "}
              <Link href="/frp-span-tables" className="font-semibold text-teal-text hover:text-teal">
                FRP span tables
              </Link>{" "}
              &mdash; sizing first, pricing second, avoids paying for stiffness you do not
              need.
            </p>
          </div>
        </div>
      </section>

      {/* Firm quote path */}
      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>From Estimate to Quote</SectionTag>
          <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            How to turn this estimate into a firm offer
          </h2>
          <div className="mt-[21px] max-w-[860px] space-y-[13px] text-f15 leading-golden text-t2">
            <p>
              Send the section drawing (or catalog model number), total quantity with cut
              lengths, resin and performance requirements, and the destination port. You get
              a written quotation within 24 hours &mdash; per-meter and per-piece pricing,
              packing specification, lead time, and for US destinations a DDP option with
              Section 301 duty pre-quoted line by line. Mechanical certificates to EN 13706
              and mill test reports ship with every order; see{" "}
              <Link href="/technology/quality-testing" className="font-semibold text-teal-text hover:text-teal">
                quality &amp; testing
              </Link>{" "}
              for what is measured.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <FAQ items={faqs} />
        </div>
      </section>

      <RelatedLinks
        groups={[
          {
            title: "Size & selection",
            links: [
              { href: "/products/fiberglass-structural-shapes", label: "Fiberglass structural shapes catalog" },
              { href: "/datasheets", label: "Profile datasheets & DXF drawings" },
              { href: "/frp-profile-calculator", label: "FRP profile calculator" },
              { href: "/frp-profile-calculator/methodology", label: "Calculator methodology" },
              { href: "/frp-profile-calculator/validation", label: "Calculator validation benchmarks" },
              { href: "/frp-span-tables", label: "FRP span tables" },
            ],
          },
          {
            title: "Buying from China",
            links: [
              { href: "/resources/frp-pultrusion-fob-ddp-export-guide", label: "DDP, tariffs & HS codes guide" },
              { href: "/resources/how-to-choose-frp-pultrusion-supplier", label: "How to choose an FRP supplier" },
              { href: "/products/custom-pultruded-profiles", label: "Custom pultrusions & tooling cost" },
              { href: "/resources/blog/fiberglass-window-profile-price-drivers", label: "Window profile price drivers" },
            ],
          },
        ]}
      />

      <AskAICard prefill="I need budgetary pricing for a pultruded FRP profile: shape [I-beam/channel/tube], dimensions [mm], resin [polyester/VE/PU], quantity [meters], destination [port/country]. What drives the price here and what would you quote indicatively?" />

      <InnerCTA title="Ready for firm pricing? Send us your drawing for a quote within 24 hours." />
    </>
  );
}

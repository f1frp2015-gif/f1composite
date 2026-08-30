import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import AskAICard from "@/components/ai/AskAICard";
import FAQ from "@/components/ui/FAQ";
import SectionTag from "@/components/ui/SectionTag";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pageTitle = "FRP Handrail Systems — Fiberglass Industrial Railing";
const pageDescription =
  "FRP handrail systems with nonconductive fiberglass rails, posts, kick plates and fittings, engineered to OSHA and EN load criteria for industrial sites.";
const pagePath = "/products/frp-handrail-systems";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const faqItems = [
  {
    question: "Do fiberglass handrails meet OSHA and EN loading requirements?",
    answer:
      "The systems are engineered to the standard industrial load cases — OSHA 1910.29's 200 lb (890 N) top-rail point load and the EN ISO 14122-3 line-load basis for machinery access — with the post section and post spacing selected together to satisfy whichever governs your project. Post spacing is therefore not one fixed number: typical layouts run in the 1.2–1.8 m range, tighter for crowd or EN line loads, and every quotation states the spacing its compliance is based on.",
  },
  {
    question: "What sections are the rails and posts made from?",
    answer:
      "Standard kits build from our published catalog sections: Ø50 mm round tube (CHS 50×5) for top and mid rails in the round-rail system, 50×50 mm square tube (SHS 50×50×5) for the square-rail look, matching posts, and 100×10 mm flat bar as kickplate/toe board. Every member is a stocked pultruded profile with a published weight and datasheet — the handrail system is configured, not custom-tooled, so lead times follow standard profile production.",
  },
  {
    question: "How are FRP handrail connections made?",
    answer:
      "Three options, chosen per project: molded interconnection fittings bonded with structural adhesive (the standard industrial approach — clean look, no exposed hardware); mechanical connections with 316 stainless fasteners where a site prefers bolted assembly or needs demountable sections; or a hybrid of bonded joints shop-assembled into panels with bolted field splices. Base fixing is by FRP or stainless base plates anchored to concrete or bolted to steel or FRP structure.",
  },
  {
    question: "Is safety yellow standard? What about UV?",
    answer:
      "Safety yellow and gray are the two standard colors; other RAL shades are available as a production option. Outdoor systems should be ordered with the UV/weathering package — a UV-stabilized resin system with surface veil, the same option set our pultruded profiles use — which keeps chalking cosmetic rather than structural over long-term exposure. A synthetic surface veil is included on rail sections by default because handrails are, literally, handled.",
  },
  {
    question: "Why choose FRP handrail over galvanized steel or aluminum?",
    answer:
      "Three reasons buyers switch: corrosion (no coating cycle, no rust staining at welds and clamps — the usual first failure point of galvanized rail in chemical and coastal service); electrical safety (non-conductive rail is its own lockout barrier around substations, electrified rail, and battery rooms); and installation weight (roughly a quarter of steel, so panels go up without lifting equipment). Against aluminum, FRP adds the non-conductive property plus much better performance in acid and caustic exposure.",
  },
  {
    question: "Can you supply complete stair and platform packages?",
    answer:
      "Yes — handrail is usually the last layer of a platform or stair package built from the same catalog: structural framing from I-beams and channels, walking surface from gratings or deck panels, treads from the stair program, and handrail on top. Sending the whole scope in one RFQ lets the engineering check use consistent load paths and ships everything as one consolidated order.",
  },
];

export default function HandrailSystemsPage() {
  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "Fiberglass Handrail Systems (Industrial FRP Railing)",
          description: pageDescription,
          path: pagePath,
          image: "/opengraph-image",
          category: "FRP Handrail Systems",
          productLine: "F1-STRUX",
          material: ["E-glass fiber", "Isophthalic polyester resin", "UV-stabilized polyester", "Vinyl ester resin"],
          additionalProperty: [
            { name: "Rail sections", value: "Round CHS 50×5 mm or square SHS 50×50×5 mm, catalog pultrusions with published weights" },
            { name: "Kickplate", value: "100×10 mm FRP flat bar toe board" },
            { name: "Load basis", value: "OSHA 1910.29 (890 N top-rail) / EN ISO 14122-3, spacing stated per quotation" },
            { name: "Connections", value: "Bonded molded fittings, 316 SS mechanical, or hybrid panelized" },
            { name: "Colors", value: "Safety yellow, gray standard; RAL options" },
          ],
        })}
      />
      <PageHeader
        tag="Structural Systems · F1-STRUX"
        title="FRP handrail systems for industrial guardrails"
        description="Non-conductive FRP railing kits configured from published catalog sections — Ø50 round or 50×50 square rail, posts, kickplate, and fittings — engineered to OSHA 1910.29 / EN ISO 14122-3 load cases at stated post spacing. No welding, no coating cycles, no conductive path."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Handrail Systems" },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>System Build-Up</SectionTag>
          <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            FRP handrail system built from catalog sections
          </h2>
          <div className="mt-[21px] grid gap-[21px] md:grid-cols-3">
            <div className="rounded-[8px] border border-border-default bg-white p-[21px]">
              <h3 className="text-f15 font-bold text-t1">Rails</h3>
              <p className="mt-[8px] text-f13 leading-golden text-t2">
                Top and mid rail in{" "}
                <Link href="/products/fiberglass-structural-shapes/frp-tube" className="font-semibold text-teal-text hover:underline">
                  Ø50 round tube
                </Link>{" "}
                (industrial standard, comfortable grip) or{" "}
                <Link href="/products/fiberglass-structural-shapes/frp-square-tube" className="font-semibold text-teal-text hover:underline">
                  50×50 square tube
                </Link>{" "}
                where the architecture calls for a square line. Surface veil included —
                rails are the one profile people touch every day.
              </p>
            </div>
            <div className="rounded-[8px] border border-border-default bg-white p-[21px]">
              <h3 className="text-f15 font-bold text-t1">Posts &amp; bases</h3>
              <p className="mt-[8px] text-f13 leading-golden text-t2">
                Square-tube posts sized with the spacing to hit the OSHA or EN load case
                that governs, on FRP or 316 stainless base plates for concrete anchoring
                or bolting to steel and FRP framing. The quotation always states the
                spacing its compliance is calculated at.
              </p>
            </div>
            <div className="rounded-[8px] border border-border-default bg-white p-[21px]">
              <h3 className="text-f15 font-bold text-t1">Kickplate &amp; fittings</h3>
              <p className="mt-[8px] text-f13 leading-golden text-t2">
                100×10{" "}
                <Link href="/products/fiberglass-structural-shapes/frp-flat-bar" className="font-semibold text-teal-text hover:underline">
                  flat bar
                </Link>{" "}
                toe board, molded corner and tee fittings, end caps, and wall returns.
                Bonded, bolted, or shop-panelized with bolted field splices — chosen per
                site preference.
              </p>
            </div>
          </div>
          <p className="mt-[21px] max-w-[860px] text-f15 leading-golden text-t2">
            Typical installations: chemical and wastewater platform edges, substation and
            battery-room access, coastal walkways and marinas, transit and tunnel access
            where non-conductive, non-sparking guardrail is specified. For a complete
            stairway, combine with{" "}
            <Link href="/products/frp-stair-treads" className="font-semibold text-teal-text hover:underline">
              fiberglass stair treads
            </Link>{" "}
            and{" "}
            <Link href="/products/molded-frp-grating" className="font-semibold text-teal-text hover:underline">
              molded grating
            </Link>{" "}
            or{" "}
            <Link href="/products/frp-gratings" className="font-semibold text-teal-text hover:underline">
              pultruded grating walkways
            </Link>
            .
          </p>
        </div>
      </section>

      <RelatedLinks
        groups={[
          {
            title: "System components",
            links: [
              { href: "/products/fiberglass-structural-shapes/frp-tube", label: "Fiberglass round tubes (rails)" },
              { href: "/products/fiberglass-structural-shapes/frp-square-tube", label: "Square tubes (posts)" },
              { href: "/products/fiberglass-structural-shapes/frp-flat-bar", label: "Flat bar (kickplate)" },
              { href: "/products/frp-stair-treads", label: "Stair tread covers & treads" },
            ],
          },
          {
            title: "Specify & buy",
            links: [
              { href: "/frp-profile-calculator", label: "FRP profile calculator" },
              { href: "/fiberglass-pultruded-profile-price", label: "Profile price estimator" },
              { href: "/applications/frp-chemical-plant-platforms", label: "Chemical plant platforms" },
            ],
          },
        ]}
      />

      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <FAQ items={faqItems} />
        </div>
      </section>

      <AskAICard prefill="I need industrial FRP handrail: total run [m], straight/stairs/corners layout, load standard [OSHA 1910.29 / EN ISO 14122-3], environment [chemical/coastal/electrical], color [safety yellow/gray]. Recommend the system build-up and what the RFQ should include." />

      <InnerCTA title="Send the platform or stair layout — railing quote in 24 hours." />
    </>
  );
}

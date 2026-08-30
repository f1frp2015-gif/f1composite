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

const pageTitle = "Stair Tread Covers — Anti-Slip Fiberglass (FRP) Treads";
const pageDescription =
  "FRP stair tread covers and fiberglass grating treads with slip-resistant grit and high-visibility nosing. ASTM E84 options and DDP USA quotes.";
const pagePath = "/products/frp-stair-treads";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

// Typical program values — confirmed per order on the production batch;
// no published per-size weight table exists for this family yet, so the page
// deliberately avoids one (data-integrity rule).
const faqItems = [
  {
    question: "What are FRP stair tread covers and how do they install?",
    answer:
      "A stair tread cover is a thin anti-slip fiberglass plate — typically 3–4 mm with a bonded silica-grit surface and a high-visibility nosing — shaped to sit over an existing concrete, steel checker-plate, or timber tread. Installation is adhesive plus mechanical fixings at the nosing, one tread at a time, so a stairway can stay in service during the retrofit. No hot work, no coating cure window, and each cover is cut to your tread dimensions before dispatch.",
  },
  {
    question: "Tread covers or full grating treads — which do I need?",
    answer:
      "Retrofit over sound existing stairs: covers. New FRP stairways and platforms, or treads that have corroded through: full fiberglass grating treads — molded grating treads (25 or 38 mm deep, matching the mesh panels on our gratings page) or pultruded T-bar treads, both supplied with an integral grit nosing and end plates drilled for stringer bolting. If the stringers themselves are failing, look at a complete FRP stair assembly from structural profiles instead of tread-level repair.",
  },
  {
    question: "How slip-resistant are the grit surfaces?",
    answer:
      "The bonded-grit walking surface is the same system used on industrial FRP grating: coarse silica or aluminum-oxide grit in the top resin layer. Grit surfaces of this construction typically achieve the higher slip-resistance classes when tested to DIN 51130 / AS 4586-type ramp methods; specify the rating your project requires in the RFQ and we confirm it against the production batch, with third-party test reports available on request.",
  },
  {
    question: "What fire ratings are available?",
    answer:
      "Standard covers use a general-purpose polyester system. Where the stair is an escape route or the specification calls for surface-burning limits, order the fire-retardant resin option — the FR system is the same family that carries ASTM E84 Class 1 flame-spread ratings on our profile range, with certified per-batch test reports available when the project requires documentation.",
  },
  {
    question: "What sizes can be supplied?",
    answer:
      "Covers are production-cut to your tread schedule — length, depth (going), and nosing height per stair flight — so there is no standard-size constraint to design around. Typical retrofit programs run 600–1,500 mm tread lengths. Send the tread schedule as a simple table (count × length × depth) with the RFQ; mixed sizes in one order are normal.",
  },
  {
    question: "Why fiberglass instead of steel or aluminum tread plates?",
    answer:
      "Steel checker plate rusts at exactly the point you walk on, aluminum work-hardens slippery-smooth, and both conduct electricity. Fiberglass treads keep their grit surface through the corrosion exposures that destroy coated metal — washdown chemicals, coastal salt, battery rooms — and stay non-conductive and non-sparking, which is why they are the default in chemical plants and substations.",
  },
];

export default function StairTreadCoversPage() {
  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "FRP Stair Tread Covers & Fiberglass Grating Treads",
          description: pageDescription,
          path: pagePath,
          image: "/opengraph-image",
          category: "FRP Stair Treads",
          productLine: "F1-GRID",
          material: ["E-glass fiber", "Isophthalic polyester resin", "Fire-retardant polyester resin", "Vinyl ester resin"],
          additionalProperty: [
            { name: "Product forms", value: "Anti-slip tread covers (3–4 mm plate); molded grating treads 25/38 mm; pultruded T-bar treads" },
            { name: "Surface", value: "Bonded silica / aluminum-oxide grit, high-visibility nosing" },
            { name: "Sizing", value: "Production-cut to tread schedule, mixed sizes per order" },
            { name: "Fire option", value: "FR resin system (ASTM E84 Class 1 family), certified reports per batch on request" },
          ],
        })}
      />
      <PageHeader
        tag="Gratings & Decks · F1-GRID"
        title="Stair tread covers & fiberglass stair treads"
        description="Anti-slip FRP stair tread covers for retrofitting existing concrete, steel, and timber stairs — plus full fiberglass grating treads for new FRP stairways. Grit walking surface, high-visibility nosing, cut to your tread schedule, immune to the corrosion that destroys coated metal treads."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Stair Tread Covers" },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Two Product Families</SectionTag>
          <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Retrofit covers, or full FRP treads
          </h2>
          <div className="mt-[21px] grid gap-[21px] md:grid-cols-2">
            <div className="rounded-[8px] border border-border-default bg-white p-[24px]">
              <h3 className="text-f19 font-bold text-t1">Anti-slip tread covers</h3>
              <p className="mt-[13px] text-f15 leading-golden text-t2">
                Thin fiberglass plates — typically 3&ndash;4 mm — with a bonded grit surface
                and a contrasting safety nosing, production-cut to sit over each existing
                tread. The stairway stays in service during installation: adhesive plus a
                row of mechanical fixings at the nosing, tread by tread. The plate itself
                is the same gritted material offered on our{" "}
                <Link href="/products/fiberglass-sheets" className="font-semibold text-teal-text hover:underline">
                  fiberglass sheet
                </Link>{" "}
                program.
              </p>
            </div>
            <div className="rounded-[8px] border border-border-default bg-white p-[24px]">
              <h3 className="text-f19 font-bold text-t1">Fiberglass grating treads</h3>
              <p className="mt-[13px] text-f15 leading-golden text-t2">
                Complete treads for new FRP stairs: molded grating treads in the same 25
                and 38 mm depths as our{" "}
                <Link href="/products/molded-frp-grating" className="font-semibold text-teal-text hover:underline">
                  molded grating panels
                </Link>
                , or{" "}
                <Link href="/products/frp-gratings" className="font-semibold text-teal-text hover:underline">
                  pultruded T-bar treads
                </Link>{" "}
                for longer clear widths — both with integral
                grit nosing and end plates pre-drilled for stringer bolting. Pair with{" "}
                <Link href="/products/frp-handrail-systems" className="font-semibold text-teal-text hover:underline">
                  fiberglass handrail systems
                </Link>{" "}
                for a fully non-conductive stairway.
              </p>
            </div>
          </div>
          <p className="mt-[21px] max-w-[860px] text-f15 leading-golden text-t2">
            Where they earn their keep: chemical and fertilizer plants, wastewater works,
            coastal and offshore platforms, substations and battery rooms, food-plant
            washdown areas — anywhere steel checker plate rusts, timber rots, or a
            conductive tread is a hazard. Covers are the fastest fix for stairs that are
            structurally sound but dangerous underfoot.
          </p>
        </div>
      </section>

      <RelatedLinks
        groups={[
          {
            title: "Build the full stairway",
            links: [
              { href: "/products/frp-handrail-systems", label: "Fiberglass handrail systems" },
              { href: "/products/frp-ladders", label: "FRP fixed access ladders" },
              { href: "/products/molded-frp-grating", label: "Molded grating stair-tread panels" },
              { href: "/products/frp-gratings", label: "Pultruded T-bar grating" },
              { href: "/products/fiberglass-structural-shapes/frp-channel", label: "Channels for stringers" },
              { href: "/case-studies/factory-access-staircase", label: "FRP access staircase case study" },
            ],
          },
          {
            title: "Specify & buy",
            links: [
              { href: "/fiberglass-pultruded-profile-price", label: "Profile price estimator" },
              { href: "/resources/frp-pultrusion-fob-ddp-export-guide", label: "DDP, tariffs & HS codes" },
              { href: "/technology/quality-testing", label: "Quality & testing" },
            ],
          },
        ]}
      />

      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <FAQ items={faqItems} />
        </div>
      </section>

      <AskAICard prefill="I need anti-slip stair treads: [retrofit covers / new grating treads], tread count and sizes [n × length × depth mm], environment [chemical/coastal/plant], slip rating and fire requirements [R-class / ASTM E84]. What do you recommend and what should the RFQ include?" />

      <InnerCTA title="Send your tread schedule — quote within 24 hours." />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import SectionTag from "@/components/ui/SectionTag";
import FAQ from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { SteelVsFrpChamberCore } from "@/components/sections/ConceptAnimations";
import { buildPageMetadata, buildProductSchema } from "@/lib/seo";

const pageTitle = "Pultruded Fiberglass Window Reinforcements — uPVC Cores";
const pageDescription =
  "Pultruded fiberglass window reinforcement profiles for vinyl and uPVC frames: replace steel inserts, remove the thermal bridge. Custom sections, DDP export.";
const pagePath = "/products/window-reinforcement-profiles";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const whyReplace = [
  {
    title: "The steel bridge problem",
    body:
      "uPVC sash and mullion profiles above roughly 1.2 m span deflect beyond code limits under glass dead load and wind load, so system houses insert U-shaped or rectangular galvanized steel into the hollow chamber. The steel restores stiffness — and installs a continuous cold bridge through an otherwise insulating frame, typically raising effective frame U-values from 1.3–1.7 to 1.5–2.1 W/m²·K.",
  },
  {
    title: "What fiberglass changes",
    body:
      "A pultruded fiberglass reinforcement core delivers stiffness in the same chamber at ≈ 0.3 W/m·K conductivity — roughly 1/170th of steel — so the reinforced chamber stays part of the thermal envelope instead of a leak through it. It also cannot rust inside the chamber, weighs about a quarter of the steel section it replaces, and is cut and screwed on the same fabrication line.",
  },
  {
    title: "A proven category, not an experiment",
    body:
      "Composite window reinforcement is an established European practice — glass-fiber reinforced cores replacing steel are specified by major uPVC system houses for their high-thermal window lines. The engineering trade is straightforward: fiberglass runs a lower elastic modulus than steel, so the section is engineered — deeper webs, thicker walls, or higher glass loading — to match the target stiffness within the same chamber envelope.",
  },
];

const engineeringPoints = [
  {
    aspect: "Section forms",
    detail:
      "U-channels, rectangular box sections, flat bars, and custom chamber-fit geometries — dimensioned to your system's reinforcement chamber from your die drawing or a sample lineal.",
  },
  {
    aspect: "Stiffness engineering",
    detail:
      "Sections engineered to a target EI (bending stiffness) rather than a nominal material spec: fiber architecture, wall thickness, and section depth are tuned so the composite core meets the deflection criteria the steel insert was doing — verified by calculation and, where required, by third-party flexural testing.",
  },
  {
    aspect: "Resin systems",
    detail:
      "Polyester as the economic baseline, vinyl ester for higher temperature and moisture cycling, polyurethane where the highest transverse strength and screw retention are specified.",
  },
  {
    aspect: "Screw retention & fabrication",
    detail:
      "Pultruded fiberglass holds hardware screws directly without the stripped-thread and corrosion issues of thin-wall steel. Cores are cut with standard carbide tooling on the fabricator's existing line — no process change beyond the saw blade.",
  },
  {
    aspect: "Tolerances & QC",
    detail:
      "ASTM D3917 dimensional tolerance classes with batch mill certificates; first-article dimensional reports against the chamber drawing before production release.",
  },
  {
    aspect: "Tooling & lead time",
    detail:
      "Custom die fabrication in 3–6 weeks, first production in 6–10 weeks total — the same custom-pultrusion program that runs our structural and fenestration profiles.",
  },
];

const faqItems = [
  {
    question: "What are pultruded fiberglass window reinforcements?",
    answer:
      "They are continuous pultruded fiberglass sections — U-channels, box sections, or flat bars — inserted into the reinforcement chamber of a vinyl (uPVC) window profile in place of the conventional galvanized steel insert. The composite core restores the stiffness the uPVC profile lacks above roughly 1.2 m span, but at ≈ 0.3 W/m·K thermal conductivity instead of steel's ≈ 50 W/m·K, so the reinforced frame keeps its insulating value. The category is established practice in European high-thermal uPVC systems.",
  },
  {
    question: "Why replace steel window reinforcement with fiberglass?",
    answer:
      "Three reasons. Thermal: steel reinforcement is a continuous cold bridge that typically raises a reinforced uPVC frame's U-value by 0.2–0.4 W/m²·K; fiberglass removes that penalty, which matters most on passive-house and energy-code-driven projects. Corrosion: steel inserts can corrode inside the chamber from condensation over a 30-year service life; fiberglass cannot. Weight and logistics: the composite core weighs roughly a quarter of the equivalent steel section, reducing sash weight, hardware load, and freight.",
  },
  {
    question: "Is fiberglass stiff enough to replace steel in a window chamber?",
    answer:
      "Not at equal section — and honest suppliers say so. Pultruded fiberglass runs an elastic modulus of 20–28 GPa against steel's ≈ 200 GPa, so a drop-in copy of the steel section would be too flexible. The reinforcement is instead engineered to a target bending stiffness (EI) within the chamber envelope: deeper section, thicker walls, higher glass loading, or a combination. For most sash and mullion chambers there is enough room to reach the required EI; where there is not, we tell you at the drawing stage rather than after tooling.",
  },
  {
    question: "Can fiberglass reinforcement be used in vinyl windows?",
    answer:
      "Yes — vinyl (uPVC) window systems are exactly where pultruded fiberglass reinforcement is used. The fiberglass core slides into the same internal chamber the galvanized steel insert occupies today and is fixed the same way, so the vinyl extrusion itself does not change and the fabrication line needs no retooling beyond a carbide saw blade. The gain is thermal: a steel-reinforced vinyl frame typically loses 0.2–0.4 W/m²·K of U-value to the steel bridge, and the fiberglass core removes that penalty — which is often the difference between a standard vinyl system and one that qualifies for energy-code or passive-house-adjacent projects.",
  },
  {
    question: "What is the alternative to steel reinforcement in uPVC windows?",
    answer:
      "There are three established alternatives to galvanized steel reinforcement in uPVC window chambers. Pultruded fiberglass (GRP) cores — the product on this page — replace steel stiffness with an engineered composite section at ≈ 0.3 W/m·K conductivity. Glass-fiber-reinforced thermoplastic composite reinforcements are the same idea executed by several European system houses for their high-thermal lines. And frame-material substitution — moving the whole window to pultruded fiberglass profiles — removes the reinforcement question entirely, since FRP frames carry the loads without any insert. Which route fits depends on whether you are optimizing an existing uPVC system (composite core) or specifying a new high-performance line (FRP frames).",
  },
  {
    question: "How do I qualify F1's window reinforcement profiles for my system?",
    answer:
      "Send the chamber drawing (or a physical sample lineal) and the stiffness target — either the steel section currently specified or the deflection criterion itself. F1 returns a proposed composite section with calculated EI, resin recommendation, and tooling quote. Qualification then follows the standard custom-pultrusion path: die in 3–6 weeks, first-article dimensional and flexural reports, then staged production. Batch mill certificates and third-party inspection (SGS/BV) are supported for ongoing supply.",
  },
];

export default function WindowReinforcementProfilesPage() {
  return (
    <>
      <JsonLd
        data={buildProductSchema({
          name: "Pultruded Fiberglass Window Reinforcement Profiles",
          description:
            "Custom pultruded fiberglass reinforcement cores for vinyl/uPVC window profiles — thermal-bridge-free replacement for galvanized steel chamber inserts.",
          path: pagePath,
          image: "/images/products/upvc-window-fiberglass-reinforcement-context.jpg",
          category: "FRP Window Reinforcement Profiles",
          productLine: "F1-FORM",
          // Indicative per-metre band for the reinforcement-core program (small
          // chamber-fit sections, custom pultrusion). Routes to /contact for a quote.
          priceRange: { lowPrice: "2", highPrice: "40", offerCount: "1", unitText: "linear meter" },
          material: ["E-glass roving", "Polyester resin", "Vinyl ester resin", "Polyurethane resin"],
          additionalProperty: [
            { name: "Also known as", value: "Fiberglass window reinforcements, composite uPVC reinforcement, vinyl window stiffener cores" },
            { name: "Section forms", value: "U-channel, rectangular box, flat bar, custom chamber-fit" },
            { name: "Thermal conductivity", value: "≈ 0.3 W/m·K (vs galvanized steel ≈ 50 W/m·K)" },
            { name: "Tolerances", value: "ASTM D3917 classes, batch mill certificates" },
            { name: "Tooling lead time", value: "Die 3–6 weeks; first production 6–10 weeks" },
          ],
        })}
      />
      <PageHeader
        tag="Custom Pultrusion · F1-FORM"
        title="Pultruded fiberglass window reinforcements"
        description="Composite reinforcement cores for vinyl and uPVC window profiles — engineered to the stiffness your chamber needs, without the thermal bridge, corrosion risk, or weight of galvanized steel inserts. Supplied as a custom pultrusion program: your chamber drawing in, qualified profiles out."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Window Reinforcements" },
        ]}
      />

      {/* Why replace steel */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Why Replace Steel</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            The reinforcement chamber is the last thermal bridge in a uPVC window
          </h2>
          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-[1fr_320px] lg:items-start">
            <p className="text-f15 leading-golden text-t2">
              Every white frame like the one pictured hides a structural question inside its
              largest hollow chamber: what carries the glass load once the sash grows past a
              kitchen-casement size? For decades the answer has been a galvanized steel
              insert — invisible in the finished window, decisive for its U-value. Replacing
              that insert with a pultruded fiberglass core is the single change that lets a
              standard uPVC system compete thermally in energy-code-driven markets, without
              retooling the uPVC extrusion itself.
            </p>
            <div className="relative aspect-[3/4] overflow-hidden rounded-[8px] border border-border-default">
              <Image
                src="/images/products/upvc-window-fiberglass-reinforcement-context.jpg"
                alt="White uPVC tilt-and-turn window — the hollow reinforcement chamber inside frames like this is where pultruded fiberglass cores replace galvanized steel inserts"
                fill
                sizes="(max-width: 1024px) 100vw, 320px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="mt-[34px]">
            <SteelVsFrpChamberCore />
          </div>
          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-3">
            {whyReplace.map((item) => (
              <div key={item.title} className="rounded-[8px] border border-border-default bg-bg2 p-[34px]">
                <h3 className="text-[17px] font-bold text-t1">{item.title}</h3>
                <p className="mt-[13px] text-f15 leading-golden text-t2">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-[21px] text-f13 text-t3">
            Background on the steel-bridge numbers: see the reinforcement discussion in{" "}
            <Link href="/technology/frp-vs-pvc-windows" className="font-semibold text-teal-text hover:text-teal">
              FRP vs PVC window frames
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Engineering & supply */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Engineering &amp; Supply</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            From your chamber drawing to qualified reinforcement profiles
          </h2>
          <p className="mt-[13px] text-f15 leading-golden text-t2">
            Window reinforcements run through F1&apos;s custom pultrusion program —
            the same lines, dies, and QC that produce our structural and
            fenestration profiles.
          </p>

          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Aspect</th>
                  <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">What you get</th>
                </tr>
              </thead>
              <tbody>
                {engineeringPoints.map((row) => (
                  <tr key={row.aspect} className="border-b border-border-default align-top">
                    <td className="py-[13px] pr-[21px] text-f15 font-semibold text-t1 md:w-[260px]">{row.aspect}</td>
                    <td className="py-[13px] text-f15 leading-golden text-t2">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <RelatedLinks
        background="white"
        groups={[
          {
            title: "Related products",
            links: [
              { href: "/products/custom-pultrusions", label: "Custom pultrusion services" },
              { href: "/products/fenestration-systems", label: "Fiberglass windows & doors (complete frames)" },
              { href: "/pultruded-frp-profiles", label: "All pultruded FRP profiles" },
            ],
          },
          {
            title: "Technical background",
            links: [
              { href: "/technology/frp-vs-pvc-windows", label: "FRP vs PVC window frames (steel-bridge data)" },
              { href: "/technology/polyurethane-pultrusion-windows", label: "Polyurethane pultrusion windows (GFRP-PU)" },
              { href: "/technology/u-value-calculator", label: "Window U-value calculator" },
              { href: "/technology/quality-testing", label: "Quality testing (EN 13706 / ASTM)" },
            ],
          },
        ]}
      />

      {/* FAQ */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <FAQ items={faqItems} />
        </div>
      </section>

      <InnerCTA title="Send your chamber drawing for a reinforcement section proposal" />
    </>
  );
}

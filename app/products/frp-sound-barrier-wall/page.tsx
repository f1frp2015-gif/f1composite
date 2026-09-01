import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AskAICard from "@/components/ai/AskAICard";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import FAQ from "@/components/ui/FAQ";
import SectionTag from "@/components/ui/SectionTag";
import {
  frpSoundBarrierImageAssets,
  soundBarrierApplications,
  soundBarrierConfigurations,
  soundBarrierEngineeringInputs,
  soundBarrierMetricGuide,
  soundBarrierSystemComponents,
  soundBarrierTechnicalSources,
} from "@/content/data/frpSoundBarrierWallSpecs";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { authorsBySlug } from "@/lib/authors";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pagePath = "/products/frp-sound-barrier-wall";
const seoTarget = getSeoQueryTarget(pagePath);
const publishedAt = "2026-09-01";
const updatedAt = "2026-09-01";
const author = authorsBySlug["yifan-liu"];
const reviewer = authorsBySlug["haifeng-gong"];

export const metadata: Metadata = buildPageMetadata({
  title: seoTarget.title,
  description: seoTarget.description,
  path: pagePath,
  image: "/products/frp-sound-barrier-wall/opengraph-image",
});

const quickFacts = [
  { value: "2", label: "reflective or absorptive configurations" },
  {
    value: "1 system",
    label: "panels, posts and closures coordinated with project foundation interfaces",
  },
  {
    value: "Assembly-specific",
    label: "acoustic evidence and structural calculations tied to the offered build-up",
  },
  { value: "Drawing-led", label: "dimensions and interfaces released before production" },
];

const materialComparison = [
  {
    criterion: "Handling and access",
    frp: "Low-density modular planks can reduce individual lift weight; the released panel length and lift plan still govern.",
    concrete: "High mass commonly needs heavy lifting and substantial foundations.",
    steelWood: "Steel panels can be lighter than concrete; timber is easy to handle but section and treatment vary.",
  },
  {
    criterion: "Corrosion and moisture",
    frp: "No metallic rust; resin, veil, finish, seals and fasteners must match UV, chemicals and temperature.",
    concrete:
      "The cementitious matrix does not rust, but reinforcement corrosion can follow cracking, chloride ingress or inadequate cover.",
    steelWood: "Steel relies on coating integrity; timber relies on species, treatment, drainage and detailing.",
  },
  {
    criterion: "Acoustic evidence",
    frp: "Reflective and absorptive assemblies are possible. Only the offered tested build-up carries a declared rating.",
    concrete: "High mass supports transmission control, but site performance still depends on geometry and openings.",
    steelWood: "Panel mass, joints, cavities and absorptive layers decide performance—not the material label alone.",
  },
  {
    criterion: "Fire and impact",
    frp: "Resin, laminate, finish and the actual test specimen govern reported fire and impact performance; FRP is not noncombustible by default.",
    concrete: "Noncombustible and high-mass, with impact and reinforcement detailing checked to the project.",
    steelWood: "Steel is noncombustible but loses strength with heat; timber needs a stated fire strategy and classification.",
  },
  {
    criterion: "Modification and replacement",
    frp: "Modular bays can be removed without hot work when the connection detail allows it. Cutting requires dust control and edge sealing.",
    concrete: "Panel replacement normally has heavier lifting and traffic-management demands.",
    steelWood: "Steel may require hot-work controls; timber is easy to cut but needs treatment at new edges.",
  },
] as const;

const supplyCapabilities = [
  {
    title: "Section review and custom pultrusion",
    body:
      "F1 reviews the plank section, interlock, resin, reinforcement, color and finish against the wall geometry. A custom die and first article are quoted when an existing section cannot meet the released requirements.",
  },
  {
    title: "QA and approval submittals",
    body:
      "The order can define controlled drawings, dimensional checks, material records, finish samples and the acoustic evidence applicable to the offered specimen or panel build-up. Project acceptance remains with the named authority.",
  },
  {
    title: "Commercial and export release",
    body:
      "The quotation states tooling, sample plan, MOQ, production lead time, cut lengths, packing concept, Incoterm and destination. These items are confirmed for the project rather than presented as universal stock terms.",
  },
] as const;

const faqItems = [
  {
    question: "What is an FRP sound barrier wall?",
    answer:
      "An FRP sound barrier wall is an outdoor noise-control system. In this application, the barrier planks are glass-fiber-reinforced polymer (GFRP), commonly called fiberglass or GRP; FRP is the broader composite-material family. Pultruded panels can stack between posts, with joints and perimeter closures detailed to limit acoustic leakage. The complete wall—not the panel skin alone—must be engineered for acoustics, wind, foundation interfaces, exposure and project approvals.",
  },
  {
    question: "How do fiberglass noise barrier panels reduce sound?",
    answer:
      "A continuous wall blocks the direct path between a source and receiver, forcing sound to travel over the top or around the ends. A reflective assembly primarily limits transmission through the wall; an absorptive assembly also dissipates part of the incident sound at the source-side face. Height, length, location, sealed joints and surrounding geometry strongly affect the installed result.",
  },
  {
    question: "What is the difference between reflective and absorptive FRP noise barriers?",
    answer:
      "A reflective barrier uses a closed surface and returns much of the incident sound toward the source side. An absorptive barrier may add an acoustically open source-side face and protected porous core to reduce reflection; a declared NRC requires the offered build-up and mounting to match applicable test evidence. Absorption can matter between parallel walls or in confined equipment areas, but it should be selected by the acoustic study rather than added as a generic upgrade.",
  },
  {
    question: "What NRC, STC or noise-reduction rating does the F1 wall have?",
    answer:
      "F1 does not publish one generic rating for every configuration. NRC applies to the absorptive specimen and mounting tested. STC, OITC and transmission loss apply to the tested wall specimen or panel build-up. Posts, closures and site gaps still affect installed leakage and insertion loss. The quotation identifies the offered construction and the evidence that applies to it. Field insertion loss is predicted from the project geometry and verified only when the specification requires it.",
  },
  {
    question: "Are FRP sound barrier walls approved by AASHTO or a DOT?",
    answer:
      "There is no universal approval that covers every highway agency and wall layout. The highway authority may require product acceptance, laboratory acoustic data, structural calculations, fire and durability evidence, and crash testing or shielding when the wall is in a roadside recovery zone. Acceptance should be checked against the named jurisdiction in a project compliance matrix; a general marketing claim does not substitute for agency acceptance.",
  },
  {
    question: "Is an FRP noise barrier better than concrete, steel or wood?",
    answer:
      "FRP is attractive where low panel mass, corrosion resistance, electrical behavior or modular replacement reduce project risk. Concrete can still be the best high-mass, noncombustible option; steel can suit standardized metal-panel supply; timber can be economical and visually familiar. Compare the tested acoustic assembly, foundations, fire strategy, access, exposure and lifecycle maintenance rather than choosing by material name alone.",
  },
  {
    question: "Which sizes, colors and resin systems are available?",
    answer:
      "Panel height, wall thickness, length, post spacing, color, finish and resin system are released against the project specification and manufacturing review. F1 can evaluate integral colors, surface veils, coatings, reflective or absorptive faces, and container-compatible delivery lengths. Public competitor dimensions are not presented as F1 stock sizes.",
  },
  {
    question: "What information is needed for an FRP sound barrier quote?",
    answer:
      "Send the noise study or source data, alignment, total length and height, receiver locations, reflective or absorptive requirement, wind and other structural actions, soil and foundation information, fire and environmental criteria, color, openings, jurisdiction, drawings, quantity, destination and required delivery date. A marked plan and elevation are the fastest starting point.",
  },
  {
    question: "How are FRP sound barrier panels installed?",
    answer:
      "Installation normally follows the released sequence for foundations or anchor interfaces, posts, bearing details, stacked or inserted planks, seals and top/end closures. The installer must protect joint continuity, stated bearing, thermal movement and panel finish; gates, penetrations, steps and damaged cut edges need the project detail. Lift weights, temporary bracing, traffic control and dust controls are confirmed in the site method statement.",
  },
];

export default function FrpSoundBarrierWallPage() {
  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "FRP Sound Barrier Wall Panels",
          description: seoTarget.description,
          path: pagePath,
          image: frpSoundBarrierImageAssets.hero,
          category: "Outdoor FRP sound barrier wall and fiberglass noise barrier panels",
          material: [
            "Pultruded glass fiber reinforced polymer",
            "Thermoset composite",
            "Project-specific acoustic infill",
          ],
          schemaType: "CollectionPage",
          datePublished: publishedAt,
          dateModified: updatedAt,
          author: {
            name: author.fullName,
            jobTitle: author.jobTitle,
            path: `/about/authors/${author.slug}`,
          },
          reviewedBy: {
            name: reviewer.fullName,
            jobTitle: reviewer.jobTitle,
            path: `/about/authors/${reviewer.slug}`,
          },
        })}
      />

      <PageHeader
        tag="Outdoor Noise Control · Infrastructure & Industry"
        title="FRP Sound Barrier Wall Panels"
        description="Project-engineered FRP sound barrier wall panels for highways, railways, industrial equipment and utility sites. Configure reflective or absorptive fiberglass noise barriers with coordinated posts, joints, closures, finishes and foundation interfaces."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "FRP Sound Barrier Wall" },
        ]}
      />

      <section className="bg-white py-[55px] md:py-[89px]">
        <div className="mx-auto grid max-w-[1280px] gap-[34px] px-[20px] sm:px-[28px] lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-[34px]">
          <div>
            <SectionTag>Engineered FRP Noise Barrier Solutions</SectionTag>
            <h2 className="mt-[13px] text-[clamp(28px,4vw,48px)] font-extrabold leading-[1.08] text-t1">
              Engineer the wall as an acoustic and structural system
            </h2>
            <p className="mt-[21px] text-f17 leading-golden text-t2">
              F1 Composite supplies <strong className="text-t1">FRP sound barrier wall panels</strong> as
              engineered-to-order outdoor systems. Pultruded fiberglass planks, also called GRP or GFRP
              noise barrier panels, stack between posts to create a continuous wall for highway, railway,
              industrial and commercial noise control.
            </p>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              The useful question is not “what dB does FRP provide?” Acoustic performance belongs to a
              complete tested assembly and an actual site geometry. F1 therefore releases the panel,
              joints, closures, supports, finish and foundation interfaces together, with project-specific
              evidence identified before production.
            </p>
            <div className="mt-[29px] flex flex-wrap gap-[13px]">
              <Link
                href="/contact?source=frp-sound-barrier-wall&inquiry_type=rfq"
                className="rounded-[4px] bg-teal px-[21px] py-[13px] text-f14 font-bold text-white transition-colors hover:bg-teal-text"
              >
                Request a sound-wall review
              </Link>
              <a
                href="#acoustic-options"
                className="rounded-[4px] border border-border-default bg-white px-[21px] py-[13px] text-f14 font-bold text-t1 transition-colors hover:border-teal hover:text-teal-text"
              >
                Compare panel options
              </a>
            </div>
          </div>
          <figure>
            <div className="relative aspect-[3/2] overflow-hidden rounded-[8px] border border-border-default bg-bg2">
              <Image
                src={frpSoundBarrierImageAssets.hero}
                alt="Blue and teal modular FRP sound barrier wall panels installed along a highway"
                fill
                preload
                sizes="(max-width: 1024px) calc(100vw - 40px), 54vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-[8px] text-f12 leading-golden text-t3">
              AI-generated application visualization for concept planning. It is not an F1 project
              photograph, an approved shop drawing or evidence of a tested acoustic assembly.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="border-y border-border-default bg-bg2 py-[34px]">
        <div className="mx-auto grid max-w-[1280px] gap-[13px] px-[20px] sm:grid-cols-2 sm:px-[28px] lg:grid-cols-4 lg:px-[34px]">
          {quickFacts.map((fact) => (
            <div key={fact.label} className="rounded-[8px] border border-border-default bg-white p-[21px]">
              <p className="text-f21 font-extrabold text-teal-text">{fact.value}</p>
              <p className="mt-[5px] text-f13 leading-golden text-t2">{fact.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-[55px] md:py-[89px]">
        <div className="mx-auto grid max-w-[1280px] gap-[34px] px-[20px] sm:px-[28px] lg:grid-cols-[1.04fr_0.96fr] lg:px-[34px]">
          <div>
            <SectionTag>How Outdoor Barriers Work</SectionTag>
            <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
              Height, length and continuity set the installed result
            </h2>
            <p className="mt-[21px] text-f16 leading-golden text-t2">
              A sound wall reduces the direct path from source to receiver. Sound still diffracts over
              the top and around the ends, which is why a strong panel can underperform when the wall is
              too short, too low or interrupted by unsealed gaps.
            </p>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              The U.S. Federal Highway Administration gives two useful planning rules: just blocking the
              line of sight commonly produces about <strong className="text-t1">5 dB(A)</strong> insertion
              loss, while an effective design can approach <strong className="text-t1">10 dB(A)</strong>,
              perceived roughly as half as loud for the first row of receivers. Those are geometry-based
              highway rules of thumb, not guaranteed F1 panel values.
            </p>
            <a
              href="https://www.fhwa.dot.gov/Environment/noise/noise_barriers/design_construction/design/design03.cfm"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-[21px] inline-flex text-f13 font-semibold text-teal-text hover:underline"
            >
              Read the FHWA acoustic-design basis ↗
            </a>
          </div>
          <aside className="rounded-[8px] border border-teal-border bg-teal-bg p-[21px] sm:p-[34px]">
            <p className="text-f11 font-bold uppercase tracking-[0.12em] text-teal-text">
              Specifier answer
            </p>
            <p className="mt-[13px] text-f19 font-bold leading-[1.35] text-t1">
              An FRP noise barrier is not “soundproof.”
            </p>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              Select the wall from source spectrum, receiver geometry, target insertion loss, barrier
              alignment and jurisdiction. Then verify the proposed panel assembly for transmission,
              absorption where required, structural loads and environmental exposure.
            </p>
            <ul className="mt-[21px] space-y-[10px] text-f14 leading-golden text-t2">
              <li>• Put the wall near the source or receiver when the acoustic model supports it.</li>
              <li>• Keep the barrier continuous and seal panel, post and perimeter paths.</li>
              <li>• Use absorption only when reflections matter to the project.</li>
              <li>• Treat gates, penetrations, steps and end returns as acoustic details.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section id="acoustic-options" className="scroll-mt-[120px] bg-bg2 py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <SectionTag>Reflective & Absorptive Options</SectionTag>
          <h2 className="mt-[13px] max-w-[920px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Two FRP noise barrier configurations, each released by assembly
          </h2>
          <p className="mt-[13px] max-w-[920px] text-f15 leading-golden text-t2">
            The configuration follows the acoustic study. Competitor test values do not transfer to an
            F1 wall simply because both use pultruded fiberglass or a tongue-and-groove joint.
          </p>
          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-2">
            {soundBarrierConfigurations.map((configuration) => (
              <article
                key={configuration.name}
                className="overflow-hidden rounded-[8px] border border-border-default bg-white"
              >
                <div className="border-b border-border-default bg-white p-[21px] sm:p-[29px]">
                  <p className="text-f11 font-bold uppercase tracking-[0.12em] text-teal-text">
                    {configuration.searchTerms}
                  </p>
                  <h3 className="mt-[8px] text-f21 font-extrabold text-t1">{configuration.name}</h3>
                  <p className="mt-[13px] text-f14 leading-golden text-t2">
                    {configuration.construction}
                  </p>
                </div>
                <div className="grid gap-[13px] p-[21px] sm:p-[29px]">
                  <div>
                    <p className="text-f12 font-bold uppercase tracking-wide text-t1">Best fit</p>
                    <p className="mt-[5px] text-f14 leading-golden text-t2">{configuration.bestFit}</p>
                  </div>
                  <div className="rounded-[6px] border border-amber-200 bg-amber-50 p-[13px]">
                    <p className="text-f12 font-bold uppercase tracking-wide text-t1">Release boundary</p>
                    <p className="mt-[5px] text-f13 leading-golden text-t2">
                      {configuration.releaseBoundary}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <SectionTag>Custom Manufacturing &amp; Supply</SectionTag>
          <h2 className="mt-[13px] max-w-[920px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            FRP sound barrier panel manufacturing and export supply
          </h2>
          <p className="mt-[13px] max-w-[920px] text-f15 leading-golden text-t2">
            Move from wall geometry to a controlled pultrusion and shipment package. F1 separates
            project-specific engineering, test evidence and commercial release so the buyer can see
            exactly what is included before tooling or production begins.
          </p>
          <div className="mt-[34px] grid gap-[16px] md:grid-cols-3">
            {supplyCapabilities.map((capability) => (
              <article key={capability.title} className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
                <h3 className="text-f17 font-extrabold text-t1">{capability.title}</h3>
                <p className="mt-[8px] text-f14 leading-golden text-t2">{capability.body}</p>
              </article>
            ))}
          </div>
          <Link
            href="/products/frp-pultrusion-manufacturer-factory-direct"
            className="mt-[21px] inline-flex text-f14 font-bold text-teal-text hover:underline"
          >
            Review F1 factory-direct pultrusion controls →
          </Link>
        </div>
      </section>

      <section className="bg-white py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <div className="grid gap-[34px] lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <figure>
              <div className="relative aspect-[3/2] overflow-hidden rounded-[8px] border border-border-default bg-bg2">
                <Image
                  src={frpSoundBarrierImageAssets.system}
                  alt="Exploded visualization of interlocking pultruded FRP noise barrier planks between structural posts"
                  fill
                  loading="lazy"
                  quality={75}
                  sizes="(max-width: 1024px) calc(100vw - 40px), 45vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-[8px] text-f12 leading-golden text-t3">
                AI-generated configuration visualization. It explains a modular plank-and-post concept;
                the project section, joint, post and optional acoustic build-up must follow the released drawings.
              </figcaption>
            </figure>
            <div>
              <SectionTag>Complete Wall Assembly</SectionTag>
              <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
                FRP sound barrier panel installation and system components
              </h2>
              <p className="mt-[21px] text-f15 leading-golden text-t2">
                A quote-ready system coordinates the pultruded planks with posts, seals, closures,
                finishes, anchors and foundation interfaces. This keeps the acoustic model, structural load path
                and installation sequence aligned through the same release drawing.
              </p>
            </div>
          </div>
          <div className="mt-[34px] grid gap-[16px] md:grid-cols-2 lg:grid-cols-3">
            {soundBarrierSystemComponents.map((component, index) => (
              <article key={component.title} className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
                <p className="text-f11 font-bold uppercase tracking-[0.12em] text-teal-text">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-[8px] text-f17 font-extrabold text-t1">{component.title}</h3>
                <p className="mt-[8px] text-f14 leading-golden text-t2">{component.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <SectionTag>Acoustic Metrics</SectionTag>
          <h2 className="mt-[13px] max-w-[920px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            NRC, STC, OITC and insertion loss answer different questions
          </h2>
          <p className="mt-[13px] max-w-[920px] text-f15 leading-golden text-t2">
            Do not convert one number into another or use a laboratory panel rating as a guaranteed
            property-line result. The test report, specimen construction and site model must agree.
          </p>
          <div className="mt-[34px] overflow-x-auto rounded-[8px] border border-border-default bg-white">
            <table className="w-full min-w-[820px] border-collapse text-left">
              <thead className="bg-white">
                <tr>
                  <th className="px-[21px] py-[13px] text-f12 font-bold uppercase tracking-wide text-t1">Metric</th>
                  <th className="px-[21px] py-[13px] text-f12 font-bold uppercase tracking-wide text-t1">What it answers</th>
                  <th className="px-[21px] py-[13px] text-f12 font-bold uppercase tracking-wide text-t1">What it does not answer</th>
                </tr>
              </thead>
              <tbody>
                {soundBarrierMetricGuide.map((row) => (
                  <tr key={row.metric} className="border-t border-border-default align-top">
                    <th className="px-[21px] py-[16px] text-f14 font-extrabold text-t1">{row.metric}</th>
                    <td className="px-[21px] py-[16px] text-f14 leading-golden text-t2">{row.answers}</td>
                    <td className="px-[21px] py-[16px] text-f14 leading-golden text-t2">{row.doesNotAnswer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <SectionTag>Material Decision</SectionTag>
          <h2 className="mt-[13px] max-w-[920px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            FRP vs concrete, steel and wood sound walls
          </h2>
          <p className="mt-[13px] max-w-[920px] text-f15 leading-golden text-t2">
            FRP is not the automatic winner on every site. Its strongest cases combine constrained
            installation access with corrosive exposure, modular repair or a need to avoid metallic
            panels. Concrete remains compelling for mass and noncombustibility.
          </p>
          <div className="mt-[34px] overflow-x-auto rounded-[8px] border border-border-default">
            <table className="w-full min-w-[1040px] border-collapse text-left">
              <thead className="bg-bg2">
                <tr>
                  <th className="px-[18px] py-[13px] text-f12 font-bold uppercase tracking-wide text-t1">Decision</th>
                  <th className="px-[18px] py-[13px] text-f12 font-bold uppercase tracking-wide text-t1">Pultruded FRP</th>
                  <th className="px-[18px] py-[13px] text-f12 font-bold uppercase tracking-wide text-t1">Concrete</th>
                  <th className="px-[18px] py-[13px] text-f12 font-bold uppercase tracking-wide text-t1">Steel or wood</th>
                </tr>
              </thead>
              <tbody>
                {materialComparison.map((row) => (
                  <tr key={row.criterion} className="border-t border-border-default align-top">
                    <th className="px-[18px] py-[16px] text-f13 font-extrabold text-t1">{row.criterion}</th>
                    <td className="px-[18px] py-[16px] text-f13 leading-golden text-t2">{row.frp}</td>
                    <td className="px-[18px] py-[16px] text-f13 leading-golden text-t2">{row.concrete}</td>
                    <td className="px-[18px] py-[16px] text-f13 leading-golden text-t2">{row.steelWood}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <SectionTag>From Noise Study to Release</SectionTag>
          <h2 className="mt-[13px] max-w-[920px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Six inputs for an engineered FRP sound wall
          </h2>
          <div className="mt-[34px] grid gap-[16px] md:grid-cols-2 lg:grid-cols-3">
            {soundBarrierEngineeringInputs.map((input, index) => (
              <article key={input.title} className="rounded-[8px] border border-border-default bg-white p-[21px]">
                <p className="text-f11 font-bold uppercase tracking-[0.12em] text-teal-text">
                  Step {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-[8px] text-f17 font-extrabold text-t1">{input.title}</h3>
                <p className="mt-[8px] text-f14 leading-golden text-t2">{input.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <SectionTag>Applications</SectionTag>
          <h2 className="mt-[13px] max-w-[920px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Highway, railway, industrial and utility noise barriers
          </h2>
          <div className="mt-[34px] grid gap-[16px] md:grid-cols-2 lg:grid-cols-3">
            {soundBarrierApplications.map((application) => (
              <article key={application.title} className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
                <h3 className="text-f17 font-extrabold text-t1">{application.title}</h3>
                <p className="mt-[8px] text-f14 leading-golden text-t2">{application.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border-default bg-bg2 py-[55px]">
        <div className="mx-auto grid max-w-[1280px] gap-[34px] px-[20px] sm:px-[28px] lg:grid-cols-[1.08fr_0.92fr] lg:px-[34px]">
          <div>
            <p className="text-f12 font-bold uppercase tracking-[0.12em] text-teal-text">
              Evidence and release boundary
            </p>
            <h2 className="mt-[13px] text-f24 font-extrabold text-t1">
              Public references explain the design method—not F1 product ratings
            </h2>
            <p className="mt-[13px] text-f14 leading-golden text-t2">
              The sources below define acoustic concepts, highway design expectations and test scopes.
              Supplier-specific NRC, STC, dimensions, spans and fire results are intentionally excluded
              from F1 claims unless the offered configuration is traceable to the same report and authorized
              for use. The released quotation and submittal control the actual product.
            </p>
          </div>
          <ul className="grid content-start gap-[8px]">
            {soundBarrierTechnicalSources.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-f13 font-semibold leading-golden text-teal-text hover:underline"
                >
                  {source.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[920px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <AskAICard prefill="I need an FRP sound barrier wall: application [highway/railway/industrial/data center], source and operating spectrum [attach study if available], wall alignment/length/height [mm], receiver locations [describe], reflective or absorptive requirement [state], wind and governing code [state], soil/foundation information [state], fire/environment criteria [state], openings and access [describe], finish/color [state], quantity and destination [state]. Build the RFQ checklist and separate laboratory panel ratings from predicted field insertion loss." />
          <FAQ items={faqItems} />
        </div>
      </section>

      <InnerCTA title="Send the noise study and wall alignment for engineering review" />

      <RelatedLinks
        groups={[
          {
            title: "Related systems",
            links: [
              { href: "/products/custom-pultruded-profiles", label: "Custom pultruded profiles" },
              {
                href: "/products/frp-pultrusion-manufacturer-factory-direct",
                label: "Factory-direct FRP pultrusion",
              },
              { href: "/products/fiberglass-structural-shapes", label: "Fiberglass structural shapes" },
            ],
          },
          {
            title: "Project context",
            links: [
              { href: "/industries/infrastructure", label: "Infrastructure applications" },
              { href: "/industries/industrial", label: "Industrial and chemical facilities" },
              { href: "/industries/vehicle", label: "Rail and transportation composites" },
            ],
          },
          {
            title: "Engineering resources",
            links: [
              { href: "/technology/pultrusion-process", label: "How pultruded panels are made" },
              { href: "/what-is-frp", label: "What is FRP?" },
              { href: "/technology/pultrusion-resin-systems", label: "Select an FRP resin system" },
              { href: "/technology/quality-testing", label: "Quality and testing methods" },
            ],
          },
        ]}
      />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ProductRfq from "@/components/products/ProductRfq";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import { FAQList } from "@/components/ui/FAQ";
import Figure from "@/components/ui/Figure";
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
import { authorsBySlug, reviewerCredit } from "@/lib/authors";
import { buildRfqHref } from "@/lib/rfq";
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

const quoteHref = buildRfqHref({
  source: "frp-sound-barrier-wall",
  product: "FRP sound barrier wall panels",
  productPath: pagePath,
  message: "Please review an FRP sound barrier wall. I will send the noise study, wall alignment, height and length, loads and foundation information.",
});

const requestItems = [
  { title: "Noise study", text: "The acoustic study or source data, receiver locations, target insertion loss and whether the wall must be reflective or absorptive." },
  { title: "Wall geometry", text: "Alignment, total length and height, openings, gates and end returns, with a marked plan and elevation." },
  { title: "Loads and ground", text: "Wind and other structural actions, the governing code, soil and foundation information, fire and environmental criteria." },
  { title: "Finish and delivery", text: "Color and finish, jurisdiction and submittals, quantity, destination and the required delivery date." },
];

const card = "rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]";
const link = "font-semibold text-teal-text underline underline-offset-4 hover:text-teal";

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
        updated={updatedAt}
        reviewer={reviewerCredit(reviewer)}
        tag="Noise barriers"
        line={{ name: "Noise barriers", label: "Wall panels", mark: false }}
        title="FRP sound barrier wall panels"
        description="Project-engineered FRP sound barrier wall panels for highways, railways, industrial equipment and utility sites. Configure reflective or absorptive fiberglass noise barriers with coordinated posts, joints, closures, finishes and foundation interfaces."
        facts={[
          { label: "Configurations", value: "Reflective or absorptive" },
          { label: "Supply", value: "Panels, posts, closures" },
          { label: "Acoustic data", value: "Per tested assembly" },
          { label: "Release", value: "Approved drawing" },
        ]}
        actions={{
          primary: { label: "Request a sound-wall review", href: quoteHref },
          secondary: { label: "Compare panel options", href: "#acoustic-options", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <Figure number={1} title="FRP noise barrier along a highway" caption="Panel layout, posts and acoustic build-up follow the approved shop drawing; acoustic ratings apply only to the tested assembly." bleed>
            <div className="relative aspect-[3/2]">
              <Image
                src={frpSoundBarrierImageAssets.hero}
                alt="Blue and teal modular FRP sound barrier wall panels installed along a highway"
                fill
                preload
                sizes="(max-width: 1023px) 94vw, 44vw"
                className="object-cover"
              />
            </div>
          </Figure>
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "FRP Sound Barrier Wall" },
        ]}
      />
      <PageNav
        items={[
          { id: "overview", label: "Overview" },
          { id: "acoustics", label: "Acoustics" },
          { id: "acoustic-options", label: "Options" },
          { id: "assembly", label: "Assembly" },
          { id: "materials", label: "Materials" },
          { id: "inputs", label: "Inputs" },
          { id: "supply", label: "Supply" },
          { id: "applications", label: "Applications" },
          { id: "faq", label: "FAQ" },
          { id: "quote", label: "Quote" },
        ]}
      />

      <PageSection id="overview" title="Engineer the wall as an acoustic and structural system">
        <div className="grid grid-cols-1 items-start gap-[28px] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-[48px]">
          <div className="space-y-[14px] text-f16 leading-golden text-t2">
            <p className="text-f18 text-t1">
              F1 Composite supplies FRP sound barrier wall panels as engineered-to-order outdoor systems. Pultruded fiberglass planks, also called GRP or GFRP noise barrier panels, stack between posts to create a continuous wall for highway, railway, industrial and commercial noise control.
            </p>
            <p>
              The useful question is not “what dB does FRP provide?” Acoustic performance belongs to a complete tested assembly and an actual site geometry. F1 therefore releases the panel, joints, closures, supports, finish and foundation interfaces together, with project-specific evidence identified before production.
            </p>
          </div>
          <aside className="rounded-card border border-border-default bg-bg2 p-[20px] sm:p-[28px]">
            <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Specifier answer</p>
            <p className="mt-[8px] text-f18 font-bold leading-snug text-t1">An FRP noise barrier is not “soundproof.”</p>
            <p className="mt-[10px] text-f14 leading-golden text-t2">
              Select the wall from source spectrum, receiver geometry, target insertion loss, barrier alignment and jurisdiction. Then verify the proposed panel assembly for transmission, absorption where required, structural loads and environmental exposure.
            </p>
            <ul className="mt-[14px] divide-y divide-border-default border-y border-border-default text-f14 leading-golden text-t2">
              <li className="py-[8px]">Put the wall near the source or receiver when the acoustic model supports it.</li>
              <li className="py-[8px]">Keep the barrier continuous and seal panel, post and perimeter paths.</li>
              <li className="py-[8px]">Use absorption only when reflections matter to the project.</li>
              <li className="py-[8px]">Treat gates, penetrations, steps and end returns as acoustic details.</li>
            </ul>
          </aside>
        </div>
      </PageSection>

      <PageSection id="acoustics" title="Height, length and continuity set the installed result" tone="muted">
        <div>
          <div className="max-w-[820px] space-y-[14px] text-f16 leading-golden text-t2">
            <p>
              A sound wall reduces the direct path from source to receiver. Sound still diffracts over the top and around the ends, which is why a strong panel can underperform when the wall is too short, too low or interrupted by unsealed gaps.
            </p>
            <p>
              The U.S. Federal Highway Administration gives two useful planning rules: just blocking the line of sight commonly produces about <strong className="font-semibold text-t1">5 dB(A)</strong> insertion loss, while an effective design can approach <strong className="font-semibold text-t1">10 dB(A)</strong>, perceived roughly as half as loud for the first row of receivers. Those are geometry-based highway rules of thumb, not guaranteed F1 panel values.
            </p>
            <a href="https://www.fhwa.dot.gov/Environment/noise/noise_barriers/design_construction/design/design03.cfm" target="_blank" rel="noopener noreferrer" className={`inline-block text-f14 ${link}`}>
              Read the FHWA acoustic-design basis <span aria-hidden>↗</span>
            </a>
          </div>
          <div className="mt-[40px]">
            <h3 className="text-f20 font-bold text-t1">NRC, STC, OITC and insertion loss answer different questions</h3>
            <p className="mt-[8px] max-w-[820px] text-f14 leading-golden text-t2">
              Do not convert one number into another or use a laboratory panel rating as a guaranteed property-line result. The test report, specimen construction and site model must agree.
            </p>
            <div className="relative mt-[16px] overflow-x-auto rounded-card border border-border-default bg-white">
              <table className="w-full min-w-[640px] border-collapse text-left text-f14">
                <caption className="sr-only">What each acoustic metric answers</caption>
                <thead>
                  <tr className="border-b border-border-default bg-bg2">
                    <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Metric</th>
                    <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">What it answers</th>
                    <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">What it does not answer</th>
                  </tr>
                </thead>
                <tbody>
                  {soundBarrierMetricGuide.map((row) => (
                    <tr key={row.metric} className="border-b border-border-default align-top last:border-b-0">
                      <th scope="row" className="whitespace-nowrap px-[14px] py-[10px] font-semibold text-t1">{row.metric}</th>
                      <td className="px-[14px] py-[10px] leading-golden text-t2">{row.answers}</td>
                      <td className="px-[14px] py-[10px] leading-golden text-t2">{row.doesNotAnswer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection
        id="acoustic-options"
        title="Two FRP noise barrier configurations, each released by assembly"
        intro="The configuration follows the acoustic study. Competitor test values do not transfer to an F1 wall simply because both use pultruded fiberglass or a tongue-and-groove joint."
      >
        <div className="grid grid-cols-1 gap-[16px] lg:grid-cols-2">
          {soundBarrierConfigurations.map((configuration) => (
            <article key={configuration.name} className="flex flex-col rounded-card border border-border-default bg-white p-[20px] sm:p-[28px]">
              <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{configuration.searchTerms}</p>
              <h3 className="mt-[8px] text-f20 font-bold text-t1">{configuration.name}</h3>
              <p className="mt-[10px] text-f14 leading-golden text-t2">{configuration.construction}</p>
              <h4 className="mt-[16px] font-mono text-f12 uppercase tracking-[0.06em] text-t3">Best fit</h4>
              <p className="mt-[4px] text-f14 leading-golden text-t2">{configuration.bestFit}</p>
              <div className="mt-auto pt-[16px]">
                <div className="rounded-control border border-warn-border bg-warn-bg p-[14px]">
                  <h4 className="font-mono text-f12 uppercase tracking-[0.06em] text-warn">Release boundary</h4>
                  <p className="mt-[4px] text-f14 leading-golden text-t2">{configuration.releaseBoundary}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection
        id="assembly"
        title="FRP sound barrier panel installation and system components"
        tone="muted"
        intro="A quote-ready system coordinates the pultruded planks with posts, seals, closures, finishes, anchors and foundation interfaces. This keeps the acoustic model, structural load path and installation sequence aligned through the same release drawing."
      >
        <div className="grid grid-cols-1 items-start gap-[24px] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-[40px]">
          <Figure
            number={2}
            title="Interlocking plank design"
            note="Supplier image"
            caption={
              <>
                Supplier reference image from{" "}
                <a
                  href="https://www.fibergrate.com/products/unique-product-solutions/sound-barrier-wall/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={link}
                >
                  Fibergrate
                </a>{" "}
                showing one proprietary interlocking-plank design. It is not an F1 project image or released F1 section; project geometry, joints and acoustic build-up must follow the approved drawings.
              </>
            }
          >
            <Image
              src={frpSoundBarrierImageAssets.panelSection}
              alt="Interlocking pultruded FRP sound barrier plank sections stacked between posts"
              width={259}
              height={194}
              loading="lazy"
              quality={85}
              sizes="259px"
              className="mx-auto h-auto w-full max-w-[259px]"
            />
          </Figure>
          <ol className="grid grid-cols-1 gap-[12px] sm:grid-cols-2">
            {soundBarrierSystemComponents.map((component, index) => (
              <li key={component.title} className={card}>
                <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Component {index + 1}</p>
                <h3 className="mt-[6px] text-f16 font-bold text-t1">{component.title}</h3>
                <p className="mt-[6px] text-f14 leading-golden text-t2">{component.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-[40px] grid grid-cols-1 items-start gap-[24px] border-t border-border-default pt-[32px] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-[48px]">
          <Figure
            number={3}
            title="Post-and-panel layout"
            note="Reference photo"
            caption="User-supplied layout reference showing a post-and-panel wall form that may inform a sound-wall configuration. The pictured product's material, function and project ownership are unverified; it is not an F1 project photograph or acoustic-performance evidence."
            bleed
          >
            <Image
              src={frpSoundBarrierImageAssets.installationReference}
              alt="Outdoor post-and-panel wall with horizontal infill panels at a commercial site"
              width={1024}
              height={683}
              loading="lazy"
              quality={75}
              sizes="(max-width: 1023px) 94vw, 54vw"
              className="h-auto w-full"
            />
          </Figure>
          <div>
            <h3 className="text-f20 font-bold text-t1">Can fiberglass plate profiles become FRP sound-wall panels?</h3>
            <p className="mt-[10px] text-f16 leading-golden text-t2">
              Some hollow or multi-cell pultruded plate sections can be evaluated as horizontal sound-wall planks when their cavity, return, edge and joint geometry fit the assembly. This is an application route, not a catalog equivalence: the section, laminate, sealed joints, post interface, loads and any absorptive build-up must be released together.
            </p>
            <p className="mt-[10px] text-f14 leading-golden text-t2">
              A plate drawing alone has no automatic NRC, STC, OITC, transmission-loss value or project span. Start with the section geometry, then complete the acoustic and structural review.
            </p>
            <Link href="/products/fiberglass-plates" className={`mt-[14px] inline-block text-f14 ${link}`}>
              Compare hollow and multi-cell fiberglass plate profile drawings
            </Link>
          </div>
        </div>
      </PageSection>

      <PageSection
        id="materials"
        title="FRP vs concrete, steel and wood sound walls"
        intro="FRP is not the automatic winner on every site. Its strongest cases combine constrained installation access with corrosive exposure, modular repair or a need to avoid metallic panels. Concrete remains compelling for mass and noncombustibility."
      >
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[960px] border-collapse text-left text-f14">
            <caption className="sr-only">Pultruded FRP compared with concrete, steel and wood sound walls</caption>
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Decision</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Pultruded FRP</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Concrete</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Steel or wood</th>
              </tr>
            </thead>
            <tbody>
              {materialComparison.map((row) => (
                <tr key={row.criterion} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className="px-[14px] py-[12px] font-semibold text-t1">{row.criterion}</th>
                  <td className="px-[14px] py-[12px] leading-golden text-t1">{row.frp}</td>
                  <td className="px-[14px] py-[12px] leading-golden text-t2">{row.concrete}</td>
                  <td className="px-[14px] py-[12px] leading-golden text-t2">{row.steelWood}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection id="inputs" title="Six inputs for an engineered FRP sound wall" tone="muted">
        <ol className="grid grid-cols-1 gap-[12px] md:grid-cols-2 lg:grid-cols-3">
          {soundBarrierEngineeringInputs.map((input, index) => (
            <li key={input.title} className={card}>
              <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Input {index + 1}</p>
              <h3 className="mt-[6px] text-f18 font-bold text-t1">{input.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{input.body}</p>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection
        id="supply"
        title="FRP sound barrier panel manufacturing and export supply"
        intro="Move from wall geometry to a controlled pultrusion and shipment package. F1 separates project-specific engineering, test evidence and commercial release so the buyer can see exactly what is included before tooling or production begins."
      >
        <div className="grid grid-cols-1 gap-x-[32px] gap-y-[20px] md:grid-cols-3">
          {supplyCapabilities.map((capability) => (
            <article key={capability.title} className="border-t border-border-default pt-[14px]">
              <h3 className="text-f18 font-bold text-t1">{capability.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{capability.body}</p>
            </article>
          ))}
        </div>
        <p className="mt-[20px] text-f14 leading-golden text-t2">
          New sections follow the{" "}
          <Link href="/products/custom-pultruded-profiles" className={link}>custom pultrusion process</Link>; production controls are set out under{" "}
          <Link href="/products/frp-pultrusion-manufacturer-factory-direct" className={link}>factory-direct pultrusion</Link>.
        </p>
      </PageSection>

      <PageSection id="applications" title="Highway, railway, industrial and utility noise barriers" tone="muted">
        <div className="grid grid-cols-1 gap-[12px] md:grid-cols-2 lg:grid-cols-3">
          {soundBarrierApplications.map((application) => (
            <article key={application.title} className={card}>
              <h3 className="text-f18 font-bold text-t1">{application.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{application.body}</p>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection id="sources" title="Public references explain the design method, not F1 product ratings">
        <div className="grid grid-cols-1 items-start gap-[24px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-[48px]">
          <p className="text-f16 leading-golden text-t2">
            The sources below define acoustic concepts, highway design expectations and test scopes. Supplier-specific NRC, STC, dimensions, spans and fire results are intentionally excluded from F1 claims unless the offered configuration is traceable to the same report and authorized for use. The released quotation and submittal control the actual product.
          </p>
          <ul className="divide-y divide-border-default border-y border-border-default">
            {soundBarrierTechnicalSources.map((source) => (
              <li key={source.href}>
                <a href={source.href} target="_blank" rel="noopener noreferrer" className="group flex min-h-[44px] items-center justify-between gap-[12px] py-[10px] text-f14 font-semibold text-t1 transition-colors hover:text-teal-text">
                  {source.label}
                  <span aria-hidden className="text-teal-text">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </PageSection>

      <PageSection id="faq" title="FRP sound barrier questions" tone="muted">
        <FAQList items={faqItems} />
      </PageSection>

      <RelatedLinks
        background="white"
        groups={[
          {
            title: "Related systems",
            links: [
              { href: "/products/fiberglass-plates", label: "Fiberglass plate profiles, candidate hollow sections" },
              { href: "/products/custom-pultruded-profiles", label: "Custom pultruded profiles" },
              { href: "/products/frp-pultrusion-manufacturer-factory-direct", label: "Factory-direct FRP pultrusion" },
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

      <PageSection id="quote" title="Send the noise study and wall alignment" tone="deep">
        <ProductRfq
          product="FRP sound barrier wall panels"
          productPath={pagePath}
          quoteHref={quoteHref}
          items={requestItems}
          intro="A marked plan and elevation are the fastest starting point. We review the wall as a system, then quote the panels, posts and closures against the released drawing."
          advisorPrompt="I need an FRP sound barrier wall: application [highway/railway/industrial/data center], source and operating spectrum [attach study if available], wall alignment/length/height [mm], receiver locations [describe], reflective or absorptive requirement [state], wind and governing code [state], soil/foundation information [state], fire/environment criteria [state], openings and access [describe], finish/color [state], quantity and destination [state]. Build the RFQ checklist and separate laboratory panel ratings from predicted field insertion loss."
        />
      </PageSection>
    </>
  );
}

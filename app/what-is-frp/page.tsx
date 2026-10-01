import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageSection from "@/components/layout/PageSection";
import PageNav from "@/components/layout/PageNav";
import FrpProcessShowcase from "@/components/sections/FrpProcessShowcase";
import { GuideDownloadGate } from "@/components/sections/GuideDownloadGate";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import CoverCard from "@/components/ui/CoverCard";
import { FAQList } from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { coverFor, industryCovers } from "@/lib/covers";
import { prefillForWhatIsFRP } from "@/lib/aiPrefill";

// Last content review; shown in the page header and used as dateModified.
const updatedAt = "2026-09-24";

const pagePath = "/what-is-frp";
const seoTarget = getSeoQueryTarget(pagePath);
const pageTitle = seoTarget.title;
const pageDescription = seoTarget.description;

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const toc = [
  { id: "definition", label: "Definition" },
  { id: "frp-vs-fiberglass", label: "FRP vs fiberglass" },
  { id: "terminology", label: "Terminology" },
  { id: "components", label: "Composition" },
  { id: "pultrusion", label: "Manufacturing" },
  { id: "properties", label: "Properties" },
  { id: "advantages", label: "Advantages" },
  { id: "limitations", label: "Limitations" },
  { id: "standards", label: "Standards" },
  { id: "applications", label: "Applications" },
  { id: "faq", label: "FAQ" },
];

const faqItems = [
  {
    question: "What is glass fiber reinforced plastic (GFRP)?",
    answer:
      "Glass fiber reinforced plastic (GFRP) is a composite made by combining glass fibers with a polymer resin. It is the glass-reinforced subset of FRP and is also called glass fiber reinforced polymer, fiberglass reinforced plastic, GRP, or simply fiberglass. Pultruded GFRP profiles use continuous fibers aligned through a constant cross-section.",
  },
  {
    question: "Is FRP the same as fiberglass?",
    answer:
      "Fiberglass can mean glass fibers or a finished glass-reinforced composite. FRP is the broader family of fiber-reinforced polymers and can use glass, carbon or other fibers. Glass-reinforced FRP is called GFRP or GRP. For a structural fiberglass tube or sheet, compare the resin, reinforcement, dimensions and supporting data rather than assuming the names define a material grade.",
  },
  {
    question: "Are FRP composites considered advanced composites?",
    answer:
      "Yes. Pultruded FRP profiles are classified as advanced composites because they use engineered fiber architectures (unidirectional roving, continuous strand mat, woven fabric) and controlled fiber-volume fractions of 60–70%. Advanced composites are distinguished from short-fiber or filled plastics by their tailored directional properties and structural-grade mechanical performance.",
  },
  {
    question: "Is FRP stronger than steel?",
    answer:
      "Pultruded FRP has tensile strength of 240–400 MPa, comparable to A36 structural steel (400 MPa), but at about one quarter of the weight. Per kilogram, FRP is significantly stronger than steel. However, the elastic modulus of FRP (17–28 GPa) is roughly 1/10 that of steel (200 GPa), so stiffness and deflection usually govern design rather than strength.",
  },
  {
    question: "Does FRP rust or corrode?",
    answer:
      "No. FRP does not rust, pit, or suffer galvanic corrosion. The polymer matrix is inert to most acids, bases, salts, and chlorinated environments. Vinyl ester resin is specified for aggressive chemical or marine environments, and field reports on vinyl ester FRP in saltwater splash zones show little property loss after 30 years or more of service.",
  },
  {
    question: "Is FRP flammable?",
    answer:
      "The standard isophthalic polyester laminate is combustible and is not fire-retardant. Fire-retardant polyester and vinyl ester formulations reach ASTM E84 Class A (flame-spread index 25 or less) with the right additive package, and phenolic resin gives inherently low flame spread, smoke and toxicity, which is why it is specified for rail interiors (EN 45545-2), tunnels and offshore platforms. A fire class belongs to the tested formulation, thickness and installation, so ask for the test report of the formulation quoted rather than relying on a resin name; UL 94, ASTM E84 and EN 13501-1 results are not interchangeable.",
  },
  {
    question: "How long do FRP composites last?",
    answer:
      "Pultruded FRP structures can be designed for 50–100 years when the resin, UV protection, connections and inspection plan are right, and they need no painting or galvanizing. Installations in chemical plants, bridges and marine sites have been in service for 30 years or more.",
  },
  {
    question: "Can FRP be recycled?",
    answer:
      "Thermoset FRP cannot be melted and re-formed like metals. Current end-of-life options include mechanical grinding to filler for cement or concrete (widely commercial), co-processing in cement kilns (energy recovery plus calcium oxide input), and emerging solvolysis/pyrolysis fiber-recovery routes. Non-hazardous landfill is permitted — FRP contains no heavy metals or toxic leachates.",
  },
];

const toolingLeadTime = [
  { step: "Cross-section design & approval", duration: "1–2 weeks" },
  { step: "Steel die manufacturing", duration: "3–6 weeks" },
  { step: "Trial run & sample approval", duration: "1 week" },
  { step: "First production batch", duration: "1–2 weeks" },
];

const decisionPaths = [
  {
    title: "Choose a standard structural shape",
    description:
      "Compare 114 cataloged I-beams, channels, angles, tubes, rods, and flat bars with dimensions, weights, and section data.",
    href: "/products/fiberglass-structural-shapes",
    label: "Browse standard FRP profiles",
  },
  {
    title: "Develop a custom pultrusion",
    description:
      "Take a project-specific cross-section from geometry and resin selection through tooling, sample approval, and repeat production.",
    href: "/products/custom-pultruded-profiles",
    label: "Explore custom pultrusion",
  },
  {
    title: "Price a defined requirement",
    description:
      "Send the section, quantity, service environment, and destination for an engineering review and a scoped export quotation.",
    href: "/contact?source=what-is-frp-decision-path&inquiry_type=rfq",
    label: "Request a project quote",
    cover: { src: "/images/technology/f1-composite-pultrusion-plant-floor.webp", alt: "Finished pultruded profiles on inspection tables in an F1 Composite plant", note: "Production photo" },
  },
] as const;

const applicationGroups = [
  { href: "/industries/infrastructure", title: "Infrastructure and transport", examples: "Pedestrian bridges and deck panels, rail platform canopies, cable trays and pipe supports in utility corridors, and highway noise barriers.", products: [{ href: "/products/frp-sound-barrier-wall", label: "FRP noise barriers" }] },
  { href: "/industries/energy", title: "Energy and utilities", examples: "Overhead distribution crossarms and substation equipment, solar mounting frames, wind-turbine secondary structures, and oil and gas access platforms.", products: [{ href: "/products/frp-solar-mounting-systems", label: "FRP solar profiles" }, { href: "/applications/frp-utility-crossarms", label: "Crossarm application guide" }] },
  { href: "/industries/industrial", title: "Chemical and marine", examples: "Chemical plant walkways and handrails, cooling tower structures, wastewater and desalination gratings, and offshore platforms and floating docks.", products: [{ href: "/products/molded-frp-grating", label: "Molded grating" }] },
  { href: "/industries/construction", title: "Building and construction", examples: "Window profiles for passive-house and low-energy buildings, facade supports and curtain-wall mullions, rooftop platforms, and rebar for concrete in corrosive service.", products: [{ href: "/products/frp-window-frames", label: "Window profiles" }] },
] as const;

export default function WhatIsFrpPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "What Is FRP? Definition, Materials, Properties, and Uses",
    description: pageDescription,
    url: absoluteUrl(pagePath),
    mainEntityOfPage: absoluteUrl(pagePath),
    datePublished: "2026-04-14",
    dateModified: updatedAt,
    inLanguage: "en",
    author: { "@id": "https://www.f1composite.com/#organization" },
    publisher: { "@id": "https://www.f1composite.com/#organization" },
    about: [
      {
        "@type": "Thing",
        name: "Glass Fiber Reinforced Plastic",
        alternateName: [
          "FRP",
          "GFRP",
          "Glass Fiber Reinforced Polymer",
          "Fiberglass Reinforced Plastic",
          "Glass Reinforced Plastic",
        ],
        sameAs: "https://en.wikipedia.org/wiki/Fiber-reinforced_plastic",
      },
      {
        "@type": "Thing",
        name: "Pultrusion",
        sameAs: "https://en.wikipedia.org/wiki/Pultrusion",
      },
      {
        "@type": "Thing",
        name: "Composite material",
        sameAs: "https://en.wikipedia.org/wiki/Composite_material",
      },
    ],
    citation: [
      "ASTM D3917 — Standard Specification for Dimensional Tolerance of Thermosetting Glass-Reinforced Plastic Pultruded Shapes",
      "EN 13706 — Reinforced plastics composites — Specifications for pultruded profiles",
      "ASCE/SEI 74-23 — Pre-Standard for LRFD of Pultruded FRP Structures",
    ],
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <PageHeader
        updated={updatedAt}
        tag="FRP Guide"
        title="What is FRP? Definition, materials, properties, and uses"
        description="FRP means fiber reinforced polymer or plastic. Glass-reinforced FRP is called GFRP or GRP; carbon-reinforced FRP is CFRP. Compare the terminology, composition, properties, applications and design limits before selecting a material."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "What is FRP?" },
        ]}
        actions={{
          primary: {
            label: "Browse FRP Profiles",
            href: "/pultruded-frp-profiles",
          },
          secondary: {
            label: "Request Engineering Review",
            href: "/contact?source=what-is-frp-header&inquiry_type=rfq",
            variant: "secondary",
          },
          note: "Already have dimensions or a drawing? Send the section, quantity, environment, and destination.",
        }}
      />

      <PageNav items={toc} />

      {/* Definition */}
      <PageSection id="definition" title="What is glass fiber reinforced plastic?" tone="white">
        {/* P0: snippet-optimized definition block — targets "frp definition" / "define frp" (pos ~9.5) */}
        <div className="max-w-[820px] rounded-card border-l-4 border-l-teal bg-bg2 p-[20px]">
          <p className="text-f16 leading-golden text-t1">
            <strong>FRP definition:</strong> FRP (fiber-reinforced polymer or
            fiber-reinforced plastic) is a composite material made from
            reinforcing fibers—most commonly glass—embedded in a polymer
            resin. The fibers provide strength and stiffness, while the resin
            binds and protects them. Glass-fiber FRP is also known as GFRP,
            GRP, or fiberglass-reinforced plastic.
          </p>
        </div>
        <p className="mt-[20px] text-f16 leading-golden text-t2">
          <strong className="text-t1">FRP (fiber reinforced polymer)</strong> is
          a structural composite material that combines two constituents: a
          thermoset polymer resin matrix (polyester, vinyl ester, polyurethane,
          phenolic, or epoxy) and a high-performance fiber reinforcement
          (typically E-glass, also called fiberglass). The fibers carry the
          mechanical load; the resin transfers the load between fibers and
          protects them from the environment.
        </p>
        <p className="mt-[12px] text-f16 leading-golden text-t2">
          The resulting fiberglass reinforced polymer is lighter than aluminum,
          stronger per kilogram than steel, immune to rust, electrically
          non-conductive, and thermally insulating. FRP composites are used
          wherever corrosion, weight, electromagnetic transparency, or thermal
          efficiency is critical — from chemical plant platforms and offshore
          grating to{" "}
          <Link
            href="/products/frp-window-frames"
            className="font-semibold text-teal-text hover:text-teal"
          >
            FRP windows and doors
          </Link>{" "}
          for passive-house buildings and pedestrian bridges.
        </p>
        <p className="mt-[12px] text-f16 leading-golden text-t2">
          When the FRP is produced by the{" "}
          <Link
            href="/technology/pultrusion-process"
            className="font-semibold text-teal-text hover:text-teal"
          >
            pultrusion process
          </Link>
          , it is called <strong className="text-t1">pultruded FRP</strong>. The
          full F1 Composite pultruded product range is documented on the{" "}
          <Link
            href="/pultruded-frp-profiles"
            className="font-semibold text-teal-text hover:text-teal"
          >
            pultruded FRP profiles hub
          </Link>
          .
        </p>
      </PageSection>

      {/* Decision paths: route informational readers to the right commercial next step. */}
      <PageSection id="next-step" title="Turn FRP research into a specification" tone="muted" intro="The right next page depends on whether the geometry is standard, custom, or already defined for quotation. Choose the shortest path to the dimensions, engineering input, or commercial response you need.">
        <ul className="grid gap-[12px] md:grid-cols-3">
          {decisionPaths.map((path) => {
            const cover = ("cover" in path ? path.cover : undefined) ?? coverFor(path.href);
            return cover ? (
              <li key={path.href}>
                <CoverCard href={path.href} cover={cover} title={path.title} text={path.description} action={path.label} sizes="(max-width: 767px) 94vw, 390px" />
              </li>
            ) : null;
          })}
        </ul>
      </PageSection>

      <PageSection id="frp-vs-fiberglass" title="FRP vs fiberglass: what is the difference?" tone="white">
        <p className="max-w-[860px] text-f16 leading-golden text-t2"><strong className="text-t1">FRP is the material family; fiberglass describes glass fibers or a glass-reinforced product.</strong> Glass fibers combined with a polymer resin make GFRP, also called GRP. Carbon-fiber reinforced polymer is FRP too, but it is not fiberglass. In a supplier catalog, a fiberglass tube commonly means a finished glass-and-resin composite tube.</p>
        <div className="mt-[24px] grid gap-[12px] md:grid-cols-3">
          {[
            { title: "FRP", text: "Fiber-reinforced polymer (or plastic). The reinforcement and resin must still be specified." },
            { title: "GFRP / GRP", text: "The glass-reinforced part of the FRP family. These names do not set a strength, resin or fire rating." },
            { title: "Fiberglass", text: "May refer to glass fiber itself or a finished composite. Read the product description to identify which." },
          ].map((item) => <div key={item.title} className="rounded-card border border-border-default bg-bg2 p-[20px]"><h3 className="text-f18 font-bold text-t1">{item.title}</h3><p className="mt-[8px] text-f14 leading-golden text-t2">{item.text}</p></div>)}
        </div>
        <h3 className="mt-[32px] text-f18 font-bold text-t1">Buying a fiberglass product?</h3>
        <p className="mt-[8px] max-w-[860px] text-f16 leading-golden text-t2">Match the shape, resin, reinforcement, dimensions and service conditions. A structural tube, solid sheet and pressure pipe need different specifications even when all are described as FRP.</p>
        <ul className="mt-[12px] flex flex-wrap gap-x-[24px] gap-y-[4px] text-f14 font-semibold">
          {[
            { href: "/products/fiberglass-structural-shapes/frp-tube", label: "Fiberglass tubing sizes" },
            { href: "/products/fiberglass-structural-shapes/frp-square-tube", label: "Fiberglass square tube sizes" },
            { href: "/products/fiberglass-sheets", label: "Solid fiberglass sheets" },
          ].map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="inline-flex min-h-[44px] items-center text-teal-text hover:underline">
                {link.label} <span aria-hidden="true" className="ml-[4px]">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </PageSection>

      {/* Terminology */}
      <PageSection id="terminology" title="GRP vs FRP: terminology and regional buying language" tone="muted">
        <div className="max-w-[860px] rounded-card border-l-4 border-l-teal bg-white p-[20px]">
          <p className="text-f16 leading-golden text-t2">
            <strong className="text-t1">Same material family, different labels:</strong>{" "}
            glass fiber reinforced plastic is the glass-reinforced subset of
            FRP. GFRP and GRP identify the same glass-and-resin composite, while
            fiberglass can mean either the reinforcement itself or the finished
            product. &ldquo;Polymer&rdquo; is the more precise matrix term; &ldquo;plastic&rdquo;
            remains common in specifications and search.
          </p>
        </div>
        <div className="mt-[20px] grid gap-[12px] md:grid-cols-3">
          {[
            { title: "United States", text: "Supplier catalogs often lead with fiberglass structural shapes or FRP. In material specifications, GFRP makes the glass reinforcement explicit." },
            { title: "United Kingdom & European suppliers", text: "GRP profiles, GRP grating and glass fibre are common English-language terms. GRP sections and fiberglass structural shapes can describe the same glass-reinforced product family." },
            { title: "Australia & India", text: "FRP and GRP appear together in supplier catalogs. Moulded and molded are spelling variants; neither changes the panel construction or its load rating." },
          ].map((item) => (
            <div key={item.title} className="rounded-card border border-border-default bg-white p-[20px]">
              <h3 className="text-f16 font-bold text-t1">{item.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-[12px] text-f14 leading-golden text-t2">
          These are naming patterns, not separate material grades. For a like-for-like
          quote, match reinforcement, resin, dimensions, load case and test requirements.
          Browse our <Link href="/pultruded-frp-profiles" className="font-semibold text-teal-text underline">FRP and GRP profiles</Link>,{" "}
          <Link href="/products/frp-gratings" className="font-semibold text-teal-text underline">pultruded GRP grating</Link> or{" "}
          <Link href="/products/molded-frp-grating" className="font-semibold text-teal-text underline">moulded GRP grating</Link> for product-specific data.
        </p>
        <p className="mt-[12px] text-f12 leading-golden text-t3">
          Examples of supplier terminology:{" "}
          <a href="https://www.strongwell.com/products/structural-shapes-and-plate/" className="underline">Strongwell (US)</a>,{" "}
          <a href="https://fibrolux.com/en/products/grp-profiles/" className="underline">Fibrolux (Europe)</a>,{" "}
          <a href="https://terrafirmaindustries.com.au/frp-grates-products/" className="underline">Terra Firma (Australia)</a> and{" "}
          <a href="https://satyamindia.net/product/frp-grp-grating" className="underline">Satyam (India)</a>.
        </p>
        <p className="mt-[20px] text-f16 leading-golden text-t2">
          The terminology around fiber composites is regional and often
          overlapping. In engineering practice:
        </p>
        <dl className="mt-[12px] divide-y divide-border-default border-y border-border-default">
          <div className="grid gap-[4px] py-[14px] md:grid-cols-[minmax(0,260px)_minmax(0,1fr)] md:gap-[32px]">
            <dt className="text-f16 font-bold text-t1">FRP</dt>
            <dd className="text-f16 leading-golden text-t2">Fiber Reinforced Polymer. An umbrella term used internationally. Can use glass, carbon, aramid, or basalt fibers.</dd>
          </div>
          <div className="grid gap-[4px] py-[14px] md:grid-cols-[minmax(0,260px)_minmax(0,1fr)] md:gap-[32px]">
            <dt className="text-f16 font-bold text-t1">GRP / GFRP</dt>
            <dd className="text-f16 leading-golden text-t2">Glass Reinforced Plastic / Glass Fiber Reinforced Polymer (or Plastic). Both identify glass reinforcement; neither describes carbon-fiber FRP. GRP is common in UK and European supplier literature, while Australian and Indian suppliers also use FRP and GRP together.</dd>
          </div>
          <div className="grid gap-[4px] py-[14px] md:grid-cols-[minmax(0,260px)_minmax(0,1fr)] md:gap-[32px]">
            <dt className="text-f16 font-bold text-t1">Glass fiber reinforced plastic</dt>
            <dd className="text-f16 leading-golden text-t2">the full form of GFRP in specifications that use &ldquo;plastic&rdquo; for the cured resin matrix. It is also written fiberglass reinforced plastic.</dd>
          </div>
          <div className="grid gap-[4px] py-[14px] md:grid-cols-[minmax(0,260px)_minmax(0,1fr)] md:gap-[32px]">
            <dt className="text-f16 font-bold text-t1">Fiberglass</dt>
            <dd className="text-f16 leading-golden text-t2">Informal North American term. Refers either to the raw E-glass fiber or to the finished glass-FRP composite.</dd>
          </div>
          <div className="grid gap-[4px] py-[14px] md:grid-cols-[minmax(0,260px)_minmax(0,1fr)] md:gap-[32px]">
            <dt className="text-f16 font-bold text-t1">Composites</dt>
            <dd className="text-f16 leading-golden text-t2">Umbrella term for any material combining two or more constituents. In structural use, usually means continuous-fiber FRP.</dd>
          </div>
          <div className="grid gap-[4px] py-[14px] md:grid-cols-[minmax(0,260px)_minmax(0,1fr)] md:gap-[32px]">
            <dt className="text-f16 font-bold text-t1">Advanced composites</dt>
            <dd className="text-f16 leading-golden text-t2">Composites with engineered fiber architectures and controlled fiber fractions (≥ 50% by weight). Pultruded FRP profiles qualify.</dd>
          </div>
          <div className="grid gap-[4px] py-[14px] md:grid-cols-[minmax(0,260px)_minmax(0,1fr)] md:gap-[32px]">
            <dt className="text-f16 font-bold text-t1">Pultruded composites / pultruded profiles</dt>
            <dd className="text-f16 leading-golden text-t2">FRP composites manufactured by the pultrusion process: the focus of F1 Composite.</dd>
          </div>
        </dl>
      </PageSection>

      {/* Components */}
      <PageSection id="components" title="What is inside a pultruded FRP profile?" tone="white">

        <div className="grid gap-[32px] lg:grid-cols-2">
          <div>
            <h3 className="text-f18 font-bold text-t1">Reinforcement (60–70% by weight)</h3>
            <ul className="mt-[12px] space-y-[8px] text-f16 leading-golden text-t2">
              <li>
                <strong className="text-t1">E-glass roving</strong> —
                unidirectional fiber bundles carrying axial load. The dominant
                reinforcement by mass.
              </li>
              <li>
                <strong className="text-t1">Continuous strand mat (CSM)</strong> —
                randomly oriented glass mat that adds transverse strength and
                through-thickness integrity.
              </li>
              <li>
                <strong className="text-t1">Woven roving / biaxial fabric</strong> —
                used in custom profiles requiring balanced in-plane stiffness.
              </li>
              <li>
                <strong className="text-t1">Surfacing veil</strong> — polyester
                or C-glass veil that gives a resin-rich, UV-stable outer
                surface. Typically 0.2–0.4 mm thick.
              </li>
              <li>
                <strong className="text-t1">ECR-glass / carbon / basalt /
                aramid</strong> — optional reinforcements for enhanced corrosion
                resistance, high modulus, or specialty requirements.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-f18 font-bold text-t1">Polymer matrix (30–40% by weight)</h3>
            <ul className="mt-[12px] space-y-[8px] text-f16 leading-golden text-t2">
              <li>
                <strong className="text-t1">Isophthalic polyester</strong> —
                general structural use. Best cost / performance balance.
              </li>
              <li>
                <strong className="text-t1">Vinyl ester</strong> — superior
                chemical, chloride, and hydrolysis resistance. Preferred for
                marine and chemical environments.
              </li>
              <li>
                <strong className="text-t1">Polyurethane (PU)</strong> — 3–5×
                the flexural toughness of polyester; fast cure; used in rail
                interiors and EV battery trays.
              </li>
              <li>
                <strong className="text-t1">Phenolic</strong> — low smoke and
                toxicity in fire; used where rail (EN 45545-2) or building fire
                classes govern, with a report for the specified formulation.
              </li>
              <li>
                <strong className="text-t1">Epoxy</strong> — highest mechanical
                properties; specified when tensile or fatigue requirements
                approach steel equivalents.
              </li>
              <li>
                <strong className="text-t1">Additives</strong> — UV stabilizers,
                flame retardants, pigments, release agents, and catalysts (MEKP
                for polyester; BPO for vinyl ester).
              </li>
            </ul>
          </div>
        </div>
      </PageSection>

      <FrpProcessShowcase tone="muted" />

      {/* Pultrusion Process */}
      <PageSection id="pultrusion" title="How pultruded FRP is made" tone="white">
        <p className="text-f16 leading-golden text-t2">
          Pultrusion is a continuous, automated process that produces
          constant-cross-section FRP profiles. Invented in the 1950s and
          standardized in the 1970s, it is now the dominant manufacturing route
          for structural FRP shapes worldwide.
        </p>

        <ol className="mt-[24px] grid gap-[12px] md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              step: "Creel",
              body: "Thousands of E-glass roving packages are fed from a creel frame, aligned in the longitudinal direction.",
            },
            {
              step: "Resin impregnation",
              body: "Fibers are pulled through an open resin bath or closed injection chamber, fully wetted with liquid thermoset resin.",
            },
            {
              step: "Pre-former",
              body: "Impregnated fibers pass through guide plates that compact the material into the required cross-section geometry.",
            },
            {
              step: "Heated die",
              body: "The compacted fiber/resin bundle enters a heated steel die (typically 120–180 °C) where the resin cures.",
            },
            {
              step: "Pullers",
              body: "Reciprocating or caterpillar pullers draw the cured profile at 0.3–1.5 m/min, providing the continuous 'pulling' action that names the process.",
            },
            {
              step: "Cut-off",
              body: "A synchronized flying saw cuts profiles to length — typically 6 m or 12 m for shipping — and they are stacked for inspection.",
            },
          ].map((item, index) => (
            <li
              key={item.step}
              className="rounded-card border border-border-default bg-bg2 p-[20px] sm:p-[24px]"
            >
              <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Step {index + 1}</p>
              <h3 className="mt-[4px] text-f18 font-bold text-t1">{item.step}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{item.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-[12px] rounded-card border border-border-default bg-bg2 p-[20px] sm:p-[24px]">
          <h3 className="text-f18 font-bold text-t1">Custom die lead time</h3>
          <p className="mt-[8px] text-f16 leading-golden text-t2">
            Creating a new custom profile typically takes 6–10 weeks total:
          </p>
          <ul className="mt-[12px] space-y-[4px] text-f16 text-t2">
            {toolingLeadTime.map((row) => (
              <li key={row.step} className="flex justify-between gap-[20px] border-b border-border-default py-[8px]">
                <span>{row.step}</span>
                <span className="font-medium text-t1">{row.duration}</span>
              </li>
            ))}
          </ul>
        </div>
      </PageSection>

      {/* Properties */}
      <PageSection id="properties" title="Mechanical and physical properties of pultruded FRP" tone="muted">
        <p className="text-f16 leading-golden text-t2">
          Typical values for E-glass / isophthalic-polyester pultruded
          structural profiles at 23 °C. Properties are directional — the table
          below gives longitudinal (L) values unless noted. Vinyl ester and
          polyurethane systems provide 10–25% higher strength.
        </p>

        <div className="relative mt-[24px] overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[560px] border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Property</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Value</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Test standard</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Density", "1.8–2.1 g/cm³", "—"],
                ["Tensile strength (L)", "240–400 MPa", "ASTM D638"],
                ["Tensile modulus (L)", "17–28 GPa", "ASTM D638"],
                ["Flexural strength (L)", "200–350 MPa", "ASTM D790"],
                ["Flexural modulus (L)", "12–20 GPa", "ASTM D790"],
                ["Compressive strength (L)", "200–300 MPa", "ASTM D695"],
                ["Interlaminar shear strength", "20–30 MPa", "ASTM D2344"],
                ["Barcol hardness", "40–55", "ASTM D2583"],
                ["Coefficient of thermal expansion (L)", "8 × 10⁻⁶ / °C", "ASTM E831"],
                ["Thermal conductivity", "0.3 W/m·K", "ASTM C177"],
                ["Dielectric strength", "10–14 kV/mm", "ASTM D149"],
                ["Water absorption (24 h)", "< 0.6%", "ASTM D570"],
                ["Glass fiber content by weight", "60–70%", "ASTM D2584 (burn-off)"],
                ["Dimensional tolerance", "±0.25 mm typical", "EN 13706 / ASTM D3917"],
              ].map(([prop, val, std]) => (
                <tr key={prop} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className="px-[14px] py-[10px] font-semibold text-t1">{prop}</th>
                  <td className="px-[14px] py-[10px] font-medium text-t1">{val}</td>
                  <td className="px-[14px] py-[10px] text-t2">{std}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      {/* Advantages */}
      <PageSection id="advantages" title="Why engineers specify FRP over steel and aluminum" tone="white">
        <div className="grid gap-[12px] md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "75% lighter than steel",
              body: "Density 1.8–2.1 g/cm³ vs 7.85 g/cm³ for steel. Enables manual handling, smaller cranes, and lower freight cost.",
            },
            {
              title: "Does not rust",
              body: "No rust, galvanic corrosion or chloride pitting. The resin is matched to the chemicals in marine, chemical and de-icing-salt service.",
            },
            {
              title: "Electrically non-conductive",
              body: "Dielectric strength 10–14 kV/mm. Used for electrical substations, rail insulators, and RF-transparent structures.",
            },
            {
              title: "Thermally insulating",
              body: "Conductivity 0.3 W/m·K — about 1/170 of steel and 1/530 of aluminum. Enables passive-house-grade window systems.",
            },
            {
              title: "Less corrosion maintenance",
              body: "No painting or galvanizing for corrosion protection, which is where FRP gains its lifecycle-cost advantage. Outdoor surfaces rely on a veil and UV-stable resin, and are inspected like any structure.",
            },
            {
              title: "Easy fabrication",
              body: "Cut with carbide blade, drill with diamond bit, connect with stainless bolts or adhesive. No hot work permits, no welding.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-card border border-border-default bg-bg2 p-[20px] sm:p-[24px]"
            >
              <h3 className="text-f18 font-bold text-t1">{item.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{item.body}</p>
            </article>
          ))}
        </div>
      </PageSection>

      {/* Limitations */}
      <PageSection id="limitations" title="When FRP is not the right choice" tone="muted">
        <p className="text-f16 leading-golden text-t2">
          FRP is not a universal substitute for steel. Engineering considerations
          that frequently disqualify or complicate a pultruded FRP specification:
        </p>
        <ul className="mt-[20px] space-y-[12px] text-f16 leading-golden text-t2">
          <li>
            <strong className="text-t1">Low elastic modulus.</strong> FRP
            stiffness is ~1/10 of steel. For long-span primary beams, deflection
            often governs. Hybrid FRP–concrete or FRP–steel designs can be the
            right answer for spans beyond 10–12 m.
          </li>
          <li>
            <strong className="text-t1">Creep under sustained load.</strong>
            Polyester-matrix FRP creeps under long-term high stress; design
            allowables typically apply a 0.25–0.35 reduction factor for
            permanent loads.
          </li>
          <li>
            <strong className="text-t1">No welding.</strong> Thermoset FRP
            cannot be welded, heated, or bent after manufacture. All
            connections are bolted or adhesive bonded.
          </li>
          <li>
            <strong className="text-t1">Temperature limits.</strong> Isophthalic
            polyester has a heat deflection temperature (HDT) of 90–100 °C.
            Vinyl ester 105–120 °C. Phenolic 140–160 °C. For higher service
            temperatures, specialty resins or alternative materials are needed.
          </li>
          <li>
            <strong className="text-t1">Upfront cost.</strong> Per meter, FRP is
            50–100% more expensive than carbon steel. Lifecycle economics
            favor FRP in corrosive environments, but marginal-environment
            projects may not justify the premium.
          </li>
          <li>
            <strong className="text-t1">UV degradation of resin-starved
            surfaces.</strong> Always specify a surfacing veil and a pigmented
            or UV-stabilized resin for outdoor service, and ask for weathering
            data for the resin system you are buying.
          </li>
        </ul>
      </PageSection>

      {/* Standards */}
      <PageSection id="standards" title="FRP composites: key standards and certification" tone="white">
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[560px] border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Standard</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Scope</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["ISO 9001:2015", "Quality management system standard. Ask any supplier for the certificate holder, number and scope; F1's certificate is available on request."],
                ["EN 13706-1/2/3", "European pultruded profile standard. Defines structural grades E17 and E23, test methods, and classification."],
                ["ASTM D3917", "Standard specification for dimensional tolerance of thermosetting glass-reinforced plastic pultruded shapes."],
                ["ASTM D638 / D790 / D695 / D2344", "Test methods for tensile, flexural, compressive, and interlaminar shear properties."],
                ["ASCE/SEI 74-23", "Pre-Standard for LRFD Design of Pultruded FRP Structures (United States)."],
                ["EUROCOMP Design Code", "Structural design of polymer composites (Europe)."],
                ["ASTM E84 / BS 476", "Fire: surface burning characteristics and fire tests on building materials."],
                ["EN 45545-2", "Fire: fire protection on railway rolling stock."],
                ["AS 4586", "Slip resistance classification for pedestrian surface materials (gratings)."],
                ["PHI (Passive House Institute)", "Thermal performance certification for fenestration systems."],
                ["DNV / Lloyd's Register", "Marine certification for offshore structural FRP."],
              ].map(([std, scope]) => (
                <tr key={std} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className="whitespace-nowrap px-[14px] py-[10px] font-semibold text-t1">{std}</th>
                  <td className="px-[14px] py-[10px] leading-golden text-t2">{scope}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
              {/* Soft-gated download: the PDF is public (also linked from /resources/downloads);
            the e-mail creates an inquiry through the shared /api/contact pipeline. */}
        <div className="mt-[24px] max-w-[640px]">
          <GuideDownloadGate
            fileHref="/downloads/f1composite-frp-profile-design-manual-2026-rev-b.pdf"
            fileLabel="FRP Profile Design Manual (DOC-PF-2026-EN Rev. B)"
            fileDescription="47-page engineering reference: the E23 laminate beside the EN 13706 minimums, section properties of all 114 catalog sizes, allowable-load tables to the published design basis, application guides, durability by resin formulation, fabrication and inspection."
            source="what-is-frp-guide-download"
          />
        </div>
</PageSection>

      {/* Applications */}
      <PageSection id="applications" title="Where advanced FRP composites are specified" tone="muted">
        <ul className="grid grid-cols-1 gap-[12px] sm:grid-cols-2 lg:grid-cols-4 lg:gap-[16px]">
          {applicationGroups.map((group) => (
            <li key={group.href}>
              <CoverCard
                href={group.href}
                cover={industryCovers[group.href]}
                title={group.title}
                text={group.examples}
                action="Explore the applications"
                sizes="(max-width: 639px) 94vw, (max-width: 1023px) 46vw, 290px"
                footer={
                  <ul className="flex flex-wrap gap-x-[16px] gap-y-[2px] border-t border-border-default px-[18px] py-[8px] sm:px-[20px]">
                    {group.products.map((product) => (
                      <li key={product.href}>
                        <Link href={product.href} className="inline-flex min-h-[36px] items-center text-f14 font-semibold text-t2 underline decoration-border-default underline-offset-4 hover:text-teal-text">
                          {product.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                }
              />
            </li>
          ))}
        </ul>

        <p className="mt-[24px] max-w-[860px] text-f16 leading-golden text-t2">
          For a deeper overview by industry, see the{" "}
          <Link href="/industries" className="font-semibold text-teal-text hover:text-teal">
            industries
          </Link>{" "}
          section. For live case studies including before/after weight, cost,
          and delivered lead-time data, see our{" "}
          <Link href="/case-studies" className="font-semibold text-teal-text hover:text-teal">
            case studies
          </Link>
          .
        </p>
      </PageSection>

      <PageSection id="faq" title="Frequently asked questions" tone="white">
        <FAQList items={faqItems} />
      </PageSection>

      <RelatedLinks background="bg2"
        groups={[
          {
            title: "Keep reading",
            links: [
              { href: "/resources/blog/fiberglass-reinforced-plastic", label: "Fiberglass reinforced plastic guide" },
              { href: "/resources/blog/frp-material", label: "FRP material selection guide" },
              { href: "/resources/blog/frp-meaning", label: "FRP full form and meaning" },
              { href: "/resources/glossary", label: "FRP and pultrusion glossary" },
            ],
          },
          {
            title: "Technology",
            links: [
              { href: "/technology/pultrusion-process", label: "The pultrusion process explained" },
              { href: "/technology/frp-vs-traditional-materials", label: "FRP vs steel and aluminum" },
              { href: "/resources/technical-data", label: "Technical data" },
              { href: "/resources/design-guides", label: "Design guides" },
            ],
          },
          {
            title: "Products and tools",
            links: [
              { href: "/pultruded-frp-profiles", label: "All pultruded FRP profiles" },
              { href: "/products/custom-pultruded-profiles", label: "Custom pultrusion" },
              { href: "/frp-profile-calculator", label: "FRP profile calculator" },
            ],
          },
        ]}
      />

      <InnerCTA title="Talk to our FRP engineers about your project" advisorPrompt={prefillForWhatIsFRP()} />
    </>
  );
}

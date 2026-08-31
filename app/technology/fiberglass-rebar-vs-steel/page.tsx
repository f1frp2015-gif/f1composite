import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import FAQ from "@/components/ui/FAQ";
import SectionTag from "@/components/ui/SectionTag";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";

const pagePath = "/technology/fiberglass-rebar-vs-steel";
const seoTarget = getSeoQueryTarget(pagePath);
const pageTitle = seoTarget.title;
const pageDescription = seoTarget.description;
const publishedAt = "2026-08-31";
const updatedAt = "2026-08-31";
const heroImage =
  "/images/products/frp-rebar/f1-frp-rebar-sand-coated-helical.webp";

const sources = {
  kentucky: "https://rosap.ntl.bts.gov/view/dot/20392",
  mndot: "https://rosap.ntl.bts.gov/view/dot/67149",
  durability: "https://rosap.ntl.bts.gov/view/dot/61605",
  durabilityDiscussion:
    "https://doi.org/10.1061/%28ASCE%29CC.1943-5614.0001217",
  fhwaCorrosion:
    "https://www.fhwa.dot.gov/publications/research/infrastructure/bridge/07039/chap1.cfm",
  fhwaCte:
    "https://www.fhwa.dot.gov/publications/research/infrastructure/pavements/pccp/05081/chapt4.cfm",
  miami:
    "https://www.concrete.org/publications/internationalconcreteabstractsportal.aspx?id=51720157&m=details",
  ufc: "https://www.wbdg.org/FFC/DOD/UFC/ufc_3_301_01_2023_c5.pdf",
  fdot: "https://www.fdot.gov/structures/innovation/frp.shtm",
  aci440:
    "https://www.concrete.org/store/productdetail.aspx?ItemID=44011U22&Language=English&Units=US_Units",
  astmD7957: "https://store.astm.org/d7957_d7957m-25.html",
  astmD7205: "https://store.astm.org/d7205_d7205m-26.html",
  astmA615: "https://store.astm.org/a0615_a0615m-26.html",
} as const;

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: `${pagePath}/opengraph-image`,
});

interface SourceLinkProps {
  href: string;
  children: ReactNode;
}

function SourceLink({ href, children }: SourceLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-semibold text-teal-text underline decoration-teal/30 underline-offset-4 hover:decoration-teal"
    >
      {children} ↗
    </a>
  );
}

interface MetricBarProps {
  label: string;
  value: number;
  display: string;
  max: number;
  tone?: "gfrp" | "steel" | "neutral";
  note?: string;
}

function MetricBar({
  label,
  value,
  display,
  max,
  tone = "neutral",
  note,
}: MetricBarProps) {
  const toneClass =
    tone === "gfrp"
      ? "bg-teal"
      : tone === "steel"
        ? "bg-slate-600"
        : "bg-amber-500";

  return (
    <div>
      <div className="flex items-end justify-between gap-[13px]">
        <div>
          <p className="text-f13 font-bold text-t1">{label}</p>
          {note ? <p className="mt-[2px] text-f11 text-t3">{note}</p> : null}
        </div>
        <p className="shrink-0 text-f15 font-extrabold tabular-nums text-t1">
          {display}
        </p>
      </div>
      <div className="mt-[8px] h-[12px] overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${toneClass}`}
          style={{ width: `${Math.max(4, (value / max) * 100)}%` }}
        />
      </div>
    </div>
  );
}

const comparisonRows = [
  {
    topic: "Corrosion mechanism",
    gfrp:
      "Nonmetallic; does not undergo the electrochemical rusting that expands and spalls concrete. Resin, glass, bond, moisture, alkali and temperature still require qualification.",
    steel:
      "Normally passive in alkaline concrete. Chlorides or carbonation can disrupt passivity; corrosion products can crack and spall the cover.",
    source: "FHWA corrosion primer + ASTM D7957",
    href: sources.fhwaCorrosion,
  },
  {
    topic: "Specific gravity",
    gfrp: "1.92 in one controlled bridge-research test program.",
    steel: "7.85 in the same report — equal-volume GFRP mass is 24.5% of steel (derived).",
    source: "Kentucky / FHWA, Table 3.1",
    href: sources.kentucky,
  },
  {
    topic: "Tensile result",
    gfrp: "612 MPa mean ultimate strength, n=4 tested bars.",
    steel: "487 MPa mean yield and 653 MPa mean ultimate strength, n=3 tested bars.",
    source: "Kentucky / FHWA, Tables 2.3–2.4",
    href: sources.kentucky,
  },
  {
    topic: "Elastic modulus",
    gfrp: "40 GPa mean / adopted value in the same comparative test program.",
    steel: "196 GPa adopted value — 4.9× the tested GFRP stiffness.",
    source: "Kentucky / FHWA, Table 2.5",
    href: sources.kentucky,
  },
  {
    topic: "Stress–strain behavior",
    gfrp: "Approximately linear-elastic to rupture; no steel-like yield plateau.",
    steel: "Yields before ultimate failure, providing plastic deformation and warning.",
    source: "MnDOT Ch. 6 + DoD UFC Appendix G",
    href: sources.mndot,
  },
  {
    topic: "Longitudinal thermal expansion",
    gfrp: "9.18 µε/°C average for the tested No. 4 GFRP bar.",
    steel: "11.88 µε/°C average for the tested No. 4 Grade 60 bar.",
    source: "FHWA-HRT-05-081, 3 chamber runs",
    href: sources.fhwaCte,
  },
  {
    topic: "Electrical / magnetic response",
    gfrp: "Electrically insulating and nonmagnetic — useful near MRI, rail, power and sensing equipment.",
    steel: "Electrically conductive and ferromagnetic.",
    source: "FDOT owner guidance",
    href: sources.fdot,
  },
  {
    topic: "Detailing and fabrication",
    gfrp: "Factory-formed bends; field bending is prohibited in current DoD guidance. Serviceability often controls.",
    steel: "Familiar ductile detailing, field fabrication and mechanical-splice ecosystem, subject to the governing code.",
    source: "UFC 3-301-01, Appendix G",
    href: sources.ufc,
  },
] as const;

const fieldEvidence = [
  {
    label: "Controlled material test",
    title: "University of Kentucky / FHWA",
    metric: "4 GFRP + 3 steel bars",
    body:
      "A direct laboratory comparison measured tensile strength, yield behavior, modulus and specific gravity. It is unusually useful because both materials were tested inside one program; it is still one 2000-era product set, not a universal catalog value.",
    href: sources.kentucky,
  },
  {
    label: "Side-by-side bridge decks",
    title: "MnDOT / Iowa State",
    metric: "~4 years monitored",
    body:
      "Adjacent 2018 bridge decks — one GFRP, one epoxy-coated steel — both behaved as designed. GFRP strains were slightly higher but not notably so, and crack patterns were generally similar. The authors call four years a snapshot, not a 75-year validation.",
    href: sources.mndot,
  },
  {
    label: "In-service extraction",
    title: "USDOT UTC / Missouri S&T",
    metric: "11 bridges · 15–20 years",
    body:
      "Concrete cores and extracted bars were examined by microscopy, chemistry and mechanical testing. Results were encouraging, but the report's 100-year strength projection is modeled from limited field evidence and has been debated — it is not a completed 100-year exposure test.",
    href: sources.durability,
    challengeHref: sources.durabilityDiscussion,
  },
] as const;

const standards = [
  {
    code: "ACI CODE-440.11-22",
    title: "Structural concrete reinforced with GFRP bars",
    note:
      "Design and construction code covering strength, serviceability, development, splices, durability, inspection and elevated-temperature considerations.",
    href: sources.aci440,
  },
  {
    code: "ASTM D7957/D7957M-25",
    title: "Solid round GFRP bars for concrete reinforcement",
    note:
      "Product specification for qualification and lot acceptance, including physical properties, tensile force/modulus/strain, shear, bond and bent-bar requirements.",
    href: sources.astmD7957,
  },
  {
    code: "ASTM D7205/D7205M-26",
    title: "Tensile testing of FRP composite bars",
    note:
      "Determines short-term static tensile force, strength, strain, modulus and stress–strain response; it does not establish sustained-load or fatigue performance.",
    href: sources.astmD7205,
  },
  {
    code: "ASTM A615/A615M-26",
    title: "Deformed and plain carbon-steel bars",
    note:
      "The current ASTM product specification for carbon-steel reinforcement. Project design requirements still come from the applicable concrete code.",
    href: sources.astmA615,
  },
] as const;

const faqItems = [
  {
    question: "Is fiberglass rebar stronger than steel rebar?",
    answer:
      "It can have higher ultimate tensile strength per unit area, but that does not make it a universally stronger replacement. GFRP has roughly one quarter of steel's elastic modulus and no yield plateau. Compare ultimate-to-ultimate values, then design for serviceability, bond, environmental reduction factors and the governing code — never compare GFRP ultimate strength only with steel yield strength.",
  },
  {
    question: "Can GFRP rebar replace steel one-for-one?",
    answer:
      "No. Bar area, spacing, cover, development length, lap details, crack-width control and deflection must be recalculated. Lower stiffness frequently means that serviceability controls even when ultimate tensile capacity is high. Use ACI CODE-440.11 and project-qualified ASTM D7957 bars where those documents are applicable.",
  },
  {
    question: "Does GFRP rebar eliminate concrete cracking?",
    answer:
      "No. It removes the steel rust-expansion mechanism, but concrete still cracks from shrinkage, temperature, restraint and loading. In the MnDOT side-by-side bridge study, the GFRP and epoxy-coated-steel decks developed generally similar surface and full-depth crack patterns during the first four years.",
  },
  {
    question: "Is fiberglass rebar always cheaper than steel?",
    answer:
      "No. The MnDOT case had a higher initial deck cost for GFRP ($42 versus $36 per square foot), but lower modeled present value when the assumed service life was long enough. Those numbers depend on discount rate, repair timing, deck type, labor and local material prices; they are a sensitivity study, not a market quote.",
  },
  {
    question: "How long does GFRP rebar last in concrete?",
    answer:
      "The strongest U.S. field program cited here examined bars from 11 bridges after 15–20 years and found encouraging condition. That is not the same as 75–100 years of field validation. Longer horizons rely on accelerated testing, environmental reduction factors and models, so project exposure, resin system, glass, cure, sustained stress and test documentation matter.",
  },
  {
    question: "Can GFRP rebar be bent or welded on site?",
    answer:
      "GFRP cannot be welded, and current DoD guidance prohibits field bending. Bends and stirrups should be factory formed and qualified, then protected from damage in handling. Field cutting may be permitted under the project specification using appropriate tools and dust controls.",
  },
];

export default function FiberglassRebarVsSteelPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${absoluteUrl(pagePath)}#article`,
    headline: pageTitle,
    description: pageDescription,
    url: absoluteUrl(pagePath),
    image: absoluteUrl(`${pagePath}/opengraph-image`),
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: { "@id": "https://www.f1composite.com/#organization" },
    publisher: { "@id": "https://www.f1composite.com/#organization" },
    mainEntityOfPage: absoluteUrl(pagePath),
    about: [
      { "@type": "Thing", name: "Glass fiber-reinforced polymer rebar" },
      { "@type": "Thing", name: "Steel reinforcing bar" },
      { "@type": "Thing", name: "Concrete reinforcement design" },
      { "@type": "Thing", name: "Bridge deck durability" },
    ],
    citation: Object.values(sources),
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <PageHeader
        tag="Evidence-Based Comparison"
        title="Fiberglass Rebar vs Steel"
        description="Laboratory results, bridge monitoring, extracted-bar durability evidence and lifecycle-cost scenarios — with the design tradeoffs that a simple strength claim leaves out."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Technology", href: "/technology" },
          { label: "Fiberglass Rebar vs Steel" },
        ]}
      />

      <section className="bg-white py-[72px] md:py-[89px]">
        <div className="mx-auto grid max-w-[1280px] gap-[42px] px-[34px] lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <SectionTag>The engineering answer</SectionTag>
            <h2 className="mt-[21px] max-w-[760px] text-[clamp(27px,3.4vw,43px)] font-extrabold leading-[1.1] tracking-[-0.025em] text-t1">
              High tensile capacity and no rust — but only about one-fifth of steel&apos;s stiffness
            </h2>
            <p className="mt-[21px] max-w-[800px] text-f16 leading-golden text-t2">
              GFRP rebar is compelling when chloride corrosion, magnetic interference or handling weight drives lifecycle cost. Steel remains the benchmark where ductility, high stiffness, fire resistance, field fabrication or a familiar design-and-repair ecosystem controls. The materials are <strong className="text-t1">not one-for-one substitutes</strong>.
            </p>
            <p className="mt-[13px] max-w-[800px] text-f14 leading-golden text-t3">
              Every number below is tied to a named public agency, university or accredited laboratory. Research values are benchmarks, not guaranteed F1 Composite product properties; project procurement still requires grade- and lot-specific qualification data.
            </p>
            <div className="mt-[29px] flex flex-wrap gap-[13px]">
              <Link
                href="/products/frp-rebar"
                className="rounded-[8px] bg-teal px-[24px] py-[13px] text-f13 font-bold uppercase tracking-wide text-white transition-colors hover:bg-teal-text"
              >
                Explore FRP rebar →
              </Link>
              <a
                href="#lab-data"
                className="rounded-[8px] border border-border-default bg-white px-[24px] py-[13px] text-f13 font-bold uppercase tracking-wide text-t1 transition-colors hover:border-teal hover:text-teal-text"
              >
                See the test data ↓
              </a>
            </div>
          </div>
          <figure className="overflow-hidden rounded-[13px] border border-border-default bg-bg2 shadow-[0_24px_70px_rgba(15,35,45,0.10)]">
            <div className="relative aspect-[4/3]">
              <Image
                src={heroImage}
                alt="Three sand-coated helically wrapped fiberglass rebar samples"
                fill
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="object-cover"
                preload
              />
            </div>
            <figcaption className="border-t border-border-default bg-white px-[21px] py-[16px] text-f12 leading-relaxed text-t3">
              Sand-coated helical GFRP bars. Surface profile, resin, fiber fraction, diameter and cure all influence qualification results.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="border-y border-border-default bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="grid gap-[13px] sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-[8px] border border-border-default bg-white p-[21px]">
              <p className="text-[34px] font-extrabold tracking-[-0.03em] text-teal-text">24.5%</p>
              <p className="mt-[5px] text-f13 font-bold text-t1">of steel&apos;s equal-volume mass</p>
              <p className="mt-[8px] text-f12 leading-relaxed text-t3">
                Derived from 1.92 vs 7.85 specific gravity in the Kentucky/FHWA program.
              </p>
            </article>
            <article className="rounded-[8px] border border-border-default bg-white p-[21px]">
              <p className="text-[34px] font-extrabold tracking-[-0.03em] text-teal-text">40 vs 196</p>
              <p className="mt-[5px] text-f13 font-bold text-t1">GPa elastic modulus</p>
              <p className="mt-[8px] text-f12 leading-relaxed text-t3">
                Mean/adopted GFRP vs steel values in the same controlled test program.
              </p>
            </article>
            <article className="rounded-[8px] border border-border-default bg-white p-[21px]">
              <p className="text-[34px] font-extrabold tracking-[-0.03em] text-teal-text">11 bridges</p>
              <p className="mt-[5px] text-f13 font-bold text-t1">15–20 years in service</p>
              <p className="mt-[8px] text-f12 leading-relaxed text-t3">
                USDOT-funded core and extracted-bar durability investigation.
              </p>
            </article>
            <article className="rounded-[8px] border border-border-default bg-white p-[21px]">
              <p className="text-[34px] font-extrabold tracking-[-0.03em] text-teal-text">2 decks</p>
              <p className="mt-[5px] text-f13 font-bold text-t1">GFRP vs epoxy-coated steel</p>
              <p className="mt-[8px] text-f12 leading-relaxed text-t3">
                Adjacent MnDOT bridges monitored side by side for roughly four years.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="lab-data" className="scroll-mt-[110px] bg-white py-[72px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Measured laboratory data</SectionTag>
          <div className="mt-[21px] grid gap-[21px] lg:grid-cols-2">
            <div>
              <h2 className="max-w-[760px] text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-t1">
                One test program, two materials, three different meanings of “strength”
              </h2>
              <p className="mt-[13px] max-w-[760px] text-f15 leading-golden text-t2">
                University of Kentucky researchers tested four 15 mm-diameter GFRP bars and three 16 mm-diameter epoxy-coated steel bars. GFRP reached a 612 MPa mean ultimate strength; steel yielded at 487 MPa and ultimately reached 653 MPa. The comparison shows why <strong className="text-t1">GFRP ultimate versus steel yield</strong> is a misleading marketing shortcut.
              </p>
            </div>
            <div className="rounded-[8px] border border-teal-border bg-teal-bg p-[21px] text-f13 leading-golden text-t2">
              <p className="font-bold text-t1">Scope before headline</p>
              <p className="mt-[8px]">
                These are measured means for different bar sizes and one legacy product set — valuable for explaining mechanics, not for sizing a current project. See <SourceLink href={sources.kentucky}>Kentucky / FHWA report, Tables 2.3–2.5</SourceLink>.
              </p>
            </div>
          </div>

          <div className="mt-[42px] grid gap-[21px] lg:grid-cols-2">
            <figure className="rounded-[13px] border border-border-default bg-bg2 p-[24px] md:p-[29px]">
              <div className="flex items-start justify-between gap-[21px]">
                <div>
                  <p className="text-f12 font-bold uppercase tracking-[0.14em] text-teal-text">Tensile stress</p>
                  <h3 className="mt-[8px] text-f19 font-extrabold text-t1">Mean measured results</h3>
                </div>
                <span className="rounded-full border border-border-default bg-white px-[11px] py-[6px] text-f11 font-bold text-t3">MPa</span>
              </div>
              <div className="mt-[29px] space-y-[21px]">
                <MetricBar label="GFRP ultimate" value={612} display="612" max={700} tone="gfrp" note="n=4" />
                <MetricBar label="Steel yield" value={487} display="487" max={700} tone="steel" note="n=3" />
                <MetricBar label="Steel ultimate" value={653} display="653" max={700} tone="steel" note="n=3" />
              </div>
              <figcaption className="mt-[24px] border-t border-border-default pt-[16px] text-f12 leading-relaxed text-t3">
                Redrawn from tabulated results; bar length indicates reported stress, not design resistance.
              </figcaption>
            </figure>

            <figure className="rounded-[13px] border border-border-default bg-bg2 p-[24px] md:p-[29px]">
              <div className="flex items-start justify-between gap-[21px]">
                <div>
                  <p className="text-f12 font-bold uppercase tracking-[0.14em] text-teal-text">Elastic modulus</p>
                  <h3 className="mt-[8px] text-f19 font-extrabold text-t1">Stiffness drives serviceability</h3>
                </div>
                <span className="rounded-full border border-border-default bg-white px-[11px] py-[6px] text-f11 font-bold text-t3">GPa</span>
              </div>
              <div className="mt-[29px] space-y-[21px]">
                <MetricBar label="GFRP" value={40} display="40" max={210} tone="gfrp" />
                <MetricBar label="Steel" value={196} display="196" max={210} tone="steel" />
              </div>
              <div className="mt-[29px] rounded-[8px] bg-white p-[16px]">
                <p className="text-f13 font-bold text-t1">Steel was 4.9× stiffer in this test.</p>
                <p className="mt-[5px] text-f12 leading-relaxed text-t3">
                  Lower GFRP stiffness affects deflection, crack width, bar spacing and post-crack member response even when tensile capacity is adequate.
                </p>
              </div>
              <figcaption className="mt-[24px] border-t border-border-default pt-[16px] text-f12 leading-relaxed text-t3">
                Kentucky/FHWA Table 2.5: 40.0 GPa GFRP and 196 GPa steel adopted for analysis.
              </figcaption>
            </figure>
          </div>

          <div className="mt-[21px] grid gap-[21px] lg:grid-cols-[1.1fr_0.9fr]">
            <figure className="rounded-[13px] border border-border-default bg-deep p-[24px] text-white md:p-[29px]">
              <p className="text-f12 font-bold uppercase tracking-[0.14em] text-teal-300">Failure behavior · schematic</p>
              <h3 className="mt-[8px] text-f19 font-extrabold">The curve shape changes the design philosophy</h3>
              <div className="mt-[29px] grid gap-[21px] sm:grid-cols-2">
                <div className="rounded-[8px] border border-white/15 bg-white/5 p-[18px]">
                  <div role="img" className="relative h-[155px] border-b border-l border-white/30" aria-label="Schematic linear stress strain response for GFRP">
                    <div className="absolute bottom-[8px] left-[11px] h-[3px] w-[78%] origin-left -rotate-[42deg] rounded-full bg-teal-300" />
                    <span className="absolute right-[5px] top-[18px] h-[10px] w-[10px] rounded-full bg-teal-300" />
                    <span className="absolute right-[4px] top-[38px] text-f10 font-bold uppercase tracking-wide text-teal-300">rupture</span>
                  </div>
                  <p className="mt-[13px] text-f14 font-bold">GFRP: elastic → rupture</p>
                  <p className="mt-[5px] text-f12 leading-relaxed text-white/60">No steel-like yield plateau or plastic hinge behavior.</p>
                </div>
                <div className="rounded-[8px] border border-white/15 bg-white/5 p-[18px]">
                  <div role="img" className="relative h-[155px] border-b border-l border-white/30" aria-label="Schematic yielding stress strain response for steel">
                    <div className="absolute bottom-[8px] left-[11px] h-[3px] w-[47%] origin-left -rotate-[54deg] rounded-full bg-white/80" />
                    <div className="absolute left-[33%] top-[42px] h-[3px] w-[50%] rounded-full bg-white/80" />
                    <span className="absolute left-[34%] top-[22px] text-f10 font-bold uppercase tracking-wide text-white/70">yield</span>
                  </div>
                  <p className="mt-[13px] text-f14 font-bold">Steel: elastic → yield → plastic strain</p>
                  <p className="mt-[5px] text-f12 leading-relaxed text-white/60">Ductile deformation provides redistribution and warning.</p>
                </div>
              </div>
              <figcaption className="mt-[21px] text-f11 leading-relaxed text-white/45">
                Qualitative schematic only; axes and slopes are not to scale. MnDOT project bars rose nearly linearly to sudden fiber rupture.
              </figcaption>
            </figure>

            <article className="rounded-[13px] border border-border-default bg-white p-[24px] md:p-[29px]">
              <p className="text-f12 font-bold uppercase tracking-[0.14em] text-teal-text">Independent test-unit check</p>
              <h3 className="mt-[8px] text-f19 font-extrabold text-t1">University of Miami laboratory</h3>
              <p className="mt-[13px] text-f14 leading-golden text-t2">
                Its ISO/IEC 17025 quality-system, IAS-accredited, FDOT-qualified lab tested three 2019 production lots of No. 8 GFRP bar for a seawall project.
              </p>
              <dl className="mt-[21px] grid grid-cols-2 gap-[13px]">
                <div className="rounded-[8px] bg-bg2 p-[16px]">
                  <dt className="text-f11 font-bold uppercase tracking-wide text-t3">Mean guaranteed load</dt>
                  <dd className="mt-[5px] text-f24 font-extrabold text-t1">103.1 kip</dd>
                  <p className="mt-[2px] text-f11 text-t3">458.6 kN</p>
                </div>
                <div className="rounded-[8px] bg-bg2 p-[16px]">
                  <dt className="text-f11 font-bold uppercase tracking-wide text-t3">Mean modulus</dt>
                  <dd className="mt-[5px] text-f24 font-extrabold text-t1">54.8 GPa</dd>
                  <p className="mt-[2px] text-f11 text-t3">3 production lots</p>
                </div>
              </dl>
              <p className="mt-[21px] text-f12 leading-relaxed text-t3">
                Table 1 values are product-, size- and project-specific. <SourceLink href={sources.miami}>ACI / Concrete International record</SourceLink>.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[72px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Property-by-property comparison</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-t1">
            What changes when the reinforcement is nonmetallic
          </h2>
          <p className="mt-[13px] max-w-[900px] text-f15 leading-golden text-t2">
            Values are intentionally attached to their test scope. A design value must come from the governing code and the qualified bar, not from a generic comparison table.
          </p>
          <div className="mt-[34px] overflow-x-auto rounded-[8px] border border-border-default bg-white">
            <table className="w-full min-w-[980px] border-collapse text-left">
              <thead className="bg-deep text-white">
                <tr>
                  <th className="px-[18px] py-[15px] text-f12 font-bold uppercase tracking-wide">Topic</th>
                  <th className="px-[18px] py-[15px] text-f12 font-bold uppercase tracking-wide">GFRP rebar</th>
                  <th className="px-[18px] py-[15px] text-f12 font-bold uppercase tracking-wide">Steel rebar</th>
                  <th className="px-[18px] py-[15px] text-f12 font-bold uppercase tracking-wide">Evidence</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.topic} className="border-t border-border-default align-top">
                    <th className="w-[16%] px-[18px] py-[16px] text-f13 font-bold text-t1">{row.topic}</th>
                    <td className="w-[29%] bg-teal/5 px-[18px] py-[16px] text-f13 leading-golden text-t2">{row.gfrp}</td>
                    <td className="w-[29%] px-[18px] py-[16px] text-f13 leading-golden text-t2">{row.steel}</td>
                    <td className="w-[26%] px-[18px] py-[16px] text-f12 leading-relaxed text-t3">
                      <SourceLink href={row.href}>{row.source}</SourceLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white py-[72px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Durability mechanism</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-t1">
            “Corrosion-resistant” is precise; “indestructible” is not
          </h2>
          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-2">
            <article className="rounded-[13px] border border-rose-200 bg-rose-50 p-[24px] md:p-[29px]">
              <div className="flex items-center justify-between gap-[13px]">
                <h3 className="text-f19 font-extrabold text-t1">Steel rust-expansion pathway</h3>
                <span className="rounded-full bg-rose-100 px-[11px] py-[6px] text-f11 font-bold uppercase tracking-wide text-rose-700">electrochemical</span>
              </div>
              <ol className="mt-[24px] grid gap-[10px] sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                {["Chloride ingress", "Passive film breaks", "Rust expands", "Crack · delaminate · spall"].map((step, index) => (
                  <li key={step} className="relative rounded-[8px] border border-rose-200 bg-white p-[14px]">
                    <span className="text-f11 font-extrabold text-rose-600">0{index + 1}</span>
                    <p className="mt-[5px] text-f12 font-bold leading-relaxed text-t1">{step}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-[21px] text-f13 leading-golden text-t2">
                FHWA explains that chlorides can disrupt steel&apos;s passive film; corrosion products then generate pressure that cracks and spalls the concrete cover. Coatings and concrete quality can delay the chain, but do not change its underlying mechanism. <SourceLink href={sources.fhwaCorrosion}>FHWA corrosion fundamentals</SourceLink>.
              </p>
            </article>

            <article className="rounded-[13px] border border-teal-border bg-teal-bg p-[24px] md:p-[29px]">
              <div className="flex items-center justify-between gap-[13px]">
                <h3 className="text-f19 font-extrabold text-t1">GFRP durability controls</h3>
                <span className="rounded-full bg-white px-[11px] py-[6px] text-f11 font-bold uppercase tracking-wide text-teal-text">no rust cycle</span>
              </div>
              <div className="mt-[24px] grid grid-cols-2 gap-[10px] sm:grid-cols-3">
                {["Glass + sizing", "Resin chemistry", "Cure / Tg", "Alkali + moisture", "Sustained stress", "Temperature + fire"].map((control) => (
                  <div key={control} className="rounded-[8px] border border-teal-border bg-white p-[14px] text-f12 font-bold text-t1">
                    {control}
                  </div>
                ))}
              </div>
              <p className="mt-[21px] text-f13 leading-golden text-t2">
                GFRP cannot rust, but glass–resin interfaces and bond can still change under hot, wet, alkaline or sustained-load exposure. That is why ASTM D7957 qualification, environmental reduction factors and lot traceability matter. <SourceLink href={sources.astmD7957}>ASTM D7957/D7957M-25 scope</SourceLink>.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-deep py-[72px] text-white md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <p className="text-f12 font-bold uppercase tracking-[0.14em] text-teal-300">Field evidence, not accelerated-test advertising</p>
          <h2 className="mt-[13px] max-w-[900px] text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.15] tracking-[-0.02em]">
            What agencies actually observed in bridges
          </h2>
          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-3">
            {fieldEvidence.map((item) => (
              <article key={item.title} className="rounded-[13px] border border-white/15 bg-white/5 p-[24px]">
                <p className="text-f11 font-bold uppercase tracking-[0.14em] text-teal-300">{item.label}</p>
                <h3 className="mt-[8px] text-f18 font-extrabold">{item.title}</h3>
                <p className="mt-[16px] text-f24 font-extrabold text-white">{item.metric}</p>
                <p className="mt-[13px] text-f13 leading-golden text-white/65">{item.body}</p>
                <a href={item.href} target="_blank" rel="noreferrer" className="mt-[18px] inline-block text-f12 font-bold text-teal-300 underline decoration-white/20 underline-offset-4 hover:decoration-teal-300">
                  Open the public report ↗
                </a>
                {"challengeHref" in item ? (
                  <a href={item.challengeHref} target="_blank" rel="noreferrer" className="mt-[8px] block text-f12 font-bold text-amber-200 underline decoration-white/20 underline-offset-4 hover:decoration-amber-200">
                    Read the published ASCE discussion ↗
                  </a>
                ) : null}
              </article>
            ))}
          </div>
          <div className="mt-[21px] rounded-[8px] border border-amber-300/30 bg-amber-300/10 p-[21px] text-f13 leading-golden text-white/75">
            <strong className="text-amber-200">Evidence ceiling:</strong> the longest field exposure in the cited multi-bridge U.S. program is about 20 years. Claims of 75–100 years remain model-based, using accelerated tests, design reduction factors and assumed exposure — not a completed century of service.
          </div>
        </div>
      </section>

      <section className="bg-white py-[72px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Lifecycle-cost sensitivity</SectionTag>
          <div className="mt-[21px] grid gap-[34px] lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <h2 className="text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-t1">
                Higher first cost can still produce lower present value
              </h2>
              <p className="mt-[13px] text-f15 leading-golden text-t2">
                MnDOT&apos;s 100-year bridge-deck analysis used an initial installed deck cost of <strong className="text-t1">$36/ft² for steel</strong> and <strong className="text-t1">$42/ft² for GFRP</strong>. Its result changes with assumed deck life and whether an interim GFRP repair is included.
              </p>
              <p className="mt-[13px] text-f13 leading-golden text-t3">
                This is a 2023 project scenario using agency cost inputs, a 1.22% discount rate and specific repair assumptions. It is neither current market pricing nor a guaranteed savings model. <SourceLink href={sources.mndot}>MnDOT Report 2023-13, Chapter 7</SourceLink>.
              </p>
            </div>
            <figure className="rounded-[13px] border border-border-default bg-bg2 p-[24px] md:p-[29px]">
              <div className="flex items-start justify-between gap-[21px]">
                <div>
                  <p className="text-f12 font-bold uppercase tracking-[0.14em] text-teal-text">100-year present value</p>
                  <h3 className="mt-[8px] text-f19 font-extrabold text-t1">Same assumed 65-year deck life</h3>
                </div>
                <span className="rounded-full border border-border-default bg-white px-[11px] py-[6px] text-f11 font-bold text-t3">$/ft²</span>
              </div>
              <div className="mt-[29px] space-y-[21px]">
                <MetricBar label="Epoxy-coated steel" value={87.14} display="$87.14" max={95} tone="steel" note="65-year life scenario" />
                <MetricBar label="GFRP · no interim repair" value={67.22} display="$67.22" max={95} tone="gfrp" note="65-year life scenario" />
                <MetricBar label="GFRP · repair at year 30" value={85.21} display="$85.21" max={95} tone="neutral" note="65-year life scenario" />
              </div>
              <figcaption className="mt-[24px] border-t border-border-default pt-[16px] text-f12 leading-relaxed text-t3">
                Redrawn from Tables 7.3–7.5. The chart&apos;s main lesson is sensitivity: lifecycle advantage depends on realized service life and repair history.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[72px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Selection guide</SectionTag>
          <h2 className="mt-[21px] max-w-[880px] text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-t1">
            Choose the controlling requirement, not the longest advantages list
          </h2>
          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-2">
            <article className="rounded-[13px] border border-teal-border bg-white p-[24px] md:p-[29px]">
              <p className="text-f11 font-bold uppercase tracking-[0.14em] text-teal-text">GFRP often earns preference</p>
              <h3 className="mt-[8px] text-f19 font-extrabold text-t1">When corrosion or nonmetallic behavior controls</h3>
              <ul className="mt-[21px] space-y-[12px] text-f14 leading-golden text-t2">
                <li><strong className="text-t1">Chloride exposure:</strong> bridge decks, seawalls, marine works and deicing-salt zones.</li>
                <li><strong className="text-t1">Electromagnetic neutrality:</strong> MRI rooms, laboratories, rail systems and sensor-sensitive facilities.</li>
                <li><strong className="text-t1">Electrical insulation:</strong> substations and high-voltage or stray-current environments.</li>
                <li><strong className="text-t1">Handling constraints:</strong> remote sites, congested decks and work where reduced lifting demand has real value.</li>
                <li><strong className="text-t1">Lifecycle planning:</strong> owners who can justify higher first cost with credible exposure and repair assumptions.</li>
              </ul>
            </article>
            <article className="rounded-[13px] border border-slate-300 bg-white p-[24px] md:p-[29px]">
              <p className="text-f11 font-bold uppercase tracking-[0.14em] text-slate-500">Steel often earns preference</p>
              <h3 className="mt-[8px] text-f19 font-extrabold text-t1">When stiffness, ductility or heat controls</h3>
              <ul className="mt-[21px] space-y-[12px] text-f14 leading-golden text-t2">
                <li><strong className="text-t1">Crack and deflection control:</strong> steel&apos;s much higher modulus simplifies serviceability.</li>
                <li><strong className="text-t1">Ductile systems:</strong> plastic hinges, moment redistribution and seismic-force-resisting behavior.</li>
                <li><strong className="text-t1">Fire-rated construction:</strong> current DoD guidance restricts GFRP where a fire rating or comparable life-safety collapse risk applies.</li>
                <li><strong className="text-t1">Site changes:</strong> steel offers familiar field bending and mechanical-splice options; welding requires a weldable grade, qualified procedure and project approval.</li>
                <li><strong className="text-t1">Mature repair practice:</strong> locating, demolition around bars and repair methods are widely understood.</li>
              </ul>
            </article>
          </div>
          <p className="mt-[21px] text-f12 leading-relaxed text-t3">
            Fire and seismic statements above identify current U.S. DoD restrictions, not a universal worldwide ban. Always apply the jurisdiction&apos;s governing code and owner specification. <SourceLink href={sources.ufc}>UFC 3-301-01, Appendix G</SourceLink>.
          </p>
        </div>
      </section>

      <section id="standards" className="scroll-mt-[110px] bg-white py-[72px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Specification basis</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-t1">
            Require the standard, edition, test method and production lot
          </h2>
          <p className="mt-[13px] max-w-[900px] text-f15 leading-golden text-t2">
            “Fiberglass rebar” is a material family, not a certified design value. A defensible submittal ties the exact bar size, surface and bend geometry to qualification and lot-acceptance evidence.
          </p>
          <div className="mt-[34px] grid gap-[13px] md:grid-cols-2">
            {standards.map((standard) => (
              <a key={standard.code} href={standard.href} target="_blank" rel="noreferrer" className="group rounded-[8px] border border-border-default bg-bg2 p-[21px] transition-colors hover:border-teal">
                <p className="text-f12 font-bold uppercase tracking-wide text-teal-text">{standard.code}</p>
                <h3 className="mt-[8px] text-f16 font-bold text-t1 group-hover:text-teal-text">{standard.title} ↗</h3>
                <p className="mt-[8px] text-f13 leading-golden text-t2">{standard.note}</p>
              </a>
            ))}
          </div>
          <div className="mt-[21px] rounded-[8px] border border-teal-border bg-teal-bg p-[21px]">
            <p className="text-f14 font-bold text-t1">Minimum decision-grade submittal</p>
            <p className="mt-[8px] text-f13 leading-golden text-t2">
              Bar identification and measured area · guaranteed tensile force by size · elastic modulus and rupture strain · bond and transverse shear · resin / glass declaration · cure and glass-transition temperature · environmental durability data · bend qualification · lot traceability · handling and inspection plan.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <FAQ items={faqItems} />
        </div>
      </section>

      <RelatedLinks
        background="white"
        groups={[
          {
            title: "Rebar product",
            links: [
              { href: "/products/frp-rebar", label: "FRP rebar sizes, surfaces and RFQ data" },
              { href: "/products/fiberglass-structural-shapes/frp-rod", label: "Pultruded fiberglass round rod" },
              { href: "/products/custom-pultruded-profiles", label: "Custom pultruded profiles" },
            ],
          },
          {
            title: "Application markets",
            links: [
              { href: "/industries/infrastructure", label: "Bridges and infrastructure" },
              { href: "/industries/marine", label: "Marine and coastal structures" },
              { href: "/industries/construction", label: "Construction applications" },
              { href: "/industries/energy", label: "Energy and electrical facilities" },
            ],
          },
          {
            title: "Engineering resources",
            links: [
              { href: "/technology/frp-vs-traditional-materials", label: "FRP vs traditional materials" },
              { href: "/technology/quality-testing", label: "FRP quality testing" },
              { href: "/resources/technical-data", label: "Technical data" },
              { href: "/contact", label: "Submit a bar schedule" },
            ],
          },
        ]}
      />

      <InnerCTA title="Need a project-specific GFRP rebar comparison?" />
    </>
  );
}

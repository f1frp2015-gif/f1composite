import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ToolSection from "@/components/layout/ToolSection";
import RelatedLinks from "@/components/sections/RelatedLinks";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import EmbedCode from "@/components/tools/EmbedCode";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import PassiveHouseWizard from "./PassiveHouseWizard";

const pagePath = "/ai/passive-house";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "Tools", item: absoluteUrl("/tools") },
    { "@type": "ListItem", position: 3, name: "Passive House window selector" },
  ],
};

export const metadata: Metadata = buildPageMetadata({
  title: "AI Passive House Window Selector — PHI Window Tool",
  description:
    "Free AI tool for Passive House windows: match climate, target U-value, and opening type to PHI-certified FRP frame series, calculators, and case studies.",
  path: pagePath,
});

const steps = [
  {
    title: "Define the thermal context",
    text: "Choose the PHI climate class and the target whole-window U-value, so the recommendation starts from the right performance envelope rather than a generic frame claim.",
  },
  {
    title: "Add the opening configuration",
    text: "Select casement, tilt-turn, sliding or fixed facade. The configuration narrows the practical range across the 65, 70, 80, 90 and 140 series.",
  },
  {
    title: "Review the evidence and next steps",
    text: "The answer gives a series recommendation, the certification context, a comparable project and a path to U-value calculation, drawings, fabrication review and quotation.",
  },
];

const inputs = [
  { title: "Climate and certification route", text: "Identify PHI, PHIUS, the local energy code or project-specific modeling, and the required climate or performance class, instead of treating the programs as interchangeable." },
  { title: "Reference size and opening type", text: "Document the tested or calculated window dimensions, sash configuration, frame fraction, mullions, transoms, reinforcement, hardware and allowable operating size." },
  { title: "Glazing and spacer", text: "Record Ug, pane build, coatings, gas fill, spacer linear transmittance, edge conditions and the supplier data used in the whole-window calculation." },
  { title: "Installation interface", text: "Review the rough opening, anchors, support blocks, membranes, insulation continuity, sill drainage and the linear thermal bridge between frame and wall." },
  { title: "Non-thermal performance", text: "Confirm structural wind pressure, water penetration, air leakage, acoustic target, security, fire, durability, condensation, hardware cycling and local fenestration standards." },
  { title: "Supply and fabrication model", text: "State whether the project needs finished windows or pultruded lineals, who fabricates and glazes, quantity, colors, quality plan, certification labels, packing and destination." },
];

const link = "font-semibold text-teal-text hover:underline";

export default function PassiveHousePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AI Passive House Window Selector — F1 Composite",
    url: absoluteUrl("/ai/passive-house"),
    description:
      "Free AI-powered passive house fenestration selector — matches PHI climate class, target U-value, and building typology to F1 Composite PHI-certified FRP window series. No login required.",
    applicationCategory: "EngineeringApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: "en",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: { "@id": "https://www.f1composite.com/#organization" },
  };

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={breadcrumbSchema} />
      <PageHeader
        tag="Tools"
        title="Passive House window selector"
        description="Answer four questions on climate, target U-value, opening type and project size. The engineering assistant matches the project to an F1 FRP window series, explains the role of PHI Component-ID 2491wi03 and points to the calculation and project references."
        facts={[
          { label: "PHI component", value: "2491wi03" },
          { label: "Efficiency class", value: "phB" },
          { label: "Climate zone", value: "Cool-temperate" },
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "Passive House selector" }]}
      />

      <PageNav
        items={[
          { id: "tool", label: "Selector" },
          { id: "how-it-works", label: "How it works" },
          { id: "why-frp", label: "Why FRP" },
          { id: "method", label: "Method" },
          { id: "inputs", label: "Inputs to verify" },
          { id: "limits", label: "Limits" },
          { id: "embed", label: "Embed" },
        ]}
      />

      <ToolSection label="Passive House window selector">
        <PassiveHouseWizard />
      </ToolSection>

      <PageSection
        id="how-it-works"
        title="How the selector works"
        intro="A frame series cannot be chosen from the U-value alone. The climate class changes the interior surface temperature requirement; the opening type changes reinforcement, hardware, air seals and practical sash sizes; the glazing and spacer decide how much of the whole-window target is left for the frame. The selector turns four project inputs into a structured question for the engineering assistant, whose answer names the likely series and the evidence to confirm before specification."
        tone="muted"
      >
        <ol className="grid gap-[12px] md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
              <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Step {index + 1}</p>
              <h3 className="mt-[4px] text-f18 font-bold text-t1">{step.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{step.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-[20px] max-w-[820px] text-f16 leading-golden text-t2">
          It organizes early inputs before a detailed EN ISO 10077 calculation or a project-specific review, for architects, facade
          consultants, window fabricators, energy modelers and procurement teams comparing frame depths and certification evidence
          at concept or tender stage.
        </p>
      </PageSection>

      <PageSection id="why-frp" title="Why FRP instead of thermally broken aluminum" tone="white">
        <ul className="grid gap-[12px] sm:grid-cols-2">
          <li className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
            <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Thermal bridging</p>
            <p className="mt-[8px] text-f14 leading-golden text-t2">
              An FRP frame has no metal path through it. Pultruded GFRP conducts about 0.3 W/m·K, against about 52 for steel and
              160 for aluminum, so there is no thermal break insert to rely on.
            </p>
          </li>
          <li className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
            <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">PHI component reference</p>
            <p className="mt-[8px] text-f14 leading-golden text-t2">
              PHI 2491wi03 covers the stated 90-series configuration at efficiency class phB in the cool-temperate zone. For a project
              in a harsher climate, see{" "}
              <Link href="/case-studies/qinling-station-antarctic-passive-windows" className={link}>Qinling Station in the Antarctic Ross Sea</Link>.
            </p>
          </li>
          <li className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
            <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Color and finish</p>
            <p className="mt-[8px] text-f14 leading-golden text-t2">
              Through-colored profiles carry the pigment in the resin, so there is no applied paint layer to chip in coastal or
              high-altitude exposure. Coated finishes are specified separately.
            </p>
          </li>
          <li className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
            <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Coastal exposure</p>
            <p className="mt-[8px] text-f14 leading-golden text-t2">
              FRP does not corrode in salt air the way steel and aluminum parts do. See the{" "}
              <Link href="/case-studies/yancheng-talent-apartment-fenestration" className={link}>Yancheng Talent Apartment</Link>{" "}
              project on the Jiangsu coast.
            </p>
          </li>
        </ul>
      </PageSection>

      <PageSection id="method" title="Selection method and technical references" tone="muted">
        <div className="max-w-[820px] space-y-[16px] text-f16 leading-golden text-t2">
          <p>
            The selector uses climate class, opening type, target U-value and project scale as screening inputs. It does not
            calculate a certified whole-window value by itself. Whole-window performance depends on the frame U-value, glazing
            U-value, spacer linear transmittance, frame and glass areas and the exact test or reference dimensions; check those terms
            with the EN ISO 10077-1 method and confirm them for the proposed glass build, spacer, sash, hardware and installation
            interface.
          </p>
          <p>
            PHI Component-ID 2491wi03 supports the certified 90-series configuration; it does not certify every project size or
            glazing combination. Use the certificate and published data as evidence for the matching build, and document any
            variation through the project&rsquo;s energy model, window schedule, supplier calculation and certification process.{" "}
            <a href="/downloads/phi-certificate-gfrp-90-series-2491wi03.pdf" target="_blank" rel="noopener noreferrer" className={link}>
              PHI certificate (PDF)
            </a>
          </p>
        </div>
      </PageSection>

      <PageSection
        id="inputs"
        title="Inputs to verify before accepting a series"
        intro="The selector can only be as specific as the project information it is given. Before a series goes on the window schedule, confirm these inputs and record the source of each value, so the architect, energy modeler, fabricator and supplier work from the same basis."
        tone="white"
      >
        <ul className="grid gap-[12px] sm:grid-cols-2 lg:grid-cols-3">
          {inputs.map((item) => (
            <li key={item.title} className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
              <h3 className="text-f18 font-bold text-t1">{item.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{item.text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-[24px] max-w-[820px] space-y-[16px] text-f16 leading-golden text-t2">
          <p>
            While these inputs are open, keep the recommendation conditional. A useful concept-stage answer says the 90 series is the
            likely baseline, subject to an exact Uw calculation, an opening-size check, the installation detail and a review of the
            certificate scope. That is more defensible than presenting one nominal frame value as the performance of every finished
            window.
          </p>
          <p>
            Compare the first candidate with the published 65, 70, 80, 90 and 140 series rather than treating it as the only option.
            Request section drawings, frame and sash dimensions, reinforcement limits, glazing range, hardware compatibility,
            drainage details, finishes and the certificate pages that support the proposed build. Run at least one representative
            window through the <Link href="/technology/frp-u-value-calculator" className={link}>U-value calculator</Link>, then
            repeat the check for unusually small, large, subdivided or operable units, because the frame fraction and edge length
            change the result. Record the accepted configuration in the window schedule so later substitutions are reviewed against
            the same basis.
          </p>
        </div>
      </PageSection>

      <PageSection id="limits" title="What the selector can and cannot decide" tone="muted">
        <div className="max-w-[820px] space-y-[16px] text-f16 leading-golden text-t2">
          <p>
            The selector can narrow the series range, explain why climate and opening type matter, locate the relevant certification
            and case-study evidence and prepare the questions for a supplier review. It cannot replace a certified U-value
            calculation, structural and hardware verification, condensation analysis, airtightness detailing, a local code review or
            approval by the project&rsquo;s responsible professional.
          </p>
          <p>
            Treat the output as an auditable selection brief: verify every stated input, keep the calculation record, confirm the
            exact frame and glazing build, and request the drawings, certificate scope, test reports, lead time, packing and
            commercial terms that apply to the project.
          </p>
        </div>
      </PageSection>

      <PageSection id="embed" title="Embed the selector" tone="white">
        <EmbedCode
          toolName="AI Passive House Window Selector"
          embedPath="/ai/passive-house/embed"
          canonicalPath="/ai/passive-house"
          height={760}
          attribution="F1 Composite — Pultruded FRP Window Frames Manufacturer"
        />
      </PageSection>

      <RelatedLinks
        background="bg2"
        groups={[
          { title: "Calculate", links: [
            { href: "/technology/frp-u-value-calculator", label: "Window U-value calculator" },
            { href: "/resources/blog/en-iso-10077-window-u-value-calculation", label: "How the whole-window U-value is calculated" },
            { href: "/resources/blog/passive-house-window-u-value-requirements", label: "Passive House U-value requirements" },
          ] },
          { title: "FRP windows", links: [
            { href: "/products/frp-window-frames", label: "FRP window frames" },
            { href: "/technology/polyurethane-pultrusion-windows", label: "GFRP-PU window technology" },
            { href: "/resources/blog/frp-fenestration-passivhaus-certification", label: "How FRP frames achieve Passivhaus certification" },
          ] },
          { title: "Markets", links: [
            { href: "/regions/frp-passive-house-windows-canada", label: "Passive house windows: Canada" },
            { href: "/regions/frp-passive-house-windows-germany", label: "Passive house windows: Germany" },
            { href: "/regions/frp-pultrusion-supplier-usa", label: "Pultruded FRP for US projects" },
          ] },
        ]}
      />
      <InnerCTA
        title="Send the window schedule for a series recommendation"
        quoteHref="/contact?source=tool-passive-house&inquiry_type=rfq"
        text="Send the climate, target U-value, window types and sizes, quantities and whether you need finished units or profiles."
      />
    </>
  );
}

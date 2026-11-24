import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import KeyFacts from "@/components/sections/KeyFacts";
import RelatedLinks from "@/components/sections/RelatedLinks";
import { ClipFigure } from "@/components/sections/GratingClipGuide";
import ProductRfq from "@/components/products/ProductRfq";
import GratingClipEstimator from "@/components/tools/GratingClipEstimator";
import FAQDisclosure from "@/components/ui/FAQDisclosure";
import Figure from "@/components/ui/Figure";
import JsonLd from "@/components/seo/JsonLd";
import {
  GRATING_CLIP_DXF_BY_FAMILY,
  GRATING_CLIP_DXF_HREF,
  GRATING_CLIP_DXF_NAME,
  GRATING_CLIP_MATERIAL,
  gratingClipInstallationPrinciples,
  gratingClipLayoutDisclaimer,
  gratingClipNamingNote,
  gratingClipTypicalStartingLayout,
  gratingClips,
} from "@/content/data/gratingClips";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { buildRfqHref } from "@/lib/rfq";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pagePath = "/products/frp-grating-clips";
const seoTarget = getSeoQueryTarget(pagePath);
const LAST_UPDATED = "2026-11-24";
const heroImage = "/images/products/molded-frp-grating/grating-clips-hardware-reference.webp";
const heroAlt = "Metal hold-down clips and connection hardware for fiberglass grating";

export const metadata: Metadata = buildPageMetadata({
  title: seoTarget.title,
  description: seoTarget.description,
  path: pagePath,
  image: `${pagePath}/opengraph-image`,
});

const link = "font-semibold text-teal-text underline underline-offset-4 hover:text-teal";
const cell = "px-[12px] py-[10px] align-top";

/** Names buyers search for, mapped to the F1 definition. Names vary by manufacturer; geometry decides. */
const alsoCalled: Record<string, string> = {
  M: "Saddle clip, M-clip hold-down",
  C: "C-clip, panel-to-panel or end-panel connector",
  J: "J-clip, J-hook flange clamp, no-drill clip",
  T: "T-clip for pultruded bearing bars",
};

const supportFixing: Record<string, string> = {
  M: "Fastened to the support as shown on the approved drawing",
  C: "None: joins panel edges only",
  J: "Hooks under the support flange; no drilling of the support",
  T: "Fastened to the support frame for the F1 pultruded series",
};

const keyFacts = [
  { label: "What they do", value: "Grating clips hold FRP grating panels down to their supports, and C connectors keep adjacent molded panels aligned. They stop panels shifting, lifting or rattling; they do not carry the walkway load." },
  { label: "Clip types", value: "F1 lists four 316 stainless steel clips: M hold-down (saddle clip), C panel connector, J support-hook clamp and T pultruded-grating clip. All F1 clips are stainless steel; galvanized clips are not supplied." },
  { label: "Molded grating", value: "M or J clips hold molded panels to the supports; C connectors join panel edges between supports." },
  { label: "Pultruded grating", value: "M, J or T clips hold pultruded I-bar and T-bar panels; T clips fit the F1 pultruded bearing-bar series only." },
  { label: "Starting layout", value: "At least 2 hold-downs on each support line and 4 per panel, no more than 1200 mm / 4 ft apart along a support, with 38 mm / 1.5 in minimum bearing at supports." },
  { label: "CAD", value: "Free DXF details for the M/C/J molded kit, the M/J/T pultruded kit and the combined M/C/J/T set, without login." },
];

const mistakes = [
  { title: "Treating a C connector as a hold-down", body: "A C connector only joins molded-panel edges. Every panel still needs its own support and panel-to-support hold-downs." },
  { title: "Ordering by letter across brands", body: "M, C, J and T are not standard names. A clip from another range may not seat on the selected mesh or bearing bar." },
  { title: "Using steel bar-grating clips on FRP", body: "Clips for steel bar grating are sized to steel bearing bars and bar spacing. Check the seat against the FRP mesh or bearing-bar profile before ordering." },
  { title: "Forgetting field cuts", body: "Cutouts, penetrations and trimmed edges create new unsupported edges. Review the hold-down layout again after the cut plan is fixed." },
];

const faqItems = [
  {
    question: "What are grating clips?",
    answer:
      "Grating clips are small fixings that hold grating panels to the supporting steel or FRP frame and, for molded grating, join adjacent panel edges. They keep panels from shifting, lifting or vibrating. The grating itself, its supports and the span carry the load.",
  },
  {
    question: "What is a saddle clip for grating?",
    answer:
      "A saddle clip, often called an M clip, sits across two adjacent bars of the grating and is fastened down to the support below. In the F1 range it is the M hold-down clip, made in 316 stainless steel, for molded and pultruded FRP grating.",
  },
  {
    question: "How many grating clips do I need per panel?",
    answer:
      "As a starting point, at least two hold-downs on each support line and four per panel, no more than 1200 mm (4 ft) apart along a support. Add clips at cutouts and cut edges. The estimator on this page applies these values; the approved project drawing sets the final quantity.",
  },
  {
    question: "Can I fix FRP grating without drilling the supporting steel?",
    answer:
      "Yes, where the support has a suitable flange. The J support-hook clamp pairs a lower hook under the flange with an upper clip and bolt, so the support frame is not drilled. The hook must match the flange thickness and the grating opening.",
  },
  {
    question: "Are fiberglass grating clips stainless steel?",
    answer: `F1 lists its M, C, J and T clips in ${GRATING_CLIP_MATERIAL}. Name the chemicals, chlorides and temperature at the site so the fixing material can be reviewed together with the grating resin.`,
  },
  {
    question: "Do you supply galvanized grating clips?",
    answer: `No. F1 supplies grating clips in ${GRATING_CLIP_MATERIAL} only. An FRP platform is usually chosen for corrosion resistance, and a stainless fixing keeps the hold-down from becoming the first part to corrode. If a specification names galvanized or carbon-steel clips, send it with the site exposure and we will review the fixing material against it.`,
  },
  {
    question: "Do molded and pultruded grating use the same clips?",
    answer:
      "Partly. M and J clips are defined for both families, C connectors for molded panels only, and T clips for the F1 pultruded bearing-bar series only. Choose the clip from the grating family, depth, bar or mesh geometry and support detail.",
  },
  {
    question: "What spacing should grating clips have?",
    answer:
      "Use no more than 1200 mm (4 ft) between hold-downs along a support as a starting value, and place C connectors about every 600–900 mm (2–3 ft) along a molded panel joint. Project loads, vibration and wind uplift can require closer spacing.",
  },
];

export default function GratingClipsPage() {
  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "Fiberglass grating clips",
          description: seoTarget.description,
          path: pagePath,
          image: heroImage,
          imageAlt: heroAlt,
          category: "FRP grating fixings and hold-down clips",
          material: [GRATING_CLIP_MATERIAL],
          productLine: "F1-GRID",
          datePublished: LAST_UPDATED,
          dateModified: LAST_UPDATED,
        })}
      />
      <PageHeader
        tag="Grating Clips"
        line={{ name: "F1-GRID", label: "Clips" }}
        updated={LAST_UPDATED}
        title="Fiberglass grating clips: M, C, J and T hold-downs"
        description="Choose hold-down clips and panel connectors for molded and pultruded FRP grating, estimate a starting quantity per panel and download the DXF details. F1 clip kits are 316 stainless steel."
        facts={[
          { label: "Clip types", value: String(gratingClips.length) },
          { label: "Material", value: "316SS" },
          { label: "Max spacing", value: "1200 mm / 4 ft" },
          { label: "CAD", value: "3 DXF files" },
        ]}
        actions={{
          primary: { label: "Quote a clip kit", href: buildRfqHref({ source: "product-header", product: "FRP grating clips", productPath: pagePath }) },
          secondary: { label: "Estimate quantity", href: "#estimator", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <Figure number={1} title="Grating hold-down hardware" note="Reference photo" bleed>
            <div className="relative aspect-[3/2] bg-white">
              <Image src={heroImage} alt={heroAlt} fill sizes="(max-width: 1023px) 94vw, 44vw" className="object-contain" preload />
            </div>
          </Figure>
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Grating", href: "/products/grating" },
          { label: "Grating Clips" },
        ]}
      />
      <PageNav
        items={[
          { id: "key-facts", label: "Key facts" },
          { id: "types", label: "Clip types" },
          { id: "compatibility", label: "Compatibility" },
          { id: "estimator", label: "How many clips" },
          { id: "installation", label: "Installation" },
          { id: "cad", label: "DXF" },
          { id: "faq", label: "FAQ" },
          { id: "quote", label: "Quote" },
        ]}
      />

      <KeyFacts
        title="Fiberglass grating clips: key facts"
        tone="muted"
        summary="Fiberglass grating clips fasten FRP grating panels to their supports and join molded panel edges. F1 Composite supplies four 316 stainless steel clip types matched to its molded and pultruded grating series, with DXF details and a starting layout for each panel."
        facts={keyFacts}
      />

      <PageSection id="types" title="Types of grating clips" intro="Typical installation diagrams, not to scale. They explain fit and load path, not fabrication dimensions.">
        <p className="max-w-[860px] rounded-control border border-teal-border bg-teal-bg px-[14px] py-[10px] text-f14 leading-golden text-t2">{gratingClipNamingNote}</p>
        <ul className="mt-[24px] grid gap-[16px] md:grid-cols-2">
          {gratingClips.map((clip) => (
            <li key={clip.code} className="flex flex-col overflow-hidden rounded-card border border-border-default bg-white">
              <div className="flex flex-wrap items-start justify-between gap-[10px] border-b border-border-default bg-bg2 px-[20px] py-[14px]">
                <div>
                  <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{alsoCalled[clip.code]}</p>
                  <h3 className="mt-[4px] text-f18 font-bold text-t1">{clip.name}</h3>
                </div>
                <span className="rounded-tag border border-teal-border bg-white px-[8px] py-[3px] font-mono text-f12 text-teal-text">{clip.sku}</span>
              </div>
              <div className="px-[20px] pt-[16px]">
                <div className="rounded-card bg-bg2 p-[10px]">
                  <ClipFigure code={clip.code} alt={clip.figureAlt} />
                </div>
              </div>
              <div className="px-[20px] pb-[20px] pt-[12px] text-f14 leading-golden text-t2">
                <p>{clip.purpose}</p>
                <p className="mt-[10px]"><strong className="text-t1">Install: </strong>{clip.installation}</p>
                <p className="mt-[10px] rounded-control border border-warn-border bg-warn-bg px-[12px] py-[8px]"><strong className="text-t1">Boundary: </strong>{clip.caution}</p>
              </div>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="compatibility" title="Which clip fits which grating" tone="muted">
        <div className="overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[760px] border-collapse text-left text-f14 leading-golden">
            <caption className="sr-only">Grating clip compatibility with molded and pultruded FRP grating</caption>
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                {["Clip", "Connects", "Molded grating", "Pultruded grating", "Support fixing", "Material"].map((heading) => (
                  <th key={heading} scope="col" className={`${cell} whitespace-nowrap font-semibold text-t1`}>{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {gratingClips.map((clip) => (
                <tr key={clip.code} className="border-b border-border-default last:border-b-0">
                  <th scope="row" className={`${cell} font-semibold text-t1`}>{clip.name}</th>
                  <td className={`${cell} text-t2`}>{clip.attachment}</td>
                  <td className={`${cell} text-t2`}>{(clip.compatibleWith as readonly string[]).includes("Molded grating") ? "Yes" : "No"}</td>
                  <td className={`${cell} text-t2`}>{(clip.compatibleWith as readonly string[]).includes("Pultruded grating") ? (clip.code === "T" ? "F1 series only" : "Yes") : "No"}</td>
                  <td className={`${cell} text-t2`}>{supportFixing[clip.code]}</td>
                  <td className={`${cell} text-t2`}>316SS</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-[14px] max-w-[900px] text-f14 leading-golden text-t2">
          Panel data for each family: <Link href="/products/molded-frp-grating" className={link}>molded FRP grating</Link> mesh and depth, and <Link href="/products/frp-gratings" className={link}>FRP pultruded grating</Link> I-bar and T-bar series. Not sure which family you need? Read <Link href="/technology/molded-vs-pultruded-frp-grating" className={link}>molded vs pultruded grating</Link>.
        </p>
      </PageSection>

      <PageSection id="estimator" title="How many grating clips do you need?" intro="A starting quantity for a quotation from the general layout values below. It is not a fastening design.">
        <GratingClipEstimator productPath={pagePath} />
      </PageSection>

      <PageSection id="installation" title="Installation and spacing" tone="muted">
        <div className="grid gap-[20px] lg:grid-cols-2">
          <div className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
            <h3 className="text-f18 font-bold text-t1">Typical starting layout</h3>
            <dl className="mt-[12px] divide-y divide-border-default border-y border-border-default">
              {gratingClipTypicalStartingLayout.map((item) => (
                <div key={item.label} className="grid grid-cols-[minmax(0,40%)_minmax(0,1fr)] gap-[12px] py-[10px] text-f14 leading-golden">
                  <dt className="text-t3">{item.label}</dt>
                  <dd className="text-t1">{item.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-[12px] text-f14 leading-golden text-t3">{gratingClipLayoutDisclaimer}</p>
          </div>
          <div className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
            <h3 className="text-f18 font-bold text-t1">Installation principles</h3>
            <ol className="mt-[12px] space-y-[10px] text-f14 leading-golden text-t2">
              {gratingClipInstallationPrinciples.map((principle, index) => (
                <li key={principle} className="grid grid-cols-[28px_minmax(0,1fr)] gap-[8px]">
                  <span className="font-mono text-f12 leading-[1.9] text-t3">{String(index + 1).padStart(2, "0")}</span>
                  <span>{principle}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <h3 className="mt-[32px] text-f18 font-bold text-t1">Four common mistakes</h3>
        <ul className="mt-[12px] grid gap-[12px] md:grid-cols-2">
          {mistakes.map((item) => (
            <li key={item.title} className="rounded-card border border-border-default bg-white p-[18px]">
              <h4 className="text-f16 font-bold text-t1">{item.title}</h4>
              <p className="mt-[6px] text-f14 leading-golden text-t2">{item.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-[16px] text-f14 leading-golden text-t2">
          Step-by-step site work, from setting out to final checks: <Link href="/resources/blog/how-to-install-frp-grating" className={link}>how to install FRP grating</Link>.
        </p>
      </PageSection>

      <PageSection id="cad" title="Download grating clip DXF details">
        <ul className="grid gap-[12px] md:grid-cols-3">
          {[
            { href: GRATING_CLIP_DXF_BY_FAMILY.molded.href, name: GRATING_CLIP_DXF_BY_FAMILY.molded.name, codes: GRATING_CLIP_DXF_BY_FAMILY.molded.codes },
            { href: GRATING_CLIP_DXF_BY_FAMILY.pultruded.href, name: GRATING_CLIP_DXF_BY_FAMILY.pultruded.name, codes: GRATING_CLIP_DXF_BY_FAMILY.pultruded.codes },
            { href: GRATING_CLIP_DXF_HREF, name: GRATING_CLIP_DXF_NAME, codes: "M/C/J/T" },
          ].map((file) => (
            <li key={file.href} className="flex flex-col rounded-card border border-teal-border bg-teal-bg p-[20px]">
              <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{file.codes} · DXF</p>
              <h3 className="mt-[6px] text-f16 font-bold text-t1">{file.name}</h3>
              <a href={file.href} download className="mt-auto pt-[14px] text-f14 font-semibold text-teal-text underline underline-offset-4 hover:text-teal">Download DXF</a>
            </li>
          ))}
        </ul>
        <p className="mt-[12px] text-f14 leading-golden text-t3">Free, no login. The DXF shows typical installation details and F1 SKU references; the approved project drawing governs. More drawings: <Link href="/resources/cad-library" className={link}>CAD library</Link>.</p>
      </PageSection>

      <PageSection id="faq" title="Grating clip questions" tone="muted">
        <div className="grid items-start gap-[12px] md:grid-cols-2">
          {faqItems.map((item) => (
            <FAQDisclosure key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>
      </PageSection>

      <PageSection id="quote" title="Quote grating clips with the panels" tone="deep">
        <ProductRfq
          product="FRP grating clips"
          productPath={pagePath}
          intro="Send the grating family and series, panel layout, support sections and flange thickness, and the clip quantity from the estimator or your drawing."
          items={[
            { title: "Grating", text: "Molded mesh or pultruded series, panel depth and panel sizes." },
            { title: "Supports", text: "Support member sections, flange thickness and whether drilling is allowed." },
            { title: "Quantity", text: "Hold-downs and connectors per panel, or the marked-up layout drawing." },
            { title: "Environment", text: "Chemicals, chlorides and temperature for the fixing material review." },
          ]}
          links={[{ label: "FRP bolts, nuts and threaded rod", href: "/products/frp-fasteners-fittings" }]}
        />
      </PageSection>

      <RelatedLinks
        background="white"
        groups={[
          { title: "Grating", links: [{ href: "/products/grating", label: "Fiberglass grating overview" }, { href: "/products/molded-frp-grating", label: "Molded FRP grating" }, { href: "/products/frp-gratings", label: "Pultruded FRP grating" }] },
          { title: "Selection", links: [{ href: "/tools/frp-grating-selector", label: "FRP grating selector" }, { href: "/technology/molded-vs-pultruded-frp-grating", label: "Molded vs pultruded grating" }, { href: "/resources/blog/frp-grating-specification-guide", label: "Grating specification guide" }] },
          { title: "Access system", links: [{ href: "/products/frp-stair-treads", label: "FRP stair treads" }, { href: "/products/frp-handrail-systems", label: "Industrial handrail systems" }, { href: "/products/frp-fasteners-fittings", label: "FRP fasteners and fittings" }] },
        ]}
      />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import KeyFacts from "@/components/sections/KeyFacts";
import RelatedLinks from "@/components/sections/RelatedLinks";
import ProductRfq from "@/components/products/ProductRfq";
import FAQDisclosure from "@/components/ui/FAQDisclosure";
import Figure from "@/components/ui/Figure";
import JsonLd from "@/components/seo/JsonLd";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { buildRfqHref } from "@/lib/rfq";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pagePath = "/products/fiberglass-baffles";
const seoTarget = getSeoQueryTarget(pagePath);
const LAST_UPDATED = "2026-11-24";
const epaManual = "https://www.epa.gov/system/files/documents/2022-02/disprof_bench_3rules_final_508.pdf";
const figure = "/images/products/baffles/fiberglass-baffle-types-clarifier-contact-tank.webp";
const figureAlt = "Clarifier section with a density current baffle and scum baffle, and a chlorine contact tank plan with serpentine baffle walls";

export const metadata: Metadata = buildPageMetadata({ title: seoTarget.title, description: seoTarget.description, path: pagePath, image: `${pagePath}/opengraph-image` });

const link = "font-semibold text-teal-text underline underline-offset-4 hover:text-teal";
const cell = "px-[12px] py-[10px] align-top";

const baffleTypes = [
  { name: "Density current baffles", where: "Outer wall of circular clarifiers, below the water line", job: "Turn the solids-laden current along the wall back into the tank so it does not short-circuit to the effluent weir." },
  { name: "Scum baffles", where: "Ahead of the effluent weirs in primary and final settling tanks", job: "Hold floating scum and grease back from the weirs so it can be skimmed." },
  { name: "Inlet and energy-dissipating baffles", where: "Tank inlets and feed wells", job: "Slow the incoming flow and spread it across the tank to prevent short-circuiting." },
  { name: "Baffle walls", where: "Chlorine contact tanks, clearwells and treatment basins", job: "Force a serpentine or perforated flow path so water stays longer and the disinfection contact time rises." },
];

const baffling = [
  ["Unbaffled (mixed flow)", "0.1"],
  ["Poor", "0.3"],
  ["Average", "0.5"],
  ["Superior (serpentine or perforated intra-basin baffles)", "0.7"],
  ["Perfect (plug flow)", "1.0"],
];

const faqItems = [
  { question: "What are fiberglass baffles used for in water treatment?", answer: "They redirect flow inside clarifiers, settling tanks and contact basins: density current baffles stop solids short-circuiting, scum baffles hold back floating material, inlet baffles calm incoming flow and baffle walls lengthen the flow path to raise disinfection contact time." },
  { question: "Are these the same as acoustic fiberglass baffles?", answer: "No. Acoustic baffles are glass-wool panels hung from ceilings to absorb sound. The baffles on this page are rigid fiber-reinforced polymer plates and walls that control water flow." },
  { question: "What baffling factor does a baffle wall give?", answer: "EPA guidance rates serpentine or perforated intra-basin baffles as superior, with a baffling factor (T10/T) of about 0.7, against 0.1 for an unbaffled basin. A tracer study gives the site value, which the state regulator accepts." },
  { question: "What load does a baffle wall carry?", answer: "Mainly the difference in water level across it: about 5.2 psf for every inch of head (62.4 psf per foot). The panel span, supports and connections are checked for that head plus any surge or cleaning load." },
  { question: "Can FRP baffles be used in drinking water?", answer: "Yes, where the product is certified to NSF/ANSI/CAN 61 for drinking-water contact. Ask for the certificate of the specific resin and product; a resin family alone is not certification." },
  { question: "What are fiberglass baffles fixed with?", answer: "Type 316 stainless steel or FRP fasteners and brackets, fixed to the tank wall, launder or support beams. Carbon steel is avoided because it corrodes in the same water the FRP is chosen to resist." },
];

export default function BafflesPage() {
  return (
    <>
      <JsonLd data={buildProductFamilyPageSchema({ name: "Fiberglass baffles for water and wastewater", description: seoTarget.description, path: pagePath, image: figure, imageAlt: figureAlt, category: "FRP clarifier and contact-tank baffles", material: ["Glass-fiber-reinforced thermoset"], datePublished: LAST_UPDATED, dateModified: LAST_UPDATED })} />
      <PageHeader
        tag="Baffles"
        updated={LAST_UPDATED}
        title="Fiberglass baffles for clarifiers and contact tanks"
        description="FRP density current baffles, scum baffles, inlet baffles and baffle walls for water and wastewater treatment. Cut from vinyl ester sheet or built from pultruded sections, fixed with 316 stainless or FRP hardware."
        facts={[
          { label: "Types", value: "Density · scum · inlet · walls" },
          { label: "Material", value: "FRP sheet and profiles" },
          { label: "Fixings", value: "316SS or FRP" },
          { label: "Design load", value: "5.2 psf per inch of head" },
        ]}
        actions={{ primary: { label: "Quote baffles", href: buildRfqHref({ source: "product-header", product: "Fiberglass baffles", productPath: pagePath }) }, secondary: { label: "Baffle types", href: "#types", variant: "secondary" }, stickyMobile: true }}
        figure={<Figure number={1} title="Where baffles go" note="Schematic" bleed><div className="relative aspect-[1200/750] bg-white"><Image src={figure} alt={figureAlt} fill sizes="(max-width: 1023px) 94vw, 44vw" className="object-contain" preload /></div></Figure>}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Industries", href: "/industries" }, { label: "Water & Wastewater", href: "/industries/water-wastewater" }, { label: "Fiberglass Baffles" }]}
      />
      <PageNav items={[{ id: "key-facts", label: "Key facts" }, { id: "types", label: "Types" }, { id: "contact-time", label: "Contact time" }, { id: "design", label: "Design" }, { id: "faq", label: "FAQ" }, { id: "quote", label: "Quote" }]} />
      <KeyFacts
        title="Fiberglass baffles: key facts"
        tone="muted"
        summary="Fiberglass baffles are fiber-reinforced polymer plates and walls that redirect flow in clarifiers, settling tanks and chlorine contact basins. F1 Composite supplies them as vinyl ester sheet cut to size and as pultruded sections, with stainless steel or FRP fixings."
        facts={[
          { label: "Not acoustic", value: "These are water-treatment baffles; acoustic ceiling baffles are glass-wool sound absorbers, a different product." },
          { label: "Why FRP", value: "FRP does not corrode in chlorinated or septic water, weighs far less than concrete or steel plate and is cut and drilled on site." },
          { label: "Contact time", value: "EPA rates serpentine or perforated baffle walls at a baffling factor of about 0.7, against 0.1 for an unbaffled basin." },
          { label: "Design load", value: "The water-level difference across the baffle: about 5.2 psf per inch of head." },
          { label: "Drinking water", value: "Use products certified to NSF/ANSI/CAN 61 where the baffle touches potable water." },
        ]}
      />
      <PageSection id="types" title="Four kinds of fiberglass baffle">
        <div className="overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[680px] border-collapse text-left text-f14 leading-golden">
            <caption className="sr-only">Fiberglass baffle types, locations and functions</caption>
            <thead><tr className="border-b border-border-default bg-bg2">{["Baffle", "Where", "What it does"].map((h) => <th key={h} scope="col" className={`${cell} font-semibold text-t1`}>{h}</th>)}</tr></thead>
            <tbody>{baffleTypes.map((row) => <tr key={row.name} className="border-b border-border-default last:border-b-0"><th scope="row" className={`${cell} font-semibold text-t1`}>{row.name}</th><td className={`${cell} text-t2`}>{row.where}</td><td className={`${cell} text-t2`}>{row.job}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="mt-[14px] text-f14 leading-golden text-t2">Clarifier flights, weirs and the rest of the tank internals: <Link href="/applications/frp-wastewater-clarifier-components" className={link}>FRP clarifier components</Link>. Plant-wide FRP: <Link href="/industries/water-wastewater" className={link}>water and wastewater</Link>.</p>
      </PageSection>
      <PageSection id="contact-time" title="Baffle walls and disinfection contact time" tone="muted" intro="Contact time T = theoretical detention time × baffling factor (T10/T). Values from the EPA disinfection profiling and benchmarking manual; a tracer study sets the site value.">
        <div className="overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[480px] border-collapse text-left text-f14 leading-golden">
            <caption className="sr-only">EPA baffling factors by baffling condition</caption>
            <thead><tr className="border-b border-border-default bg-bg2">{["Baffling condition", "Baffling factor T10/T"].map((h) => <th key={h} scope="col" className={`${cell} font-semibold text-t1`}>{h}</th>)}</tr></thead>
            <tbody>{baffling.map(([c, f]) => <tr key={c} className="border-b border-border-default last:border-b-0"><th scope="row" className={`${cell} font-semibold text-t1`}>{c}</th><td className={`${cell} text-t2`}>{f}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="mt-[14px] text-f14 leading-golden text-t2">Source: <a href={epaManual} className={link} target="_blank" rel="noopener noreferrer">US EPA, Disinfection Profiling and Benchmarking Technical Guidance Manual</a>. The manual notes that the extreme values are seldom reached in practice.</p>
      </PageSection>
      <PageSection id="design" title="Designing an FRP baffle">
        <ol className="grid gap-[12px] md:grid-cols-4">
          {[
            ["Head and span", "Take the largest water-level difference across the baffle, including surge and draining, and set panel spans and supports for it."],
            ["Material form", "Flat vinyl ester sheet for plates and density current baffles; pultruded sections or planks for walls that span between supports."],
            ["Fixings", "316 stainless steel or FRP bolts and brackets into the tank wall or support frame; seal cut edges with compatible resin."],
            ["Water contact", "State drinking-water contact, chemicals and temperature so the resin and any NSF/ANSI/CAN 61 certification can be matched."],
          ].map(([title, body], i) => <li key={title} className="rounded-card border border-border-default bg-bg2 p-[16px]"><span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Step {i + 1}</span><h3 className="mt-[4px] text-f16 font-bold text-t1">{title}</h3><p className="mt-[6px] text-f14 leading-golden text-t2">{body}</p></li>)}
        </ol>
        <p className="mt-[16px] text-f14 leading-golden text-t2">Plate stock: <Link href="/products/fiberglass-sheets" className={link}>fiberglass sheets cut to size</Link>. Supports and framing: <Link href="/products/fiberglass-structural-shapes" className={link}>FRP structural shapes</Link>. Hardware: <Link href="/products/frp-fasteners-fittings" className={link}>FRP fasteners</Link>.</p>
      </PageSection>
      <PageSection id="faq" title="Fiberglass baffle questions" tone="muted">
        <div className="grid items-start gap-[12px] md:grid-cols-2">{faqItems.map((item) => <FAQDisclosure key={item.question} question={item.question} answer={item.answer} />)}</div>
      </PageSection>
      <PageSection id="quote" title="Quote fiberglass baffles" tone="deep">
        <ProductRfq product="Fiberglass baffles" productPath={pagePath} intro="Send the tank drawing or dimensions, baffle type and location, water levels on each side, support points, water quality and whether the water is for drinking." items={[{ title: "Tank and baffle", text: "Clarifier or basin size, baffle type, height and length." }, { title: "Head and supports", text: "Water levels on both sides, spans and support points." }, { title: "Water", text: "Chlorine, chemicals, temperature and potable contact." }, { title: "Fixings", text: "Wall type, bracket preference and installation access." }]} />
      </PageSection>
      <RelatedLinks background="white" groups={[
        { title: "Water and wastewater", links: [{ href: "/industries/water-wastewater", label: "FRP for water and wastewater" }, { href: "/applications/frp-wastewater-clarifier-components", label: "Clarifier components" }, { href: "/products/frp-gratings", label: "Pultruded grating walkways" }] },
        { title: "Materials", links: [{ href: "/products/fiberglass-sheets", label: "Fiberglass sheets" }, { href: "/technology/pultrusion-resin-systems", label: "Resin selection" }, { href: "/products/fiberglass-siding-panels", label: "Fiberglass siding panels" }] },
        { title: "Access", links: [{ href: "/products/frp-handrail-systems", label: "Industrial handrail systems" }, { href: "/products/frp-access-platforms-stairs", label: "Access platforms and stairs" }, { href: "/products/frp-grating-clips", label: "Grating clips" }] },
      ]} />
    </>
  );
}

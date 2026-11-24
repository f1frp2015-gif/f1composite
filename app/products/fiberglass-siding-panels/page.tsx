import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import KeyFacts from "@/components/sections/KeyFacts";
import RelatedLinks from "@/components/sections/RelatedLinks";
import ProductRfq from "@/components/products/ProductRfq";
import FAQDisclosure from "@/components/ui/FAQDisclosure";
import Figure from "@/components/ui/Figure";
import Image from "next/image";
import JsonLd from "@/components/seo/JsonLd";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { buildRfqHref } from "@/lib/rfq";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pagePath = "/products/fiberglass-siding-panels";
const seoTarget = getSeoQueryTarget(pagePath);
const LAST_UPDATED = "2026-11-24";
const figure = "/images/products/siding-panels/fiberglass-siding-panel-profiles.webp";
const figureAlt = "Cross-sections of corrugated, box-rib, R-panel and flat fiberglass siding panels with a girt and fastener detail";

export const metadata: Metadata = buildPageMetadata({ title: seoTarget.title, description: seoTarget.description, path: pagePath, image: `${pagePath}/opengraph-image` });

const link = "font-semibold text-teal-text underline underline-offset-4 hover:text-teal";
const cell = "px-[12px] py-[10px] align-top";

const specRows = [
  ["Profile", "Corrugated, box rib, R-panel (ribbed) or flat sheet, chosen to match adjacent metal cladding or the girt spacing"],
  ["Panel weight", "Commonly 5 to 12 oz/ft² (about 1.5 to 3.7 kg/m²); heavier panels for strength, impact or walkable roof use"],
  ["Resin", "Isophthalic polyester for general use, vinyl ester for chemical exposure, fire-retardant grades where a flame-spread class is required"],
  ["Color and light", "Opaque colors for cladding, or translucent panels for daylight: about 80% light transmission for clear and 50–60% for white, nominal"],
  ["Surface and UV", "A UV-stabilized resin and a protective surface layer or film on the weather face slow fiber bloom and yellowing outdoors"],
  ["Fire", "A flame-spread class from ASTM E84 (Class A is 0–25) for fire-retardant grades; standard grades burn"],
  ["Size", "Width set by the profile; lengths cut to the wall height or the girt layout to limit end laps"],
] as const;

const standards = [
  { code: "ASTM D3841", text: "Specification for glass-fiber-reinforced polyester building panels. Classes panels by flammability (Type CC1 or CC2) and weathering (Grade 1 weather resistant, Grade 2 general purpose)." },
  { code: "ASTM E84", text: "Surface burning characteristics: flame-spread index and smoke-developed index, used for interior finish and fire-retardant panel grades." },
  { code: "ASTM D1494", text: "Light transmission of plastic glazing, quoted for translucent panels." },
  { code: "ASTM E108 / UL 580", text: "Fire from outside and wind uplift for roof assemblies, relevant where the same panels are used on the roof." },
];

const faqItems = [
  { question: "What are fiberglass siding panels?", answer: "They are glass-fiber-reinforced polyester sheets, corrugated, ribbed or flat, fixed to girts as wall cladding or translucent daylight panels on industrial, agricultural and chemical buildings. They do not rust, so they are used where steel cladding corrodes." },
  { question: "What is ASTM D3841?", answer: "The US specification for glass-fiber-reinforced polyester building panels. It classes panels by laboratory flammability as Type CC1 or CC2 and by weathering as Grade 1 or Grade 2. The type class is not a fire-hazard rating for the building." },
  { question: "Are fiberglass siding panels fire rated?", answer: "Only fire-retardant grades carry a flame-spread class, measured with ASTM E84; Class A is a flame-spread index of 0 to 25. Standard polyester panels burn, so state the required class in the inquiry." },
  { question: "How much light do translucent panels let through?", answer: "Nominally about 80% for clear and 50 to 60% for white, measured to ASTM D1494. Opaque colors are used where no daylight is wanted, and light transmission falls slowly with weathering." },
  { question: "How are FRP wall panels fastened?", answer: "Through the crowns with sealing washers, into pre-drilled holes at least 1/16 in larger than the fastener so the panel can move with temperature, with side laps of at least one corrugation. Follow the installation sheet for the chosen profile." },
  { question: "Do you supply fiberglass siding for RVs?", answer: "This page covers building cladding. RV sidewalls use thin flat gel-coated laminate bonded to a wall structure; send the sheet thickness, finish and size if that is what you need." },
];

export default function SidingPanelsPage() {
  return (
    <>
      <JsonLd data={buildProductFamilyPageSchema({ name: "Fiberglass siding panels", description: seoTarget.description, path: pagePath, image: figure, imageAlt: figureAlt, category: "FRP wall cladding panels", material: ["Glass-fiber-reinforced polyester"], datePublished: LAST_UPDATED, dateModified: LAST_UPDATED })} />
      <PageHeader
        tag="Siding panels"
        updated={LAST_UPDATED}
        title="Fiberglass siding panels for industrial buildings"
        description="Corrugated, ribbed and flat FRP wall panels for chemical plants, wastewater works, salt and fertilizer stores and farm buildings. Specify profile, weight, resin, color and fire class, and get a quote matched to your girt layout."
        facts={[
          { label: "Profiles", value: "Corrugated · rib · flat" },
          { label: "Weight", value: "5–12 oz/ft²" },
          { label: "Resins", value: "Iso · VE · FR" },
          { label: "Standard", value: "ASTM D3841" },
        ]}
        actions={{ primary: { label: "Quote siding panels", href: buildRfqHref({ source: "product-header", product: "Fiberglass siding panels", productPath: pagePath }) }, secondary: { label: "What to specify", href: "#specify", variant: "secondary" }, stickyMobile: true }}
        figure={<Figure number={1} title="Panel profiles" note="Schematic" bleed><div className="relative aspect-[1200/750] bg-white"><Image src={figure} alt={figureAlt} fill sizes="(max-width: 1023px) 94vw, 44vw" className="object-contain" preload /></div></Figure>}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/pultruded-frp-profiles" }, { label: "Fiberglass Siding Panels" }]}
      />
      <PageNav items={[{ id: "key-facts", label: "Key facts" }, { id: "specify", label: "What to specify" }, { id: "standards", label: "Standards" }, { id: "install", label: "Installation" }, { id: "faq", label: "FAQ" }, { id: "quote", label: "Quote" }]} />
      <KeyFacts
        title="Fiberglass siding panels: key facts"
        tone="muted"
        summary="Fiberglass siding panels are corrugated, ribbed or flat glass-fiber-reinforced polyester sheets used as wall cladding where steel corrodes or where daylight is wanted. F1 Composite supplies them to the profile, weight, resin, color and fire class the project specifies."
        facts={[
          { label: "Where they are used", value: "Chemical and fertilizer plants, salt stores, pulp and paper mills, cooling towers, wastewater works, mines and agricultural buildings." },
          { label: "Why FRP", value: "The panels do not rust in salt, chlorine or acid atmospheres, and translucent grades bring daylight into the building." },
          { label: "Typical weights", value: "About 5 to 12 oz/ft² (1.5 to 3.7 kg/m²); the weight is chosen for span, impact and hail exposure." },
          { label: "Fire", value: "Fire-retardant grades are classed by ASTM E84 flame spread; standard grades burn and are classed CC1 or CC2 under ASTM D3841 only." },
          { label: "Fixing", value: "Crown fixing with sealing washers into oversize holes, so the panel can expand and contract with temperature." },
        ]}
      />
      <PageSection id="specify" title="What to specify for an FRP wall panel">
        <div className="overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[640px] border-collapse text-left text-f14 leading-golden">
            <caption className="sr-only">Fiberglass siding panel specification items</caption>
            <tbody>{specRows.map(([item, text]) => <tr key={item} className="border-b border-border-default last:border-b-0"><th scope="row" className={`${cell} w-[22%] font-semibold text-t1`}>{item}</th><td className={`${cell} text-t2`}>{text}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="mt-[14px] text-f14 leading-golden text-t2">Values are typical market ranges for building panels. The offered profile, weight, resin, light transmission and fire class are confirmed in the quotation and its datasheet. Flat pultruded sheet for liners and covers is on the <Link href="/products/fiberglass-sheets" className={link}>fiberglass sheets</Link> page; framing and girts in FRP are on <Link href="/products/fiberglass-structural-shapes" className={link}>FRP structural shapes</Link>.</p>
      </PageSection>
      <PageSection id="standards" title="Standards that apply to fiberglass siding" tone="muted">
        <ul className="grid gap-[12px] md:grid-cols-2">{standards.map((item) => <li key={item.code} className="rounded-card border border-border-default bg-white p-[18px]"><h3 className="text-f16 font-bold text-t1">{item.code}</h3><p className="mt-[6px] text-f14 leading-golden text-t2">{item.text}</p></li>)}</ul>
      </PageSection>
      <PageSection id="install" title="Installation basics">
        <ol className="grid gap-[12px] md:grid-cols-4">
          {[
            ["Pre-drill oversize", "Holes at least 1/16 in larger than the fastener, kept away from panel ends, so the panel moves without cracking."],
            ["Fix through crowns", "Fasten on the crowns with sealing washers, closer at panel edges than on intermediate girts."],
            ["Lap correctly", "At least one corrugation at side laps; seal laps and start the run away from the prevailing wind."],
            ["Center the fastener", "A fastener pushed to the side of its hole cancels the clearance; do not overtighten the washer."],
          ].map(([title, body], index) => <li key={title} className="rounded-card border border-border-default bg-bg2 p-[16px]"><span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Step {index + 1}</span><h3 className="mt-[4px] text-f16 font-bold text-t1">{title}</h3><p className="mt-[6px] text-f14 leading-golden text-t2">{body}</p></li>)}
        </ol>
      </PageSection>
      <PageSection id="faq" title="Fiberglass siding panel questions" tone="muted">
        <div className="grid items-start gap-[12px] md:grid-cols-2">{faqItems.map((item) => <FAQDisclosure key={item.question} question={item.question} answer={item.answer} />)}</div>
      </PageSection>
      <PageSection id="quote" title="Quote fiberglass siding panels" tone="deep">
        <ProductRfq product="Fiberglass siding panels" productPath={pagePath} intro="Send the profile or the adjacent metal panel it must match, wall heights, girt spacing, quantity, color or light transmission, the exposure and any fire class." items={[{ title: "Profile and size", text: "Profile, cover width, lengths and quantity." }, { title: "Weight and resin", text: "Panel weight, resin and surface protection." }, { title: "Fire and light", text: "Required flame-spread class and light transmission." }, { title: "Site", text: "Chemicals, salt, temperature and delivery destination." }]} />
      </PageSection>
      <RelatedLinks background="white" groups={[
        { title: "Building products", links: [{ href: "/industries/construction", label: "FRP construction products" }, { href: "/products/frp-facade-panels", label: "FRP facade sunshade panels" }, { href: "/products/fiberglass-sheets", label: "Fiberglass sheets" }] },
        { title: "Plants and works", links: [{ href: "/industries/water-wastewater", label: "Water and wastewater" }, { href: "/industries/industrial", label: "Chemical and industrial" }, { href: "/products/fiberglass-baffles", label: "Fiberglass baffles" }] },
        { title: "Structure", links: [{ href: "/products/fiberglass-structural-shapes", label: "FRP structural shapes" }, { href: "/products/frp-fasteners-fittings", label: "FRP fasteners" }, { href: "/what-is-frp", label: "What is FRP" }] },
      ]} />
    </>
  );
}

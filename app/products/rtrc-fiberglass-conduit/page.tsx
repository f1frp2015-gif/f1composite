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

const pagePath = "/products/rtrc-fiberglass-conduit";
const seoTarget = getSeoQueryTarget(pagePath);
const LAST_UPDATED = "2026-11-24";
const nemaRooftop = "https://www.nema.org/docs/default-source/technical-document-library/reinforced-thermosetting-resin-conduit-(rtrc)-and-fittings-installed-on-rooftops.pdf";
const figure = "/images/products/rtrc-conduit/rtrc-fiberglass-conduit-wall-types-joint.webp";
const figureAlt = "Fiberglass RTRC conduit cross-sections in standard, heavy and extra-heavy wall, with a bell-and-spigot joint and an elbow";

export const metadata: Metadata = buildPageMetadata({ title: seoTarget.title, description: seoTarget.description, path: pagePath, image: `${pagePath}/opengraph-image` });

const link = "font-semibold text-teal-text underline underline-offset-4 hover:text-teal";
const cell = "px-[12px] py-[10px] align-top";

const permitted = [
  "Concealed work, and exposed work where not subject to physical damage and identified for the use",
  "Severe corrosive influences, where approved for the chemicals present",
  "Wet, damp and dry locations, cinder fill and underground",
];
const notPermitted = [
  "Hazardous (classified) locations, except as other NEC articles allow",
  "Supporting luminaires or other equipment",
  "Where subject to physical damage, unless identified for it",
  "Ambient temperatures above 50 °C (122 °F), unless listed for higher",
];

const wallTypes = [
  ["Aboveground, standard wall (AG)", "Exposed or concealed runs not subject to physical damage; listed products are tested to UL 2515, including sunlight exposure"],
  ["Aboveground, heavy or extra-heavy wall (XW)", "Runs where physical damage is a risk; XW products are tested to UL 2515A"],
  ["Belowground (BG)", "Concrete-encased or direct-burial duct banks; tested to UL 2420, with thin wall for encasement and heavier walls for direct burial"],
];

const supportSpacing = [
  ["¾–1", "3 ft (0.9 m)"],
  ["1¼–2", "5 ft (1.5 m)"],
  ["2½–3", "6 ft (1.8 m)"],
  ["4–5", "7 ft (2.1 m)"],
  ["6", "8 ft (2.4 m)"],
];

const faqItems = [
  { question: "What is reinforced thermosetting resin conduit?", answer: "RTRC is rigid nonmetallic electrical conduit made of glass fiber in a thermoset resin, usually epoxy, with its couplings, elbows and fittings. NEC Article 355 governs its use, and it is often called fiberglass conduit." },
  { question: "Where can RTRC be used?", answer: "Under NEC 355.10 it can be concealed, exposed where not subject to physical damage and identified for the use, underground, in wet or corrosive locations approved for the chemicals present, and in cinder fill. It is not used in hazardous locations except as other articles allow, or to support equipment." },
  { question: "What is the difference between UL 2515 and UL 2420?", answer: "UL 2515 covers aboveground RTRC and its fittings, including sunlight resistance; UL 2420 covers belowground RTRC for concrete encasement or direct burial. NEMA TC 14 adopts them, with UL 2515A for extra-heavy wall. Ask which listing the offered product carries." },
  { question: "What temperature can fiberglass conduit take?", answer: "The NEC limits RTRC to 50 °C ambient unless the product is listed for more. Listed aboveground products are commonly rated from −40 °C to 110 °C. State the ambient and conductor temperatures in the inquiry." },
  { question: "Why choose RTRC over PVC or steel conduit?", answer: "It does not corrode like steel, keeps its shape in heat better than PVC, is several times lighter than rigid steel, and resists pull-rope burn-through at bends. Steel remains the choice where hazardous-location rules or physical damage require it." },
  { question: "Which sizes are available?", answer: "Code-recognized trade sizes run from ½ in to 6 in, in iron-pipe-size (IPS) or inside-diameter (ID) series, with bell-and-spigot joints, elbows and adapters. Send the series, wall type and lengths; the offered sizes and listings are confirmed in the quotation." },
];

export default function RtrcConduitPage() {
  return (
    <>
      <JsonLd data={buildProductFamilyPageSchema({ name: "Reinforced thermosetting resin conduit (RTRC)", description: seoTarget.description, path: pagePath, image: figure, imageAlt: figureAlt, category: "Fiberglass electrical conduit", material: ["Glass-fiber-reinforced epoxy"], datePublished: LAST_UPDATED, dateModified: LAST_UPDATED })} />
      <PageHeader
        tag="RTRC conduit"
        updated={LAST_UPDATED}
        title="Reinforced thermosetting resin conduit (RTRC)"
        description="Fiberglass electrical conduit, elbows and fittings for corrosive plants, wastewater works, bridges, tunnels and duct banks. Specify wall type, size series and listing to NEC Article 355 and NEMA TC 14, and get a quote."
        facts={[
          { label: "Code", value: "NEC Article 355" },
          { label: "Standards", value: "NEMA TC 14 · UL 2515 · UL 2420" },
          { label: "Trade sizes", value: "½–6 in" },
          { label: "Wall types", value: "AG · XW · BG" },
        ]}
        actions={{ primary: { label: "Quote RTRC conduit", href: buildRfqHref({ source: "product-header", product: "RTRC fiberglass conduit", productPath: pagePath }) }, secondary: { label: "NEC rules", href: "#nec", variant: "secondary" }, stickyMobile: true }}
        figure={<Figure number={1} title="Wall types and joint" note="Schematic" bleed><div className="relative aspect-[1200/750] bg-white"><Image src={figure} alt={figureAlt} fill sizes="(max-width: 1023px) 94vw, 44vw" className="object-contain" preload /></div></Figure>}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/pultruded-frp-profiles" }, { label: "RTRC Fiberglass Conduit" }]}
      />
      <PageNav items={[{ id: "key-facts", label: "Key facts" }, { id: "nec", label: "NEC Article 355" }, { id: "types", label: "Wall types" }, { id: "support", label: "Support spacing" }, { id: "faq", label: "FAQ" }, { id: "quote", label: "Quote" }]} />
      <KeyFacts
        title="RTRC conduit: key facts"
        tone="muted"
        summary="Reinforced thermosetting resin conduit (RTRC) is fiberglass electrical conduit made of glass fiber in a thermoset resin, governed by NEC Article 355 and tested to NEMA TC 14 and UL 2515 or UL 2420. F1 Composite supplies RTRC conduit and fittings to the series, wall type and listing the project specifies."
        facts={[
          { label: "Code basis", value: "NEC Article 355 sets where RTRC may and may not be used, its 50 °C default ambient limit, support and expansion rules." },
          { label: "Listings", value: "UL 2515 covers aboveground RTRC, UL 2515A extra-heavy wall, UL 2420 belowground; NEMA TC 14 adopts them." },
          { label: "Sizes", value: "Code-recognized trade sizes ½ in to 6 in, in IPS or ID series, with bell-and-spigot joints and factory elbows." },
          { label: "Why RTRC", value: "Corrosion resistance, low weight compared with rigid steel, heat resistance compared with PVC and no pull-rope burn-through at bends." },
          { label: "Where", value: "Wastewater plants, chemical and fertilizer plants, bridges and tunnels, data centers, ports and utility duct banks." },
        ]}
      />
      <PageSection id="nec" title="Where NEC Article 355 allows RTRC" intro="Summary of NEC 355.10 and 355.12. The edition adopted by the authority having jurisdiction governs.">
        <div className="grid gap-[16px] md:grid-cols-2">
          <div className="rounded-card border border-teal-border bg-teal-bg p-[20px]"><h3 className="text-f16 font-bold text-teal-text">Uses permitted</h3><ul className="mt-[8px] space-y-[8px] text-f14 leading-golden text-t2">{permitted.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div className="rounded-card border border-border-default bg-bg2 p-[20px]"><h3 className="text-f16 font-bold text-t1">Uses not permitted</h3><ul className="mt-[8px] space-y-[8px] text-f14 leading-golden text-t2">{notPermitted.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </div>
        <p className="mt-[14px] text-f14 leading-golden text-t2">Rooftop and sunlight use: <a href={nemaRooftop} className={link} target="_blank" rel="noopener noreferrer">NEMA bulletin on RTRC installed on rooftops</a>. Secure RTRC within 3 ft of each box or termination, and add expansion fittings where a straight run changes length by ¼ in or more.</p>
      </PageSection>
      <PageSection id="types" title="Aboveground, extra-heavy wall and belowground RTRC" tone="muted">
        <div className="overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[620px] border-collapse text-left text-f14 leading-golden">
            <caption className="sr-only">RTRC wall types and uses</caption>
            <tbody>{wallTypes.map(([type, use]) => <tr key={type} className="border-b border-border-default last:border-b-0"><th scope="row" className={`${cell} w-[32%] font-semibold text-t1`}>{type}</th><td className={`${cell} text-t2`}>{use}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="mt-[14px] text-f14 leading-golden text-t2">Cable supports in the same corrosive areas: <Link href="/applications/frp-cable-tray-supports" className={link}>FRP cable tray supports</Link> and strut built from <Link href="/products/fiberglass-structural-shapes/frp-channel" className={link}>FRP channels</Link>.</p>
      </PageSection>
      <PageSection id="support" title="Support spacing for RTRC" intro="Maximum spacing by trade size as commonly published for NEC 355.30. Products listed for longer spacing may be installed to their listing.">
        <div className="overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[420px] border-collapse text-left text-f14 leading-golden">
            <caption className="sr-only">RTRC support spacing by trade size</caption>
            <thead><tr className="border-b border-border-default bg-bg2">{["Trade size (in)", "Maximum spacing between supports"].map((h) => <th key={h} scope="col" className={`${cell} font-semibold text-t1`}>{h}</th>)}</tr></thead>
            <tbody>{supportSpacing.map(([size, spacing]) => <tr key={size} className="border-b border-border-default last:border-b-0"><th scope="row" className={`${cell} font-semibold text-t1`}>{size}</th><td className={`${cell} text-t2`}>{spacing}</td></tr>)}</tbody>
          </table>
        </div>
      </PageSection>
      <PageSection id="faq" title="RTRC conduit questions" tone="muted">
        <div className="grid items-start gap-[12px] md:grid-cols-2">{faqItems.map((item) => <FAQDisclosure key={item.question} question={item.question} answer={item.answer} />)}</div>
      </PageSection>
      <PageSection id="quote" title="Quote RTRC fiberglass conduit" tone="deep">
        <ProductRfq product="RTRC fiberglass conduit" productPath={pagePath} intro="Send the trade sizes and series, wall type, lengths and quantities, elbows and fittings, the installation (exposed, encased or direct burial) and the listing the project requires." items={[{ title: "Sizes and series", text: "Trade sizes, IPS or ID series, lengths and quantities." }, { title: "Wall and listing", text: "AG, XW or BG and the required UL / NEMA TC 14 listing." }, { title: "Fittings", text: "Elbows, couplings, adapters and expansion fittings." }, { title: "Site", text: "Ambient temperature, chemicals, sunlight and destination." }]} />
      </PageSection>
      <RelatedLinks background="white" groups={[
        { title: "Cable management", links: [{ href: "/applications/frp-cable-tray-supports", label: "FRP cable tray supports" }, { href: "/resources/blog/frp-cable-tray-trunking-ladder-vs-metal", label: "FRP cable tray vs metal" }, { href: "/applications/frp-utility-crossarms", label: "FRP utility crossarms" }] },
        { title: "Plants", links: [{ href: "/industries/water-wastewater", label: "Water and wastewater" }, { href: "/industries/energy", label: "Energy and substations" }, { href: "/industries/industrial", label: "Chemical and industrial" }] },
        { title: "Material", links: [{ href: "/products/fiberglass-structural-shapes/frp-tube", label: "Fiberglass round tube" }, { href: "/what-is-frp", label: "What is FRP" }, { href: "/technology/pultrusion-resin-systems", label: "Resin systems" }] },
      ]} />
    </>
  );
}

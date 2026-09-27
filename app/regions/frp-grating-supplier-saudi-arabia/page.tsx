import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import RelatedLinks from "@/components/sections/RelatedLinks";
import InnerCTA from "@/components/sections/InnerCTA";
import { FAQList } from "@/components/ui/FAQ";
import CoverCard from "@/components/ui/CoverCard";
import Figure from "@/components/ui/Figure";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { company, supplyTerms } from "@/content/data/company";
import { coverFor, regionCovers } from "@/lib/covers";

const pageTitle =
  "FRP Grating Supplier Saudi Arabia — Petrochemical & Coastal";
const pageDescription =
  "FRP grating for Riyadh, Jeddah, Dammam and Jubail: vinyl ester molded and pultruded panels, CIF or DAP delivery, fire test reports on request.";
const pagePath = "/regions/frp-grating-supplier-saudi-arabia";

const cover = regionCovers[pagePath];

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const faqs = [
  {
    question: "Why is FRP grating preferred over galvanized steel in Saudi petrochemical plants?",
    answer:
      "Saudi petrochemical and refinery sites combine summer air temperatures above 50°C, salty coastal air in the Eastern Province and splash from sulfuric acid, caustics and hydrocarbons. Galvanized steel grating in that service needs frequent recoating or replacement. Vinyl ester FRP grating does not rust and needs no recoating, which removes a recurring cost for grated walkways and access platforms. Its design life still depends on the resin, UV protection and an inspection plan. FRP grating is an established material on Gulf petrochemical projects.",
  },
  {
    question: "Which FRP grating standards do Saudi EPC contractors typically specify?",
    answer:
      "Saudi project specifications usually reference ASTM E84 for flame spread (Class 1 / Class A, FSI ≤ 25), EN 13501-1 where European standards apply, a slip-resistance test for the surface, ASTM D635 for self-extinguishing behavior, and the operator's own material standards (for Aramco scopes, its SAES specifications). We supply vinyl ester grating with test reports against these standards on request and check operator-specific requirements for each project.",
  },
  {
    question: "What are the lead times to Jebel Ali, Dammam, or Jeddah port from China?",
    answer:
      "Sea freight from Shanghai or Ningbo to Jebel Ali, the UAE port most commonly used for shipments to Saudi Arabia, takes 18–25 days. Less frequent direct sailings to Dammam and Jeddah typically take 22–32 days. For time-sensitive Saudi orders, F1 Composite generally ships CIF Jebel Ali or DAP to the project site, with inland trucking through the GCC road network. Transit from Jebel Ali to Riyadh, Jubail, Yanbu or Ras Tanura takes 1–3 days. The total lead time from purchase order to site is 6–9 weeks for standard FRP grating; custom panel sizes add 2–3 weeks for fabrication.",
  },
  {
    question: "Can FRP gratings handle 65°C+ desert summer surface temperatures?",
    answer:
      "Yes, with a vinyl ester resin. Vinyl ester grating keeps most of its structural properties at a continuous 65°C, and its heat-distortion temperature is above 100°C, well over realistic outdoor surface temperatures in Saudi Arabia, even on dark grating in full sun. FRP expands about a third as much as aluminum with temperature, so daily heating and cooling does not open gaps the way it can with aluminum grating. UV-stabilized resin and surfacing veils protect the top surface; plan periodic inspection in strong sun.",
  },
  {
    question: "What grating sizes and load ratings are most commonly ordered for Saudi projects?",
    answer:
      "The most common specification for Saudi petrochemical and infrastructure projects is molded FRP grating with 38 × 38 mm mesh, 38 or 50 mm deep, in vinyl ester resin with a concave slip-resistant surface. Standard panel sizes are 1,220 × 3,660 mm (4 × 12 ft) and 1,500 × 4,000 mm. Load capacity depends on span and panel depth, so we check the proposed panel against your design loads using the load tables. Pipe-rack supports and heavy maintenance access usually use pultruded I-bar grating, 38 or 50 mm deep.",
  },
  {
    question: "Does F1 Composite handle Aramco vendor approval and project documentation?",
    answer:
      "We prepare project documentation for Aramco, SABIC and Maaden scopes: mill test certificates to ASTM D790 / D638, third-party fire and chemical-resistance test reports, country-of-origin certificates and traceability from raw-material batch to finished panel. ISO 9001 and other certificates are provided on request with the holder, number and scope. For Aramco-controlled scopes we supply through approved Saudi distributors or the project's nominated EPC procurement channel; F1 does not hold its own Aramco vendor code. For SABIC and Maaden work we follow the qualification route the project specifies.",
  },
  {
    question: "Do you supply FRP grating to Riyadh, or only the Eastern Province coast?",
    answer:
      "Both. The heat, salt and chemical exposure in the Eastern Province (Dammam, Jubail, Ras Tanura, Khobar) makes the strongest case for FRP over steel. Infrastructure and industrial projects in Riyadh use the same vinyl ester grating for its fire performance, slip-resistant surface and freedom from recoating. Riyadh orders usually ship DAP to site by road from Jebel Ali, 1–3 days after the container clears the port.",
  },
  {
    question: "Can F1 Composite ship FRP grating directly into Jeddah?",
    answer:
      "Yes. Jeddah Islamic Port receives container traffic from China on a broadly similar transit-time basis to Jebel Ali, so F1 Composite quotes CIF Jeddah alongside CIF Jebel Ali and lets project schedule and total landed cost decide the routing. Jeddah and the Red Sea coastal strip carry the same salt-air corrosion driver as the Gulf coast, so the vinyl ester grating specification for Jeddah projects is the same as for Eastern Province petrochemical sites.",
  },
];

const specifications = [
  { application: "Walkway / catwalk", type: "Molded", mesh: "38 × 38 mm", depth: "38 mm", resin: "Vinyl ester", finish: "Concave, gritted" },
  { application: "Maintenance access platform", type: "Molded", mesh: "38 × 38 mm", depth: "50 mm", resin: "Vinyl ester", finish: "Concave, gritted" },
  { application: "Pipe-rack support / heavy load", type: "Pultruded I-bar", mesh: "25 mm pitch", depth: "38 mm", resin: "Vinyl ester", finish: "Gritted top" },
  { application: "Trench cover / drainage", type: "Molded", mesh: "38 × 38 mm", depth: "25 mm", resin: "Polyester", finish: "Concave" },
  { application: "Acid splash zone", type: "Molded", mesh: "38 × 38 mm", depth: "38 mm", resin: "Premium vinyl ester", finish: "Gritted, surface veil" },
  { application: "Stair tread", type: "Pultruded grating", mesh: "Per tread design", depth: "38 mm", resin: "Vinyl ester", finish: "Yellow nosing, gritted" },
];

const cities = [
  {
    route: "Dammam · Jubail",
    city: "Dammam and the Eastern Province",
    body: "Jubail, Ras Tanura, Khobar and Dammam form the main petrochemical corridor and the harshest combined-corrosion environment in the country. Project specifications here usually combine ASTM E84 fire testing, EN 13706 profile requirements and the operator's own material standards.",
  },
  {
    route: "Road from Jebel Ali",
    city: "Riyadh",
    body: "Inland infrastructure and industrial projects use the same vinyl ester grating for its fire performance and because it needs no recoating, even away from coastal salt. Heat and chemical splash are the main design inputs. Orders ship DAP to site by road, 1–3 days from Jebel Ali after customs clearance.",
  },
  {
    route: "Jeddah Islamic Port",
    city: "Jeddah and the Red Sea coast",
    body: "Jeddah Islamic Port takes container traffic from China on a broadly similar transit-time basis to Jebel Ali, so we quote CIF Jeddah alongside CIF Jebel Ali. The Red Sea coast has the same salt-air exposure as the Gulf coast, so the grating specification stays the same and only the routing changes.",
  },
];

const steps = [
  {
    title: "RFQ and quote",
    body: `Send a drawing or panel layout, the quantity, the application and service environment, and your preferred delivery terms. We reply within ${supplyTerms.responseTime}, then quote FOB, CIF or DAP with a list of included documents.`,
  },
  {
    title: "Production and documents",
    body: `Standard panels take 4–6 weeks in FengDu's production network of ${company.production.bases} bases, with batch-traceable mill test certificates and third-party fire and chemical test reports as required.`,
  },
  {
    title: "Sea freight and delivery",
    body: "Sea freight to Jebel Ali takes 18–25 days, and CIF Jebel Ali is the most common Incoterm. DAP delivery by road to Riyadh, Jubail or Ras Tanura adds 1–3 days after customs clearance.",
  },
];

const quoteHref = "/contact?source=region-frp-grating-supplier-saudi-arabia&inquiry_type=rfq";
const mono = "font-mono text-f12 uppercase tracking-[0.06em] text-t3";

export default function SaudiGratingPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: pageDescription,
    url: absoluteUrl(pagePath),
    about: {
      "@type": "Thing",
      name: "FRP grating supply for Saudi Arabia petrochemical and infrastructure projects",
    },
    provider: { "@id": "https://www.f1composite.com/#organization" },
  };

  return (
    <>
      <JsonLd data={webPageSchema} />

      <PageHeader
        tag="Saudi Arabia"
        title="FRP grating supplier for Saudi Arabia"
        description="Molded and pultruded FRP grating for Riyadh, Jeddah, Dammam and Jubail, shipped CIF Jebel Ali or DAP to site, with fire and chemical test reports on request."
        figure={
          <Figure number={1} title="Petrochemical plant" note={cover.note} bleed>
            <div className="relative aspect-[16/10]">
              <Image src={cover.src} alt={cover.alt} fill sizes="(max-width: 1023px) 94vw, 44vw" className="object-cover" preload />
            </div>
          </Figure>
        }
        actions={{
          primary: { label: "Request a Saudi grating quote", href: quoteHref },
          secondary: { label: "See the specifications", href: "#specifications", variant: "secondary" },
          stickyMobile: true,
        }}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Markets", href: "/regions" },
          { label: "Saudi Arabia" },
        ]}
      />
      <PageNav items={[{ id: "why", label: "Why FRP" }, { id: "specifications", label: "Specifications" }, { id: "cities", label: "Cities" }, { id: "logistics", label: "Logistics" }, { id: "faq", label: "FAQ" }, { id: "evidence", label: "Evidence" }]} />

      <PageSection id="why" title="Why Saudi specifiers use FRP grating" tone="white">
        <div className="grid gap-[32px] lg:grid-cols-2">
          <div className="space-y-[20px] text-f16 leading-golden text-t2">
            <p>
              The Eastern Province (Jubail, Ras Tanura, Dammam, Khobar) combines 50°C
              summers, salty Gulf air and chemical splash. In that service, galvanized
              steel grating needs frequent replacement and painted carbon steel needs
              regular recoating.
            </p>
            <p>
              Vinyl ester FRP grating removes both cycles. It does not rust, handles most
              chemical splash and keeps most of its strength at 65°C surface
              temperatures. It is an established material on Gulf petrochemical projects.
            </p>
          </div>
          <div className="space-y-[20px] text-f16 leading-golden text-t2">
            <p>
              We ship CIF Jebel Ali or DAP to project sites in Jubail, Yanbu, Ras Tanura,
              Riyadh and Royal Commission areas. Send a panel list and we will quote the
              landed cost, so you can compare it with your current supplier.
            </p>
            <p>
              Each order ships with batch mill test certificates, country-of-origin
              certificates and traceability from raw material to panel. ASTM and EN fire
              and chemical test reports, ISO 9001 and other certificates are provided on
              request for operator and EPC review.
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection id="specifications" title="Common grating specifications for Saudi projects" intro="What petrochemical and infrastructure projects in the Kingdom usually order, by application." tone="muted">
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[760px] border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Application</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Grating type</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Mesh</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Depth</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Resin</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Finish</th>
              </tr>
            </thead>
            <tbody>
              {specifications.map((row) => (
                <tr key={row.application} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className="px-[14px] py-[10px] font-semibold text-t1">{row.application}</th>
                  <td className="px-[14px] py-[10px] leading-golden text-t2">{row.type}</td>
                  <td className="px-[14px] py-[10px] leading-golden text-t2">{row.mesh}</td>
                  <td className="px-[14px] py-[10px] leading-golden text-t2">{row.depth}</td>
                  <td className="px-[14px] py-[10px] leading-golden text-t2">{row.resin}</td>
                  <td className="px-[14px] py-[10px] leading-golden text-t2">{row.finish}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-[12px] text-f14 leading-golden text-t3">
          Custom mesh sizes, panel cuts, banding details and load-rated configurations are quoted from drawing.
        </p>
      </PageSection>

      <PageSection id="cities" title="Supply across the Eastern Province, Riyadh and Jeddah" tone="white">
        <ul className="grid gap-[12px] lg:grid-cols-3">
          {cities.map((item) => (
            <li key={item.city} className="rounded-card border border-border-default bg-bg2 p-[20px] sm:p-[24px]">
              <p className={mono}>{item.route}</p>
              <h3 className="mt-[4px] text-f18 font-bold text-t1">{item.city}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{item.body}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="logistics" title="From FengDu's plants to your Saudi site" intro="One quote lists the panels, freight, delivery terms and the documents included, so the landed cost is known before the order." tone="muted">
        <ol className="grid gap-[12px] lg:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
              <p className={mono}>Step {index + 1}</p>
              <h3 className="mt-[4px] text-f18 font-bold text-t1">{step.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{step.body}</p>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection id="faq" title="Frequently asked questions" tone="white">
        <FAQList items={faqs} />
      </PageSection>

      <PageSection id="evidence" title="Evidence and further reading" tone="muted">
        <ul className="grid gap-[12px] md:grid-cols-3">
          <li>
            <CoverCard href="/case-studies/factory-access-staircase" cover={coverFor("/case-studies/factory-access-staircase")!} label={<span className={mono}>Case study</span>} title="Access stair and platform at our plant" text="Molded grating landings, I-beam stringers and FRP handrails, bolted in during a three-day shutdown." sizes="(max-width: 767px) 94vw, 390px" />
          </li>
          <li>
            <CoverCard href="/applications/frp-chemical-plant-platforms" cover={coverFor("/applications/frp-chemical-plant-platforms")!} label={<span className={mono}>Application</span>} title="FRP chemical plant platforms" text="Beams, grating, stair treads and handrails for acid-splash process areas." sizes="(max-width: 767px) 94vw, 390px" />
          </li>
          <li>
            <CoverCard href="/technology/frp-vs-steel-gratings" cover={coverFor("/technology/frp-vs-steel-gratings")!} label={<span className={mono}>Comparison</span>} title="FRP vs steel grating" text="Weight, corrosion, fire and lifecycle cost compared with galvanized steel grating." sizes="(max-width: 767px) 94vw, 390px" />
          </li>
        </ul>
      </PageSection>

      <RelatedLinks
        background="white"
        groups={[
          {
            title: "Products",
            links: [
              { href: "/products/molded-frp-grating", label: "Molded FRP grating" },
              { href: "/products/frp-gratings", label: "Pultruded FRP grating" },
              { href: "/products/frp-stair-treads", label: "FRP stair treads" },
              { href: "/products/frp-handrail-systems", label: "FRP handrail systems" },
            ],
          },
          {
            title: "Tools",
            links: [
              { href: "/ai/sourcing", label: "Free FRP sourcing assistant" },
            ],
          },
          {
            title: "Guides",
            links: [
              { href: "/industries/industrial", label: "FRP for industrial and petrochemical plants" },
              { href: "/resources/blog/how-to-source-pultruded-frp-profiles-from-china-2026-buyers-guide", label: "Buyer's guide: sourcing FRP from China" },
            ],
          },
          {
            title: "Other markets",
            links: [
              { href: "/regions/frp-cable-tray-uae-oil-gas", label: "FRP cable tray for UAE oil and gas" },
            ],
          },
        ]}
      />

      <InnerCTA
        title="Request a CIF Jebel Ali or DAP Saudi Arabia quote for FRP grating"
        quoteHref={quoteHref}
        text="Send the grating layout or panel list, quantities, service environment and delivery terms."
      />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import SectionTag from "@/components/ui/SectionTag";
import LinkArrow from "@/components/ui/LinkArrow";
import FAQ from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

const pageTitle =
  "FRP Grating Supplier Saudi Arabia — Petrochemical & Coastal";
const pageDescription =
  "FRP grating for Riyadh, Jeddah, Dammam and Jubail: vinyl ester molded and pultruded panels, CIF or DAP delivery, fire test reports on request.";
const pagePath = "/regions/frp-grating-supplier-saudi-arabia";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const faqs = [
  {
    question: "Why is FRP grating preferred over galvanized steel in Saudi petrochemical plants?",
    answer:
      "Saudi petrochemical and refinery sites combine summer air temperatures above 50°C, salty coastal air in the Eastern Province and splash from sulfuric acid, caustics and hydrocarbons. Galvanized steel grating in that service needs frequent recoating or replacement. Vinyl ester FRP grating does not rust and needs no recoating, which removes the biggest recurring cost for grated walkways and access platforms. Its design life still depends on the resin, UV protection and an inspection plan. FRP grating is an established material on Gulf petrochemical projects.",
  },
  {
    question: "Which FRP grating standards do Saudi EPC contractors typically specify?",
    answer:
      "Saudi project specifications usually reference ASTM E84 for flame spread (Class 1 / Class A, FSI ≤ 25), EN 13501-1 where European standards apply, a slip-resistance test for the surface, ASTM D635 for self-extinguishing behaviour, and the operator's own material standards (for Aramco scopes, its SAES specifications). We supply vinyl ester grating with test reports against these standards on request and check operator-specific requirements for each project.",
  },
  {
    question: "What are the lead times to Jebel Ali, Dammam, or Jeddah port from China?",
    answer:
      "Sea freight from Shanghai or Ningbo to Jebel Ali, the UAE port most commonly used for shipments to Saudi Arabia, takes 18–25 days. Less-frequent direct sailings to Dammam and Jeddah typically take 22–32 days. For time-sensitive Saudi orders, F1 Composite generally ships CIF Jebel Ali or DAP to the project site, with inland trucking through the GCC road network. Transit from Jebel Ali to Riyadh, Jubail, Yanbu, or Ras Tanura takes 1–3 days. The total lead time from purchase order to site is 6–9 weeks for standard FRP grating; custom panel sizes add 2–3 weeks for fabrication.",
  },
  {
    question: "Can FRP gratings handle 65°C+ desert summer surface temperatures?",
    answer:
      "Yes, with a vinyl ester resin. Vinyl ester grating keeps most of its structural properties at a continuous 65°C, and its heat-distortion temperature is above 100°C, well over realistic outdoor surface temperatures in Saudi Arabia, even on dark grating in full sun. FRP expands about a third as much as aluminum with temperature, so daily heating and cooling does not open gaps the way it can with aluminum grating. UV-stabilised resin and surfacing veils protect the top surface; plan periodic inspection in strong sun.",
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
        title="FRP Grating Supplier for Saudi Arabia"
        description="Molded and pultruded FRP grating for Riyadh, Jeddah, Dammam and Jubail, shipped CIF Jebel Ali or DAP to site. We reply to RFQs within one business day; fire and chemical test reports are available on request."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Regions", href: "/regions/frp-grating-supplier-saudi-arabia" },
          { label: "Saudi Arabia — FRP Grating" },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="grid gap-[34px] lg:grid-cols-5">
            <div className="overflow-hidden rounded-[8px] lg:col-span-2">
              <Image
                src="/images/regions/frp-grating-saudi-arabia-petrochemical.jpg"
                alt="Close-up of molded FRP grating panels and load-bearing beams on an outdoor platform — slip-resistant mesh surface and corrosion-resistant vinyl ester construction"
                width={900}
                height={1350}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="h-full w-full object-cover"
                preload
              />
            </div>
            <div className="lg:col-span-3">
              <SectionTag>Why Saudi Specifiers Use FRP</SectionTag>
              <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
                Built for the combined service environment of the Saudi East Coast and inland petrochemical complexes
              </h2>
              <p className="mt-[13px] text-f15 leading-golden text-t2">
                Vinyl ester FRP grating does not rust in salty coastal air, handles most chemical splash and keeps its strength at 65°C surface temperatures. That removes the recoating and replacement cycle of galvanized steel grating in the same service.
              </p>
              <ul className="mt-[13px] grid grid-cols-2 gap-[8px] text-f13 font-medium text-t2">
                <li className="rounded-[8px] border border-border-default px-[13px] py-[8px]">No recoating</li>
                <li className="rounded-[8px] border border-border-default px-[13px] py-[8px]">Fire test reports on request</li>
                <li className="rounded-[8px] border border-border-default px-[13px] py-[8px]">Anti-slip vinyl ester surface</li>
                <li className="rounded-[8px] border border-border-default px-[13px] py-[8px]">Documents for operator specs</li>
              </ul>
              <div className="mt-[21px] rounded-[8px] border-2 border-teal bg-bg2 p-[24px] text-center">
                <p className="text-f15 font-bold text-teal-text">Request a quote for your Saudi project</p>
                <p className="mt-[8px] text-t2">Send your grating layout, quantity and delivery requirements. We&apos;ll quote CIF Jebel Ali or DAP and list the documents included.</p>
                <Link
                  href="/contact"
                  className="mt-[13px] inline-block rounded-[8px] bg-teal px-[21px] py-[11px] text-f13 font-bold uppercase tracking-wide text-white transition-colors hover:bg-teal-text"
                >
                  Request Quote Now →
                </Link>
                <p className="mt-[8px] text-t3">We reply within one business day</p>
              </div>
              <div className="mt-[21px] grid gap-[13px] sm:grid-cols-2 text-f13 leading-golden text-t2">
                <div className="space-y-[13px]">
                  <p>
                    The Eastern Province (Jubail, Ras Tanura, Dammam, Khobar) combines 50°C summers, salty Gulf air and chemical splash. In that service, galvanized steel grating needs frequent replacement and painted carbon steel needs regular recoating.
                  </p>
                  <p>
                    Vinyl ester FRP grating removes both cycles. It does not rust, handles most chemical splash and keeps its strength at 65°C surface temperatures. It is an established material on Gulf petrochemical projects.
                  </p>
                </div>
                <div className="space-y-[13px]">
                  <p>
                    We ship CIF Jebel Ali or DAP to project sites in Jubail, Yanbu, Ras Tanura, Riyadh and Royal Commission areas. Send a panel list and we will quote landed cost, so you can compare it with your current supplier.
                  </p>
                  <p>
                    Each order ships with batch mill test certificates, country-of-origin certificates and traceability from raw material to panel. ASTM/EN fire and chemical test reports, ISO 9001 and other certificates are provided on request for operator and EPC review.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Saudi-Spec Reference</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            Common grating specifications for Saudi petrochemical and infrastructure projects
          </h2>
          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Application</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Grating Type</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Mesh × Thickness</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Resin</th>
                  <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">Finish</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { app: "Walkway / catwalk", type: "Molded", mesh: "38×38 × 38 mm", resin: "Vinyl ester", finish: "Concave + grit" },
                  { app: "Maintenance access platform", type: "Molded", mesh: "38×38 × 50 mm", resin: "Vinyl ester", finish: "Concave + grit" },
                  { app: "Pipe-rack support / heavy load", type: "Pultruded I-bar", mesh: "25 mm pitch × 38 mm", resin: "Vinyl ester", finish: "Grit top" },
                  { app: "Trench cover / drainage", type: "Molded", mesh: "38×38 × 25 mm", resin: "Polyester", finish: "Concave" },
                  { app: "Acid splash zone", type: "Molded", mesh: "38×38 × 38 mm", resin: "Premium vinyl ester", finish: "Grit + veil" },
                  { app: "Stair tread", type: "Pultruded", mesh: "38 mm depth", resin: "Vinyl ester", finish: "Yellow nosing + grit" },
                ].map((row) => (
                  <tr key={row.app} className="border-b border-border-default">
                    <td className="py-[13px] pr-[21px] text-f15 font-medium text-t1">{row.app}</td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{row.type}</td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{row.mesh}</td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{row.resin}</td>
                    <td className="py-[13px] text-f15 text-t2">{row.finish}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-[13px] text-f13 text-t3">
            Custom mesh sizes, panel cuts, banding details, and load-rated configurations are quoted from drawing.
          </p>
        </div>
      </section>

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>By City</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            FRP grating supply across Riyadh, Jeddah, and the Dammam / Eastern Province corridor
          </h2>
          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-3">
            {[
              {
                city: "Dammam & Eastern Province",
                body: "Jubail, Ras Tanura, Khobar and Dammam form the main petrochemical corridor and the harshest combined-corrosion environment in the country. Project specifications here usually combine ASTM E84 fire testing, EN 13706 profile requirements and the operator's own material standards.",
              },
              {
                city: "Riyadh",
                body: "Inland infrastructure and industrial projects use the same vinyl ester grating for its fire performance and because it needs no recoating, even away from coastal salt. Heat and chemical splash are the main design inputs. Orders ship DAP to site by road, 1–3 days from Jebel Ali after customs clearance.",
              },
              {
                city: "Jeddah & Red Sea coast",
                body: "Jeddah Islamic Port takes container traffic from China on a broadly similar transit-time basis to Jebel Ali, so F1 Composite quotes CIF Jeddah alongside CIF Jebel Ali. The Red Sea coastal strip carries the same salt-air corrosion driver as the Gulf coast, so the grating spec doesn't change — only the routing does.",
              },
            ].map((c) => (
              <div key={c.city} className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
                <h3 className="text-f15 font-bold text-t1">{c.city}</h3>
                <p className="mt-[8px] text-f13 leading-golden text-t2">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Logistics</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            From our factory in China to your project site in Saudi Arabia
          </h2>
          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-3">
            {[
              {
                step: "1",
                title: "RFQ and quote",
                body: "Send a drawing or panel layout, the quantity, the application and service environment, and your preferred delivery terms. We reply within one business day and then quote FOB, CIF or DAP with a list of included documents.",
              },
              {
                step: "2",
                title: "Manufacturing — 4–6 weeks",
                body: "Production in FengDu's network of five bases, with batch-traceable mill test certificates and third-party fire and chemical test reports as required.",
              },
              {
                step: "3",
                title: "Sea freight to Jebel Ali — 18–25 days",
                body: "CIF Jebel Ali is the most common Incoterm; DAP Riyadh / Jubail / Ras Tanura via GCC road network adds 1–3 days inland.",
              },
            ].map((s) => (
              <div key={s.step} className="rounded-[8px] border border-border-default bg-white p-[34px]">
                <div className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">Step {s.step}</div>
                <h3 className="mt-[8px] text-f17 font-bold text-t1">{s.title}</h3>
                <p className="mt-[8px] text-f13 leading-golden text-t2">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-[34px] rounded-[8px] border border-teal-border bg-white p-[24px]">
            <div className="flex flex-wrap items-center justify-between gap-[13px]">
              <div>
                <p className="text-f15 font-bold text-t1">Ready to specify FRP gratings for your Saudi project?</p>
                <p className="mt-[5px] text-f13 text-t2">Send your RFQ drawings, quantity and delivery terms. We reply within one business day and follow with pricing and the document list.</p>
              </div>
              <Link
                href="/contact"
                className="rounded-[8px] bg-teal px-[21px] py-[11px] text-f13 font-bold uppercase tracking-wide text-white transition-colors hover:bg-teal-text"
              >
                Get Quote →
              </Link>
            </div>
          </div>

          <div className="mt-[34px] flex flex-wrap gap-[13px]">
            <LinkArrow href="/products/molded-frp-grating">Browse molded FRP grating</LinkArrow>
            <LinkArrow href="/products/frp-gratings">Browse pultruded FRP grating</LinkArrow>
            <LinkArrow href="/ai/sourcing">Free FRP Sourcing Assistant</LinkArrow>
            <LinkArrow href="/resources/blog/how-to-source-pultruded-frp-profiles-from-china-2026-buyers-guide">
              Buyer&rsquo;s guide: sourcing from China
            </LinkArrow>
          </div>

          <FAQ items={faqs} />
        </div>
      </section>

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Related Resources</SectionTag>
          <div className="mt-[21px] grid gap-[21px] sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/industries/industrial"
              className="group rounded-[8px] border border-border-default bg-white p-[21px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
            >
              <h3 className="text-f15 font-bold text-t1">Industrial & Petrochemical</h3>
              <p className="mt-[5px] text-f13 leading-golden text-t2">FRP for chemical plant platforms, pipe racks, and process facilities.</p>
            </Link>
            <Link
              href="/applications/frp-chemical-plant-platforms"
              className="group rounded-[8px] border border-border-default bg-white p-[21px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
            >
              <h3 className="text-f15 font-bold text-t1">Chemical plant platforms</h3>
              <p className="mt-[5px] text-f13 leading-golden text-t2">FRP beams, grating and handrails for acid-splash process areas.</p>
            </Link>
            <Link
              href="/technology/frp-vs-steel-gratings"
              className="group rounded-[8px] border border-border-default bg-white p-[21px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
            >
              <h3 className="text-f15 font-bold text-t1">FRP vs Steel Gratings</h3>
              <p className="mt-[5px] text-f13 leading-golden text-t2">30-year lifecycle cost comparison: FRP vs galvanized steel grating.</p>
            </Link>
          </div>
        </div>
      </section>

      <InnerCTA title="Request a CIF Jebel Ali or DAP Saudi Arabia quote for FRP grating" />
    </>
  );
}

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
  "FRP Grating Supplier Saudi Arabia — Aramco, SABIC, Maaden";
const pageDescription =
  "FRP grating for Riyadh, Jeddah, Dammam, and Jubail. Factory-direct pricing, 48-hour response, ASTM E84 fire ratings, and EN 13706 certification.";
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
      "Saudi petrochemical and oil-refining environments combine ambient temperatures above 50°C, salt-laden coastal air in the Eastern Province, and splash exposure to sulfuric acid, caustic chemicals, and hydrocarbons. Galvanized steel grating under these combined conditions typically lasts 5–8 years before requiring full replacement. Pultruded vinyl ester FRP grating provides a 25-year design life without coating maintenance, eliminating the largest single maintenance expense for grated walkways and access platforms. Aramco, SABIC, and Maaden have used FRP grating on capital projects for more than 15 years, so the material has an established qualification history.",
  },
  {
    question: "Which FRP grating standards do Saudi EPC contractors typically specify?",
    answer:
      "The standards stack typically referenced on Saudi project specifications: ASTM E84 (Class 1 / Class A flame spread, FSI ≤ 25), EN 13501-1 (B-s1,d0 where European standards apply), ASTM F3125/F3125M for slip resistance, ASTM D635 for self-extinguishing behavior, and project-specific Aramco SAES-Q-005 / SAES-S-070 for materials in oily/chemical service. F1 Composite supplies grating to all of these standards using vinyl ester resin formulations built to the specifications referenced on the Aramco vendor-list pathway.",
  },
  {
    question: "What are the lead times to Jebel Ali, Dammam, or Jeddah port from China?",
    answer:
      "Sea freight from Shanghai or Ningbo to Jebel Ali, the UAE port most commonly used for shipments to Saudi Arabia, takes 18–25 days. Less-frequent direct sailings to Dammam and Jeddah typically take 22–32 days. For time-sensitive Saudi orders, F1 Composite generally ships CIF Jebel Ali or DAP to the project site, with inland trucking through the GCC road network. Transit from Jebel Ali to Riyadh, Jubail, Yanbu, or Ras Tanura takes 1–3 days. The total lead time from purchase order to site is 6–9 weeks for standard FRP grating; custom panel sizes add 2–3 weeks for fabrication.",
  },
  {
    question: "Can FRP gratings handle 65°C+ desert summer surface temperatures?",
    answer:
      "Yes. Vinyl ester FRP gratings retain more than 90% of their structural properties at a continuous service temperature of 65°C. The heat-distortion temperature of vinyl ester FRP exceeds 110°C, well above realistic outdoor surface temperatures in Saudi Arabia even after accounting for solar gain on dark grating. FRP's coefficient of thermal expansion is approximately one-third that of aluminum, so thermal cycling does not create the gaps and buckling seen in aluminum grating under the same desert conditions. UV-stabilized resin systems and synthetic surfacing veils protect the surface through more than 25 years of Saudi solar exposure.",
  },
  {
    question: "What grating sizes and load ratings are most commonly ordered for Saudi projects?",
    answer:
      "The most common specification for Saudi petrochemical and infrastructure projects is molded FRP grating with 38 × 38 mm mesh, a thickness of 38 or 50 mm, vinyl ester resin, and a concave slip-resistant surface. Standard panel sizes are 1,220 × 3,660 mm (4 × 12 ft) and 1,500 × 4,000 mm. Load ratings of 500 kN/m² for uniformly distributed loads and 4.5 kN for concentrated wheel loads cover most maintenance-vehicle access requirements. Higher-load applications, including pipe-rack support and heavy maintenance access, typically use pultruded FRP grating with a 38 or 50 mm I-bar configuration.",
  },
  {
    question: "Does F1 Composite handle Aramco vendor approval and project documentation?",
    answer:
      "F1 Composite supplies project documentation packages aligned with Aramco SAEP / SAES requirements: Mill Test Certificates per ASTM D790 / D638, third-party test reports for fire and chemical resistance, ISO 9001:2015 quality system certification, country-of-origin certificates, and full traceability from raw material batch to finished grating panel. For Aramco-controlled scopes, we supply through approved Saudi distributors and the project's nominated EPC procurement channel rather than claiming a standalone Aramco vendor code. For SABIC and Maaden work, we support qualification through the procurement route the project specifies.",
  },
  {
    question: "Do you supply FRP grating to Riyadh, or only the Eastern Province coast?",
    answer:
      "Both. The combined heat, salt, and chemical exposure in the Eastern Province — including Dammam, Jubail, Ras Tanura, and Khobar — makes the case for FRP over steel especially strong. Infrastructure and facility projects in Riyadh specify the same vinyl ester grating for its fire rating, slip-resistant surface, and maintenance-free service life. Orders for Riyadh typically ship DAP to the project site through the GCC road network from Jebel Ali, with 1–3 days of inland transit after the container clears the port.",
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
        title="FRP Grating Supplier for Saudi Arabia — Get Quote in 48 Hours"
        description="Factory-direct pricing for Riyadh, Jeddah, Dammam, and Jubail. Submit an RFQ for a response within 48 hours. Aramco, SABIC, and Maaden qualified; ASTM E84 fire-rated and EN 13706 certified. CIF Jebel Ali or DAP delivery to the project site."
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
                priority
              />
            </div>
            <div className="lg:col-span-3">
              <SectionTag>Why Saudi Specifiers Use FRP</SectionTag>
              <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
                Built for the combined service environment of the Saudi East Coast and inland petrochemical complexes
              </h2>
              <p className="mt-[13px] text-f15 leading-golden text-t2">
                Vinyl ester FRP grating is structurally inert to salt-laden coastal air, chemical splash, and 65°C+ surface temperatures — removing the coating and replacement cycles that limit galvanized steel grating to 5–8 years in the same service.
              </p>
              <ul className="mt-[13px] grid grid-cols-2 gap-[8px] text-f13 font-medium text-t2">
                <li className="rounded-[8px] border border-border-default px-[13px] py-[8px]">25-year design life</li>
                <li className="rounded-[8px] border border-border-default px-[13px] py-[8px]">ASTM E84 fire-rated</li>
                <li className="rounded-[8px] border border-border-default px-[13px] py-[8px]">Anti-slip vinyl ester surface</li>
                <li className="rounded-[8px] border border-border-default px-[13px] py-[8px]">Aramco / SABIC / Maaden qualified</li>
              </ul>
              <div className="mt-[21px] rounded-[8px] border-2 border-teal bg-bg2 p-[24px] text-center">
                <p className="text-f15 font-bold text-teal-text">Get Your Saudi Project Quote in 48 Hours</p>
                <p className="mt-[8px] text-t2">Send your grating layout, quantity, and delivery requirements. We&apos;ll return CIF Jebel Ali or DAP pricing with full documentation.</p>
                <Link
                  href="/contact"
                  className="mt-[13px] inline-block rounded-[8px] bg-teal px-[21px] py-[11px] text-f13 font-bold uppercase tracking-wide text-white transition-colors hover:bg-teal-text"
                >
                  Request Quote Now →
                </Link>
                <p className="mt-[8px] text-t3">Typical response: 24-48 hours</p>
              </div>
              <div className="mt-[21px] grid gap-[13px] sm:grid-cols-2 text-f13 leading-golden text-t2">
                <div className="space-y-[13px]">
                  <p>
                    The Eastern Province — Jubail, Ras Tanura, Dammam, Khobar — runs the most aggressive combined-corrosion environment in industrial infrastructure: 50°C+ summers, Gulf salt-laden air, continuous chemical splash. Galvanized steel grating typically needs full replacement every 5–8 years; painted carbon steel needs recoating every 3–5 years.
                  </p>
                  <p>
                    Pultruded FRP grating in vinyl ester resin removes both cycles — structurally inert to salt-laden air, chemical splash, and 65°C surface temperatures. It has been specified on Aramco, SABIC, and Maaden capital projects for well over 15 years; the qualification is established industry-wide.
                  </p>
                </div>
                <div className="space-y-[13px]">
                  <p>
                    Factory-direct pricing from China typically reduces landed cost by 30–50% compared with regional Saudi distributors of US or EU FRP grating, without compromising compliance with applicable standards. F1 Composite ships CIF Jebel Ali or DAP directly to project sites in Jubail, Yanbu, Ras Tanura, Riyadh, and Royal Commission destinations.
                  </p>
                  <p>
                    Project documentation ships as a complete package: Mill Test Certificates per batch, ISO 9001:2015 quality system, ASTM/EN fire and chemical test reports, country-of-origin certificates, and full raw-material-to-panel traceability — aligned with Aramco SAEP review and SABIC project QA.
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
                body: "Jubail, Ras Tanura, Khobar, and Dammam form the primary petrochemical corridor and the toughest combined-corrosion environment on the peninsula. This is where Aramco, SABIC, and Maaden have run vinyl ester FRP grating on capital projects for 15+ years — the standards stack (ASTM E84, EN 13706, SAES-Q-005/S-070) is established here first.",
              },
              {
                city: "Riyadh",
                body: "Inland infrastructure and industrial projects specify the same vinyl ester grating for its fire rating and maintenance-free service life, even without direct coastal salt exposure. Heat and chemical-splash resistance remain the main considerations. Orders ship DAP to the project site through the GCC road network, with 1–3 days of inland transit from Jebel Ali after customs clearance.",
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
                title: "RFQ → Quote in 48 hours",
                body: "Send us a drawing or panel layout, the target quantity, the application and service environment, and your preferred delivery terms. F1 Composite will provide complete FOB, CIF, or DAP pricing with a list of included documents.",
              },
              {
                step: "2",
                title: "Manufacturing — 4–6 weeks",
                body: "Production at one of 5 F1 Composite bases, with batch-traceable Mill Test Certificates and third-party fire/chemical test reports as required.",
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
                <p className="mt-[5px] text-f13 text-t2">Send your RFQ drawings, target quantity, and delivery terms. We&apos;ll respond within 48 hours with complete pricing and documentation.</p>
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
            <LinkArrow href="/products/frp-gratings">Browse all FRP grating products</LinkArrow>
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
              href="/case-studies/chemical-plant-platform"
              className="group rounded-[8px] border border-border-default bg-white p-[21px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
            >
              <h3 className="text-f15 font-bold text-t1">Case Study: Chemical Plant Platform</h3>
              <p className="mt-[5px] text-f13 leading-golden text-t2">FRP grating and structural framing in continuous chemical splash service.</p>
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

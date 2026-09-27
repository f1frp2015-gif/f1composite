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
import { company, supplyTerms, weeks } from "@/content/data/company";
import { blogPostsBySlug } from "@/content/data/blogPosts";
import { blogCover, coverFor, regionCovers } from "@/lib/covers";

const pageTitle =
  "FRP Solar Mounting Australia — Fiberglass Racking Supplier";
const pageDescription =
  "Pultruded FRP solar racking for Australian utility, commercial and rooftop projects: no rust in coastal air, lighter members, AS/NZS 1170.2 wind design.";
const pagePath = "/regions/pultruded-frp-solar-mounting-australia";

const cover = regionCovers[pagePath];

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const faqs = [
  {
    question: "Why specify FRP instead of aluminum for solar mounting in Australia?",
    answer:
      "Three reasons come up most. Coastal sites in NSW, Queensland, WA and Tasmania expose the mounting to salt air, where aluminum 6063 can pit even when anodized and FRP does not corrode. Aluminum rails on steel piles need isolation to avoid galvanic corrosion; FRP forms no galvanic pair. And FRP is about 30% lighter than aluminum 6063 for the same section, which reduces transport and handling weight and the loads on the foundations. FRP is less stiff, so sections are sized for deflection, and outdoor profiles need a UV-stabilized resin with a surfacing veil or coating.",
  },
  {
    question: "Does FRP solar mounting comply with Australian standards (AS/NZS)?",
    answer:
      "Compliance is shown for each project design. Array installations follow AS/NZS 5033, which calls for the structure to be designed for AS/NZS 1170 loads, and wind actions come from AS/NZS 1170.2 for the site's region, including cyclonic regions C and D. The project engineer checks the members and connections against those loads with the material data for the supplied sections; we provide the section properties and test reports. Connection hardware is usually hot-dip galvanized to AS/NZS 4680 or stainless steel.",
  },
  {
    question: "What weight difference does FRP make against aluminum 6063?",
    answer:
      "Pultruded FRP has a density of about 1.9 g/cm³ against 2.70 for aluminum 6063, so an FRP section weighs about 30% less than an aluminum section of the same size. FRP is also less stiff, so the FRP section may need to be deeper to meet the same deflection limit, which narrows the gap. Compare the member weights of both designs for your array layout; we can size the FRP option from your aluminum design.",
  },
  {
    question: "How does FRP perform under Australian UV exposure?",
    answer:
      "Australian UV is among the strongest in the world, so outdoor profiles use UV-stabilized polyester, polyurethane or vinyl ester resin with a synthetic surfacing veil and, where specified, a UV-resistant coating. Without that protection the surface can chalk and expose fibers over time. Weathering and salt-mist results for our PV frame material are published on the evidence page; ask for the reports that match the resin and coating you plan to use.",
  },
  {
    question: "What lead times and ports are typical for Australian solar projects?",
    answer:
      `Sea freight from Shanghai or Ningbo to Sydney, Melbourne, Brisbane, Adelaide, Fremantle or Port Kembla takes 18–28 days. Catalog sections take ${weeks(supplyTerms.catalogLeadTimeWeeks)} to produce, variants on an existing die ${weeks(supplyTerms.existingDieVariantLeadTimeWeeks)}, and a new section ${weeks(supplyTerms.newDieLeadTimeWeeks)} from approved drawing. For multi-megawatt projects, plan container releases with the installation schedule to avoid storage at the port. We quote CIF or DAP to the project staging area.`,
  },
  {
    question: "Is FRP solar mounting cost-competitive with aluminum and galvanized steel?",
    answer:
      "It depends on the site. Per kilogram, FRP costs more than aluminum 6063 and considerably more than galvanized steel. Lighter members can reduce transport, handling and foundation costs, and FRP needs no recoating in coastal air, so the comparison that matters is installed and lifecycle cost for your layout and exposure. FRP makes its strongest case on coastal sites and long design lives; send the array design and we will price the FRP option.",
  },
];

const comparison = [
  { property: "Density (g/cm³)", frp: "1.9", aluminum: "2.70", steel: "7.85" },
  { property: "Tensile strength (MPa)", frp: "240–400", aluminum: "186 (6063-T5)", steel: "400 (A36)" },
  { property: "Elastic modulus (GPa)", frp: "23–28", aluminum: "69", steel: "200" },
  { property: "Thermal expansion (×10⁻⁶/°C)", frp: "8–12", aluminum: "23.4", steel: "11.7" },
  { property: "Coastal salt air", frp: "Does not rust or pit", aluminum: "Can pit over time", steel: "Relies on the zinc coating" },
  { property: "Galvanic pair with steel piles", frp: "None", aluminum: "Needs isolation", steel: "None" },
  { property: "UV exposure", frp: "Needs UV-stabilized resin and a veil or coating", aluminum: "Not affected", steel: "Coating-dependent" },
];

const profiles = [
  { name: "Solar rail (purlin)", size: "80 × 40 or 100 × 50 mm hollow", note: "Module-row support, typically 4–6 m span" },
  { name: "Cross-beam", size: "120 × 60 or 140 × 70 mm I-section", note: "Span between piles, typically 3–5 m" },
  { name: "Tilt strut", size: "60 × 60 or 80 × 80 mm angle", note: "Bracing at the tilt angle" },
  { name: "Rooftop adapter", size: "50 × 50 or 65 × 65 mm hollow", note: "Attachment to seam clamps on commercial roofs" },
];

const steps = [
  {
    title: "RFQ and quote",
    body: `Send the array layout or section list, the wind region, quantities and the delivery port. We reply within ${supplyTerms.responseTime}, then quote FOB, CIF or DAP with a list of included documents.`,
  },
  {
    title: "Production and documents",
    body: `Catalog sections take ${weeks(supplyTerms.catalogLeadTimeWeeks)} and variants on an existing die ${weeks(supplyTerms.existingDieVariantLeadTimeWeeks)}; a new section takes ${weeks(supplyTerms.newDieLeadTimeWeeks)} from approved drawing, including the die. Section properties and material test reports are provided on request.`,
  },
  {
    title: "Sea freight and delivery",
    body: "Sea freight takes 18–28 days to Sydney, Melbourne, Brisbane, Adelaide, Fremantle or Port Kembla. We quote CIF or DAP to the project staging area and plan container releases with your installation schedule.",
  },
];

const quoteHref = "/contact?source=region-pultruded-frp-solar-mounting-australia&inquiry_type=rfq";
const mono = "font-mono text-f12 uppercase tracking-[0.06em] text-t3";

export default function AustraliaSolarPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: pageDescription,
    url: absoluteUrl(pagePath),
    about: {
      "@type": "Thing",
      name: "Pultruded FRP solar mounting structures for Australian solar projects",
    },
    provider: { "@id": "https://www.f1composite.com/#organization" },
  };

  return (
    <>
      <JsonLd data={webPageSchema} />

      <PageHeader
        tag="Australia"
        title="Pultruded FRP solar mounting for Australian projects"
        description="Fiberglass solar rails and mounting profiles for Australian utility, commercial and rooftop solar, in UV-stabilized resin and checked against AS/NZS 1170.2 wind loads for each project. CIF or DAP to the major Australian ports."
        figure={
          <Figure number={1} title="Rooftop solar installation" note={cover.note} bleed>
            <div className="relative aspect-[16/10]">
              <Image src={cover.src} alt={cover.alt} fill sizes="(max-width: 1023px) 94vw, 44vw" className="object-cover" preload />
            </div>
          </Figure>
        }
        actions={{
          primary: { label: "Request an Australia quote", href: quoteHref },
          secondary: { label: "See the comparison", href: "#comparison", variant: "secondary" },
          stickyMobile: true,
        }}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Markets", href: "/regions" },
          { label: "Australia" },
        ]}
      />
      <PageNav items={[{ id: "why", label: "Why FRP" }, { id: "comparison", label: "Comparison" }, { id: "profiles", label: "Profiles" }, { id: "logistics", label: "Logistics" }, { id: "faq", label: "FAQ" }, { id: "evidence", label: "Evidence" }]} />

      <PageSection id="why" title="Why FRP for Australian solar mounting" tone="white">
        <div className="grid gap-[32px] lg:grid-cols-2">
          <div className="space-y-[20px] text-f16 leading-golden text-t2">
            <p>
              Australian utility-scale solar usually mounts on one of two materials:
              galvanized steel inland, where its lower first cost wins, or aluminum 6063
              on coastal sites, where it is lighter but can still pit in chloride-laden
              air and needs isolation from steel piles. Both work; the choice depends on
              exposure, design life and cost.
            </p>
            <p>
              Pultruded FRP is a third option. At about 1.9 g/cm³ it is roughly 30%
              lighter than aluminum for the same section, it does not rust or pit in salt
              air, and it forms no galvanic pair with steel piles. Each project&apos;s
              rails and frames are checked against AS/NZS 1170.2 wind loads for its
              region, including the cyclonic regions C and D.
            </p>
          </div>
          <div className="space-y-[20px] text-f16 leading-golden text-t2">
            <p>
              The cost case depends on the project. Per kilogram, FRP costs more than
              aluminum 6063 and considerably more than galvanized steel. Lighter members
              can reduce transport, handling and foundation loads, and FRP needs no
              recoating in coastal air, so compare installed and lifecycle cost for your
              site. We can price the FRP option against your current design.
            </p>
            <p>
              We supply from FengDu&apos;s {company.production.bases} production bases in
              China, FOB Shanghai or Ningbo, or CIF and DAP, with sea freight of 18–28
              days to Sydney, Melbourne, Brisbane, Adelaide, Fremantle or Port Kembla.
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection id="comparison" title="FRP, aluminum and galvanized steel for solar mounting" intro="Typical material values. Project design uses the data for the actual sections supplied." tone="muted">
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[760px] border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Property</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Pultruded FRP (E-glass / polyester)</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Aluminum 6063-T5</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Galvanized steel</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.property} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className="px-[14px] py-[10px] font-semibold text-t1">{row.property}</th>
                  <td className="px-[14px] py-[10px] leading-golden text-t2">{row.frp}</td>
                  <td className="px-[14px] py-[10px] leading-golden text-t2">{row.aluminum}</td>
                  <td className="px-[14px] py-[10px] leading-golden text-t2">{row.steel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection id="profiles" title="Common solar mounting profiles" intro="Typical starting sections. Each project is sized for its wind region, module layout and support spacing." tone="white">
        <ul className="grid gap-[12px] sm:grid-cols-2 lg:grid-cols-4">
          {profiles.map((item) => (
            <li key={item.name} className="rounded-card border border-border-default bg-bg2 p-[20px]">
              <h3 className="text-f18 font-bold text-t1">{item.name}</h3>
              <p className="mt-[4px] text-f14 font-semibold text-t1">{item.size}</p>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{item.note}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="logistics" title="From FengDu's plants to your Australian site" intro="One quote lists the profiles, freight, delivery terms and the documents included, so the landed cost is known before the order." tone="muted">
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
            <CoverCard href="/case-studies/chongqing-rooftop-pv-frp-rail" cover={coverFor("/case-studies/chongqing-rooftop-pv-frp-rail")!} label={<span className={mono}>Case study</span>} title="Chongqing rooftop PV retrofit" text="Pultruded GFRP H-rail on color steel-tile roofs, installed within the roofs' original load reserve." sizes="(max-width: 767px) 94vw, 390px" />
          </li>
          <li>
            <CoverCard href="/resources/blog/pultruded-frp-offshore-fishery-solar-mounts-and-frames" cover={blogCover(blogPostsBySlug["pultruded-frp-offshore-fishery-solar-mounts-and-frames"])} label={<span className={mono}>Article</span>} title="FRP for offshore, tidal and fishery-PV mounts" text="Where salt water and humidity make pultruded mounts and module frames worth their cost." sizes="(max-width: 767px) 94vw, 390px" />
          </li>
          <li>
            <CoverCard href="/technology/frp-vs-traditional-materials" cover={coverFor("/technology/frp-vs-traditional-materials")!} label={<span className={mono}>Comparison</span>} title="FRP vs steel, aluminum, timber and concrete" text="Weight, corrosion, insulation and stiffness, property by property, with the limits of each." sizes="(max-width: 767px) 94vw, 390px" />
          </li>
        </ul>
      </PageSection>

      <RelatedLinks
        background="white"
        groups={[
          {
            title: "Products",
            links: [
              { href: "/products/frp-solar-mounting-systems", label: "FRP solar mounting systems" },
              { href: "/products/custom-pultruded-profiles", label: "Custom solar mounting profiles" },
              { href: "/products/fiberglass-structural-shapes", label: "Standard FRP structural profiles" },
            ],
          },
          {
            title: "Tools",
            links: [
              { href: "/frp-profile-calculator", label: "FRP profile calculator" },
              { href: "/ai/sourcing", label: "Free FRP sourcing assistant" },
            ],
          },
          {
            title: "Guides",
            links: [
              { href: "/applications/frp-solar-mounting-profiles", label: "FRP solar support design" },
              { href: "/industries/energy", label: "FRP for the energy industry" },
              { href: "/resources/blog/frp-profile-cost-benchmarks-and-lead-times-2026", label: "2026 FRP cost benchmarks" },
            ],
          },
          {
            title: "Other markets",
            links: [
              { href: "/regions/frp-pultrusion-supplier-usa", label: "Sourcing FRP for US projects" },
            ],
          },
        ]}
      />

      <InnerCTA
        title="Request a CIF quote for FRP solar mounting delivered to an Australian port"
        quoteHref={quoteHref}
        text="Send the array layout or section list, the wind region, quantities and the delivery port."
        links={[{ label: "FRP profile calculator", href: "/frp-profile-calculator" }]}
      />
    </>
  );
}

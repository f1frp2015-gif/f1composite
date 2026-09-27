import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ProductRfq from "@/components/products/ProductRfq";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import { FAQList } from "@/components/ui/FAQ";
import Figure from "@/components/ui/Figure";
import { doorThresholds as page } from "@/content/data/doorThresholds";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";
import { buildRfqHref } from "@/lib/rfq";

export const metadata: Metadata = buildPageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
  image: page.socialImage,
});

const quote = buildRfqHref({
  source: "door-thresholds",
  product: "F1 Fiberglass Door Thresholds",
  productPath: page.path,
  message: page.message,
});

const roles = [
  ["Material role", "A composite base that can help reduce heat conduction through the sill."],
  ["System role", "An interface between the door frame, seals, drainage and supported floor edge."],
  ["Supply role", "Profile lengths and agreed machining for your fabrication process."],
] as const;

const sillSteps = [
  ["Match the frame", "Check jamb feet, corners, end blocks and seal compression against mating drawings."],
  ["Plan the water path", "Coordinate exterior fall, outlets, end sealing and the sill-to-building interface."],
  ["Support the loads", "Define bearing beneath the threshold, fixings and concentrated loads from tracks or traffic."],
  ["Verify the assembly", "Review thermal, air, water and access requirements for the proposed door and installation."],
] as const;

// The drawing checklist, grouped into the quote block's four items.
const [operation, dimensions, interfaces, loads, drainage, finish, order] = page.checklist;
const requestItems = [
  { title: "Door and section", text: `${operation}; ${dimensions.toLowerCase()}.` },
  { title: "Interfaces", text: `${interfaces}.` },
  { title: "Loads and water", text: `${loads}; ${drainage.toLowerCase()}.` },
  { title: "Finish and supply", text: `${finish}; ${order.toLowerCase()}.` },
];

export default function DoorThresholdsPage() {
  return (
    <>
      <JsonLd data={buildProductFamilyPageSchema({
        name: page.h1,
        description: page.description,
        path: page.path,
        image: page.image,
        category: "Windows & Doors",
        material: "Pultruded glass-fiber-reinforced polymer (FRP / GRP)",
        schemaType: "ItemPage",
      })} />
      <PageHeader
        tag="Door thresholds"
        line={{ name: "F1-THERM", label: "Door thresholds" }}
        title={page.h1}
        description={page.intro}
        facts={[
          { label: "Sill sections", value: `${page.profileVariants.length} configurations` },
          { label: "Base", value: "Closed or hooked" },
          { label: "Door swing", value: "Inward or outward" },
          { label: "Supply", value: "Lengths, machining" },
        ]}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products/product-lines" },
          { label: "Windows & Doors", href: "/products/frp-window-frames" },
          { label: "Fiberglass Door Thresholds" },
        ]}
        actions={{
          primary: { label: "Request a threshold quote", href: quote },
          secondary: { label: "Compare the sections", href: "#configurations", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <Figure number={1} title="Threshold profile" note="Profile illustration" caption="Dimensions, wall thicknesses and mating interfaces are confirmed on the approved section drawing.">
            <Image src={page.image} alt={page.profileVariants[3].alt} width={1440} height={1098} sizes="(max-width: 1023px) 90vw, 42vw" preload className="h-auto w-full bg-white" />
          </Figure>
        }
      />

      <PageNav
        items={[
          { id: "threshold-design", label: "Overview" },
          { id: "configurations", label: "Sections", count: page.profileVariants.length },
          { id: "applications", label: "Applications" },
          { id: "sill", label: "Sill connection" },
          { id: "specification", label: "Specification" },
          { id: "faq", label: "FAQ" },
          { id: "quote", label: "Quote" },
        ]}
      />

      <PageSection id="threshold-design" title="The base of a well-detailed door">
        <div className="grid grid-cols-1 items-start gap-[28px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-[48px]">
          <div>
            <p className="text-f18 leading-golden text-t1">
              Continuous glass reinforcement and resin form a constant-section sill profile. Hollow chambers, support webs and mating features can be developed around the opening rather than selected as an unrelated trim piece.
            </p>
            <Link href="/products/custom-pultruded-profiles" className="mt-[16px] inline-block text-f14 font-semibold text-teal-text underline underline-offset-4 hover:text-teal">
              Explore custom profile development
            </Link>
          </div>
          <dl className="divide-y divide-border-default border-y border-border-default">
            {roles.map(([title, body]) => (
              <div key={title} className="py-[12px]">
                <dt className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{title}</dt>
                <dd className="mt-[4px] text-f16 leading-golden text-t1">{body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </PageSection>

      <PageSection
        id="configurations"
        title="Four continuous sill sections"
        tone="muted"
        intro="Compare closed and hooked bases for inward- and outward-opening door layouts. Each profile has a constant cross-section: chambers, steps and ribs run along its full length. Final selection depends on the mating frame and installation drawing."
      >
        <div className="grid grid-cols-1 gap-[16px] md:grid-cols-2">
          {page.profileVariants.map((item, index) => (
            <Figure key={item.id} number={index + 2} title={item.title} note="Section option">
              <a href={item.image} aria-label={`View full-size ${item.title.toLowerCase()} profile`}>
                <Image src={item.image} alt={item.alt} width={1440} height={1098} sizes="(max-width: 768px) 100vw, (max-width: 1320px) 50vw, 624px" className="h-auto w-full bg-white object-contain" />
              </a>
              <p className="mt-[12px] text-f14 leading-golden text-t2">{item.body}</p>
            </Figure>
          ))}
        </div>
        <p className="mt-[16px] text-f14 leading-golden text-t3">Illustrative section options. Seals, end blocks and other assembly components are specified separately.</p>
      </PageSection>

      <PageSection id="applications" title="Choose the opening before the section">
        <div className="grid grid-cols-1 gap-[16px] lg:grid-cols-3">
          {page.applications.map((item, index) => (
            <article key={item.title} className="flex flex-col rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
              <span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Opening {index + 1} · {item.tag}</span>
              <h3 className="mt-[6px] text-f20 font-bold leading-tight text-t1">{item.title}</h3>
              <p className="mt-[10px] flex-1 text-f14 leading-golden text-t2">{item.body}</p>
              <p className="mt-[16px] border-t border-border-default pt-[12px] text-f14 leading-golden text-t1">{item.inputs}</p>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection id="sill" title="Detail the whole sill connection" tone="muted" intro="A fiberglass threshold works as part of the door assembly. Develop the section together with the frame and installation detail so the sealing, drainage and load paths remain continuous at the bottom of the opening.">
        <div className="grid grid-cols-1 items-start gap-[24px] lg:grid-cols-2 lg:gap-[48px]">
          <ol className="grid grid-cols-1 gap-[12px] sm:grid-cols-2">
            {sillSteps.map(([title, body], index) => (
              <li key={title} className="rounded-card border border-border-default bg-white p-[20px]">
                <span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Step {index + 1}</span>
                <h3 className="mt-[4px] text-f16 font-bold text-t1">{title}</h3>
                <p className="mt-[6px] text-f14 leading-golden text-t2">{body}</p>
              </li>
            ))}
          </ol>
          <Figure
            number={page.profileVariants.length + 2}
            title="Garden door opening"
            note="Illustrative photo"
            caption={<>Application context; the pictured doors are not an F1 installation. Photo by <a href="https://unsplash.com/photos/open-glass-doors-reveal-a-lush-green-courtyard-garden-4_Dzj4pqbcg" className="underline underline-offset-2">强 任 / Unsplash</a>, used under the <a href="https://unsplash.com/license" className="underline underline-offset-2">Unsplash License</a>.</>}
            bleed
          >
            <div className="relative aspect-[4/3]">
              <Image src="/images/products/door-thresholds/garden-door-opening-application.webp" alt="Glazed doors opening from an interior to a planted courtyard" fill sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover" />
            </div>
          </Figure>
        </div>
      </PageSection>

      <PageSection id="specification" title="Specify your F1 threshold" intro={page.scope}>
        <div className="max-w-[820px] rounded-card border border-border-default bg-bg2 p-[20px] sm:p-[24px]">
          <h3 className="text-f18 font-bold text-t1">From drawing to repeat supply</h3>
          <p className="mt-[8px] text-f16 leading-golden text-t2">Start with the mating section and purchase requirements. F1 reviews tooling and material selection, agrees the sample inspection criteria, then confirms the production and delivery scope in the quotation.</p>
          <p className="mt-[8px] text-f14 leading-golden text-t2">Confirm the required laminate data and door-system evidence during development. Performance of a complete door cannot be inferred from a threshold profile alone.</p>
        </div>
      </PageSection>

      <PageSection id="faq" title="Fiberglass door threshold questions" tone="muted">
        <FAQList items={[...page.faq]} />
      </PageSection>

      <RelatedLinks
        background="white"
        title="Continue with the matching product or tool"
        groups={[
          { title: "Windows & doors", links: [
            { label: "Window & door profiles for fabricators", href: "/products/window-door-profiles" },
            { label: "FRP door frame profiles for jambs & heads", href: "/products/frp-door-frames" },
            { label: "Finished fiberglass windows & doors", href: "/products/fiberglass-windows-doors" },
          ] },
          { title: "Profiles and tools", links: [
            { label: "Pultruded FRP profiles overview", href: "/pultruded-frp-profiles" },
            { label: "FRP density & weight-per-metre calculator", href: "/frp-density-calculator" },
          ] },
        ]}
      />

      <PageSection id="quote" title="Send these details with your drawing" tone="deep">
        <ProductRfq product="fiberglass door thresholds" productPath={page.path} quoteHref={quote} items={requestItems} intro="Send the mating frame section, the threshold dimensions and interfaces, the loads and drainage, and the supply details." />
      </PageSection>
    </>
  );
}

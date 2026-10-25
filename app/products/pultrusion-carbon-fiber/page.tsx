import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ProductRfq from "@/components/products/ProductRfq";
import CollectionSchema from "@/components/seo/CollectionSchema";
import Button from "@/components/ui/Button";
import CoverCard from "@/components/ui/CoverCard";
import Figure from "@/components/ui/Figure";
import { FAQList } from "@/components/ui/FAQ";
import { carbonProfileFormats, carbonProcessSteps, carbonRfqItems, carbonPultrusionFaqs, carbonPultrusionPath } from "@/content/data/carbonFiberPultrusion";
import { buildPageMetadata } from "@/lib/seo";
import { buildRfqHref } from "@/lib/rfq";

const title = "Pultrusion Carbon Fiber: Plates, Tubes & Rods";
const description = "Explore carbon fiber pultrusion for plates, strips, tubes and rods. Compare profiles, applications and custom specifications with F1 Composite.";

export const metadata: Metadata = buildPageMetadata({
  title, description, path: carbonPultrusionPath,
  image: "/products/pultrusion-carbon-fiber/opengraph-image",
});

const quoteHref = buildRfqHref({
  source: "pultrusion-carbon-fiber", product: "Pultruded carbon fiber profiles", productPath: carbonPultrusionPath,
  message: "Please review my carbon fiber pultrusion project.\nProfile: plate / strip / tube / rod / custom\nSection and tolerances (with units):\nCut length and quantity:\nApplication, loads, span and connections:\nFiber, resin and service conditions:\nInspection and test requirements:\nDestination and delivery date:",
});
const linkStyle = "font-semibold text-teal-text underline underline-offset-4 hover:text-teal";

export default function CarbonFiberPultrusionPage() {
  return (
    <>
      <CollectionSchema name={title} description={description} path={carbonPultrusionPath} links={carbonProfileFormats.map((format) => ({ label: format.name, href: `${carbonPultrusionPath}#${format.id}` }))} />
      <PageHeader
        tag="Carbon fiber pultrusion"
        title="Pultrusion carbon fiber: plates, tubes & rods"
        description="Continuous carbon fibers. A constant cross-section. A profile built around your load path. Explore pultruded CFRP plates, strips, tubes and solid rods for lightweight, stiffness-driven components."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products/product-lines" }, { label: "Carbon fiber pultrusion" }]}
        facts={[{ label: "Material", value: "Carbon fiber / CFRP" }, { label: "Formats", value: "Plates · tubes · rods" }, { label: "Geometry", value: "Constant section" }, { label: "Supply", value: "Drawing-led review" }]}
        actions={{ primary: { label: "Request a carbon profile quote", href: quoteHref }, secondary: { label: "Explore the profiles", href: "#profiles", variant: "secondary" }, stickyMobile: true }}
        figure={<Figure number={1} title="One process, different profiles" note="Profile illustration" bleed caption="Flat laminates, hollow tubes and solid rods. Illustrations show profile forms, not stock sizes."><Image src="/images/products/pultrusion-carbon-fiber/profile-family.svg" alt="Illustrated family of pultruded carbon fiber plates, hollow tubes and solid rods" width={1200} height={900} preload sizes="(max-width: 1023px) 94vw, 44vw" className="h-auto w-full" /></Figure>}
      />
      <PageNav items={[{ id: "profiles", label: "Profiles" }, { id: "process", label: "Process" }, { id: "selection", label: "Material selection" }, { id: "applications", label: "Applications" }, { id: "faq", label: "FAQ" }, { id: "quote", label: "Quote" }]} />

      <PageSection id="profiles" title="Choose your pultruded carbon fiber profile" intro="Carbon fiber pultrusion combines continuous reinforcement with a resin matrix in a heated die. The process suits long, straight profiles with a consistent cross-section; the main reinforcement typically runs along their length.">
        <div className="grid gap-[20px] md:grid-cols-3">
          {carbonProfileFormats.map((format) => <CoverCard key={format.id} href={`#${format.id}`} cover={{ src: format.image, alt: format.alt, note: "Profile illustration", fit: "contain" }} title={format.name} text={format.summary} facts={[format.geometry]} action={`Explore ${format.shortName.toLowerCase()}`} />)}
        </div>
        <p className="mt-[20px] text-f16 leading-relaxed text-t2">Need a different section? <Link href="/products/custom-pultruded-profiles" className={linkStyle}>Discuss a custom carbon fiber profile</Link> with the drawing, material requirements and annual volume.</p>
      </PageSection>

      {carbonProfileFormats.map((format, index) => (
        <PageSection key={format.id} id={format.id} title={format.name} tone={index % 2 === 0 ? "muted" : "white"}>
          <div className="grid items-start gap-[28px] lg:grid-cols-2 lg:gap-[48px]">
            <Figure number={index + 2} title={format.shortName} note="Profile illustration" bleed caption={format.geometry}><Image src={format.image} alt={format.alt} width={900} height={600} sizes="(max-width: 1023px) 94vw, 44vw" className="h-auto w-full" /></Figure>
            <div className="space-y-[18px] text-f16 leading-relaxed text-t2">
              <p>{format.detail}</p>
              <div className="rounded-card border border-border-default bg-white p-[20px]"><h3 className="text-f18 font-bold text-t1">What to specify</h3><p className="mt-[8px]">{format.checks}</p></div>
              <ul className="space-y-[10px]">{format.links.map((link) => <li key={link.href}><Link href={link.href} className={linkStyle}>{link.label} <span aria-hidden>→</span></Link></li>)}</ul>
              <Button href={buildRfqHref({ source: `carbon-pultrusion-${format.id}`, product: format.name, productPath: `${carbonPultrusionPath}#${format.id}`, message: `Please review ${format.name.toLowerCase()} for my project.\n${format.geometry} (with units and tolerances):\nQuantity:\nApplication, loads and connections:\nMaterial and inspection requirements:\nDestination and delivery date:` })}>Request {format.shortName.toLowerCase()}</Button>
            </div>
          </div>
        </PageSection>
      ))}

      <PageSection id="process" title="How carbon fiber pultrusion works" intro="The profile is pulled through the line continuously. Fiber alignment, resin wet-out and cure control work together to establish the finished laminate.">
        <Figure number={5} title="From carbon tow to finished profile" note="Process schematic" bleed><Image src="/images/products/pultrusion-carbon-fiber/process.svg" alt="Carbon fiber pultrusion sequence: tow alignment, resin impregnation, heated die, puller and cut to length" width={1400} height={500} sizes="94vw" className="h-auto w-full" /></Figure>
        <ol className="mt-[24px] grid gap-[16px] sm:grid-cols-2 lg:grid-cols-5">{carbonProcessSteps.map((step, i) => <li key={step.title} className="border-t-2 border-teal pt-[16px]"><span className="font-mono text-f12 text-teal-text">0{i + 1}</span><h3 className="mt-[6px] text-f18 font-bold text-t1">{step.title}</h3><p className="mt-[8px] text-f14 leading-relaxed text-t2">{step.text}</p></li>)}</ol>
        <p className="mt-[24px] text-f16"><Link href="/technology/pultrusion-process" className={linkStyle}>Explore the pultrusion process</Link>{" · "}<Link href="/technology/pultrusion-vs-extrusion-filament-winding" className={linkStyle}>Compare manufacturing methods</Link></p>
      </PageSection>

      <PageSection id="selection" title="Choose the fiber architecture for the job" tone="muted" intro="Longitudinal stiffness is only part of the specification. Review the direction of every load and how it enters the component.">
        <div className="grid gap-[20px] md:grid-cols-3">
          {[
            { title: "Axial and bending loads", text: "Mainly longitudinal carbon fibers can support stiffness-driven designs with low moving mass. Finished-part properties still depend on the fiber grade, resin, fiber content and section geometry." },
            { title: "Torque and transverse loads", text: "A mainly unidirectional profile needs separate checks for shear, hoop loading and local bearing. Off-axis reinforcement, pull-winding or a wrapped laminate may better suit these loads." },
            { title: "Connections and exposure", text: "Specify bonded joints, inserts and clamps early. Carbon is electrically conductive; review electrical isolation and metal interfaces in wet service, together with resin, temperature and UV requirements." },
          ].map((item) => <article key={item.title} className="rounded-card border border-border-default bg-white p-[24px]"><h3 className="text-f20 font-bold text-t1">{item.title}</h3><p className="mt-[12px] text-f16 leading-relaxed text-t2">{item.text}</p></article>)}
        </div>
        <p className="mt-[24px] text-f16 leading-relaxed text-t2">Comparing carbon with glass fiber? Review <Link href="/pultruded-frp-profiles" className={linkStyle}>pultruded fiberglass profiles</Link> when cost or electrical insulation drives the design. Compare actual laminate data and the complete assembly against the same service requirements.</p>
      </PageSection>

      <PageSection id="applications" title="From flat reinforcement to moving components" intro="Follow the application to its section, interfaces and qualification requirements.">
        <div className="grid items-start gap-[28px] lg:grid-cols-2 lg:gap-[48px]">
          <Figure number={6} title="Carbon fiber wind-blade laminates" note="Representative supplier image" bleed caption="Existing carbon panel imagery from the F1 wind-blade range. Grade and project qualification are specified separately."><Image src="/images/products/wind-turbine-blade-panels/pultruded-carbon-fiber-wind-blade-panel.webp" alt="Straight and coiled pultruded carbon fiber panels for wind turbine blade programs" width={605} height={209} sizes="(max-width: 1023px) 94vw, 44vw" className="h-auto w-full" /></Figure>
          <div className="grid gap-[16px]">
            {[
              { title: "Wind-blade spar caps", text: "Specify the laminate, bonding surface and fatigue qualification as a single material program.", href: "/products/wind-turbine-blade-panels" },
              { title: "Bonded strengthening strips", text: "Review the strip together with the adhesive, substrate and load transfer at its ends.", href: "/products/pultruded-cfrp-strengthening-strips" },
              { title: "Robotic beams and struts", text: "Balance moving mass and stiffness with joint loads and the working cycle.", href: "/products/carbon-fiber-robotic-beams" },
              { title: "Industrial roller tubes", text: "Define runout, end fittings and operating speed; the laminate and manufacturing route follow the duty.", href: "/products/carbon-fiber-roller-tubes" },
            ].map((item) => <Link key={item.href} href={item.href} className="rounded-card border border-border-default p-[20px] transition-colors hover:border-teal-border"><h3 className="text-f18 font-bold text-teal-text">{item.title} <span aria-hidden>→</span></h3><p className="mt-[6px] text-f14 leading-relaxed text-t2">{item.text}</p></Link>)}
          </div>
        </div>
      </PageSection>

      <PageSection id="faq" title="Carbon fiber pultrusion: common questions" tone="muted"><FAQList items={carbonPultrusionFaqs} /></PageSection>
      <PageSection id="quote" title="Start with the section. Build the specification together." tone="deep"><ProductRfq product="Pultruded carbon fiber profiles" productPath={carbonPultrusionPath} quoteHref={quoteHref} items={carbonRfqItems} intro="Send your plate, tube, rod or custom profile drawing. F1 Composite will review the material, tooling, inspection and delivery requirements for a project quotation." links={[{ label: "Custom profile development", href: "/products/custom-pultruded-profiles" }]} /></PageSection>
    </>
  );
}

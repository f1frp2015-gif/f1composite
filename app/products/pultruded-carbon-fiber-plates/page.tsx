import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ProductRfq from "@/components/products/ProductRfq";
import JsonLd from "@/components/seo/JsonLd";
import CoverCard from "@/components/ui/CoverCard";
import { FAQList } from "@/components/ui/FAQ";
import Figure from "@/components/ui/Figure";
import { carbonPlateApplications, carbonPlateFaqs, carbonPlateRfqItems, carbonPlateSpecifications } from "@/content/data/carbonFiberPlates";
import { carbonProfileLinks } from "@/content/data/carbonFiberPultrusion";
import { coverFor } from "@/lib/covers";
import { buildRfqHref } from "@/lib/rfq";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pagePath = "/products/pultruded-carbon-fiber-plates";
const pageTitle = "Pultruded Carbon Fiber Plates | CFRP Strips & Flat Bars";
const pageDescription = "Pultruded carbon fiber plates, strips and flat bars for bonded reinforcement and lightweight stiffeners. Specify dimensions and surfaces with F1 Composite.";
const imageRoot = "/images/products/carbon-fiber-plates";
const linkStyle = "font-semibold text-teal-text underline underline-offset-4 hover:text-teal";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle, description: pageDescription, path: pagePath,
  image: "/products/pultruded-carbon-fiber-plates/opengraph-image",
});

const quoteHref = buildRfqHref({
  source: "pultruded-carbon-fiber-plates", product: "Pultruded carbon fiber plates", productPath: pagePath,
  message: "Please review my pultruded carbon fiber plate requirements.\nWidth × thickness × cut length (with units):\nTolerances and quantity:\nApplication, span, load direction and deflection limit:\nFiber / resin requirements and service environment:\nBonding face, adhesive / substrate, holes and edge finish:\nInspection and test requirements:\nDestination and target delivery date:",
});

export default function PultrudedCarbonFiberPlatesPage() {
  return (
    <>
      <JsonLd data={buildProductFamilyPageSchema({
        name: "Pultruded Carbon Fiber Plates", description: pageDescription, path: pagePath,
        image: `${imageRoot}/pultruded-carbon-fiber-plates.svg`,
        category: "Pultruded carbon fiber plates, strips and flat bars", material: "Carbon fiber reinforced polymer (CFRP)",
        productLine: "F1-FORM", dateModified: "2026-10-25",
      })} />
      <PageHeader
        tag="Carbon fiber plates"
        line={{ name: "F1-FORM", label: "Plates & flat strips" }}
        title="Pultruded carbon fiber plates"
        description="Continuous fibers. A flat bonding face. Longitudinal stiffness for reinforcement and lightweight components. Develop CFRP plates, strips and flat bars around your dimensions, load path and surface requirements."
        updated="2026-10-25"
        facts={[{ label: "Section", value: "Flat & constant" }, { label: "Main fibers", value: "Longitudinal" }, { label: "Dimensions", value: "Width × thickness × length" }, { label: "Supply", value: "To drawing" }]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products/product-lines" }, { label: "Carbon fiber pultrusion", href: "/products/pultrusion-carbon-fiber" }, { label: "Carbon fiber plates" }]}
        actions={{ primary: { label: "Request a plate quote", href: quoteHref }, secondary: { label: "Plan your specification", href: "#specifications", variant: "secondary" }, stickyMobile: true }}
        figure={<Figure number={1} title="Plates, strips & flat bars" note="Profile illustration" bleed caption="Flat CFRP profiles with lengthwise reinforcement. Illustrative sections; dimensions are reviewed to your drawing."><Image src={`${imageRoot}/pultruded-carbon-fiber-plates.svg`} alt="Pultruded carbon fiber plates and narrow flat strips with longitudinal reinforcement" width={1200} height={900} preload sizes="(max-width: 1023px) 94vw, 44vw" className="h-auto w-full" /></Figure>}
      />
      <PageNav items={[{ id: "overview", label: "Product forms" }, { id: "specifications", label: "Specifications" }, { id: "construction", label: "Plate vs sheet" }, { id: "applications", label: "Applications" }, { id: "related", label: "Carbon profiles" }, { id: "faq", label: "FAQ" }, { id: "quote", label: "Quote" }]} />

      <PageSection id="overview" title="One flat section, several ways to use it" intro="A pultruded carbon fiber plate is a continuous, constant-section profile. Carbon tow is aligned, impregnated with resin, cured in a heated die, then pulled and cut to length.">
        <div className="grid gap-[20px] md:grid-cols-3">
          {[
            { title: "Plates & laminates", text: "Flat reinforcement with a defined width and thickness. A broad face provides space for a designed adhesive interface." },
            { title: "Narrow strips", text: "Slender reinforcement for bonded stiffeners and spar elements. Specify the working direction, bond area and end details." },
            { title: "Flat bars", text: "Rectangular solid sections for straight components. The orientation of the section strongly affects bending stiffness." },
          ].map((item, index) => <article key={item.title} className="rounded-card border border-border-default bg-bg2 p-[24px]"><p className="font-mono text-f12 text-teal-text">0{index + 1} / FLAT CFRP</p><h3 className="mt-[12px] text-f20 font-bold text-t1">{item.title}</h3><p className="mt-[10px] text-f16 leading-relaxed text-t2">{item.text}</p></article>)}
        </div>
        <p className="mt-[20px] text-f16 leading-relaxed text-t2">Names such as plate, strip and flat bar can overlap. The drawing establishes the product. <Link href="/technology/pultrusion-process" className={linkStyle}>See how the pultrusion process controls the section</Link>.</p>
      </PageSection>

      <PageSection id="specifications" title="Specify the section and the surface" tone="muted" intro="Start with width × thickness × cut length. Add the dimensional controls and interface details that make the plate work in your assembly.">
        <div className="grid items-start gap-[28px] lg:grid-cols-2 lg:gap-[40px]">
          <div className="space-y-[20px]">
            <Figure number={2} title="Read the plate drawing" note="Dimension schematic" bleed caption="Width and thickness define the section; length follows the main reinforcement direction. Identify the face that will be bonded."><Image src={`${imageRoot}/plate-dimensions-fiber-direction.svg`} alt="Carbon fiber plate showing width, thickness, length, bonding face and longitudinal fiber direction" width={1200} height={700} sizes="(max-width: 1023px) 94vw, 44vw" className="h-auto w-full" /></Figure>
            <p className="text-f16 leading-relaxed text-t2">F1 reviews the requested geometry, material and tooling before confirming supply. Mechanical properties, available sizes, minimum order and lead time follow the proposed configuration.</p>
          </div>
          <dl className="divide-y divide-border-default rounded-card border border-border-default bg-white px-[20px] sm:px-[24px]">
            {carbonPlateSpecifications.map(([label, value]) => <div key={label} className="py-[18px]"><dt className="text-f16 font-bold text-t1">{label}</dt><dd className="mt-[6px] text-f14 leading-relaxed text-t2">{value}</dd></div>)}
          </dl>
        </div>
      </PageSection>

      <PageSection id="construction" title="Pultruded plates vs. multidirectional sheets" intro="Choose by reinforcement direction and component geometry. A black surface or woven finish does not establish the structural layup.">
        <Figure number={3} title="Two routes to a flat carbon composite" note="Construction schematic" bleed caption="The laminate on the right shows an example of selected ply directions. Actual layups and properties are specified for each product."><Image src={`${imageRoot}/pultruded-plate-vs-laminate.svg`} alt="Comparison of a pultruded flat profile with continuous longitudinal fibers and a laminated sheet with illustrative angled plies" width={1200} height={700} sizes="94vw" className="h-auto w-full" /></Figure>
        <div className="mt-[24px] grid gap-[24px] md:grid-cols-2">
          <div className="border-t-2 border-teal pt-[16px]"><h3 className="text-f20 font-bold text-t1">Pultruded plates & strips</h3><p className="mt-[10px] text-f16 leading-relaxed text-t2">A useful starting point for long, straight reinforcement with the main load along the fibers. Review transverse loading, local bearing, torsion and connections separately from longitudinal performance.</p></div>
          <div className="border-t-2 border-teal pt-[16px]"><h3 className="text-f20 font-bold text-t1">Laminated sheets & panels</h3><p className="mt-[10px] text-f16 leading-relaxed text-t2">Selected ply angles can address loads in several directions across a panel. For broad machined parts, bolt patterns or complex load paths, include the layup and finished geometry in the material review.</p></div>
        </div>
      </PageSection>

      <PageSection id="applications" title="From spar-cap laminates to bonded stiffeners" tone="muted" intro="Match the plate to the complete component, including its bond line, supports and service conditions.">
        <div className="grid items-start gap-[28px] lg:grid-cols-2 lg:gap-[40px]">
          <div className="space-y-[24px]">
            <Figure number={4} title="Carbon laminates for wind-blade programs" note="Representative supplier image" bleed caption="Straight and coiled carbon laminates from the existing wind-blade range. Supply format and grade depend on the agreed program."><Image src="/images/products/wind-turbine-blade-panels/pultruded-carbon-fiber-wind-blade-panel.webp" alt="Straight and coiled pultruded carbon fiber laminates for wind-blade reinforcement" width={605} height={209} sizes="(max-width: 1023px) 94vw, 44vw" className="h-auto w-full" /></Figure>
            <div className="rounded-card bg-deep p-[24px] sm:p-[32px]"><h3 className="text-f24 font-bold text-white">Design the bond with the plate</h3><p className="mt-[12px] text-f16 leading-relaxed text-white/80">Define the substrate, adhesive, surface preparation, bond length and end load transfer. Agree the supplied face condition before ordering, then qualify the assembled joint for its loads and environment.</p><Link href="/technology/frp-profile-machining" className="mt-[16px] inline-block text-f14 font-semibold text-white underline underline-offset-4 hover:text-teal">Discuss cutting, holes and edge details →</Link></div>
          </div>
          <div className="space-y-[16px]">{carbonPlateApplications.map((item) => <article key={item.title} className="rounded-card border border-border-default bg-white p-[24px]"><h3 className="text-f20 font-bold text-t1">{item.title}</h3><p className="mt-[10px] text-f16 leading-relaxed text-t2">{item.text}</p><Link href={item.href} className={`mt-[14px] inline-block text-f14 ${linkStyle}`}>{item.label} →</Link></article>)}</div>
        </div>
        <p className="mt-[24px] max-w-[900px] text-f14 leading-relaxed text-t2">Carbon fibers are electrically conductive. Include electrical isolation and wet metal interfaces in the design review, alongside temperature, chemical exposure and surface protection.</p>
      </PageSection>

      <PageSection id="related" title="Explore the carbon fiber profile family" intro="Compare flat plates with hollow tubes and solid rods, or return to the pultrusion overview to select a profile.">
        <div className="grid gap-[20px] md:grid-cols-3">{carbonProfileLinks.filter((item) => item.href !== pagePath).map((item) => <CoverCard key={item.href} href={item.href} cover={coverFor(item.href)!} title={item.label} text={item.description} action="Explore product details" />)}</div>
      </PageSection>
      <PageSection id="faq" title="Pultruded carbon fiber plate questions" tone="muted"><FAQList items={[...carbonPlateFaqs]} /></PageSection>
      <PageSection id="quote" title="Send your plate dimensions and application" tone="deep"><ProductRfq product="Pultruded carbon fiber plates" productPath={pagePath} quoteHref={quoteHref} quoteLabel="Request a plate quote" intro="Share your width, thickness, cut length and quantity, with a drawing or application brief. Include the bonding face and any finished-part machining." items={carbonPlateRfqItems} /></PageSection>
    </>
  );
}

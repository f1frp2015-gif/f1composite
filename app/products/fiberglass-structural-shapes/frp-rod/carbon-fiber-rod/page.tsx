import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import ProductPageNav from "@/components/products/ProductPageNav";
import ProductRfq from "@/components/products/ProductRfq";
import ProductSection from "@/components/products/ProductSection";
import RelatedLinks from "@/components/sections/RelatedLinks";
import FAQDisclosure from "@/components/ui/FAQDisclosure";
import { carbonFiberRod as page } from "@/content/data/carbonFiberRod";
import { carbonProfileLinks } from "@/content/data/carbonFiberPultrusion";
import { buildRfqHref } from "@/lib/rfq";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
  image: `${page.path}/opengraph-image`,
});

const quoteHref = buildRfqHref({ source: "carbon-fiber-rod", product: "Solid pultruded carbon fiber rod", productPath: page.path });

export default function CarbonFiberRodPage() {
  return (
    <>
      <JsonLd data={buildProductFamilyPageSchema({
        name: "Solid pultruded carbon fiber rods",
        description: page.description,
        path: page.path,
        image: page.image,
        category: "Solid composite rods",
        material: "Carbon-fiber-reinforced polymer (CFRP)",
        dateModified: page.updated,
      })} />
      <PageHeader
        tag="Solid rods · Carbon fiber"
        title="Carbon fiber rods"
        description="Solid pultruded carbon fiber rods for lightweight linkages, stiffeners and fabricated components. Specify a CFRP round bar by diameter, cut length, fiber and resin requirements, then send your drawing to F1 Composite for a project quotation."
        updated={page.updated}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products/product-lines" },
          { label: "Solid rods", href: page.parentPath },
          { label: "Carbon fiber rods" },
        ]}
        facts={[
          { label: "Section", value: "Solid round bar" },
          { label: "Reinforcement", value: "Carbon fiber" },
          { label: "Process", value: "Pultrusion" },
          { label: "Supply", value: "Project quotation" },
        ]}
        actions={{ primary: { label: "Quote carbon fiber rods", href: quoteHref }, secondary: { label: "Specify a size", href: "#sizes", variant: "secondary" }, stickyMobile: true }}
        figure={
          <figure className="overflow-hidden rounded-card border border-border-default bg-white">
            <Image src={page.image} alt="Illustration of solid carbon fiber round rods with longitudinal reinforcement and filled circular ends" width={1200} height={800} sizes="(min-width: 1024px) 45vw, 100vw" preload className="h-auto w-full" />
            <figcaption className="border-t border-border-default px-[16px] py-[12px] text-f12 leading-relaxed text-t3">Section illustration. Dimensions and surface finish are agreed with the product drawing.</figcaption>
          </figure>
        }
      />
      <ProductPageNav items={[
        { id: "overview", label: "Overview" },
        { id: "sizes", label: "Sizes & specification" },
        { id: "comparison", label: "Carbon vs glass" },
        { id: "applications", label: "Applications" },
        { id: "faq", label: "FAQ" },
        { id: "quote", label: "Quote" },
      ]} />

      <ProductSection id="overview" title="Solid pultruded carbon fiber round bars">
        <div className="grid gap-[28px] lg:grid-cols-2">
          <div className="space-y-[14px] text-f16 leading-relaxed text-t2">
            <p>A carbon fiber rod combines continuous carbon reinforcement with a cured resin matrix. In pultrusion, the main fibers follow the length of the bar. This construction suits straight members where axial stiffness and low mass guide the material choice.</p>
            <p>Specify the entire part, including its unsupported length and end fittings. A material tensile value alone does not establish the bending, buckling or connection capacity of a finished rod.</p>
          </div>
          <div className="rounded-card border border-border-default bg-bg2 p-[24px]">
            <h3 className="text-f18 font-bold text-t1">Choose the rod material for the job</h3>
            <p className="mt-[10px] text-f16 leading-relaxed text-t2">For glass-fiber sizes and fabricated blanks, use the existing fiberglass rod catalog. For a solid section with flat locating faces, compare square rods.</p>
            <div className="mt-[16px] flex flex-col gap-[12px] text-f14 font-semibold text-teal-text">
              <Link href={page.parentPath} className="underline underline-offset-4">Fiberglass solid round rods →</Link>
              <Link href="/products/fiberglass-square-rods" className="underline underline-offset-4">Fiberglass square rods →</Link>
            </div>
          </div>
        </div>
      </ProductSection>

      <ProductSection id="sizes" title="Carbon fiber rod sizes and specification" tone="muted" intro="Send metric or imperial dimensions with a drawing. The quotation confirms the available diameter, material, length, tolerance and production scope.">
        <div className="mb-[24px] border-l-4 border-teal bg-white p-[24px]">
          <h3 className="text-f20 font-bold text-t1">3/8 inch carbon fiber rod: 9.525 mm nominal diameter</h3>
          <p className="mt-[10px] max-w-[900px] text-f16 leading-relaxed text-t2">A 3/8 inch solid carbon fiber rod is a specific imperial size. Keep 9.525 mm on the drawing when fit matters; 9.5 mm and 10 mm are different nominal diameters. Include cut length, diameter tolerance and quantity in your inquiry.</p>
          <Link href={buildRfqHref({ source: "carbon-fiber-rod-3-8", product: "3/8 inch (9.525 mm) solid carbon fiber rod", productPath: page.path })} className="mt-[14px] inline-block text-f14 font-semibold text-teal-text underline underline-offset-4">Request a 3/8 inch rod quotation →</Link>
        </div>
        <dl className="divide-y divide-border-default overflow-hidden rounded-card border border-border-default bg-white">
          {page.specifications.map(([label, description]) => (
            <div key={label} className="grid gap-[8px] px-[20px] py-[16px] md:grid-cols-[180px_1fr] md:gap-[24px]">
              <dt className="text-f16 font-semibold text-t1">{label}</dt>
              <dd className="text-f16 leading-relaxed text-t2">{description}</dd>
            </div>
          ))}
        </dl>
      </ProductSection>

      <ProductSection id="comparison" title="Carbon fiber rod vs fiberglass rod" intro="Choose using the required stiffness, mass, electrical behavior and finished-part cost. Compare properties for the offered material systems under the same test conditions.">
        <div className="overflow-x-auto rounded-card border border-border-default">
          <table className="w-full min-w-[640px] border-collapse text-left text-f14 leading-relaxed">
            <caption className="sr-only">Material selection for carbon fiber and fiberglass solid rods</caption>
            <thead className="bg-bg2 text-t1"><tr>{["Selection point", "Carbon fiber rod (CFRP)", "Fiberglass rod (GFRP)"].map((heading) => <th key={heading} scope="col" className="px-[20px] py-[16px] font-semibold">{heading}</th>)}</tr></thead>
            <tbody className="divide-y divide-border-default">
              {page.comparison.map(([label, carbon, glass]) => <tr key={label}><th scope="row" className="px-[20px] py-[16px] font-semibold text-t1">{label}</th><td className="px-[20px] py-[16px] text-t2">{carbon}</td><td className="px-[20px] py-[16px] text-t2">{glass}</td></tr>)}
            </tbody>
          </table>
        </div>
        <p className="mt-[16px] max-w-[900px] text-f14 leading-relaxed text-t2">Request CFRP-specific strength, modulus and temperature data for your design. Values and certificates published for F1 fiberglass profiles or other carbon composite products do not transfer to this rod.</p>
      </ProductSection>

      <ProductSection id="applications" title="Applications to discuss with your rod inquiry" tone="muted">
        <div className="grid gap-[20px] md:grid-cols-3">
          {page.applications.map((item) => <article key={item.title} className="rounded-card border border-border-default bg-white p-[24px]"><h3 className="text-f18 font-bold text-t1">{item.title}</h3><p className="mt-[12px] text-f16 leading-relaxed text-t2">{item.text}</p></article>)}
        </div>
      </ProductSection>

      <ProductSection id="faq" title="Carbon fiber rod questions">
        <div className="grid items-start gap-[12px] md:grid-cols-2">{page.faq.map((item) => <FAQDisclosure key={item.question} question={item.question} answer={item.answer} />)}</div>
      </ProductSection>
      <RelatedLinks groups={[
        { title: "Carbon fiber profiles", links: carbonProfileLinks.filter((item) => item.href !== page.path) },
        { title: "Rod and bar products", links: [
          { label: "Solid fiberglass round rods", href: page.parentPath },
          { label: "Fiberglass square rods", href: "/products/fiberglass-square-rods" },
          { label: "Fiberglass flat bars", href: "/products/fiberglass-structural-shapes/frp-flat-bar" },
        ] },
        { title: "Other section and connection options", links: [
          { label: "Custom pultruded profile development", href: "/products/custom-pultruded-profiles" },
          { label: "Hollow fiberglass round tubes", href: "/products/fiberglass-structural-shapes/frp-tube" },
          { label: "Fiberglass threaded rods and fittings", href: "/products/frp-fasteners-fittings" },
        ] },
        { title: "Material and fabrication planning", links: [
          { label: "Pultrusion resin systems", href: "/technology/pultrusion-resin-systems" },
          { label: "Fabrication and engineering services", href: "/technology/knowhow-services" },
          { label: "Product evidence library", href: "/resources/evidence" },
        ] },
      ]} />
      <ProductSection id="quote" title="Request a carbon fiber rod quotation" tone="deep">
        <ProductRfq product="Solid pultruded carbon fiber rods" productPath={page.path} quoteHref={quoteHref} intro="Send your rod drawing, diameter, cut lengths and quantity, with the application and destination." items={[
          { title: "Size and quantity", text: "Metric or imperial diameter, tolerance, cut lengths, sample quantity and expected repeat demand." },
          { title: "Loads and connections", text: "Unsupported length, load direction, deflection limits, fittings, holes and bonding details." },
          { title: "Material and evidence", text: "Carbon fiber and resin requirements, exposure conditions and the tests needed for acceptance." },
          { title: "Delivery requirements", text: "Destination, required date, packaging constraints and responsibility for final fabrication." },
        ]} />
      </ProductSection>
    </>
  );
}

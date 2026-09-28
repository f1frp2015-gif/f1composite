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
import { buildRfqHref } from "@/lib/rfq";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pagePath = "/products/fiberglass-dog-bone";
const imagePath = "/images/products/fiberglass-dog-bone/fiberglass-dog-bone-section.svg";
const sourceUrl = "https://incomepultrusion.com/fiberglass-dog-bone/";
const description =
  "Fiberglass dog bone profiles for transformer winding and electrical insulation supports. Review custom geometry, material, test requirements and quote inputs.";

export const metadata: Metadata = buildPageMetadata({
  title: "Fiberglass Dog Bone Profiles | F1 Composite",
  description,
  path: pagePath,
  image: "/products/fiberglass-dog-bone/opengraph-image",
});

const quoteHref = buildRfqHref({
  source: "fiberglass-dog-bone",
  product: "Fiberglass dog bone profile",
  productPath: pagePath,
  message:
    "Please review a fiberglass dog bone profile. I will provide the section drawing, equipment application, electrical and thermal requirements, cut length, quantity and destination.",
});

const applications = [
  {
    title: "Dry-type transformer winding",
    text: "A shaped insulating support or winding interface where the contact faces, section and continuous length must fit the coil assembly.",
  },
  {
    title: "Reactors and power equipment",
    text: "A nonmetallic spacer or support profile used around coils and other components, subject to the equipment maker's electrical and mechanical design.",
  },
  {
    title: "High-voltage assemblies",
    text: "A custom insulating section for capacitors, disconnectors or power modules when creepage, clearance, finish and attachment details have been reviewed.",
  },
] as const;

const specificationRows = [
  {
    field: "Cross-section",
    input: "End widths and radii, waist width, overall height, bearing faces and tolerances",
    decision: "Approve a dimensioned drawing or physical sample before tooling release",
  },
  {
    field: "Length and processing",
    input: "Cut length, end finish, holes, slots or other machining and their tolerances",
    decision: "Check exposed fibers and edge finish after secondary operations",
  },
  {
    field: "Material system",
    input: "Glass reinforcement, resin, color, surface finish and operating environment",
    decision: "Select a production grade for the required thermal and environmental duty",
  },
  {
    field: "Electrical duty",
    input: "System voltage, insulation arrangement, creepage and clearance, test method",
    decision: "Qualify the finished profile and assembled equipment for the actual duty",
  },
  {
    field: "Mechanical duty",
    input: "Support loads, restraint method, winding pressure, vibration and temperature",
    decision: "Review the load path and request grade-specific test evidence",
  },
] as const;

const requestItems = [
  { title: "Drawing", text: "Dimensioned cross-section, tolerances, cut length and any machining." },
  { title: "Electrical duty", text: "Equipment type, voltage, insulation arrangement and required test methods." },
  { title: "Service conditions", text: "Temperature, humidity, chemicals, vibration and expected support loads." },
  { title: "Supply plan", text: "Sample quantity, production volume, packing, destination and target date." },
];

const faqs = [
  {
    question: "What is a fiberglass dog bone profile?",
    answer:
      "It is a pultruded glass-fiber reinforced polymer section with wider ends and a narrower middle. In electrical equipment, the shaped section can serve as an insulating support or winding interface. It is not a standardized test specimen or a universal replacement for an approved insulator.",
  },
  {
    question: "Are standard dog bone sizes available?",
    answer:
      "The supplier reference shows example dimensions, but those are not an F1 stock list. Send a drawing or sample so we can check die availability, geometry, tolerances and production quantity before quoting.",
  },
  {
    question: "Can you guarantee a voltage or temperature rating?",
    answer:
      "A rating depends on the selected material grade, section, surface, test method and final assembly. State the equipment standard and acceptance criteria in the RFQ; grade-specific reports and samples must be reviewed before a rating is used in design.",
  },
  {
    question: "Can the profile be drilled or cut?",
    answer:
      "Cut lengths and secondary machining can be reviewed with the drawing. Holes, slots and exposed cut ends may change mechanical and electrical behavior, so their location, finish and inspection requirements belong in the approved specification.",
  },
];

export default function FiberglassDogBonePage() {
  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "Fiberglass Dog Bone Profiles",
          description,
          path: pagePath,
          image: imagePath,
          category: "Pultruded electrical insulation profiles",
          material: ["Glass fiber reinforced polymer", "Thermoset resin"],
          schemaType: "CollectionPage",
        })}
      />
      <PageHeader
        tag="Electrical insulation profile"
        line={{ name: "F1-FORM", label: "Custom pultruded profile" }}
        title="Fiberglass dog bone profiles for electrical equipment"
        description="A drawing-led pultruded GFRP shape for transformer winding and insulating support assemblies. Match the dog bone section, material grade and qualification plan to your equipment before production."
        facts={[
          { label: "Profile", value: "Shaped GFRP section" },
          { label: "Primary use", value: "Insulating support" },
          { label: "Geometry", value: "Drawing controlled" },
          { label: "Performance", value: "Grade tested" },
        ]}
        actions={{
          primary: { label: "Request profile review", href: quoteHref },
          secondary: { label: "Prepare a specification", href: "#specification", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <Figure
            number={1}
            title="Dog bone cross-section concept"
            note="Schematic · not to scale"
            caption="Illustrative widened ends and narrow waist. Final geometry, finish and tolerances follow the approved drawing."
            bleed
          >
            <Image
              src={imagePath}
              alt="Illustrative fiberglass dog bone section with widened bearing ends and a narrow waist"
              width={1200}
              height={800}
              preload
              sizes="(max-width: 1023px) 94vw, 44vw"
              className="h-auto w-full"
            />
          </Figure>
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products/product-lines" },
          { label: "Custom Profiles", href: "/products/custom-pultruded-profiles" },
          { label: "Fiberglass Dog Bone" },
        ]}
      />
      <PageNav
        items={[
          { id: "overview", label: "Overview" },
          { id: "applications", label: "Applications" },
          { id: "specification", label: "Specification" },
          { id: "qualification", label: "Qualification" },
          { id: "faq", label: "FAQ" },
          { id: "quote", label: "Quote" },
        ]}
      />

      <PageSection id="overview" title="A shaped support designed around the equipment">
        <div className="grid gap-[28px] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-[48px]">
          <div className="space-y-[14px] text-f16 leading-golden text-t2">
            <p className="text-f18 text-t1">
              Continuous glass reinforcement and a cured polymer matrix form a consistent pultruded length. The widened ends provide defined contact regions while the narrower waist creates clearance for the surrounding assembly. Actual geometry is established by the equipment drawing.
            </p>
            <p>
              The{" "}
              <a href={sourceUrl} target="_blank" rel="noopener noreferrer nofollow" className="font-semibold text-teal-text underline underline-offset-4">
                supplier reference page
              </a>{" "}
              identifies transformer core winding, dry-type transformers, reactors and other high-voltage equipment as typical uses. Its published figures and certification claims describe that supplier&apos;s offering; this page does not present them as verified F1 product data.
            </p>
          </div>
          <aside className="rounded-card border border-border-default bg-bg2 p-[20px] sm:p-[28px]">
            <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">The first design gate</p>
            <h3 className="mt-[8px] text-f20 font-bold text-t1">Define the complete insulation system</h3>
            <p className="mt-[10px] text-f16 leading-golden text-t2">
              A material may be electrically insulating while the assembled part still needs voltage, creepage, thermal and mechanical checks. Share the assembly drawing and acceptance criteria with the profile drawing.
            </p>
            <Link href="/technology/quality-testing" className="mt-[14px] inline-block text-f14 font-semibold text-teal-text underline underline-offset-4">
              Review testing and evidence
            </Link>
          </aside>
        </div>
      </PageSection>

      <PageSection id="applications" title="Where a dog bone section may fit" tone="muted" intro="These are design contexts from the supplier reference, not automatic approvals for an F1 grade or an installed high-voltage assembly.">
        <div className="grid gap-[16px] md:grid-cols-3">
          {applications.map((item) => (
            <article key={item.title} className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
              <h3 className="text-f18 font-bold text-t1">{item.title}</h3>
              <p className="mt-[10px] text-f16 leading-golden text-t2">{item.text}</p>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection id="specification" title="Define the profile before asking for a price" intro="The section, process and test scope should be fixed together. A supplier's generic property table cannot replace the data for a selected production grade.">
        <div className="overflow-x-auto rounded-card border border-border-default">
          <table className="min-w-[760px] w-full border-collapse text-left text-f14">
            <thead className="bg-bg2 text-t1">
              <tr>
                <th scope="col" className="px-[18px] py-[14px] font-bold">Specification field</th>
                <th scope="col" className="px-[18px] py-[14px] font-bold">What to send</th>
                <th scope="col" className="px-[18px] py-[14px] font-bold">Review before release</th>
              </tr>
            </thead>
            <tbody className="text-t2">
              {specificationRows.map((row) => (
                <tr key={row.field} className="border-t border-border-default align-top">
                  <th scope="row" className="px-[18px] py-[14px] font-semibold text-t1">{row.field}</th>
                  <td className="px-[18px] py-[14px] leading-golden">{row.input}</td>
                  <td className="px-[18px] py-[14px] leading-golden">{row.decision}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection id="qualification" title="Qualify the grade and finished assembly" tone="muted">
        <div className="grid gap-[24px] lg:grid-cols-2 lg:gap-[48px]">
          <div className="space-y-[14px] text-f16 leading-golden text-t2">
            <p>Ask for the test method, specimen orientation, test conditions and report scope behind any quoted tensile, flexural, dielectric, moisture or temperature value. Check that the report applies to the proposed resin, reinforcement and section.</p>
            <p>For electrical service, define the equipment-level voltage, creepage, clearance, partial discharge and thermal acceptance criteria. The equipment manufacturer remains responsible for validating the final design and installed assembly.</p>
          </div>
          <div className="rounded-card border border-border-default bg-white p-[20px] sm:p-[28px]">
            <h3 className="text-f20 font-bold text-t1">A practical approval sequence</h3>
            <ol className="mt-[14px] space-y-[10px] text-f16 leading-golden text-t2">
              <li>1. Approve the dimensioned section and machining drawing.</li>
              <li>2. Review the proposed grade and test plan against equipment requirements.</li>
              <li>3. Check production samples in the intended assembly.</li>
              <li>4. Release production only against agreed acceptance criteria.</li>
            </ol>
          </div>
        </div>
      </PageSection>

      <PageSection id="faq" title="Fiberglass dog bone questions">
        <FAQList items={faqs} />
      </PageSection>

      <RelatedLinks groups={[
        { title: "Profile development", links: [
          { href: "/products/custom-pultruded-profiles", label: "Custom pultruded profiles" },
          { href: "/technology/pultrusion-resin-systems", label: "Fiber and resin options" },
        ] },
        { title: "Qualification", links: [
          { href: "/technology/quality-testing", label: "Quality and testing" },
          { href: "/resources/evidence", label: "Test reports and certificates" },
        ] },
        { title: "Related sections", links: [
          { href: "/products/fiberglass-structural-shapes/frp-rod", label: "Solid fiberglass rods" },
          { href: "/products/fiberglass-structural-shapes", label: "Structural shapes" },
        ] },
      ]} />

      <PageSection id="quote" title="Send the drawing and equipment duty" tone="deep" intro="Start with the information you have. We can identify any missing dimensions or qualification inputs during review.">
        <ProductRfq
          product="Fiberglass dog bone profile"
          productPath={pagePath}
          quoteHref={quoteHref}
          intro="Attach the cross-section drawing and describe where the profile sits in the electrical assembly."
          items={requestItems}
          links={[{ label: "Custom profile process", href: "/products/custom-pultruded-profiles" }]}
        />
      </PageSection>
    </>
  );
}

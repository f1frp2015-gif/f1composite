import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import BlogCard from "@/components/blog/BlogCard";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import CoverCard from "@/components/ui/CoverCard";
import { FAQList } from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { blogPosts } from "@/content/data/blogPosts";
import { coverFor } from "@/lib/covers";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

const faqs = [
  {
    question: "Are these design guides written for a specific code, or are they general?",
    answer:
      "Where a section interacts with a code (e.g. AS 2047 for fenestration in Australia, ASCE 7 for wind loading, ASTM E84 for surface burning), we cite the code and provide the engineering interpretation. The mechanical property data is code-neutral but reported under the standard test method.",
  },
  {
    question: "Are CAD files in the Downloads section license-free?",
    answer:
      "Standard-profile DWG/STEP files are free for commercial use in projects specifying F1 Composite material. Custom-pultrusion drawings are released under NDA tied to the qualifying RFQ.",
  },
  {
    question: "Do you publish failure / lessons-learned data?",
    answer:
      "Articles distinguish engineering references from documented project experience. Ask for the source and applicability of any failure analysis before using it in a design.",
  },
  {
    question: "Can engineers request a topic?",
    answer:
      "Yes. Write to inquiry@f1composite.com with the subject 'Resource Request' and the technical question. We prioritize topics that several engineers have asked about.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Engineering Resources, Guides & Technical Data",
  description:
    "Design guides, span tables, technical articles, test reports and downloadable documents from F1 Composite for specifying pultruded FRP profiles and grating.",
  path: "/resources",
  image: "/resources/opengraph-image",
});

const groups = [
  {
    id: "data",
    title: "Data and documents",
    intro: "Numbers for your model, and the reports and files your QA team will ask for.",
    items: [
      { title: "Technical data", description: "E23 laminate properties with the EN 13706 minimums and test methods, and the SGS E40 full-section reports.", href: "/resources/technical-data", label: "Data" },
      { title: "Product evidence", description: "Original certificates and test reports with their holder, scope and the configuration each one covers.", href: "/resources/evidence", label: "Reports" },
      { title: "Document library", description: "Catalogs, data sheets, CAD files and schedule templates, with a builder for your own datasheet PDF.", href: "/resources/downloads", label: "Downloads" },
      { title: "Design guides", description: "Profile selection and connection design guides on request, with the codes they cite.", href: "/resources/design-guides", label: "Guides" },
    ],
  },
  {
    id: "guides",
    title: "Buying and specifying guides",
    intro: "Written for engineers and buyers who are specifying or importing FRP for the first time.",
    items: [
      { title: "FRP windows guide", description: "Frame material, thermal targets, certification and the RFQ, in the order a window project asks.", href: "/resources/frp-windows-guide", label: "Windows" },
      { title: "FOB and DDP export guide", description: "Incoterms, HS/HTSUS classification and Section 301 exposure for importing pultruded profiles.", href: "/resources/frp-pultrusion-fob-ddp-export-guide", label: "Import" },
      { title: "Choosing a pultrusion supplier", description: "Six checks before you order, and how to compare bids that look alike.", href: "/resources/how-to-choose-frp-pultrusion-supplier", label: "Sourcing" },
      { title: "FRP and pultrusion glossary", description: "Plain-language definitions of materials, process, properties, products and standards.", href: "/resources/glossary", label: "Glossary" },
    ],
  },
];

const resources = groups.flatMap((group) => group.items);
const latestPosts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

export default function ResourcesPage() {
  const resourceSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "F1 Composite Resources",
    url: absoluteUrl("/resources"),
    hasPart: resources.map((resource) => ({
      "@type": "WebPage",
      name: resource.title,
      description: resource.description,
      url: absoluteUrl(resource.href),
    })),
  };

  return (
    <>
      <JsonLd data={resourceSchema} />
      <PageHeader
        tag="Resources"
        title="Knowledge hub"
        description="Technical data, design guidance, and expert insights to support your FRP composite project from concept to completion."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources" },
        ]}
      />

      <PageNav items={[{ id: "data", label: "Data and documents" }, { id: "guides", label: "Guides" }, { id: "articles", label: "Articles" }, { id: "faq", label: "FAQ" }]} />

      {groups.map((group, index) => (
        <PageSection key={group.id} id={group.id} title={group.title} tone={index % 2 === 0 ? "white" : "muted"} intro={group.intro}>
          <ul className="grid grid-cols-2 gap-[12px] lg:grid-cols-4 lg:gap-[16px]">
            {group.items.map((item, itemIndex) => {
              const cover = coverFor(item.href);
              return cover ? (
                <li key={item.href}>
                  <CoverCard href={item.href} cover={cover} label={<span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{item.label}</span>} title={item.title} text={item.description} priority={index === 0 && itemIndex < 2} compact sizes="(max-width: 1023px) 46vw, 290px" />
                </li>
              ) : null;
            })}
          </ul>
        </PageSection>
      ))}

      <PageSection id="articles" title="Latest engineering articles" count={`${blogPosts.length} articles`} tone="white" aside={<Link href="/resources/blog" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">All articles</Link>}>
        <ul className="grid gap-[12px] sm:grid-cols-2 lg:grid-cols-3 lg:gap-[16px]">
          {latestPosts.map((post) => (
            <li key={post.slug}>
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="faq" title="How to use this hub" tone="muted">
        <div className="max-w-[860px] space-y-[12px] text-f16 leading-golden text-t2">
          <p>
            Pultruded fiberglass behaves differently from steel, aluminum and timber: it is anisotropic, stiffness-driven rather than strength-driven, and creeps under sustained load. Engineers who specify it well treat it as a discipline of its own, not as &ldquo;lighter steel&rdquo;, and everything here is written for that reader: engineers, fabricators and procurement teams who need defensible decisions.
          </p>
          <p>
            If you are <strong className="text-t1">specifying</strong> FRP for the first time, start with the <Link href="/what-is-frp" className="font-semibold text-teal-text hover:underline">FRP guide</Link> and the technical data for the closest standard profile. If you are <strong className="text-t1">comparing</strong> FRP with aluminum, steel or PVC, the technology section&apos;s comparison pages set the materials side by side. If you are <strong className="text-t1">buying</strong>, the document library holds the package your QA team will request, and the design guides the connection details your fabricator will need.
          </p>
        </div>
        <div className="mt-[24px]">
          <FAQList items={faqs} />
        </div>
      </PageSection>

      <RelatedLinks
        background="white"
        groups={[
          { title: "Tools", links: [{ href: "/frp-density-calculator", label: "FRP density calculator" }, { href: "/frp-profile-calculator", label: "FRP profile calculator" }, { href: "/frp-span-tables", label: "FRP span tables" }, { href: "/technology/frp-u-value-calculator", label: "Window U-value calculator" }] },
          { title: "Technology", links: [{ href: "/technology/pultrusion-process", label: "The pultrusion process" }, { href: "/technology/pultrusion-resin-systems", label: "Resin systems" }, { href: "/technology/frp-vs-traditional-materials", label: "FRP vs steel, aluminum and concrete" }, { href: "/technology/quality-testing", label: "Quality testing" }] },
          { title: "Ask", links: [{ href: "/ask", label: "Ask the engineering assistant" }, { href: "/contact?source=resources&inquiry_type=technical", label: "Ask our engineers" }] },
        ]}
      />

      <InnerCTA title="Need an answer that is not here?" text="Send the question with the product, the service conditions and the project stage." />
    </>
  );
}

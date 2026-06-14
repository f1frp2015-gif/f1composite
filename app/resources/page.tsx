import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import FAQ from "@/components/ui/FAQ";
import SectionTag from "@/components/ui/SectionTag";
import JsonLd from "@/components/seo/JsonLd";
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
      "Yes. The blog includes incident retrospectives — UV degradation in unprotected solar racks, galvanic corrosion in mixed FRP-aluminum window assemblies, creep failure in undersized handrails. These are written from real returns, anonymized.",
  },
  {
    question: "Can engineers request a topic?",
    answer:
      "Yes — write to inquiry@f1composite.com with the subject 'Resource Request' and the technical question. We publish about one new long-form article per week and prioritize topics with multiple inbound asks.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: "Resources",
  description:
    "Technical resources, design guides, blog articles, and downloadable documents from F1 Composite — your FRP pultrusion knowledge hub.",
  path: "/resources",
  image: "/resources/opengraph-image",
});

const icons: Record<string, React.ReactNode> = {
  "technical-data": (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden>
      <rect x="4" y="22" width="5" height="8" rx="1.5" fill="#00A199" opacity="0.25" />
      <rect x="11" y="16" width="5" height="14" rx="1.5" fill="#00A199" opacity="0.45" />
      <rect x="18" y="10" width="5" height="20" rx="1.5" fill="#00A199" opacity="0.65" />
      <rect x="25" y="4" width="5" height="26" rx="1.5" fill="#00A199" />
      <path d="M6.5 18L13.5 13L20.5 8L27.5 3" stroke="#00A199" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="27.5" cy="3" r="2" fill="#00A199" />
    </svg>
  ),
  "design-guides": (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden>
      <path d="M7 27L27 7" stroke="#00A199" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M7 27L10 20L24 6L28 10L14 24L7 27Z" stroke="#00A199" strokeWidth="1.5" fill="#00A199" fillOpacity="0.1" />
      <path d="M20 10L24 14" stroke="#00A199" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 30H12" stroke="#00A199" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <circle cx="28.5" cy="5.5" r="2.5" stroke="#00A199" strokeWidth="1.5" fill="none" />
    </svg>
  ),
  blog: (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden>
      <rect x="5" y="3" width="24" height="28" rx="3" stroke="#00A199" strokeWidth="2" fill="#00A199" fillOpacity="0.06" />
      <path d="M10 10H24" stroke="#00A199" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 16H20" stroke="#00A199" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M10 22H22" stroke="#00A199" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <rect x="20" y="19" width="7" height="7" rx="1.5" fill="#00A199" opacity="0.2" />
    </svg>
  ),
  downloads: (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden>
      <path d="M17 4V22" stroke="#00A199" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M11 17L17 23L23 17" stroke="#00A199" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 26V28C6 29.1 6.9 30 8 30H26C27.1 30 28 29.1 28 28V26" stroke="#00A199" strokeWidth="2" strokeLinecap="round" />
      <circle cx="17" cy="23" r="2" fill="#00A199" opacity="0.3" />
    </svg>
  ),
};

const resources = [
  {
    title: "Technical Data",
    description: "Mechanical properties, chemical resistance charts, and specification sheets for all standard FRP profiles.",
    href: "/resources/technical-data",
    iconKey: "technical-data",
  },
  {
    title: "Design Guides",
    description: "Engineering design guidance for FRP structural applications, connection details, and load tables.",
    href: "/resources/design-guides",
    iconKey: "design-guides",
  },
  {
    title: "Blog",
    description: "Technical articles, industry insights, and project updates from our engineering team.",
    href: "/resources/blog",
    iconKey: "blog",
  },
  {
    title: "Downloads",
    description: "Product catalogs, certification documents, CAD files, and technical brochures in PDF format.",
    href: "/resources/downloads",
    iconKey: "downloads",
  },
];

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
        title="Knowledge Hub"
        description="Technical data, design guidance, and expert insights to support your FRP composite project from concept to completion."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources" },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[900px] px-[34px]">
          <SectionTag>Engineering Knowledge for Specifying Pultruded FRP</SectionTag>
          <div className="mt-[21px] space-y-[21px] text-f17 leading-golden text-t2">
            <p>
              Pultruded fiberglass composites behave differently from steel, aluminum, and timber — the material is anisotropic, stiffness-driven rather than strength-driven, and creep-sensitive under sustained load. Engineers who have specified FRP successfully have one thing in common: they treated the material as a discipline of its own, not as &quot;lighter steel.&quot; This Resources hub is built around that principle. Every document below is written for engineers, fabricators, and procurement teams who need to make defensible specification decisions, not marketing claims.
            </p>
            <p>
              We publish four document classes, each serving a different decision moment in the FRP project lifecycle: Technical Data for populating structural models and qualifying substitutions; Design Guides for connection details, load tables, and corrosion-zone language; Blog for long-form technical articles and industry insights; Downloads for catalogs, certifications, CAD libraries, and approval-package templates that distributors and fabricators pull when preparing customer submittals.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="grid gap-[21px] md:grid-cols-2">
            {resources.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group rounded-[8px] border border-border-default bg-white p-[34px] transition-all duration-[0.34s] hover:-translate-y-[2px] hover:border-teal-border"
              >
                <span className="mb-[13px] block">{icons[r.iconKey]}</span>
                <h3 className="mb-[8px] text-f19 font-bold text-t1 group-hover:text-teal-text">
                  {r.title}
                </h3>
                <p className="text-f15 leading-golden text-t2">{r.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[900px] px-[34px]">
          <SectionTag>How to Use This Hub</SectionTag>
          <div className="mt-[21px] space-y-[21px] text-f17 leading-golden text-t2">
            <p>
              If you are <strong>specifying</strong> FRP for the first time, start with the Blog post &quot;What is Pultrusion?&quot; and the Technical Data sheet for your closest standard profile. If you are <strong>comparing</strong> FRP against aluminum, steel, or PVC, the Technology section&apos;s vs-pages give like-for-like cost, weight, lifetime, and embodied-carbon comparisons. If you are <strong>buying</strong>, head straight to Downloads for the certification package your QA team will request, then the Design Guides for connection details your fabricator will need.
            </p>
            <p>
              For requirements that don&apos;t map to any document here, our engineering team responds to specification questions within one business day at inquiry@f1composite.com — many of the documents on this site started as a customer question we answered well enough to publish.
            </p>
          </div>
          <FAQ items={faqs} />
        </div>
      </section>
    </>
  );
}

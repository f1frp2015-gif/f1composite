import { e40EvidenceHref } from "@/content/data/e40Evidence";
import { commercialFacts } from "@/content/data/engineeringEvidence";
import { buildRfqHref } from "@/lib/rfq";
import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import FAQ from "@/components/ui/FAQ";
import SectionTag from "@/components/ui/SectionTag";
import JsonLd from "@/components/seo/JsonLd";
import DatasheetBuilder from "@/components/downloads/DatasheetBuilder";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { listDownloads } from "@/lib/catalog/db";
import { getAllDatasheetPages } from "@/lib/catalog/public";
import { DATASHEET_HIGHLIGHTS } from "@/lib/datasheetHighlights";
import { fallbackDownloads, type DownloadItem } from "@/content/data/downloads";
import { assembleDocuments } from "@/lib/documents";

// DB-driven with an hourly refresh; the hardcoded list below is the fallback
// when the DB is unreachable so `next build` and the live page never break
// on a Neon hiccup (build-time prerender runs live queries).
export const revalidate = 3600;

const faqs = [
  {
    question: "Are CAD files for use only with F1 Composite material?",
    answer:
      "Standard profile CAD files (DWG/STEP/IFC) are free for use in projects that specify F1 Composite material. They include our profile shape and our generic notes; they do not contain proprietary tooling geometry. Custom pultrusion CAD files are released only after a qualifying RFQ and under NDA.",
  },
  {
    question: "How do I get a project-specific MTC?",
    answer:
      "Agree the required batch identification, inspection records and report format before production. Ask your sales contact for the available sample format and testing scope.",
  },
  {
    question: "Are documents available in languages other than English?",
    answer:
      "Catalogs are available in English; Arabic and Spanish translations are issued for projects in the GCC and Latin America on request. Certifications are in English (the issuing authority's language) — contact us if a notarized translation is required.",
  },
  {
    question: "Why do certain documents ask for a project name before download?",
    answer:
      "Some documents require us to match the offered product, report holder and project requirements first. A document request does not guarantee that a certificate exists for every configuration.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Datasheets, CAD Files & Certificates",
  description:
    "Download F1 Composite catalogs, material data sheets, published test reports and DXF drawings for pultruded FRP profiles. Certificates are sent on request.",
  path: "/resources/downloads",
  image: "/resources/downloads/opengraph-image",
});

async function loadDownloads(): Promise<DownloadItem[]> {
  try {
    const rows = await listDownloads({ publishedOnly: true });
    if (rows.length === 0) return fallbackDownloads;
    return rows.map((r) => ({
      title: r.title,
      format: r.format,
      size: r.size ?? "",
      description: r.description ?? "",
      file: r.file_url ?? undefined,
    }));
  } catch {
    return fallbackDownloads;
  }
}

export default async function DownloadsPage() {
  const [loadedDownloads, datasheetPages] = await Promise.all([
    loadDownloads(),
    getAllDatasheetPages(),
  ]);
  const datasheetSlugs = new Set(datasheetPages.map((page) => page.slug));
  const datasheetHighlights = DATASHEET_HIGHLIGHTS.map((family) => ({
    ...family,
    items: family.items.filter((item) => datasheetSlugs.has(item.slug)),
  })).filter((family) => family.items.length > 0);
  const downloads = assembleDocuments(loadedDownloads);
  const downloadsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "F1 Composite Document Library",
    url: absoluteUrl("/resources/downloads"),
    hasPart: downloads.map((dl) => ({
      "@type": "CreativeWork",
      name: dl.title,
      encodingFormat: dl.format,
      description: dl.description,
    })),
  };

  return (
    <>
      <JsonLd data={downloadsSchema} />
      <PageHeader
        tag="Downloads"
        title="Document Library"
        description="Product catalogs, certifications, CAD files, and technical documents available for download."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Downloads" },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="site-container">
          <SectionTag>Specification, Certification, and CAD Documents</SectionTag>
          <div className="mt-[21px] space-y-[21px] text-f18 leading-golden text-t2">
            <p>
              These are the documents specifiers, fabricators and QA teams use to check and buy pultruded FRP profiles from F1 Composite. Files with a download link are public. The rest are sent on request, with the certificate holder, report number and scope, so you can match each document to the product you are buying.
            </p>
            <p>
              <strong>Published now:</strong> the window and door catalog, the oilfield and mine pipe catalog, material data sheets, SGS, Intertek and TÜV test reports, the PHI component certificate, the CABR green building certificate and EPD, and CSV templates for window and rebar schedules. DXF drawings for catalog sections are linked from each <Link href="/datasheets" className="font-semibold text-teal-text hover:text-teal">datasheet</Link>. <strong>On request:</strong> ISO 9001 and CE documentation, fire and chemical test reports, STEP models and project submittal packages.
            </p>
          </div>
        </div>
      </section>

      <DatasheetBuilder />

      {/* FRP profile technical datasheets — static shortlist, 8 common sizes
          per family for customers who do not need the full DB-driven index. */}
      <section id="datasheets" className="bg-white py-[55px]">
        <div className="site-container">
          <p className="mb-[21px] text-f16 text-t2">New: <Link href={e40EvidenceHref} className="font-semibold text-teal-text underline">SGS E40 / 40 GPa-class full-section test reports</Link> — review the measured results and size-identification notes before selecting a datasheet.</p>
          <SectionTag>FRP Profile Technical Datasheets</SectionTag>
          <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Technical datasheets — most-requested sizes
          </h2>
          <p className="mt-[8px] max-w-[860px] text-f16 leading-golden text-t2">
            The eight most-specified sizes in each profile family, linked straight to their
            technical datasheet — section drawing, published weight, mechanical and physical
            properties, and a free DXF download on every page. The complete catalog of all
            114 sizes lives in the{" "}
            <Link href="/datasheets" className="font-semibold text-teal-text hover:underline">
              datasheet library
            </Link>
            .
          </p>
          <div className="mt-[21px] grid gap-[21px] sm:grid-cols-2 lg:grid-cols-4">
            {datasheetHighlights.map((fam) => (
              <div key={fam.family} className="rounded-card border border-border-default bg-white p-[21px]">
                <h3 className="text-f16 font-bold text-t1">
                  <Link href={fam.categoryHref} className="hover:text-teal-text">
                    {fam.family}
                  </Link>
                </h3>
                <ul className="mt-[8px] space-y-[3px]">
                  {fam.items.map((it) => (
                    <li key={it.slug}>
                      <Link
                        href={`/datasheets/${it.slug}`}
                        className="text-f14 text-t2 hover:text-teal-text hover:underline"
                      >
                        {it.model} datasheet
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="site-container">
          <p className="mb-[24px] text-f16 text-t2">Check document applicability in the <Link href="/resources/evidence" className="font-semibold text-teal-text underline">product evidence index</Link> before using a report in your project.</p>
          <div className="grid gap-[21px] md:grid-cols-2 lg:grid-cols-3">
            {downloads.map((dl) => (
              <div
                key={dl.title}
                className="rounded-card border border-border-default bg-white p-[21px]"
              >
                <div className="mb-[13px] flex items-center gap-[8px]">
                  <span className="rounded-tag bg-teal-bg px-[8px] py-[3px] text-f12 font-bold text-teal-text">
                    {dl.format}
                  </span>
                  <span className="text-f12 text-t3">{dl.file ? dl.size : "Available on request, subject to scope"}</span>
                </div>
                <h3 className="mb-[8px] text-f16 font-bold text-t1">{dl.title}</h3>
                <p className="mb-[13px] text-f14 leading-golden text-t2">{dl.description}</p>
                {dl.file ? (
                  <a
                    href={dl.file}
                    target="_blank"
                    rel="noopener"
                    className="text-f14 font-semibold text-teal-text hover:underline"
                  >
                    Download {dl.format} →
                  </a>
                ) : (
                  <Link
                    href={buildRfqHref({ source: "download-request", product: dl.title, message: `Please confirm availability and applicability of: ${dl.title}` })}
                    className="text-f14 font-semibold text-teal-text hover:underline"
                  >
                    Request download →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-[55px]">
        <div className="site-container">
          <SectionTag>How Specifiers Use This Set</SectionTag>
          <div className="mt-[21px] space-y-[21px] text-f18 leading-golden text-t2">
            <p>
              {commercialFacts.compliance}
            </p>
            <p>
              For documents not listed — for example, third-country compliance dossiers, bay-by-bay test reports for a fenestration project, or batch-traceable MTCs from a specific production run — write to inquiry@f1composite.com with your product and acceptance requirements. We will confirm availability and any additional testing needed.
            </p>
          </div>
          <FAQ items={faqs} />
        </div>
      </section>

      <InnerCTA title="Can't find what you're looking for?" />
    </>
  );
}

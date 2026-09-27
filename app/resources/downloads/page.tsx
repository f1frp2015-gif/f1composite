import { e40EvidenceHref } from "@/content/data/e40Evidence";
import { commercialFacts } from "@/content/data/engineeringEvidence";
import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import InnerCTA from "@/components/sections/InnerCTA";
import { FAQList } from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import DatasheetBuilder from "@/components/downloads/DatasheetBuilder";
import DocumentLibrary from "@/components/downloads/DocumentLibrary";
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
      "Catalogs are available in English; Arabic and Spanish translations are issued for projects in the GCC and Latin America on request. Certifications are in English, the issuing authority's language; contact us if a notarized translation is required.",
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

      <PageNav items={[{ id: "overview", label: "What is here" }, { id: "datasheet-builder", label: "Datasheet builder" }, { id: "datasheets", label: "Datasheets" }, { id: "documents", label: "Documents" }, { id: "faq", label: "FAQ" }]} />

      <PageSection id="overview" title="Specification, certification and CAD documents" tone="white">
        <div className="max-w-[860px] space-y-[12px] text-f16 leading-golden text-t2">
          <p>
            These are the documents specifiers, fabricators and QA teams use to check and buy pultruded FRP profiles from F1 Composite. Files with a download link are public. The rest are sent on request, with the certificate holder, report number and scope, so you can match each document to the product you are buying.
          </p>
          <p>
            <strong className="text-t1">Published now:</strong> the window and door catalog, the oilfield and mine pipe catalog, material data sheets, SGS, Intertek and TÜV test reports, the PHI component certificate, the CABR green building certificate and EPD, and CSV templates for window and rebar schedules. DXF drawings for catalog sections are linked from each <Link href="/datasheets" className="font-semibold text-teal-text hover:underline">datasheet</Link>. <strong className="text-t1">On request:</strong> ISO 9001 and CE documentation, fire and chemical test reports, STEP models and project submittal packages.
          </p>
        </div>
      </PageSection>

      <DatasheetBuilder tone="muted" />

      {/* FRP profile technical datasheets: a static shortlist, eight common sizes
          per family, for customers who do not need the full DB-driven index. */}
      <PageSection id="datasheets" title="Technical datasheets: the most-requested sizes" tone="white" intro={<>The eight most-specified sizes in each profile family, linked to their technical datasheet: section drawing, published weight, mechanical and physical properties, and a free DXF on every page. All 114 sizes are in the <Link href="/datasheets" className="font-semibold text-teal-text underline underline-offset-4">datasheet library</Link>.</>}>
        <p className="mb-[20px] max-w-[860px] rounded-card border-l-4 border-l-teal bg-teal-bg px-[16px] py-[12px] text-f14 leading-golden text-t2">
          <strong className="text-t1">E40 test evidence.</strong> Review the <Link href={e40EvidenceHref} className="font-semibold text-teal-text underline underline-offset-4">SGS 40 GPa-class full-section reports</Link> and their size-identification notes before selecting a datasheet.
        </p>
        <ul className="grid gap-[12px] sm:grid-cols-2 lg:grid-cols-4">
          {datasheetHighlights.map((fam) => (
            <li key={fam.family} className="rounded-card border border-border-default bg-bg2 p-[20px]">
              <h3 className="text-f16 font-bold text-t1">
                <Link href={fam.categoryHref} className="hover:text-teal-text">
                  {fam.family}
                </Link>
              </h3>
              <ul className="mt-[8px] space-y-[2px]">
                {fam.items.map((it) => (
                  <li key={it.slug}>
                    <Link href={`/datasheets/${it.slug}`} className="inline-flex min-h-[28px] items-center text-f14 text-t2 hover:text-teal-text hover:underline">
                      {it.model} datasheet
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="documents" title="Document library" count={`${downloads.length} documents`} tone="muted" intro={<>Check each document&apos;s applicability in the <Link href="/resources/evidence" className="font-semibold text-teal-text underline underline-offset-4">product evidence index</Link> before using a report in your project.</>}>
        <DocumentLibrary documents={downloads} />
      </PageSection>

      <PageSection id="faq" title="How specifiers use this set" tone="white">
        <div className="max-w-[860px] space-y-[12px] text-f16 leading-golden text-t2">
          <p>{commercialFacts.compliance}</p>
          <p>
            For documents not listed, such as third-country compliance dossiers, bay-by-bay test reports for a fenestration project, or batch-traceable MTCs from a specific production run, write to inquiry@f1composite.com with your product and acceptance requirements. We will confirm availability and any additional testing needed.
          </p>
        </div>
        <div className="mt-[24px]">
          <FAQList items={faqs} />
        </div>
      </PageSection>

      <InnerCTA title="Can't find what you're looking for?" />
    </>
  );
}

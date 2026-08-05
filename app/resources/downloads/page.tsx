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
      "After purchase, your sales contact issues an MTC tied to the production batch and shipment. The sample MTC available here lets your QA team review the format in advance.",
  },
  {
    question: "Are documents available in languages other than English?",
    answer:
      "Catalogs are available in English; Arabic and Spanish translations are issued for projects in the GCC and Latin America on request. Certifications are in English (the issuing authority's language) — contact us if a notarized translation is required.",
  },
  {
    question: "Why do certain documents ask for a project name before download?",
    answer:
      "Certification documents are issued at a specific revision and may need to be re-issued mid-project if the underlying standard updates. Capturing the project name lets us push a revised certification to you automatically.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: "Downloads",
  description:
    "Download F1 Composite product catalogs, EN 13706 declarations, ISO 9001 certificates, CAD files, and technical brochures for pultruded FRP profiles.",
  path: "/resources/downloads",
  image: "/resources/downloads/opengraph-image",
});

interface DownloadItem {
  title: string;
  format: string;
  size: string;
  description: string;
  file?: string;
}

const fallbackDownloads: DownloadItem[] = [
  {
    title: "Pultruded FRP Pipe — Mining & Oilfield Catalog (Edition 2026.06)",
    format: "PDF",
    size: "991 KB",
    description: "3-page product catalog for F1 Composite serial-production pultruded FRP pipe in two qualified families. Series 01 — Oilfield Surface Gathering: DN50–DN300, 0.7–3.5 MPa, −40 °C to +140 °C continuous (short-term peak +160 °C), vinyl-ester / epoxy / polyurethane matrices with 0.5–2.5 mm resin-rich liner (novolac VE for sour H₂S / CO₂ service), ≥25-year life, qualified to API 15LR, ISO 14692, NORSOK M-622, ASTM D2992, SY/T 6266. Series 02 — Mine Methane Drainage: DN25–DN300, 0.6–1.6 MPa, surface resistance ≤3×10⁸ Ω, LOI ≥28%, UL 94 V-0, ≥50-year design life, qualified to MT 558.2, GB 16413, MT 113, ISO 4589-2, ASTM E84 Class I. Edition 2026.06, Rev v1.3.",
    file: "/downloads/f1composite-oilfield-mine-pipe-catalog-2026-06.pdf",
  },
  {
    title: "FRP Profile Design Manual — 2026 Edition",
    format: "PDF",
    size: "734 KB",
    description: "24-page engineering reference for F1 Composite pultruded structural profiles. Covers equal angle (50–152 mm), square box (50–101 mm), channel (100–254 mm), tube and top rail, and wide flange beam (152–305 mm), with full dimensions, section properties, E23-grade material data per EN 13706-2, point-load and UDL mid-span deflection tables across 500 mm to 6 m spans, chemical resistance, BS 476 fire performance, MSDS, handling, and maintenance. Doc no. DOC-PF-2026-EN Rev. A.",
    file: "/downloads/f1composite-frp-profile-design-manual-2026.pdf",
  },
  {
    title: "Pultruded FRP Window & Door Catalog",
    format: "PDF",
    size: "830 KB",
    description: "Full F1 Composite fenestration catalog — 70/80/90/140 series window and door frame profiles. Material comparison vs aluminum / PVC-U / pine, profile specifications, recommended glazing builds and U-values, energy-code matching for EN 14351-1, PHI passive-house, AS 2047 and NFRC. Includes sub-frame range and custom-pultrusion options.",
    file: "/downloads/f1composite-frp-window-door-catalog.pdf",
  },
  {
    title: "Wind Energy Pultruded Laminate — Mechanical Data Sheet",
    format: "PDF",
    size: "13 KB",
    description: "GFRP (WE-G80) and CFRP (WE-C100) pultruded spar-cap laminates for wind turbine rotor blades. Tension-tension S-N fatigue per ISO 13003, full static envelope per ISO 527-5 / 14125 / 14126 / 14130 and ASTM D7078, with characteristic values per DNVGL-ST-0376 and GL 2010. Independent DNV·GL-accredited laboratory testing.",
    file: "/downloads/f1composite-wind-energy-pultruded-laminate-datasheet.pdf",
  },
  {
    title: "PU-GF Pultruded Profile — Mechanical Data Sheet",
    format: "PDF",
    size: "8 KB",
    description: "Mechanical performance summary for PU-GF (polyurethane / E-glass) pultruded composite, 80 mm structural section. Tensile, compressive, flexural, ILSS, and water absorption against GB/T, ISO, and ASTM standards. Independent third-party laboratory testing.",
    file: "/downloads/f1composite-pu-gf-pultruded-mechanical-data.pdf",
  },
  {
    title: "PHI Component Certificate — 90-Series GFRP Window",
    format: "PDF",
    size: "0.4 MB",
    description: "Passive House Institute (PHI) component certification for the 90-series pultruded GFRP window. Component-ID 2491wi03, phA arctic climate class. Issued by PHI Darmstadt.",
    file: "/downloads/phi-certificate-gfrp-90-series-2491wi03.pdf",
  },
  {
    title: "Intertek AS 2047 Test Report — Turn-and-Tilt GFRP Window",
    format: "PDF",
    size: "3 MB",
    description: "Intertek Report No. 240821010SHF-001. Full AS 2047-2014 / AS/NZS 4420.1-2016 performance test on a pultruded GFRP turn-and-tilt window. Air infiltration, water penetration (600 Pa), structural at 3000 Pa. IAS-accredited Intertek Shanghai Fengxian lab.",
    file: "/downloads/intertek-report-240821010SHF-001-turn-tilt-window.pdf",
  },
  {
    title: "Intertek AS 2047 Test Report — Lift-Sliding GFRP Door",
    format: "PDF",
    size: "2.8 MB",
    description: "Intertek Report No. 240821010SHF-002. Full AS 2047-2014 / AS/NZS 4420.1-2016 performance test on a 3000 × 2400 mm 140-Series pultruded GFRP lift-sliding door. Tested Oct 2024, issued Dec 2024 at IAS-accredited Intertek Shanghai Fengxian.",
    file: "/downloads/intertek-report-240821010SHF-002-lift-sliding-door.pdf",
  },
  {
    title: "3-Star Green Building Material Certificate — Pultruded GFRP Windows",
    format: "PDF",
    size: "115 KB",
    description: "Certificate No. CABR-01(02)-(2025)-CGP-035. 3-Star (highest tier) rating under the Chinese Green Building Material assessment framework T/CECS 10026-2019 and CABR/CC-TD-CGP-09:2024. Covers F1 Composite 65/70/80/90-series tilt-and-turn pultruded GFRP-polyurethane windows for cold, hot-summer-cold-winter, and hot-summer-warm-winter climate zones. Issued by China Academy of Building Research Co., Ltd. (CABR), valid 2025-06-05 to 2030-06-04.",
    file: "/downloads/f1composite-3star-green-building-cert-frp-windows-2025.pdf",
  },
  {
    title: "EPD & Carbon Footprint — Pultruded GFRP Composite Profiles",
    format: "PDF",
    size: "142 KB",
    description: "Environmental Product Declaration and product carbon footprint analysis for F1 Composite pultruded GFRP composite profile products, with 1 m² functional unit. Calculation reference CABR-CFC-01(02)-2025(20030)1, cradle-to-gate 33,934.34 g CO₂e/m², distribution 254.59 g, cradle-to-grave 36,099.32 g. Standards: GB/T 24025-2009 (ISO 14025-aligned Type III EPD), GB/T 32161-2015, ISO 14067, PAS 2050. Issued by China Academy of Building Research Co., Ltd. (CABR) Certification Center on April 30, 2025.",
    file: "/downloads/f1composite-epd-carbon-footprint-frp-profiles-2025.pdf",
  },
  {
    title: "Product Catalog 2024",
    format: "PDF",
    size: "12 MB",
    description: "Complete catalog of standard pultruded FRP profiles with dimensions, properties, and ordering information.",
  },
  {
    title: "Fenestration Systems Brochure",
    format: "PDF",
    size: "8 MB",
    description: "Detailed brochure covering 70/80/90-series FRP window and door frame systems.",
  },
  {
    title: "ISO 9001:2015 Certificate",
    format: "PDF",
    size: "0.5 MB",
    description: "Current ISO 9001:2015 quality management system certification.",
  },
  {
    title: "CE Declaration of Performance",
    format: "PDF",
    size: "1 MB",
    description: "EN 13706 Declaration of Performance for CE-marked structural profiles.",
  },
  {
    title: "Standard Profiles — CAD Library",
    format: "DWG/STEP",
    size: "25 MB",
    description: "2D and 3D CAD models for all standard I-beam, channel, angle, and tube profiles.",
  },
  {
    title: "Chemical Resistance Chart",
    format: "PDF",
    size: "2 MB",
    description: "Chemical resistance ratings for polyester, vinyl ester, and epoxy resin systems across 200+ chemicals.",
  },
];

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
  const [downloads, datasheetPages] = await Promise.all([
    loadDownloads(),
    getAllDatasheetPages(),
  ]);
  const datasheetSlugs = new Set(datasheetPages.map((page) => page.slug));
  const datasheetHighlights = DATASHEET_HIGHLIGHTS.map((family) => ({
    ...family,
    items: family.items.filter((item) => datasheetSlugs.has(item.slug)),
  })).filter((family) => family.items.length > 0);
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
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Specification, Certification, and CAD Documents</SectionTag>
          <div className="mt-[21px] space-y-[21px] text-f17 leading-golden text-t2">
            <p>
              The Downloads center holds every document a specifier, fabricator, or QA team needs to evaluate, qualify, and procure pultruded FRP profiles from F1 Composite. All documents below are current and stamped with revision date and document number. Distributors preparing customer submittal packages and engineers building approval drawings typically pull from this set.
            </p>
            <p>
              We organize documents into five categories. <strong>Product Catalogs</strong> cover standard profiles, custom pultrusion capabilities, fenestration systems for AS 2047 / PHI / NFRC, and pultruded gratings. <strong>Certifications</strong> include ISO 9001:2015, EN 13706 Grade E23 conformity, CE Marking under EAD 130026-00-0304, ASTM E84 Class 1 surface burning, and Aramco SAES-W-018 vendor approval. <strong>CAD Libraries</strong> ship standard profiles in DWG, DXF, STEP, plus BIM (IFC, Revit RFA) for fenestration and structural families, and connection detail typical drawings. <strong>Approval-Package Templates</strong> include submittal package, mock-up testing protocol for fenestration projects, MTC sample, and First Article Inspection (FAI) report sample. <strong>Sustainability and Compliance</strong> covers verified EPD, REACH SVHC declaration, RoHS conformity, and California Proposition 65 statement.
            </p>
          </div>
        </div>
      </section>

      <DatasheetBuilder />

      {/* FRP profile technical datasheets — static shortlist, 8 common sizes
          per family for customers who do not need the full DB-driven index. */}
      <section id="datasheets" className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>FRP Profile Technical Datasheets</SectionTag>
          <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Technical datasheets — most-requested sizes
          </h2>
          <p className="mt-[8px] max-w-[860px] text-f15 leading-golden text-t2">
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
              <div key={fam.family} className="rounded-[8px] border border-border-default bg-white p-[21px]">
                <h3 className="text-f15 font-bold text-t1">
                  <Link href={fam.categoryHref} className="hover:text-teal-text">
                    {fam.family}
                  </Link>
                </h3>
                <ul className="mt-[8px] space-y-[3px]">
                  {fam.items.map((it) => (
                    <li key={it.slug}>
                      <Link
                        href={`/datasheets/${it.slug}`}
                        className="text-f13 text-t2 hover:text-teal-text hover:underline"
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
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="grid gap-[21px] md:grid-cols-2 lg:grid-cols-3">
            {downloads.map((dl) => (
              <div
                key={dl.title}
                className="rounded-[8px] border border-border-default bg-white p-[21px]"
              >
                <div className="mb-[13px] flex items-center gap-[8px]">
                  <span className="rounded-[4px] bg-teal-bg px-[8px] py-[3px] text-f11 font-bold text-teal-text">
                    {dl.format}
                  </span>
                  <span className="text-f11 text-t3">{dl.size}</span>
                </div>
                <h3 className="mb-[8px] text-f15 font-bold text-t1">{dl.title}</h3>
                <p className="mb-[13px] text-f13 leading-golden text-t2">{dl.description}</p>
                {dl.file ? (
                  <a
                    href={dl.file}
                    target="_blank"
                    rel="noopener"
                    className="text-f13 font-semibold text-teal-text hover:underline"
                  >
                    Download PDF →
                  </a>
                ) : (
                  <Link
                    href="/contact"
                    className="text-f13 font-semibold text-teal-text hover:underline"
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
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>How Specifiers Use This Set</SectionTag>
          <div className="mt-[21px] space-y-[21px] text-f17 leading-golden text-t2">
            <p>
              Most engineers building an approval package combine three downloads: (1) the product catalog page covering the chosen profile family, (2) the relevant certification (ISO 9001 + EN 13706 grade declaration is the typical default), and (3) the connection detail typical drawing. Procurement adds the sustainability and REACH declarations for European projects. QA teams add the MTC sample and FAI report sample to set their incoming inspection criteria.
            </p>
            <p>
              For documents not listed — for example, third-country compliance dossiers, bay-by-bay test reports for a fenestration project, or batch-traceable MTCs from a specific production run — write to inquiry@f1composite.com with the project name and we can release within one business day.
            </p>
          </div>
          <FAQ items={faqs} />
        </div>
      </section>

      <InnerCTA title="Can't find what you're looking for?" />
    </>
  );
}

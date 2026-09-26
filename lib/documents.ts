// The document library behind /resources/downloads and the site search:
// catalog rows (or the static fallback) plus the pinned E40 reports and
// window files, each classified by type, issuer and product so both can be
// filtered. Evidence records supply the issuer, scope and date where they
// exist; the rest is read from the title.

import { e40Reports, e40ReportScope } from "@/content/data/e40Evidence";
import { engineeringEvidence, reportedResults, withdrawnDownloads } from "@/content/data/engineeringEvidence";
import { fallbackDownloads, windowTemplates, type DownloadItem } from "@/content/data/downloads";
import type { DocumentType, LibraryDocument } from "@/lib/documentTypes";

export { DOCUMENT_TYPES, DOCUMENT_TYPE_LABELS, type DocumentType, type LibraryDocument } from "@/lib/documentTypes";

const evidenceByFile = new Map(engineeringEvidence.map((record) => [record.file, record]));
const resultsByFile = new Map(reportedResults.map((result) => [result.file, result]));

// Issuers named in document titles and descriptions, most specific first.
const ISSUERS: [RegExp, string][] = [
  [/T[ÜU]V Rheinland/i, "TÜV Rheinland"],
  [/\bCPVT\b/, "CPVT"],
  [/\bIntertek\b/, "Intertek"],
  [/\bSGS\b/, "SGS"],
  [/Passive House Institute|\bPHI\b/, "Passive House Institute"],
  [/\bCABR\b|China Academy of Building Research/, "CABR"],
];

function issuerOf(text: string): string | null {
  return ISSUERS.find(([pattern]) => pattern.test(text))?.[1] ?? null;
}

function typeOf(item: DownloadItem, evidenceKind?: string): DocumentType {
  const text = `${item.title} ${item.format}`;
  if (evidenceKind === "Component certificate") return "Certificate";
  if (evidenceKind === "Test report" || /test report/i.test(text)) return "Test report";
  if (/template/i.test(text) || /^csv$/i.test(item.format)) return "Template";
  if (/\bcad\b|dwg|step|dxf/i.test(text)) return "CAD";
  if (/certificate|declaration|\bepd\b/i.test(text)) return "Certificate";
  if (/catalog|brochure/i.test(text)) return "Catalog";
  return "Data sheet";
}

// Product families named in titles, for documents the evidence index does not list.
const PRODUCTS: [RegExp, string, string][] = [
  [/window|door|fenestration/i, "FRP windows and doors", "/products/frp-window-frames"],
  [/pipe/i, "Pultruded FRP pipe", "/pultruded-frp-profiles"],
  [/wind (energy|turbine)/i, "Wind turbine blade panels", "/products/wind-turbine-blade-panels"],
  [/PU-GF|polyurethane/i, "Custom pultrusions", "/products/custom-pultruded-profiles"],
  [/\bPV\b|solar/i, "Solar mounting and PV frames", "/products/frp-solar-mounting-systems"],
  [/profile|I-beam|channel|angle|tube|E40/i, "Standard profiles", "/products/fiberglass-structural-shapes"],
];

export function classifyDocument(item: DownloadItem): Omit<LibraryDocument, keyof DownloadItem> {
  const evidence = item.file ? evidenceByFile.get(item.file) : undefined;
  const result = item.file ? resultsByFile.get(item.file) : undefined;
  const type = typeOf(item, evidence?.kind);
  const text = `${item.title} ${evidence?.reference ?? ""} ${result?.issuer ?? ""} ${item.description}`;
  const issuer = issuerOf(text) ?? (type === "Certificate" || type === "Test report" ? null : "F1 Composite");
  const product = evidence
    ? { label: evidence.productLabel, href: evidence.product }
    : (() => {
        const match = PRODUCTS.find(([pattern]) => pattern.test(item.title));
        return match ? { label: match[1], href: match[2] } : { label: "All products", href: undefined };
      })();
  return {
    type,
    issuer,
    product: product.label,
    ...(product.href ? { productHref: product.href } : {}),
    ...(evidence?.reference ? { reference: evidence.reference } : {}),
    ...(result ? { date: { label: result.dateLabel, value: result.date } } : {}),
  };
}

/**
 * The downloads page's list: pinned E40 reports and window files first, then
 * the loaded rows without duplicates or withdrawn files. Evidence scope notes
 * replace catalog descriptions where both exist.
 */
export function assembleDocuments(loaded: readonly DownloadItem[] = fallbackDownloads): LibraryDocument[] {
  const windowCatalog = fallbackDownloads.find((item) => item.file === "/downloads/f1composite-frp-window-door-catalog.pdf");
  const pinned: DownloadItem[] = [
    ...e40Reports.map((report) => ({
      title: `E40 evidence — SGS full-section test, ${report.average} GPa`,
      format: "PDF",
      size: report.size,
      description: `${report.reference}. ${e40ReportScope(report)}`,
      file: report.file,
    })),
    ...(windowCatalog ? [windowCatalog] : []),
    ...windowTemplates,
  ];
  const skipped = new Set([...pinned.map((item) => item.file), ...withdrawnDownloads]);
  return [...pinned, ...loaded.filter((item) => !skipped.has(item.file))].map((item) => {
    const document = { ...item, description: (item.file && evidenceByFile.get(item.file)?.scope) || item.description };
    return { ...document, ...classifyDocument(document) };
  });
}

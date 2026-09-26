// Document types and the library record, kept apart from lib/documents.ts so
// the client-side filters do not bundle the evidence data.

import type { DownloadItem } from "@/content/data/downloads";

export const DOCUMENT_TYPES = ["Catalog", "Data sheet", "Test report", "Certificate", "CAD", "Template"] as const;
export type DocumentType = (typeof DOCUMENT_TYPES)[number];

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  Catalog: "Catalogs",
  "Data sheet": "Data sheets",
  "Test report": "Test reports",
  Certificate: "Certificates & declarations",
  CAD: "CAD files",
  Template: "Templates",
};

export interface LibraryDocument extends DownloadItem {
  type: DocumentType;
  /** Laboratory or body that issued the document; F1 Composite for its own catalogs and data. Null when not stated. */
  issuer: string | null;
  /** Product family the document belongs to. */
  product: string;
  productHref?: string;
  reference?: string;
  /** Issue date or validity end, YYYY-MM-DD, when the evidence index records it. */
  date?: { label: "Issued" | "Valid until"; value: string };
}

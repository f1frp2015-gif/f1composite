/** Transcribed from the original SGS reports; report IDs control identification. */
export const e40EvidenceHref = "/resources/technical-data#e40-test-reports";
export const e40TestMethod = "EN 13706-2 Annex D";
export const e40ReportDate = "2026-09-07";

export const e40Reports = [
  {
    id: "sgs-e40-cm01",
    reference: "SHIN2608002943CM01_EN",
    specification: "60605",
    specimen: "2160 × 90 × 90 mm",
    span: 1800,
    rate: 9,
    values: [41.2, 41.1, 40.1],
    average: 40.8,
    file: "/downloads/sgs-full-section-modulus-shin2608002943cm01-en.pdf",
    size: "896 KB",
  },
  {
    id: "sgs-e40-cm02",
    reference: "SHIN2608002943CM02_EN",
    specification: "90905",
    specimen: "1440 × 60 × 60 mm",
    span: 1200,
    rate: 6,
    values: [41.1, 42.1, 41.3],
    average: 41.5,
    file: "/downloads/sgs-full-section-modulus-shin2608002943cm02-en.pdf",
    size: "888 KB",
  },
] as const;

export function e40ReportScope(report: (typeof e40Reports)[number]) {
  return `SGS ${report.reference}, issued ${e40ReportDate}: full-section test to ${e40TestMethod}, ${report.average} GPa average from three specimens. Page 1 specification ${report.specification}; page 3 specimen ${report.specimen}. These size identifiers need clarification before size-specific qualification. Results apply only to the tested samples; conclusion N/A, with an internal-reference use note. Supports the reported 40 GPa-class result, not EN 13706 E40 certification or a design allowable.`;
}

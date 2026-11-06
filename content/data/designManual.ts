/**
 * The FRP Profile Design Manual: document identity and contents.
 *
 * scripts/build-design-manual.mjs reads the identity from here and builds the
 * PDF; /resources/frp-profile-design-manual shows the identity and contents.
 * scripts/design-manual.test.mjs checks that the contents (chapter numbers,
 * titles and start pages) match what the build lays out, so a rebuild that
 * moves a chapter fails until this list is updated.
 */

export const DESIGN_MANUAL = {
  code: "DOC-PF-2026-EN",
  revision: "B",
  issued: "2026-10",
  issuedLabel: "October 2026",
  supersedes: "Rev. A, April 2026 (withdrawn September 2026)",
  file: "/downloads/f1composite-frp-profile-design-manual-2026-rev-b.pdf",
  title: "FRP Profile Design Manual",
  subtitle: "Pultruded structural profiles · EN 13706 grade E23",
  pages: 46,
  fileSize: "3 MB",
} as const;

export interface DesignManualChapter {
  number: string;
  title: string;
  /** Start page in the PDF. */
  page: number;
  /** What the chapter covers, in the manual's own terms. */
  summary: string;
}

export const DESIGN_MANUAL_CONTENTS: readonly DesignManualChapter[] = [
  { number: "01", title: "F1 Composite and the F1-STRUX range", page: 4, summary: "The F1-STRUX standard range: 114 catalog sizes in 8 section families, declared to EN 13706 grade E23." },
  { number: "02", title: "Material: the E23 laminate and resin systems", page: 7, summary: "The laminate values F1 publishes beside the EN 13706 grade minimums, the laminate build-up and the resin systems the same dies run." },
  { number: "03", title: "Design basis", page: 12, summary: "The resistance model, factors and load cases behind every table: ASCE/SEI 74-23 resistance factors, time-effect and environment factors, CEN/TS 19101 and GB 50608 screening." },
  { number: "04", title: "Section tables", page: 20, summary: "All 114 catalog sizes with published mass per meter and the section properties of the nominal section, computed by the same engine as the per-size datasheets." },
  { number: "05", title: "Allowable load tables", page: 27, summary: "Maximum uniform service load in kN/m for every published I-beam, channel, square, rectangular and round tube over simple spans of 1 to 6 m, with the governing check." },
  { number: "06", title: "Applications and systems", page: 31, summary: "Which profile family carries which job, condensed application guides, and the handrail and ladder systems with the load cases they are checked against." },
  { number: "07", title: "Durability: chemical, fire, weathering and temperature", page: 39, summary: "How each durability property is stated by resin formulation, what evidence exists today and what a specification has to ask for." },
  { number: "08", title: "Fabrication, installation and maintenance", page: 42, summary: "Cutting, drilling and assembly from the approved drawing: tooling, support, datums, tolerances, edge treatment and inspection." },
  { number: "09", title: "Ordering, documents and contact", page: 44, summary: "What a quotation needs, what F1 confirms in it, the documents that exist for the profile range and how to reach the engineering team." },
];

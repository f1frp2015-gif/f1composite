/**
 * The FRP Grating Product Manual: document identity.
 *
 * scripts/build-grating-manual.mjs reads the identity from here and builds the
 * PDF; content/data/downloads.ts lists the same file. Rebuild after changing
 * the grating data (moldedGratingSpecs, pultrudedGratingSpecs, gratingClips).
 */
export const GRATING_MANUAL = {
  code: "DOC-GR-2026-EN",
  revision: "A",
  issued: "2026-11",
  issuedLabel: "November 2026",
  file: "/downloads/f1composite-frp-grating-manual-2026-11.pdf",
  title: "FRP Grating Product Manual",
  subtitle: "Molded and pultruded fiberglass grating · F1-GRID",
  pages: 14,
} as const;

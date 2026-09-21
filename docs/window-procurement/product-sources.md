# Window-system product source register

Revision: 2026-09-20. The shared source of truth is `content/data/windowSystems.json`. The catalog builder reads this JSON directly. Original manufacturer documents are preserved unchanged.

## Source and scope

- Supplied source: `风渡画册-中英文-2026-0723(13).pdf`, July 2026, 20 PDF spreads.
- SHA-256: `15394c728623e0c340ddce59f5b611a196aa0fca8adadfa16fb693119a10c68c`.
- PDF page 9: profile labels, old codes and reference mass per metre.
- PDF pages 11-15: system depth, load-bearing wall thickness, reference leaf load and opening illustrations.
- PDF page 19: five subframe size designations. Full dimensional drawings and units remain subject to confirmation.
- Current mapping: approved September 2026 procurement plan v1.2 and explicit user decisions. 50 uses GF0701-03; 55 uses GF0801-04; 90 sliding uses CP001-05; 140 uses CP006-11.

All numerical fields are catalog references, not verified guaranteed ratings. Production availability, drawing revision, interfaces, dimensions, hardware, glazing and test applicability must be confirmed. Uf/Ug/Uw are distinct; no blanket certification or system-wide Uw promise is made.

## Image provenance

Nine JPEGs are clean original embedded corner illustrations extracted with `pypdf`, flattened on white and JPEG-encoded at quality 95. No generated geometry or replacement cross-section was used. Each original image was visually compared with the corresponding source page.

| Asset in `public/images/products/window-systems` | PDF page | Image object | Native size |
|---|---:|---|---|
| `50.jpg` | 11 | Im0.jp2 | 505 x 505 |
| `55.jpg` | 11 | Im1.jp2 | 491 x 491 |
| `60.jpg` | 12 | Im0.jp2 | 505 x 505 |
| `65.jpg` | 12 | Im1.jp2 | 505 x 505 |
| `70.jpg` | 13 | Im0.jp2 | 491 x 491 |
| `80.jpg` | 13 | Im1.jp2 | 434 x 434 |
| `90-casement.jpg` | 14 | Im0.jp2 | 430 x 430 |
| `90-sliding.jpg` | 14 | Im1.jp2 | 476 x 476 |
| `140.jpg` | 15 | Im2.jp2 | 423 x 423 |
| `subframes.jpg` | 19 | rendered crop | 980 x 240 |

The subframe crop uses a 2400 x 1629 rendering of PDF page 19, pixel bounds (110,405)-(1090,645), preserving the five products and their size labels. It excludes claims and unrelated Chinese copy. Images are illustrations, not fabrication drawings, photographs of finished orders or test evidence.

## Current codes and unresolved drawings

The 90 sliding codes CP001-CP005 have `label: "Section details on request"` and `status: "drawing-required"`. No component names, masses or cross-section drawings are invented for these five code positions.

140 legacy mapping follows source order: CP006 = GF0801 outer frame; CP007 = GF0802 former inward-opening mullion; CP008 = GF0803 sliding mullion; CP009 = GF0804 sliding inner sash; CP010 = GF0805 former inward-opening inner sash; CP011 = GF0806 outer-frame closure. Former inward-opening labels remain explicit pending side-pressure assembly confirmation. Legacy GF08 identifiers must not replace current 140 identifiers or be confused with the 55 series.

The current 140 name describes compression-seal / side-pressure sliding. Historical lift-sliding reports retain their original names and are not automatically evidence for this current assembly.

## Rebuild and quality checks

Run `python3 scripts/build-frp-windows-catalog.py` with ReportLab installed. Output remains `public/downloads/f1composite-frp-window-door-catalog.pdf`. This preserves the existing Python build workflow and uses F1 blue #031697 and teal #00A199, English purchasing copy and approved F1 contacts.

The updated catalog has 15 A4 pages: cover, comparison, nine system pages, subframes/custom interfaces, profile workflow, finished-unit workflow and evidence/RFQ. All 15 pages were rendered with Poppler and visually checked; no orphan pages, overflow or clipped table rows remain. All 42 current codes occur in the PDF and match JSON. Source illustrations were separately checked as a contact sheet.

The two CSV templates contain headers and a clearly labelled `BLANK_INPUT_ROW`, no invented orders or formula cells. Empty cells are intentional. Buyers should replace the blank row with their own requirements and clarify dimension basis and units.

## Source-derived profile cross-section strips

Added optional `sectionImage` / `sectionImageAlt` fields for eight systems. Assets use `public/images/products/window-systems/{id}-sections.jpg`. The 90 sliding system intentionally has no section strip: its current five code positions must not be illustrated by the obsolete three-section row.

The eight strips are crops of the actual geometry on PDF page 9, rendered by Poppler at 6000 x 4072 pixels and encoded at JPEG quality 97. No geometry was reconstructed, retouched or generated. Old printed codes, Chinese component captions, mass figures and separator rules are excluded. Left-to-right geometry order matches the shared JSON's profile order. For 140 the source geometries map sequentially to current CP006-CP011; the legacy component/assembly caveats still apply. These are reference illustrations, not dimensioned fabrication drawings.

Reproducible crop bounds below are expressed against a source spread scaled to 1920 pixels wide; multiply every coordinate by 6000/1920 and round for the actual render. Bounds use `(left, top, right, bottom)`.

| System | Crop bounds |
|---|---|
| 50 | (1252, 330, 1554, 386) |
| 55 | (1252, 429, 1642, 486) |
| 60 | (1252, 525, 1825, 586) |
| 65 | (1252, 625, 1825, 686) |
| 70 | (1252, 724, 1825, 785) |
| 80 | (1252, 823, 1555, 884) |
| 90-casement | (1252, 923, 1555, 980) |
| 140 | (1252, 1122, 1825, 1180) |

All eight strips were visually inspected together at readable size; all source geometry is retained, no captions overlap, and edges are unclipped. The existing 15-page PDF remains unchanged during this image addition; it presents corner illustrations and the current profile list.

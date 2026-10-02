"""Add the holder and verification note to F1's English copies of lab reports.

F1's copies place each original laboratory page at 100% and add English notes
in a column on the right. This script writes one more note at the foot of that
column on every page: who holds the report, that it covers only that holder's
samples, and where to verify it. Laboratory originals are never touched.

Run once per new copy (requires PyMuPDF: pip install pymupdf):
    python3 scripts/stamp-annotated-reports.py
It skips pages that already carry the note, and saves incrementally so the
original bytes stay intact.
"""

from pathlib import Path

import pymupdf

ROOT = Path(__file__).resolve().parent.parent
SITE = "www.f1composite.com"
MARK = "Report holder:"

COPIES = {
    "frp-composite-profile-sgs-ul94-v0-test-report-gzmr260702529004-en.pdf": "sgs-gzmr260702529004",
    "frp-pv-module-frame-material-performance-test-report-2025dacs20319-en.pdf": "cpvt-2025dacs20319",
}

NOTE = (
    MARK
    + " Chongqing Xianju New Material Co., Ltd., part of FengDu New Material (F1 Composite is"
    " FengDu's export company). The results cover only that company's samples, not other"
    " suppliers' products. Verify: {site}/resources/evidence/{slug}"
)


def stamp(path: Path, slug: str) -> int:
    doc = pymupdf.open(path)
    stamped = 0
    for page in doc:
        if MARK in page.get_text():
            continue
        width = page.rect.width
        # The notes column starts at x = 617 pt; its page footer sits at y = 814 pt.
        box = pymupdf.Rect(width - 318.5, 771, width - 27.5, 811)
        page.draw_line(box.tl, box.tr, color=(0.75, 0.75, 0.75), width=0.5)
        overflow = page.insert_textbox(
            box + (0, 3, 0, 0),
            NOTE.format(site=SITE, slug=slug),
            fontname="helv",
            fontsize=6.6,
            color=(0.2, 0.2, 0.2),
        )
        if overflow < 0:
            raise SystemExit(f"{path.name} page {page.number + 1}: note does not fit ({overflow:.1f} pt)")
        stamped += 1
    if stamped:
        doc.saveIncr()
    doc.close()
    return stamped


if __name__ == "__main__":
    for name, slug in COPIES.items():
        count = stamp(ROOT / "public" / "downloads" / name, slug)
        print(f"{name}: stamped {count} pages")

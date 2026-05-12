#!/usr/bin/env python3
"""
Build F1 Composite Pultruded FRP Window & Door Catalog (PDF).

Output: public/downloads/f1composite-frp-window-door-catalog.pdf

Independent F1 Composite-branded English catalog covering pultruded GFRP
window and door profile systems (70 / 80 / 90 / 140 series). Technical
data is drawn from independent third-party laboratory testing and from
industry-standard material values; product naming, framing, and brand
narrative are F1 Composite-original.
"""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    Image,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


# Brand palette (same as F1 Composite datasheets)
TEAL = colors.HexColor("#0F7B7B")
TEAL_DARK = colors.HexColor("#0A5A5A")
INK = colors.HexColor("#15181B")
INK_2 = colors.HexColor("#4A5159")
INK_3 = colors.HexColor("#8B9098")
BORDER = colors.HexColor("#D8DCDF")
BG_HEAD = colors.HexColor("#0F7B7B")
BG_ALT = colors.HexColor("#F4F6F7")
COVER_BG = colors.HexColor("#0F7B7B")

REPO = Path(__file__).resolve().parent.parent
IMG = REPO / "public" / "images" / "products" / "fenestration"

W, H = A4


def cover_page(canvas, doc):
    # Solid teal cover with title
    canvas.saveState()
    canvas.setFillColor(COVER_BG)
    canvas.rect(0, 0, W, H, fill=1, stroke=0)

    # Brand mark
    canvas.setFillColor(colors.white)
    canvas.setFont("Helvetica-Bold", 16)
    canvas.drawString(20 * mm, H - 24 * mm, "F1 COMPOSITE")
    canvas.setFont("Helvetica", 8)
    canvas.drawString(20 * mm, H - 30 * mm, "Pultruded FRP Profiles · Engineered for Fenestration")

    # Title block
    canvas.setFillColor(colors.white)
    canvas.setFont("Helvetica-Bold", 36)
    canvas.drawString(20 * mm, H - 130 * mm, "Pultruded FRP")
    canvas.drawString(20 * mm, H - 145 * mm, "Window & Door")
    canvas.drawString(20 * mm, H - 160 * mm, "Catalog")

    # Subtitle
    canvas.setFont("Helvetica", 12)
    canvas.drawString(
        20 * mm, H - 180 * mm,
        "Engineered glass-fibre composite frame systems for residential,"
    )
    canvas.drawString(
        20 * mm, H - 187 * mm,
        "commercial and passive-house fenestration projects."
    )

    canvas.setFont("Helvetica-Bold", 10)
    canvas.drawString(20 * mm, H - 205 * mm, "Edition 2026 · F1-CAT-WIN-001")

    # Footer
    canvas.setFont("Helvetica", 9)
    canvas.drawString(20 * mm, 22 * mm, "F1 Composite")
    canvas.drawString(20 * mm, 17 * mm, "sales@f1composite.com  ·  www.f1composite.com")
    canvas.restoreState()


def interior_header_footer(canvas, doc):
    canvas.saveState()

    canvas.setFillColor(TEAL)
    canvas.setFont("Helvetica-Bold", 11)
    canvas.drawString(20 * mm, H - 14 * mm, "F1 COMPOSITE")
    canvas.setFillColor(INK_3)
    canvas.setFont("Helvetica", 8)
    canvas.drawRightString(
        W - 20 * mm, H - 14 * mm,
        "Window & Door Catalog  ·  F1-CAT-WIN-001  ·  Edition 2026",
    )

    canvas.setStrokeColor(BORDER)
    canvas.setLineWidth(0.5)
    canvas.line(20 * mm, 18 * mm, W - 20 * mm, 18 * mm)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(INK_3)
    canvas.drawString(
        20 * mm, 12 * mm,
        "F1 Composite  ·  sales@f1composite.com  ·  www.f1composite.com",
    )
    canvas.drawRightString(W - 20 * mm, 12 * mm, f"Page {doc.page - 1}")
    canvas.restoreState()


def make_styles():
    base = getSampleStyleSheet()
    s = {}
    s["h1"] = ParagraphStyle(
        "h1", parent=base["Heading1"],
        fontName="Helvetica-Bold", fontSize=22, leading=26,
        textColor=INK, spaceBefore=0, spaceAfter=6,
    )
    s["h2"] = ParagraphStyle(
        "h2", parent=base["Heading2"],
        fontName="Helvetica-Bold", fontSize=13, leading=17,
        textColor=TEAL, spaceBefore=12, spaceAfter=5,
    )
    s["h3"] = ParagraphStyle(
        "h3", parent=base["Heading3"],
        fontName="Helvetica-Bold", fontSize=11, leading=15,
        textColor=INK, spaceBefore=8, spaceAfter=3,
    )
    s["lead"] = ParagraphStyle(
        "lead", parent=base["Normal"],
        fontName="Helvetica", fontSize=10.5, leading=15,
        textColor=INK_2, spaceAfter=8,
    )
    s["body"] = ParagraphStyle(
        "body", parent=base["Normal"],
        fontName="Helvetica", fontSize=9.5, leading=13.5,
        textColor=INK_2, spaceAfter=4,
    )
    s["caption"] = ParagraphStyle(
        "caption", parent=base["Normal"],
        fontName="Helvetica-Oblique", fontSize=8.5, leading=12,
        textColor=INK_3, spaceAfter=6,
    )
    s["cell"] = ParagraphStyle(
        "cell", fontName="Helvetica", fontSize=8.5, leading=11,
        textColor=INK, alignment=1,
    )
    return s


def section_band(title, subtitle=None):
    rows = [[title]]
    if subtitle:
        rows.append([subtitle])
    tbl = Table(rows, colWidths=[170 * mm])
    style = [
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 18),
        ("TEXTCOLOR", (0, 0), (-1, 0), INK),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, 0), 0),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 10),
        ("LINEBELOW", (0, 0), (-1, 0), 1.0, TEAL),
    ]
    if subtitle:
        style += [
            ("FONTNAME", (0, 1), (-1, 1), "Helvetica"),
            ("FONTSIZE", (0, 1), (-1, 1), 10),
            ("TEXTCOLOR", (0, 1), (-1, 1), INK_2),
            ("TOPPADDING", (0, 1), (-1, 1), 6),
            ("BOTTOMPADDING", (0, 1), (-1, 1), 0),
        ]
    tbl.setStyle(TableStyle(style))
    return tbl


def _wrap_cell(c, cell_style):
    if isinstance(c, str) and ("<sub>" in c or "<super>" in c or "<b>" in c):
        return Paragraph(c, cell_style)
    return c


def data_table(header, rows, col_widths, highlight_col=None, cell_style=None):
    if cell_style is None:
        cell_style = ParagraphStyle(
            "rich_cell", fontName="Helvetica", fontSize=8.5, leading=11,
            textColor=INK, alignment=1,
        )
    header = [_wrap_cell(h, cell_style) for h in header]
    rows = [[_wrap_cell(c, cell_style) for c in row] for row in rows]
    data = [header] + rows
    tbl = Table(data, colWidths=col_widths, repeatRows=1)
    style = [
        ("BACKGROUND", (0, 0), (-1, 0), BG_HEAD),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 8.5),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 6),
        ("TOPPADDING", (0, 0), (-1, 0), 6),
        ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 1), (-1, -1), 8.5),
        ("TEXTCOLOR", (0, 1), (-1, -1), INK),
        ("ALIGN", (1, 0), (-1, -1), "CENTER"),
        ("ALIGN", (0, 0), (0, -1), "LEFT"),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 1), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 1), (-1, -1), 4),
        ("LINEBELOW", (0, 0), (-1, 0), 0.8, BG_HEAD),
        ("LINEBELOW", (0, 1), (-1, -1), 0.4, BORDER),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, BG_ALT]),
    ]
    if highlight_col is not None:
        style.append(("FONTNAME", (highlight_col, 1), (highlight_col, -1), "Helvetica-Bold"))
        style.append(("TEXTCOLOR", (highlight_col, 1), (highlight_col, -1), TEAL))
    tbl.setStyle(TableStyle(style))
    return tbl


def kv_table(rows, widths=(45 * mm, 120 * mm)):
    tbl = Table(rows, colWidths=widths)
    tbl.setStyle(TableStyle([
        ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
        ("FONTNAME", (1, 0), (1, -1), "Helvetica"),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("TEXTCOLOR", (0, 0), (0, -1), INK_2),
        ("TEXTCOLOR", (1, 0), (1, -1), INK),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("LINEBELOW", (0, 0), (-1, -2), 0.3, BORDER),
    ]))
    return tbl


def img(path, max_w_mm, max_h_mm):
    """Embed image preserving aspect ratio within bounds."""
    full = IMG / path
    if not full.exists():
        return Spacer(1, 4 * mm)
    return Image(str(full), width=max_w_mm * mm, height=max_h_mm * mm, kind="proportional")


# =========================================================================
# Catalog content
# =========================================================================

def build(output: Path):
    doc = SimpleDocTemplate(
        str(output),
        pagesize=A4,
        leftMargin=20 * mm,
        rightMargin=20 * mm,
        topMargin=22 * mm,
        bottomMargin=22 * mm,
        title="F1 Composite — Pultruded FRP Window & Door Catalog",
        author="F1 Composite",
        subject="Pultruded GFRP window and door frame profile systems",
        creator="F1 Composite",
    )

    s = make_styles()
    flow = []

    # ---- Cover (no content; rendered by cover_page) ----
    flow.append(PageBreak())

    # ---- Page 1: About F1 Composite ----
    flow.append(section_band("About F1 Composite", "Pultruded composite profiles for global fenestration"))
    flow.append(Spacer(1, 4 * mm))
    flow.append(Paragraph(
        "F1 Composite supplies pultruded fibre-reinforced polymer (FRP) window "
        "and door frame profiles to specifiers, fabricators and developers in "
        "more than 30 countries. Our fenestration range — 70, 80, 90 and 140 "
        "series frames — covers the full performance envelope from value-class "
        "casement to passive-house-certified ultra-low-energy systems, with "
        "matching sliding-door profiles for large patio openings up to 3.0 m "
        "tall.",
        s["lead"],
    ))
    flow.append(Paragraph(
        "Every profile is continuously pultruded with high-content E-glass "
        "roving in a polyurethane or polyester resin matrix, finished with "
        "weather-resistant powder coating, and supplied with full third-party "
        "test documentation against EN 14351-1, AS 2047, PHI passive-house, "
        "and project-specific national codes.",
        s["body"],
    ))

    flow.append(Paragraph("Why specifiers choose F1 Composite", s["h2"]))
    flow.append(Paragraph(
        "<b>Engineering depth.</b> Every series ships with documented thermal "
        "(U<sub>f</sub>), structural (EN 12210 wind load), water (EN 12208) "
        "and air (EN 12207) performance — not catalogue claims.",
        s["body"],
    ))
    flow.append(Paragraph(
        "<b>One material across climates.</b> The same FRP profile system "
        "performs at -40 °C / 180 °F service temperatures, hot-humid coastal, "
        "and high-UV high-altitude environments, simplifying multi-region "
        "specification.",
        s["body"],
    ))
    flow.append(Paragraph(
        "<b>Independent qualification.</b> AS 2047 reports issued at "
        "IAS-accredited Intertek Shanghai Fengxian; passive-house certification "
        "from PHI Darmstadt; supplementary national-code packages on request.",
        s["body"],
    ))

    flow.append(PageBreak())

    # ---- Page 2: The pultrusion advantage ----
    flow.append(section_band("The Pultrusion Advantage for Fenestration"))
    flow.append(Spacer(1, 4 * mm))
    flow.append(Paragraph(
        "Pultrusion is a continuous composite manufacturing process: glass "
        "fibre roving is pulled through a thermosetting resin bath and a "
        "heated forming die, emerging as a long, dimensionally stable composite "
        "section. For window and door frames the process delivers four "
        "structural characteristics that competing materials cannot match in "
        "combination.",
        s["lead"],
    ))

    flow.append(Paragraph("1. Dimensional stability across temperature", s["h3"]))
    flow.append(Paragraph(
        "Linear thermal expansion coefficient of pultruded GFRP is "
        "≈ 5.5 – 6.5 × 10<sup>-6</sup> /°C, an order of magnitude lower than "
        "aluminium (22 – 24 × 10<sup>-6</sup>) and PVC-U (60 – 80 × 10<sup>-6</sup>). "
        "The frame stays dimensionally true across the 220 °C service window "
        "(-40 to +180 °F), eliminating the seal-fatigue failure modes that "
        "shorten the service life of metal and polymer frames.",
        s["body"],
    ))

    flow.append(Paragraph("2. Thermal performance comparable to wood", s["h3"]))
    flow.append(Paragraph(
        "Thermal conductivity of GFRP composite is ≈ 0.28 W/(m·K), close to "
        "softwood (0.13 – 0.18) and approximately 570× lower than aluminium "
        "(160). The frame itself does not need a thermal-break insert; the "
        "composite is the thermal break. This single property is what makes "
        "GFRP the natural specification for passive-house and ultra-low-energy "
        "buildings.",
        s["body"],
    ))

    flow.append(Paragraph("3. Strength-to-weight ratio above metals", s["h3"]))
    flow.append(Paragraph(
        "GFRP tensile strength of 950 – 1350 MPa at a density of 2.1 g/cm³ "
        "gives a specific strength near 580 — well above aluminium (74 – 111) "
        "and PVC-U (25 – 37). Larger leaves are supported on slimmer sections "
        "with no need for steel stiffening inserts.",
        s["body"],
    ))

    flow.append(Paragraph("4. Corrosion-immune and dimensionally permanent", s["h3"]))
    flow.append(Paragraph(
        "Glass-fibre composite does not rust, rot, warp or galvanically corrode. "
        "Coastal, marine and chemically aggressive environments — the failure "
        "modes that drive aluminium and timber replacement cycles — leave GFRP "
        "frames unchanged across the building lifespan.",
        s["body"],
    ))

    flow.append(PageBreak())

    # ---- Page 3: Material comparison ----
    flow.append(section_band("Material Performance Comparison",
                             "Pultruded GFRP vs. aluminium, PVC-U and softwood"))
    flow.append(Spacer(1, 4 * mm))
    flow.append(Paragraph(
        "The table below summarises the key engineering properties that drive "
        "frame-system selection. Values are industry-typical ranges for "
        "fenestration-grade material; F1 Composite series-specific values are "
        "given in the individual product pages.",
        s["caption"],
    ))

    flow.append(data_table(
        ["Property", "GFRP (F1)", "Aluminium", "PVC-U", "Pine"],
        [
            ["Density (g/cm<super>3</super>)",         "2.12",       "2.69",       "1.35 – 1.55", "0.40 – 0.75"],
            ["Thermal conductivity W/(m·K)",           "0.28",       "160",        "0.17",        "0.13 – 0.18"],
            ["Tensile strength (MPa)",                 "950 – 1350", "160 – 200",  "35 – 52",     "80 – 120"],
            ["Flexural strength (MPa)",                "1150 – 1480","170 – 230",  "70 – 110",    "118 – 142"],
            ["Flexural modulus (GPa)",                 "37 – 45",    "60 – 71",    "2.2 – 5.0",   "13.3 – 16.2"],
            ["Poisson's ratio",                        "0.30 – 0.38","0.33 – 0.35","0.32 – 0.36", "0.30 – 0.49"],
            ["CTE ×10<super>-6</super> /°C",           "5.5 – 6.5",  "22 – 24",    "60 – 80",     "8.5 – 11.6"],
            ["Specific strength (str/density)",        "≈ 580",      "74 – 111",   "25 – 37",     "90 – 110"],
            ["Service / softening (°C)",               "1360 melt",  "580 – 660",  "160 – 220",   "200 – 290"],
        ],
        col_widths=[55 * mm, 28 * mm, 28 * mm, 28 * mm, 26 * mm],
        highlight_col=1,
    ))

    flow.append(Paragraph("Carbon footprint", s["h2"]))
    flow.append(Paragraph(
        "Cradle-to-gate CO<sub>2</sub> equivalent for a typical 1.5 × 1.5 m "
        "residential window frame (frame material only, four glazing performance "
        "points from U<sub>w</sub> 1.8 to 0.8):",
        s["body"],
    ))
    flow.append(data_table(
        ["U-value class", "GFRP frame (kg CO<sub>2</sub>e)", "Aluminium frame (kg CO<sub>2</sub>e)"],
        [
            ["U<sub>w</sub> 1.8", "91",  "451"],
            ["U<sub>w</sub> 1.4", "91",  "465"],
            ["U<sub>w</sub> 1.1", "91",  "480"],
            ["U<sub>w</sub> 0.8", "101", "537"],
        ],
        col_widths=[40 * mm, 55 * mm, 60 * mm],
        highlight_col=1,
    ))
    flow.append(Spacer(1, 3 * mm))
    flow.append(Paragraph(
        "GFRP frame embodied carbon is roughly one-fifth that of an equivalent "
        "aluminium frame across the residential U<sub>w</sub> performance "
        "range. The gap widens at high-performance specifications because "
        "aluminium systems require additional thermal-break complexity to "
        "reach the same U<sub>w</sub>.",
        s["caption"],
    ))

    flow.append(PageBreak())

    # ---- Page 4: Frame series at a glance ----
    flow.append(section_band("Frame Series at a Glance",
                             "Five system widths to match application class"))
    flow.append(Spacer(1, 4 * mm))
    flow.append(data_table(
        ["Series", "Frame width", "Opening modes", "Best U_w (W/m²K)", "Max leaf load"],
        [
            ["70-Series Casement",      "70 mm",  "Inward / outward / tilt-turn", "1.23", "120 kg"],
            ["80-Series Tilt-Turn",     "80 mm",  "Inward / tilt-turn",            "1.07", "130 kg"],
            ["90-Series Casement",      "90 mm",  "Inward / tilt-turn / French",   "0.82", "130 kg"],
            ["90-Series Sliding",       "90 mm",  "Horizontal slide",              "1.70", "120 kg"],
            ["140-Series Sliding Door", "140 mm", "Lift-slide / horizontal slide", "1.02", "200 kg"],
        ],
        col_widths=[44 * mm, 22 * mm, 50 * mm, 28 * mm, 26 * mm],
        highlight_col=3,
    ))
    flow.append(Spacer(1, 4 * mm))
    flow.append(Paragraph(
        "<b>Series selection guide.</b> 70-Series is the practical entry point "
        "for residential and light-commercial work where U<sub>w</sub> "
        "≤ 1.5 W/m²K and standard glazing builds (5LowE+12A+5) deliver the "
        "specification. 80-Series serves cold-climate residential and "
        "Passive-House-aligned commercial projects where U<sub>w</sub> ≤ 1.1 is "
        "required. 90-Series is the premium specification: passive-house "
        "certified, certified to PHI phA arctic climate class, and the natural "
        "choice for Net-Zero and ultra-low-energy projects. 140-Series sliding "
        "doors handle 3 × 2.4 m patio openings without aluminium support "
        "stiffeners and meet AS 2047-2014 / AS/NZS 4420.1-2016 for the "
        "Australian premium market.",
        s["body"],
    ))

    flow.append(Paragraph("Performance basis", s["h2"]))
    flow.append(Paragraph(
        "All performance classes are reported per the European fenestration "
        "framework: water tightness per <b>EN 12208</b>, air permeability per "
        "<b>EN 12207</b>, wind load resistance per <b>EN 12210</b>, U-value "
        "per <b>EN ISO 10077-1</b>, acoustic R<sub>w</sub> per <b>EN ISO 717-1</b>. "
        "AS 2047 / AS/NZS 4420.1 test reports are issued at IAS-accredited "
        "Intertek Shanghai Fengxian on project request. NFRC and PHI "
        "passive-house component certifications are issued by the respective "
        "bodies.",
        s["body"],
    ))

    flow.append(PageBreak())

    # ---- 70-Series page ----
    flow.append(section_band("70-Series Casement",
                             "Mid-performance frame for residential and light commercial"))
    flow.append(Spacer(1, 4 * mm))
    seventy_img = img("frp-window-frame-70-series-outward.webp", 80, 60)
    head = Table([[seventy_img, Paragraph(
        "<b>System overview.</b> 70 mm frame width with 3.0 mm load-bearing "
        "wall thickness. Supports outward, inward, tilt-turn and awning "
        "configurations from a single profile family. Standard powder-coat "
        "finish, weather-resistant top coat compatible with EN 12206 / "
        "AAMA 2604 finishes.",
        s["body"],
    )]], colWidths=[85 * mm, 80 * mm])
    head.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
    ]))
    flow.append(head)
    flow.append(Spacer(1, 4 * mm))

    flow.append(Paragraph("Specifications", s["h3"]))
    flow.append(kv_table([
        ["Frame thickness",       "70 mm"],
        ["Load-bearing wall",     "3.0 mm"],
        ["Max leaf load",         "120 kg"],
        ["Opening modes",         "Inward, outward, tilt-turn, awning"],
        ["Performance class",     "Thermal 8 · Sound 4 · Watertight 6 · Airtight 8 · Wind 9"],
        ["Reference standard",    "EN 14351-1; AS 2047 on request"],
    ]))

    flow.append(Paragraph("Recommended glazing configurations", s["h3"]))
    flow.append(data_table(
        ["Glass build", "U_g (W/m²K)", "U_f (W/m²K)", "U_w (W/m²K)", "Hardware"],
        [
            ["5 Low-E + 12Ar + 5 Low-E + 12Ar + 5",  "0.81", "1.16", "1.23", "Universal"],
            ["5 Low-E + 12A + 5 + 12A + 5",          "1.34", "1.16", "1.50", "Universal"],
            ["5 Double-Silver Low-E + 12A + 5",      "1.76", "1.16", "1.79", "Universal"],
        ],
        col_widths=[68 * mm, 22 * mm, 24 * mm, 24 * mm, 27 * mm],
        highlight_col=3,
    ))

    flow.append(PageBreak())

    # ---- 80-Series page ----
    flow.append(section_band("80-Series Casement",
                             "Premium thermal performance for cold-climate residential"))
    flow.append(Spacer(1, 4 * mm))
    eighty_img = img("frp-window-frame-80-series-tilt-turn.webp", 80, 60)
    head = Table([[eighty_img, Paragraph(
        "<b>System overview.</b> 80 mm frame width with 3.0 mm load-bearing "
        "wall thickness. Engineered for tilt-turn operation with reinforced "
        "corner geometry; standard configuration for cold-climate residential "
        "where U<sub>w</sub> ≤ 1.1 W/m²K is required.",
        s["body"],
    )]], colWidths=[85 * mm, 80 * mm])
    head.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
    ]))
    flow.append(head)
    flow.append(Spacer(1, 4 * mm))

    flow.append(Paragraph("Specifications", s["h3"]))
    flow.append(kv_table([
        ["Frame thickness",       "80 mm"],
        ["Load-bearing wall",     "3.0 mm"],
        ["Max leaf load",         "130 kg"],
        ["Opening modes",         "Inward, tilt-turn"],
        ["Performance class",     "Thermal 9 · Sound 4 · Watertight 6 · Airtight 8 · Wind 9"],
        ["Reference standard",    "EN 14351-1; suitable for Green Building 3-star"],
    ]))

    flow.append(Paragraph("Recommended glazing configurations", s["h3"]))
    flow.append(data_table(
        ["Glass build", "U_g (W/m²K)", "U_f (W/m²K)", "U_w (W/m²K)", "Hardware"],
        [
            ["5 + 12Ar + 5 Low-E + 12Ar + 5 Low-E",  "0.81", "0.92", "1.07", "Universal"],
            ["5 + 12Ar + 5 + 12Ar + 5 Low-E",        "1.12", "0.92", "1.28", "Universal"],
            ["5 Low-E + 12A + 5 + 12A + 5",          "1.34", "0.92", "1.42", "Universal"],
        ],
        col_widths=[68 * mm, 22 * mm, 24 * mm, 24 * mm, 27 * mm],
        highlight_col=3,
    ))

    flow.append(PageBreak())

    # ---- 90-Series page ----
    flow.append(section_band("90-Series Casement",
                             "Passive-house certified · PHI phA arctic class"))
    flow.append(Spacer(1, 4 * mm))
    ninety_img = img("frp-window-frame-90-series-sliding.webp", 80, 60)
    head = Table([[ninety_img, Paragraph(
        "<b>System overview.</b> 90 mm frame width with 3.0 mm load-bearing "
        "wall thickness and high-performance triple-glazing channel. The "
        "90-Series carries PHI passive-house component certification "
        "(Component-ID 2491wi03, phA arctic climate class) and is the natural "
        "choice for Net-Zero, passive-house and ultra-low-energy projects.",
        s["body"],
    )]], colWidths=[85 * mm, 80 * mm])
    head.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
    ]))
    flow.append(head)
    flow.append(Spacer(1, 4 * mm))

    flow.append(Paragraph("Specifications", s["h3"]))
    flow.append(kv_table([
        ["Frame thickness",       "90 mm"],
        ["Load-bearing wall",     "3.0 mm"],
        ["Max leaf load",         "130 kg"],
        ["Opening modes",         "Inward, tilt-turn, French"],
        ["Performance class",     "Thermal 10 · Sound 5 · Watertight 6 · Airtight 8 · Wind 9"],
        ["Certification",         "PHI passive-house phA arctic; EN 14351-1; AS 2047 on request"],
    ]))

    flow.append(Paragraph("Recommended glazing configurations", s["h3"]))
    flow.append(data_table(
        ["Glass build", "U_g (W/m²K)", "U_f (W/m²K)", "U_w (W/m²K)", "Hardware"],
        [
            ["5 + 16Ar + 5 Low-E + 16Ar + 5 Low-E",  "0.79", "0.83", "0.82", "Universal"],
            ["5 + 12Ar + 5 Low-E + 12Ar + 5 Low-E",  "0.81", "0.83", "1.01", "Universal"],
            ["5 + 12Ar + 5 + 12Ar + 5 Low-E",        "1.12", "0.83", "1.14", "Universal"],
        ],
        col_widths=[68 * mm, 22 * mm, 24 * mm, 24 * mm, 27 * mm],
        highlight_col=3,
    ))

    flow.append(PageBreak())

    # ---- 140-Series sliding door page ----
    flow.append(section_band("140-Series Sliding Door",
                             "Large-format lift-slide patio doors to 3 × 2.4 m"))
    flow.append(Spacer(1, 4 * mm))
    one40_img = img("frp-window-frame-140-series-sliding.webp", 80, 60)
    head = Table([[one40_img, Paragraph(
        "<b>System overview.</b> 140 mm frame width sliding-door system, "
        "engineered to handle 3000 × 2400 mm patio openings without aluminium "
        "stiffening. AS 2047-2014 / AS/NZS 4420.1-2016 tested at IAS-accredited "
        "Intertek Shanghai Fengxian under Intertek Report 240821010SHF-002 — "
        "air infiltration, water penetration at 600 Pa, structural integrity "
        "at 3000 Pa.",
        s["body"],
    )]], colWidths=[85 * mm, 80 * mm])
    head.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
    ]))
    flow.append(head)
    flow.append(Spacer(1, 4 * mm))

    flow.append(Paragraph("Specifications", s["h3"]))
    flow.append(kv_table([
        ["Frame thickness",        "140 mm"],
        ["Load-bearing wall",      "3.0 mm"],
        ["Max leaf load",          "200 kg"],
        ["Opening modes",          "Lift-slide, horizontal slide"],
        ["Performance class",      "Thermal 10 · Sound 4 · Watertight 6 · Airtight 8 · Wind 9"],
        ["Certification",          "AS 2047 / AS/NZS 4420.1; EN 14351-1; AAMA 2604 finish"],
    ]))

    flow.append(Paragraph("Recommended glazing configurations", s["h3"]))
    flow.append(data_table(
        ["Glass build", "U_g (W/m²K)", "U_f (W/m²K)", "U_w (W/m²K)", "Hardware"],
        [
            ["5 + 16Ar + 5 Low-E + 16Ar + 5 Low-E",  "0.79", "0.90", "1.02", "Universal"],
            ["5 + 12Ar + 5 Low-E + 12Ar + 5 Low-E",  "0.81", "0.90", "1.04", "Universal"],
            ["5 + 12Ar + 5 + 12Ar + 5 Low-E",        "1.12", "0.90", "1.25", "Universal"],
        ],
        col_widths=[68 * mm, 22 * mm, 24 * mm, 24 * mm, 27 * mm],
        highlight_col=3,
    ))

    flow.append(PageBreak())

    # ---- Energy code matching ----
    flow.append(section_band("Matching Frame Series to Building Energy Code"))
    flow.append(Spacer(1, 4 * mm))
    flow.append(Paragraph(
        "Use the table below to map each series to the energy-performance "
        "level that your project's national building code, voluntary "
        "certification scheme, or developer specification requires. F1 "
        "Composite engineering can issue project-specific calculation packs "
        "for any of these schemes on request.",
        s["lead"],
    ))
    flow.append(data_table(
        ["Scheme", "70-Series", "80-Series", "90-Series", "140-Series"],
        [
            ["EU EN 14351-1 / nZEB",              "✓", "✓", "✓", "✓"],
            ["PHI Passive House (phA arctic)",    "—", "—", "✓", "—"],
            ["AS 2047 / AS/NZS 4420.1 (Australia)","✓", "✓", "✓", "✓"],
            ["NFRC ENERGY STAR (US)",             "✓", "✓", "✓", "✓"],
            ["China GB 50189 Green Building",     "✓", "✓", "✓", "✓"],
            ["Ultra-low-energy / Net-Zero",       "—", "✓", "✓", "✓"],
        ],
        col_widths=[60 * mm, 24 * mm, 24 * mm, 24 * mm, 24 * mm],
    ))
    flow.append(Spacer(1, 4 * mm))
    flow.append(Paragraph(
        "<b>Climate zone guidance.</b> Hot-dry and hot-humid coastal: "
        "70-Series or 80-Series with double-silver Low-E glass build. "
        "Temperate / mixed-humid: 80-Series tilt-turn with triple glazing. "
        "Cold and severe-cold (including PHI passive house): 90-Series with "
        "argon-filled triple Low-E. Marine and coastal: any series with "
        "AAMA 2604 powder-coat finish; FRP is corrosion-immune.",
        s["body"],
    ))

    flow.append(Paragraph("Acoustic performance", s["h3"]))
    flow.append(Paragraph(
        "All F1 Composite series achieve EN ISO 717-1 sound reduction class "
        "4 minimum (R<sub>w</sub> ≥ 35 dB); the 90-Series with asymmetric "
        "laminated glazing reaches class 5 (R<sub>w</sub> ≥ 40 dB) suitable "
        "for airport-adjacent and high-traffic urban developments.",
        s["body"],
    ))

    flow.append(PageBreak())

    # ---- Sub-frame & customisation ----
    flow.append(section_band("Sub-Frame Profiles and Customisation"))
    flow.append(Spacer(1, 4 * mm))
    flow.append(Paragraph(
        "F1 Composite supplies five standard pultruded GFRP sub-frame profiles "
        "for wall integration, structurally rated to support the full leaf "
        "load of any window or door series in the catalog.",
        s["lead"],
    ))
    flow.append(data_table(
        ["Sub-frame profile", "Section (mm × mm)", "Use case"],
        [
            ["F1-SF-65×24",   "65 × 24",  "Lightweight residential, retrofit installation"],
            ["F1-SF-75×25",   "75 × 25",  "Standard residential casement and tilt-turn"],
            ["F1-SF-75×50",   "75 × 50",  "Heavy casement and prefabricated modular wall"],
            ["F1-SF-90×25",   "90 × 25",  "90-Series passive-house casement"],
            ["F1-SF-90×50",   "90 × 50",  "Sliding-door perimeter and large-format leaves"],
        ],
        col_widths=[40 * mm, 40 * mm, 85 * mm],
    ))

    flow.append(Paragraph("Custom pultruded profiles", s["h2"]))
    flow.append(Paragraph(
        "Beyond the standard catalog, F1 Composite designs and pultrudes "
        "project-specific profiles. Typical custom-engineering requests:",
        s["body"],
    ))
    flow.append(Paragraph(
        "<b>Specialised mechanical performance</b> — higher fibre volume, "
        "biaxial reinforcement, or hybrid carbon-fibre sections for tall "
        "openings and curtain-wall integration.",
        s["body"],
    ))
    flow.append(Paragraph(
        "<b>Environmental enhancement</b> — marine-grade resin systems for "
        "coastal exposure, UV-stabilised matrix for high-altitude and tropical "
        "service, fire-retardant formulations meeting national class B1 / "
        "B2 ratings.",
        s["body"],
    ))
    flow.append(Paragraph(
        "<b>Architectural geometry</b> — historic-replication profiles for "
        "heritage replacement work, slim sight-line profiles for curtain-wall "
        "integration, and curved pultrusion for arched openings.",
        s["body"],
    ))

    flow.append(PageBreak())

    # ---- Sustainability ----
    flow.append(section_band("Sustainability and Lifecycle"))
    flow.append(Spacer(1, 4 * mm))

    flow.append(Paragraph("Embodied carbon", s["h3"]))
    flow.append(Paragraph(
        "Pultruded GFRP frames carry roughly 1/5 the cradle-to-gate CO₂ of "
        "equivalent aluminium frames and 1/3 of equivalent PVC-U frames at "
        "matched U-value. EN 15804 Environmental Product Declarations are "
        "available on request for project-specific lifecycle assessment.",
        s["body"],
    ))

    flow.append(Paragraph("Service life", s["h3"]))
    flow.append(Paragraph(
        "Service life of pultruded GFRP frames matches the building lifespan "
        "(50 – 100 years) under normal exposure. There is no rust, no rot, no "
        "warpage; the seal-fatigue failure mode driven by thermal expansion "
        "is suppressed by the low CTE. Replacement-cycle costs across a 50-year "
        "building life favour GFRP over aluminium and PVC-U by a factor of "
        "2 – 4× in lifecycle cost analysis.",
        s["body"],
    ))

    flow.append(Paragraph("End-of-life", s["h3"]))
    flow.append(Paragraph(
        "End-of-life FRP frames can be mechanically shredded and used as "
        "filler in construction concrete or as raw feed for secondary FRP "
        "products. F1 Composite participates in industry-wide composite "
        "recycling pilots and can provide project-specific end-of-life pathway "
        "documentation.",
        s["body"],
    ))

    flow.append(Paragraph("Low-VOC manufacturing", s["h3"]))
    flow.append(Paragraph(
        "Our pultrusion lines use low-VOC resin and release-agent chemistry; "
        "powder-coat finishes carry no solvent emissions. The finished frame "
        "meets IAQ requirements for sensitive occupancies including hospitals "
        "and schools.",
        s["body"],
    ))

    flow.append(PageBreak())

    # ---- Order process & contact ----
    flow.append(section_band("Ordering and Engineering Support"))
    flow.append(Spacer(1, 4 * mm))

    flow.append(Paragraph("Step 1 — Specification", s["h3"]))
    flow.append(Paragraph(
        "Send your project drawings, target U-value, performance grades, and "
        "any national-code requirements to sales@f1composite.com. The F1 "
        "Composite engineering team will return a system recommendation and "
        "preliminary U-value pack within two business days.",
        s["body"],
    ))

    flow.append(Paragraph("Step 2 — Sample and qualification", s["h3"]))
    flow.append(Paragraph(
        "Profile samples are available within one week of request. Project-"
        "specific qualification testing — AS 2047, NFRC, PHI re-certification "
        "— is coordinated through the relevant certification body; F1 Composite "
        "manages the lab booking and documentation pack.",
        s["body"],
    ))

    flow.append(Paragraph("Step 3 — Order and lead time", s["h3"]))
    flow.append(Paragraph(
        "Standard catalog profiles ship in 4 – 6 weeks from confirmed order, "
        "FOB Chinese seaports. Custom-engineered profiles ship in 8 – 12 weeks "
        "depending on die fabrication time. CIF and DDP Incoterms available; "
        "consolidation with sub-frames and hardware can be coordinated through "
        "the F1 Composite logistics desk.",
        s["body"],
    ))

    flow.append(Paragraph("Step 4 — Material Test Certificate", s["h3"]))
    flow.append(Paragraph(
        "Every shipment includes a project-stamped Material Test Certificate "
        "(MTC) tied to the production batch, with traceable fibre and resin "
        "lot numbers, profile dimensional QC, and full mechanical-performance "
        "results against the EN 13706 grade.",
        s["body"],
    ))

    flow.append(Spacer(1, 8 * mm))
    flow.append(Paragraph("Engineering and sales contact", s["h2"]))
    flow.append(kv_table([
        ["Email",       "sales@f1composite.com"],
        ["Website",     "https://www.f1composite.com"],
        ["AI advisor",  "https://www.f1composite.com/ask"],
        ["Downloads",   "https://www.f1composite.com/resources/downloads"],
        ["Calculator",  "https://www.f1composite.com/frp-profile-calculator"],
    ]))

    flow.append(Spacer(1, 8 * mm))
    flow.append(Paragraph(
        "This catalog is published by F1 Composite as engineering reference "
        "for specifiers and fabricators. Values are typical for the standard "
        "production run; project-specific U-values, structural performance "
        "classes, and certification documentation are issued at point of "
        "order. F1 Composite reserves the right to revise specifications "
        "without prior notice to support continuous product improvement.",
        s["caption"],
    ))

    # Build PDF
    doc.build(
        flow,
        onFirstPage=cover_page,
        onLaterPages=interior_header_footer,
    )


if __name__ == "__main__":
    out = REPO / "public" / "downloads" / "f1composite-frp-window-door-catalog.pdf"
    out.parent.mkdir(parents=True, exist_ok=True)
    build(out)
    size_kb = out.stat().st_size / 1024
    print(f"Wrote {out} ({size_kb:.1f} KB)")

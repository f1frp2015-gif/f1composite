#!/usr/bin/env python3
"""
Build F1 Composite Wind Energy Pultruded Laminate — Mechanical Data Sheet.

Output: public/downloads/f1composite-wind-energy-pultruded-laminate-datasheet.pdf

Two grades covered:
  - WE-G80  (GFRP pultruded spar-cap laminate, glass/epoxy)
  - WE-C100 (CFRP pultruded spar-cap laminate, carbon/epoxy)

Source data: independent third-party DNV·GL-accredited laboratory testing
against DNVGL-ST-0376 / GL 2010 characteristic-value methodology.
Customer / project / lab identifiers removed for brand and confidentiality
policy.
"""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


TEAL = colors.HexColor("#0F7B7B")
INK = colors.HexColor("#15181B")
INK_2 = colors.HexColor("#4A5159")
INK_3 = colors.HexColor("#8B9098")
BORDER = colors.HexColor("#D8DCDF")
BG_HEAD = colors.HexColor("#0F7B7B")
BG_ALT = colors.HexColor("#F4F6F7")


def header_footer(canvas, doc):
    canvas.saveState()
    width, height = A4

    canvas.setFillColor(TEAL)
    canvas.setFont("Helvetica-Bold", 11)
    canvas.drawString(20 * mm, height - 14 * mm, "F1 COMPOSITE")
    canvas.setFillColor(INK_3)
    canvas.setFont("Helvetica", 8)
    canvas.drawRightString(
        width - 20 * mm,
        height - 14 * mm,
        "Wind Energy Laminate Data Sheet  ·  F1-TDS-WIND-001  ·  Rev. 2026-05",
    )

    canvas.setStrokeColor(BORDER)
    canvas.setLineWidth(0.5)
    canvas.line(20 * mm, 18 * mm, width - 20 * mm, 18 * mm)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(INK_3)
    canvas.drawString(
        20 * mm,
        12 * mm,
        "F1 Composite  ·  sales@f1composite.com  ·  www.f1composite.com",
    )
    canvas.drawRightString(width - 20 * mm, 12 * mm, f"Page {doc.page}")
    canvas.restoreState()


def styles():
    base = getSampleStyleSheet()
    s = {}
    s["title"] = ParagraphStyle(
        "title",
        parent=base["Title"],
        fontName="Helvetica-Bold",
        fontSize=19,
        leading=23,
        textColor=INK,
        spaceAfter=4,
        alignment=TA_LEFT,
    )
    s["subtitle"] = ParagraphStyle(
        "subtitle",
        parent=base["Normal"],
        fontName="Helvetica",
        fontSize=10.5,
        leading=14,
        textColor=INK_2,
        spaceAfter=12,
    )
    s["h2"] = ParagraphStyle(
        "h2",
        parent=base["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=12,
        leading=16,
        textColor=TEAL,
        spaceBefore=12,
        spaceAfter=5,
    )
    s["h3"] = ParagraphStyle(
        "h3",
        parent=base["Heading3"],
        fontName="Helvetica-Bold",
        fontSize=10.5,
        leading=14,
        textColor=INK,
        spaceBefore=8,
        spaceAfter=4,
    )
    s["body"] = ParagraphStyle(
        "body",
        parent=base["Normal"],
        fontName="Helvetica",
        fontSize=9.5,
        leading=13.5,
        textColor=INK_2,
        spaceAfter=4,
    )
    s["caption"] = ParagraphStyle(
        "caption",
        parent=base["Normal"],
        fontName="Helvetica-Oblique",
        fontSize=8.5,
        leading=12,
        textColor=INK_3,
        spaceAfter=6,
    )
    return s


def static_table(rows, col_widths=None):
    header = ["Property", "Standard", "Unit", "Avg", "Rk (DNVGL-ST-0376)"]
    data = [header] + rows
    if col_widths is None:
        col_widths = [54 * mm, 38 * mm, 14 * mm, 22 * mm, 33 * mm]
    tbl = Table(data, colWidths=col_widths, repeatRows=1)
    tbl.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), BG_HEAD),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, 0), 8.5),
                ("BOTTOMPADDING", (0, 0), (-1, 0), 6),
                ("TOPPADDING", (0, 0), (-1, 0), 6),
                ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
                ("FONTSIZE", (0, 1), (-1, -1), 8.5),
                ("TEXTCOLOR", (0, 1), (-1, -1), INK),
                ("ALIGN", (2, 0), (-1, -1), "CENTER"),
                ("ALIGN", (0, 0), (1, -1), "LEFT"),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 1), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 1), (-1, -1), 4),
                ("LINEBELOW", (0, 0), (-1, 0), 0.8, BG_HEAD),
                ("LINEBELOW", (0, 1), (-1, -1), 0.4, BORDER),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, BG_ALT]),
                ("FONTNAME", (3, 1), (3, -1), "Helvetica-Bold"),
                ("TEXTCOLOR", (3, 1), (3, -1), TEAL),
            ]
        )
    )
    return tbl


def fatigue_table(rows, cell_style):
    header = ["N (cycles)", "P50 σa [MPa]", "P50 σmax [MPa]", "P95 σa [MPa]", "P95 σmax [MPa]"]
    body_rows = [
        [Paragraph(c, cell_style) for c in row] for row in rows
    ]
    data = [header] + body_rows
    col_widths = [28 * mm, 26 * mm, 28 * mm, 26 * mm, 28 * mm]
    tbl = Table(data, colWidths=col_widths, repeatRows=1)
    tbl.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), BG_HEAD),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, 0), 8.5),
                ("BOTTOMPADDING", (0, 0), (-1, 0), 6),
                ("TOPPADDING", (0, 0), (-1, 0), 6),
                ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
                ("FONTSIZE", (0, 1), (-1, -1), 8.5),
                ("TEXTCOLOR", (0, 1), (-1, -1), INK),
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 1), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 1), (-1, -1), 4),
                ("LINEBELOW", (0, 0), (-1, 0), 0.8, BG_HEAD),
                ("LINEBELOW", (0, 1), (-1, -1), 0.4, BORDER),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, BG_ALT]),
                ("FONTNAME", (3, 1), (4, -1), "Helvetica-Bold"),
                ("TEXTCOLOR", (3, 1), (4, -1), TEAL),
            ]
        )
    )
    return tbl


def meta_table(rows, widths=(35 * mm, 130 * mm)):
    tbl = Table(rows, colWidths=widths)
    tbl.setStyle(
        TableStyle(
            [
                ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
                ("FONTNAME", (1, 0), (1, -1), "Helvetica"),
                ("FONTSIZE", (0, 0), (-1, -1), 9),
                ("TEXTCOLOR", (0, 0), (0, -1), INK_2),
                ("TEXTCOLOR", (1, 0), (1, -1), INK),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("LINEBELOW", (0, 0), (-1, -2), 0.3, BORDER),
            ]
        )
    )
    return tbl


# WE-C100 (CFRP) — static mechanical (ISO + ASTM, with DNVGL-ST-0376 Rk)
CFRP_STATIC = [
    ["0° Tensile strength",         "ISO 527-5:2021",        "MPa",  "1920",  "1690"],
    ["0° Tensile modulus",          "ISO 527-5:2021",        "GPa",  "147",   "142"],
    ["0° Tensile strain at break",  "ISO 527-5:2021",        "%",    "1.23",  "1.14"],
    ["Poisson's ratio (0°)",        "ISO 527-5:2021",        "—",    "0.35",  "0.30"],
    ["90° Tensile strength",        "ISO 527-5:2021",        "MPa",  "63.8",  "58.5"],
    ["90° Tensile modulus",         "ISO 527-5:2021",        "GPa",  "8.42",  "7.85"],
    ["0° Compressive strength",     "ISO 14126:1999",        "MPa",  "1480",  "1350"],
    ["0° Compressive modulus",      "ISO 14126:1999",        "GPa",  "135",   "128"],
    ["90° Compressive strength",    "ISO 14126:1999",        "MPa",  "164",   "162"],
    ["90° Compressive modulus",     "ISO 14126:1999",        "GPa",  "8.96",  "8.64"],
    ["V-notched rail shear (90°)",  "ASTM D7078",            "MPa",  "73.0",  "70.9"],
    ["In-plane shear modulus G12",  "ASTM D7078",            "GPa",  "5.16",  "4.88"],
    ["Interlaminar shear strength", "ISO 14130:1997",        "MPa",  "70.2",  "66.4"],
    ["0° Flexural strength",        "ISO 14125:1998/A1:2011","MPa",  "1760",  "1550"],
    ["0° Flexural modulus",         "ISO 14125:1998/A1:2011","GPa",  "139",   "135"],
]

# WE-G80 (GFRP) — fatigue + physical (ISO + DNVGL-ST-0376 Rk)
GFRP_FATIGUE_SN = [
    # (N, P50 sigma_a, P50 sigma_max, P95 sigma_a, P95 sigma_max)
    ["1.0 × 10<super>3</super>",   "424.8",  "944.0",  "382.3",  "849.6"],
    ["1.0 × 10<super>4</super>",   "324.1",  "720.1",  "291.7",  "648.2"],
    ["1.0 × 10<super>5</super>",   "247.2",  "549.4",  "222.5",  "494.5"],
    ["1.0 × 10<super>6</super>",   "188.6",  "419.1",  "169.8",  "377.2"],
    ["1.0 × 10<super>7</super>",   "143.9",  "319.8",  "129.5",  "287.8"],
    ["1.0 × 10<super>8</super>",   "109.8",  "244.0",  "98.8",   "219.6"],
]

GFRP_PHYSICAL = [
    ["Fiber mass content (Wf)",   "ISO 1172:1996",  "%",      "85.3",  "—"],
    ["Fiber volume content (Vf)", "ISO 1172:1996",  "%",      "72.5",  "—"],
    ["Laminate density",          "ISO 1183-1",     "g/cm³",  "2.17",  "—"],
]

CFRP_PHYSICAL = [
    ["Fiber mass content (Wf)",   "ISO 14127:2008", "%",     "70.4",  "—"],
    ["Fiber volume content (Vf)", "ISO 14127:2008", "%",     "62.3",  "—"],
    ["Laminate density",          "ISO 1183-1",     "g/cm³", "1.58",  "—"],
    ["Glass transition Tg (DSC, half-step)", "ISO 11357-2:2020", "°C", "116",  "—"],
]


def build(output: Path):
    doc = SimpleDocTemplate(
        str(output),
        pagesize=A4,
        leftMargin=20 * mm,
        rightMargin=20 * mm,
        topMargin=22 * mm,
        bottomMargin=22 * mm,
        title="F1 Composite — Wind Energy Pultruded Laminate Data Sheet",
        author="F1 Composite",
        subject="GFRP and CFRP pultruded spar-cap laminate mechanical properties — DNVGL-ST-0376 / GL 2010",
        creator="F1 Composite",
    )

    s = styles()
    flow = []

    flow.append(Paragraph("Wind Energy Pultruded Laminate", s["title"]))
    flow.append(
        Paragraph(
            "Mechanical Data Sheet  ·  GFRP and CFRP pultruded spar-cap laminates  ·  "
            "Tested to ISO 527-5 / 14125 / 14126 / 14130 / 13003, ASTM D7078, and "
            "ISO 11357-2 with characteristic values per DNVGL-ST-0376 and GL 2010.",
            s["subtitle"],
        )
    )

    flow.append(
        meta_table(
            [
                ["Document", "F1-TDS-WIND-001"],
                ["Revision", "2026-05"],
                ["Grades covered", "WE-G80 (GFRP / epoxy) and WE-C100 (CFRP / epoxy)"],
                ["Application", "Pultruded spar-cap laminates for wind turbine rotor blades"],
                ["Test basis", "Independent DNV·GL-accredited laboratory, China"],
                ["Certification reference", "DNVGL-ST-0376 (Dec 2015) and GL 2010 — rotor blades for wind turbines"],
            ]
        )
    )
    flow.append(Spacer(1, 6 * mm))

    flow.append(Paragraph("1. Scope", s["h2"]))
    flow.append(
        Paragraph(
            "F1 Composite pultruded laminates for wind turbine rotor blades are "
            "supplied in two grade families: <b>WE-G80</b>, a high fibre-content "
            "glass / epoxy laminate, and <b>WE-C100</b>, a unidirectional carbon / "
            "epoxy laminate. Both grades are pultruded continuously to wind-blade "
            "spar-cap geometry and are characterised by independent third-party "
            "laboratory testing accredited under the DNV·GL renewables-certification "
            "scheme. Characteristic values (R<sub>k</sub>) are reported using the "
            "DNVGL-ST-0376 (Edition December 2015) and GL 2010 statistical methods, "
            "which is the form required by blade design and certification bodies.",
            s["body"],
        )
    )

    flow.append(Paragraph("2. WE-G80 — GFRP pultruded laminate", s["h2"]))
    flow.append(
        Paragraph(
            "WE-G80 is a high glass-content unidirectional pultruded laminate "
            "engineered for spar caps in medium and long wind blades where "
            "stiffness-to-cost is the primary driver. The reinforcement is "
            "boron-free E-glass roving; the matrix is a bisphenol-A epoxy system "
            "with a service-tested cure profile for continuous pultrusion. Specimen "
            "preparation and conditioning follow ISO standard practice.",
            s["body"],
        )
    )

    flow.append(Paragraph("2.1 Physical properties", s["h3"]))
    flow.append(static_table(GFRP_PHYSICAL))

    flow.append(Paragraph("2.2 Tension-Tension fatigue (ISO 13003:2003)", s["h3"]))
    flow.append(
        Paragraph(
            "Tested at load ratio R = 0.1 (tension-tension), sine wave at 5 Hz, "
            "23 °C / 50 % RH. Specimen waisted gauge per ISO 13003. The S-N curve "
            "is fitted as σ<sub>a</sub> = A · N<sup>-1/m</sup>; the slope exponent "
            "and statistical evaluation are:",
            s["body"],
        )
    )
    flow.append(
        meta_table(
            [
                ["Slope exponent m",          "8.51"],
                ["A (stress amplitude at N = 1)", "957 MPa"],
                ["Coefficient of correlation", "−0.993"],
                ["Goodness of fit",            "0.985"],
                ["Statistical model",          "P95 / P5 S-N curves at 95 % confidence"],
            ],
            widths=(50 * mm, 60 * mm),
        )
    )
    flow.append(Spacer(1, 4 * mm))
    flow.append(
        Paragraph(
            "<b>Design table — predicted stress amplitude σ<sub>a</sub> and "
            "maximum stress σ<sub>max</sub> at target life N.</b> P50 column is "
            "the 50 % survival probability fit; P95 column is the 95 % survival / "
            "95 % confidence design line.",
            s["caption"],
        )
    )
    cell_style = ParagraphStyle(
        "cell", fontName="Helvetica", fontSize=8.5, leading=11, textColor=INK, alignment=1,
    )
    flow.append(fatigue_table(GFRP_FATIGUE_SN, cell_style))
    flow.append(
        Paragraph(
            "At 10<sup>7</sup> cycles — the typical fatigue design life used in "
            "wind-blade certification — the P95 design line predicts σ<sub>a</sub> "
            "≈ 130 MPa with a corresponding maximum stress of 288 MPa. Designers "
            "applying DNVGL-ST-0376 partial safety factors should use the P95 "
            "values together with material partial factors γ<sub>m</sub> and the "
            "appropriate environmental knock-down factors.",
            s["body"],
        )
    )

    flow.append(PageBreak())

    flow.append(Paragraph("3. WE-C100 — CFRP pultruded laminate", s["h2"]))
    flow.append(
        Paragraph(
            "WE-C100 is a unidirectional carbon / epoxy pultruded laminate intended "
            "for spar caps in large wind blades where bending stiffness and "
            "lightweight are the dominant constraints. Reinforcement is 48K "
            "industrial-grade carbon roving; the matrix is a wind-grade epoxy "
            "system. The laminate is characterised under static loading across "
            "tension, compression, in-plane shear, interlaminar shear, and flexure, "
            "with DSC-determined glass transition temperature.",
            s["body"],
        )
    )

    flow.append(Paragraph("3.1 Physical properties", s["h3"]))
    flow.append(static_table(CFRP_PHYSICAL))

    flow.append(Paragraph("3.2 Static mechanical properties", s["h3"]))
    flow.append(
        Paragraph(
            "Tested at 23 °C / 50 % RH after at least 24 h conditioning. The "
            "<b>Avg</b> column reports the mean over the test panel. The "
            "<b>R<sub>k</sub></b> column is the characteristic value calculated "
            "per DNVGL-ST-0376 (Edition December 2015), Section 5 — i.e. the "
            "95 % survival / 95 % confidence one-sided tolerance bound that "
            "blade designers feed into laminate analysis. GL 2010 characteristic "
            "values are also available on request.",
            s["body"],
        )
    )
    flow.append(static_table(CFRP_STATIC))

    flow.append(PageBreak())

    flow.append(Paragraph("4. Quality basis", s["h2"]))
    flow.append(
        Paragraph(
            "All values in this datasheet were obtained on production-grade "
            "pultruded laminate specimens by an independent third-party laboratory "
            "accredited under the DNV·GL renewables-certification scheme. Test "
            "methods, instrumentation, conditioning and specimen preparation "
            "conform to the standards cited in each row.",
            s["body"],
        )
    )
    flow.append(
        Paragraph(
            "Characteristic values reported in the right-most column are calculated "
            "using the DNVGL-ST-0376 (Rotor Blades for Wind Turbines, Edition "
            "December 2015) statistical method. The GL 2010 (Guideline for the "
            "Certification of Wind Turbines, Edition 2010) method is also "
            "supported and available on request.",
            s["body"],
        )
    )

    flow.append(Paragraph("5. Standards referenced", s["h2"]))
    flow.append(
        Paragraph(
            "<b>Static mechanical:</b> ISO 527-5:2021 (tension, fibre-reinforced "
            "plastic composites — unidirectional), ISO 14125:1998/Amd.1:2011 "
            "(flexure), ISO 14126:1999/Cor.1:2001 (in-plane compression), "
            "ISO 14130:1997/Cor.1:2003 (apparent interlaminar shear), ASTM D7078 "
            "(V-notched rail shear). <b>Fatigue:</b> ISO 13003:2003. "
            "<b>Physical / thermal:</b> ISO 1172:1996 and ISO 14127:2008 (fibre "
            "content by calcination / digestion), ISO 1183-1 (density), "
            "ISO 11357-2:2020 (glass transition temperature by DSC). "
            "<b>Certification framework:</b> DNVGL-ST-0376 (Dec 2015), GL 2010 "
            "Guideline for the Certification of Wind Turbines.",
            s["body"],
        )
    )

    flow.append(Paragraph("6. Application notes", s["h2"]))
    flow.append(
        Paragraph(
            "<b>Spar-cap design.</b> Pultruded carbon laminates such as WE-C100 are "
            "typically stacked into the spar cap of the blade as long, full-length "
            "plies. Bonding to the blade shell is via wind-grade epoxy adhesives; "
            "consult F1 Composite engineering for surface-preparation "
            "specifications and adhesive compatibility data.",
            s["body"],
        )
    )
    flow.append(
        Paragraph(
            "<b>Environmental knock-downs.</b> The characteristic values in this "
            "datasheet reflect dry-conditioned room-temperature testing. Blade "
            "designers should apply the environmental, geometric and statistical "
            "partial safety factors specified in DNVGL-ST-0376 (γ<sub>Mb</sub> "
            "matrix dominated, γ<sub>Mb</sub> fibre dominated, γ<sub>Mc</sub> "
            "for compressive failure modes).",
            s["body"],
        )
    )
    flow.append(
        Paragraph(
            "<b>Project-specific certificates.</b> Material Test Certificates "
            "(MTC) tied to a specific pultrusion lot are issued at point of order "
            "and carry the laminate panel ID, traceable fibre and resin batch "
            "numbers, and individual specimen results.",
            s["body"],
        )
    )

    flow.append(Paragraph("7. Disclaimer", s["h2"]))
    flow.append(
        Paragraph(
            "This datasheet is published by F1 Composite as engineering reference "
            "data for blade designers, certification bodies, and procurement "
            "teams. Values are typical and characteristic for the panel under "
            "test and are not a guaranteed batch-level result. Project compliance "
            "is established by the lot-specific MTC together with project-specific "
            "qualification testing as required by the certification body.",
            s["caption"],
        )
    )

    flow.append(Spacer(1, 4 * mm))
    contact = Table(
        [["F1 Composite", "sales@f1composite.com  ·  www.f1composite.com"]],
        colWidths=[40 * mm, 125 * mm],
    )
    contact.setStyle(
        TableStyle(
            [
                ("FONTNAME", (0, 0), (0, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, 0), 10),
                ("TEXTCOLOR", (0, 0), (0, 0), TEAL),
                ("TEXTCOLOR", (1, 0), (1, 0), INK_2),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LINEABOVE", (0, 0), (-1, 0), 0.8, TEAL),
                ("TOPPADDING", (0, 0), (-1, 0), 8),
            ]
        )
    )
    flow.append(contact)

    doc.build(flow, onFirstPage=header_footer, onLaterPages=header_footer)


if __name__ == "__main__":
    out = (
        Path(__file__).resolve().parent.parent
        / "public"
        / "downloads"
        / "f1composite-wind-energy-pultruded-laminate-datasheet.pdf"
    )
    out.parent.mkdir(parents=True, exist_ok=True)
    build(out)
    size_kb = out.stat().st_size / 1024
    print(f"Wrote {out} ({size_kb:.1f} KB)")

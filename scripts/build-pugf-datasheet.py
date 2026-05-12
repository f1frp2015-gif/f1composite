#!/usr/bin/env python3
"""
Build F1 Composite PU-GF Pultruded Profile Technical Data Sheet (PDF).

Output: public/downloads/f1composite-pu-gf-pultruded-mechanical-data.pdf

Source data: third-party independent laboratory testing in China against
GB/T, ISO, and ASTM standards. Customer / project identifiers removed
under F1 Composite's brand and confidentiality policy.
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

    # Top brand band
    canvas.setFillColor(TEAL)
    canvas.setFont("Helvetica-Bold", 11)
    canvas.drawString(20 * mm, height - 14 * mm, "F1 COMPOSITE")
    canvas.setFillColor(INK_3)
    canvas.setFont("Helvetica", 8)
    canvas.drawRightString(
        width - 20 * mm,
        height - 14 * mm,
        "Technical Data Sheet  ·  F1-TDS-PUGF-001  ·  Rev. 2026-05",
    )

    # Footer
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
    canvas.drawRightString(
        width - 20 * mm,
        12 * mm,
        f"Page {doc.page}",
    )
    canvas.restoreState()


def styles():
    base = getSampleStyleSheet()
    s = {}
    s["title"] = ParagraphStyle(
        "title",
        parent=base["Title"],
        fontName="Helvetica-Bold",
        fontSize=20,
        leading=24,
        textColor=INK,
        spaceAfter=4,
        alignment=TA_LEFT,
    )
    s["subtitle"] = ParagraphStyle(
        "subtitle",
        parent=base["Normal"],
        fontName="Helvetica",
        fontSize=11,
        leading=15,
        textColor=INK_2,
        spaceAfter=16,
    )
    s["h2"] = ParagraphStyle(
        "h2",
        parent=base["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=12,
        leading=16,
        textColor=TEAL,
        spaceBefore=14,
        spaceAfter=6,
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
    s["meta"] = ParagraphStyle(
        "meta",
        parent=base["Normal"],
        fontName="Helvetica",
        fontSize=8.5,
        leading=12,
        textColor=INK_3,
        spaceAfter=2,
    )
    s["caption"] = ParagraphStyle(
        "caption",
        parent=base["Normal"],
        fontName="Helvetica-Oblique",
        fontSize=8.5,
        leading=12,
        textColor=INK_3,
        spaceAfter=8,
    )
    return s


def data_table(rows):
    header = ["Property", "Standard", "Unit", "Specification", "Result"]
    data = [header] + rows
    tbl = Table(
        data,
        colWidths=[55 * mm, 42 * mm, 14 * mm, 28 * mm, 22 * mm],
        repeatRows=1,
    )
    style = TableStyle(
        [
            ("BACKGROUND", (0, 0), (-1, 0), BG_HEAD),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("FONTSIZE", (0, 0), (-1, 0), 9),
            ("BOTTOMPADDING", (0, 0), (-1, 0), 7),
            ("TOPPADDING", (0, 0), (-1, 0), 7),
            ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
            ("FONTSIZE", (0, 1), (-1, -1), 9),
            ("TEXTCOLOR", (0, 1), (-1, -1), INK),
            ("ALIGN", (2, 0), (-1, -1), "CENTER"),
            ("ALIGN", (0, 0), (1, -1), "LEFT"),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("LEFTPADDING", (0, 0), (-1, -1), 8),
            ("RIGHTPADDING", (0, 0), (-1, -1), 8),
            ("TOPPADDING", (0, 1), (-1, -1), 5),
            ("BOTTOMPADDING", (0, 1), (-1, -1), 5),
            ("LINEBELOW", (0, 0), (-1, 0), 0.8, BG_HEAD),
            ("LINEBELOW", (0, 1), (-1, -1), 0.4, BORDER),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, BG_ALT]),
            ("FONTNAME", (4, 1), (4, -1), "Helvetica-Bold"),
            ("TEXTCOLOR", (4, 1), (4, -1), TEAL),
        ]
    )
    tbl.setStyle(style)
    return tbl


# Test Set A — GB/T + ASTM, Oct 2024
SET_A = [
    ["Water absorption", "GB/T 1462-2005", "%", "≤ 0.5", "0.114"],
    ["0° Tensile strength", "GB/T 1447-2005", "MPa", "≥ 1000", "1181.77"],
    ["0° Tensile modulus", "GB/T 1447-2005", "GPa", "≥ 40", "46.04"],
    ["0° Elongation at break", "GB/T 1447-2005", "%", "≥ 2.3", "2.83"],
    ["90° Tensile strength", "GB/T 1447-2005", "MPa", "≥ 200", "312.22"],
    ["90° Tensile modulus", "GB/T 1447-2005", "GPa", "≥ 18", "21.58"],
    ["0° Compressive strength", "GB/T 1448-2005", "MPa", "≥ 750", "943.80"],
    ["0° Compressive modulus", "GB/T 1448-2005", "GPa", "≥ 40", "46.10"],
    ["Interlaminar shear (ILSS)", "ASTM D2344", "MPa", "≥ 55", "60.36"],
    ["0° Flexural strength", "GB/T 1449-2005", "MPa", "≥ 1000", "1295.86"],
]

# Test Set B — ISO suite, Oct 2025
SET_B = [
    ["Water absorption", "GB/T 1462-2005", "%", "≤ 0.5", "0.099"],
    ["0° Tensile strength", "ISO 527-5:2021", "MPa", "≥ 750", "1287.00"],
    ["0° Tensile modulus", "ISO 527-5:2021", "GPa", "≥ 35", "51.04"],
    ["0° Tensile strain", "ISO 527-5:2021", "%", "—", "2.88"],
    ["0° Flexural strength", "ISO 14125:1998/A1:2011", "MPa", "≥ 500", "974.75"],
    ["0° Flexural modulus", "ISO 14125:1998/A1:2011", "GPa", "≥ 25", "34.66"],
    ["0° Flexural strain", "ISO 14125:1998/A1:2011", "%", "—", "4.34"],
    ["90° Compressive strength", "ISO 14126:1999/Cor1:2000", "MPa", "≥ 100", "204.40"],
    ["90° Compressive modulus", "ISO 14126:1999/Cor1:2000", "GPa", "≥ 10", "21.67"],
    ["90° Compressive strain", "ISO 14126:1999/Cor1:2000", "%", "—", "1.84"],
]


def build(output: Path):
    doc = SimpleDocTemplate(
        str(output),
        pagesize=A4,
        leftMargin=20 * mm,
        rightMargin=20 * mm,
        topMargin=22 * mm,
        bottomMargin=22 * mm,
        title="F1 Composite — PU-GF Pultruded Profile Mechanical Data",
        author="F1 Composite",
        subject="PU-GF pultruded composite mechanical properties (independent third-party tests)",
        creator="F1 Composite",
    )

    s = styles()
    flow = []

    flow.append(Paragraph("PU-GF Pultruded Profile", s["title"]))
    flow.append(
        Paragraph(
            "Mechanical Data Sheet  ·  Polyurethane / E-Glass Pultruded Composite, "
            "80 mm Section",
            s["subtitle"],
        )
    )

    meta = Table(
        [
            ["Document", "F1-TDS-PUGF-001"],
            ["Revision", "2026-05"],
            ["Material", "Polyurethane (PU) resin + E-glass roving and multiaxial fabric"],
            ["Profile family", "Pultruded section, 80 mm, automotive structural grade"],
            ["Test basis", "Independent third-party laboratory, China"],
        ],
        colWidths=[35 * mm, 130 * mm],
    )
    meta.setStyle(
        TableStyle(
            [
                ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
                ("FONTNAME", (1, 0), (1, -1), "Helvetica"),
                ("FONTSIZE", (0, 0), (-1, -1), 9),
                ("TEXTCOLOR", (0, 0), (0, -1), INK_2),
                ("TEXTCOLOR", (1, 0), (1, -1), INK),
                ("ALIGN", (0, 0), (-1, -1), "LEFT"),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("LINEBELOW", (0, 0), (-1, -2), 0.3, BORDER),
            ]
        )
    )
    flow.append(meta)
    flow.append(Spacer(1, 6 * mm))

    flow.append(Paragraph("1. Scope", s["h2"]))
    flow.append(
        Paragraph(
            "This datasheet summarizes mechanical performance of F1 Composite's "
            "<b>PU-GF</b> (polyurethane / E-glass) pultruded composite profile, "
            "an 80 mm structural-grade section used in automotive, transportation "
            "and infrastructure applications. Values are typical results from "
            "production-grade specimens tested by an independent third-party "
            "laboratory in China against Chinese national (GB/T), international "
            "(ISO) and ASTM standards.",
            s["body"],
        )
    )

    flow.append(Paragraph("2. Mechanical properties — Test programme A", s["h2"]))
    flow.append(
        Paragraph(
            "Reference: independent third-party laboratory, China · "
            "GB/T and ASTM methods · sample programme dated October 2024.",
            s["caption"],
        )
    )
    flow.append(data_table(SET_A))

    flow.append(Spacer(1, 6 * mm))
    flow.append(Paragraph("3. Mechanical properties — Test programme B", s["h2"]))
    flow.append(
        Paragraph(
            "Reference: independent third-party laboratory, China · "
            "ISO methods · sample programme dated October 2025.",
            s["caption"],
        )
    )
    flow.append(data_table(SET_B))

    flow.append(PageBreak())

    flow.append(Paragraph("4. Quality basis", s["h2"]))
    flow.append(
        Paragraph(
            "All results in this datasheet were obtained on production-grade "
            "pultruded specimens by an independent third-party laboratory. "
            "Test methods, instrumentation and specimen preparation conform "
            "to the standards cited in each row, including GB/T 1447, GB/T 1448, "
            "GB/T 1449, GB/T 1462, ISO 527-5, ISO 14125, ISO 14126 and ASTM D2344. "
            "All measured values meet or exceed F1 Composite's published "
            "specifications.",
            s["body"],
        )
    )

    flow.append(Paragraph("5. Interpretation notes", s["h2"]))
    flow.append(
        Paragraph(
            "<b>Orientation conventions.</b> 0° refers to the pultrusion "
            "(longitudinal, fibre-aligned) direction; 90° refers to the "
            "transverse direction. Pultruded profiles are strongly orthotropic, "
            "and longitudinal values typically exceed transverse values by a "
            "factor of 4 – 5.",
            s["body"],
        )
    )
    flow.append(
        Paragraph(
            "<b>ILSS.</b> Interlaminar shear strength per ASTM D2344 is a short-"
            "beam test sensitive to resin/fibre interface quality and is "
            "the primary indicator of pultrusion consolidation health.",
            s["body"],
        )
    )
    flow.append(
        Paragraph(
            "<b>Specifications vs. measured.</b> The Specification column lists "
            "F1 Composite's published minimum acceptance limits for this profile "
            "family. The Result column lists the typical value from the "
            "independent test. Production lots are released against the "
            "specification, not against any single typical value.",
            s["body"],
        )
    )
    flow.append(
        Paragraph(
            "<b>Project-specific certificates.</b> Material Test Certificates "
            "(MTC) tied to a specific production batch and shipment are issued "
            "by F1 Composite at point of order. Contact sales@f1composite.com.",
            s["body"],
        )
    )

    flow.append(Paragraph("6. Disclaimer", s["h2"]))
    flow.append(
        Paragraph(
            "This datasheet is published by F1 Composite as engineering "
            "reference data for specifiers. Values are typical and not a "
            "guaranteed batch-level result. Project compliance is established "
            "by the batch MTC and any project-specific qualification testing.",
            s["caption"],
        )
    )

    flow.append(Spacer(1, 4 * mm))
    contact = Table(
        [
            ["F1 Composite", "sales@f1composite.com  ·  www.f1composite.com"],
        ],
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
        / "f1composite-pu-gf-pultruded-mechanical-data.pdf"
    )
    out.parent.mkdir(parents=True, exist_ok=True)
    build(out)
    size_kb = out.stat().st_size / 1024
    print(f"Wrote {out} ({size_kb:.1f} KB)")

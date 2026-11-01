#!/usr/bin/env python3
"""
Build the F1 Composite Basalt FRP Rebar Product Manual (PDF).

Output: public/downloads/f1composite-basalt-frp-rebar-manual-2026-11.pdf

Data basis: the manufacturer's published product page, restated as classes (the same
values as content/data/basaltRebar.ts and the product page); sources and the
reconciliation of unit masses are in docs/research/basalt-rebar-sources.md.
Figures and photographs are the PNG copies written by

    node scripts/covers/draw-basalt-rebar-figures.mjs <assets-dir>

and passed here as `--assets <assets-dir>`. Manufacturer: FengDu New Material
(owner decision 2026-11-01); the data source is on file and not named.
"""

import argparse
import math
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import Image, KeepTogether, PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

TEAL = colors.HexColor("#0F7B7B")
INK = colors.HexColor("#15181B")
INK_2 = colors.HexColor("#4A5159")
INK_3 = colors.HexColor("#8B9098")
AMBER = colors.HexColor("#B45309")
BORDER = colors.HexColor("#D8DCDF")
BG_ALT = colors.HexColor("#F4F6F7")
DOC_ID = "F1-PM-BFRP-001"
REV = "2026-11"
CONTENT_W = 170 * mm

DIAMETERS = [3, 6, 8, 10, 12, 14, 16, 18, 20, 22, 25]
DENSITY = 1.9  # g/cm3; reconciles to the manufacturer's published g/m


def strength_class(d):
    return 1100 if d <= 12 else 1000


def header_footer(canvas, doc):
    canvas.saveState()
    width, height = A4
    canvas.setFillColor(TEAL)
    canvas.setFont("Helvetica-Bold", 11)
    canvas.drawString(20 * mm, height - 14 * mm, "F1 COMPOSITE")
    canvas.setFillColor(INK_3)
    canvas.setFont("Helvetica", 8)
    canvas.drawRightString(width - 20 * mm, height - 14 * mm, f"Basalt FRP Rebar Product Manual  ·  {DOC_ID}  ·  Rev. {REV}")
    canvas.setStrokeColor(BORDER)
    canvas.setLineWidth(0.5)
    canvas.line(20 * mm, 18 * mm, width - 20 * mm, 18 * mm)
    canvas.setFillColor(INK_3)
    canvas.drawString(20 * mm, 12 * mm, "F1 Composite  ·  sales@f1composite.com  ·  www.f1composite.com/products/basalt-frp-rebar")
    canvas.drawRightString(width - 20 * mm, 12 * mm, f"Page {doc.page}")
    canvas.restoreState()


def styles():
    base = getSampleStyleSheet()
    s = {}
    s["title"] = ParagraphStyle("title", parent=base["Title"], fontName="Helvetica-Bold", fontSize=24, leading=28, textColor=INK, spaceAfter=4, alignment=TA_LEFT)
    s["subtitle"] = ParagraphStyle("subtitle", parent=base["Normal"], fontName="Helvetica", fontSize=11.5, leading=16, textColor=INK_2, spaceAfter=14)
    s["eye"] = ParagraphStyle("eye", parent=base["Normal"], fontName="Helvetica-Bold", fontSize=8.5, leading=11, textColor=TEAL, spaceAfter=6)
    s["h2"] = ParagraphStyle("h2", parent=base["Heading2"], fontName="Helvetica-Bold", fontSize=13, leading=17, textColor=TEAL, spaceBefore=12, spaceAfter=6, keepWithNext=1)
    s["h3"] = ParagraphStyle("h3", parent=base["Normal"], fontName="Helvetica-Bold", fontSize=10, leading=14, textColor=INK, spaceBefore=6, spaceAfter=3, keepWithNext=1)
    s["body"] = ParagraphStyle("body", parent=base["Normal"], fontName="Helvetica", fontSize=9.5, leading=13.5, textColor=INK_2, spaceAfter=5)
    s["cell"] = ParagraphStyle("cell", parent=s["body"], fontSize=8.5, leading=11, spaceAfter=0, textColor=INK)
    s["cellhead"] = ParagraphStyle("cellhead", parent=s["cell"], fontName="Helvetica-Bold", textColor=colors.white)
    s["caption"] = ParagraphStyle("caption", parent=base["Normal"], fontName="Helvetica-Oblique", fontSize=8.5, leading=12, textColor=INK_3, spaceAfter=8)
    s["warn"] = ParagraphStyle("warn", parent=s["body"], textColor=AMBER)
    return s


def grid(rows, widths, s, align_center_from=None, head=True):
    data = []
    for r, row in enumerate(rows):
        style = s["cellhead"] if (head and r == 0) else s["cell"]
        data.append([Paragraph(str(c), style) for c in row])
    tbl = Table(data, colWidths=[w * mm for w in widths], repeatRows=1 if head else 0)
    cmds = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6), ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 4), ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LINEBELOW", (0, 0), (-1, -1), 0.4, BORDER),
    ]
    if head:
        cmds += [("BACKGROUND", (0, 0), (-1, 0), TEAL), ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, BG_ALT])]
    tbl.setStyle(TableStyle(cmds))
    return tbl


def figure(path, width_mm, caption, s):
    img = Image(str(path))
    ratio = img.imageHeight / img.imageWidth
    img.drawWidth = width_mm * mm
    img.drawHeight = width_mm * mm * ratio
    return KeepTogether([img, Spacer(1, 2 * mm), Paragraph(caption, s["caption"])])


def build(output: Path, assets: Path):
    doc = SimpleDocTemplate(str(output), pagesize=A4, leftMargin=20 * mm, rightMargin=20 * mm, topMargin=22 * mm, bottomMargin=22 * mm,
                            title="F1 Composite — Basalt FRP Rebar Product Manual", author="F1 Composite",
                            subject="Basalt fiber reinforced polymer (BFRP) rebar: published classes, sizes, standards, handling and ordering", creator="F1 Composite")
    s = styles()
    f = []

    # Cover
    f.append(Paragraph("CONCRETE REINFORCEMENT · PRODUCT MANUAL · EDITION 2026.11", s["eye"]))
    f.append(Paragraph("Basalt FRP Rebar", s["title"]))
    f.append(Paragraph("Basalt fiber reinforced polymer (BFRP) reinforcing bars, Ø3 to Ø25 mm, straight or coiled. Published classes, sizes, standards, handling and the ordering checklist.", s["subtitle"]))
    f.append(figure(assets / "bfrp-rebar-cut-pieces.png", 120, "Fig. 1 · Cut pieces of basalt FRP rebar with the helical bond surface (supplier photograph).", s))
    meta_rows = [
        ["Document", f"{DOC_ID}  ·  Rev. {REV}"],
        ["Product", "Pultruded basalt fiber reinforced polymer (BFRP) bars for concrete reinforcement"],
        ["Fiber / matrix", "Continuous basalt filament drawn from basalt rock; vinyl ester or epoxy resin"],
        ["Classes", "1,100 MPa (Ø3–Ø12), 1,000 MPa (Ø25); 50 GPa modulus class; 1.9–2.1 g/cm³"],
        ["Standards", "ASTM D8505/D8505M-23 · CSA S807:19 · ISO 10406-1:2015 · GB/T 26743-2011 · JG/T 406-2013"],
        ["Supply", "Made by FengDu New Material (Chongqing, China); exported by F1 Composite against a project schedule"],
    ]
    meta_label = ParagraphStyle("metalabel", parent=s["cell"], fontName="Helvetica-Bold", fontSize=9, leading=12, textColor=INK_2)
    meta_value = ParagraphStyle("metavalue", parent=s["cell"], fontSize=9, leading=12)
    meta = Table([[Paragraph(a, meta_label), Paragraph(b, meta_value)] for a, b in meta_rows], colWidths=[32 * mm, 138 * mm])
    meta.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"),
                              ("BOTTOMPADDING", (0, 0), (-1, -1), 4), ("TOPPADDING", (0, 0), (-1, -1), 4), ("LINEBELOW", (0, 0), (-1, -2), 0.3, BORDER)]))
    f.append(meta)
    f.append(Spacer(1, 5 * mm))
    f.append(Paragraph("<b>Reading this manual.</b> Every value in it is a class restated from published typical values. None is a guaranteed value, a design value or a certification. ASTM D8505 and CSA S807 guarantee tensile force, modulus, bond and durability per size from a qualification report, and that report, issued for the size actually offered, is what the engineer designs with. It travels with the quotation.", s["body"]))
    f.append(PageBreak())

    # 1 Scope
    f.append(Paragraph("1. Scope and product description", s["h2"]))
    f.append(Paragraph("This manual covers straight basalt FRP reinforcing bars and coils supplied by F1 Composite. The bar is pultruded from continuous basalt filament in a thermoset resin, with a helical fiber wrap for bond and a sand-coated finish on request. It does not corrode electrochemically, weighs about a quarter of steel size for size, carries no electrical current and no magnetic signature, conducts little heat, and is cut with a diamond or abrasive blade. It is linear-elastic to rupture, with a modulus about a quarter of steel's, so members are designed to an FRP code rather than by substituting steel sizes.", s["body"]))
    f.append(Paragraph("Factory-formed bends, hooks and mesh are not part of the standard basalt product and are raised as an inquiry; where a project needs shapes, F1's GFRP family supplies factory bends and mesh that a designer may pair with straight basalt bars.", s["body"]))

    f.append(Paragraph("2. From basalt rock to a reinforcing bar", s["h2"]))
    f.append(Paragraph("Basalt fiber is the only reinforcement fiber made from one raw material. Volcanic rock is crushed, washed and graded, melted at about 1,450 °C in a single furnace with no batch chemistry to formulate, and drawn through platinum bushings into continuous filament, which is sized and wound as roving. The roving is wetted in vinyl ester or epoxy resin, pulled through a heated die, wrapped and cured, then cut to length or coiled. FengDu New Material pultrudes the bar from bought-in continuous basalt roving, and the fiber lot is recorded against each bar lot on the production record.", s["body"]))
    f.append(figure(assets / "basalt-rebar-rock-to-bar.png", 170, "Fig. 2 · Seven stations from quarry to bundle. Stations 1 to 4 are the fiber producer's, 5 to 7 the pultruder's.", s))
    f.append(Paragraph("Basalt filament is stiffer and stronger than E-glass filament and keeps its properties to a higher temperature, which is where the bar's 1,100 MPa and 50 GPa classes come from. Fiber volume, resin, surface and process decide how much of that reaches the bar, and the resin, not the fiber, sets the bar's temperature limit: the matrix softens above its glass transition (100 °C class), so fire-rated members are designed by cover and detailing, as for GFRP.", s["body"]))

    # 3 Properties
    f.append(Paragraph("3. Published properties, as classes", s["h2"]))
    f.append(grid([
        ["Property", "Published class", "Basis and what it means"],
        ["Tensile strength", "1,100 MPa (Ø3–Ø12) · 1,000 MPa (Ø25)", "Published typical values. Guaranteed tensile force per size comes from the qualification report; strength rarely sets the bar."],
        ["Tensile modulus", "50 GPa class (52–55 GPa published)", "Above the 44.8 GPa ASTM D8505 floor and the CSA S807 Grade I threshold of 50 GPa. A quarter of steel: crack width and deflection govern."],
        ["Elongation at rupture", "about 2.6% (Ø3–Ø12)", "Linear to rupture; no yield plateau. Sections are proportioned for concrete crushing with the bar kept elastic."],
        ["Density", "1.9–2.1 g/cm³", "Published unit masses reconcile to 1.9 g/cm³. A Ø16 mm bar is about 0.38 kg/m against 1.58 kg/m in steel."],
        ["Alkali and seawater exposure", "75–80% strength retained after 900 days immersion", "Published durability statement. Ask for the test method, specimen scope and report; ASTM D8505 and CSA S807 set their own exposure tests."],
        ["Electrical and magnetic", "Non-conductive, nonmagnetic", "MRI suites, rail detection loops, substations, data centers."],
        ["Thermal conductivity", "below 1 W/m·K", "No thermal bridge through an insulated element; steel is about 50 W/m·K."],
        ["Temperature", "Resin Tg 100 °C class", "The fiber tolerates far more heat than the resin; the bar is not a fire-rated bar."],
        ["Surface", "Helical fiber wrap; sand coating on request", "Bond and transverse shear are tested per size to the governing standard."],
        ["Forms", "Straight bars to cut length; Ø≤10 mm also coiled", "Bends, hooks and mesh by inquiry."],
    ], [34, 50, 86], s))
    f.append(Spacer(1, 4 * mm))
    f.append(Paragraph("3.1 Against GFRP and steel", s["h3"]))
    f.append(grid([
        ["Property", "BFRP (published class)", "GFRP 45 / 60 (F1 family)", "Steel Grade 60"],
        ["Tensile strength", "1,000–1,100 MPa class", "530–840 MPa guaranteed minimum (ASTM D7957); about 900–1,000 MPa typical", "420 MPa yield, 620 MPa ultimate"],
        ["Tensile modulus", "50 GPa class", "45 or 60 GPa class", "200 GPa"],
        ["Behaviour to failure", "Linear to rupture, about 2.6%", "Linear to rupture, 1.1% or more", "Yields at about 0.2%, then stretches"],
        ["Density", "1.9–2.1 g/cm³", "1.9–2.1 g/cm³", "7.85 g/cm³"],
        ["Corrosion", "None; 75–80% retained, 900 days (published)", "None; 80% retained after ASTM D7705 exposure", "Rusts once chlorides or carbonation reach the bar"],
        ["Product standard", "ASTM D8505-23; CSA S807:19; ISO 10406-1", "ASTM D7957-26; CSA S807:19", "ASTM A615; EN 10080"],
        ["US building code", "None of its own: ACI 440.11 covers glass bars only", "ACI CODE-440.11-22", "ACI 318"],
        ["Shapes", "Straight bars and coils; bends by inquiry", "Factory-formed stirrups, bends, mesh", "Bent, cut and welded on site"],
    ], [32, 46, 50, 42], s))
    f.append(Paragraph("Class values, not a datasheet. BFRP values are published typical values; GFRP values are ASTM D7957 minimums and F1's modulus classes; steel is ASTM A615 Grade 60.", s["caption"]))
    f.append(Spacer(1, 2 * mm))
    f.append(figure(assets / "basalt-rebar-stress-strain.png", 118, "Fig. 3 · Basalt, glass and steel in tension (schematic). Both FRP bars are linear to rupture above steel's yield; the slope sets crack widths and deflections.", s))

    # 4 Sizes
    f.append(Paragraph("4. Sizes: area, mass and nominal capacity", s["h2"]))
    f.append(Paragraph("Eleven inquiry diameters, one modulus class. Mass is calculated at 1.9 g/cm³, which matches the published g/m. Nominal capacity is nominal area multiplied by the published strength class (1,000 MPa taken for Ø14 and above pending the size report); it is not a guaranteed force and not a design value.", s["body"]))
    rows = [["Ø mm", "Area mm²", "Mass kg/m", "Metres per tonne", "Class MPa", "Nominal capacity kN", "Form"]]
    for d in DIAMETERS:
        area = math.pi * d * d / 4
        mass = area * DENSITY / 1000
        rows.append([str(d), f"{area:.1f}", f"{mass:.3f}", f"{1000 / mass:,.0f}", f"{strength_class(d):,}", f"{area * strength_class(d) / 1000:.0f}", "Bar or coil" if d <= 10 else "Straight bar"])
    f.append(grid(rows, [16, 22, 22, 30, 22, 32, 26], s))
    f.append(Spacer(1, 3 * mm))
    f.append(figure(assets / "basalt-rebar-size-ladder.png", 140, "Fig. 4 · The eleven diameters to one scale with calculated unit mass.", s))
    f.append(Paragraph("4.1 Lengths, coils and packing", s["h3"]))
    f.append(Paragraph("Straight bars are cut to the project length; 6 m and 12 m are the usual planning lengths, and bars up to about 11.8 m load into a 40 ft high-cube container (roughly 12 to 20 t depending on diameter and packing; at 0.38 kg/m a tonne of Ø16 mm bar is about 2,600 m). Longer bars need an open-top or flat-rack booking or an agreed cut length. Ø6–Ø10 mm bars are coiled on a reel, which cuts freight volume for slab and pavement orders; confirm straightening and handling on site before choosing coils. Bundles are strapped, labeled by diameter, length and quantity and protected from abrasion; coils are wrapped and palletized.", s["body"]))

    # 5 Substitution
    f.append(Paragraph("5. Steel substitution guide, and why not to use it alone", s["h2"]))
    f.append(Paragraph("The published guide gives the BFRP diameter whose nominal tensile capacity at the published class matches the yield capacity of a steel bar. It is reproduced here because buyers ask for it, with the caveat that matters more than the table.", s["body"]))
    f.append(grid([["Steel bar", "BFRP bar of equal nominal tensile capacity"]] + [
        ["Ø10", "Ø6–Ø8"], ["Ø12", "Ø8"], ["Ø14–Ø16", "Ø10"], ["Ø18", "Ø12"], ["Ø20–Ø22", "Ø14"], ["Ø24", "Ø16"], ["Ø26", "Ø18"], ["Ø28–Ø30", "Ø20"],
    ], [50, 120], s))
    f.append(Spacer(1, 3 * mm))
    f.append(Paragraph("<b>Caveat.</b> The table equates ultimate tensile capacity only. FRP-reinforced members are governed by serviceability (crack width and deflection at a modulus a quarter of steel's), bond and development length, and sustained-load limits under ACI 440.1R, CSA S806 or the code the project adopts. Those checks usually need more bar area than the strength match, sometimes more area than the steel it replaces. The project designer sizes the bar with the certified values of the offered size; nobody substitutes from this table.", s["warn"]))

    f.append(Paragraph("6. Where basalt rebar is specified", s["h2"]))
    f.append(grid([
        ["Element", "Why", "Usual sizes"],
        ["Marine, seawalls and coastal concrete", "Chloride corrosion is the failure mode; the published seawater immersion data speaks to this exposure.", "Ø10–Ø25 mm"],
        ["Bridge decks, barriers and highways", "De-icing salt and traffic disruption justify a corrosion-free deck; the 50 GPa class helps on deflection-governed spans.", "Ø14–Ø25 mm"],
        ["Slabs, pavements and industrial floors", "Crack control over a large thin area, no rust staining, bars light enough to place by hand.", "Ø6–Ø12 mm, coils for Ø≤10"],
        ["Foundations in aggressive soils", "Chloride or sulfate groundwater; rafts and pile caps that are expensive to repair.", "Ø12–Ø25 mm"],
        ["Culverts, channels and stormwater", "Wet-dry cycling and saline groundwater in linings, box culverts and headwalls.", "Ø8–Ø16 linings; Ø16–Ø25 walls"],
        ["Tunnels, soft-eyes and mining", "Reinforcement a TBM or roadheader can cut, and that does not rust in groundwater.", "Ø16–Ø25 mm cages"],
        ["MRI, rail, substations and data centers", "Nonmagnetic, electrically insulating reinforcement with nonmetallic chairs and ties.", "Ø8–Ø20 mm"],
        ["Pools, tanks and water plants", "Shells, tanks and channels in wet or chemically aggressive service.", "Ø8–Ø16 mm"],
    ], [50, 86, 34], s))
    f.append(Paragraph("In the United States and Canada public work runs through owner producer lists and domestic-content rules; elsewhere acceptance rests on the engineer's review of the D8505 or S807 data for the offered bar.", s["caption"]))
    f.append(PageBreak())

    # 7 Standards
    f.append(Paragraph("7. Standards and documents", s["h2"]))
    f.append(grid([
        ["Layer", "Documents", "What to ask for"],
        ["Product standards", "ASTM D8505/D8505M-23 (basalt and glass FRP bars); CSA S807:19 (R2024), basalt included, modulus grades I–III; ISO 10406-1:2015 test methods; GB/T 26743-2011 and JG/T 406-2013 (Chinese product standards)", "The standard and edition the qualification report was tested to, per size."],
        ["Design codes", "ACI CODE-440.11-22 covers glass bars only: a US building using basalt needs the engineer's design to ACI 440.1R guidance and the authority's acceptance. CSA S806 and S6 accept S807 bars of either fiber. EN 1992-1-1:2023 Annex R where the national annex adopts it.", "Which code the designer will use, so the right properties are certified."],
        ["Approvals and listings", "ICC-ES AC454 and state DOT lists cover named GFRP producers. F1 holds no ICC-ES, DOT, CE or ETA listing for basalt bars and claims none.", "The documents your authority requires, so we can say what FengDu can evidence."],
    ], [30, 90, 50], s))
    f.append(Spacer(1, 3 * mm))
    f.append(Paragraph("7.1 Documents that travel with an order", s["h3"]))
    for item in ["Product and size data: fiber and resin, surface, measured area, unit mass, guaranteed tensile force and modulus for each offered size.",
                 "Qualification and durability: test methods and editions, laboratory, bond, transverse shear, alkali and seawater exposure and retained properties.",
                 "Production records: batch identification, inspection records, packing list and handling instructions for the released order.",
                 "Shipping: commercial invoice, packing list, bill of lading, certificate of origin (Form E, Form F or non-preferential, per destination)."]:
        f.append(Paragraph(f"• {item}", s["body"]))

    f.append(Paragraph("8. Handling, cutting and placing", s["h2"]))
    for n, (title, text) in enumerate([
        ("Design with the certified values", "The project designer sizes the bar to the governing FRP code using the guaranteed force and modulus of the offered size, not the substitution guide."),
        ("Order shapes in advance", "Straight bars and coils are the standard product. Raise bends, hooks and mesh as an inquiry; never bend, heat or weld a cured bar on site."),
        ("Receive, support and protect", "Check labels, quantities and damage on arrival. Store off the ground and out of prolonged sun; protect from impact and abrasion."),
        ("Cut with a blade", "Diamond or abrasive blade with the bar supported on both sides and dust extraction; no shears, bolt cutters or torch. Wear eye, hand and respiratory protection."),
        ("Tie it down and inspect", "Nonmetallic chairs set the cover; tie the light mat so it cannot float. Check spacing, cover and laps against the FRP design before the pour."),
    ], start=1):
        f.append(Paragraph(f"<b>Step {n} · {title}.</b> {text}", s["body"]))
    f.append(figure(assets / "bfrp-rebar-helical-surface.png", 70, "Fig. 5 · The helical fiber wrap over the basalt core (supplier photograph).", s))

    # 9 Ordering
    f.append(Paragraph("9. Price basis and ordering checklist", s["h2"]))
    f.append(Paragraph("Quotations are built per metre or per bar for a schedule, and per tonne or per container for a repeating program. Price per kilogram misleads: a tonne of BFRP is about four times the length of a tonne of steel. Public FOB listings observed in October 2026 for basalt bars from Ø6 to Ø25 mm ran from roughly $0.6 to $1.6 per metre, rising with diameter; basalt fiber costs more per tonne than E-glass, so a BFRP bar prices above the same GFRP size. The project price is the one in the RFQ response.", s["body"]))
    f.append(grid([
        ["Driver", "What moves the number"],
        ["Diameter", "Material scales with cross-sectional area: a Ø20 mm bar costs about four times a Ø10 mm bar per metre. Quote the schedule, not an average."],
        ["Resin and test scope", "Vinyl ester or epoxy matrix, sand coating and third-party reports to D8505 or S807 each add cost per metre."],
        ["Lengths and coils", "Project cut lengths add handling but cut site waste; coils for Ø≤10 mm cut freight volume."],
        ["Packing and freight", "Freight is bought per container; FOB, CIF, DAP or DDP decide who carries freight, insurance, duty and clearance."],
    ], [40, 130], s))
    f.append(Spacer(1, 4 * mm))
    f.append(Paragraph("9.1 What an inquiry needs", s["h3"]))
    f.append(grid([
        ["Item", "Detail"],
        ["Bar schedule", "Diameters, cut lengths or coils, quantities and bar marks, or your BOQ and drawings."],
        ["Standard and documents", "ASTM D8505, CSA S807 or the specification your project cites, and the reports your engineer or purchaser requires."],
        ["Shapes, if any", "Bend, hook or mesh drawings, raised as an inquiry."],
        ["Destination and timing", "Delivery country or port, target date, shipment phases and any sample evaluation."],
        ["Terms", "FOB, CIF, DAP or DDP, so offers compare on the same basis."],
    ], [40, 130], s))
    f.append(Spacer(1, 4 * mm))
    f.append(Paragraph("9.2 How an order runs", s["h3"]))
    for n, (title, text) in enumerate([("Review the schedule", "Confirm destination, standard, sizes, lengths or coils and quantities; resolve missing details before the order."),
                                        ("Confirm the offer", "Agree product data, sample needs, inspection scope, price basis, MOQ, lead time and shipping terms."),
                                        ("Release and inspect", "Freeze drawing revisions and acceptance criteria; identify lots and check dimensions and records agreed for the order."),
                                        ("Pack and dispatch", "Agree labels, bundle quantities, protection and shipment phases; check bar length against the packing and transport plan.")], start=1):
        f.append(Paragraph(f"<b>Step {n} · {title}.</b> {text}", s["body"]))

    f.append(Paragraph("10. Disclaimer", s["h2"]))
    f.append(Paragraph("This manual is published by F1 Composite as product reference for specifiers and buyers. Values are published typical values restated as classes; they are not guaranteed values, design values or certifications, and nothing here is an ICC-ES, DOT, CE or ETA approval. Project compliance is established by the qualification report for the offered size, the production-lot certificate and any project-specific testing agreed in the order. Photographs of concrete work on the product page show steel-reinforced projects and illustrate the element, not a basalt installation.", s["caption"]))
    f.append(Spacer(1, 4 * mm))
    contact = Table([["F1 Composite", "sales@f1composite.com  ·  www.f1composite.com/products/basalt-frp-rebar"]], colWidths=[40 * mm, 130 * mm])
    contact.setStyle(TableStyle([("FONTNAME", (0, 0), (0, 0), "Helvetica-Bold"), ("FONTSIZE", (0, 0), (-1, 0), 10), ("TEXTCOLOR", (0, 0), (0, 0), TEAL), ("TEXTCOLOR", (1, 0), (1, 0), INK_2),
                                 ("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("LINEABOVE", (0, 0), (-1, 0), 0.8, TEAL), ("TOPPADDING", (0, 0), (-1, 0), 8)]))
    f.append(contact)

    doc.build(f, onFirstPage=header_footer, onLaterPages=header_footer)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--assets", required=True, help="directory with the PNG figures and photos written by draw-basalt-rebar-figures.mjs")
    parser.add_argument("--out", default=None)
    args = parser.parse_args()
    out = Path(args.out) if args.out else Path(__file__).resolve().parent.parent / "public" / "downloads" / "f1composite-basalt-frp-rebar-manual-2026-11.pdf"
    out.parent.mkdir(parents=True, exist_ok=True)
    build(out, Path(args.assets))
    print(f"Wrote {out} ({out.stat().st_size / 1024:.0f} KB)")

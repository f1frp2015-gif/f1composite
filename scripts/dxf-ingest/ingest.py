#!/usr/bin/env python3
"""DXF → catalog polygon geometry ingester (offline, human-verified).

Parses a cross-section DXF, extracts the closed outer contour + holes,
and emits:
  <name>.geometry.json  — paste into the admin geometry editor (polygon mode)
  <name>.preview.svg    — visual check: is the extracted contour the section?
  a console report      — area / Ix / Iy / mass-per-metre cross-check

Anti-error rules (why this stays a human-in-the-loop tool):
  - The largest closed loop is ASSUMED to be the outer boundary; every other
    closed loop fully inside it is a hole. Verify with the preview SVG.
  - Units are ASSUMED mm ($INSUNITS is checked and a warning printed if it
    disagrees). If the drawing is in inches or scaled, pass --scale.
  - Torsion constant J for irregular open sections needs FEM — this tool
    leaves J null (the datasheet prints "—"). Add "J" manually only from a
    verified sectionproperties/FEM run.

Usage:
  python3 ingest.py section.dxf [--layer PROFILE] [--scale 1.0]
      [--density 1900] [--published-weight 4.2] [--arc-segments 32]

Dependency: pip install ezdxf
"""

from __future__ import annotations

import argparse
import json
import math
import sys
from pathlib import Path

try:
    import ezdxf
except ImportError:
    sys.exit("ezdxf is required:  pip install ezdxf")


# ── geometry helpers ─────────────────────────────────────────────────────────

def signed_area(pts: list[tuple[float, float]]) -> float:
    a = 0.0
    for i in range(len(pts)):
        x0, y0 = pts[i]
        x1, y1 = pts[(i + 1) % len(pts)]
        a += x0 * y1 - x1 * y0
    return a / 2.0


def ring_raw(pts: list[tuple[float, float]]):
    """Area, first and second moments about global axes (CCW normalised)."""
    if signed_area(pts) < 0:
        pts = list(reversed(pts))
    A = qx = qy = ixo = iyo = 0.0
    for i in range(len(pts)):
        x0, y0 = pts[i]
        x1, y1 = pts[(i + 1) % len(pts)]
        cross = x0 * y1 - x1 * y0
        A += cross
        qx += (x0 + x1) * cross
        qy += (y0 + y1) * cross
        ixo += (y0 * y0 + y0 * y1 + y1 * y1) * cross
        iyo += (x0 * x0 + x0 * x1 + x1 * x1) * cross
    return A / 2, qx / 6, qy / 6, ixo / 12, iyo / 12


def section_properties(outer, holes, density=None):
    A, qx, qy, ixo, iyo = ring_raw(outer)
    for h in holes:
        hA, hqx, hqy, hixo, hiyo = ring_raw(h)
        A -= hA
        qx -= hqx
        qy -= hqy
        ixo -= hixo
        iyo -= hiyo
    cx, cy = qx / A, qy / A
    Ix = ixo - A * cy * cy
    Iy = iyo - A * cx * cx
    out = {
        "A_mm2": A,
        "cx_mm": cx,
        "cy_mm": cy,
        "Ix_mm4": Ix,
        "Iy_mm4": Iy,
    }
    if density:
        out["mass_kg_per_m"] = A * 1e-6 * density
    return out


def point_in_ring(pt, ring) -> bool:
    x, y = pt
    inside = False
    for i in range(len(ring)):
        x0, y0 = ring[i]
        x1, y1 = ring[(i + 1) % len(ring)]
        if (y0 > y) != (y1 > y):
            xin = (x1 - x0) * (y - y0) / (y1 - y0) + x0
            if x < xin:
                inside = not inside
    return inside


# ── DXF contour extraction ───────────────────────────────────────────────────

def entity_to_polyline(e, arc_segments: int) -> list[tuple[float, float]] | None:
    """Convert one closed DXF entity to a point list, or None if not closed."""
    t = e.dxftype()
    if t == "LWPOLYLINE":
        if not e.closed:
            return None
        pts: list[tuple[float, float]] = []
        vertices = list(e.get_points("xyb"))
        n = len(vertices)
        for i, (x, y, bulge) in enumerate(vertices):
            pts.append((x, y))
            if bulge:  # arc segment → tessellate
                x1, y1, _ = vertices[(i + 1) % n]
                theta = 4 * math.atan(bulge)
                chord = math.hypot(x1 - x, y1 - y)
                if chord < 1e-9:
                    continue
                r = chord / (2 * math.sin(abs(theta) / 2))
                # centre
                mx, my = (x + x1) / 2, (y + y1) / 2
                d = math.sqrt(max(r * r - (chord / 2) ** 2, 0.0))
                nx, ny = -(y1 - y) / chord, (x1 - x) / chord
                if bulge < 0:
                    d = -d
                cx0, cy0 = mx + nx * d, my + ny * d
                a0 = math.atan2(y - cy0, x - cx0)
                for k in range(1, arc_segments):
                    a = a0 + theta * k / arc_segments
                    pts.append((cx0 + r * math.cos(a), cy0 + r * math.sin(a)))
        return pts
    if t == "POLYLINE":
        if not e.is_closed:
            return None
        return [(v.dxf.location.x, v.dxf.location.y) for v in e.vertices]
    if t == "CIRCLE":
        c, r = e.dxf.center, e.dxf.radius
        n = max(arc_segments * 4, 64)
        return [
            (c.x + r * math.cos(2 * math.pi * i / n), c.y + r * math.sin(2 * math.pi * i / n))
            for i in range(n)
        ]
    if t == "SPLINE":
        try:
            if not e.closed:
                return None
            pts = [(p[0], p[1]) for p in e.flattening(0.1)]
            return pts[:-1] if len(pts) > 2 and pts[0] == pts[-1] else pts
        except Exception:
            return None
    if t == "ELLIPSE":
        try:
            pts = [(p.x, p.y) for p in e.flattening(0.1)]
            return pts[:-1] if len(pts) > 2 and pts[0] == pts[-1] else pts
        except Exception:
            return None
    return None


def extract_contours(doc, layer: str | None, arc_segments: int):
    msp = doc.modelspace()
    loops = []
    counts: dict[str, int] = {}
    for e in msp:
        if layer and e.dxf.layer != layer:
            continue
        pts = entity_to_polyline(e, arc_segments)
        if pts and len(pts) >= 3 and abs(signed_area(pts)) > 1e-6:
            loops.append({"layer": e.dxf.layer, "type": e.dxftype(), "pts": pts})
            counts[e.dxf.layer] = counts.get(e.dxf.layer, 0) + 1
    return loops, counts


# ── SVG preview ──────────────────────────────────────────────────────────────

def write_preview_svg(path: Path, outer, holes):
    xs = [p[0] for p in outer]
    ys = [p[1] for p in outer]
    minx, maxx, miny, maxy = min(xs), max(xs), min(ys), max(ys)
    w, h = maxx - minx, maxy - miny
    pad = 0.08 * max(w, h)
    size = 640
    scale = size / (max(w, h) + 2 * pad)

    def tx(x):
        return (x - (minx + maxx) / 2) * scale + size / 2

    def ty(y):
        return size / 2 - (y - (miny + maxy) / 2) * scale

    def path_d(ring):
        return " ".join(
            f"{'M' if i == 0 else 'L'} {tx(x):.2f} {ty(y):.2f}" for i, (x, y) in enumerate(ring)
        ) + " Z"

    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}">',
        f'<rect width="{size}" height="{size}" fill="white"/>',
        f'<path d="{path_d(outer)}" fill="#e0e7ff" stroke="#031697" stroke-width="1.5"/>',
    ]
    for hole in holes:
        parts.append(f'<path d="{path_d(hole)}" fill="white" stroke="#031697" stroke-width="1.2"/>')
    parts.append(
        f'<text x="10" y="{size - 10}" font-family="monospace" font-size="14" fill="#6b7280">'
        f"bbox {w:.1f} x {h:.1f} mm — VERIFY against the drawing title block</text>"
    )
    parts.append("</svg>")
    path.write_text("\n".join(parts))


# ── main ─────────────────────────────────────────────────────────────────────

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("dxf", type=Path)
    ap.add_argument("--layer", help="only read entities on this layer (recommended)")
    ap.add_argument("--scale", type=float, default=1.0, help="multiply all coordinates (e.g. 25.4 for inch drawings)")
    ap.add_argument("--density", type=float, default=1900.0, help="kg/m3 for the mass cross-check")
    ap.add_argument("--published-weight", type=float, help="vendor-published kg/m to cross-check against")
    ap.add_argument("--arc-segments", type=int, default=32)
    args = ap.parse_args()

    doc = ezdxf.readfile(args.dxf)
    insunits = doc.header.get("$INSUNITS", 0)
    if insunits not in (0, 4):  # 4 = millimetres
        print(f"⚠ $INSUNITS={insunits} (not mm) — check units, consider --scale", file=sys.stderr)

    loops, counts = extract_contours(doc, args.layer, args.arc_segments)
    if not loops:
        hint = f" on layer '{args.layer}'" if args.layer else ""
        print(f"No closed contours found{hint}. Layers seen in file:", file=sys.stderr)
        layers = {e.dxf.layer for e in doc.modelspace()}
        for l in sorted(layers):
            print(f"  - {l}", file=sys.stderr)
        sys.exit(1)

    print(f"closed loops found: {len(loops)}  (per layer: {counts})")

    # scale, then pick the largest |area| loop as outer
    for lp in loops:
        lp["pts"] = [(x * args.scale, y * args.scale) for x, y in lp["pts"]]
        lp["area"] = abs(signed_area(lp["pts"]))
    loops.sort(key=lambda l: -l["area"])
    outer = loops[0]["pts"]
    holes = []
    for lp in loops[1:]:
        probe = lp["pts"][0]
        if point_in_ring(probe, outer):
            holes.append(lp["pts"])
        else:
            print(f"⚠ loop on layer '{lp['layer']}' ({lp['type']}, A={lp['area']:.0f} mm²) "
                  f"is OUTSIDE the outer contour — ignored (another view / annotation?)", file=sys.stderr)

    props = section_properties(outer, holes, args.density)
    rnd = lambda pts: [[round(x, 3), round(y, 3)] for x, y in pts]

    geometry = {"kind": "polygon", "outer": rnd(outer), "holes": [rnd(h) for h in holes]}
    stem = args.dxf.with_suffix("")
    geo_path = Path(f"{stem}.geometry.json")
    svg_path = Path(f"{stem}.preview.svg")
    geo_path.write_text(json.dumps(geometry, indent=1))
    write_preview_svg(svg_path, outer, holes)

    print(f"\nSection properties (cross-check against the drawing):")
    print(f"  A  = {props['A_mm2']:.1f} mm²")
    print(f"  Ix = {props['Ix_mm4'] / 1e4:.2f} cm⁴   Iy = {props['Iy_mm4'] / 1e4:.2f} cm⁴")
    print(f"  mass = {props['mass_kg_per_m']:.3f} kg/m @ {args.density:.0f} kg/m³")
    if args.published_weight:
        dev = (props["mass_kg_per_m"] - args.published_weight) / args.published_weight * 100
        flag = "OK" if abs(dev) < 8 else "⚠ CHECK UNITS/CONTOUR"
        print(f"  vs published {args.published_weight} kg/m: {dev:+.1f}%  [{flag}]")
    print(f"\nwrote {geo_path}")
    print(f"wrote {svg_path}  ← OPEN THIS and compare against the drawing before saving")
    print("\nNext: open the preview, verify the contour, then paste the JSON into")
    print("/admin → Products → geometry → custom polygon. Leave J empty unless FEM-verified.")


if __name__ == "__main__":
    main()

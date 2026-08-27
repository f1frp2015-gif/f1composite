// Budgetary price API for the /fiberglass-pultruded-profile-price estimator.
// Validates the request by hand (no schema dep) and returns USD ranges only —
// the engine's cost constants never leave the server.

import { NextResponse } from "next/server";
import { estimatePrice, type Fiber, type Geometry, type Resin } from "@/lib/pricing/engine";

const FIBERS: Fiber[] = ["e_glass", "ecr_glass", "carbon"];
const RESINS: Resin[] = ["up", "ve", "epoxy", "pu", "phenolic"];

function num(v: unknown, min: number, max: number): number | null {
  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n) || n < min || n > max) return null;
  return n;
}

function parseGeometry(raw: unknown): Geometry | null {
  if (typeof raw !== "object" || raw === null) return null;
  const g = raw as Record<string, unknown>;
  switch (g.type) {
    case "round": {
      const od = num(g.od, 10, 500);
      const id = num(g.id, 0, 498);
      if (od === null || id === null || id >= od) return null;
      return { type: "round", od, id };
    }
    case "square": {
      const side = num(g.side, 10, 500);
      const t = num(g.t, 1, 50);
      if (side === null || t === null) return null;
      return { type: "square", side, t };
    }
    case "rect": {
      const w = num(g.w, 10, 500);
      const h = num(g.h, 10, 500);
      const t = num(g.t, 1, 50);
      if (w === null || h === null || t === null) return null;
      return { type: "rect", w, h, t };
    }
    case "angle": {
      const leg = num(g.leg, 10, 300);
      const t = num(g.t, 1, 30);
      if (leg === null || t === null) return null;
      return { type: "angle", leg, t };
    }
    case "unequal_angle": {
      const a = num(g.a, 10, 400);
      const b = num(g.b, 10, 400);
      const t = num(g.t, 1, 40);
      if (a === null || b === null || t === null || t >= Math.min(a, b)) return null;
      return { type: "unequal_angle", a, b, t };
    }
    case "channel": {
      const w = num(g.w, 20, 300);
      const h = num(g.h, 20, 400);
      const t = num(g.t, 1, 30);
      if (w === null || h === null || t === null) return null;
      return { type: "channel", w, h, t };
    }
    case "unequal_channel": {
      const b1 = num(g.b1, 10, 400);
      const b2 = num(g.b2, 10, 400);
      const h = num(g.h, 20, 500);
      const t = num(g.t, 1, 40);
      if (b1 === null || b2 === null || h === null || t === null || t >= Math.min(b1, b2, h)) return null;
      return { type: "unequal_channel", b1, b2, h, t };
    }
    case "tee": {
      const b = num(g.b, 20, 500);
      const h = num(g.h, 20, 600);
      const tf = num(g.tf, 1, 50);
      const tw = num(g.tw, 1, 50);
      if (b === null || h === null || tf === null || tw === null || tf >= h || tw >= b) return null;
      return { type: "tee", b, h, tf, tw };
    }
    case "offset_tee": {
      const bl = num(g.bl, 5, 500);
      const br = num(g.br, 5, 500);
      const h = num(g.h, 20, 600);
      const t = num(g.t, 1, 50);
      if (bl === null || br === null || h === null || t === null || t >= h || t >= bl + br) return null;
      return { type: "offset_tee", bl, br, h, t };
    }
    case "strut": {
      const b = num(g.b, 20, 300);
      const h = num(g.h, 20, 300);
      const t = num(g.t, 1, 20);
      const lip = num(g.lip, 2, 100);
      const ret = num(g.return, 2, 100);
      if (b === null || h === null || t === null || lip === null || ret === null) return null;
      if (2 * t >= Math.min(b, h) || lip + t >= b / 2 || ret >= h - t) return null;
      return { type: "strut", b, h, t, lip, return: ret };
    }
    case "i_beam": {
      const bf = num(g.bf, 20, 400);
      const tf = num(g.tf, 2, 30);
      const h = num(g.h, 40, 600);
      const tw = num(g.tw, 2, 25);
      if (bf === null || tf === null || h === null || tw === null) return null;
      return { type: "i_beam", bf, tf, h, tw };
    }
    default:
      return null;
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const geometry = parseGeometry(body.geometry);
  const totalMeters = num(body.totalMeters, 1, 1_000_000);
  const fiber = FIBERS.includes(body.fiber as Fiber) ? (body.fiber as Fiber) : null;
  const resin = RESINS.includes(body.resin as Resin) ? (body.resin as Resin) : null;

  if (!geometry || totalMeters === null || !fiber || !resin) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const result = estimatePrice({
    geometry,
    fiber,
    resin,
    fireRetardant: body.fireRetardant === true,
    weatherproof: body.weatherproof === true,
    surfaceVeil: body.surfaceVeil === true,
    totalMeters,
  });

  return NextResponse.json(result);
}

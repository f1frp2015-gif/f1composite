import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { dbConfigured, listInquiries, inquiryMetrics, setInquiryOutcome } from "@/lib/db";

// Read API for pulling inquiries into the F1 Cockpit desktop app.
// Protected by a static bearer token (INQUIRY_API_TOKEN). The cockpit polls
//   GET /api/inquiries?since=<lastId>&limit=<n>
// and persists rows into its local SQLite, deduped by id.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function tokenOk(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  // timingSafeEqual requires equal-length buffers.
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function GET(req: NextRequest) {
  const expected = process.env.INQUIRY_API_TOKEN;
  if (!expected) {
    return NextResponse.json(
      { error: "Inquiry API not configured (set INQUIRY_API_TOKEN)." },
      { status: 503 },
    );
  }

  const auth = req.headers.get("authorization") ?? "";
  const provided = auth.replace(/^Bearer\s+/i, "").trim();
  if (!provided || !tokenOk(provided, expected)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!dbConfigured()) {
    return NextResponse.json({ configured: false, inquiries: [], cursor: 0 });
  }

  // ?metrics=1 → L2 win-rate / loss-reason / margin aggregate (no row list).
  if (req.nextUrl.searchParams.get("metrics")) {
    try {
      const weeks = Number(req.nextUrl.searchParams.get("weeks") ?? "26") || 26;
      const metrics = await inquiryMetrics({ weeks });
      return NextResponse.json({ configured: true, metrics });
    } catch (err) {
      console.error("inquiries metrics error:", err);
      return NextResponse.json({ error: "Metrics query failed" }, { status: 500 });
    }
  }

  const sinceId = Number(req.nextUrl.searchParams.get("since") ?? "0") || 0;
  const limit = Number(req.nextUrl.searchParams.get("limit") ?? "200") || 200;

  try {
    const inquiries = await listInquiries({ sinceId, limit });
    const cursor = inquiries.length ? inquiries[inquiries.length - 1].id : sinceId;
    return NextResponse.json({ configured: true, count: inquiries.length, cursor, inquiries });
  } catch (err) {
    console.error("inquiries list error:", err);
    return NextResponse.json({ error: "Query failed" }, { status: 500 });
  }
}

// PATCH /api/inquiries  { id, outcome:"won"|"lost"|"pending", realizedMargin?, lossReason?, note? }
// Records the deal outcome so the inquiry→deal loop can be measured. Same bearer auth.
export async function PATCH(req: NextRequest) {
  const expected = process.env.INQUIRY_API_TOKEN;
  if (!expected) {
    return NextResponse.json(
      { error: "Inquiry API not configured (set INQUIRY_API_TOKEN)." },
      { status: 503 },
    );
  }

  const auth = req.headers.get("authorization") ?? "";
  const provided = auth.replace(/^Bearer\s+/i, "").trim();
  if (!provided || !tokenOk(provided, expected)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!dbConfigured()) {
    return NextResponse.json({ error: "DB not configured" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const id = Number(body.id);
  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ error: "Valid numeric id required" }, { status: 400 });
  }

  const rawMargin = body.realizedMargin ?? body.realized_margin;
  const rawLoss = body.lossReason ?? body.loss_reason;
  try {
    const res = await setInquiryOutcome(id, {
      outcome: String(body.outcome ?? ""),
      realizedMargin: rawMargin == null ? null : Number(rawMargin),
      lossReason: rawLoss == null ? null : String(rawLoss),
      note: body.note == null ? null : String(body.note),
    });
    if (!res.ok) return NextResponse.json({ error: res.error }, { status: 400 });
    return NextResponse.json({ ok: true, id });
  } catch (err) {
    console.error("inquiry outcome error:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

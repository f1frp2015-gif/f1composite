import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { dbConfigured, listInquiries } from "@/lib/db";

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

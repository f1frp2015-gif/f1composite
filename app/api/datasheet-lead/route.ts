// POST /api/datasheet-lead — capture the email a visitor leaves to unlock a
// multi-product catalog download from the Datasheet Builder. Lands in the
// existing inquiries pipeline (source: datasheet-builder) so it flows into
// the same Cockpit / win-loss instrumentation as every other lead.

import { NextResponse } from "next/server";
import { insertInquiry } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: { email?: unknown; models?: unknown; ids?: unknown; formulations?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad JSON" }, { status: 400 });
  }
  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!EMAIL_RE.test(email) || email.length > 200) {
    return NextResponse.json({ ok: false, error: "Valid email required" }, { status: 400 });
  }
  const models = Array.isArray(body.models)
    ? body.models.filter((m): m is string => typeof m === "string").slice(0, 150)
    : [];
  const ids = Array.isArray(body.ids)
    ? body.ids.filter((n): n is number => Number.isFinite(n)).slice(0, 150)
    : [];
  const formulationCodes = Array.isArray(body.formulations)
    ? body.formulations.filter((c): c is string => typeof c === "string").slice(0, 20)
    : [];

  try {
    await insertInquiry({
      name: email.split("@")[0],
      email,
      message:
        `Datasheet Builder catalog download (${models.length || ids.length} products` +
        `${formulationCodes.length ? ` × resin systems ${formulationCodes.join("/")}` : ""}): ` +
        models.join(", ").slice(0, 1500),
      inquiryType: "datasheet-download",
      source: "datasheet-builder",
      context: { ids, models, formulations: formulationCodes },
      userAgent: request.headers.get("user-agent"),
      referer: request.headers.get("referer"),
    });
  } catch (e) {
    // Never block the download on lead-capture failure — log and let it pass.
    console.error("[datasheet-lead] insert failed:", e);
  }
  return NextResponse.json({ ok: true });
}

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { insertInquiry, markInquiryEmailed } from "@/lib/db";
import { NOTIFY_EMAILS } from "@/lib/notify";
import { rateLimit, tooManyRequests } from "@/lib/rateLimit";
import { inquiryReceipt } from "@/lib/inquiryReceipt";

import { MAX_ATTACHMENT_BYTES, ALLOWED_ATTACHMENT_EXTENSIONS, validateContactAttachment } from "@/lib/contactAttachment";
import { parseWindowInquiry, mergeWindowContext, windowInquirySummary } from "@/lib/windowInquiry";

export const runtime = "nodejs";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const HTML_ESCAPE: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function esc(value: string | null | undefined, fallback = "—") {
  const raw = value == null || value === "" ? fallback : String(value);
  return raw.replace(/[&<>"']/g, (c) => HTML_ESCAPE[c]);
}

// Structured context carried from the calculator / AI sourcing wizard. Stored as
// JSONB so the cockpit can render the spec. Falls back to { raw } if not JSON.
function parseContext(raw: string | null): unknown {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return { raw };
  }
}

export async function POST(request: NextRequest) {
  // Throttle: a human submits the contact form a handful of times at most.
  // Caps form-spam, lead-email bombing, and junk DB rows from one source.
  const rl = rateLimit(request, "contact", { limit: 5, windowMs: 600_000 });
  if (!rl.ok) {
    return tooManyRequests(rl, "Too many submissions. Please wait a few minutes and try again.");
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { message: "This endpoint accepts multipart form submissions only." },
      { status: 400 },
    );
  }

  // Keep multipart overhead comfortably below the serverless request limit.
  let textBytes = 0;
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") textBytes += Buffer.byteLength(value, "utf8");
    if (typeof value !== "string" && key !== "attachment") return NextResponse.json({ message: "Unexpected file field." }, { status: 400 });
    if (typeof value === "string" && value.length > (key === "context" || key === "window_inquiry" || key === "message" ? 20000 : 500)) return NextResponse.json({ message: "An inquiry field is too long." }, { status: 400 });
  }
  if (textBytes > 64 * 1024) return NextResponse.json({ message: "Please shorten the inquiry text or attach a schedule." }, { status: 400 });
  if (formData.getAll("attachment").filter(value => value instanceof File && value.size > 0).length > 1) return NextResponse.json({ message: "Please attach one file or a single ZIP bundle." }, { status: 400 });
  const text = (key: string) => { const value = formData.get(key); return typeof value === "string" ? value : null; };
  let context = parseContext(text("context"));
  let windowInquiry;
  try {
    const raw = text("window_inquiry");
    windowInquiry = parseWindowInquiry(raw ? JSON.parse(raw) : null);
    if (windowInquiry) context = mergeWindowContext(context, windowInquiry);
  } catch (error) {
    return NextResponse.json({ message: error instanceof SyntaxError ? "Invalid window inquiry data." : error instanceof Error ? error.message : "Please review your window requirements." }, { status: 400 });
  }
  const name = text("name");
  const email = text("email");
  const country = text("country");
  const inquiryType = text("inquiry_type")?.trim() || "rfq";
  const message = [text("message"), windowInquiry ? windowInquirySummary(windowInquiry) : ""].filter(part => part?.trim()).join("\n\n") || "Initial inquiry — no requirements provided yet. Please contact the customer to discuss their needs.";
  const company = text("company");
  const phone = text("phone");
  const attachmentEntry = formData.get("attachment");
  const attachment = attachmentEntry instanceof File && attachmentEntry.size > 0
    ? attachmentEntry
    : null;

  let attachmentName: string | null = null;
  let attachmentContent: Buffer | null = null;

  if (attachment) {
    const extension = attachment.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ALLOWED_ATTACHMENT_EXTENSIONS.has(extension)) {
      return NextResponse.json(
        { message: "Unsupported attachment type. Please send PDF, DWG, DXF, STEP, IGES, XLSX, CSV, ZIP, JPG, or PNG." },
        { status: 400 },
      );
    }
    if (attachment.size > MAX_ATTACHMENT_BYTES) {
      return NextResponse.json(
        { message: "The attachment exceeds the 4 MB limit." },
        { status: 400 },
      );
    }

    attachmentName = attachment.name.replace(/[^a-zA-Z0-9._() -]/g, "_").slice(0, 140);
    attachmentContent = Buffer.from(await attachment.arrayBuffer());
    try { validateContactAttachment(attachment.name, attachmentContent); }
    catch (error) { return NextResponse.json({ message: error instanceof Error ? error.message : "Invalid attachment content." }, { status: 400 }); }
  }

  // Validate required fields
  const missing: string[] = [];
  if (!name?.trim()) missing.push("Name");
  if (!email?.trim()) missing.push("Email");

  if (missing.length > 0) {
    return NextResponse.json(
      { message: `Required fields missing: ${missing.join(", ")}` },
      { status: 400 },
    );
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email!)) {
    return NextResponse.json(
      { message: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  const timestamp = new Date().toISOString();

  // Persist to the database FIRST (best-effort) so a lead is never lost even if
  // the email step fails. Returns null (and we continue email-only) when
  // DATABASE_URL is not yet configured.
  let inquiryId: number | null = null;
  try {
    inquiryId = await insertInquiry({
      name: name!,
      email: email!,
      company,
      phone,
      country,
      inquiryType,
      message: attachmentName ? `${message!}\n\nAttachment: ${attachmentName}` : message!,
      source: (formData.get("source") as string | null) || "contact",
      context,
      userAgent: request.headers.get("user-agent"),
      referer: request.headers.get("referer"),
    });
  } catch (dbErr) {
    console.error("Inquiry DB insert failed:", dbErr);
  }

  // Either persistence or the mail provider must acknowledge the submission.
  let emailId: string | null = null;
  try {
    const { data, error } = await getResend().emails.send({
      from: "F1 Composite Inquiry <inquiry@f1composite.com>",
      to: NOTIFY_EMAILS,
      replyTo: email!,
      subject: `[Inquiry] ${inquiryType ?? ""} from ${name ?? ""} — ${country ?? ""}`.slice(0, 200),
      attachments: attachmentName && attachmentContent
        ? [{
            filename: attachmentName,
            content: attachmentContent,
            contentType: attachment?.type || "application/octet-stream",
          }]
        : undefined,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 600px; color: #1a1a1a;">
          <h2 style="color: #00A199; margin-bottom: 24px;">New Inquiry from f1composite.com</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
            <tr><td style="padding: 8px 12px; font-weight: 600; width: 120px; vertical-align: top;">Name</td><td style="padding: 8px 12px;">${esc(name)}</td></tr>
            <tr style="background: #f9fafb;"><td style="padding: 8px 12px; font-weight: 600; vertical-align: top;">Company</td><td style="padding: 8px 12px;">${esc(company)}</td></tr>
            <tr><td style="padding: 8px 12px; font-weight: 600; vertical-align: top;">Email</td><td style="padding: 8px 12px;"><a href="mailto:${encodeURIComponent(email!)}" style="color: #00A199;">${esc(email)}</a></td></tr>
            <tr style="background: #f9fafb;"><td style="padding: 8px 12px; font-weight: 600; vertical-align: top;">Phone</td><td style="padding: 8px 12px;">${esc(phone)}</td></tr>
            <tr><td style="padding: 8px 12px; font-weight: 600; vertical-align: top;">Country</td><td style="padding: 8px 12px;">${esc(country)}</td></tr>
            <tr style="background: #f9fafb;"><td style="padding: 8px 12px; font-weight: 600; vertical-align: top;">Type</td><td style="padding: 8px 12px;">${esc(inquiryType)}</td></tr>
            <tr><td style="padding: 8px 12px; font-weight: 600; vertical-align: top;">Attachment</td><td style="padding: 8px 12px;">${esc(attachmentName)}</td></tr>
            <tr><td style="padding: 8px 12px; font-weight: 600; vertical-align: top;">Source / context</td><td style="padding: 8px 12px; white-space: pre-wrap;">${esc(String(formData.get("source") ?? "contact"))}<br />${esc(context == null ? "" : JSON.stringify(context))}</td></tr>
            <tr style="background: #f9fafb;"><td style="padding: 8px 12px; font-weight: 600; vertical-align: top;">Message</td><td style="padding: 8px 12px; white-space: pre-wrap;">${esc(message)}</td></tr>
          </table>
          <p style="margin-top: 24px; font-size: 13px; color: #888;">Submitted at ${esc(timestamp)} via f1composite.com contact form</p>
        </div>
      `,
    });

    if (error) console.error("Inquiry email notification failed");
    else emailId = data?.id ?? null;
  } catch {
    console.error("Inquiry email provider unavailable");
  }

  if (inquiryId != null && emailId) {
    try {
      await markInquiryEmailed(inquiryId);
    } catch {
      // Non-fatal: the row exists; only the email_sent flag failed to update.
    }
  }

  const { status, ...receipt } = inquiryReceipt({ inquiryId, emailId, hasAttachment: Boolean(attachment) });
  return NextResponse.json(receipt, { status });
}

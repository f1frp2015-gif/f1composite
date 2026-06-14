import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { insertInquiry, markInquiryEmailed } from "@/lib/db";
import { NOTIFY_EMAILS } from "@/lib/notify";

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
  const formData = await request.formData();

  const name = formData.get("name") as string | null;
  const email = formData.get("email") as string | null;
  const country = formData.get("country") as string | null;
  const inquiryType = formData.get("inquiry_type") as string | null;
  const message = formData.get("message") as string | null;
  const company = formData.get("company") as string | null;
  const phone = formData.get("phone") as string | null;

  // Validate required fields
  const missing: string[] = [];
  if (!name?.trim()) missing.push("Name");
  if (!email?.trim()) missing.push("Email");
  if (!country?.trim()) missing.push("Country");
  if (!inquiryType?.trim()) missing.push("Inquiry Type");
  if (!message?.trim()) missing.push("Message");

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
      message: message!,
      source: (formData.get("source") as string | null) || "contact",
      context: parseContext(formData.get("context") as string | null),
      userAgent: request.headers.get("user-agent"),
      referer: request.headers.get("referer"),
    });
  } catch (dbErr) {
    console.error("Inquiry DB insert failed:", dbErr);
  }

  // Send notification email via Resend
  const { error } = await getResend().emails.send({
    from: "F1 Composite Inquiry <inquiry@f1composite.com>",
    to: NOTIFY_EMAILS,
    replyTo: email!,
    subject: `[Inquiry] ${inquiryType ?? ""} from ${name ?? ""} — ${country ?? ""}`.slice(0, 200),
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
          <tr><td style="padding: 8px 12px; font-weight: 600; vertical-align: top;">Message</td><td style="padding: 8px 12px; white-space: pre-wrap;">${esc(message)}</td></tr>
        </table>
        <p style="margin-top: 24px; font-size: 13px; color: #888;">Submitted at ${esc(timestamp)} via f1composite.com contact form</p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      {
        message: inquiryId
          ? "Thank you — your inquiry has been recorded and our team will follow up within one business day."
          : "Your inquiry was received but email notification failed. Our team will still follow up.",
      },
      { status: 200 },
    );
  }

  if (inquiryId != null) {
    try {
      await markInquiryEmailed(inquiryId);
    } catch {
      // Non-fatal: the row exists; only the email_sent flag failed to update.
    }
  }

  return NextResponse.json({
    message:
      "Thank you for your inquiry. Our team will review your message and respond within one business day.",
  });
}

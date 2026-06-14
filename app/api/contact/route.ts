import { NextRequest, NextResponse } from "next/server";
import { notifyTeam, escapeHtml } from "@/lib/notify";

// Shown to the visitor when automatic delivery fails. We have no f1composite.com
// inbox to fall back to, so we point them straight at the two real mailboxes.
const DIRECT_CONTACT_NOTICE =
  "We couldn't submit your inquiry automatically. Please email it directly to inquiry@f1composite.com — we reply within one business day.";

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

  // Notify BOTH mailboxes in one send (see lib/notify). notifyTeam never throws,
  // so a missing RESEND_API_KEY or network blip degrades to the fallback below
  // instead of a 500.
  const { ok, error } = await notifyTeam({
    replyTo: email!,
    subject: `[Inquiry] ${inquiryType} from ${name} — ${country}`,
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 600px; color: #1a1a1a;">
        <h2 style="color: #00A199; margin-bottom: 24px;">New Inquiry from f1composite.com</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
          <tr><td style="padding: 8px 12px; font-weight: 600; width: 120px; vertical-align: top;">Name</td><td style="padding: 8px 12px;">${escapeHtml(name)}</td></tr>
          <tr style="background: #f9fafb;"><td style="padding: 8px 12px; font-weight: 600; vertical-align: top;">Company</td><td style="padding: 8px 12px;">${escapeHtml(company) || "—"}</td></tr>
          <tr><td style="padding: 8px 12px; font-weight: 600; vertical-align: top;">Email</td><td style="padding: 8px 12px;"><a href="mailto:${escapeHtml(email)}" style="color: #00A199;">${escapeHtml(email)}</a></td></tr>
          <tr style="background: #f9fafb;"><td style="padding: 8px 12px; font-weight: 600; vertical-align: top;">Phone</td><td style="padding: 8px 12px;">${escapeHtml(phone) || "—"}</td></tr>
          <tr><td style="padding: 8px 12px; font-weight: 600; vertical-align: top;">Country</td><td style="padding: 8px 12px;">${escapeHtml(country)}</td></tr>
          <tr style="background: #f9fafb;"><td style="padding: 8px 12px; font-weight: 600; vertical-align: top;">Type</td><td style="padding: 8px 12px;">${escapeHtml(inquiryType)}</td></tr>
          <tr><td style="padding: 8px 12px; font-weight: 600; vertical-align: top;">Message</td><td style="padding: 8px 12px; white-space: pre-wrap;">${escapeHtml(message)}</td></tr>
        </table>
        <p style="margin-top: 24px; font-size: 13px; color: #888;">Submitted at ${timestamp} via f1composite.com contact form</p>
      </div>
    `,
  });

  if (!ok) {
    // Email is our only delivery channel and it just failed, so log the full
    // submission — this server log is the recoverable record of the lead.
    console.error("Contact inquiry email FAILED — lead at risk:", error, {
      name,
      company,
      email,
      phone,
      country,
      inquiryType,
      message,
      timestamp,
    });
    return NextResponse.json({ message: DIRECT_CONTACT_NOTICE }, { status: 502 });
  }

  return NextResponse.json({
    message:
      "Thank you for your inquiry. Our team will review your message and respond within one business day.",
  });
}

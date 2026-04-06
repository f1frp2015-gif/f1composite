import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const NOTIFY_EMAILS = [
  "Doris.li@f1composite.com",
  "f1frp2015@gmail.com",
];

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

  // Send notification email via Resend
  const { error } = await getResend().emails.send({
    from: "F1 Composite Inquiry <inquiry@f1composite.com>",
    to: NOTIFY_EMAILS,
    replyTo: email!,
    subject: `[Inquiry] ${inquiryType} from ${name} — ${country}`,
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 600px; color: #1a1a1a;">
        <h2 style="color: #00A199; margin-bottom: 24px;">New Inquiry from f1composite.com</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
          <tr><td style="padding: 8px 12px; font-weight: 600; width: 120px; vertical-align: top;">Name</td><td style="padding: 8px 12px;">${name}</td></tr>
          <tr style="background: #f9fafb;"><td style="padding: 8px 12px; font-weight: 600; vertical-align: top;">Company</td><td style="padding: 8px 12px;">${company || "—"}</td></tr>
          <tr><td style="padding: 8px 12px; font-weight: 600; vertical-align: top;">Email</td><td style="padding: 8px 12px;"><a href="mailto:${email}" style="color: #00A199;">${email}</a></td></tr>
          <tr style="background: #f9fafb;"><td style="padding: 8px 12px; font-weight: 600; vertical-align: top;">Phone</td><td style="padding: 8px 12px;">${phone || "—"}</td></tr>
          <tr><td style="padding: 8px 12px; font-weight: 600; vertical-align: top;">Country</td><td style="padding: 8px 12px;">${country}</td></tr>
          <tr style="background: #f9fafb;"><td style="padding: 8px 12px; font-weight: 600; vertical-align: top;">Type</td><td style="padding: 8px 12px;">${inquiryType}</td></tr>
          <tr><td style="padding: 8px 12px; font-weight: 600; vertical-align: top;">Message</td><td style="padding: 8px 12px; white-space: pre-wrap;">${message}</td></tr>
        </table>
        <p style="margin-top: 24px; font-size: 13px; color: #888;">Submitted at ${timestamp} via f1composite.com contact form</p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { message: "Your inquiry was received but email notification failed. Our team will still follow up." },
      { status: 200 },
    );
  }

  return NextResponse.json({
    message:
      "Thank you for your inquiry. Our team will review your message and respond within one business day.",
  });
}

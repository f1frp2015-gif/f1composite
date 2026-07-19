import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const NOTIFY_EMAILS = [
  "Doris.li@f1composite.com",
  "f1frp2015@gmail.com",
];

interface MagnetMeta {
  id: string;
  title: string;
  description: string;
  /** Where the actual PDF will live once produced. */
  downloadPath: string;
}

const MAGNETS: Record<string, MagnetMeta> = {
  "pocket-spec-card": {
    id: "pocket-spec-card",
    title: "FRP Pocket Spec Card (A4, 2-page PDF)",
    description:
      "7 most-quoted profile families on one card — cross-sections, key mechanical properties, and the EN 13706 / ASTM standards.",
    downloadPath: "/downloads/lead-magnets/v1/f1-frp-pocket-spec-card.pdf",
  },
  "frp-vs-steel-lcc": {
    id: "frp-vs-steel-lcc",
    title: "FRP vs Steel vs Aluminum 30-Year LCC Sheet (Excel + PDF case book)",
    description:
      "Editable lifecycle cost model with 6 real project case studies — corrosive infrastructure, chemical, marine, solar, bridge, cooling tower.",
    downloadPath: "/downloads/lead-magnets/v1/f1-frp-vs-steel-30y-lcc.zip",
  },
  "en13706-d-sample-report": {
    id: "en13706-d-sample-report",
    title: "Sample EN 13706 D Test Report (third-party lab, redacted)",
    description:
      "Full mechanical, fire, water absorption, and glass-content test set on a recent F1 pultruded profile run.",
    downloadPath: "/downloads/lead-magnets/v1/f1-en13706-d-sample-report.pdf",
  },
  "profile-selector-flowchart": {
    id: "profile-selector-flowchart",
    title: "Pultruded Profile Selector Flowchart (A3, 1-page PDF)",
    description:
      "5-step decision tree — application → load → environment → resin → profile family — with direct links into F1's product pages.",
    downloadPath: "/downloads/lead-magnets/v1/f1-profile-selector-flowchart.pdf",
  },
};

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(request: NextRequest) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body." }, { status: 400 });
  }

  const magnetId = typeof payload.magnet_id === "string" ? payload.magnet_id : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const company = typeof payload.company === "string" ? payload.company.trim() : "";
  const country = typeof payload.country === "string" ? payload.country.trim() : "";
  const pageContext = typeof payload.page_context === "string" ? payload.page_context : "";

  const magnet = MAGNETS[magnetId];
  if (!magnet) {
    return NextResponse.json({ message: "Unknown lead magnet." }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { message: "Please provide a valid work email address." },
      { status: 400 },
    );
  }

  const timestamp = new Date().toISOString();
  const downloadUrl = `https://www.f1composite.com${magnet.downloadPath}`;

  const resend = getResend();

  // Email 1 — fulfilment to the prospect.
  const fulfilment = await resend.emails.send({
    from: "F1 Composite Engineering <engineering@f1composite.com>",
    to: [email],
    replyTo: "Doris.li@f1composite.com",
    subject: `Your download: ${magnet.title}`,
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 620px; color: #1a1a1a;">
        <h2 style="color: #00A199; margin: 0 0 16px;">Thanks${name ? ", " + name : ""} — your F1 Composite download is ready.</h2>
        <p style="font-size: 15px; line-height: 1.7;">
          ${magnet.description}
        </p>
        <p style="margin: 24px 0;">
          <a href="${downloadUrl}" style="background: #00A199; color: white; padding: 13px 21px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 15px;">Download the PDF →</a>
        </p>
        <p style="font-size: 14px; color: #555; line-height: 1.7;">
          If you have a live project, reply to this email or message Doris on WhatsApp
          (<a href="https://wa.me/8613883333993" style="color: #00A199;">+86 138 8333 3993</a>)
          and we'll walk through it together. We typically reply within 4 hours, Beijing time.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="font-size: 12px; color: #888;">
          F1 Composite Co., Ltd · Chongqing, China · 370 pultrusion lines · EN 13706 D
        </p>
      </div>
    `,
  });

  // Email 2 — notify Doris / technical mailbox.
  await resend.emails.send({
    from: "F1 Composite Lead-Magnet <inquiry@f1composite.com>",
    to: NOTIFY_EMAILS,
    replyTo: email,
    subject: `[Lead magnet] ${magnet.title} → ${email}`,
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 600px; color: #1a1a1a;">
        <h2 style="color: #00A199;">New lead-magnet download</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
          <tr><td style="padding: 8px 12px; font-weight: 600; width: 140px;">Magnet</td><td style="padding: 8px 12px;">${magnet.title}</td></tr>
          <tr style="background: #f9fafb;"><td style="padding: 8px 12px; font-weight: 600;">Email</td><td style="padding: 8px 12px;"><a href="mailto:${email}" style="color: #00A199;">${email}</a></td></tr>
          <tr><td style="padding: 8px 12px; font-weight: 600;">Name</td><td style="padding: 8px 12px;">${name || "—"}</td></tr>
          <tr style="background: #f9fafb;"><td style="padding: 8px 12px; font-weight: 600;">Company</td><td style="padding: 8px 12px;">${company || "—"}</td></tr>
          <tr><td style="padding: 8px 12px; font-weight: 600;">Country</td><td style="padding: 8px 12px;">${country || "—"}</td></tr>
          <tr style="background: #f9fafb;"><td style="padding: 8px 12px; font-weight: 600;">Page</td><td style="padding: 8px 12px;">${pageContext || "—"}</td></tr>
          <tr><td style="padding: 8px 12px; font-weight: 600;">When</td><td style="padding: 8px 12px;">${timestamp}</td></tr>
        </table>
        <p style="font-size: 13px; color: #555; margin-top: 16px;">
          Suggested follow-up window: 24h. Lead is warm but unscored — open WhatsApp /
          send a personalised intro referencing the asset they downloaded.
        </p>
      </div>
    `,
  });

  if (fulfilment.error) {
    console.error("Lead-magnet fulfilment error:", fulfilment.error);
    return NextResponse.json(
      {
        message:
          "We received your request but the email failed to send. Doris will follow up directly within 24 hours.",
        downloadUrl: null,
      },
      { status: 200 },
    );
  }

  return NextResponse.json({
    message: `Check your inbox — the PDF link is on its way.`,
    downloadUrl,
  });
}

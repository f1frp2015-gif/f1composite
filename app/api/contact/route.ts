import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

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

  // Log submission (placeholder for future email/CRM integration)
  console.log("--- Contact Form Submission ---");
  console.log("Name:", name);
  console.log("Company:", company || "(not provided)");
  console.log("Email:", email);
  console.log("Phone:", phone || "(not provided)");
  console.log("Country:", country);
  console.log("Inquiry Type:", inquiryType);
  console.log("Message:", message);
  console.log("Timestamp:", new Date().toISOString());
  console.log("-------------------------------");

  return NextResponse.json({
    message:
      "Thank you for your inquiry. Our team will review your message and respond within one business day.",
  });
}

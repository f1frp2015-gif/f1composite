import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin/auth";
import { adminList } from "@/lib/catalog/db";
import { getAIModel, getAIModelId, isAIConfigured, logAIStreamError } from "@/lib/aiProvider";
import { rateLimit, tooManyRequests } from "@/lib/rateLimit";
import { SEP0043_PROJECT, SEP0043_SECTIONS } from "@/lib/tradeos/sep0043";

const SYSTEM_PROMPT = `You are the internal F1 TradeOS commercial and engineering copilot for pultruded FRP profiles.

Use only the supplied TradeOS project context and the user's instructions. Never invent dimensions, mass, tooling ownership, tooling cost, lead time, material test results, compliance evidence or customer pricing. A null or blank value means not yet confirmed. Mark it as missing and say who should confirm it.

You may help with RFQ intake, section naming, catalogue matching, BOM completeness, tooling assessment, machining scope, quote assumptions, clarification lists and customer-response drafts. Indicative calculations must state their inputs and must never be presented as a firm quotation. UL 94, smoke, toxicity, EN 13706 and environmental performance claims require construction-specific evidence at the supplied wall thickness.

Reply in the user's language. Prefer a compact table for multi-line comparisons. Keep the project item reference and F1 base section code unchanged. Supplier, resin, finish, colour, machining, tooling and revisions belong to manufacturing variants or commercial records, not the geometry-only base code.`;

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

async function loadProjects() {
  const rows = await adminList("tradeos_projects");
  if (rows.length) return rows;
  return [SEP0043_PROJECT as unknown as Record<string, unknown>];
}

async function loadProjectContext(projectRef: string) {
  const [projects, sections] = await Promise.all([
    loadProjects(),
    adminList("tradeos_project_sections"),
  ]);
  const project = projects.find((row) => row.project_ref === projectRef);
  if (!project) return null;
  const matchingSections = sections.length
    ? sections.filter((row) => row.project_ref === projectRef)
    : projectRef === SEP0043_PROJECT.project_ref
      ? SEP0043_SECTIONS
      : [];
  return { project, sections: matchingSections };
}

export async function GET() {
  if (!(await isAdminRequest())) return unauthorized();
  const projects = await loadProjects();
  return NextResponse.json({
    configured: isAIConfigured(),
    model: getAIModelId("chat"),
    projects: projects.map((row) => ({
      project_ref: String(row.project_ref ?? ""),
      title: String(row.title ?? ""),
      customer: String(row.customer ?? ""),
    })),
  });
}

export async function POST(request: Request) {
  if (!(await isAdminRequest())) return unauthorized();
  const rl = rateLimit(request, "admin-ai", { limit: 50, windowMs: 300_000 });
  if (!rl.ok) return tooManyRequests(rl, "Too many AI workbench requests. Please wait a moment.");

  try {
    const body = (await request.json()) as { messages?: UIMessage[]; projectRef?: string };
    if (!Array.isArray(body.messages) || body.messages.length === 0 || !body.projectRef) {
      return NextResponse.json({ error: "messages and projectRef are required" }, { status: 400 });
    }
    const context = await loadProjectContext(body.projectRef);
    if (!context) return NextResponse.json({ error: "Unknown project" }, { status: 404 });

    const result = streamText({
      model: getAIModel("chat"),
      system: `${SYSTEM_PROMPT}\n\n## Current TradeOS project context\n${JSON.stringify(context, null, 2)}`,
      messages: await convertToModelMessages(body.messages),
      maxOutputTokens: 8192,
      onError: ({ error }) => logAIStreamError("chat", error),
    });

    return result.toUIMessageStreamResponse({
      onError: () => "Gemini could not complete this analysis. Check the API key, model access and quota.",
    });
  } catch (error) {
    console.error(
      JSON.stringify({
        evt: "admin_ai_error",
        ts: new Date().toISOString(),
        err: error instanceof Error ? `${error.name}: ${error.message}` : String(error),
      }),
    );
    return NextResponse.json({ error: "AI workbench temporarily unavailable" }, { status: 503 });
  }
}

import { streamObject } from "ai";
import { google } from "@ai-sdk/google";
import { sourcingRecommendationSchema } from "@/lib/sourcingSchema";
import { after } from "next/server";
import { notifyTeam, escapeHtml, extractContact } from "@/lib/notify";
import { insertInquiry, dbConfigured } from "@/lib/db";
import { rateLimit, tooManyRequests } from "@/lib/rateLimit";

// Sourcing prompts shorter than this are throwaway and don't alert the team.
const SOURCING_NOTIFY_MIN_LEN = 24;

const SYSTEM_PROMPT = `You are the F1 Composite FRP sourcing assistant. The user describes an FRP project (application, environment, loads, standards, geography). You return a structured recommendation matching the provided schema.

## Critical rules
- Only recommend products F1 Composite actually makes:
  - Standard structural profiles: I-beams, channels, angles, square tubes, round tubes, flat bars, rods (sizes 10–305 mm)
  - Custom pultrusions (cross-sections up to 600 × 300 mm)
  - FRP fenestration systems: 65, 70, 80, 90, 140 series window/door frames (PHI Component-ID 2491wi03 for 90-series)
  - FRP gratings and structural deck panels (molded, pultruded, closed-top deck)
- Recommend resin systems honestly:
  - Isophthalic polyester for general infrastructure
  - Vinyl ester for chemical, marine, chlorine, acid splash, wastewater
  - Fire-retardant grades when project explicitly requires UL 94 V-0 or BS 476 limits
  - Phenolic only for severe fire / offshore — do not over-recommend
- Standards: cite the ones that genuinely apply. Common ones: EN 13706, ASTM D3917, ASTM E84, ISO 9001:2015, AS 4586 (slip), AASHTO load classes, BS 476 (fire), PHI for fenestration.
- Never invent URL paths. Use only:
  - /products/standard-profiles, /products/standard-profiles/{i-beam,channel,angle,square-tube,tube,flat-bar,rod}
  - /products/custom-pultrusions
  - /products/fenestration-systems
  - /products/gratings
  - /pultruded-frp-profiles (hub)
  - /applications/{frp-cable-tray-supports, frp-cooling-tower-profiles, frp-bridge-deck-panels, frp-solar-mounting-profiles, frp-chemical-plant-platforms}
  - /frp-profile-calculator, /technology/u-value-calculator, /technology/pultrusion-process, /technology/quality-testing, /technology/frp-vs-traditional-materials
  - /resources/technical-data, /resources/design-guides, /resources/blog
  - /contact, /ask
- Case studies: only reference these slugs (and only if the application genuinely matches):
  - qinling-station-antarctic-passive-windows (PHI passive house, polar climate)
  - european-bridge-deck (FRP deck replacement)
  - coastal-marina-walkway (marine pedestrian)
  - solar-farm-mounting (PV support)
  - water-treatment-platforms (corrosive process)
  - factory-staircase-platforms (industrial access)
  - talent-apartment-yancheng (residential FRP windows)
  Otherwise leave the array empty.
- Keep prose concise. The "why" fields are 1–2 sentences, not paragraphs.

Return ONLY the schema-compliant object. Never include markdown, prose preamble, or chat-style framing.`;

export async function POST(req: Request) {
  // Throttle: this surface calls Gemini AND fires a lead email per qualifying
  // prompt, so cap both LLM cost-abuse and notification-inbox bombing per IP.
  const rl = rateLimit(req, "sourcing", { limit: 8, windowMs: 600_000 });
  if (!rl.ok) {
    return tooManyRequests(rl, "Too many requests. Please wait a moment before submitting another project.");
  }

  try {
    const { prompt }: { prompt: string } = await req.json();

    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 10) {
      return new Response(
        JSON.stringify({ error: "Provide an application description of at least 10 characters." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    console.log(
      JSON.stringify({
        evt: "sourcing_query",
        ts: new Date().toISOString(),
        len: prompt.length,
        preview: prompt.slice(0, 240),
      }),
    );

    // Lead capture: a sourcing submission IS a described project. Alert the team
    // via after() (post-stream, no latency); persist when an email is present.
    const trimmedPrompt = prompt.trim();
    if (trimmedPrompt.length >= SOURCING_NOTIFY_MIN_LEN) {
      const { email, phone } = extractContact(trimmedPrompt);
      const userAgent = req.headers.get("user-agent");
      const referer = req.headers.get("referer");
      after(async () => {
        const { ok, error } = await notifyTeam({
          replyTo: email,
          subject: `[Sourcing lead] FRP project description (${trimmedPrompt.length} chars)`,
          html: `
            <div style="font-family:-apple-system,sans-serif;max-width:640px;color:#1a1a1a;">
              <h2 style="color:#00A199;margin-bottom:8px;">New AI sourcing request on f1composite.com</h2>
              <p style="font-size:14px;color:#555;margin:0 0 16px;">A visitor described a project to the sourcing assistant. Follow up with a tailored quote.</p>
              <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:16px;">
                <tr><td style="padding:6px 12px;font-weight:600;width:90px;vertical-align:top;">Contact</td><td style="padding:6px 12px;">${email ? `<a href="mailto:${escapeHtml(email)}" style="color:#00A199;">${escapeHtml(email)}</a>` : "<i>not shared</i>"}${phone ? ` · ${escapeHtml(phone)}` : ""}</td></tr>
              </table>
              <div style="font-size:14px;border-top:1px solid #eee;padding-top:12px;white-space:pre-wrap;">${escapeHtml(trimmedPrompt)}</div>
            </div>
          `,
        });
        if (!ok) console.error("Sourcing lead notification FAILED — lead at risk:", error, { email, phone });
        if (email && dbConfigured()) {
          try {
            await insertInquiry({
              name: "AI sourcing lead",
              email,
              phone,
              inquiryType: "AI sourcing",
              message: trimmedPrompt.slice(0, 8000),
              source: "ai-sourcing",
              context: { kind: "sourcing" },
              userAgent,
              referer,
            });
          } catch (dbErr) {
            console.error("Sourcing lead DB insert failed:", dbErr);
          }
        }
      });
    }

    const result = streamObject({
      model: google("gemini-2.5-flash"),
      schema: sourcingRecommendationSchema,
      system: SYSTEM_PROMPT,
      prompt: prompt.trim(),
      maxOutputTokens: 4096,
    });

    return result.toTextStreamResponse();
  } catch (err) {
    console.error(
      JSON.stringify({
        evt: "sourcing_error",
        ts: new Date().toISOString(),
        err: err instanceof Error ? `${err.name}: ${err.message}` : String(err),
      }),
    );
    return Response.json(
      {
        error:
          "The sourcing assistant is temporarily unavailable. Please try again, or describe your project at /contact and our team will respond within 24 hours.",
      },
      { status: 503 },
    );
  }
}

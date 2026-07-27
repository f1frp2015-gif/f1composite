import { streamText } from "ai";
import { rateLimit, tooManyRequests } from "@/lib/rateLimit";
import { getAIGatewayModel, logAIGatewayStreamError } from "@/lib/aiGateway";

const SYSTEM_PROMPT = `You are an FRP engineering article summarizer. Given a long-form technical article from F1 Composite, return three concise bullets (one line each, plain text, no markdown). Each bullet starts with "- ". Each bullet captures one engineering takeaway a specifying engineer or buyer would act on. No fluff, no preamble, no closing line. Total output under 80 words.`;

export async function POST(req: Request) {
  // Throttle: content is attacker-controllable here, so without a cap this is an
  // open LLM proxy. Limit per-IP AI Gateway calls.
  const rl = rateLimit(req, "summarize", { limit: 20, windowMs: 600_000 });
  if (!rl.ok) {
    return tooManyRequests(rl, "Too many summary requests. Please wait a moment.");
  }

  try {
    const { title, content }: { title: string; content: string } = await req.json();

    if (!content || content.length < 100) {
      return new Response(
        JSON.stringify({ error: "Content too short to summarize." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    console.log(
      JSON.stringify({
        evt: "summarize_article",
        ts: new Date().toISOString(),
        title,
        len: content.length,
      }),
    );

    const trimmed = content.length > 12000 ? content.slice(0, 12000) : content;

    const result = streamText({
      model: getAIGatewayModel("summarize"),
      system: SYSTEM_PROMPT,
      prompt: `Article title: ${title}\n\nArticle body:\n${trimmed}`,
      maxOutputTokens: 400,
      providerOptions: {
        openai: { reasoningEffort: "minimal" },
      },
      onError: ({ error }) => logAIGatewayStreamError("summarize", error),
    });

    return result.toTextStreamResponse();
  } catch (err) {
    console.error(
      JSON.stringify({
        evt: "summarize_error",
        ts: new Date().toISOString(),
        err: err instanceof Error ? `${err.name}: ${err.message}` : String(err),
      }),
    );
    return Response.json(
      { error: "Summary temporarily unavailable." },
      { status: 503 },
    );
  }
}

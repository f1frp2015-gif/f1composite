import { streamText } from "ai";
import { google } from "@ai-sdk/google";

const SYSTEM_PROMPT = `You are an FRP engineering article summarizer. Given a long-form technical article from F1 Composite, return three concise bullets (one line each, plain text, no markdown). Each bullet starts with "- ". Each bullet captures one engineering takeaway a specifying engineer or buyer would act on. No fluff, no preamble, no closing line. Total output under 80 words.`;

export async function POST(req: Request) {
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
    model: google("gemini-2.5-flash"),
    system: SYSTEM_PROMPT,
    prompt: `Article title: ${title}\n\nArticle body:\n${trimmed}`,
    maxOutputTokens: 400,
  });

  return result.toTextStreamResponse();
}

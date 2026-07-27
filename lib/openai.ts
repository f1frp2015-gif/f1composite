import { createOpenAI } from "@ai-sdk/openai";

export type OpenAISurface = "chat" | "sourcing" | "summarize";

const DEFAULT_MODELS: Record<OpenAISurface, string> = {
  chat: "gpt-5.6-terra",
  sourcing: "gpt-5.6-terra",
  summarize: "gpt-5.6-luna",
};

const openai = createOpenAI();

export const OPENAI_UNAVAILABLE_MESSAGE =
  "AI assistant temporarily unavailable. Please retry, or reach inquiry@f1composite.com / +86 138 8333 8993 for an immediate response.";

export function getOpenAIModel(surface: OpenAISurface) {
  if (!process.env.OPENAI_API_KEY?.trim()) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const modelId = process.env.OPENAI_MODEL?.trim() || DEFAULT_MODELS[surface];
  return openai.responses(modelId);
}

export function logOpenAIStreamError(surface: OpenAISurface, error: unknown) {
  console.error(
    JSON.stringify({
      evt: `${surface}_stream_error`,
      ts: new Date().toISOString(),
      provider: "openai",
      err: error instanceof Error ? `${error.name}: ${error.message}` : String(error),
    }),
  );
}

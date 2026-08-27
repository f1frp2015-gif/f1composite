import { createGoogleGenerativeAI } from "@ai-sdk/google";

export type AISurface = "chat" | "sourcing" | "summarize";

const DEFAULT_MODELS: Record<AISurface, string> = {
  chat: "gemini-3.7-flash",
  sourcing: "gemini-3.7-flash",
  summarize: "gemini-3.5-flash-lite",
};

export const AI_UNAVAILABLE_MESSAGE =
  "AI assistant temporarily unavailable. Please retry, or reach inquiry@f1composite.com / +86 138 8333 8993 for an immediate response.";

function getGoogleApiKey() {
  return (
    process.env.GEMINI_API_KEY?.trim() ||
    process.env.GOOGLE_API_KEY?.trim() ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim()
  );
}

export function isAIConfigured() {
  return Boolean(getGoogleApiKey());
}

export function getAIModelId(surface: AISurface) {
  return process.env.GOOGLE_AI_MODEL?.trim() || DEFAULT_MODELS[surface];
}

export function getAIModel(surface: AISurface) {
  const apiKey = getGoogleApiKey();
  if (!apiKey) {
    throw new Error(
      "Google Gemini API key is missing. Configure GEMINI_API_KEY in the server environment.",
    );
  }

  const google = createGoogleGenerativeAI({ apiKey });
  return google(getAIModelId(surface));
}

export function logAIStreamError(surface: AISurface, error: unknown) {
  console.error(
    JSON.stringify({
      evt: `${surface}_stream_error`,
      ts: new Date().toISOString(),
      provider: "google-generative-ai",
      model: getAIModelId(surface),
      err: error instanceof Error ? `${error.name}: ${error.message}` : String(error),
    }),
  );
}

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { gateway } from "ai";

export type AISurface = "chat" | "sourcing" | "summarize";

const DEFAULT_MODELS: Record<AISurface, string> = {
  chat: "gemini-2.5-flash",
  sourcing: "gemini-2.5-flash",
  summarize: "gemini-2.5-flash-lite",
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

function directGoogleApiEnabled() {
  return process.env.GOOGLE_AI_DIRECT === "true";
}

export function isAIConfigured() {
  if (directGoogleApiEnabled()) return Boolean(getGoogleApiKey());
  return Boolean(
    process.env.AI_GATEWAY_API_KEY ||
    process.env.VERCEL_OIDC_TOKEN ||
    process.env.VERCEL,
  );
}

export function getAIModelId(surface: AISurface) {
  return process.env.GOOGLE_AI_MODEL?.trim() || DEFAULT_MODELS[surface];
}

export function getAIModel(surface: AISurface) {
  const modelId = getAIModelId(surface);
  if (!directGoogleApiEnabled()) return gateway(`google/${modelId}`);

  const apiKey = getGoogleApiKey();
  if (!apiKey) {
    throw new Error(
      "Google Gemini API key is missing. Configure GEMINI_API_KEY in the server environment.",
    );
  }

  const google = createGoogleGenerativeAI({ apiKey });
  return google(modelId);
}

export function logAIStreamError(surface: AISurface, error: unknown) {
  console.error(
    JSON.stringify({
      evt: `${surface}_stream_error`,
      ts: new Date().toISOString(),
      provider: directGoogleApiEnabled()
        ? "google-generative-ai-direct"
        : "vercel-ai-gateway/google",
      model: getAIModelId(surface),
      err: error instanceof Error ? `${error.name}: ${error.message}` : String(error),
    }),
  );
}

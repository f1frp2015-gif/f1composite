export type AIGatewaySurface = "chat" | "sourcing" | "summarize";

const DEFAULT_MODELS: Record<AIGatewaySurface, string> = {
  chat: "openai/gpt-5-mini",
  sourcing: "openai/gpt-5-mini",
  summarize: "openai/gpt-5-nano",
};

export const AI_UNAVAILABLE_MESSAGE =
  "AI assistant temporarily unavailable. Please retry, or reach inquiry@f1composite.com / +86 138 8333 8993 for an immediate response.";

export function getAIGatewayModel(surface: AIGatewaySurface) {
  return process.env.AI_GATEWAY_MODEL?.trim() || DEFAULT_MODELS[surface];
}

export function logAIGatewayStreamError(surface: AIGatewaySurface, error: unknown) {
  console.error(
    JSON.stringify({
      evt: `${surface}_stream_error`,
      ts: new Date().toISOString(),
      provider: "vercel-ai-gateway",
      err: error instanceof Error ? `${error.name}: ${error.message}` : String(error),
    }),
  );
}

import type { MetadataRoute } from "next";

// AI / LLM crawlers we explicitly welcome so F1 Composite is eligible for
// citation in ChatGPT, Claude, Perplexity, Google AI Overviews, etc.
// (GEO: being crawlable by these agents is a precondition for being cited.)
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "Amazonbot",
  "Meta-ExternalAgent",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        // /api/ai-context is a force-static, CORS-open schema.org JSON twin built
        // for AI/LLM retrieval and advertised by llms.txt. Keep it crawlable while
        // the rest of /api/ (chat, contact, inquiries) stays blocked. A more
        // specific allow wins over the broader /api/ disallow.
        allow: ["/", "/api/ai-context"],
        disallow: ["/api/"],
      },
      {
        userAgent: AI_CRAWLERS,
        allow: ["/", "/api/ai-context"],
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://www.f1composite.com/sitemap.xml",
    host: "https://www.f1composite.com",
  };
}

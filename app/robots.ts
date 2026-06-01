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
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: AI_CRAWLERS,
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://www.f1composite.com/sitemap.xml",
    host: "https://www.f1composite.com",
  };
}

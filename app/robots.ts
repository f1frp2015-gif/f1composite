import type { MetadataRoute } from "next";

// Preserve the existing crawler permissions. Search retrieval (OAI-SearchBot),
// user-triggered fetching and training controls (GPTBot / Google-Extended) have
// different purposes; allowing training is not required for search inclusion.
// robots permission alone does not guarantee crawling, indexing or citation.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Grok",
  "xAI",
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
        // Legal pages intentionally remain crawlable: their page metadata uses
        // noindex, follow, which a crawler cannot see if robots.txt blocks them.
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

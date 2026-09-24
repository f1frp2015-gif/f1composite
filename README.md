# f1composite.com

Website of F1 Composite (Chongqing F1 Composites Co., Ltd.), the export company of
FengDu New Material. Next.js 16 App Router, Tailwind CSS v4, deployed on Vercel.

Read [AGENTS.md](AGENTS.md) before changing anything: it covers the Git-to-production
workflow and the Next.js version notes. [WEBSITE.md](WEBSITE.md) (Chinese) is the site
overview, URL intent map and open items.

## Local development

Use Node 22.18 or later (the tests import TypeScript files directly).

```bash
npm ci
npm run dev        # http://localhost:3000
```

## Checks

CI runs these on every pull request; run them before pushing.

```bash
npm run lint
npm test               # node:test suites listed in package.json
npm run check:copy     # retracted claims (errors), em-dash density and reveals (warnings)
npm run check:sitemap
npm run build          # also enforces title ≤ 60 and description 120–160 characters
```

`npm run test:images` checks public image weight and duplicates.

## Where things live

- `content/data/company.ts`: company facts, production figures, lead times, MOQs and
  the reply time. Pages, the Organization schema, `/llms.txt`, `/llms-full.txt`,
  `/api/ai-context` and the assistant prompts all read from it.
- `content/data/blogPosts.ts`: blog articles (markdown in template strings).
- `lib/seo.ts`: `buildPageMetadata` and structured data helpers.
- `lib/consent.ts`, `components/consent/`: Google Consent Mode v2 and the cookie banner.
- `lib/llmsContent.ts`, `lib/publicKnowledge.ts`: the llms.txt index, the full brief and
  the JSON knowledge base.

## AI routes

The server-side AI routes use Vercel AI Gateway. Vercel deployments authenticate
automatically with `VERCEL_OIDC_TOKEN`, so no provider API key is required in
Production. For local development outside `vercel dev`, create an AI Gateway key
and put it in `.env.local`:

```bash
AI_GATEWAY_API_KEY=your_vercel_ai_gateway_key
# Optional global override; role-aware low-cost OpenAI defaults are used otherwise.
AI_GATEWAY_MODEL=openai/gpt-5-mini
```

The defaults are `openai/gpt-5-mini` for chat and sourcing, and
`openai/gpt-5-nano` for summaries. Do not prefix the key with `NEXT_PUBLIC_`;
it must remain server-only.

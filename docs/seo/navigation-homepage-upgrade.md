# Product taxonomy, homepage and search intent upgrade

Implemented: 2026-09-12. Scope: the two-step navigation and homepage plan approved by the site owner.

## Commercial structure

The shared taxonomy in `content/data/productTaxonomy.ts` identifies four purchasing families, in this order:

1. Standard Pultruded Profiles — established cross-sections and specification lookup.
2. Custom Pultruded Profiles — drawing-led development, material requirements, tooling and samples.
3. Windows & Doors — lineals, reinforcement sections and finished units.
4. FRP Grating — molded and pultruded grating.

Industries identify a project sector; applications identify the use of a component. Existing niche commercial pages remain linked from the complete product directory and application groups. Ordinary solid rods and concrete rebar are not treated as interchangeable products. Molded grating is not described as pultrusion.

## Route ownership and retained URLs

| Route | Role |
|---|---|
| `/` | Manufacturer/brand discovery; standard and custom procurement paths |
| `/products/product-lines` | All four commercial families and application-specific catalog links |
| `/pultruded-frp-profiles` | Pultrusion overview and standard/custom profile sections |
| `/products/fiberglass-structural-shapes` | Standard catalog and section dimensions |
| `/products/frp-window-frames` | Existing window-series and supply-route overview |
| `/products/window-door-profiles` | New fabricator procurement page: profile sets, lineals, interfaces and cut lengths |
| `/products/fiberglass-windows-doors` | New finished-unit procurement page: opening schedule, glass, hardware and assembly scope |
| `/products/grating` | New molded/pultruded comparison and selection entry |
| `/products/frp-gratings` | Existing pultruded-grating specification owner |
| `/products/molded-frp-grating` | Existing molded-grating specification owner |
| `/products/frp-solar-mounting-systems` | Existing PV component catalog and supply requirements |
| `/applications/frp-solar-mounting-profiles` | PV support design: loads, spans, clamp zones and connections |
| `/industries/water-wastewater` | New sector page connected to existing supports, platforms and grating |
| `/products/fiberglass-plates` | Existing hollow/multi-cell section drawings; legacy Plate identifiers retained |

No existing commercial URL is deleted or redirected by this upgrade. The historical `/products` redirect stays in place. There is no FRP/GRP spelling clone or country-page multiplication. Changing `/products` into a live index or merging established solar URLs requires page/query/backlink evidence rather than an assumption that a shorter path ranks better.

No Search Console or Bing performance connector was available during implementation. This change therefore makes no claim about measured traffic uplift or existing keyword cannibalization.

## Homepage and inquiry journey

Homepage order: product-led hero → four families with standard/custom emphasis → custom drawing workflow → manufacturing and quality → applications → selected supply projects → engineering resources → existing footer inquiry CTA.

The hero routes standard buyers to the catalog and custom buyers to a drawing-led RFQ. The two window buying routes preserve distinct checklists and product attribution through the existing contact form. No extra lead form or attachment endpoint was added. The density/weight calculator is explicitly linked from the homepage, navigation, footer and existing public knowledge index.

Following the owner's review, the homepage again displays the original production-line photograph and established capacity figures: 370 lines, five manufacturing bases and 150,000 tonnes annual capacity, attributed to the FengDu manufacturing network. The capability strip also retains 30+ export countries. The homepage does not infer a global or national number-one ranking from capacity alone. Project cards state component supply without broadening that into general turnkey contracting. The two existing cases used here are not new project claims.

The ranking-preservation follow-up gives `/pultruded-frp-profiles` a prominent link above all four menu families, the primary homepage product button, a footer link, and explicit parent breadcrumbs in the standard and custom catalogs. A compact application-specific pultrusion section restores links to downstream uses while keeping molded grating outside the pultrusion catalog. The four ranking pages reviewed from the owner's keyword screenshot retain their titles, canonical URLs and H1s; their observed ranking changes cannot be attributed to the release without fresh query/country data.

## SEO and AI retrieval

- Server-rendered links, explicit headings, comparison tables and purchasing-scope answers remain available without client-side search or filtering.
- New pages have independent titles, descriptions and self-canonicals. Collection pages describe their visible destinations using CollectionPage/ItemList; quote-only procurement pages do not fabricate Product offers, prices or reviews.
- Breadcrumb parents point to the commercial product index. New routes are included in the sitemap with their actual creation date.
- Existing `/api/ai-context` and `/llms.txt` share the four core families and window purchasing routes with visible content. This is consistency maintenance, not a claim that a special AI file causes inclusion.
- Crawler permissions are unchanged. Homepage navigation analytics collect destination paths only, excluding query strings, inquiry text and drawings. Existing successful-RFQ events retain their receipt-based deduplication.

Official guidance used: [Google AI optimization](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), [Google site structure](https://developers.google.com/search/docs/specialty/ecommerce/help-google-understand-your-ecommerce-site-structure), and [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a). These support technical accessibility, clear original content and accurate information; they do not guarantee rankings or citations.

## Verification and monitoring

Required checks: `npm run lint`, `npm run build`, `npm run check:sitemap`, navigation/taxonomy tests, related sheet/plate and grating regressions, contact-delivery/site-audit tests, and IndexNow tests. Navigation and taxonomy tests are also added to Node 20 CI.

`node scripts/verify-taxonomy-upgrade.mjs <base-url>` verifies rendered metadata, canonical URLs, one H1, valid JSON-LD, linked pages/documents, sitemap membership and consistent public knowledge. Browser checks cover desktop menus, mobile family disclosures, overflow and the window RFQ journey. Test inquiries are not submitted.

Known pre-existing checks: the unrelated section viewer has one hook dependency lint warning. The image regression's historical 27 MiB total-asset threshold is already exceeded on the starting main commit: both HEAD and this working tree contain exactly 34,403,043 raster bytes. This upgrade adds no raster assets. Missing-image and image-component audits pass; the historical total-byte threshold was not relaxed.

After production: verify the canonical domain and record the deployment/commit. The existing IndexNow workflow notifies changed URLs after Vercel succeeds. For outcome measurement, compare equivalent 28-day Search Console windows by query, landing page and country; inspect homepage-to-family clicks, RFQ starts and successful inquiries; use Bing AI Performance citations/grounding queries when account access is available. Do not interpret an immediate rank change as proof of causal uplift.

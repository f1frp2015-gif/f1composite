# FRP / GRP search-intent plan — 2026-09-08

## Decision

Keep FRP as the site's main vocabulary. Add GRP as a glass-reinforced product synonym in existing commercial pages, with one contextual explanation per selected product. Preserve fiberglass terms and the existing primary-query owners. Do not create cloned /grp-* product routes, country doorway pages, automatic IP-based wording, or alternate hreflang URLs without genuinely localized content. Keep existing self-canonicals, navigation paths and sitemap routes.

GRP and GFRP identify glass reinforcement; FRP also includes carbon, basalt and other reinforcement. They are not universally interchangeable. The material abbreviation establishes neither grade nor product compliance.

## Evidence and limits

The user-supplied Ahrefs screenshot suggests UK demand for “grp profiles” and mixed-market demand for grating/tube/access terms. It does not identify a verified F1 property or provide a complete country dataset. Treat its volume/rank numbers as research leads, not F1 performance or market-wide measurements. No ranking lift is claimed from another site's terminology alone.

Observed supplier practices, accessed 2026-09-08:

- [Fibrolux](https://fibrolux.com/en/products/grp-profiles/): groups glass-composite products under GRP categories, with separate application and product information.
- [Strongwell](https://www.strongwell.com/products/structural-shapes-and-plate/): uses fiberglass structural shapes and FRP specifications in its US-facing catalog.
- [Engineered Composites UK brochure](https://engineered-composites.co.uk/wp-content/uploads/2022/01/BROCHURE-2021.pdf): uses GRP profiles in UK technical/product literature.
- [Terra Firma Australia](https://terrafirmaindustries.com.au/frp-grates-products/): uses FRP and GRP together in the same product range.
- [Satyam India](https://satyamindia.net/product/frp-grp-grating): describes both FRP and GRP grating, including moulded and pultruded constructions.

Inference: use supplier terminology as qualitative evidence for naming, not a rule that each country searches only one acronym. UK/European GRP coverage deserves emphasis, while US fiberglass/FRP and mixed Australian/Indian usage remain supported. Do not assume all European language markets use the English GRP acronym.

[Google Search Essentials](https://developers.google.com/search/docs/essentials) recommends descriptive words in meaningful page locations. [Spam policies](https://developers.google.com/search/docs/essentials/spam-policies) advise against stuffing and doorway pages. [Canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) supports consistent preferred URLs and internal links.

## Page ownership

| Existing URL | Retained intent | GRP placement |
| --- | --- | --- |
| / | FRP profiles manufacturer | One visible GRP profiles link to the product hub; description synonym |
| /pultruded-frp-profiles | Pultruded FRP product-family selection | GRP profiles in title/H1, short scoped explanation, selected shape-card aliases |
| /products/fiberglass-structural-shapes | Fiberglass structural shapes, sizes and weights | GRP sections in metadata; preserve fiberglass title |
| /products/frp-gratings | Pultruded FRP / fiberglass grating | GRP grating in title/description and bearing-direction buying note |
| /products/molded-frp-grating | Molded FRP grating | Moulded GRP spelling in title/description; clarify distinct panel construction |
| /products/frp-ladders | Fiberglass fixed ladders / FRP access | GRP ladders in title/description and permanent-access note |
| /products/frp-handrail-systems | Fiberglass handrail / FRP railing | GRP handrails in description and functional handrail/guardrail note |
| /products/fiberglass-structural-shapes/frp-tube | Fiberglass round tube / FRP tubing | GRP tubing in title/description; structural vs pressure-pipe boundary |
| /what-is-frp#terminology | FRP definition and GRP vs FRP comparison | Regional naming explanation with sources and product links |
| /resources/glossary#grp-gfrp | Short definition lookup | Precise GRP/GFRP expansion and scope |

No separate singular/plural pages, density page or generic GRP fencing/platform page is added just to match screenshot keywords. Such queries require real product or engineering content and distinct intent. Existing UK windows content remains its own window-specific regional resource.

## Verification and measurement

Validate rendered titles, descriptions, one H1, canonical URLs, visible FRP and GRP wording and internal links. Run lint/build and existing grating, access, navigation and sitemap checks. Inspect the responsive UI and Vercel Preview before merging.

After indexing, compare Search Console query groups (case-insensitive GRP, FRP, fiberglass/fibreglass) by page and country: UK, US, Australia and India first. Use comparable 28-day periods, acknowledging crawl lag, seasonality and small samples. Track impressions, clicks, CTR, position and quote inquiries separately. Check whether GRP query gains coexist with stable FRP/fiberglass coverage and whether unintended pages compete for the same query. This is a measurement plan; no Search Console baseline or monitoring automation has been created in this task.

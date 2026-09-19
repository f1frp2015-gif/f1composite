# Google Ads US/Canada Search pilot configuration

Status: configuration specification; do not enable either campaign until the RFQ conversion is verified and the owner explicitly approves launch.

## Campaign controls

| Campaign | Market | Average daily budget | Initial max CPC bid limit |
| --- | --- | ---: | ---: |
| US · FRP profiles / window lineals | United States | USD 10 | USD 4 |
| CA · FRP profiles / window lineals | Canada | USD 5 | USD 3 |

Both campaigns: Search only; Google Search partners and Display Network off; English; location option **Presence** (people in or regularly in the target country); AI Max, text customization, and final-URL expansion off. Use Maximize Clicks with the stated CPC limit during the measurement pilot. Keep campaigns paused. Daily budget is an average, not a hard daily spending cap.

The only primary conversion is **RFQ submitted — website**, fired after `/api/contact` accepts a request with `inquiry_type=rfq`. Page views are not a bidding goal. Do not import the same RFQ event from GA4 as a second primary conversion. Calculator usage, gated downloads, and email/phone clicks may be added later as secondary observations only after their triggers are verified.

## Ad groups (repeat in each country campaign)

One ad group uses one destination. Start with exact match and a small number of phrase matches; review actual search terms before expanding.

| Ad group | Final URL | Starter keywords |
| --- | --- | --- |
| Pultruded profiles | `https://www.f1composite.com/pultruded-frp-profiles` | `[pultruded frp profiles]`, `"pultruded frp profiles"`, `[fiberglass pultruded profiles]`, `[frp pultrusion profiles]` |
| Structural shapes | `https://www.f1composite.com/products/fiberglass-structural-shapes` | `[frp i beam]`, `[fiberglass i beam]`, `[frp channel]`, `[frp angle]`, `"fiberglass structural shapes"` |
| Window frame lineals for fabricators | `https://www.f1composite.com/products/window-door-profiles` | `[fiberglass window frame profiles]`, `[frp window profiles]`, `[frp window frames]`, `"fiberglass window frame profiles"` |

Do not add broad-match `fiberglass windows` or `fiberglass window frames` to the starter list. The latter may be revisited only after reviewing the search-term report and buyer intent.

### Starter ad messages

- Pultruded profiles: "Pultruded FRP Profiles" / "Factory-Direct FRP Profiles" / "Request a Project Quote". Description: "Send your section, resin and quantity requirements to F1 Composite for a tailored quote."
- Structural shapes: "FRP I-Beams & Channels" / "Fiberglass Structural Shapes" / "Quote to Your Specification". Description: "Explore FRP beams, channels and angles. Share dimensions and loads for an RFQ."
- Window lineals: "FRP Window Frame Profiles" / "For Window Fabricators" / "Request Profile Pricing". Description: "Fiberglass frame lineals for fabricators. Send section drawings and volume for a quote."

## Initial negatives

Apply at campaign level, then refine from search terms: `what is`, `meaning`, `definition`, `stand for`, `texture`, `pbr`, `repair`, `replacement`, `installer`, `installation`, `near me`, `diy`, `home depot`, `lowes`, `amazon`, `jobs`, `salary`. Check exact queries before adding broader exclusions that could hide valid industrial buyers.

Exclude gratings, stair treads, cable trays, generic educational FRP queries, and other countries from this pilot. The pre-existing Performance Max campaign is outside scope and must not run alongside it.

## Verification before launch

1. Confirm the Google tag is detected on the production domain and a successful test RFQ emits exactly one Ads conversion event. Do not treat a form-page view or failed submission as a conversion.
2. Verify each campaign's country, Presence option, networks, budget, CPC limit, language, AI Max state, ad status, final URLs, and negatives in the account UI.
3. Check policy approval and the Vercel Preview for the tracking-code PR; deploy through `main`, then verify the canonical production domain and report the deployed commit and deployment ID.
4. Obtain explicit launch approval. Until then, both campaigns remain paused.

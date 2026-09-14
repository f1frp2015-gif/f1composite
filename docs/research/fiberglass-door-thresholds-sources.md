# F1 fiberglass door thresholds — content and asset record

Prepared 2026-09-13 for `/products/fiberglass-door-thresholds`.

## Authorized scope

The user identified pultruded fiber-reinforced door thresholds, requested F1 branding and placement within Windows & Doors, and prohibited supplier-specific images and identifying information on the public page. Product dimensions, tool availability, prices, test ratings and supplier certification were not provided as F1 evidence.

## Product reference (internal only)

- User reference: https://www.venstertechniek.nl/oplossingen/kunststof-kozijnen/profine
- Read the public HTML on 2026-09-13. It describes glass-reinforced polymer sill solutions for a specific uPVC frame system and separates hinged and lift-slide uses.
- Initially used only to understand the application category. No source photographs, logos, proprietary names, compatibility claims, certificates or dimension tables are reproduced on the public F1 page. The source itself gives differing standard-length figures, so neither is adopted. Subsequent user-provided section sketches are recorded below.
- F1 prose is original and addresses profile procurement, interfaces, drainage, support and quotation inputs. It does not claim F1 makes the pictured third-party door, owns the referenced supplier, or supplies an approved replacement for a named frame series.

## Licensed application photograph

- Local asset: `public/images/products/door-thresholds/garden-door-opening-application.webp`
- Photographer: 强 任 (@rendy).
- Source: https://unsplash.com/photos/open-glass-doors-reveal-a-lush-green-courtyard-garden-4_Dzj4pqbcg
- Image URL: https://images.unsplash.com/photo-1764422097784-0eaa2340d0e1
- License: https://unsplash.com/license — the photo detail page explicitly states it is free to use under this license. Verified 2026-09-13.
- This is a copyright license allowing commercial use, not a claim that the photograph has no copyright or is public domain.
- Downloaded at 1440 px width and converted to WebP for the website. The public caption credits the photographer and links to both source and license.
- Usage: atmospheric context for a glazed doorway. The photo is not labeled as an F1 product or project and is not used for the product's social image.

## Original diagram

- `public/images/products/door-thresholds/fiberglass-door-threshold-section.svg`
- Original generic section illustration authored for this page; no supplier CAD tracing. Shows a hollow profile, separate seal interface, exterior fall and supported base.
- The public caption identifies it as a concept. It contains no production dimensions, conformity marks or rated performance.
- This diagram and its PNG are retained at their existing URLs; the page and social preview now use the profile renders below.

## Four continuous profile renders — 2026-09-13 revision

- User supplied a product perspective reference and a four-section dimension sketch, then explicitly requested matching profile-only renders with all end fittings removed.
- Newly rendered assets: `fiberglass-door-threshold-{inward-closed,inward-hook,outward-closed,outward-hook}.webp` in the same public asset directory; `fiberglass-door-threshold-social.png` is the social preview.
- Geometry is reconstructed from those user-provided sketches. These are original rendered views of referenced shapes, not a claim that F1 originated the underlying section designs or that these are independently licensed supplier CAD files.
- Early generative-image attempts were rejected for inconsistent extrusion. Published assets instead come from the deterministic Three.js workbench in `scripts/threshold-render/`. All steps, ribs and cavity walls are extruded together from one 2D section through the same length, with one camera across all four variants.
- The 120 mm width, 55 mm overall envelope and 48.5 / 93 mm raised widths guide proportions. Unspecified wall thicknesses, small details and corner radii are illustrative. The public page does not treat these as approved production drawings, stock models or evidence of compatibility with a named supplier system.
- No supplier names, identifying text, photographs, fittings or logos appear in these renders. The page retains its URL, title, canonical, navigation and inquiry path.

### Section fidelity correction

- User accepted image 3 (outward-opening closed base) and rejected the other three.
- Images 1, 2 and 4 were rebuilt with independent reference outlines instead of shared simplified geometry. Cavity-roof steps, the right-cavity interface notch, asymmetric top ribs, underside lands and hooked toe ridges follow the supplied sketch.
- The loops explicitly use opposite winding for outer boundaries and holes. Added front-face ray checks catch invisible cavity walls, which a double-sided topology check alone cannot detect.
- Image 3 remains byte-for-byte unchanged. Corrected images require visual comparison with the supplied cross-sections in addition to geometric invariants.

### Approved image release

- The user requested publication of the final four images after receiving the English-only export. The four standalone product renders contain no text; their existing English page captions and alt text remain in place.
- Image 2 uses a neutral gray cut face to make the open hooked edge legible against the background. Image 3 retains the previously accepted pixels.
- The hero, gallery, full-size links, structured data and social metadata now reference content-hash asset filenames. This changes the image-optimizer cache key, avoiding stale images under the site's 31-day minimum image cache TTL. Earlier asset URLs remain available.

## Discoverability and validation

- Added to the existing Windows & Doors menu and product-family directory.
- Linked from the window range and both window procurement pages. Existing URLs, redirects, titles and canonical targets remain intact.
- Dedicated title, description, canonical, sitemap entry and ItemPage JSON-LD. No fabricated Offer, price, rating or certification schema.
- Public AI context and `llms.txt` derive their threshold scope from the same content record used on the page.
- Acceptance: responsive display, working menu and inquiry links, valid canonical and schema, supplier-free public content, passing navigation checks, lint and production build, and a successful Vercel Preview.

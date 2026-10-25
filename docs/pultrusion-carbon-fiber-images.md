# Pultrusion carbon fiber illustrations

The five SVG assets in `public/images/products/pultrusion-carbon-fiber/` are original vector illustrations created for this hub. They use navy, teal, and graphite colors, with axial lines representing longitudinal fibers rather than woven fabric.

- `profile-family.svg`: 1200 × 900, plate, hollow round tube, and solid rods.
- `plates.svg`, `tubes.svg`, `rods.svg`: 900 × 600 product studies.
- `process.svg`: 1400 × 500 five-stage conceptual pultrusion schematic.

Every SVG includes accessible title and description elements and explicit dimensions and viewBox. These are conceptual marketing illustrations, not product photographs, certified engineering drawings, or representations of a particular production line. No dimensions or performance ratings are implied.

The assets are placeholders that can be replaced with user-supplied photographs after confirming rights and accurate product identification. Maintain the existing aspect ratios or update the page image layout when replacing them.

The hub also reuses an existing wind-panel supplier image selected by the primary implementation task. That existing image is separate from these original illustrations; its existing provenance and usage permissions continue to apply.

## Page and replacement map

- Route: `/products/pultrusion-carbon-fiber`.
- Hero: `profile-family.svg`; its card thumbnail is registered in `lib/covers.ts`.
- Product cards and matching detail sections: `plates.svg`, `tubes.svg`, `rods.svg`, configured in `content/data/carbonFiberPultrusion.ts`.
- Process section: `process.svg`.
- Application photo: `/images/products/wind-turbine-blade-panels/pultruded-carbon-fiber-wind-blade-panel.webp`, 605 × 209, labelled representative supplier image.
- Replace the corresponding `src`, dimensions, alt text and illustration note together when using product photographs. No competitor photographs were downloaded or republished.

## Content references

Reviewed 2026-10-25. Technical explanations are qualitative; no outside supplier's SKU specification is claimed as F1 stock or certified performance.

- User-supplied layout reference: https://incomepultrusion.com/product/3mm-carbon-fiber-rod-pultruded/ — product explanation, specification, applications, FAQ and inquiry sequence. Its weight, length, resin and performance claims were not copied.
- https://exelcomposites.com/guide-to-composites/ — continuous pultrusion, constant sections and reinforcement direction.
- https://exelcomposites.com/composite-solutions/composite-tubes/ — tube architecture and manufacturing-route selection.
- https://www.cstcomposites.com/about-us/technology/ — axial versus circumferential reinforcement and process choices.
- https://www.pultruder.com/products/fiber-line-engineered-fiber-solutions/fiber-line-performance-enhancing-processes/pultrusion-composite-fiber-rods — carbon is excluded from the insulating-fiber claim.
- Existing F1 `content/data/windTurbineBladePanelSpecs.ts` — carbon panel program and representative supplier image; glass-panel fatigue results are not applied to carbon profiles.

## Internal-link release boundary

At implementation, `origin/main` has specialist CFRP strip, wind-blade panel, roller-tube and robotic-beam destinations. Generic carbon tube and rod pages are being developed in separate worktrees, so this independent change links the hub's `#plates`, `#tubes` and `#rods` sections and existing specialist pages. Point product cards to the generic pages when those routes are merged; do not publish links that currently return 404.

# FRP density and weight-per-meter calculator

Route: `/frp-density-calculator`. The page targets `frp density` with a direct answer, sourced formulas, worked examples, FAQ, and an interactive calculator. Links enter from Resources, Technical Data and the existing density article; the route is included in the sitemap. Existing density article remains the explanatory guide.

## Calculation paths

- Layup (initial mode): retained mat/fabric GSM × developed width × repeats × axial feed factor, plus roving tex × ends × axial feed factor. Convert each reinforcement's g/m to occupied mm² using its constituent density in g/cm³. Fill the remaining net section volume with cured matrix after excluding entered void volume. Report density, kg/m, constituent masses and occupied areas.
- Formulation (default basis: weight percent): inverse rule of mixtures; optional conversion to non-void volume fractions preserves density. All fractions must total 100%. Voids are a separate fraction of final laminate volume.
- Manual density: section area and density give kg/m, piece weight and order weight.
- Weighed sample: sample mass divided by net section volume gives inferred density. Order quantity never affects inferred density.

Outer/inner surface perimeters are reference approximations. Actual ply centerline paths, local reinforcement strips, corner radii and multi-cell geometry use user-entered developed widths and CAD net area. Repeated plies on different paths must be separate rows. Coverage is applied before adding total retained overlap. Exclude discarded trim and process waste. Mat/fabric orientation is not automatically multiplied into GSM.

Density is a material-volume property; kg/m is the profile's linear mass (displayed as **Weight per meter**). The unit selector supports kg/m, g/m and lb/ft. Tex remains an input for roving feed.

All example material densities are editable assumptions. Use solid/effective reinforcement density and cured resin/filler matrix density, avoiding double counting binders, fillers and stitching. Positive residual matrix volume does not establish practical packing, wet-out or manufacturability. Final production density requires measurement.

## Interaction

GSM, first roving-group end count, and void sliders update the same state as numeric fields. A selectable mat/fabric path determines which GSM slider is active. Animation stages show reinforcement occupied volume, matrix filling and final results; manual stepping and pause are available. Volume bands represent proportions, not physical ply positions. Reduced-motion users can step through without animation. Mobile users get a live bottom summary linking to results and sliders.

Calculations remain in browser memory. The quote link prefills section dimensions, density basis, results and quantity; it does not include the detailed formulation or reinforcement schedule.

## Verification

- `npm run test:density`: 11 tests covering sections, unit conversion, reverse calculation, mixture-basis equivalence, voids, per-layer mass, overlap, retained feed and invalid geometry / overfilled sections.
- `npm run lint`: no errors; existing unrelated hook-dependency warning in `SectionViewer3D.tsx`.
- `npm run build`: statically prerenders the calculator.
- `npm run check:sitemap` and `git diff --check`.
- Browser checks: production hydration, slider/input synchronization, animation, mode changes, unit changes, invalid-result suppression, 390px mobile overflow and quote-message prefill. No inquiry submitted.

Production deployment has not been performed. Follow the repository's PR → Preview → main → Production workflow when publishing.

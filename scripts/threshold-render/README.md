# Door threshold render source

Run `node scripts/threshold-render/serve.mjs` from the repository root, then open
`http://localhost:3026/?section=outward-hook` in a WebGL-capable browser.
The other section IDs are `inward-closed`, `inward-hook`, and `outward-closed`.
Use the same 1440 × 1098 content viewport for all four exports.

`geometry.mjs` defines one 2D outline with two holes per profile. It extrudes every
edge through 180 mm, without bevels, taper, end fittings or intermediate solids.
The 120 mm overall width, 55 mm overall height and 48.5 / 93 mm raised-deck widths
follow the user-supplied reference sketches. Unspecified wall thicknesses, small
reliefs and radii are illustrative and require an approved production drawing.

Revision: profiles 1, 2 and 4 now use independent outlines in
`reference-sections.mjs`, traced from the supplied raster sketch, including the
internal steps, hooked toe ridge and underside support lands. The shoulder
locations are calibrated to the indicated 48.5 / 93 mm widths. Raster tracing
does not establish manufacturing tolerances. Profile 3 and its accepted image
are retained. Outer and hole loops are explicitly oppositely wound so cavity
walls remain visible with normal front-face rendering.

`scene.mjs` uses a shared perspective camera, lighting and surface materials.
The renderer is an offline asset workbench; it adds no client-side Three.js to
the threshold product page. Export each canvas and encode to WebP at quality 90.
The published renders are 1440 × 1098, with their complete bounds preserved.

Run `node --test scripts/threshold-render/geometry.test.mjs` to check identical
front/back profiles, manifold walls, open chambers, the distinct hook/base and
cavity wall normals (front-face and double-sided ray distances must agree).

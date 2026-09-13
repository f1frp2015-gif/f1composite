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

`scene.mjs` uses a shared perspective camera, lighting and surface materials.
The renderer is an offline asset workbench; it adds no client-side Three.js to
the threshold product page. Export each canvas and encode to WebP at quality 90.
The published renders are 1440 × 1098, with their complete bounds preserved.

Run `node --test scripts/threshold-render/geometry.test.mjs` to check identical
front/back profiles, manifold walls, open chambers and the distinct hook/base.

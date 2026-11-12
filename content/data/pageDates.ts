/**
 * Content dates for routes that have no content record of their own: tools,
 * market pages and a few hubs. Each value is the date of the page's last
 * substantive content change, read from the commit history of the page and of
 * the tool component it renders; style refactors and shared-layout changes do
 * not count.
 *
 * One value feeds three places, so they cannot drift apart: the visible
 * "Last updated" line, the JSON-LD dateModified and the sitemap <lastmod>.
 * Change the date when the page content changes, never on a redeploy.
 */
export const pageDates = {
  "/products/fiberglass-structural-shapes": "2026-11-11",
  "/products/grating": "2026-11-11",

  "/tools": "2026-11-04",
  "/tools/access-geometry-checker": "2026-09-28",
  "/tools/frp-column-calculator": "2026-10-26",
  "/tools/frp-cut-list-optimizer": "2026-09-28",
  "/tools/frp-grating-selector": "2026-11-04",
  "/tools/frp-life-cycle-cost-calculator": "2026-10-26",
  "/tools/frp-unit-converter": "2026-11-06",
  "/tools/gfrp-rebar-calculator": "2026-10-25",
  "/tools/handrail-load-calculator": "2026-09-28",
  "/tools/profile-finder": "2026-10-11",
  "/tools/thermal-expansion-calculator": "2026-09-26",

  "/regions": "2026-10-26",
  "/regions/frp-cable-tray-uae-oil-gas": "2026-10-11",
  "/regions/frp-grating-supplier-saudi-arabia": "2026-11-04",
  "/regions/frp-passive-house-windows-canada": "2026-10-26",
  "/regions/frp-passive-house-windows-germany": "2026-10-26",
  "/regions/frp-pultrusion-supplier-usa": "2026-10-26",
  "/regions/frp-supplier-australia": "2026-10-25",
  "/regions/frp-supplier-los-angeles-usa": "2026-10-23",
  "/regions/grp-windows-uk": "2026-10-26",
  "/regions/pultruded-frp-solar-mounting-australia": "2026-10-23",
} as const satisfies Record<string, `${number}-${number}-${number}`>;

export type DatedPath = keyof typeof pageDates;

/** The content date for a route, or undefined when the route is not listed here. */
export function pageDateFor(path: string): string | undefined {
  return (pageDates as Record<string, string>)[path];
}

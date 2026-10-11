import type { LccInput } from "./lifeCycleCost";
import { buildRfqHref } from "./rfq";

/** Preserve buyer assumptions in the URL fragment, not an HTTP query string. */
export function lifeCycleCostRfqHref(
  input: LccInput,
  steelBasis: { steelType: "galvanized" | "other"; corrosivity: string; coatingMicrons: number },
  summary: string,
) {
  return buildRfqHref({
    source: "life-cycle-cost-calculator",
    product: "FRP profiles, grating or handrail",
    productPath: "/products",
    message: summary + "\nApplication, quantities and site (please add): ____",
    context: {
      version: "life-cycle-cost-assumptions-v1",
      status: "user-assumptions-unverified",
      input,
      steelBasis: steelBasis.steelType === "galvanized" ? steelBasis : { steelType: "other" },
      costBasis: "One common currency or illustrative index; quote scope and date require confirmation.",
      exclusions: "No structural-equivalence approval; disposal, taxes, financing and carbon are not separately modeled.",
    },
  });
}

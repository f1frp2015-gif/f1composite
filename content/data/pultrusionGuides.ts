import { processGuides } from "./pultrusionProcessGuides";
import { electricalGuides } from "./pultrusionElectricalGuides";
import { advancedGuides } from "./pultrusionAdvancedGuides";
import { gridGuides } from "./pultrusionGridGuides";
import { precisionGuides } from "./pultrusionPrecisionGuides";
import { separationGuides } from "./pultrusionSeparationGuides";
import type { PultrusionGuide } from "./pultrusionGuideTypes";
import { pultrusionGuideArtwork } from "./pultrusionGuideArtwork";

export const pultrusionGuides: PultrusionGuide[] = [
  ...processGuides,
  ...electricalGuides,
  ...advancedGuides,
  ...gridGuides,
  ...precisionGuides,
  ...separationGuides,
].map((page) => ({ ...page, ...pultrusionGuideArtwork[page.slug] }));

export const specialistApplications = pultrusionGuides.filter((page) => page.kind === "application");
export const specialistProducts = pultrusionGuides.filter((page) => page.kind === "product");

export function getPultrusionGuide(kind: PultrusionGuide["kind"], slug: string) {
  return pultrusionGuides.find((page) => page.kind === kind && page.slug === slug);
}

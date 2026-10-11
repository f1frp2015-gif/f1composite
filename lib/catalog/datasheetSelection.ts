import { configurationFor, type PublishedCatalog, type PublishedProfile } from "./published";
import type { FormulationRow } from "./db";
import type { CatalogConfiguration } from "./identity";

export class CatalogSelectionError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}

const tokens = (value: string | null) => [...new Set((value ?? "").split(",").map((item) => item.trim()).filter(Boolean))];

export function selectDatasheetConfigurations(catalog: PublishedCatalog, params: URLSearchParams): {
  profile: PublishedProfile; formulation: FormulationRow | null; configuration: CatalogConfiguration;
}[] {
  if (params.has("revision") && params.get("revision") !== catalog.revision) {
    throw new CatalogSelectionError("The published catalog changed. Reload the selection page before generating this PDF.", 409);
  }
  const keys = tokens(params.get("profiles"));
  const legacyIds = tokens(params.get("ids"));
  if (keys.length && legacyIds.length) throw new CatalogSelectionError("Use profiles or ids, not both.");
  if (!keys.length && !legacyIds.length) throw new CatalogSelectionError("Select at least one published profile.");
  const profiles = keys.length
    ? keys.map((key) => catalog.profiles.find((profile) => profile.catalogKey === key))
    : legacyIds.map((id) => /^\d+$/.test(id) ? catalog.profiles.find((profile) => profile.source === "database" && profile.product.id === Number(id)) : undefined);
  if (profiles.some((profile) => !profile)) throw new CatalogSelectionError("One or more profiles are unknown or no longer published. Reload the catalog.", 404);
  const materialCodes = tokens(params.get("materials"));
  const legacyMaterials = tokens(params.get("f"));
  if (materialCodes.length && legacyMaterials.length) throw new CatalogSelectionError("Use materials or f, not both.");
  const explicitlySelected = params.has("materials") || params.has("f");
  const materials = materialCodes.length
    ? materialCodes.map((code) => catalog.formulations.find((formulation) => formulation.code === code))
    : legacyMaterials.map((id) => /^\d+$/.test(id) ? catalog.formulations.find((formulation) => formulation.id > 0 && formulation.id === Number(id)) : undefined);
  if (explicitlySelected && (!materials.length || materials.some((material) => !material))) {
    throw new CatalogSelectionError("A selected formulation is unknown. No default has been substituted.", 404);
  }
  if (profiles.length * Math.max(1, materials.length) > 120) throw new CatalogSelectionError("The selection exceeds the 120-page limit. Narrow the selection.");
  return profiles.flatMap((item) => {
    const profile = item!;
    return (explicitlySelected ? materials : [profile.formulation]).map((formulation) => {
      const configuration = configurationFor(profile, formulation ?? null, catalog.revision);
      if (formulation?.code !== profile.formulation?.code && configuration.evidence.status !== "direct-match" && params.get("reference") !== "1") {
        throw new CatalogSelectionError("This section and formulation has no directly matched public report. Select reference comparison mode or request engineering review.", 422);
      }
      return { profile, formulation: formulation ?? null, configuration };
    });
  });
}

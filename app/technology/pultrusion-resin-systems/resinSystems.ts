/** Purchasing questions by resin family; these are not formulation ratings. */
export const resinSystems = [
  {
    key: "polyester", name: "Isophthalic polyester", shortName: "Polyester",
    use: "A starting option for general structural profiles where the proposed formulation meets the exposure and mechanical requirements.",
    chemical: "Check the named formulation against every chemical, concentration and operating temperature; atmospheric service is not a chemical rating.",
    thermal: "Request its TDS and retained laminate properties at the service temperature.",
    fire: "Fire-retardant formulations require their own specimen and test evidence.",
    release: "Confirm reinforcement, surface finish, grade and inspection records in the quotation.",
    href: "/products/fiberglass-structural-shapes", label: "Standard structural profiles",
  },
  {
    key: "vinylester", name: "Vinyl ester", shortName: "Vinyl ester",
    use: "A candidate for chemical exposure, immersion and marine projects when a specific formulation has compatible service evidence.",
    chemical: "Use the supplier's formulation-specific chemical guide, including concentration, temperature, exposure and all footnotes. Family membership is insufficient.",
    thermal: "Check the combined chemical and temperature limit, then retained structural properties under load.",
    fire: "A corrosion grade and a fire-retardant grade may be different formulations.",
    release: "Confirm the corrosion barrier, reinforcement and cut-edge treatment for the offered section.",
    href: "/applications/frp-chemical-plant-platforms", label: "Chemical-plant platform scope",
  },
  {
    key: "polyurethane", name: "Polyurethane (PU)", shortName: "Polyurethane",
    use: "A candidate for thin-wall lineals and components where transverse, impact or fastener performance matters.",
    chemical: "Evaluate moisture, cleaning agents and outdoor exposure for the offered formulation and finish.",
    thermal: "Use the proposed laminate's temperature data; a resin-family name does not set a working limit.",
    fire: "Request evidence for the actual formulation, thickness and assembly required by the project.",
    release: "Verify wall thickness, fiber architecture and fastener or connection results before reducing a section.",
    href: "/technology/polyurethane-pultrusion-windows", label: "PU window-profile process",
  },
  {
    key: "epoxy", name: "Epoxy", shortName: "Epoxy",
    use: "A candidate for fatigue, dimensional stability or specialized reinforcement designs with a defined qualification program.",
    chemical: "Chemical compatibility depends on the exact epoxy and curing system, not the family label.",
    thermal: "Specify cure condition and test method with Tg; Tg is not a continuous-service temperature rating.",
    fire: "Require the applicable fire test for the formulation and product configuration.",
    release: "Confirm process feasibility, testing, production quantity and availability for the proposed part.",
    href: "/products/custom-pultruded-profiles", label: "Custom profile review",
  },
  {
    key: "phenolic", name: "Phenolic", shortName: "Phenolic",
    use: "A candidate when a project sets demanding flame, smoke or toxicity criteria and the proposed product has the required evidence.",
    chemical: "Review the actual chemicals and moisture conditions alongside mechanical and surface requirements.",
    thermal: "Establish the working range from formulation and laminate evidence under the intended loading.",
    fire: "A resin choice alone does not establish EN 45545-2 or another system classification.",
    release: "Confirm processing, finish, geometry and the qualification scope before quoting series supply.",
    href: "/products/fire-retardant-rail-profiles", label: "Rail qualification requirements",
  },
] as const;

export const resinSelectionSources = [
  { label: "INEOS Derakane resin selection guide", href: "https://www.ineos.com/globalassets/ineos-group/businesses/ineos-composites/markets/corrosion/derakane-resin-selection-guide.pdf", scope: "How a named resin supplier organizes chemical, concentration and temperature data. Its ratings are not F1 product approvals." },
  { label: "Strongwell custom-pultrusion guidance", href: "https://www.strongwell.com/faqs/custom-pultrusions/", scope: "Industry explanation of UV protection through resin, additives, veils, color and coatings. No Strongwell qualification transfers to F1." },
] as const;

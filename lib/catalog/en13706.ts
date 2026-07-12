// EN 13706 grade minimums + the published E23-ISO laminate values — the ONE
// place these numbers live. Consumed by lib/catalog/seed.ts (DB seeding, so
// every /datasheets/[slug] page renders them) AND by /resources/technical-data
// (the material-level page), so the two surfaces can never disagree.
//
// Provenance, and it must not be blurred:
//  - E23_MIN / E17_MIN are the minimum requirements of EN 13706-3:2002
//    Table 1 — standard values, legitimate to publish as guaranteed minimums
//    for any laminate declared to that grade.
//  - E23_ISO_PUBLISHED overlays the F1-published general-purpose laminate
//    (FRP Profile Design Manual DOC-PF-2026-EN Rev. A): ILSS 30 published
//    above the EN minimum of 25; compressive / Barcol / water absorption are
//    typical industry values pending F1 certified test data (EN 13706 does
//    not specify them).

export const E23_MIN = {
  e_l_gpa: 23, e_t_gpa: 7,
  tensile_l_mpa: 240, tensile_t_mpa: 50,
  flexural_l_mpa: 240, flexural_t_mpa: 100,
  shear_mpa: 25, pin_bearing_l_mpa: 150, pin_bearing_t_mpa: 70,
};

export const E17_MIN = {
  e_l_gpa: 17, e_t_gpa: 5,
  tensile_l_mpa: 170, tensile_t_mpa: 30,
  flexural_l_mpa: 170, flexural_t_mpa: 70,
  shear_mpa: 15, pin_bearing_l_mpa: 90, pin_bearing_t_mpa: 50,
};

/** The general-purpose laminate as published on every product datasheet. */
export const E23_ISO_PUBLISHED = {
  ...E23_MIN,
  shear_mpa: 30, // published above the EN minimum of 25
  compressive_l_mpa: 240,
  barcol: 45,
  water_abs_pct: 0.6,
  density_g_cm3: 1.9,
  glass_content: "65–70% by weight",
  resin: "Isophthalic unsaturated polyester",
};

export const TYP_NOTE =
  "Compressive strength, Barcol hardness and water absorption are not specified by EN 13706 — the figures shown are typical industry values for this resin system, pending F1 certified test data; request certified values before final design.";

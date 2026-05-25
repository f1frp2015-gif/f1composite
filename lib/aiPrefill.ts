/**
 * Builders for context-rich /ask?prefill= deep-link prompts.
 *
 * Each helper returns a single line the user sees as their first message in
 * the FRP Engineering Advisor — concrete enough for the AI to answer without
 * follow-up questions. Keep prefills short (~180 chars) and end with a
 * question that opens dialogue (project type, span, environment, etc.).
 *
 * Companion library: `06-AI-Advisor-Prefill-Library.md` in the page-conversion
 * fix pack.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Generic helpers (kept for backwards compatibility with existing call sites)
// ─────────────────────────────────────────────────────────────────────────────

export function prefillForBlog(post: { title: string; slug: string; category?: string }) {
  return `I just read the F1 Composite article "${post.title}" (/resources/blog/${post.slug}). Based on what's in this article, give me the practical engineering takeaways and tell me which F1 Composite products or applications it points to.`;
}

export function prefillForCaseStudy(cs: { title: string; slug: string; industry?: string; location?: string }) {
  const where = cs.location ? ` in ${cs.location}` : "";
  return `I'm looking at the F1 Composite case study "${cs.title}"${where} (/case-studies/${cs.slug}). What materials, profile families, resin systems, and standards drove this project — and what would I need to provide for a similar RFQ?`;
}

export function prefillForApplication(slug: string, shortTitle: string) {
  return `I am evaluating ${shortTitle} (/applications/${slug}). Recommend the profile family, resin system, applicable standards, and the inputs F1 Composite needs to quote my project.`;
}

export function prefillForProduct(opts: { name: string; path: string; question?: string }) {
  const q =
    opts.question ??
    `walk me through typical sizes, key mechanical properties, common applications, and what to include in an RFQ`;
  return `I'm on the F1 Composite ${opts.name} page (${opts.path}). Please ${q}.`;
}

export function prefillForHub() {
  return `I'm browsing the F1 Composite pultruded FRP profiles hub. Help me decide between standard structural profiles, custom pultrusions, fenestration, and gratings based on my project — ask me what I'm building if you need more.`;
}

export function prefillForCalculator(opts: { name: string; path: string }) {
  return `I'm using the ${opts.name} on F1 Composite (${opts.path}). Walk me through how to choose realistic inputs and how to interpret the result for an FRP project.`;
}

export function prefillForWhatIsFRP() {
  return `I just read the "What is FRP" guide on F1 Composite. Summarise the practical decision points an engineer needs when choosing FRP over steel or aluminum, and link me to the right F1 Composite product family.`;
}

// ─────────────────────────────────────────────────────────────────────────────
// /what-is-frp section-anchored prefills (W1–W9 fix pack)
// Each prefill names the section the user just finished reading so the AI can
// keep the answer narrow and pivot the user to the next-best F1 surface.
// ─────────────────────────────────────────────────────────────────────────────

export type WhatIsFrpSection =
  | "definition"
  | "terminology"
  | "components"
  | "pultrusion"
  | "properties"
  | "advantages"
  | "limitations"
  | "standards"
  | "applications";

export function prefillForWhatIsFrpSection(section: WhatIsFrpSection): string {
  switch (section) {
    case "definition":
      return `I just read the "What is FRP" definition on F1 Composite. Tell me in 3 bullets when an engineer should switch from steel to FRP, and what one project parameter (span, load, environment) most often decides it.`;
    case "terminology":
      return `I just read the FRP / GRP / fiberglass terminology section on F1 Composite. Which term should I use in (a) a US EPC spec, (b) an EU tender, (c) an Australian project? Give me one line each.`;
    case "components":
      return `I just read the composition section on F1 Composite. Given a project in [tell me the environment], recommend the reinforcement architecture and the polymer matrix, and explain why.`;
    case "pultrusion":
      return `I just read how pultruded FRP is made on F1 Composite. If my project might need a custom die, what cross-section parameters and order quantity should I confirm before requesting a quote?`;
    case "properties":
      return `I just read the pultruded FRP mechanical properties on F1 Composite. Compare these numbers to A36 steel and 6061-T6 aluminum for [tell me the structural role I'm sizing], and tell me which property usually governs my design.`;
    case "advantages":
      return `I just read the FRP advantages section on F1 Composite. For my project — [tell me the application, environment, and design life] — quantify the realistic savings vs steel over 30 years.`;
    case "limitations":
      // Highest-intent prefill on the page: user is having second thoughts.
      // Lean into the doubt and convert it into a project conversation.
      return `I just read the FRP limitations section on F1 Composite and I'm wondering whether FRP is right for my project. The application is [briefly describe]. Tell me honestly when FRP is NOT the right pick, and what hybrid or alternative material would be.`;
    case "standards":
      return `I just read the FRP standards & certification section on F1 Composite. For a project under [EN / ASTM / GB / AS regime], list the must-have certificates from a supplier and one red-flag question to ask in the RFQ.`;
    case "applications":
      return `I just read the FRP applications section on F1 Composite. My project is closest to [tell me the use case]. Recommend the F1 product family, resin system, and one case study to read.`;
    default:
      return prefillForWhatIsFRP();
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// /what-is-frp FAQ-anchored prefills
// ─────────────────────────────────────────────────────────────────────────────

export function prefillForWhatIsFrpFaq(question: string): string {
  return `I just read the FAQ answer to "${question}" on F1 Composite's What-is-FRP page. Give me the engineering decision rule that follows from this answer, and link me to the relevant F1 product page if there is one.`;
}

// ─────────────────────────────────────────────────────────────────────────────
// /pultruded-frp-profiles hub prefills (P1–P10 fix pack)
// ─────────────────────────────────────────────────────────────────────────────

export type ProfileFamilySlug =
  | "i-beam"
  | "channel"
  | "angle"
  | "square-tube"
  | "tube"
  | "flat-bar"
  | "fenestration"
  | "custom"
  | "gratings";

export function prefillForProfileFamily(slug: ProfileFamilySlug, name: string): string {
  const tail = `Recommend a typical size from F1's range, the right resin for my environment, and what I should include in an RFQ.`;
  switch (slug) {
    case "i-beam":
      return `I'm sizing pultruded FRP I-beams for a walkway or short-span bridge. Span and load roughly [fill in]. ${tail}`;
    case "channel":
      return `I'm specifying pultruded FRP channels for a cable tray or stair stringer. Span and load roughly [fill in]. ${tail}`;
    case "angle":
      return `I need pultruded FRP angles for stiffeners / bracing / frame connections in a [environment]. ${tail}`;
    case "square-tube":
      return `I'm sizing pultruded FRP square or rectangular tubes for columns / a free-standing frame / guardrails. Loads and span roughly [fill in]. ${tail}`;
    case "tube":
      return `I need pultruded FRP round tubes for handrails / a mast / an insulating stand-off. Diameter and span roughly [fill in]. ${tail}`;
    case "flat-bar":
      return `I'm sourcing pultruded FRP flat bar for stiffeners / splice plates / wear strips. Cross-section roughly [fill in]. ${tail}`;
    case "fenestration":
      return `I'm specifying ${name} for a passive-house or low-energy building. Target U-value [fill in], climate zone [fill in]. Recommend the F1 series and the data I need for a quote.`;
    case "custom":
      return `I need a custom pultruded profile. Approximate cross-section [fill in], annual quantity [fill in], target market [fill in]. Walk me through the tooling lead time, MOQ, and the spec inputs F1 needs.`;
    case "gratings":
      return `I'm specifying FRP gratings / deck panels for a chemical plant / offshore platform / pedestrian bridge. Span and load roughly [fill in]. ${tail}`;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Application-card prefills (hub Applications grid)
// ─────────────────────────────────────────────────────────────────────────────

export type HubApplicationSlug =
  | "frp-cable-tray-supports"
  | "frp-cooling-tower-profiles"
  | "frp-bridge-deck-panels"
  | "frp-solar-mounting-profiles"
  | "frp-chemical-plant-platforms";

export function prefillForHubApplication(slug: HubApplicationSlug): string {
  switch (slug) {
    case "frp-cable-tray-supports":
      return `I'm specifying FRP cable tray supports for a substation / tunnel / corrosive cable route. Tray span, max load, and environment roughly [fill in]. Recommend the F1 profile and resin, plus the RFQ inputs.`;
    case "frp-cooling-tower-profiles":
      return `I'm specifying FRP profiles for a cooling tower (wet / chlorinated environment). Function: [beams / louvers / access]. Recommend the resin and profile family from F1's range.`;
    case "frp-bridge-deck-panels":
      return `I'm scoping an FRP bridge deck (pedestrian or vehicular). Span [fill in], live load [fill in], jurisdiction [fill in]. Tell me what F1 panel family fits and what to include in a quote.`;
    case "frp-solar-mounting-profiles":
      return `I'm scoping FRP solar mounting for a [utility / agri-PV / coastal] project. Module size and load roughly [fill in]. Recommend the F1 profile mix and what F1 needs to quote.`;
    case "frp-chemical-plant-platforms":
      return `I'm scoping an FRP chemical-plant access platform (acid / caustic / chlorinated splash). Span and live load roughly [fill in]. Tell me what F1 profiles, resin, and standards fit.`;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Resin-row prefills (hub Resin systems table)
// ─────────────────────────────────────────────────────────────────────────────

export type ResinSlug =
  | "isophthalic-polyester"
  | "vinyl-ester"
  | "polyurethane"
  | "phenolic"
  | "epoxy";

export function prefillForResin(slug: ResinSlug): string {
  switch (slug) {
    case "isophthalic-polyester":
      return `I'm considering isophthalic polyester resin for my pultruded FRP profile. Walk me through when it is the right default and when I should step up to vinyl ester or polyurethane.`;
    case "vinyl-ester":
      return `My project has chlorides / marine / chemical exposure. Confirm whether vinyl ester is the right F1 resin pick, and what to verify in the data sheet before specifying.`;
    case "polyurethane":
      return `I need a tough, fast-cure pultruded FRP for [rail interior / EV battery tray / impact-prone part]. Tell me when polyurethane resin beats polyester and what F1 needs to quote it.`;
    case "phenolic":
      return `My project is fire-critical (BS 476 / EN 45545-2 / building code [tell me]). Confirm whether phenolic-resin pultruded FRP from F1 is the right call, and what test reports I should ask for.`;
    case "epoxy":
      return `I need high-performance epoxy-matrix pultruded FRP — fatigue / tensile / aerospace-style use. Tell me when this is justified vs polyester and what F1 can manufacture.`;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Material-comparison and Strongwell/Fiberline competitive prefills
// ─────────────────────────────────────────────────────────────────────────────

export function prefillForMaterialCompare(): string {
  return `I just read the FRP vs steel vs aluminum table on F1 Composite. For my project — [application + design life + environment] — tell me which material wins on 30-year lifecycle cost and why.`;
}

export function prefillForVsCompetitor(competitor: "strongwell" | "fiberline" | "creative"): string {
  const map = {
    strongwell:
      "I currently use Strongwell EXTREN or DURADEK. Compare F1's equivalents on size range, EN 13706 / ASTM compliance, lead time, and landed cost to my port.",
    fiberline:
      "I currently use Fiberline Composites. Compare F1's equivalents on EN 13706 grade, fenestration series, and lead time to Europe.",
    creative:
      "I currently use Creative Pultrusions SuperStrut or SafPlank. Compare F1's equivalents on size, ASTM compliance, MOQ, and shipping to North America.",
  };
  return `${map[competitor]} Be honest about what F1 cannot match.`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Lead-magnet hand-off prefills
// ─────────────────────────────────────────────────────────────────────────────

export type LeadMagnetId =
  | "pocket-spec-card"
  | "frp-vs-steel-lcc"
  | "en13706-d-sample-report"
  | "profile-selector-flowchart";

export function prefillAfterLeadMagnet(id: LeadMagnetId): string {
  switch (id) {
    case "pocket-spec-card":
      return `I just downloaded the F1 Composite FRP Pocket Spec Card. Help me cross-check which profile family fits my project — [briefly describe]. Use the data on the card and ask me for anything missing.`;
    case "frp-vs-steel-lcc":
      return `I just downloaded the F1 Composite FRP vs Steel 30-year LCC sheet. Help me fill in realistic inputs for my project [briefly describe] and interpret the NPV result.`;
    case "en13706-d-sample-report":
      return `I just downloaded the F1 Composite EN 13706 D sample test report. Tell me which numbers an engineer should focus on before specifying, and what additional certificates I should ask F1 for.`;
    case "profile-selector-flowchart":
      return `I just downloaded the F1 Composite profile selector flowchart. Walk me through it for my project [briefly describe], and route me to the exact F1 product page at the end.`;
  }
}

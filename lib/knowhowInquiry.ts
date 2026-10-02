import { buildRfqHref } from "@/lib/rfq";

export const knowHowGoals = [
  { id: "new-line", label: "Start a new production line" },
  { id: "new-profile", label: "Develop a new profile" },
  { id: "upgrade", label: "Improve an existing process" },
  { id: "localize", label: "Localize production or materials" },
] as const;

export const knowHowModules = [
  { id: "materials", label: "Raw materials & formulation", href: "/sourcing/materials#resins-additives", detail: "Resin, reinforcement, additives and an approved material list." },
  { id: "tooling", label: "Dies, mandrels & fixtures", href: "/sourcing/pultrusion-dies#profile-families", detail: "Section tooling, alignment, pulling and inspection fixtures." },
  { id: "preforming", label: "Creels, guides & preforming", href: "/sourcing/pultrusion-dies#preforming", detail: "Fiber routing, mat/veil forming and die-entry interfaces." },
  { id: "line", label: "Pultrusion & specialty lines", href: "/sourcing/pultrusion-machines#line-configurations", detail: "Hydraulic, caterpillar, rebar, rock-bolt and mesh configurations." },
  { id: "injection", label: "Mixing, metering & injection", href: "/sourcing/resin-mixing-injection#injection-package", detail: "Resin conditioning, dosing and the injection-box connection." },
  { id: "finishing", label: "Cutting, take-up & fabrication", href: "/sourcing/slitting-cutting-equipment#take-up", detail: "Slitting, cut-off, coiling where qualified, drilling and packing." },
  { id: "qualification", label: "Trials, testing & acceptance", href: "/technology/knowhow-services#acceptance", detail: "Trial planning, factory/site acceptance and product qualification." },
  { id: "training", label: "Training, spares & aftercare", href: "/technology/knowhow-services#handover", detail: "Documents, operator handover, maintenance and change control." },
] as const;

export interface KnowHowBrief {
  goal: string;
  moduleIds: readonly string[];
  product: string;
  situation: string;
  destination: string;
}

const clean = (value: string, limit: number) => value.trim().slice(0, limit);

export function buildKnowHowMessage(brief: KnowHowBrief): string {
  const goal = knowHowGoals.find(item => item.id === brief.goal)?.label ?? "Confirm the project scope";
  const modules = knowHowModules.filter(item => brief.moduleIds.includes(item.id));
  return [
    "Know-How & Services project brief",
    `Objective: ${goal}`,
    `Support modules: ${modules.length ? modules.map(item => item.label).join("; ") : "Please help define the scope"}`,
    `Product / output target: ${clean(brief.product, 160) || "To discuss"}`,
    `Existing equipment / issue: ${clean(brief.situation, 320) || "To discuss"}`,
    `Factory location / destination: ${clean(brief.destination, 100) || "To discuss"}`,
    "Please propose the scope, required drawings/material data, supplier interfaces, trial and acceptance plan, training, deliverables and support responsibilities.",
  ].join("\n");
}

export function buildKnowHowRfqHref(brief: KnowHowBrief): string {
  return buildRfqHref({ source: "knowhow-project-brief", product: "Know-How & Services", productPath: "/technology/knowhow-services", message: buildKnowHowMessage(brief) });
}

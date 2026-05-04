/**
 * Builders for context-rich /ask?prefill= deep-link prompts.
 * Each helper returns a single line the user sees as their first
 * message in the FRP Engineering Advisor — concrete enough for the
 * AI to answer without follow-up questions.
 */

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
  return `I just read the "What is FRP" guide on F1 Composite. Summarise the practical decision points an engineer needs when choosing FRP over steel or aluminium, and link me to the right F1 Composite product family.`;
}

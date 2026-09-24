// Real, verifiable customer reviews ONLY.
//
// Do NOT fabricate reviews. Emitting AggregateRating / Review schema without
// genuine reviews violates Google's structured-data policy and can trigger a
// manual action (and it is dishonest). This array is intentionally empty: until
// real reviews are pasted here, buildAggregateRating() (lib/seo.ts) returns null.
// Nothing calls it yet, so no rating schema is emitted anywhere.
//
// To enable SERP star eligibility:
//   1. Collect 5-10 real reviews (buyer emails/testimonials, verified orders).
//   2. Add each below with the buyer's real name/company, rating, verbatim text.
//   3. Spread buildAggregateRating() into the Product node of the product page
//      the reviews are about. Do not add it to the Organization schema: Google
//      does not show self-serving review stars for Organization markup.

export interface CustomerReview {
  /** Reviewer name or company — real and attributable. */
  author: string;
  /** 1-5. */
  rating: number;
  /** The review text, verbatim. */
  body: string;
  /** ISO date, YYYY-MM-DD. */
  datePublished: string;
  /** Optional: which product line / page this review is about. */
  itemReviewed?: string;
}

export const customerReviews: CustomerReview[] = [
  // Example shape (commented out — replace with REAL reviews):
  // {
  //   author: "Acme Engineering GmbH",
  //   rating: 5,
  //   body: "Delivered EN 13706 pultruded profiles DDP Hamburg in 4 weeks, exactly to spec.",
  //   datePublished: "2026-05-20",
  //   itemReviewed: "F1-STRUX standard profiles",
  // },
];

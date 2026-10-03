import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PultrusionGuidePage from "@/components/sections/PultrusionGuidePage";
import { getPultrusionGuide, specialistProducts } from "@/content/data/pultrusionGuides";
import { pultrusionGuidePath } from "@/content/data/pultrusionGuideTypes";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return specialistProducts.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPultrusionGuide("product", slug);
  if (!page) notFound();
  return buildPageMetadata({ title: page.title, description: page.description, path: pultrusionGuidePath(page), image: `${pultrusionGuidePath(page)}/opengraph-image` });
}

export default async function SpecialistProductPage({ params }: Props) {
  const { slug } = await params;
  const page = getPultrusionGuide("product", slug);
  if (!page) notFound();
  return <PultrusionGuidePage page={page} />;
}

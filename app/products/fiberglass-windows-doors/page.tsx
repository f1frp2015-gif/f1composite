import type { Metadata } from "next";
import FinishedWindowPage from "@/components/sections/FinishedWindowPage";
import { windowProcurement } from "@/content/data/windowProcurement";
import { buildPageMetadata } from "@/lib/seo";

const page = windowProcurement.finished;
export const metadata: Metadata = buildPageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
  image: page.image,
  imageSize: { width: 1200, height: 522 },
});
export default function Page() {
  return <FinishedWindowPage />;
}

import type { Metadata } from "next";
import WindowProcurementPage from "@/components/sections/WindowProcurementPage";
import { windowProcurement } from "@/content/data/windowProcurement";
import { buildPageMetadata } from "@/lib/seo";

const page = windowProcurement.finished;
export const metadata: Metadata = buildPageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
  image: page.image,
});
export default function Page() {
  return <WindowProcurementPage mode="finished" />;
}

import type { Metadata } from "next";
import Link from "next/link";
import WindowProcurementPage from "@/components/sections/WindowProcurementPage";
import { windowProcurement } from "@/content/data/windowProcurement";
import { buildPageMetadata } from "@/lib/seo";

const page = windowProcurement.profiles;
export const metadata: Metadata = buildPageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
  image: page.image,
});
export default function Page() {
  return <>
    <WindowProcurementPage mode="profiles" />
    <section className="bg-bg2 py-10">
      <div className="site-container"><div className="rounded-card border border-border-default bg-white p-7">
        <h2 className="text-f24 font-bold text-t1">Developing a dedicated door frame?</h2>
        <p className="mt-3 text-f16 leading-relaxed text-t2">Review custom pultruded jamb and head profiles with matching rebates, seal interfaces and hardware preparation.</p>
        <Link href="/products/frp-door-frames" className="mt-4 inline-block text-f14 font-bold text-teal-text underline-offset-4 hover:underline">Explore FRP door frame profiles →</Link>
      </div></div>
    </section>
  </>;
}

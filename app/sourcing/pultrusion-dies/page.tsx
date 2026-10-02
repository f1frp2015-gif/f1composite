import SourcingDetail from "@/components/sourcing/SourcingDetail";
import { sourcingPages } from "@/content/data/sourcingPages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Pultrusion Dies, Preformers & Fixtures | Know-How",
  description: "Specify pultrusion dies, mandrels, preformers and production fixtures. Review profile families, tooling interfaces, inspection and handover.",
  path: "/sourcing/pultrusion-dies",
  image: "/images/sourcing/frpzs/channel-pultrusion-die-face.jpg",
  imageSize: { width: 450, height: 450 },
});

export default function Page() {
  return <SourcingDetail page={sourcingPages.find(page => page.slug === "pultrusion-dies")!} />;
}

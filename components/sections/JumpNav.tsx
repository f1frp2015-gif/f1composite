import PageNav from "@/components/layout/PageNav";

/**
 * In-page anchor navigation under the page header. It is the shared section
 * bar (PageNav): it sticks under the site header and marks the section being
 * read. Kept for pages that list their anchors as "#id" links.
 */
export default function JumpNav({ items }: { items: Array<{ href: string; label: string }> }) {
  return <PageNav items={items.map((item) => ({ id: item.href.replace(/^#/, ""), label: item.label }))} />;
}

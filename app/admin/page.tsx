import type { Metadata } from "next";
import AdminApp from "./AdminApp";

// Back office — never indexed, never in the sitemap, no SEO metadata pipeline.
export const metadata: Metadata = {
  title: "Catalog Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminApp />;
}

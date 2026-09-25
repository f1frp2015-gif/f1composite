import type { Metadata } from "next";

// Database-backed datasheets are useful reference pages for customers, but
// their shared template and repeated formulation data make them poor search
// landing pages. Keep links usable and crawlable while excluding the route
// segment from search indexes. The indexing-pilot sizes in
// lib/datasheetContent.ts set their own robots in the page metadata, which
// replaces this one.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
};

export default function DatasheetsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

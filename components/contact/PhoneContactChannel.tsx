"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { australiaContact } from "@/content/data/australia";

/** The Australian contact uses the website inquiry channel. */
export default function PhoneContactChannel({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return pathname === australiaContact.path ? null : children;
}

"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { australiaContact } from "@/content/data/australia";
import { losAngelesContact } from "@/content/data/losAngeles";

/** These regional contacts use the website inquiry channel. */
export default function PhoneContactChannel({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return pathname === australiaContact.path || pathname === losAngelesContact.path ? null : children;
}

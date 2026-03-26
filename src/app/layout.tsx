import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getSiteUrl } from "@/site";
import "./globals.css";

/** Resolves relative OG/Twitter image URLs during build; overridden by `[locale]` metadata where relevant. */
export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return children;
}

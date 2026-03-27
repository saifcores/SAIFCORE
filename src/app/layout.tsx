import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getSiteUrl } from "@/site";
import "./globals.css";

const siteUrl = getSiteUrl();

/** Resolves relative OG/Twitter image URLs during build; overridden by `[locale]` metadata where relevant. */
/** Favicon + Apple touch: `app/icon.png` and `app/apple-icon.png` (copies of `public/profile.png`). Run `npm run sync:icons` after updating the profile photo. */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return children;
}

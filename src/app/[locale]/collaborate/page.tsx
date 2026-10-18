import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function CollaboratePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  permanentRedirect(getPathname({ href: "/", locale: locale as Locale }));
}

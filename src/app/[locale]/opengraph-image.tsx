import {
  createOgImageResponse,
  getOgAlt,
  OG_SIZE,
  type OgLocale,
} from "@/app/og-shared";
import { routing } from "@/i18n/routing";

export const runtime = "edge";

export const size = OG_SIZE;
export const contentType = "image/png";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const loc = (
    routing.locales.includes(locale as OgLocale) ? locale : "en"
  ) as OgLocale;
  return { alt: getOgAlt(loc) };
}

export default async function OpenGraphImage({ params }: Props) {
  const { locale } = await params;
  const loc = (
    routing.locales.includes(locale as OgLocale) ? locale : "en"
  ) as OgLocale;
  return createOgImageResponse(loc);
}

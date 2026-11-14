import type { ReactNode } from "react";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import type { SitePath } from "@/seo";
import { HomeTracks, type HomeTrackId, type HomeTrackItem } from "./HomeTracks";

const TRACK_IDS: readonly HomeTrackId[] = ["recruiter", "depth", "client"];

type Props = {
  recruiter: ReactNode;
  depth: ReactNode;
  client: ReactNode;
};

export async function AudiencePaths({ recruiter, depth, client }: Props) {
  const t = await getTranslations("audiencePaths");
  const messages = await getMessages();
  const locale = await getLocale();
  const items: HomeTrackItem[] = messages.audiencePaths.items.map(
    (item, index) => ({
      id: TRACK_IDS[index] ?? "depth",
      who: item.who,
      title: item.title,
      path: item.path,
      cta: item.cta,
      href: item.href as SitePath,
    }),
  );
  const clientContactHref = `${getPathname({
    href: "/contact",
    locale: locale === "fr" ? "fr" : "en",
  })}?intent=freelance`;

  return (
    <HomeTracks
      kicker={t("title")}
      subtitle={t("subtitle")}
      previewNote={t("previewNote")}
      showAllLabel={t("showAll")}
      items={items}
      panels={{ recruiter, depth, client }}
      clientContactHref={clientContactHref}
    />
  );
}

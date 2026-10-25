import type { ReactNode } from "react";
import { getMessages, getTranslations } from "next-intl/server";
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

  return (
    <HomeTracks
      kicker={t("title")}
      subtitle={t("subtitle")}
      previewNote={t("previewNote")}
      showAllLabel={t("showAll")}
      items={items}
      panels={{ recruiter, depth, client }}
    />
  );
}

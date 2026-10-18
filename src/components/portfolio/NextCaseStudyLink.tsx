import { getMessages, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getNextDedicatedCaseStudy } from "@/data/case-studies";
import { projectCaseStudyId } from "@/seo";

type Props = {
  currentId: string;
  className?: string;
};

export async function NextCaseStudyLink({
  currentId,
  className = "btn-outline inline-flex min-h-12 w-full items-center justify-center px-6 text-sm font-medium min-[420px]:w-auto",
}: Props) {
  const next = getNextDedicatedCaseStudy(currentId);
  if (!next) return null;

  const t = await getTranslations("featuredProjects");
  const messages = await getMessages();
  const item = messages.featuredProjects.items.find(
    (project) => projectCaseStudyId(project) === next.id,
  );
  const title = item?.title ?? t("nextCase");

  return (
    <Link href={next.href} className={className}>
      {`${t("nextCase")}: ${title}`}
    </Link>
  );
}

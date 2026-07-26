import { getBlogUrl } from "@/site";

/** Cover image hosted on the SAIFCORE Blog (`/images/articles/{slug}.png`). */
export function getBlogArticleCover(slug: string): string | null {
  const blog = getBlogUrl();
  if (!blog) return null;
  return `${blog}/images/articles/${slug}.png`;
}

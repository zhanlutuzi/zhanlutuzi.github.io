import type { CollectionEntry } from "astro:content";

export function getPostPath(post: CollectionEntry<"blog">) {
  if (post.data.permalink) return post.data.permalink;

  const match = post.id.match(
    /^(\d{4})-(\d{2})-(\d{2})-(.+?)(?:\.md)?$/,
  );

  if (!match) return `/blog/${post.id.replace(/\.md$/, "")}/`;

  const [, year, month, day, slug] = match;
  return `/${year}/${month}/${day}/${slug}/`;
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

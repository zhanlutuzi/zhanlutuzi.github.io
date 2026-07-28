import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getPostPath } from "../lib/blog";

export async function GET(context: { site: URL }) {
  const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  return rss({
    title: "喻承龙的写作与笔记",
    description: "关于 AI、地理、软件、工具和学习过程的记录。",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.summary,
      link: getPostPath(post),
      categories: post.data.tags,
    })),
  });
}

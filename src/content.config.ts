import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string().optional(),
    permalink: z.string().optional(),
    categories: z.array(z.string()).optional().default([]),
    tags: z.array(z.string()).optional().default([]),
    summary: z.string().optional().default(""),
    image: z.string().optional(),
    comments: z.boolean().optional(),
    render_with_liquid: z.boolean().optional(),
  }),
});

export const collections = { blog };

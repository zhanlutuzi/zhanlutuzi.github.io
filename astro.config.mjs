import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://zhanlutuzi.github.io",
  output: "static",
  trailingSlash: "always",
  redirects: {
    "/about": "/#about",
    "/archives": "/blog/",
    "/categories": "/blog/",
    "/tags": "/blog/",
    "/friends": "/blog/",
    "/contact": "/#contact",
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },
});

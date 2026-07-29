---
layout: "post"
title: "用 Astro 和 GitHub Pages 搭建一个可长期维护的个人网站"
date: "2026-07-29 10:00:00 +0800"
author: "zhanlutuzi"
permalink: "/2026/07/29/astro-github-pages-personal-website/"
categories: ["实践", "教程"]
tags: ["Astro", "GitHub Pages", "个人网站", "Markdown", "自动部署", "TypeScript"]
summary: "从空仓库开始，用 Astro 构建个人主页和 Markdown Blog，再通过 GitHub Actions 自动发布到免费的 GitHub Pages。文章包含目录设计、内容集合、动态文章路由、中英文页面、RSS 和日常更新方法。"
image: "/og.png"
comments: false
render_with_liquid: false
---

个人网站常见的需求其实很稳定：展示个人介绍、经历和项目，保留一个可以长期更新的 Blog，最好还能免费部署，修改内容后自动上线。

这篇文章介绍一套完整且容易维护的方案：

- 使用 **Astro** 生成静态网站；
- 使用 **Markdown** 写 Blog；
- 使用 **TypeScript** 保存项目和经历数据；
- 使用 **GitHub Actions** 自动构建；
- 使用 **GitHub Pages** 免费托管；
- 额外支持中英文页面和 RSS。

完成后的参考效果：

- [中文主页](https://zhanlutuzi.github.io/)
- [英文主页](https://zhanlutuzi.github.io/en/)
- [Blog](https://zhanlutuzi.github.io/blog/)
- [完整代码仓库](https://github.com/zhanlutuzi/zhanlutuzi.github.io)

整套网站没有数据库，也不需要维护云服务器。每次向 GitHub 推送代码，网站会自动检查、构建并发布。

---

## 一、先理解整个网站如何工作

这套方案可以概括成一条很短的链路：

```text
页面、数据和 Markdown
        ↓
Astro 生成静态 HTML、CSS 和 JavaScript
        ↓
GitHub Actions 自动构建
        ↓
GitHub Pages 对外提供访问
```

Astro 只在构建阶段运行。访客打开网站时，GitHub Pages 直接返回已经生成好的网页文件，因此访问速度快，也没有后端服务的维护成本。

内容主要分为三类：

1. **页面结构**：决定首页有哪些区域、按照什么顺序展示；
2. **结构化数据**：保存经历、项目、教育和论文；
3. **Markdown 文章**：保存 Blog 的标题、摘要和正文。

样式与内容分开后，更新项目时只修改数据，新增文章时只创建 Markdown 文件，页面结构无需反复调整。

---

## 二、准备开发环境

需要提前安装：

- Git
- Node.js
- pnpm
- 一个 GitHub 账号

可以使用下面的命令检查：

```bash
git --version
node --version
pnpm --version
```

如果尚未安装 pnpm，可以执行：

```bash
npm install -g pnpm
```

建议使用较新的 Node.js 长期支持版本。不同电脑上的具体版本可以不完全一致，但本地开发与 GitHub 自动构建都应能够成功执行 `pnpm build`。

---

## 三、创建 GitHub Pages 仓库

在 GitHub 新建一个仓库，名称必须是：

```text
你的用户名.github.io
```

例如 GitHub 用户名是 `alice`，仓库名就是：

```text
alice.github.io
```

GitHub Pages 会为这个仓库提供根域名：

```text
https://alice.github.io/
```

创建仓库后克隆到本地：

```bash
git clone https://github.com/alice/alice.github.io.git
cd alice.github.io
```

后续示例都在这个目录中执行。

---

## 四、初始化 Astro

在仓库目录中运行：

```bash
pnpm create astro@latest .
```

初始化时可以选择：

- 使用 TypeScript；
- 安装依赖；
- 保持一个简单的空项目；
- Git 已经由外部仓库管理时，不必再次初始化。

启动本地开发服务：

```bash
pnpm dev
```

终端会显示类似地址：

```text
http://localhost:4321/
```

打开这个地址即可预览网站。修改页面或 Markdown 后，浏览器会自动刷新。

为了支持 RSS，再安装：

```bash
pnpm add @astrojs/rss
```

最终常用命令可以放在 `package.json`：

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview"
  }
}
```

其中：

- `pnpm dev` 用于日常写作和修改页面；
- `pnpm build` 用于发布前检查；
- `pnpm preview` 用于查看构建后的最终结果。

---

## 五、规划目录结构

一个适合个人网站的目录可以这样组织：

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   ├── favicon.png
│   └── images/
├── src/
│   ├── components/
│   │   └── HomePage.astro
│   ├── content/
│   │   └── blog/
│   ├── data/
│   │   ├── portfolio.ts
│   │   └── portfolio.en.ts
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── lib/
│   │   └── blog.ts
│   ├── pages/
│   │   ├── blog/
│   │   ├── en/
│   │   ├── feed.xml.ts
│   │   └── index.astro
│   ├── styles/
│   │   └── global.css
│   └── content.config.ts
├── astro.config.mjs
└── package.json
```

各目录的职责：

- `public/`：无需处理、可以直接访问的图片和图标；
- `components/`：首页等可复用页面组件；
- `data/`：项目、经历、论文等结构化内容；
- `content/blog/`：Markdown 文章；
- `layouts/`：网页公共的 `<head>`、导航和脚本；
- `pages/`：网站地址与页面的对应关系；
- `styles/`：全局样式。

---

## 六、配置网站域名和静态输出

编辑 `astro.config.mjs`：

```ts
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://alice.github.io",
  output: "static",
  trailingSlash: "always",
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },
});
```

几个关键配置：

- `site` 用于生成完整的文章地址、RSS 地址和分享图片地址；
- `output: "static"` 表示生成静态网站；
- `trailingSlash: "always"` 让页面地址统一以 `/` 结尾；
- `shikiConfig` 用于设置 Markdown 代码块样式。

如果仓库名就是 `alice.github.io`，网站发布在根路径，不需要额外配置 `base`。

---

## 七、用数据文件管理经历和项目

个人主页的经历、项目、论文不适合全部写死在页面中。把它们整理成数组，页面负责循环渲染，维护会简单很多。

创建 `src/data/portfolio.ts`：

```ts
export const experiences = [
  {
    period: "2025.01 — 至今",
    place: "上海",
    organization: "示例科技有限公司",
    department: "AI 产品部",
    role: "AI 应用研发",
    summary: "负责智能应用的设计与开发。",
    points: [
      "完成核心功能原型并接入业务系统。",
      "建立自动化评测流程。",
    ],
  },
];

export const projects = [
  {
    title: "项目名称",
    description: "用两三句话介绍项目解决的问题。",
    result: "说明最终结果或可验证指标。",
    tags: ["Python", "Astro", "AI"],
    links: [
      {
        label: "查看项目",
        href: "https://github.com/alice/project",
      },
    ],
  },
];
```

在 Astro 页面中导入：

```astro
---
import { experiences, projects } from "../data/portfolio";
---

<section>
  {
    projects.map((project) => (
      <article>
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        <strong>{project.result}</strong>
        <ul>
          {project.tags.map((tag) => <li>{tag}</li>)}
        </ul>
      </article>
    ))
  }
</section>
```

这一步建立了清晰的分工：

- 页面组件控制展示方式；
- 数据文件控制具体内容；
- CSS 控制视觉效果。

新增项目时，只需要在数组中加入一个对象。

---

## 八、建立公共页面 Layout

所有页面都会使用标题、描述、favicon、分享图片和滚动进度等公共能力，可以放在 `BaseLayout.astro`。

简化版如下：

```astro
---
import "../styles/global.css";

interface Props {
  title?: string;
  description?: string;
  image?: string;
  lang?: "zh-CN" | "en";
}

const {
  title = "我的个人网站",
  description = "项目、文章和个人经历。",
  image = "/og.png",
  lang = "zh-CN",
} = Astro.props;

const canonical = new URL(Astro.url.pathname, Astro.site);
const imageUrl = new URL(image, Astro.site);
---

<!doctype html>
<html lang={lang}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <link rel="icon" type="image/png" href="/favicon.png" />

    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:image" content={imageUrl} />

    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

之后每个页面都可以使用：

```astro
<BaseLayout
  title="文章标题"
  description="文章摘要"
>
  <main>页面内容</main>
</BaseLayout>
```

这样可以统一管理搜索结果和链接分享时展示的内容。

---

## 九、配置 Markdown Blog

Astro 的 Content Collections 可以扫描指定目录中的 Markdown，并在构建阶段校验文章字段。

创建 `src/content.config.ts`：

```ts
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/blog",
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string().optional(),
    permalink: z.string().optional(),
    categories: z.array(z.string()).optional().default([]),
    tags: z.array(z.string()).optional().default([]),
    summary: z.string().optional().default(""),
    image: z.string().optional(),
  }),
});

export const collections = { blog };
```

这里规定：

- `title` 和 `date` 必须填写；
- `summary`、`tags` 等字段可以省略；
- 日期字符串会自动转换为 `Date`；
- 字段写错时，`pnpm build` 会直接提示。

在 `src/content/blog/` 中创建第一篇文章：

```markdown
---
title: "我的第一篇文章"
date: "2026-07-29 20:00:00 +0800"
author: "alice"
permalink: "/2026/07/29/my-first-post/"
categories: ["实践"]
tags: ["Astro", "个人网站"]
summary: "记录我使用 Astro 搭建个人网站的过程。"
image: "/images/post-cover.png"
---

这里开始写正文。

## 第一个小标题

支持正常的 Markdown：

- 列表
- 链接
- 图片
- 引用
- 代码块
```

推荐使用下面的文件名格式：

```text
2026-07-29-my-first-post.md
```

文件名使用英文或拼音，文章标题可以使用中文。这样生成的网址稳定，也便于跨平台管理。

---

## 十、生成 Blog 列表

创建 `src/pages/blog/index.astro`：

```astro
---
import { getCollection } from "astro:content";

const posts = (await getCollection("blog")).sort(
  (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
);
---

<main>
  <h1>写作与笔记</h1>

  {
    posts.map((post) => (
      <a href={post.data.permalink}>
        <time>{post.data.date.toLocaleDateString()}</time>
        <h2>{post.data.title}</h2>
        <p>{post.data.summary}</p>
      </a>
    ))
  }
</main>
```

`getCollection("blog")` 会读取全部 Markdown。排序后，最新文章出现在最前面。

首页只显示最近五篇时，可以使用：

```ts
const latestPosts = posts.slice(0, 5);
```

每次新增 Markdown，首页和文章列表都会在构建时自动更新。

---

## 十一、生成文章详情页

如果希望文章地址为：

```text
/2026/07/29/my-first-post/
```

可以创建动态路由：

```text
src/pages/[year]/[month]/[day]/[slug]/index.astro
```

核心代码：

```astro
---
import {
  getCollection,
  render,
  type CollectionEntry,
} from "astro:content";

export async function getStaticPaths() {
  const posts = await getCollection("blog");

  return posts.flatMap((post) => {
    const path = post.data.permalink;
    const match = path?.match(
      /^\/(\d{4})\/(\d{2})\/(\d{2})\/([^/]+)\/$/,
    );

    if (!match) return [];

    const [, year, month, day, slug] = match;

    return [{
      params: { year, month, day, slug },
      props: { post },
    }];
  });
}

interface Props {
  post: CollectionEntry<"blog">;
}

const { post } = Astro.props;
const { Content } = await render(post);
---

<article>
  <header>
    <time>{post.data.date.toLocaleDateString()}</time>
    <h1>{post.data.title}</h1>
    <p>{post.data.summary}</p>
  </header>

  <Content />
</article>
```

`getStaticPaths()` 会在构建阶段遍历文章，为每篇 Markdown 生成一个独立 HTML 页面。

这也意味着 `permalink` 必须符合路由格式。少写一个日期段或结尾斜杠，都可能导致文章未被生成。

---

## 十二、生成 RSS

RSS 可以让读者使用订阅工具获取新文章。

创建 `src/pages/feed.xml.ts`：

```ts
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context: { site: URL }) {
  const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  return rss({
    title: "我的写作与笔记",
    description: "关于技术、工具和学习过程的记录。",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.summary,
      link: post.data.permalink,
      categories: post.data.tags,
    })),
  });
}
```

构建完成后，RSS 地址为：

```text
https://alice.github.io/feed.xml
```

---

## 十三、增加中英文页面

中英文页面可以共用一个 `HomePage.astro` 组件。

中文入口 `src/pages/index.astro`：

```astro
---
import HomePage from "../components/HomePage.astro";
---

<HomePage locale="zh" />
```

英文入口 `src/pages/en/index.astro`：

```astro
---
import HomePage from "../../components/HomePage.astro";
---

<HomePage locale="en" />
```

在组件中选择对应数据：

```astro
---
import * as portfolioZh from "../data/portfolio";
import * as portfolioEn from "../data/portfolio.en";

const { locale = "zh" } = Astro.props;
const isEnglish = locale === "en";
const portfolio = isEnglish ? portfolioEn : portfolioZh;
---
```

最终得到：

```text
https://alice.github.io/
https://alice.github.io/en/
```

两种语言共用布局、样式和交互。修改页面结构时只改一处，文案和数据分别维护。

还可以在 `<head>` 中加入语言声明：

```html
<link
  rel="alternate"
  hreflang="en"
  href="https://alice.github.io/en/"
/>
```

英文页面则指回中文主页。

---

## 十四、管理图片和 favicon

放在 `public/` 中的文件可以从网站根路径直接访问。

例如：

```text
public/favicon.png
public/images/project-demo.jpg
public/images/post-cover.png
```

页面中使用：

```html
<img src="/images/project-demo.jpg" alt="项目演示" />
```

Markdown 中使用：

```markdown
![图片说明](/images/post-cover.png)
```

这里不要写：

```text
./public/images/post-cover.png
```

`public` 是本地目录名，不会出现在最终网址中。

浏览器会长期缓存 favicon。更换图标时，建议同时修改文件名：

```html
<link rel="icon" href="/favicon-v2.png" />
```

这样比反复覆盖同一个文件更容易立即看到更新。

---

## 十五、配置 GitHub Actions 自动部署

创建：

```text
.github/workflows/deploy.yml
```

写入：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v7

      - name: Build and upload
        uses: withastro/action@v6
        with:
          package-manager: pnpm@11.7.0

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v5
```

然后进入 GitHub 仓库：

```text
Settings → Pages
```

将发布来源设置为：

```text
GitHub Actions
```

此后每次向 `main` 分支推送，GitHub 会自动：

1. 读取仓库；
2. 安装依赖；
3. 执行 Astro 构建；
4. 上传静态文件；
5. 发布到 GitHub Pages。

如果构建失败，发布步骤不会继续，线上旧版本仍然保留。

---

## 十六、第一次发布

本地先执行：

```bash
pnpm build
```

检查通过后提交：

```bash
git add .
git commit -m "site: build personal website"
git push origin main
```

进入 GitHub 仓库的 `Actions` 页面，可以看到构建和发布状态。

发布完成后访问：

```text
https://alice.github.io/
```

一般几十秒到几分钟后可以看到新版本。

---

## 十七、以后如何更新

### 新增项目

编辑：

```text
src/data/portfolio.ts
```

如果有英文主页，同时更新：

```text
src/data/portfolio.en.ts
```

### 新增 Blog

在下面的目录创建 Markdown：

```text
src/content/blog/
```

推荐文件名：

```text
2026-07-29-new-post.md
```

### 本地预览

```bash
pnpm dev
```

### 发布前检查

```bash
pnpm build
```

### 提交并上线

```bash
git add .
git commit -m "blog: add new post"
git push origin main
```

首页最新文章、Blog 列表、文章详情页和 RSS 都会自动更新。

---

## 十八、常见问题

### 1. 推送后没有自动发布

检查：

- 是否推送到了 `main`；
- `.github/workflows/deploy.yml` 是否存在；
- GitHub Pages 的来源是否选择了 GitHub Actions；
- Actions 页面是否出现错误。

### 2. 本地可以显示，线上图片失效

静态资源放在 `public/`，引用时从 `/` 开始：

```text
/images/example.png
```

注意文件名大小写。macOS 本地文件系统可能不敏感，但 GitHub 的 Linux 构建环境区分大小写。

### 3. 新文章出现在列表里，点击后却是 404

检查 `permalink` 是否符合动态路由：

```text
/年/月/日/英文-slug/
```

同时检查结尾 `/` 是否存在。

### 4. Markdown 构建失败

常见原因：

- `title` 缺失；
- `date` 格式无法识别；
- `tags` 写成字符串，而 schema 要求数组；
- Frontmatter 的引号或括号没有闭合。

本地运行 `pnpm build` 会给出具体文件和字段。

### 5. favicon 一直不更新

浏览器对 favicon 的缓存非常积极。修改文件名并更新 `<link rel="icon">`，通常比清除全部缓存更直接。

### 6. 网站地址出现仓库子路径

用户主页仓库必须命名为：

```text
username.github.io
```

其他仓库会发布在：

```text
username.github.io/repository-name/
```

这种情况下还需要在 Astro 中配置 `base`。

---

## 总结

这套个人网站的维护循环很简单：

```text
修改数据或 Markdown
        ↓
本地 pnpm build
        ↓
提交到 GitHub main
        ↓
自动发布
```

Astro 负责把页面和文章生成静态文件，GitHub Actions 负责自动检查和构建，GitHub Pages 负责托管。日常更新只涉及 TypeScript 数据和 Markdown 内容。

如果只需要主页，可以省略 Blog、RSS 和多语言部分；如果希望长期写作，这套结构可以继续扩展分类、标签、站内搜索、文章目录和自定义域名。

完整参考：

- [在线网站](https://zhanlutuzi.github.io/)
- [代码仓库](https://github.com/zhanlutuzi/zhanlutuzi.github.io)
- [Astro 官方文档](https://docs.astro.build/)
- [GitHub Pages 文档](https://docs.github.com/pages)

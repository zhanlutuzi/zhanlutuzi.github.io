---
layout: page
title: 关于
permalink: /about/
description: 关于这个站点和作者的一些信息。
---

## 关于我

{{ site.profile.intro }}

{{ site.profile.career }}，偏爱把学习过程、踩坑记录和有用的参考整理成可复用的文章。

## 站点概况

- 文章：{{ site.posts | size }}
- 分类：{{ site.categories | size }}
- 标签：{{ site.tags | size }}
- 域名：{{ site.domain }}

## 常用链接

- [GitHub]({{ site.social.github }})
- [邮箱联系]({{ site.social.email }})
- [文章归档]({{ '/archives/' | relative_url }})

## 站点说明

这个站点最初运行在 Hexo 上，现在已经迁移到 Jekyll。历史文章的旧链接会继续保留，方便收藏夹、搜索引擎和外部引用继续访问。

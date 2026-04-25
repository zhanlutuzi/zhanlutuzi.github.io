---
layout: page
title: 分类
permalink: /categories/
description: 按分类浏览全部文章。
---

{% assign categories = site.categories | sort %}
{% for category in categories %}
## {{ category[0] }}（{{ category[1].size }}）

{% for post in category[1] %}
- [{{ post.title }}]({{ post.url | relative_url }})
{% endfor %}

{% endfor %}

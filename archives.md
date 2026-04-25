---
layout: page
title: 归档
permalink: /archives/
description: 按年份整理的全部文章。
---

{% assign archive_groups = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
{% for year in archive_groups %}
## {{ year.name }}

{% for post in year.items %}
- {{ post.date | date: "%m-%d" }} [{{ post.title }}]({{ post.url | relative_url }})
{% endfor %}

{% endfor %}

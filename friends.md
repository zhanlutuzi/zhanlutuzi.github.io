---
layout: page
title: 友情链接
permalink: /friends/
description: 旧站里的友情链接已经保留到 Jekyll 版本。
comments: true
---

{% for friend in site.data.friends %}
## [{{ friend.name }}]({{ friend.url }})

{{ friend.introduction }}

[{{ friend.title }}]({{ friend.url }})

{% endfor %}

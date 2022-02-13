---
title: Hexo文章属性
date: 2022-02-13 17:23:58
tags: [转载,教程,Hexo]
categories: Hexo
summary: 对于Hexo新文章头部标签的解释说明
---

# 声明

```
本文为转载，一切著作权归原作者所有！
```

来源：

> [Hexo文章属性](https://tbfungeek.github.io/2016/02/27/Hexo-%E6%96%87%E7%AB%A0%E5%B1%9E%E6%80%A7/)

---



之前介绍使用hexo new 的时候可以带一个参数layout，那么这个layout指的是什么呢？
它其实是在scaffolds文件夹下的*.md*，默认情况下有*draft.md* *page.md* *post.md*
如果没有指定的话它会默认使用*post.md* ，这个属性可以在根目录下的_config 文件中进行配置：

> default_layout: post 配置默认的layout

同时我们也可以看到当你hexo new 的时候产生的md文件中会默认产生一些内容，这个内容就是上述介绍的*draft.md* *page.md* *post.md* 所指定的，比如下面是我自己定制的*post.md*布局：

```
title: {{ title }}
date: {{ date }}
tags:
categories:
description:
---
```



这些比较常见，介绍如下：

```
title: postName           文章标题
date: 2013-12-02 15:30:16 文章编写的时间，这里可以随意修改
categories:               文章分类目录，可以为空
tags:                     文章标签，可空，多标签请用格式[tag1,tag2,tag3]
description:              对本页的描述，相当于是一个简介，如果这个定义了，就会在首页中出现这里的内容而不会出现整个文章详细内容。
```

​	这里需要注意的是每个属性冒号后面都应该有个空格，然后再加属性值。并且一定要注意最后的三个下划线，否则文章的内容就不会被显示出来。

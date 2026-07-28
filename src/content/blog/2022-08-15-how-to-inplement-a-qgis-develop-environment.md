---
layout: "post"
title: "配置QGIS开发环境流程"
date: "2022-08-15 00:00:00 +0800"
author: "zhanlutuzi"
permalink: "/2022/08/15/how-to-inplement-a-qgis-develop-environment/"
categories: ["教程"]
tags: ["技巧"]
summary: "配置QGIS开发环境"
image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/QGIS_logo%2C_2017.svg/1200px-QGIS_logo%2C_2017.svg.png"
comments: true
render_with_liquid: false
---

<h1 id="配置流程"><a href="#配置流程" class="headerlink" title="配置流程"></a>配置流程</h1><p>首先参考<a target="_blank" rel="noopener" href="https://blog.csdn.net/qq_44894692/article/details/119965203">这篇博文</a></p>
<p>完成它的流程之后，需要注意的是，要在项目设置中修改</p>
<p>不要把dll都拷贝到目录下，右键项目-属性-调试-环境中依次加入dll所在的目录，比如：<br>PATH=E:\Development\QGIS_3.24.2\bin;E:\Development\QGIS_3.24.2\apps\Qt5\bin;E:\Development\QGIS_3.24.2\apps\qgis\bin;E:\Development\QGIS_3.24.2\share\gdal<br>注意：取消勾选 左下角的从父级或项目默认设置继承选项。</p>

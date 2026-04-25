---
layout: "post"
title: "VSCode Leaflet 自动补全问题的解决"
date: "2023-03-02 00:00:00 +0800"
author: "zhanlutuzi"
permalink: "/2023/03/02/vscode-leaflet-auto-complete/"
categories: ["教程"]
tags: ["技巧"]
summary: "VScode设置第三方js包的自动补全"
image: "https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/2048px-Visual_Studio_Code_1.35_icon.svg.png"
comments: true
render_with_liquid: false
---

<p>使用npm的命令</p>
<p><code>npm install --save @types/leaflet</code></p>
<p>这行代码会自动下载Leaflet的TypeScript定义，并自动添加到<code>packages.json</code>文件中的dependency项。</p>
<p>安装之后重新启动VScode可以发现自动补全功能又出现了</p>

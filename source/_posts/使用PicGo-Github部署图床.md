---
title: 使用PicGo+Github部署免费图床
date: 2022-02-13 22:25:52
author: zhanlutuzi
tags: [Typora,Github,图床,教程]
categories: 教程
img: https://cdn.jsdelivr.net/gh/zhanlutuzi/imageBed/image/image-20220214205811477.png
summary: 手把手教你使用Github仓库免费创立图床
---

# 前言

> 为什么需要图床？

​	因为足够简单、方便。在编写 Markdown 文档时引用图片可以直接部署URL , 不必专门去纠结相对路径、绝对路径，不必专门找个文件夹放图片。

# 需要提前准备的东西

- 安装[PicGo](https://github.com/Molunerfinn/PicGo/releases)

  > PicGo 是一款开源的图床工具，Typora 也对它进行了支持

- 拥有一个[Github](https://github.com/)账号

# 操作步骤

## 1.新建 Github 仓库

点击github 主页右上角的 `+` 创建`New repository`

![新建仓库](https://cdn.jsdelivr.net/gh/zhanlutuzi/imageBed/image/image-20220214200934506.png)

​	填写仓库信息，仓库得设置为 `Public` 因为后面通过客户端访问算是外部访问，因此无法访问`Private`，这样的话图片传上来之后只能存储不能显示。所以要设置为`Public`，填写好后直接点击 `Create repository` 就行了。

​	这也是Github做图床的一个劣势，隐私性低，不过一般人也不会随便把重要的图片上传到图床里，真正传入的都是博客里公开的照片，因此不用担心。

## 2.获得 Token

### 什么是 Token

> token的意思是“令牌”，是服务端生成的一串字符串，作为客户端进行请求的一个标识。
>
> 当用户第一次登录后，服务器生成一个token并将此token返回给客户端，以后客户端只需带上这个token前来请求数据即可，无需再次带上用户名和密码。
>
> 简单token的组成；uid(用户唯一的身份标识)、time(当前时间的时间戳)、sign（签名，token的前几位以哈希算法压缩成的一定长度的十六进制字符串。为防止token泄露）。

​	简单来说，Token 就是一串暗号，告诉 Github 使用这个暗号的人有资格访问你的仓库，并具备一定的权限。

### 配置 Token

如图点击 Settings

![](https://cdn.jsdelivr.net/gh/zhanlutuzi/imageBed/image/image-20220214203401076.png)

找到`Developer settings`，并进入 `Personal access tokens` 然后点击`Generate new token`，创建token；

![](https://cdn.jsdelivr.net/gh/zhanlutuzi/imageBed/image/image-20220214212120387.png)

把repo的勾打上即可。然后翻到页面最底部，点击`Generate token`的绿色按钮生成token。

![](https://cdn.jsdelivr.net/gh/zhanlutuzi/imageBed/image/image-20220214212233490.png)

然后复制生成一串字符token，这个token 只出现一次，所以要保存一下。

![](https://cdn.jsdelivr.net/gh/zhanlutuzi/imageBed/image/image-20220214212315516.png)

## 3.配置 PicGo

在 PicGo 图床设置中找到 Github 图床，按下图进行设置。

![配置PicGo](https://cdn.jsdelivr.net/gh/zhanlutuzi/imageBed/image/image-20220214204301080.png)

`jsdelivr`的配置格式如下

`https://cdn.jsdelivr.net/gh/Github用户名/仓库名`

## 4.配置 Typora

打开偏好设置

![](https://cdn.jsdelivr.net/gh/zhanlutuzi/imageBed/image/image-20220214204555951.png)

按下图所示配置相关设定

![配置Typora](https://cdn.jsdelivr.net/gh/zhanlutuzi/imageBed/image/image-20220214204645430.png)

注意：PicGo 路径就是你安装 PicGo 的位置，选中 PicGo.exe 即可

配置完毕后点击`验证图片上传选项`
![配置成功](https://cdn.jsdelivr.net/gh/zhanlutuzi/imageBed/image/Typora_fKNbT3XizG.png)

# 总结

​	做完以上的步骤，你就会获得一个免费的Github图床，并且由于有`jsdelivr`的帮助，我们的图片从国内访问也会加载的非常快！

你可能会需要：

[PicGo官方文档](https://picgo.github.io/PicGo-Doc/zh/guide/config.html#%E9%98%BF%E9%87%8C%E4%BA%91oss)


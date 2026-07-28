---
layout: "post"
title: "配置OpenGL C++ 开发环境"
date: "2022-03-20 01:00:23 +0800"
author: "zhanlutuzi"
permalink: "/2022/03/20/use-vcpkg-to-manage-cpp-libs/"
categories: ["教程"]
tags: ["C++", "OpenGL"]
summary: "教你配置 OpenGL 的开发环境，使用 Vcpkg 或者原始手动配置。"
image: "https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220320010437117.png"
comments: true
render_with_liquid: false
---

# 前言

​	这学期新开了计算机图形学的课程，第一次作业就是配置`OpenGL`开发环境。配置环境对于许多人来说都是头疼的问题，我也不例外。

​	这里我提供两种配置环境的方法供参考。

- 使用`Vcpkg`进行配置（强烈推荐）
- 使用`Visual Studio`内部手动设置（很麻烦）

# 使用 Vcpkg 配置

## 什么是`Vcpkg`?

> Vcpkg 可帮助您在 Windows、 Linux 和 MacOS 上管理 C 和 C++ 库。
>
> 它是一个开源的包管理工具

在`Github`上有相关的仓库，具体的配置可以参考官方的说明文档，有中文版👉[链接](https://github.com/microsoft/vcpkg/blob/master/README_zh_CN.md)

如果你比较懒，那么请看我下面简易的讲解。

## 详细步骤

### 配置 vcpkg

​	首先，根据官方推荐 ，可在C盘新建一个 `src `文件夹（`C:\src`）

​	在该目录下运行 PowerShell 或普通 cmd。运行以下命令下载`vcpkg`，执行`bootstrap-vcpkg.bat`脚本，并使其可在VS中使用

​	可将安装目录（如`C:\src\vcpkg`）添加进系统环境变量中以方便命令行调用

​	如未安装过Git需先下载安装 Git，并将Git所在目录添加进环境变量中

```shell
git clone https://github.com/microsoft/vcpkg
.\vcpkg\bootstrap-vcpkg.bat
.\vcpkg\vcpkg integrate install
```

### 配置 OpenGL

目前最新的也是最推荐安装的IoenGL窗口相关第三方库为glfw，API相关第三方库为glad。运行下列命令安装。

```shell
.\vcpkg\vcpkg install glfw3 
.\vcpkg\vcpkg install glad
```

> 📌请注意: vcpkg在Windows中默认编译并安装x86版本的库。 若要编译并安装x64版本，请执行

```shell
> .\vcpkg\vcpkg install [package name]:x64-windows
```

接下来就可以在vs里直接include所需文件，不会产生编译和链接问题。

```c++
#include <glad/glad.h>
#include <GLFW/glfw3.h>
```

## 缺点

​	`vcpkg`方式配置的缺点就是因为是直接使用编译好的库，所以不方便查看源码。如有查看源码需求还是要使用自己编译相关库并链接进自己的工程的方式。但如只是想调用接口这种方式即可满足需求。如库有更新，可直接使用`vcpkg`进行更新。

# VS内部设置

虽然挺麻烦,但是我建议自己跟着做一做，会加深你对`C++`引用第三方库的理解。

这里可以参考这篇文章👉[链接](https://blog.csdn.net/AvatarForTest/article/details/79199807?utm_source=app&app_version=5.0.1&code=app_1562916241&uLinkId=usr1mkqgl919blen)

# 你可能会需要

[OpenGL+VS2017 环境配置(亲测好使)::附带必要知识点](https://blog.csdn.net/AvatarForTest/article/details/79199807?utm_source=app&app_version=5.0.1&code=app_1562916241&uLinkId=usr1mkqgl919blen)

[C++开源库 - 包管理工具Vcpkg安装使用教程 ](https://www.cnblogs.com/linuxAndMcu/p/14696542.html)

[解决vcpkg下载缓慢的问题](https://blog.csdn.net/qq_39690181/article/details/82910610)

[OpenGL经典教程](https://learnopengl-cn.github.io/)

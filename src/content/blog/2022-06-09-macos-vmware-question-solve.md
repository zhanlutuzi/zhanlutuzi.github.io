---
layout: "post"
title: "虚拟机安装MacOS一些问题的解决"
date: "2022-06-09 23:26:49 +0800"
author: "zhanlutuzi"
permalink: "/2022/06/09/macos-vmware-question-solve/"
categories: ["教程"]
tags: ["VMware", "虚拟机", "MacOS", "教程"]
summary: "解决 1.虚拟机的代理 2.MacOS显示分辨率异常"
image: "https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220609232953197.png"
comments: true
render_with_liquid: false
---

# 前言

太久不更新了，~~果然人类的本质就是鸽子吗~~

今天结束了数据库的上机，晚上不想写报告，开始折腾起来虚拟机了；起因是我之前写了篇虚拟机安装MacOS的文章👉[链接](https://zhanlutuzi.top/2022/02/13/hexo-bo-ke-da-jian/#toc-heading-16)；但是安装上之后屏幕显示分辨率一直不正常，而且也没办法用代理链接Github，这就非常的没用了。今天折腾了一下，把问题解决了，写篇博客记录一下🖖

​																																			——某位马上要考六级期末一堆DDL的~~摸鱼~~大学生

# 虚拟机代理配置

一般来说，在虚拟机内部设置代理有这么几个办法：

- 像你用Windows一样在虚拟机内部装代理软件
  - 不推荐，别用
- 借助VMware，共享主机的代理
  - 优雅！ Gorgeous💃

那么我就介绍第二种办法，~~要优雅XD~~

## VMWare配置网络环境

打开虚拟网络编辑器

![打开虚拟网络编辑器](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220609234728971.png)

点击更改设置

![](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220609234932710.png)

如图所示加上VMnet8，并配置相关参数。

![其实这里加别的VMnet也行，配置一样就可以](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220609235050872.png)

接下来就对单独的虚拟机进行设置

![打开设置页面](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220609235236761.png)

更改网络设置

![网络链接改成VMnet8](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220609235335474.png)

到这里，只需要再获取VMnet8的ip地址就好；打开CMD，输入`ipconfig`找到VMnet8

![务必记住它，后面有用](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220609235513899.png)

## 虚拟机内部设置

打开你的虚拟机，这里用MacOS做演示；Ubuntu操作见[链接](https://www.jianshu.com/p/6c7abd4adc9b)

进入你的Mac虚拟机，打开设置里的网络选项，点击高级进入下图页面；请将我勾选的四项都设置为上面让你记住的ip地址![](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220609235829077.png)

端口号和你的代理软件相关，我这里使用的是Clash，端口就是上面那个箭头所指的位置；记得一定把`Allow LAN`打开，因为VMnet8走的就是LAN(Local Area Network)

![](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220610000058927.png)

以上，代理设置完毕！愉快地使用 Github 吧！

# MacOS分辨率显示异常

在你按照我之前的教程安装完MacOS后一定会发现，这个分辨率怎么这么糊啊，而且还改不了，就很难受🤦‍♂️

下面我们着手解决这个问题

## 安装VMwareTool



打开MacOS后，点击菜单栏里的`虚拟机`再点击`安装VMware Tool`，按照提示进行安装就行，详情请看👉[链接](https://www.geekrar.com/how-to-fix-macos-catalina-screen-resolution-on-vmware/)

具体步骤

1. 安装VMwareTool
2. 提示需要权限，按照指引给权限
3. 重启
4. 再次安装
5. 再重启
6. 安装完毕

## 修改VMware设置

打开首选项

![](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220610001618493.png)

如图进行设置

![](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220610001707275.png)

设置完后重启MacOS

点一下自由拉伸，然后随便拉伸一下虚拟机的窗口

![](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220610002009689.png)

如果这样还没有用，就打开`Terminal`

输入`/Library/Application\Support/VMware\ Tools/vmware-resolutionSet 1920 1080`

之后再在设置里改一下显示比例

这个方法我没有使用，如果有问题可以参考👉[链接](https://www.zhihu.com/question/68703160)

# 参考资料

https://www.zhihu.com/question/68703160

https://blog.51cto.com/sddai/3090254

https://www.jianshu.com/p/4384047334d1

https://www.geekrar.com/how-to-fix-macos-catalina-screen-resolution-on-vmware/

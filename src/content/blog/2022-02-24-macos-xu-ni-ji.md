---
layout: "post"
title: "你的第一台Mac何必是Mac？"
date: "2022-02-24 12:40:27 +0800"
author: "zhanlutuzi"
permalink: "/2022/02/24/macos-xu-ni-ji/"
categories: ["教程"]
tags: ["VMware", "虚拟机", "MacOS", "教程"]
summary: "手把手教你在Windows环境下安装MacOS"
image: "https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/MacOS_Catalina_Desktop.png"
comments: true
render_with_liquid: false
---

# 前言

​		前两天上操作系统课，老师给我们布置了一个作业——“在电脑上装上虚拟机，自己运行一下 Ubuntu。” 我操作了一下，成功安装上了 Ubuntu。于是我就想顺便装上 MacOS 体验一下程序员人手一个的 Mac 系统。这便催生了这篇文章的产生，希望对你有所帮助。

​		为了这篇教程，我花了很大的精力，尝试了常见的`VMware`&`VisualBox`两大主流虚拟机，查询了中英文资料，最终成功安装。（PS. 折戟 VisualBox 十次、VMware 配环境三次...）

![MacOS_Catalina_Desktop](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/MacOS_Catalina_Desktop.png)

# 你需要准备

1. [VMware安装包](https://www.vmware.com/cn/products/workstation-pro/workstation-pro-evaluation.html)

2. [MacOS镜像 ISO 文件]()

   > 在我的网盘里我提供了`Catalina`和`Big Sur`两个版本的 ISO 文件

3. VMware激活码

   关于激活码，百度直接搜就有一大把，而且基本上都是有效的。这里就给各位附上三条：

   >    ZF3R0-FHED2-M80TY-8QYGC-NPKYF
   >    YF390-0HF8P-M81RQ-2DXQE-M2UT6
   >    ZF71R-DMX85-08DQY-8YMNC-PPHV8

4. [VMware_UnLocker](https://github.com/DrDonk/unlocker/releases)

当然，如果你想一步到位的话，我已经将所有需要的文件打包上传到百度云盘里了，各位可直接点击链接[下载](https://pan.baidu.com/s/1l7MVW3mUDPSzbnliPBRaqw?pwd=1304 )

提取码：1304

# 具体步骤

## 1、安装VMware

运行安装程序，程序自动安装，最后一步使用激活码激活。

## 2、停止 VMware Workstation Pro 16 的系统服务

（1）打开任务管理器，进入“服务”版块；

（2）从下至上，按右键依次停止如图所示与 VM 相关的4个服务。

![停止VM服务](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220224150623344.png)

##   3、用 Unlocker 让 VMware 支持安装 macOS 系统

（1）到 https://github.com/DrDonk/unlocker/releases 下载最新的 Unlocker。

（2）解压出文件夹之后，找到`win-install.cmd`，按右键以管理员身份运行。

![](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220224132550731.png)

​		如何确认这一步成功了呢？一种方法是看你的小黑窗里面的一长串英语有没有报错，另一种方法比较简单：看运行完`win-install.cmd`文件后有没有在 `unlocker`的文件夹里多出一个` backup`文件夹（见上一张图），以及你的`VMware Workstation`文件夹里有没有多出 `darwin.iso` 和 `darwinPre15.iso`这两个文件（如下图所示）。

![在Everything中查找](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220224132846085.png)

（这里推荐一款搜索工具`Everything`拥有远超 Windows 默认搜索的速度！[点击我下载](https://github.com/Wox-launcher/Wox/releases/tag/v1.3.524)）

## 4、创建虚拟机

按照与第2步相反的顺序启动VM相关的4个服务

然后启动 VMware Workstation Pro 16，创建新的虚拟机。

![](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220224133336529.png)

找到之前下载的苹果系统镜像文件，打开。

![](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220224133410517.png)

选择系统

![](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220224133440357.png)

找一个大一点的磁盘存虚拟机文件

![](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220224133501865.png)

 继续，最大磁盘100G更宽裕点

![](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220224133529741.png)

默认的硬件配置差不多够了，后期还可以修改的。

![](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220224133613717.png)

![后期在这里改配置](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220224133725154.png)

## 5、AMD CPU再做最后一步设置

在虚拟机的目录中找到`.vmx`后缀的文件，我的虚拟机命名为"mac 11"，因此该文件名为mac 11.vmx，右键编辑(可以使用 VScode 打开)。

在该文件末尾追加下列语句。

```
smc.version = "0"
cpuid.0.eax = "0000:0000:0000:0000:0000:0000:0000:1011"
cpuid.0.ebx = "0111:0101:0110:1110:0110:0101:0100:0111"
cpuid.0.ecx = "0110:1100:0110:0101:0111:0100:0110:1110"
cpuid.0.edx = "0100:1001:0110:0101:0110:1110:0110:1001"
cpuid.1.eax = "0000:0000:0000:0001:0000:0110:0111:0001"
cpuid.1.ebx = "0000:0010:0000:0001:0000:1000:0000:0000"
cpuid.1.ecx = "1000:0010:1001:1000:0010:0010:0000:0011"
cpuid.1.edx = "0000:0111:1000:1011:1111:1011:1111:1111"
featureCompat.enable = "TRUE"
```



## 6、启动虚拟机

​		如果你启动虚拟机后看到苹果的 Logo 恭喜你，你离胜利不远了！

![ 选磁盘工具，点“继续”](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220224134529762.png)

​		![抹掉磁盘](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220224134619582.png)

![自己命名，改格式，点“抹掉”](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220224134648645.png)

![抹掉后叉掉这个窗口](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220224134715160.png)

![点安装macOS、“继续”](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220224134755581.png)

![选择之前抹掉的磁盘进行安装](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220224134830518.png)

到了这一步就没有什么难度了，按照官方的引导一步一步做下去就可以了，但可能需要20分钟安装系统😶请耐心等待.

### Enjoy your MacOS😉

![MacOS](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220224142433087.png)

# 后记

VisualBox 安装 MacOS 可谓困难重重... 如果你是 AMD CPU 我建议你用 VMware.

# 参考资料

鸣谢:

[2022年最新保姆级VM16虚拟机安装macOS苹果系统教程](https://mp.weixin.qq.com/s/eMAgVApZNt98ovbBEly6Pw)

[VMware安装MacOS遇到“客户机操作系统已禁用 CPU。请关闭或重置虚拟机。”解决方案](https://www.jxzssy.top/article/90.html)

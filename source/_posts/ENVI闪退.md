---
title: ENVI 5.3 辐射定标时无法读取Landsat头文件并闪退的解决方案
date: 2022-02-13 17:42:22
tags: [ENVI,GIS,遥感]
img: https://pic.imgdb.cn/item/6208ec412ab3f51d91ada4d6.png
author: 湛泸兔子
summary: ENVI 5.3 闪退的一种方法
---

# 问题详情

![辐射校正窗口](https://img-blog.csdnimg.cn/8923466f65964d9fbc1f2e77bd62ada6.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5rmb5rO45YWU5a2Q,size_14,color_FFFFFF,t_70,g_se,x_16)
 上图为辐射校正窗口，此时点击`OK`会出现下图
 ![请添加图片描述](https://img-blog.csdnimg.cn/6e59027ee6bf4199a0209e95c208d344.png)
此时ENVI报错，告诉我们

> 无法在数据目录中找到正确的元数据

# 问题发现的过程

很多人会认为这是因为数据源有问题，但是我尝试了多组Landsat数据，发现都会出现这种错误，但是我换了台电脑这种问题就没有出现了，用的同一组数据源，说明**数据源并不存在这个问题！**

于是我以
`IDL_IDLBRIDGE Error: OBJ_NEW: IDLnaMetadata Error: Failed to find metadata in data catalog.`为关键词在网上搜寻，得到了以下几个思路。

下面是本人单纯记录一下自己蠢蠢找问题的过程，想看解决方案的朋友可直接跳转到教程部分。

## 几个思路

### 1、数据源属于LandsatL2数据，ENVI暂不支持

> Landsat Collection2是USGS在陆地观测卫星图像上进行的第二次重要更新工作，推进了若干数据产品改进，这些改进利用了数据处理、算法开发以及数据访问和分发能力方面的最新进展。

检查了一下发现我的属于L1数据，此项排除，如果有读者碰到这个问题，可以使用L2转换工具，可以参考这个连接:
`http://blog.sina.com.cn/s/blog_764b1e9d010302tw.html`
	

### 2、某些数据对64位的支持较差

我使用 ENVI 32bit 与 ENVI Classic 进行多次尝试，均以失败告终。
此项排除。

### 3、安装包有误

有句话说得好啊

> **如果一次重装解决不了问题，那就两次,两次不行就三次...**

我更换不同版本，不同安装位置（甚至专门分了个新硬盘区用来装ENVI)，重新安装了7次！
无效！！！！！
心好累....

### 4、输入输出目录中有非法字符

从安装目录开始排查起，到最后数据输入输出、软件根目录一切全部使用纯字母，我连 `_` 都没敢用，用驼峰命名法了...

但是依然没有解决问题，闪退依旧...

我忍不了了，此时我已经在电脑前坐了三个小时，就这样一个小问题都还没解决，我美好的周末在流逝！！！ 已经瘫在椅子上准备摆烂了，但是我这个人有点倔，这个问题解决不了就如鲠在喉，很难受。于是我坐了起来，打算给它最后一次机会。把ENVI**卸载干净**再重新安装。

于是我使用 Everything 查询了所有带 `ENVI` 关键词的文件，打算把它们清空，这时候我看到了一个文件，它的文件地址在我习惯了纯英文且无特殊字符的眼睛里看来是如此的突兀。
啊哈，终于抓到你了！
`C:\Users\y'c'l\AppData\....`
这是一个属于IDL的文件，而ENVI的辐射校正，正是通过IDL来实现的，这下就解释的通了，编程语言的环境目录里不能有汉字，不能有特殊符号，我这里就是因为有` '`这个符号才报错而无法运行。
既然问题找到了，那下面就很简单了。
**只需要修改User的名字为标准格式就可以了！**

# 解决步骤

**！！！！！！！更改注册表有风险，建议先备份好！！！！！！！！！**

## 1.在当前账户先把环境变量改好

如果不进行这项，很多应用是无法使用的，还会有其他奇奇怪怪的问题

- 右击此电脑，选择属性，点击高级系统设置，进入下面的页面![在这里插入图片描述](https://img-blog.csdnimg.cn/a94b7e1b42054d138d04db07d593c32e.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5rmb5rO45YWU5a2Q,size_20,color_FFFFFF,t_70,g_se,x_16)
- 单击环境变量
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/80d722ae1455433abc20847174a01b1b.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5rmb5rO45YWU5a2Q,size_20,color_FFFFFF,t_70,g_se,x_16)
- 在这一栏里把非法格式删去
  改成你想要的名字(记住它，后面有用！！！）
  （纯英文，数字不开头，无特殊符号）

- 设置完后单击确定来保存

## 2.进入Administrator账户

先以管理员模式启动命令提示符（Win+X组合键后就能看到），输入

`net user administrator /active:yes`
![在这里插入图片描述](https://img-blog.csdnimg.cn/1115fec06711480ea2f9dabdc998a414.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5rmb5rO45YWU5a2Q,size_20,color_FFFFFF,t_70,g_se,x_16)
注销当前账户，进入Administrator账户
![在这里插入图片描述](https://img-blog.csdnimg.cn/91d4614f2bbd4133802b9eb72aa7da7f.png)
**2021.12.27更新，其实做到这一步就行了，你可以直接在Administrator的账户下运行ENVI,这样是绝对不会有任何奇奇怪怪的问题的，建议运行专业软件就在Administrator账户里进行**

## 3. 打开注册表

按住键盘的[win+R]，输入regedit，确定
![在这里插入图片描述](https://img-blog.csdnimg.cn/b5938dc67d6a4a1f819c7fd58c6dfeda.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5rmb5rO45YWU5a2Q,size_17,color_FFFFFF,t_70,g_se,x_16)
跳转到
`计算机\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList`目录下方![在这里插入图片描述](https://img-blog.csdnimg.cn/035cfff055644301845b3c1b20e31868.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5rmb5rO45YWU5a2Q,size_20,color_FFFFFF,t_70,g_se,x_16)
![在这里插入图片描述](https://img-blog.csdnimg.cn/55f0998c8ccd4e2dbed987429f2c7476.png)

将此项修改为**环境变量里你设置的那一个**
注意：只改最后一项，即图中 "ycl" 所处的位置.

完成改变后单击确定，并关闭注册表。

## 4.修改用户文件名

在`C:\Users`目录下，找到你要修改的那个文件夹
重命名它为**环境变量里你设置的那一个**

保存，重新启动就可以啦！

# 写在最后

这是我第一次写CSDN,这个问题让我苦恼了很久，在搜索引擎里搜不到解决的方法，于是我就想写这样一篇文章，能够帮助到遇到这个问题和我一样束手无策的朋友们！
**我们都站在前人的肩膀上，这个坑我先替你们踩啦！**

朋友们，答应我，以后买了新的电脑，一定要设置标准格式的用户名，避免这些恼人的问题！

**标准格式**

- **纯字母**
- **无特殊符号**
- **不要以数字开头**

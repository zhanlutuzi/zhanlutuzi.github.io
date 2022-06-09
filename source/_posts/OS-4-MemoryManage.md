---
title: OS-4 MemoryManage
name: 操作系统学习笔记_04_内存管理
date: 2022-04-04 14:52:13
author: zhanlutuzi
tags: [操作系统,笔记]
categories: 笔记
img: https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220302200521587.png
summary: 从零开始的操作系统学习记录『第四章|存储管理』
---

# 1.前言

最佳的存储器当然是容量无限大、速度无限快；但由于经济和技术原因，现实中通常把存储器分为四类：

1. `CPU`内部寄存器
   - 访问速度最快、容量小、昂贵
2. 高速缓存`Cache`
3. 内存
   - 速度适中、价格适中
4. 磁盘
   - 容量大、断电数据仍然保存，非易失型

## 存储器的层次结构

![](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220513221926760.png)

## 存储管理器

- 记录存储器的使用情况
- 存储空间的分配与回收
- 内存上保存不下的进程数据转移至磁盘上保存

# 2.基本的存储管理

存储管理系统分为两类：

1. 需要在磁盘和内存间把进程换进换出
2. 不需要换进换出

上面的换进换出都是因为<font color=red>内存不足</font>而引起的。

## 2.1 单道程序存储管理

​		把整个内存划分为用户区和系统区，用户区一次只能装入一个进程。

下图中

- （a）用于早期大小型机
- （b）用于掌上电脑、嵌入式系统
- （c）用于早期PC 如MS-DOS
- 存放在内存高端的ROM中的系统内容，称为基本输入输出系统`Basic Input and Output System,BIOS`

![](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220513223826416.png)

这种方式一次只能运行一个进程，若要运行新的进程就把旧的进程覆盖掉。

## 2.2 固定分区的多道程序系统

对于多进程的系统，一个进程由于I/O被阻塞时，另一个进程可以去使用CPU，增加了CPU的利用率。

为了实现多道程序技术，将内存划分为n个分区，各分区的大小可以相等可以不等。

![](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220513225505899.png)

​		上图中a有缺陷，可能小分区队列是满的，大分区确是空的，造成浪费。为了改变这种情况就使用了b中的方案，使用单一的输入队列；有分区空闲时，找到能装入该分区的最大进程，减少浪费空间。但这样小进程被歧视，不易被分配到空间。

解决方法

- 始终保留至少一个小分区
- 规定一个进程被忽略的次数不能超过k次

​	上面讲到的方法被称为固定数量任务的多道程序`Multiprogramming with a Fixed number of Tasks,MFT`操作员早晨开机时人为划分出多个分区，在IBM早期的大型机OS/360上使用了多年。<font color=red>现在很少有人会使用这种方法。</font>

## 2.3 重定位和存储保护

不同的作业在不同的分区运行，当一个程序被链接的时候，链接器必须知道程序将在内存的什么地方运行。

内存保护，不同分区不能彼此干扰

一种解决方案

- 加入基地址寄存器和边界寄存器

<font color=red>现在没有人会使用这种方法。</font>

# 3.交换技术

# 4.虚拟存储管理

# 5.页面置换算法

# 6.页式存储管理中的设计问题

# 7.段式存储管理

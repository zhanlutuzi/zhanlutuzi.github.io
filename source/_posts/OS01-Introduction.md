---
title: 操作系统学习笔记_01
date: 2022-03-02 20:01:07
author: zhanlutuzi
tags: [操作系统,笔记]
categories: 笔记
img: https://cdn.jsdelivr.net/gh/zhanlutuzi/imageBed/image/image-20220302200521587.png
summary: 从零开始的操作系统学习记录『第一章绪论』
---



# 前言

本系列笔记参考书籍为 Tanenbaum 的 Operating Systems Design and Implementation ,3th edition.

>Tanenbaum 是荷兰的一名计算机科学家，20世纪80年代，他教授操作系统这门课，由于 UNIX 的版权原因，许多大学的操作系统课程不能再使用 UNIX 的源码进行剖析教学，转而教授更偏向理论层面的内容，而这些内容往往触碰不到操作系统这门课的核心之处。出于教学的需要，Tanenbaum 从头开始，开发出了一个小巧、完整、开源、UNIX 兼容的操作系统 **MINIX**，MINIX 的诞生也推动了 Linux 的产生！

![现代计算机的组成](https://cdn.jsdelivr.net/gh/zhanlutuzi/imageBed/image/image-20220302202457342.png)

- 物理设备
  - 组成计算机的硬件部分
- 微体系结构
  - 各物理设备被组成一个个**功能单元**
- 机器语言
  - 用于操作硬件的指令集，50~300条，如数据传送、数值比较等

# 什么是操作系统

​		所谓操作系统，一般是指在**内核态(Kernel Mode)** 或**管态 (Supervisor mode)** 下运行的软件，它受到硬件的保护！

## Kernel ？

![Kernel_Layout](https://cdn.jsdelivr.net/gh/zhanlutuzi/imageBed/image/Kernel_Layout.svg)

​		上图很清楚的为我们解释了什么叫做 Kernel ，在操作系统中，Kernel 是硬件与软件的中介，它将应用与硬件分割开来，保证了硬件的统一调用，将底层的复杂性封装起来，同时提供接口供应用层使用。

​		MINIX3 的内核是微内核，这个我们后面再谈。

## 操作系统是拓展机

​		它将硬件细节与程序员隔离开来，对于每一个硬件，操作系统都提供了一种简单、好用的接口。它为用户提供一台等价的拓展计算机，更易编程，为用户提供各种服务，用户程序可以通过系统调用`System Call`来使用这些服务。

## 操作系统是资源管理器

​		现代计算机包括诸如 CPU、GPU、存储器、I/O设备、网络接口、打印机等其他设备，它是一个复杂系统的管理者，负责合理高效地分配系统资源。

- 共享
  - 时间上
  - 空间上

# 操作系统发展史

## 第一代计算机 1950 真空管和插接板

![ENIAC](https://cdn.jsdelivr.net/gh/zhanlutuzi/imageBed/image/image-20220302210018053.png)

​		这个时代没有编程语言，只有机器语言，更没有操作系统，用插接板来控制计算机的基本操作以及编程。

> 主要用于计算正弦余弦函数表

## 第二代计算机 1960 晶体管与批处理

![IBM7094](https://cdn.jsdelivr.net/gh/zhanlutuzi/imageBed/image/IBM7094.jpg)

​		有了晶体管，故障率明显降低，但计算机（那时多称主机 mainframe），十分昂贵，高达几百万美元一台，这就显得机时的宝贵，也就促成了批处理系统的诞生，这个时代的人们多采用打孔卡片与计算机进行通讯，通过卡片传入数据与程序。

![批处理系统](https://cdn.jsdelivr.net/gh/zhanlutuzi/imageBed/image/image-20220302211113810.png)

```shell
$ JOB,最大运行时间（minutes),收费员姓名
$ FORTRAN (提示系统装入该语言的编译器)
//////
程序员编写的FORTRAN源程序
//////
$LOAD
$RUN
//////
数据
//////
$END
```

![工作流程](https://cdn.jsdelivr.net/gh/zhanlutuzi/imageBed/image/image-20220302211522984.png)

> 主要用于求解偏微分方程

​		此时已经出现操作系统，FMS（FORTRAN Monitor System)、IBSYS(IBM为7096机开发的操作系统）等

## 第三代计算机 1970 集成电路和多道程序

​		为了减少机时的浪费，将内存分割为多块，存入不同的任务。

​		假脱机技术SPOOLING(**S**imultaneous **P**eripheral **O**perations **O**n-line)

的产生使得不再需要一台专门的机器读取磁带了，在现代，SPOOLING也应用广泛，比如打印机的使用就采用了SPOOLING,在计算机后台往往有一个程序`Spooler`管理打印机

![Windows后台的Spooler进程](https://cdn.jsdelivr.net/gh/zhanlutuzi/imageBed/image/image-20220302213710950.png)

>Spooling is a combination of [buffering](https://en.wikipedia.org/wiki/Data_buffer) and [queueing](https://en.wikipedia.org/wiki/Queue_(data_structure)).

### 分时系统

​		为了弥补批处理系统的缺陷，对CPU进行分时处理，每个用户都有一个联机的终端，看起来就好像是每个人独占一台计算机一样，实际上只有一台主机进行处理任务，每台终端的任务会被CPU分配一段时间间断执行，CPU在多个任务中切换运算。

> Compatible Time-Sharing System (CTSS) MIT开发，第一个真正的分时系统

### MULTICS

​	*Multics* ("Multiplexed Information and Computing Service") ，MIT, Bell Lab, General Electric(GE)，共同开发的一种`公用计算服务系统`，想像电力系统一样即插即用。但这个项目最终失败了，不过它带给计算机领域的贡献是巨大的。

**它催生了 UNIX 和 C 语言的产生**

### 小型机的崛起

​		DEC公司的 PDP 系列大获成功

​		贝尔实验室的`Ken Thompson`在一台`PDP-7`中开发了一种简化版的`MULTICS`，为单用户打造，这也是`UNIX`的源头

​		UNIX 又衍生出两个分支

- AT&T `System V`
- University of California, Berkeley 
  - `BSD`(Berkeley Software Distribution)

由于系统版本过多，IEEE制定了最小接口标准`POSIX`

## 第四代计算机 1980 个人计算机和微处理器

​		初期 Intel 的8086微处理器和`CP/M`操作系统共同占有市场，微软早期销售CP/M卡和Basic解释器。

​		随着16位处理器的出现，微软将 DOS 和 Basic 解释器打包并改进得到了`MS-DOS`，这是微软的第一个操作系统。

### GUI

> Graphical user interface 图形化用户界面

- 斯坦福的 Doug Engelbart 发明了它
- 乔布斯 Macintosh 采用了GUI界面

### ——当代

Mac OS X 基于`Berkeley UNIX`

Window NT 是 当前 Window 系统的源头

# MINIX

- 微内核，内核只有几千行代码
- 模块化

Linux 正是基于 MINIX 开发出来的

## 挂装 mount

​		在 MINIX 中，可移动存储设备往往需要通过挂装的方式与文件系统合并，从而 达成访问的目的。

![](https://cdn.jsdelivr.net/gh/zhanlutuzi/imageBed/image/ApplicationFrameHost_0da5ZNJa31.png)

## 设备文件 special files

​		由于 MINIX 采用微内核，因此设备被特化为一种特殊形式的文件，设备文件又分为两种。

- 块设备文件 Block special file
  - 磁盘
- 字符设备文件 character special file
  - 打印机

## 文件保护机制

- rwx r-- r--  ↔ r w x   r - -   r - -
  - r: read
  - w: write
  - x: execute(file)   search( folder, directory )

![](https://cdn.jsdelivr.net/gh/zhanlutuzi/imageBed/image/image-20220303085937921.png)

> **一个文件有的权限部分共有三组** **rwx** **rwx** **rwx**
>  每一位只有两种可能: 一种是有这个位的权限，另一种是没有这个位的权限，所以可以用二进制表示有和没有，但为简化，所以chmod后面需是8进制数，每个数代表属主属组和其它，`r为4，w为2, x为1 -为0,` 将每组中的三个要素的数字加到一起就是这个组的权限代数，每个权限与进制数的关系如下 rwx rwx rwx  
>  421 421 421 也就是4+2+1=7 4+2+1=7 4+2+1=7 所以最大权限是777
>  又如下面的权限就是 660
>  rw- rw- ---
>  420 420 000     4+2=6,4+2=6,0
>  再如下面的权限是 526
>  r-x -w- rw-
>  401 020 420  
>
> ​	也就是说想把一个文件的权限变成以上情况则输入chmod 526 filename ;  0751呢
> 但在此要说明一下，只是运行*chmod* 的用户对此文件有**w**的权限才能重新设置文件权限。
>  root可设置任何文件的权限.

## 系统调用 System Call

MINIX的系统调用如下图

![](https://cdn.jsdelivr.net/gh/zhanlutuzi/imageBed/image/image-20220303125622421.png)

![](https://cdn.jsdelivr.net/gh/zhanlutuzi/imageBed/image/image-20220303125645196.png)

`Ctrl+C`==`SIGINT`中断信号

`Ctrl+\`==`SIGQUIT`产生退出信号并强制进行内核映像转储

`Ctrl+S`停止输出，`Ctrl+Q`恢复终端输出

`Ctrl+D`文件结束

# 操作系统结构

## 整体结构

`一锅粥`，是各类函数的集合，没有隐藏，所有函数都是相互可见的。

> 访问操作系统提供的服务流程是：
>
> ​				先把参数放入指定位置（如栈），然后执行`TRAP`指令，即内核调用`Kernel Call`

![](https://cdn.jsdelivr.net/gh/zhanlutuzi/imageBed/image/image-20220303173128085.png)

## 分层结构

组织成层次结构，层层封装，向上提供接口

![](https://cdn.jsdelivr.net/gh/zhanlutuzi/imageBed/image/image-20220303201333799.png)

## 虚拟机

此虚拟机非彼虚拟机

核心是一个虚拟机监控程序

裸机硬件的精确拷贝

![](https://cdn.jsdelivr.net/gh/zhanlutuzi/imageBed/image/image-20220303201354792.png)

## 外核

省去映射层的虚拟机，划分磁盘块给不同的虚拟机运行

## 客户-服务器结构

适用于分布式系统

![](https://cdn.jsdelivr.net/gh/zhanlutuzi/imageBed/image/image-20220303201430393.png)

内核只处理客户与服务器间的通信

![](https://cdn.jsdelivr.net/gh/zhanlutuzi/imageBed/image/image-20220303201417706.png)


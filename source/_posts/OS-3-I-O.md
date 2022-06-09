---
title: 操作系统学习笔记_03
date: 2022-04-04 14:52:13
author: zhanlutuzi
tags: [操作系统,笔记]
categories: 笔记
img: https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220302200521587.png
summary: 从零开始的操作系统学习记录『第三章|输入输出系统』
---

# I/O 硬件原理

## I/O 设备

I/O 设备可以分为：

- 块设备`Block Device`
  - 设备将信息存储在固定大小的块中`如磁盘`
  - 数据块大小一般为`512 Bytes-->32768 Bytes`
  - 每个块都能独立于其它块而读写
- 字符设备`Character Device`
  - 设备发送或接收字符流
  - 无法编址，也就不存在寻址操作
  - 如`打印机、键盘、网络接口、鼠标等`
- 其他
  - 无法被分到块设备或字符设备中
  - 比如`时钟`

> ❗ I/O 设备在速度上差异很大，见下图，这为我们管理 I/O 设备提出了挑战，在后文中会提到解决办法。

<img src="https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220404160027122.png" style="zoom:50%;" />

## 设备控制器

​	**I/O设备组成中的电子部件**被称为设备控制器，操作系统往往和设备的控制器打交道，大多数个人计算机采用`总线模型`进行 CPU 与控制器之间的交流。

![](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/ApplicationFrameHost_1vQQ1KaZ7j.png)

​	大型机则采用其他模型，此类模型带有`I/O通道`，一种专用于输入输出工作的计算机。

## 内存映射I/O

> ❓ CPU如何控制寄存器与设备数据缓冲区进行通信？

- 使用I/O端口
  - 内存和I/O地址空间不同
- 内存映射I/O
  - I/O寄存器是内存空间的一部分

![](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220404193104304.png)



## 中断

大部分I/O接口提供一个输出用于驱动`IRQ Interrupt ReQuest`线

即插即用技术使得 BIOS 在启动时为设备自动分配 IRQ 以避免冲突

## 直接存储器存取 DMA

`Direct Memory Access , DMA`

它使得毋须占用CPU宝贵的时间去交换数据，利用 DMA 控制器调控多个设备的数据传送

![](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220404193751362.png)

# I/O 软件原理

## 目标

- 设备无关性
  - 访问I/O毋须指定设备

- 统一命名法
- 错误处理
- 同步/异步传输
- 缓冲

![](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220404200109964.png)



## 设备驱动程序

用来控制特定设备的一组特定的代码被称作设备驱动程序，驱动程序传统上是系统内核的一部分

![](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220404201218694.png)

# 死锁

## 资源

- 可抢占资源
  - 抢占以后没有副作用，如存储器
- 不可抢占资源
  - 抢占后危害很大，比如CD刻录机
  - 死锁与不可抢占资源相关

### 使用一个资源的顺序

1. 请求资源
2. 使用资源
3. 释放资源

## 死锁的原理

> 一个进程集合中的每个进程都在等待本集合中其他进程才能引发的事件，那么这组进程是死锁的

### 死锁发生的四个必要条件

- 互斥条件
  - 一个资源，要么被分配给一个进程，要么就是可用的
- 占有和等待条件
  - 已分配到资源的进程可以请求新的资源
- 不可抢占条件
  - 被分配的资源不能抢占
- 环路等待条件
  - 环路中每个进程都在等待下一个进程占用的资源

### 死锁模型

![](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220404202545162.png)

### 处理死锁的四个策略

- 忽略该问题
  - 鸵鸟算法
- 检测死锁并恢复
- 谨慎地对资源进行动态分配
- 破坏上述四个必要条件之一

## 死锁的预防

- 破坏互斥使用条件
- 禁止已拥有资源的进程等待其他资源
- 给所有资源提供一个全局编号，请求需要按编号顺序提出

![](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220404204123554.png)

## 避免死锁

**<font color=red size=4.5 face=仿宋>通过仔细分配资源来避免死锁</font>**

### 单一资源的银行家算法

在进程申请资源的时候，判断本次申请是否安全，如果安全再分配，就像银行借贷款。

### 资源轨迹

![](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220404205750270.png)

上图中，阴影区域内就是资源发生冲突的区域

### 多种资源的银行家算法

![](https://raw.githubusercontent.com/zhanlutuzi/imageBed/main/image/image-20220404210239120.png)

- E 总资源
- P 已分配资源
- A 剩余资源

算法详情：

1. 查找右边矩阵中是否有一行，其未被满足的资源数均小于等于A。如果不存在这样的行，系统将死锁，因为任何进程都无法运行结束。
2. 若找到这样一行，则可以假设它获得所需的资源并运行结束，将该进程标为结束，并将资源加到向量 A 上。
3. 重复以上两步，直到所有的进程都标记为结束。若能达到这种状态，则初始状态是安全的；或者直到发生死锁。

> 📌事实上，银行家算法虽然很有意义，但缺乏实用价值，因为很少有进程能在运行前知道自己所需资源的最大值！

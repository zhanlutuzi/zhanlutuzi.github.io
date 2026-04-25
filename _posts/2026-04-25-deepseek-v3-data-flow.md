---
layout: "post"
title: "以 DeepSeek-V3 为例，看数据怎么流过一个现代大模型"
date: "2026-04-25 23:25:00 +0800"
author: "zhanlutuzi"
permalink: "/2026/04/25/deepseek-v3-data-flow/"
categories: ["人工智能", "笔记"]
tags: ["大模型", "DeepSeek", "MoE", "MLA", "Transformer"]
summary: "用 DeepSeek-V3 作为案例，把 Tokenizer、Embedding、RMSNorm、MLA、MoE、LM Head、Softmax 放回同一条数据流里。"
comments: true
render_with_liquid: false
---

# 以 DeepSeek-V3 为例，看数据怎么流过一个现代大模型

## 一句话总结

DeepSeek-V3 可以理解成一个以 Decoder-only Transformer 为基础、结合 MLA 注意力和 DeepSeekMoE 的现代语言模型。输入文本会被切成 Token，变成向量，再反复经过多层注意力和 MoE 加工，最后预测下一个 Token。

## 我一开始的问题

学到 DeepSeek-V3 时，我遇到一堆名词：

```text
Tokenizer
Embedding
RMSNorm
MLA
MoE
Router
FFN
LM Head
Softmax
KV Cache
```

每个词单独查都能查到解释，但我真正想知道的是：

> 这些东西在一条数据流里到底怎么排？

## 先给一张总图

下面是一个简化版数据流：

```text
输入文字
  |
  v
Tokenizer
  |
  v
Token IDs
  |
  v
Embedding
  |
  v
+------------------------------------------------+
| Transformer Block x N                          |
|                                                |
|  RMSNorm                                       |
|    -> MLA Attention                            |
|    -> Residual Add                             |
|                                                |
|  RMSNorm                                       |
|    -> MoE                                      |
|        -> Router                               |
|        -> Shared Expert                        |
|        -> Routed Experts                       |
|        -> Combine                              |
|    -> Residual Add                             |
+------------------------------------------------+
  |
  v
Final RMSNorm
  |
  v
LM Head
  |
  v
Softmax
  |
  v
下一个 Token
```

这张图是理解这一篇的核心。

## 第一步：Tokenizer

输入文字先经过 Tokenizer。

模型不直接处理自然语言文本，而是处理 Token ID。

```text
"DeepSeek 很强"
  -> Token 序列
  -> Token ID 序列
```

Tokenizer 的切法会影响模型看到的基本单位。中文、英文、符号、空格都可能被切成不同粒度的 Token。

## 第二步：Embedding

Token ID 只是整数编号。Embedding 层会把每个编号变成一个高维向量。

```text
Token ID
  -> 向量
```

从这一步开始，模型内部流动的就不再是文字，而是一串串数字向量。

## 第三步：进入 Transformer Block

DeepSeek-V3 的主体可以理解成很多层 Transformer Block 的堆叠。

每一层都会对 Token 向量进行两类核心处理：

```text
Attention：处理 Token 之间的上下文关系
MoE：对每个 Token 做专家化加工
```

中间会穿插 RMSNorm 和残差连接来保证数值稳定和信息流通。

## 第四步：RMSNorm

RMSNorm 的作用是让输入向量的数值幅度稳定。

它不是为了让模型学到新知识，而是为了让后面的 Attention 或 MoE 在更稳定的数值范围里计算。

我给自己的比喻是：

```text
RMSNorm = 稳压器
```

如果没有这种归一化，深层网络里的数值可能越来越大或越来越小，训练会更难稳定。

## 第五步：MLA Attention

DeepSeek-V3 的注意力机制使用 MLA，即 Multi-head Latent Attention。

普通 Attention 在长上下文推理时会遇到 KV Cache 成本问题。上下文越长，需要缓存和读取的 Key、Value 越多，显存压力越大。

MLA 的核心思路可以简化理解为：

```text
不要直接缓存完整的 Key / Value
  -> 先压缩到更低维的潜在表示
  -> 需要时再用于注意力计算
```

这样做的目标是降低长上下文推理中的缓存成本。

对我来说，MLA 应该放在这张地图里：

```text
Attention 机制
  -> MHA
  -> GQA
  -> MLA
```

它是注意力机制的一种优化，而不是 MoE。

## 第六步：残差连接

Attention 处理完后，不是简单把结果传下去，而是会和原来的输入相加。

```text
输出 = 原输入 + Attention 结果
```

这可以让模型在深层结构里保留原始信息，也让训练更稳定。

## 第七步：进入 MoE

接下来又会经过一次 RMSNorm，然后进入 MoE 层。

MoE 在这里可以理解为 FFN 的升级版本。

普通 FFN：

```text
Token 向量
  -> 一个 FFN
```

MoE：

```text
Token 向量
  -> Router
  -> 选择若干专家 FFN
  -> 合并专家输出
```

DeepSeek-V3 使用 DeepSeekMoE。根据技术报告，它是 671B 总参数、每个 Token 激活约 37B 参数的 MoE 模型。

这意味着：

```text
模型容量很大
但每个 Token 不会激活全部参数
```

## 第八步：Final RMSNorm、LM Head、Softmax

经过多层 Transformer Block 后，模型得到最后的向量表示。

Final RMSNorm 会再做一次数值稳定。

然后 LM Head 把向量映射到词表空间。

```text
最终向量
  -> 词表中每个 Token 的分数
```

Softmax 把分数变成概率。

```text
分数
  -> 概率分布
```

最后模型根据概率选择或采样下一个 Token。

## 第九步：一个 Token 一个 Token 地生成

语言模型通常不是一次性生成完整回答，而是循环预测下一个 Token。

```text
已有上下文
  -> 预测下一个 Token
  -> 把这个 Token 拼回上下文
  -> 再预测下一个 Token
  -> 重复
```

所以“生成一段话”本质上是很多次“预测下一个 Token”的连续过程。

## 我现在如何理解 DeepSeek-V3

我不再把 DeepSeek-V3 理解成一堆名词堆叠，而是把它放进一条数据流里：

```text
文字进入模型
  -> Tokenizer 变成 Token
  -> Embedding 变成向量
  -> MLA 处理上下文关系
  -> MoE 调用专家加工特征
  -> RMSNorm 和残差连接维持稳定
  -> LM Head 输出下一个 Token 的概率
```

这条流动路径比单独背“DeepSeek-V3 是 MoE 模型”有用得多。

## 容易误解的地方

第一，MLA 和 MoE 不是一回事。MLA 是注意力机制优化，MoE 是 FFN 路径上的专家化结构。

第二，总参数不是每次推理都全部激活。MoE 模型要区分总参数和激活参数。

第三，RMSNorm 不负责理解语义，它主要负责数值稳定。

第四，LM Head 不是一个独立智能模块，它负责把内部向量投影到词表概率。

## 这一篇我真正理解了什么

如果以后我忘了 DeepSeek-V3 的数据流，就回到这张图：

```text
Tokenizer
  -> Embedding
  -> RMSNorm
  -> MLA
  -> Residual
  -> RMSNorm
  -> MoE
  -> Residual
  -> Final RMSNorm
  -> LM Head
  -> Softmax
```

## 参考来源

- DeepSeek-V3 Technical Report: https://arxiv.org/abs/2412.19437
- DeepSeekMoE: https://arxiv.org/abs/2401.06066
- RMSNorm: https://arxiv.org/abs/1910.07467


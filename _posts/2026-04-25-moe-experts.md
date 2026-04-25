---
layout: "post"
title: "MoE：为什么现代大模型要拆成很多专家"
date: "2026-04-25 23:24:00 +0800"
author: "zhanlutuzi"
permalink: "/2026/04/25/moe-experts/"
categories: ["人工智能", "笔记"]
tags: ["大模型", "MoE", "Transformer", "DeepSeek"]
summary: "从普通 FFN 出发，理解 MoE 为什么要把前馈网络拆成多个专家，并通过 Router 做稀疏激活。"
comments: true
render_with_liquid: false
---

# MoE：为什么现代大模型要拆成很多专家

## 一句话总结

MoE 通常不是替代 Transformer，而是在 Transformer 的 FFN 位置上做改造：把一个大的前馈网络拆成多个专家网络，再由 Router 为每个 Token 选择少数专家参与计算。

## 我一开始的问题

我最开始看到 MoE 时，只知道它叫 Mixture of Experts，中文常翻译为“混合专家模型”。

但这个翻译没有真正解决我的困惑。

我真正想知道的是：

> 这些“专家”在哪里？它们处理什么？为什么这样能让模型更大又更省？

## 先回到普通 Transformer

普通 Transformer Block 里有两大核心部分：

```text
Attention
FFN
```

Attention 负责 Token 之间的信息交互。FFN 负责对每个 Token 的表示做深度加工。

在 Dense 模型里，FFN 是一个整体。每次来了一个 Token，它都会经过同一套 FFN 参数。

```text
Token 向量
  -> 一个 FFN
  -> 输出向量
```

## 问题：模型越大，计算越贵

如果我们希望模型更强，一个直接办法是增加参数。

但 Dense 模型的问题是：参数变大后，每次推理通常都要动用大量参数。模型越大，每次生成 Token 的成本就越高。

这就像一个公司有很多员工，但每次处理一个小问题，都让所有员工一起开会。

## MoE 的思路：只叫相关专家来

MoE 的思路是：

```text
把一个大 FFN
  -> 拆成多个专家 FFN
  -> 每个 Token 只选择其中几个专家
```

示意图：

```text
Token 向量
  |
  v
Router
  |
  |-- Expert 1
  |-- Expert 2
  |-- Expert 3
  |-- ...
  |-- Expert N
  |
  v
合并被选中专家的输出
```

这些 Expert 本质上通常就是不同的 FFN。

## Router 是什么

Router 可以理解成“分派器”。

每个 Token 进来以后，Router 会根据它当前的向量表示，判断应该交给哪些专家处理。

比如一个模型有很多专家，但每个 Token 只选其中 2 个或 8 个专家。

这就是所谓的稀疏激活：

```text
总参数很多
但每次只激活一部分
```

## 总参数和激活参数

理解 MoE 必须区分两个概念：

```text
总参数：模型一共有多少参数
激活参数：处理一个 Token 时实际参与计算的参数
```

MoE 的优势就在这里。

它可以有很大的总参数，意味着模型容量很大；但每次只用其中一部分专家，意味着推理成本不会按总参数线性增长。

所以 MoE 的核心不是“免费变强”，而是：

> 用稀疏计算的方式扩大模型容量。

## DeepSeek-V3 中的 MoE

DeepSeek-V3 是理解 MoE 的好例子。

根据 DeepSeek-V3 Technical Report，它是一个 MoE 语言模型，总参数规模为 671B，每个 Token 激活约 37B 参数。它使用了 DeepSeekMoE 架构，并结合 MLA 等设计降低推理和训练成本。

这句话可以拆成：

```text
总参数大
  -> 容量大
每个 Token 激活少
  -> 单次计算相对省
Router 选择专家
  -> 不同 Token 走不同专家路径
```

## MoE 带来的新问题

MoE 不是只有优点。

它也会带来新的工程问题：

- Router 如何训练，才能把 Token 分配合理？
- 如何避免所有 Token 都挤到少数专家？
- 多个专家分布在不同设备上时，通信开销如何控制？
- 专家是否真的学到了不同能力，还是只是参数变多了？

这也是为什么 MoE 模型不只是“多放几个 FFN”那么简单。

## 我现在如何理解 MoE

我会把它放在这张图里：

```text
Transformer Block
  |
  |-- Attention
  |
  |-- FFN
        |
        |-- Dense FFN：每次都用同一个 FFN
        |
        |-- MoE FFN：多个专家 FFN，每次选一部分
```

这张图解决了我最初的困惑：MoE 不是漂浮在 Transformer 外面的概念，它经常就发生在 FFN 这个位置。

## 容易误解的地方

第一，MoE 的“专家”不一定对应人类理解的专业领域。不是说某个专家只懂代码，另一个只懂文学。它们是在训练中形成的参数子网络。

第二，MoE 总参数大，不等于每次计算都按总参数付费。关键要看激活参数。

第三，MoE 会降低部分计算成本，但会增加路由、负载均衡、分布式通信等复杂度。

第四，MoE 不是所有模型都必须用。Dense 模型仍然有自己的优势，比如结构简单、部署稳定。

## 这一篇我真正理解了什么

如果以后我忘了 MoE，只要记住：

```text
MoE = 把 Transformer 里的 FFN 拆成很多专家
Router = 为每个 Token 选择专家
稀疏激活 = 总参数很大，但每次只用一部分
```

## 参考来源

- DeepSeekMoE: https://arxiv.org/abs/2401.06066
- DeepSeek-V3 Technical Report: https://arxiv.org/abs/2412.19437


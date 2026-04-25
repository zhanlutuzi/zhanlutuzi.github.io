---
layout: "post"
title: "Transformer：大模型的共同底座"
date: "2026-04-25 23:22:00 +0800"
author: "zhanlutuzi"
permalink: "/2026/04/25/transformer-foundation/"
categories: ["人工智能", "笔记"]
tags: ["大模型", "Transformer", "Attention", "学习笔记"]
summary: "用数据流解释 Transformer：Token、Embedding、Attention、FFN、残差连接、Norm、LM Head 分别在模型里做什么。"
comments: true
render_with_liquid: false
---

# Transformer：大模型的共同底座

## 一句话总结

Transformer 可以理解成一套反复堆叠的处理流程：先让 Token 之间通过 Attention 交换信息，再用 FFN 对每个 Token 的表示做深度加工，中间通过残差连接和归一化保证信息与数值稳定。

## 我一开始的问题

我问过一个问题：

> 大模型的基础架构都一样吗？

答案是：不完全一样，但很多现代大模型都以 Transformer 为核心骨架。

这句话如果停在这里，其实没有太大帮助。因为我真正想知道的是：Transformer 里面到底发生了什么？

## 先从数据流看

假设我输入一句话：

```text
大模型很有意思
```

模型不会直接理解汉字。它需要先把文字变成数字，再让数字在网络里一层一层流动。

一个简化流程是：

```text
文字
  -> Tokenizer
  -> Token ID
  -> Embedding
  -> Transformer Block x N
  -> LM Head
  -> Softmax
  -> 下一个 Token
```

这里每一步都有明确作用。

## Tokenizer：把文字切成模型能处理的单位

Tokenizer 会把文字切成 Token。Token 可以是一个字、一个词、一个子词，也可能是某个字节片段。

模型真正处理的不是“文字”，而是 Token 对应的编号。

```text
"大模型很有意思"
  -> ["大", "模型", "很", "有意思"]
  -> [id1, id2, id3, id4]
```

这个例子只是示意，真实 Tokenizer 的切分方式取决于词表和算法。

## Embedding：把编号变成向量

Token ID 本身只是编号，没有语义距离。

Embedding 层会把每个 Token ID 映射成一个向量。这个向量才是后续计算真正处理的对象。

```text
Token ID
  -> [0.12, -0.35, 0.08, ...]
```

从这里开始，文字就变成了高维空间里的数字。

## Transformer Block：核心处理单元

Transformer Block 会重复堆叠很多层。每一层大致包含：

```text
输入向量
  -> Norm
  -> Attention
  -> 残差连接
  -> Norm
  -> FFN
  -> 残差连接
  -> 输出向量
```

不同模型会有细节差异，比如 Norm 的位置、注意力机制的变体、FFN 是否被 MoE 替代。但这条主线对理解很有帮助。

## Attention：让 Token 之间互相看见

Attention 解决的问题是：当前 Token 理解自己时，应该参考上下文里的哪些 Token？

比如一句话：

```text
我把苹果放进书包，因为它很重。
```

“它”到底指什么，需要看上下文。Attention 的作用就是让每个 Token 根据当前语境，从其他 Token 那里拿到相关信息。

我给自己的简化理解是：

> Attention 是信息调度层。它负责决定不同 Token 之间怎么交换信息。

## FFN：对每个 Token 做深度加工

Attention 之后，每个 Token 已经聚合了一些上下文信息。FFN 会对每个位置的向量单独加工。

典型 FFN 可以理解成：

```text
输入向量
  -> 升维
  -> 激活函数
  -> 降维
  -> 输出向量
```

它不像 Attention 那样让 Token 之间互相通信，而是对每个 Token 自己的表示做非线性变换。

我给自己的简化理解是：

> Attention 负责“看别人”，FFN 负责“加工自己”。

## 残差连接：保留原始信息

Transformer 很深，如果每一层都完全覆盖上一层的信息，训练会很困难，信息也容易在深层传播中丢失。

残差连接的做法是：子层算完之后，把原来的输入加回来。

```text
输出 = 输入 + 子层处理结果
```

这像是在保留底稿的基础上叠加修改意见，而不是每次都重写。

## Norm：让数值保持稳定

Norm 层的作用不是产生新知识，而是稳定数值范围。

如果向量里的数字在层层计算中越来越大或越来越小，训练和推理都会变得不稳定。LayerNorm、RMSNorm 这类结构就是为了解决这个问题。

我给自己的简化理解是：

> Norm 是数据流里的稳压器。

## LM Head 和 Softmax：把向量变回词表概率

经过很多层 Transformer Block 以后，模型得到最后一层的向量表示。

LM Head 会把这个向量映射到整个词表上，得到每个 Token 的分数。Softmax 再把分数转成概率。

```text
最终向量
  -> 词表中每个 Token 的分数
  -> 每个 Token 的概率
  -> 选择或采样下一个 Token
```

这就是为什么语言模型本质上是在反复做一件事：

> 根据已有上下文，预测下一个 Token。

## 一张简化图

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
+-----------------------------+
| Transformer Block x N       |
|                             |
|  Norm                       |
|   -> Attention              |
|   -> Residual Add           |
|  Norm                       |
|   -> FFN / MoE              |
|   -> Residual Add           |
+-----------------------------+
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

## 容易误解的地方

第一，Transformer 不是只有 Attention。Attention 很重要，但 FFN、残差连接、Norm 也同样关键。

第二，模型不是一次生成完整回答。它通常是一个 Token 一个 Token 地生成。

第三，Embedding 不是简单字典翻译。它是把 Token 放进一个可训练的高维向量空间。

第四，FFN 不只是“附属层”。它占据大量参数，也和模型知识表示密切相关。

## 这一篇我真正理解了什么

如果以后我忘了 Transformer 的结构，我只需要回到这条数据流：

```text
Token
  -> Embedding
  -> Attention 交换上下文信息
  -> FFN 加工每个 Token
  -> Norm 稳定数值
  -> Residual 保留信息
  -> LM Head 预测下一个 Token
```

## 参考来源

- Transformer: https://arxiv.org/abs/1706.03762
- GPT-3: https://openai.com/index/language-models-are-few-shot-learners/
- RMSNorm: https://arxiv.org/abs/1910.07467


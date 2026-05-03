---
layout: "post"
title: "AlphaEvolve 正在变成一种科研方法论吗"
date: "2026-05-03 18:50:00 +0800"
author: "zhanlutuzi"
permalink: "/2026/05/03/alphaevolve-research-method/"
categories: ["人工智能", "笔记"]
tags: ["AlphaEvolve", "AI Agent", "科学发现", "程序搜索", "科研方法", "学习笔记"]
summary: "从 Persona Generators 和石头剪刀布行为建模两篇研究出发，理解 AlphaEvolve 为什么正在从算法优化工具变成一种可复用的科研工作流，以及这套范式的边界。"
comments: true
render_with_liquid: false
---

今天看到两篇研究都把 AlphaEvolve 放在核心算法开发流程里，我的第一反应是：

> 这会不会不只是巧合，而是一个新的科研套路正在成形？

一篇是 [Persona Generators: Generating Diverse Synthetic Personas at Scale](https://arxiv.org/abs/2602.03545)，它用 AlphaEvolve 优化“生成人格的代码”，目标是让合成用户覆盖更丰富、更长尾的态度和行为组合。

另一篇是 [Discovering Differences in Strategic Behavior Between Humans and LLMs](https://arxiv.org/abs/2602.10324)，它用 AlphaEvolve 从迭代石头剪刀布数据里发现可解释的行为模型，比较人类和 LLM 的策略结构差异。

这两个题目表面上差很远。

一个在做 synthetic personas，一个在做行为博弈建模。一个关心“怎么生成更多样的人”，一个关心“怎么解释人和模型的策略差异”。但它们采用的底层动作非常像：

```text
先把研究问题改写成一个可评分的程序搜索问题
  -> 让 LLM 提出代码修改
  -> 用自动评估器给代码打分
  -> 保留更好的程序
  -> 继续进化
  -> 最后得到一个可读、可复用、可再次运行的程序
```

我觉得这里真正值得注意的不是“AlphaEvolve 又被用了两次”，而是研究者开始把它当成一种通用工作流：

> 不直接找答案，而是进化出一个能持续产生答案、解释答案或改进答案的程序。

这件事比“AI 帮我写代码”要深一层。

## AlphaEvolve 到底改变了什么

AlphaEvolve 最初由 Google DeepMind 在 2025 年公开，论文题目是 [AlphaEvolve: A coding agent for scientific and algorithmic discovery](https://arxiv.org/abs/2506.13131)。它的核心不是让 LLM 一次性写出正确答案，而是把 LLM 放进一个进化循环里。

简化后可以理解成：

```text
初始程序
  -> LLM 生成修改
  -> 执行候选程序
  -> 自动评估正确性 / 性能 / 复杂度 / 多目标指标
  -> 把高分程序存进程序数据库
  -> 从高分程序继续变异、组合、改写
```

这个范式继承了 [FunSearch](https://www.nature.com/articles/s41586-023-06924-6) 的重要思想：搜索的不是一个静态答案，而是一个能构造答案的函数。FunSearch 用这种方式在 cap set 和 online bin packing 上做出过发现。AlphaEvolve 则把范围推大了：它不只进化一个小函数，还可以改更复杂的代码结构，目标也可以是运行时、硬件验证、数学构造、工程指标等。

DeepMind 自己给出的案例很硬：AlphaEvolve 优化过 Google 数据中心调度，在生产中平均回收 0.7% 的 fleet-wide compute resources；优化 Gemini 训练中的矩阵乘 kernel，带来 23% kernel speedup 和约 1% 训练时间降低；还发现了用 48 次标量乘法计算 4x4 复数矩阵乘法的算法，改进了这个设置下长期沿用的 Strassen 路线。

这解释了为什么大家会被它吸引。

它不是一个“会聊天的研究助手”，而更像一个自动化实验员：

```text
人类负责定义问题、写评估器、判断结果是否有意义
机器负责在巨大程序空间里持续试错
```

这个分工很关键。它绕开了 LLM 最容易出问题的地方，也就是空口生成一个听起来合理但没有验证的结论。AlphaEvolve 的答案必须落到代码里，代码必须跑，跑完必须被打分。

## 这两篇论文为什么都适合 AlphaEvolve

回到今天看到的两篇研究，它们共同面对的不是“缺少一个聪明想法”，而是“可能的设计空间太大”。

Persona Generators 想解决的问题是：普通 LLM 生成 synthetic personas 时，很容易生成中庸、刻板、集中在高概率区域的人格。可是在压力测试、安全评估、未来场景推演里，真正重要的往往是长尾人群和罕见组合。

所以它把目标从 density matching 改成 support coverage：

```text
不是复刻平均用户
而是覆盖尽可能完整的人类态度、偏好和行为空间
```

这个目标可以被量化。论文用 coverage、convex hull volume、pairwise distance、dispersion、KL divergence 等指标评估生成群体的多样性。于是问题就变成：

```text
给定一个问卷场景和若干多样性轴
怎样写一个 Persona Generator
让它生成的人格回答后，在这些指标上尽可能覆盖空间？
```

AlphaEvolve 在这里进化的不是某一批 personas，而是生成 personas 的代码：包括 prompt 模板、采样逻辑、两阶段生成流程里的决策方式。论文里提到，他们用 10 个并行 island，跑 500 次迭代，最后得到的 generator 在 held-out questionnaires 上也比 Nemotron Personas、Concordia formative memory generator、name-only baseline 等基线覆盖得更好。

石头剪刀布那篇研究的结构也类似，只是“程序”的含义换了。

它不是让 AlphaEvolve 直接预测下一手，而是让它发现一个可解释的 Python 行为模型：

```text
当前自己的动作
当前对手动作
当前奖励
内部状态
  -> 更新内部状态
  -> 输出下一步动作概率
```

然后再用交叉验证似然衡量预测能力，用 Halstead effort 衡量程序复杂度，让结果形成预测性能和可解释性的 Pareto frontier。

这比单纯训练一个 RNN 更有研究价值。RNN 也许能拟合数据，但很难告诉我们“人和 LLM 的策略结构到底差在哪里”。AlphaEvolve 发现的程序至少是可读的，研究者可以分析里面是否有 value-based learning、opponent modeling、choice stickiness 等机制。

论文最后的有趣结论是：人类和前沿 LLM 都表现出价值学习和对手建模，但 Gemini 2.5 和 GPT 5.1 这类模型的 opponent modeling 更高维，能更快利用对手模式；人类和较弱模型则更像只追踪较浅的对手频率。

这里最值得写进笔记的一点是：

> AlphaEvolve 不是替研究者解释结果，而是生成一批可以被研究者解释的候选机制。

这个差别很重要。

## 进化的不是答案，而是“生成答案的程序”

我现在会把这个趋势概括成一句话：

> 科研里的 AI 自动化，正在从生成文本，转向进化程序。

传统的 AI 辅助研究，大多像这样：

```text
帮我读论文
帮我想假设
帮我写代码
帮我总结结果
```

AlphaEvolve 这类方法更像这样：

```text
我写一个评估器
我定义什么叫好
我给一个初始程序
你在程序空间里搜索
把能通过评估的程序交回来
```

这就发生了一个关键转向。

过去我们常说“大模型会生成答案”。但在这些研究里，答案不是一次性文本，而是一段可以运行的代码。代码本身就是论文的研究对象，也是可复用的实验产物。

Persona Generators 的最终产物不是“一批多样 personas”，而是一个以后还能反复生成多样 personas 的 generator。

石头剪刀布行为建模的最终产物不是“一组预测结果”，而是一批可以拿来比较、解释、质疑的行为模型程序。

这就是元优化：

```text
不是优化输出
而是优化产生输出的机制
```

一旦把问题改写成这样，AlphaEvolve 就像一台通用的“程序假设搜索机”。它特别适合那些满足三个条件的问题：

| 条件 | 含义 |
|---|---|
| 目标能自动评分 | 有明确 evaluator，能快速判断候选程序好坏 |
| 解能用代码表达 | 生成器、启发式、模型结构、采样策略、实验流程都可以 |
| 搜索空间太大 | 人靠直觉设计容易卡在少数熟悉结构里 |

这也是为什么它不只出现在这两篇论文里。

2025 年 10 月的 [DeepEvolve](https://arxiv.org/abs/2510.06056) 试图把 AlphaEvolve 式算法进化和 deep research 结合起来，补上外部知识检索、跨文件代码编辑和系统调试。

同月的 [CodeEvolve](https://arxiv.org/abs/2510.14150) 则走向开源框架方向，把 LLM 和 island-based genetic algorithm 结合起来，在 AlphaEvolve 相关 benchmark 上做复现、比较和工程化。

2025 年 11 月的 [Mathematical exploration and discovery at scale](https://arxiv.org/abs/2511.02864) 直接把 AlphaEvolve 用在 67 个数学问题上，覆盖 analysis、combinatorics、geometry、number theory，并尝试结合 Deep Think 和 AlphaProof。

2026 年 1 月的 [Magellan](https://arxiv.org/abs/2601.21096) 把它用于编译器优化启发式，进化可执行的 C++ decision logic，用在 LLVM inlining、register allocation、XLA 等场景。

2026 年 2 月的 [DeltaEvolve](https://arxiv.org/abs/2602.02919)、[AdaEvolve](https://arxiv.org/abs/2602.20133)、[EvoX](https://arxiv.org/abs/2602.23413) 则开始反过来改进这类进化系统本身：怎么组织历史程序，怎么分配搜索资源，怎么让进化策略自己适应任务。

同月还有 [Discovering Multiagent Learning Algorithms with Large Language Models](https://arxiv.org/abs/2602.16928)，直接提出用 AlphaEvolve 自动发现多智能体学习算法，进化 CFR 和 PSRO 的新变体。

这已经不是孤立案例，而是一条很清楚的研究线：

```text
AlphaTensor
  -> FunSearch
  -> AlphaEvolve
  -> 各领域直接套用
  -> 开源复现与替代框架
  -> 对进化机制本身做二次优化
```

所以我会说：是的，这是趋势。

但更准确地说，它不是“大家都会用 AlphaEvolve 这个具体系统”，而是“LLM + evolutionary search + executable evaluator”正在变成一种可迁移的科研范式。

## 但它不是万能科研机器

这个趋势容易被讲得太激动，好像以后只要写一个评分函数，科学发现就能自动发生。

我觉得这里要冷静一点。

AlphaEvolve 的强项，也是它的边界：它依赖自动评估。

如果一个问题很难自动评分，它就很难发挥作用。比如一个社会科学解释是否“有意义”，一个心理机制是否“真实”，一个生成结果是否“不会误导决策”，这些都不是单一指标能完全覆盖的。

Persona Generators 那篇论文自己也承认，问卷多样性不等于开放互动里的真实行为多样性。一个 persona 在量表上覆盖了某个极端位置，不代表它在长期对话、冲突协商、真实产品使用里就会表现出对应行为。

石头剪刀布行为建模那篇也很谨慎：AlphaEvolve 发现的程序是被数据支持的 mechanistic hypotheses，不等于真实因果机制。一个程序能预测行为，不代表人类或 LLM 内部真的按这段程序在思考。

所以这类方法最危险的地方不是“搜索不够强”，而是“评估器骗过了我们”。

一旦指标写窄了，AlphaEvolve 很可能找到的不是科学发现，而是指标漏洞。它会非常努力地优化你给它的分数，而不是你心里真正想要的东西。

这意味着未来研究者的工作不会消失，只是重点变了：

```text
以前：手工设计一个模型或算法
现在：设计搜索空间、评估器、约束条件和解释标准
```

写 evaluator 变成了写假设。

选择程序表示变成了选择理论语言。

解释 Pareto frontier 变成了新的分析工作。

这可能才是 AlphaEvolve 类方法真正带来的改变：它没有让科研变成一键生成，而是把科研里的“手工构造”部分，推向了“自动搜索 + 人类判读”的组合。

## 我会怎样判断一个问题适不适合套这套范式

以后如果再看到一篇论文说自己用了 AlphaEvolve，或者用了类似的 LLM evolutionary coding agent，我会先问几个问题。

第一，评分函数是不是可信？

如果 evaluator 能严格验证正确性，比如数学构造、编译器性能、硬件功能等，可信度会高很多。如果 evaluator 只是另一个 LLM judge，或者只是粗糙代理指标，那就要小心。

第二，候选程序是不是可执行、可复验？

这类方法的价值在于程序能跑、能测、能复用。如果最终只展示几段漂亮伪代码，或者数据和程序都不公开，那科学价值会打折。

第三，搜索空间有没有被合理限制？

搜索空间太小，结果可能只是人工模板的小改动。搜索空间太大，评估成本和错误率会爆炸。好的论文通常会解释自己为什么固定某些结构，又为什么允许模型修改某些部分。

第四，研究者有没有分析失败模式？

只给最优结果不够。更有价值的是看进化过程淘汰了什么、保留了什么、哪些指标互相冲突、哪些解虽然高分但不可解释。

第五，最终产物是“一次性答案”还是“可复用机制”？

我更看重后者。一个可复用 generator、heuristic、model class、solver，比一次 benchmark 上的高分更说明问题。

## 这篇文章的结论

今天这两篇研究让我感觉，AlphaEvolve 正在从一个算法优化工具，变成一种研究者可以借用的方法论。

但我不想把它理解成“AI 自动做科学”。更准确的理解应该是：

> 当一个研究问题可以被写成可执行程序，并且可以被自动评估时，LLM 驱动的进化搜索会成为一种新的研究放大器。

它放大的不是纯粹的模型聪明程度，而是一个闭环：

```text
人类提出问题
人类定义可检验目标
机器大规模生成和变异程序
评估器筛选候选
人类解释、验证、修正目标
```

这个闭环一旦跑起来，研究者的直觉就不再只体现在“我想到一个模型”，也体现在“我如何设计一个能逼出好模型的环境”。

所以我会把 AlphaEvolve 放在一个更大的趋势里看：

```text
AI 不是只生成结论
AI 开始生成可检验的程序假设
科研开始从手工构造模型
转向设计能自动产生模型的搜索系统
```

这大概就是我今天从这两篇论文里看到的变化。

不是每个领域都能立刻套用。

但凡是目标能打分、解能写成代码、搜索空间又大到人类直觉不够用的地方，这套范式都会越来越常见。

## 参考资料

- [AlphaEvolve: A coding agent for scientific and algorithmic discovery](https://arxiv.org/abs/2506.13131)
- [Google DeepMind: AlphaEvolve, a Gemini-powered coding agent for designing advanced algorithms](https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/)
- [Discovering faster matrix multiplication algorithms with reinforcement learning](https://www.nature.com/articles/s41586-022-05172-4)
- [Mathematical discoveries from program search with large language models](https://www.nature.com/articles/s41586-023-06924-6)
- [Persona Generators: Generating Diverse Synthetic Personas at Scale](https://arxiv.org/abs/2602.03545)
- [Discovering Differences in Strategic Behavior Between Humans and LLMs](https://arxiv.org/abs/2602.10324)
- [Scientific Algorithm Discovery by Augmenting AlphaEvolve with Deep Research](https://arxiv.org/abs/2510.06056)
- [CodeEvolve: an open source evolutionary coding agent for algorithmic discovery and optimization](https://arxiv.org/abs/2510.14150)
- [Mathematical exploration and discovery at scale](https://arxiv.org/abs/2511.02864)
- [Magellan: Autonomous Discovery of Novel Compiler Optimization Heuristics with AlphaEvolve](https://arxiv.org/abs/2601.21096)
- [DeltaEvolve: Accelerating Scientific Discovery through Momentum-Driven Evolution](https://arxiv.org/abs/2602.02919)
- [AdaEvolve: Adaptive LLM Driven Zeroth-Order Optimization](https://arxiv.org/abs/2602.20133)
- [EvoX: Meta-Evolution for Automated Discovery](https://arxiv.org/abs/2602.23413)
- [Discovering Multiagent Learning Algorithms with Large Language Models](https://arxiv.org/abs/2602.16928)

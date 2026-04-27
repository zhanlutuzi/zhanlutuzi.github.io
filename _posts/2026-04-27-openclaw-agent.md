---
layout: "post"
title: "OpenClaw 与 Hermes Agent：AI 助理真正开始碰你的电脑之后"
date: "2026-04-27 14:16:00 +0800"
author: "zhanlutuzi"
permalink: "/2026/04/27/openclaw-agent/"
categories: ["人工智能", "笔记"]
tags: ["OpenClaw", "Hermes Agent", "AI Agent", "OpenAI", "开源项目", "安全", "学习笔记"]
summary: "从 OpenClaw 的起源、Gateway 架构、SOUL.md、养虾热、安全事故、OpenAI 介入，到 Hermes Agent 的自进化运行时，重新理解个人 AI 助理的机会和代价。"
comments: true
render_with_liquid: false
---

我最开始看 OpenClaw 的时候，以为自己在研究一个很火的开源 AI Agent。

看完一圈之后，我发现这个问题问浅了。

OpenClaw 值得研究，不只是因为它 Star 涨得快，也不是因为它接了很多聊天软件。它真正有意思的地方在于：它把“AI 助理”从一个聊天框，推到了一个更危险、也更有想象力的位置。

以前的 AI 助理大多在回答问题。

OpenClaw 想做的是另一件事：

```text
我在任何常用入口里发一句话
  -> 本地或自托管的 Gateway 收到指令
  -> 调用模型理解意图
  -> 调用工具、技能、浏览器、文件系统、消息渠道
  -> 在真实环境里完成动作
  -> 把结果回给我
```

这一步很关键。

当 AI 只是聊天时，它犯错的代价通常是“误导我”。当 AI 开始读文件、写文件、跑命令、发消息、连浏览器、连邮箱、连云服务时，它犯错的代价就变成了“替我做了不该做的事”。

这篇文章想回答的不是“OpenClaw 好不好用”，而是更底层的问题：

> 当 AI 从回答问题走向替人行动，一个个人助理系统到底应该长什么样？

OpenClaw 给出的答案是“本地优先的执行网关”。

Hermes Agent 给出的答案是“会自我学习的个人运行时”。

这两个答案放在一起，正好构成了 2026 年 AI Agent 领域最有代表性的分叉。

## OpenClaw 不是聊天机器人，而是控制平面

OpenClaw 官方 README 里有一句话很重要：

> The Gateway is just the control plane — the product is the assistant.

这句话基本说清楚了 OpenClaw 的设计哲学。

它不是要做一个更好看的聊天 App，而是要做一个长期运行的控制平面。Telegram、WhatsApp、Slack、Discord、Signal、iMessage、微信、QQ、Matrix、Teams、Feishu 这些入口，都只是“你给助理发指令的地方”。真正的核心是后面的 Gateway。

一个简化版的数据流是这样的：

```text
消息渠道
  -> Gateway
      -> 身份验证 / pairing
      -> 会话路由
      -> Agent 选择
      -> 工具权限检查
      -> 技能执行
      -> 文件 / 浏览器 / 终端 / 其他服务
  -> 结果回到原消息渠道
```

这解释了为什么 OpenClaw 会打动技术用户。

传统 AI 产品的交互逻辑是：

```text
我去找 AI
  -> 打开 ChatGPT / Claude / 网页工具
  -> 复制上下文
  -> 得到结果
  -> 再回到自己的工作流
```

OpenClaw 的逻辑是反过来的：

```text
AI 在我已经在的地方等我
  -> 我在 Telegram / Slack / 手机消息里发一句话
  -> 任务在后台执行
  -> 结果回到当前入口
```

这个“位置翻转”很重要。

AI 不再是一个我要切过去使用的 App，而是环境的一部分。它像一个常驻后台的个人自动化层，随时监听、调度、执行、回报。

所以 OpenClaw 的核心不是“聊天”，而是“执行”。这也是它和许多 AI 应用最本质的区别。

## 为什么是 Peter Steinberger

OpenClaw 的故事不能只从代码讲起，也要从 Peter Steinberger 这个人讲起。

他之前最重要的作品不是 AI，而是 PSPDFKit。那是一个 PDF 处理 SDK，一个听起来不性感、但工程难度极高的领域。PDF 的复杂性在于它不是一种干净的现代格式，而是一堆历史包袱、边缘案例、性能约束和兼容性问题的集合。

能把 PDF 渲染、标注、搜索、移动端性能、企业级稳定性做到全球大量公司可用，这背后需要的不是“做一个酷 demo”的能力，而是长期处理脏问题、边界问题和工程细节的能力。

这段经历放到 OpenClaw 上，就能看出一种连续性。

OpenClaw 表面上是 AI Agent，底层却不是单纯的模型调用问题。它真正困难的部分在于：

```text
多渠道消息怎么统一
本地 Gateway 怎么长期运行
工具权限怎么控制
不同模型怎么切换
文件和记忆怎么持久化
出错后怎么追踪
新手怎么上手
安全默认值怎么设计
社区技能怎么治理
```

这不是一个“会写 prompt”的人就能长期推进的项目。它更接近基础设施工程。

也因此，Peter Steinberger 的背景很关键：他不是从聊天机器人出发，而是从“长期可用的复杂工具”出发。PSPDFKit 是把复杂文档能力封装成开发者可用的基础设施；OpenClaw 则像是把 AI 执行能力封装成个人可用的基础设施。

从这个角度看，OpenClaw 不是凭空冒出来的爆款，而是一个工程师在 AI 浪潮里继续做自己擅长的事：

> 把复杂能力变成可运行、可扩展、可被别人接入的系统。

## 从 Clawdbot 到 OpenClaw：个人项目突然长大

研究报告里最有价值的一条线，是 OpenClaw 的纵向演化。

它最初并不叫 OpenClaw，而是 Clawdbot。早期形态非常朴素：接入消息渠道，执行命令，把 AI 放到用户已经在用的通信入口里。这个阶段没有完整的品牌叙事，也没有基金会、商业化、企业功能、治理结构。

它更像一个工程师自己的实验。

但 AI Agent 这个时代背景让它很快失控。2025 年底到 2026 年初，大模型的工具调用能力、上下文长度、API 成本和社区热情都到了一个临界点。用户已经不满足于“AI 能写一段话”，开始期待“AI 能替我跑一串动作”。

于是 Clawdbot 的叙事击中了一个非常具体的需求：

```text
我不想每次打开一个新 AI App
我不想把所有数据交给云端平台
我不想被某一个模型绑定
我想要一个能运行在自己机器上的助理
我想要它能真的执行任务
```

这个需求在 Hacker News、GitHub、X、中文技术圈里都很容易扩散，因为它同时满足了三种情绪：

```text
效率焦虑：我想让 AI 真的帮我做事
控制焦虑：我不想把数据和权限都交给大厂
技术兴奋：我终于能搭一个自己的 Jarvis
```

然后项目开始迅速从个人实验变成公共事件。

名称也开始变成问题。Clawdbot、Moltbot、OpenClaw 的连续变化，表面上是商标和品牌问题，实际反映的是一个更大的转变：

> 当项目还小时，名字只是名字；当项目突然成为赛道符号，名字就变成资产、攻击面和社区认同。

研究报告里还提到改名期间出现的抢注、仿冒、代币骗局等事件。这里不需要展开八卦，重点是这个现象本身：一个开源项目一旦变成热点，它面对的就不再只是 issue 和 pull request，而是法务、骗局、舆论、供应链攻击、教程生态和商业投机。

OpenClaw 的第一次成长，不是技术成长，而是从“个人仓库”长成了“公共基础设施苗头”。

## SOUL.md：把“人格”和“记忆”暴露成文件

OpenClaw 里最值得细看的设计，不只是 Gateway，还有 SOUL.md。

研究报告里提到用户问过一个问题：OpenClaw 的 SOUL.md 是怎么更新的？是不是要用户手动长期维护？

这个问题非常重要，因为它触到了 OpenClaw 的原理层。

可以先把 OpenClaw 的记忆和人格粗略理解成几类文件：

```text
SOUL.md
  -> Agent 的人格、语调、行为边界

USER.md
  -> 用户是谁、偏好是什么、长期背景是什么

MEMORY.md
  -> 交互中积累下来的长期记忆

Skills / SKILL.md
  -> 可复用的任务处理方法
```

这套设计的关键，不是“用了 Markdown”这么简单，而是它把很多 AI 产品藏起来的东西显性化了。

在大多数云端 AI 产品里，System Prompt 是平台掌控的，用户看不到完整结构，也无法直接维护。用户只能通过聊天告诉 AI 自己的偏好，或者在设置页里写几句自定义指令。

OpenClaw 的思路更接近：

```text
人格是一份文件
记忆是一份文件
技能是一组文件
这些文件可以被人读、被人改、被版本管理
```

这很工程师，也很开源。

它的好处是透明。你可以打开文件看 Agent “以为自己是谁”，看它记住了什么，也可以用 Git 管理修改历史。

它的坏处是维护成本高。一个真正好用的个人 Agent，不是装完就自动变聪明。用户需要持续修正人格、补充偏好、清理错误记忆、整理技能边界。这也是“养虾”这个说法为什么会流行：它不是买一个工具，而是在养一个长期运行的系统。

理论上，OpenClaw 也可以让 Agent 自己提出或写入修改。例如它在长期互动中发现某条人格设定不合适，或者某个偏好需要固化。但现实中，这类机制很难完全自动化，因为自动写入本身就是风险：

```text
如果 Agent 总结错了怎么办？
如果它把一次偶然偏好固化成长期偏好怎么办？
如果恶意技能诱导它改写人格边界怎么办？
如果半途中断导致文件写坏怎么办？
```

所以 OpenClaw 的记忆哲学其实是保守的：

> 让人格和记忆可见、可改、可追踪，但不完全放任 Agent 自己进化。

这也为后面 Hermes Agent 的出现埋下了伏笔。

## 安全事故不是插曲，而是 Agent 时代的预演

OpenClaw 最不能轻描淡写的部分，是安全。

很多人讨论 AI Agent 安全时，容易把焦点放在“提示词注入”“越狱”“模型幻觉”上。但 OpenClaw 这类系统更现实的风险是权限。

如果一个 AI 只能聊天，它说错话最多误导你。

如果一个 AI 能运行在你的电脑或 VPS 上，连接消息渠道、读取配置、调用浏览器、执行脚本，它就变成了一个高价值入口。

安全问题可以拆成几层：

```text
入口层
  -> 谁能给 Agent 发消息？
  -> 陌生 DM 会不会被当成指令？
  -> pairing 和身份验证是否强制？

控制层
  -> Gateway 绑定在哪里？
  -> 是否只监听 loopback？
  -> 是否暴露到公网？
  -> WebSocket / RPC 是否有足够认证？

执行层
  -> 哪些工具可以直接运行？
  -> shell 命令是否需要确认？
  -> 文件系统权限边界在哪里？
  -> 浏览器自动化能访问哪些登录态？

供应链层
  -> Skills 从哪里安装？
  -> 是否存在 typosquatting？
  -> 社区技能有没有审计？
```

TechRadar 2026 年 4 月报道过 SecurityScorecard 对 OpenClaw 暴露实例的研究：他们识别出大量暴露在互联网上的 OpenClaw 部署，其中相当一部分控制面板可被公网访问，部分部署存在远程代码执行风险。另一个关于 ClawJacked 的报道也提到，OpenClaw 的本地 WebSocket / Gateway 认证如果处理不好，恶意网页可能成为攻击入口。

这些数字未来会变化，具体漏洞也会被修复。但结构性问题不会消失：

> Agent 越有用，就越需要权限；权限越大，它就越像攻击面。

这也是 OpenClaw 的“成人礼”。

早期默认配置、教程误导、用户把本地工具部署到 VPS、没有理解认证和绑定地址的差别，都会让“个人助理”变成“公网后门”。

这件事不能简单怪用户，也不能简单怪项目。它说明 AI Agent 正在进入一个新阶段：安装门槛低于安全理解门槛。

很多人可以跟着一键脚本把 Agent 跑起来，但并不知道这意味着什么：

```text
它是不是暴露在公网？
它有没有默认密码？
它能不能跑 shell？
它连了哪些 API Key？
它有没有读写我的消息历史？
它安装的技能来自哪里？
```

如果说 AutoGPT 时代的核心问题是“它到底能不能稳定完成任务”，那么 OpenClaw 时代的核心问题已经变成：

> 它能完成任务之后，怎么保证它不会越界？

## OpenAI 介入：背书，也制造张力

2026 年 2 月，Peter Steinberger 加入 OpenAI。TechCrunch 和 Forbes 都报道了这件事：OpenAI 招入 OpenClaw 创始人，OpenClaw 继续保持开源，并通过基金会等形式获得支持。

这一步对 OpenClaw 是强背书。

它说明一个事实：OpenAI 也认为个人 Agent 是下一阶段的重要方向。不是“聊天更聪明”那么简单，而是“AI 能持续存在于用户环境里，替用户执行任务”。

但这件事也制造了张力。

OpenClaw 最打动人的叙事是：

```text
本地优先
开源
可自托管
模型可替换
不被单一大厂控制
```

OpenAI 则是中心化大模型平台的代表。于是社区自然会问：

```text
OpenClaw 会不会逐渐偏向 OpenAI 生态？
基金会治理是否足够独立？
OpenAI 的赞助是资源，还是路线影响？
如果 OpenAI 自己做一个官方 Agent 框架，OpenClaw 怎么定位？
Peter 在 OpenAI 做 Agent，会不会同时成为 OpenClaw 的最大机会和最大风险？
```

研究报告里有一个判断很有意思：OpenClaw 最终可能变成 “Kubernetes for AI Agents”。

这个比喻不完美，但有启发。

Kubernetes 不是普通用户直接使用的产品，却成为云原生基础设施的事实标准。OpenClaw 如果走这条路，它未必需要成为大众消费 App，而是成为各类个人助理、企业 Agent、云厂商托管方案背后的开源底座。

但这条路也意味着它会被更多平台封装、托管、改造。越被封装，它越容易获得用户；越被封装，它越可能远离“本地优先”的原教旨精神。

这是 OpenClaw 的结构性悖论：

> 它靠反中心化叙事获得信任，却需要中心化机构的资源、云厂商的一键部署和模型供应商的算力来扩大影响。

## 中国市场的“养虾热”：热闹和真实价值要分开看

中文技术圈对 OpenClaw 的传播很有意思，“养虾”这个词本身就说明它不只是工具，而变成了一种社群行为。

研究报告里提到的几个现象值得保留：

```text
线下活动排队
知识星球和付费课出现
大量教程和部署指南传播
二手电脑、VPS、云服务借势营销
ClawHub 和技能市场的关注度上升
```

这类热潮里通常混着三种人：

```text
真实 Power User
  -> 真正在用 OpenClaw 自动化工作流
  -> 会维护 SOUL.md / MEMORY.md
  -> 会写或改 Skills
  -> 会处理安全配置

学习型用户
  -> 跟着教程部署
  -> 尝试几个任务
  -> 还没形成稳定使用场景

情绪型参与者
  -> Star 仓库
  -> 买课收藏
  -> 转发“AI 革命来了”
  -> 但没有真正把它纳入日常工作
```

这不是贬低。每一波技术热潮都会有这种分层。

关键是，退潮后留下来的是什么。

OpenClaw 的真实价值不是“每个人都应该养一只虾”。这句话很容易被过度营销。更准确的说法应该是：

> 对有明确重复性任务、愿意配置系统、理解权限边界、重视数据控制权的人，OpenClaw 可能是生产力工具；对普通用户，它很可能只是一个很酷但维护成本过高的玩具。

真正值得观察的指标也不是 GitHub Stars，而是：

```text
重度用户留存
ClawHub 技能调用量
真实自动化任务数量
企业或团队私有化部署案例
安全事故率是否下降
用户是否持续维护自己的记忆和技能
```

如果这些指标能留下来，OpenClaw 就有机会成为基础设施。

如果只剩下 Star 和教程，它就会变成又一个被热潮消费过的开源项目。

## Hermes Agent 出现后，问题变成了哲学分歧

Hermes Agent 不能从文章里删掉。它不是 OpenClaw 的普通竞品，而是对 OpenClaw 提出了一个非常关键的反问：

> 为什么个人 Agent 需要我一直手动维护？它不能自己从经验里长出来吗？

Hermes Agent 背后是 Nous Research。这个团队原本就和开源模型社区关系很深，Hermes 系列模型在 Hugging Face 和开源 LLM 圈里有基础。它们做 Agent，不是从“接消息渠道”开始，而是从“模型如何长期学习和复用经验”开始。

官方对 Hermes Agent 的定位很直白：

```text
The agent that grows with you.
```

它的核心不是 Gateway 广度，而是闭环学习。

一个简化对比：

```text
OpenClaw
  -> 控制中枢
  -> 多渠道接入
  -> 人工维护人格 / 记忆 / 技能为主
  -> 强调可控、可见、可编排

Hermes Agent
  -> 自进化运行时
  -> 持久记忆
  -> 自动从任务中生成和改进 Skills
  -> 强调越用越懂你、越用越会做
```

Hermes 的 README 和文档里反复强调几件事：

```text
内置 learning loop
从复杂任务中自动创建 skills
skills 在使用中自我改进
跨会话搜索和总结历史
用 Honcho 做用户建模
支持 Telegram / Discord / Slack / WhatsApp / Signal / CLI 等入口
支持 OpenRouter、Nous Portal、自定义 OpenAI-compatible endpoint
```

这和 OpenClaw 的 SOUL.md 形成了非常直接的对照。

OpenClaw 的人格和记忆更像“显式配置”：

```text
我写下我是谁
我写下我偏好什么
我整理它该记住什么
我安装或编写 Skills
```

Hermes 的愿景更像“经验沉淀”：

```text
它做了一次复杂任务
  -> 总结成功路径
  -> 生成可复用 Skill
  -> 下次自动调用
  -> 在调用中继续修正
  -> 长期形成对用户和任务的模型
```

如果 OpenClaw 是“我控制一个助理系统”，Hermes 更像“我养成一个会学习的伙伴”。

这不是功能差异，而是关系差异。

## Hermes 的吸引力和风险在同一个地方

Hermes 最吸引人的地方，是它解决了一个真实痛点：

> 每次打开 AI，我都要重新解释我是谁、我在做什么、我上次怎么做、我的偏好是什么。

如果一个 Agent 真的能长期记住这些，并从任务经验中自动形成技能，那么它的用户粘性会非常强。

用了两天的 Hermes 和用了两年的 Hermes，理论上不该是同一个产品。两年的 Hermes 应该更懂你的项目结构、写作风格、常用脚本、部署习惯、研究偏好和沟通方式。

这就是 Hermes 的天花板。

但它的风险也在这里。

自动学习系统最难的不是“能不能总结经验”，而是“能不能判断哪些经验值得固化”。如果 Agent 做错了，还把错误路径写成了 Skill，下次它可能更稳定地犯错。

这个问题可以叫：

```text
错误经验固化
```

它比普通幻觉更麻烦。

普通幻觉是一次性错误。错误经验固化则是把一次错误写进长期能力里，让系统以后反复调用。

所以 Hermes 需要解决几件非常难的问题：

```text
任务是否真的成功，谁来判断？
生成的新 Skill 是否需要用户确认？
旧 Skill 和新 Skill 冲突时怎么处理？
自动改进是否有版本回滚？
用户建模是否会过度推断？
敏感偏好和隐私信息是否会被永久化？
```

OpenClaw 通过人工维护绕开了一部分问题：慢，但可控。

Hermes 选择更激进的路：快，也更像真正的“成长型 Agent”，但质量控制难度更高。

这就是两者最核心的取舍：

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 基本隐喻 | 执行网关 / 控制平面 | 自进化运行时 |
| 核心价值 | 可控、可编排、多渠道、生态广 | 会学习、会沉淀、越用越个性化 |
| 记忆方式 | Markdown 文件显式维护为主 | 持久记忆、会话搜索、用户建模 |
| 技能方式 | 人工 Skills + 社区市场 | 自动生成和自我改进 Skills |
| 用户关系 | 我配置它、指挥它 | 我训练它、它跟我一起长 |
| 主要风险 | 配置复杂、安全责任重、维护成本高 | 错误经验固化、用户建模失真、自动改写难审计 |
| 适合用户 | Power User、企业私有化、自动化重度用户 | 想要长期个性化助理、愿意承担自学习不确定性的用户 |

短期看，它们更像互补而不是替代。

想要广度、稳定、多渠道和可控部署，OpenClaw 更合适。

想要长期记忆、自学习和个人化成长，Hermes 更值得关注。

中期看，如果 Hermes 解决了自进化质量保障，它会对 OpenClaw 形成很强压力。因为“越用越懂你”比“装更多 Skills”更容易形成用户粘性。

但如果 Hermes 不能解决错误固化和信任问题，它也可能变成一个看起来很聪明、但越用越难审计的黑箱。

## 横向看：OpenClaw、Hermes、Manus、Claude Code、AutoGPT

把几个主要项目放在一起，会更清楚它们各自“活成了什么样”。

| 项目 | 更像什么 | 核心吸引力 | 主要代价 |
|---|---|---|---|
| OpenClaw | 本地优先个人 Agent 控制平面 | 多渠道、可自托管、可编排、生态广 | 配置复杂，安全责任重，长期维护成本高 |
| Hermes Agent | 自进化个人运行时 | 自动沉淀经验、长期记忆、用户建模 | 错误经验固化和审计难题 |
| Manus | 云端托管 Agent 产品 | 上手快，普通用户友好，少维护 | 黑盒，数据和权限交给平台 |
| Claude Code | 面向代码库的终端助手 | 编程场景强，代码库理解和修改自然 | 主要是开发工具，不是全天候个人助理 |
| AutoGPT | 早期自主任务链实验 | 开创了“给目标自动拆任务”的想象 | 可靠性、成本和失控循环问题明显 |

OpenClaw 和 Manus 是两条产品路线的对照：

```text
OpenClaw
  -> 我愿意折腾
  -> 因为我要控制权

Manus
  -> 我不想折腾
  -> 因为我要马上得到结果
```

OpenClaw 和 Claude Code 是两种使用场景的对照：

```text
Claude Code
  -> 我的中心是代码库
  -> AI 是程序员搭档

OpenClaw
  -> 我的中心是个人工作流
  -> AI 是常驻自动化助理
```

OpenClaw 和 AutoGPT 是两代 Agent 思路的对照：

```text
AutoGPT
  -> 让模型自己循环规划和执行
  -> 演示感强，但可靠性容易崩

OpenClaw
  -> 把执行框架、渠道、技能、权限做成系统
  -> 不只追求自主性，而是追求可运行
```

OpenClaw 和 Hermes 则是最重要的对照：

```text
OpenClaw 问：
  如何让 AI 安全地连接我的世界？

Hermes 问：
  如何让 AI 从长期经验里长出自己的能力？
```

这两个问题最后会合流。未来成熟的个人 Agent 既要有 OpenClaw 的控制平面，也要有 Hermes 的经验沉淀能力。

## OpenClaw 的真实价值在哪里

研究报告后半部分有一个判断我觉得应该保留：

OpenClaw 的真实价值，不在热度最高的时候人们想象的“人人都养一只虾”，而在它证明了一种交互范式。

传统 AI 助理是：

```text
人去找 AI
```

OpenClaw 证明的是：

```text
AI 可以驻留在人的环境里
```

这件事的意义比 OpenClaw 自身成败更大。

即使 OpenClaw 未来不成为大众产品，它也已经把几个问题推到了行业面前：

```text
个人 Agent 应该运行在哪里？
本地优先和云端易用如何平衡？
长期记忆应该透明还是自动？
技能生态应该人工审计还是自动生成？
Agent 权限边界怎么设计？
多渠道入口如何做身份认证？
用户怎么知道 Agent 为什么这么做？
```

这些问题不会因为某一个项目退潮而消失。

## 我最后怎么判断

如果只看短期热度，OpenClaw 很容易被写成一个“爆款开源项目”的故事。

但我现在更愿意把它看成 AI Agent 进入执行阶段的样本。

它的成功说明：

```text
用户确实想要一个不只聊天的 AI
技术用户确实在意本地优先和控制权
多渠道常驻助理是有吸引力的交互范式
模型供应商会被 Agent 框架进一步商品化
```

它的危机也说明：

```text
执行能力越强，安全责任越重
本地部署不等于天然安全
开源热度不等于治理成熟
个人 Agent 的维护成本很容易被低估
```

Hermes Agent 的出现，则把问题继续往前推了一步。

OpenClaw 让 AI Agent “住进你的环境”。

Hermes 想让 AI Agent “从和你的相处里长出能力”。

这两件事如果合在一起，才接近我想象中的下一代个人 AI：

```text
它在我已经在的地方
它知道我的长期上下文
它能执行真实任务
它能解释自己为什么这么做
它能从经验中改进
它的权限边界清晰可控
它的记忆和技能可以审计、回滚、迁移
```

这也是我认为 OpenClaw 和 Hermes Agent 都值得继续看的原因。

一个代表执行网关，一个代表自进化运行时。

它们都还不成熟，但它们共同指向了同一个方向：

> AI 助理的竞争，正在从“谁回答得更好”，转向“谁能更安全、更长期、更可信地参与我的真实工作流”。

## 资料入口

- [OpenClaw GitHub README](https://github.com/openclaw/openclaw)：项目定位、Gateway、多渠道入口、当前功能和安全默认值。
- [OpenClaw Gateway 文档](https://docs.openclaw.ai/cli/gateway)：Gateway 运行方式、绑定模式、认证和诊断命令。
- [OpenClaw Gateway protocol](https://docs.openclaw.ai/gateway/protocol)：WebSocket 控制平面、角色、权限、认证和 pairing 机制。
- [TechCrunch: OpenClaw creator Peter Steinberger joins OpenAI](https://techcrunch.com/2026/02/15/openclaw-creator-peter-steinberger-joins-openai/)：Peter Steinberger 加入 OpenAI，以及 OpenClaw 保持开源的报道。
- [Forbes: OpenAI Hires OpenClaw Creator Peter Steinberger And Sets Up Foundation](https://www.forbes.com/sites/ronschmelzer/2026/02/16/openai-hires-openclaw-creator-peter-steinberger-and-sets-up-foundation/)：OpenAI、OpenClaw 和个人 Agent 方向的分析。
- [TechRadar: What is OpenClaw?](https://www.techradar.com/pro/what-is-openclaw)：OpenClaw 作为自托管 Agentic AI 系统的概览。
- [TechRadar: OpenClaw security exposure report](https://www.techradar.com/pro/security/the-math-is-simple-openclaw-trojan-horse-ai-agents-give-hackers-full-control-of-28-000-systems)：公网暴露实例和安全风险报道，具体数字随时间变化，本文只取其风险方向。
- [TechRadar: ClawJacked](https://www.techradar.com/pro/security/a-human-chosen-password-doesnt-stand-a-chance-openclaw-has-yet-another-major-security-flaw-heres-what-we-know-about-clawjacked)：OpenClaw Gateway / WebSocket 相关安全事件报道。
- [Hermes Agent GitHub README](https://github.com/NousResearch/hermes-agent)：Hermes Agent 的 self-improving、learning loop、skills、gateway 和部署能力。
- [Nous Research: Hermes Agent](https://nousresearch.com/hermes-agent/)：Hermes Agent 官方介绍。
- [Hermes Agent Docs](https://hermes-agent.nousresearch.com/docs/)：Hermes 的安装、记忆、skills、gateway、cron、工具和运行环境文档。

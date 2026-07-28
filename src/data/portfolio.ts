export type Link = {
  label: string;
  href: string;
  kind?: "video" | "link";
};

export type Project = {
  index: string;
  title: string;
  eyebrow: string;
  description: string;
  result: string;
  tags: string[];
  tone: "lime" | "blue" | "orange" | "ink";
  links: Link[];
};

export const experiences = [
  {
    period: "2026.05 — 至今",
    place: "北京",
    organization: "新东方教育科技集团 · 互联网中心",
    role: "AI 研发实习生",
    summary:
      "围绕课程内容生产，先处理基本单元“卡片”的反馈迭代，再在此基础上开发组课 Agent，并接入真实课程制作平台。",
    points: [
      "设计覆盖约 150 类课程卡片的反馈迭代系统，支持带意见重试、反馈汇总、优化建议与人工审核。",
      "基于 Pi Agent SDK 与 TypeScript 开发组课 Agent，将教师经验整理为组课 Skill，通过多轮对话完成课程规划与内容生成。",
      "将 Agent 生成内容写入教师账号下的可编辑课程草稿，使主要工作从手工搭建转为审核修改，制作时间缩短约 50%。",
    ],
  },
  {
    period: "2026.02 — 2026.04",
    place: "杭州",
    organization: "浙江精准学科技有限公司 · 产品部",
    role: "AI 产品经理实习生",
    summary:
      "参与 AI 教育机讲题模块的质量评测，把专家判断拆成可执行、可回归的自动化评测流程。",
    points: [
      "基于 50+ 份专家审核记录和讲题规范，建立结构化打标、测试集回归与 Badcase 定位流程。",
      "使用 Python 封装师生模拟对话与自动评测工具，将单轮评测由约 2 小时缩短至 10 分钟，通过率提升至 92%。",
    ],
  },
  {
    period: "2023.09 — 2025.12",
    place: "东京",
    organization: "LocationMind Inc · R&D Division",
    role: "AI 产品与研发实习生",
    summary:
      "从自然语言访问地理数据库出发，继续探索地理空间分析 Agent，最终将能力接入办公入口，形成数字员工原型。",
    points: [
      "提出动态 Schema Mapping 与人在环路澄清方法，Monkuu 在 KaggleDBQA 上达到 56.2% 准确率。",
      "基于 PocketFlow 与 ReAct 构建地理空间分析 Agent，并通过 QGIS-MCP 封装专业分析工具。",
      "探索 GeoClaw 数字员工，在 109 个真实任务上将准确率从 73% 提升至 95%。",
    ],
  },
];

export const projects: Project[] = [
  {
    index: "01",
    title: "课程生产 Agent",
    eyebrow: "真实业务 · Agent · Human-in-the-loop",
    description:
      "把教师的知识点、组课要求与历史经验组织成可执行的课程生产过程，让 Agent 生成课程草稿，而教师保留确认与修改权。",
    result: "从对话到业务平台草稿，完整接入真实课程制作链路。",
    tags: ["Pi Agent SDK", "TypeScript", "Skill", "业务系统集成"],
    tone: "lime",
    links: [],
  },
  {
    index: "02",
    title: "Monkuu",
    eyebrow: "NL2SQL · GeoAI · 第一作者论文",
    description:
      "让不熟悉 SQL 的用户直接询问地理数据库。系统通过动态 Schema Mapping 处理长模式，通过人在环路澄清空间语义。",
    result: "KaggleDBQA 56.2%，较当时最佳水平提升 13.8%。",
    tags: ["Python", "NL2SQL", "Human-in-the-loop", "GeoAI"],
    tone: "blue",
    links: [
      {
        label: "观看演示",
        href: "https://zhanlutuzi.oss-cn-shanghai.aliyuncs.com/NL2SQL.mp4",
        kind: "video",
      },
      {
        label: "阅读论文",
        href: "https://doi.org/10.1080/13658816.2025.2533322",
      },
    ],
  },
  {
    index: "03",
    title: "地理空间分析 Agent",
    eyebrow: "ReAct · QGIS-MCP · 复杂空间任务",
    description:
      "让 Agent 根据目标选择空间分析工具、处理执行错误，并把地图、图表与分析结果交还给用户。",
    result: "原型评测通过率 73.3%，为后续数字员工探索提供能力底座。",
    tags: ["PocketFlow", "ReAct", "QGIS-MCP", "评测"],
    tone: "orange",
    links: [
      {
        label: "观看演示",
        href: "https://zhanlutuzi.oss-cn-shanghai.aliyuncs.com/GISAgent.mp4",
        kind: "video",
      },
    ],
  },
  {
    index: "04",
    title: "GeoClaw 数字员工",
    eyebrow: "Agent · Slack Bot · CLI",
    description:
      "把地理分析能力从命令行带进办公入口，让用户通过对话提交任务，并在同一处获得结果。",
    result: "109 个真实任务上，准确率由 73% 提升至 95%。",
    tags: ["Python", "Slack Bot", "Tool Use", "CLI"],
    tone: "ink",
    links: [
      {
        label: "观看演示",
        href: "https://zhanlutuzi.oss-cn-shanghai.aliyuncs.com/GeoClaw.mp4",
        kind: "video",
      },
    ],
  },
];

export const personalWorks = [
  {
    title: "cc-daily-report",
    meta: "开源工具 · 2026",
    description:
      "自动收集 Claude Code 会话增量，形成每日回顾与 Morning Review，让高强度的人机协作留下可追溯的上下文。",
    href: "https://zhanlutuzi.github.io/cc-daily-report/index.zh-CN.html",
    label: "查看项目",
  },
  {
    title: "ADD",
    meta: "方法与 Skill · 2026",
    description:
      "把多个 Coding Agent 的协作问题重新理解为管理问题：独立工作区、文档通信、审查门禁和结构化交付。",
    href: "https://github.com/zhanlutuzi/agent-driven-dev",
    label: "GitHub",
  },
  {
    title: "UrbanComp 数字基础设施",
    meta: "长期维护 · 2023—至今",
    description:
      "为实验室搭建并维护 AI-Chat、官网、协作文档、私有存储、计算平台、论坛等 8+ 项服务。",
    href: "https://urbancomp.net/",
    label: "访问 UrbanComp",
  },
  {
    title: "Hot100 记忆计划",
    meta: "个人实验 · 2026",
    description:
      "把刷题从一次性完成改成按记忆状态安排复习，并用独立写对、磕绊写出和不会三种状态驱动计划。",
    href: "https://zhanlutuzi.github.io/hot100-memory-plan/",
    label: "在线使用",
  },
];

export const publications = [
  {
    year: "2025",
    role: "第一作者",
    title:
      "Monkuu: a LLM-powered natural language interface for geospatial databases with dynamic schema mapping",
    venue: "International Journal of Geographical Information Science",
    href: "https://doi.org/10.1080/13658816.2025.2533322",
  },
  {
    year: "2025",
    role: "参与论文",
    title:
      "LandGPT: a multimodal large language model for parcel-level land use classification with multi-source data",
    venue: "International Journal of Geographical Information Science",
    href: "https://doi.org/10.1080/13658816.2025.2506533",
  },
  {
    year: "2026",
    role: "参与论文",
    title:
      "MGIM: a masked modeling framework for land parcel-level Geo-Inference",
    venue: "International Journal of Geographical Information Science",
    href: "https://doi.org/10.1080/13658816.2026.2630403",
  },
  {
    year: "2026",
    role: "参与研究",
    title:
      "Breaking the black box: an interpretable machine learning model for global terrorism forecasting",
    venue: "International Journal of Digital Earth",
    href: "https://doi.org/10.1080/17538947.2026.2687356",
  },
];

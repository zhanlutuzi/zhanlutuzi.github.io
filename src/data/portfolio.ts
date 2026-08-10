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
  preview: string;
  duration: string;
  tags: string[];
  tone: "lime" | "blue" | "orange" | "ink";
  links: Link[];
};

export const experiences = [
  {
    period: "2026.05 — 至今",
    place: "北京",
    organization: "新东方教育科技集团",
    department: "互联网中心",
    role: "AI 产品研发实习生",
    summary:
      "面向互动卡片式课程的规模化生产，将教师组课方法沉淀为可复用 Skill，再由 Agent 生成可编辑课程草稿，并通过卡片级评测持续迭代。",
    points: [
      "基于 Pi Agent SDK 开发组课 Agent，设计需求澄清、课程规划、卡片生成与草稿写入流程，并接入真实课程制作平台。",
      "通过教研访谈、历史组课记录与教师提示词分析，将卡片规范、选卡逻辑和内容填写规则沉淀为可按学科加载的组课 Skill。",
      "设计卡片级 LLM-as-Judge 评测方案，记录教师修改形成失败样本；实际使用中使教师从手工搭建转为审核修改，制作时间缩短约 50%。",
    ],
  },
  {
    period: "2026.02 — 2026.04",
    place: "杭州",
    organization: "浙江精准学科技有限公司",
    department: "产品部",
    role: "AI 产品经理实习生",
    summary:
      "围绕 AI 教育机的讲题质量，建立从评测标准、Badcase 归因到自动化测试的迭代流程。",
    points: [
      "梳理 50+ 份专家审核记录和讲题规范，将质量拆解为引导、反馈、节奏、总结和陪伴感等维度，设计结构化打标口径。",
      "基于不同能力水平的模拟学生和真实题目定位规则及示例冲突，推动 Prompt 迭代，将小学数学场景通过率提升至 92%。",
      "对接提示词平台 API，封装师生模拟对话与自动评测工具，将单轮评测时间由约 2 小时缩短至 10 分钟。",
    ],
  },
  {
    period: "2023.09 — 2025.12",
    place: "东京",
    organization: "LocationMind Inc.",
    department: "R&D Division",
    role: "AI 产品与研发实习生",
    summary:
      "从自然语言访问地理数据库出发，继续探索地理空间分析 Agent，最终将能力接入办公入口，形成数字员工原型。",
    points: [
      "提出动态 Schema Mapping 与人在环路澄清方法，Monkuu 在 KaggleDBQA 上达到 56.2% 准确率，较当时最佳水平提升 13.8%，成果以第一作者发表于 IJGIS（SCI Q1）。",
      "基于 PocketFlow 与 ReAct 构建地理空间分析 Agent，并通过 QGIS-MCP 封装专业分析工具，原型评测通过率达 73.3%。",
      "探索 GeoClaw 数字员工，在 109 个真实任务上将准确率从 73% 提升至 95%。",
    ],
  },
];

export const education = [
  {
    degree: "工学硕士（在读）",
    period: "2024.09 — 2027.06",
    school: "中国地质大学（武汉）",
    field: "地理空间信息工程 · 211 院校",
    detail: "专业成绩前 5%；获校级一等奖学金。",
    jointProgram: {
      institution: "东京大学空间信息科学研究中心（CSIS）联合培养",
      institutionHref: "https://www.csis.u-tokyo.ac.jp/",
      advisor: "联培导师：柴崎亮介",
      advisorHref:
        "https://www.u-tokyo.ac.jp/focus/ja/people/people001890.html",
    },
  },
  {
    degree: "工学学士",
    period: "2020.09 — 2024.06",
    school: "中国地质大学（武汉）",
    field: "地理空间信息工程 · 211 院校",
    detail:
      "专业排名前 5%，保研；参与国家级大学生创新创业训练计划，获软件著作权与地大英才奖学金。",
    jointProgram: null,
  },
];

export const projects: Project[] = [
  {
    index: "01",
    title: "问空 Monkuu",
    eyebrow: "NL2SQL · GeoAI · 第一作者论文",
    description:
      "让不熟悉 SQL 的用户直接询问地理数据库。系统通过动态 Schema Mapping 处理长模式，通过人在环路澄清空间语义。",
    result: "KaggleDBQA 56.2%，较当时最佳水平提升 13.8%。",
    preview: "/project-monkuu.jpg",
    duration: "00:59",
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
    index: "02",
    title: "地理空间分析 Agent",
    eyebrow: "ReAct · QGIS-MCP · 复杂空间任务",
    description:
      "让 Agent 根据目标选择空间分析工具、处理执行错误，并把地图、图表与分析结果交还给用户。",
    result: "原型评测通过率 73.3%，为后续数字员工探索提供能力底座。",
    preview: "/project-gis-agent.jpg",
    duration: "04:51",
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
    index: "03",
    title: "GeoClaw 数字员工",
    eyebrow: "Agent · Slack Bot · CLI",
    description:
      "把地理分析能力从命令行带进办公入口，让用户通过对话提交任务，并在同一处获得结果。",
    result: "109 个真实任务上，准确率由 73% 提升至 95%。",
    preview: "/project-geoclaw.jpg",
    duration: "02:51",
    tags: ["Python", "Slack Bot", "Tool Use", "CLI"],
    tone: "lime",
    links: [
      {
        label: "观看演示",
        href: "https://zhanlutuzi.oss-cn-shanghai.aliyuncs.com/GeoClaw0810.mp4",
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

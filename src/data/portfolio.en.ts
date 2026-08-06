import type { Project } from "./portfolio";

export const experiences = [
  {
    period: "May 2026 — Present",
    place: "Beijing",
    organization: "New Oriental Education & Technology Group",
    department: "Internet Center",
    role: "AI Product Intern",
    summary:
      "Scaled the production of interactive card-based courses by turning teachers’ methods into reusable Skills, generating editable drafts with an Agent, and iterating through card-level evaluation.",
    points: [
      "Built a course-building Agent with Pi Agent SDK, covering requirement clarification, course planning, card generation, and draft creation on the live authoring platform.",
      "Analyzed interviews, historical course-building records, and teachers’ prompts to turn card rules, selection logic, and content requirements into subject-specific Skills.",
      "Designed a card-level LLM-as-Judge evaluation process and captured teacher edits as failure cases; shifted work from manual assembly to review and editing, cutting production time by about 50%.",
    ],
  },
  {
    period: "Feb 2026 — Apr 2026",
    place: "Hangzhou",
    organization: "Zhejiang Jingzhunxue Technology Co., Ltd.",
    department: "Product Department",
    role: "AI Product Manager Intern",
    summary:
      "Built an iteration process for an AI tutoring device, spanning evaluation criteria, bad-case diagnosis, prompt improvement, and automated testing.",
    points: [
      "Analyzed more than 50 expert review records and tutoring guidelines, breaking quality into guidance, feedback, pacing, summaries, and emotional support with structured labels.",
      "Used simulated students at different ability levels and real questions to diagnose conflicting rules and examples, helping raise the pass rate for primary-school math to 92%.",
      "Integrated with the prompt platform API and built dialogue-simulation and automated-evaluation tools, reducing one evaluation cycle from roughly two hours to ten minutes.",
    ],
  },
  {
    period: "Sep 2023 — Dec 2025",
    place: "Tokyo",
    organization: "LocationMind Inc.",
    department: "R&D Division",
    role: "AI Product & R&D Intern",
    summary:
      "Started with natural-language access to geospatial databases, expanded into geospatial analysis Agents, and eventually brought those capabilities into a workplace-facing digital employee prototype.",
    points: [
      "Proposed dynamic schema mapping and human-in-the-loop clarification; Monkuu achieved 56.2% accuracy on KaggleDBQA, 13.8 points above the previous best, and was published in IJGIS as a first-author paper.",
      "Built a geospatial analysis Agent with PocketFlow and ReAct, exposing professional tools through QGIS-MCP and reaching a 73.3% prototype evaluation pass rate.",
      "Developed the GeoClaw digital employee prototype and improved accuracy from 73% to 95% across 109 real-world tasks.",
    ],
  },
];

export const education = [
  {
    degree: "M.Eng. Candidate",
    period: "Sep 2024 — Jun 2027",
    school: "China University of Geosciences (Wuhan)",
    field: "Geospatial Information Engineering · Project 211 University",
    detail:
      "Top 5% in the program; recipient of the university First-Class Scholarship.",
    jointProgram: {
      institution:
        "Visiting Research Program, Center for Spatial Information Science (CSIS), The University of Tokyo",
      institutionHref: "https://www.csis.u-tokyo.ac.jp/",
      advisor: "Visiting-program advisor: Prof. Ryosuke Shibasaki",
      advisorHref:
        "https://www.u-tokyo.ac.jp/focus/ja/people/people001890.html",
    },
  },
  {
    degree: "B.Eng.",
    period: "Sep 2020 — Jun 2024",
    school: "China University of Geosciences (Wuhan)",
    field: "Geospatial Information Engineering · Project 211 University",
    detail:
      "Top 5% in the program and admitted to graduate study by recommendation; participated in a national undergraduate innovation program and received a software copyright and the CUG Talent Scholarship.",
    jointProgram: null,
  },
];

export const projects: Project[] = [
  {
    index: "01",
    title: "Monkuu",
    eyebrow: "NL2SQL · GeoAI · First-author paper",
    description:
      "A natural-language interface for people who do not write SQL. Dynamic schema mapping handles large schemas, while human-in-the-loop clarification resolves ambiguous spatial intent.",
    result:
      "56.2% on KaggleDBQA, 13.8 percentage points above the previous best result.",
    preview: "/project-monkuu.jpg",
    duration: "00:59",
    tags: ["Python", "NL2SQL", "Human-in-the-loop", "GeoAI"],
    tone: "blue",
    links: [
      {
        label: "Watch demo",
        href: "https://zhanlutuzi.oss-cn-shanghai.aliyuncs.com/NL2SQL.mp4",
        kind: "video",
      },
      {
        label: "Read paper",
        href: "https://doi.org/10.1080/13658816.2025.2533322",
      },
    ],
  },
  {
    index: "02",
    title: "Geospatial Analysis Agent",
    eyebrow: "ReAct · QGIS-MCP · Complex spatial tasks",
    description:
      "An Agent that selects spatial analysis tools, recovers from execution errors, and returns maps, charts, and analytical results to the user.",
    result:
      "73.3% prototype evaluation pass rate, establishing the capability base for later digital employee work.",
    preview: "/project-gis-agent.jpg",
    duration: "04:51",
    tags: ["PocketFlow", "ReAct", "QGIS-MCP", "Evaluation"],
    tone: "orange",
    links: [
      {
        label: "Watch demo",
        href: "https://zhanlutuzi.oss-cn-shanghai.aliyuncs.com/GISAgent.mp4",
        kind: "video",
      },
    ],
  },
  {
    index: "03",
    title: "GeoClaw Digital Employee",
    eyebrow: "Agent · Slack Bot · CLI",
    description:
      "A workplace interface that brings geospatial analysis out of the command line, allowing users to submit tasks and receive results through conversation.",
    result: "Accuracy improved from 73% to 95% across 109 real-world tasks.",
    preview: "/project-geoclaw.jpg",
    duration: "02:51",
    tags: ["Python", "Slack Bot", "Tool Use", "CLI"],
    tone: "lime",
    links: [
      {
        label: "Watch demo",
        href: "https://zhanlutuzi.oss-cn-shanghai.aliyuncs.com/GeoClaw.mp4",
        kind: "video",
      },
    ],
  },
];

export const personalWorks = [
  {
    title: "cc-daily-report",
    meta: "Open-source tool · 2026",
    description:
      "Collects incremental Claude Code conversations and turns them into a daily review and Morning Review, preserving context from intensive human–AI collaboration.",
    href: "https://zhanlutuzi.github.io/cc-daily-report/index.zh-CN.html",
    label: "View project",
  },
  {
    title: "ADD",
    meta: "Method & Skill · 2026",
    description:
      "Reframes multi-agent coding as a management problem built around isolated workspaces, document-based communication, review gates, and structured delivery.",
    href: "https://github.com/zhanlutuzi/agent-driven-dev",
    label: "GitHub",
  },
  {
    title: "UrbanComp Digital Infrastructure",
    meta: "Maintained since 2023",
    description:
      "Built and maintain more than eight services for the lab, including AI Chat, its website, collaborative documents, private storage, computing services, and a forum.",
    href: "https://urbancomp.net/",
    label: "Visit UrbanComp",
  },
  {
    title: "Hot 100 Memory Plan",
    meta: "Personal experiment · 2026",
    description:
      "Turns algorithm practice into spaced review, scheduling problems by whether I can solve them independently, with hesitation, or not yet.",
    href: "https://zhanlutuzi.github.io/hot100-memory-plan/",
    label: "Try it online",
  },
];

export const publications = [
  {
    year: "2025",
    role: "First author",
    title:
      "Monkuu: a LLM-powered natural language interface for geospatial databases with dynamic schema mapping",
    venue: "International Journal of Geographical Information Science",
    href: "https://doi.org/10.1080/13658816.2025.2533322",
  },
  {
    year: "2025",
    role: "Co-author",
    title:
      "LandGPT: a multimodal large language model for parcel-level land use classification with multi-source data",
    venue: "International Journal of Geographical Information Science",
    href: "https://doi.org/10.1080/13658816.2025.2506533",
  },
  {
    year: "2026",
    role: "Co-author",
    title:
      "MGIM: a masked modeling framework for land parcel-level Geo-Inference",
    venue: "International Journal of Geographical Information Science",
    href: "https://doi.org/10.1080/13658816.2026.2630403",
  },
  {
    year: "2026",
    role: "Research contributor",
    title:
      "Breaking the black box: an interpretable machine learning model for global terrorism forecasting",
    venue: "International Journal of Digital Earth",
    href: "https://doi.org/10.1080/17538947.2026.2687356",
  },
];

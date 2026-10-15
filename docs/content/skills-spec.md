# Skills 首版内容与排版

日期：2026-10-14。目标：让本科招生读者看出 Yuhan 用什么解决什么问题，展示已确认的技能和学习方式。

## 已确认的内容基础

- 最熟悉的语言：Java、Python；学校学习过 HTML、CSS、JavaScript。
- React 项目与系统开发使用过 AI 辅助；前端先有 Figma 草稿，再通过指令迭代；数据库先理清逻辑。
- 本轮用户补充：vibe coding、Onshape、Figma、GitHub、Android Studio、Visual Studio、JetBrains、PyCharm、Codex、Skills、spec coding 和网站代理。进一步确认 Onshape 用于机器人团队的 logo 设计、木材切割布局和 prototype。未推断切割设备类型。域名／发布工具按此前确认的 Cloudflare 与 Vercel 记录，不扩写为网络运维经验。
- Clinic：React、TypeScript、Spring Boot、PostgreSQL、Electron，现处管理员测试。
- ARDS：schema 设计、连接已有 annotation tool 的 pipeline、独立 judge prompt、指标与错误分析；导师提供工具、API、氧合筛选并帮助多标签适配。
- Muon：Python / FastAPI、Supabase 元数据、R2、Parquet / Polars；开发者自测。
- CNN：TensorFlow / Keras 复现代码、预处理、验证划分及评估代码；不展示未核验的 99%。

依据：用户已确认的经历、`projects-brief.md`、`project-source-review.md`、`digit-recognizer-notebook-review.md`。用户回复以 vibe coding 和工具使用为主，未逐项确认独立编写／调试能力；因此正文说明 AI 辅助与 spec 引导，框架仅表达项目使用经历。

## 视觉方案

复用用户已经认可的全站语言：paper #faf9f4、ink #11141c、green #17492d、accent #b53b24、muted #69707b、rule #d8d9d1。DM Serif Display 用于标题、DM Sans 用于正文；正文沿用 16–18px。

左对齐。顶部以 Java / Python 表达最熟悉的语言；主体用四个可选择的领域入口，对应右侧具体应用和项目依据。手机纵向排列，入口为两列。下方按用途展示工作台工具，再写清需求、AI 辅助实现和评估迭代的工作方式。

```text
Skills [现有栏目标题]

Most familiar    Java  /  Python     简短背景

Skills in practice
Programming       | 已选领域标题
Web & systems     | 使用过的工具
Data & storage    | 做过的具体事情
Research & eval   | 对应的项目依据 / Projects 入口

How I work
Understand the problem → Build with assistance → Check and refine
```

与既有页面比较：Academic 保留课程蜂窝，Projects 展示完整案例；Skills 使用技能领域与项目依据的映射，不复制蜂窝或堆放项目卡。四个领域不是步骤，不加装饰性编号；只有下方真实工作顺序使用有序列表。没有熟练度进度条、未经证实的 expert 标签或工具 logo 墙。

## 实现与验收

- 内容独立放在 `content/skills.ts`，组件与 CSS module 隔离。
- 四个领域按钮支持点击、键盘和触摸；选择态可见并带 `aria-pressed`，内容区由 `aria-controls` 关联。
- 内容切换只做轻量淡入，尊重 reduced motion；栏目进入、菜单与首页返回继续使用现有动效。
- 项目入口和 Academic 入口使用现有 `onNavigate`；修饰键保留普通链接行为。
- 替换 Skills 占位文案和配图，不增加路由、依赖或后端。
- 类型检查、生产构建、桌面与手机视觉／交互检查；保存实际截图。


## 分组彩色工具台更新（2026-10-14）

用户选择了三张视觉稿中先显示的 1 号，随后要求补充图标颜色。最终依据为 docs/design/skills-color-toolbench-reference.png。

- 保留全站米白、深绿与 DM Serif Display / DM Sans，工具使用品牌原色。
- 左侧 Programming / Interfaces / Data / Design 四组，每组两个可点图标；下方 Along the way 四个工具。右侧默认 Python，显示用途与真实项目依据。
- 独立的 content/skill-toolbench.ts 提供 12 个工具的短说明与依据，保留 AI 辅助、管理员测试、开发者测试的事实边界。原 content/skills.ts 继续提供学习方式与补充工具。
- 点击、Enter 或 Space 选择；每次只有一个 aria-pressed=true，状态区播报工具和用途。名称常驻，不依赖悬停识图。
- 手机详情放在图标下方，选择后滚到详情；尊重 reduced motion。370px 以下改为一组一行，避免长名称被拆开。
- 其余框架、开发环境与研究方法收进原生 More tools & methods 折叠区。How I work 保留三段实际工作过程。
- 工具图标使用 Devicon 本地 SVG、Onshape 官方 144px 图标与现有 Phosphor OpenAI 符号，来源见 docs/media/skill-icons.md。没有添加熟练度百分比或独立精通的暗示。

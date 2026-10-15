# Academic 内容筹备

日期：2026-10-14。阶段：首版内容已接入 Academic 页面，课程使用简写蜂窝与全名说明区；文案见 academic-draft.md，排版规则见 academic-spec.md。

## 目的

面向本科招生老师，展示 Yuhan Su 的学习基础、具体学术兴趣，以及主动探索和反思的能力。文案保持高中生本人表达，不把尚未验证的兴趣或结果写成既定经历。

## 已确认

- 当前为高中生，计划申请本科。
- 学校英文名称为 Summit Country Day School，预计 2027 年毕业，页面使用 Class of 2027；具体年级未提供。
- 主要申请方向：计算机科学、数据科学、应用数学。
- Java 和 Python 最熟悉；在学校学过 HTML、CSS、JavaScript，使用 AI 辅助做过 React 项目。
- 编程兴趣起于 EV3，之后接触单片机、C、学校编程课与高中机器人活动。完整起点故事已放在 About Me；Academic 只在有具体学习例子时引用。
- 在 Cincinnati Children's Hospital 的经历涉及 ARDS 胸部影像标准的文本抽取：定义与 schema 迭代、导师反馈、独立提示词的 LLM judge、metrics 与 error analysis；第二阶段处理 2,000 份报告。
- 该研究可作为学术实践摘要，详细方法、材料和结果留在 Projects。LLM judge 的评估不写成医生标注的临床验证。
- 用户最喜欢数学和计算机科学；Calculus BC 为自学。学习资料包括 BC 教科书、网上教学视频、公式表、MIT 公开课及 Khan 的解释；用户也向老师寻求复习资料。用户强调理解概念与定义。自学时间与原因尚未提供。
- 具体例子：用户熟悉的微积分学习顺序从极限开始，而观看的一个 MIT 录播课系列在介绍微分、积分后讨论极限。用户觉得这种顺序有趣，并帮助自己进一步理解极限。文案按个人观看经历表达，具体课程系列尚未提供。
- 用户确认 Johns Hopkins University Calculus III 为线上学习并参加考试，2025 年 12 月完成；成绩 A+，4.0 Credits 为确认的学分标注。具体项目正式名称尚未提供。
- 在修：AP US Government、AP Psychology、AP English Literature and Composition、AP Statistics、Science Research Institute。按用户对例外项的回复，其余所列课程记为已修。
- Science Research Institute 为校内课程／项目，提供申请研究团队的指导及校外研究机会。用户本次简历使用正式名称 Schiff Family Science Research Institute；它与 Cincinnati Children's 的 ARDS 研究属于同一条经历。
- 研究题目：Using LLMs to Identify Pulmonary Findings in Radiology Reports。地点：Cincinnati Children's Hospital；角色按用户简历为 Researcher；导师 Eneida Mendonca, MD, PhD；时间 Jun 2026–Present。
- 用户研究贡献包括：识别人工逐份检查自由文本报告的困难；探索 LLM 是否能识别 MIMIC-IV 中满足 ARDS 胸部影像标准的报告；构建 schema-guided pipeline 识别双侧阴影与常见排除项；以 error analysis 改进规则及提示，减少 false positives。
- 用户提供约 2,000 份报告、约 95% classification accuracy。Projects 材料整理现已从 Stage II 所选 run 的 CSV 核对：1,997 份报告、1,984 份明确二元 judge 标签、13 份 uncertain 排除；按报告分类 accuracy 94.61%，参考为 LLM judge。Academic 继续保留规模与方法摘要，详细指标放在 Projects；核对记录见 `project-source-review.md`。
- 用户独立向 Cincinnati Children's Division of Biomedical Informatics 的 all-staff meeting 汇报成果，并提供演讲视频：<https://www.youtube.com/watch?v=zc97gzaXZJo&t=50>。2026-10-14 尝试读取视频页面受到节流限制，尚未独立核验视频内容。

## 用户提供的课程清单

以下按展示主题暂分组；课程名称保留用户表述。完成状态已依据用户回复整理。除 JHU Calculus III 外，完成年份与成绩尚未提供；AP 考试成绩单独记录，不能用课程完成状态推断考试分数。

| 展示分组 | 课程／项目 | 当前已知 |
| --- | --- | --- |
| 数学与统计 | AP Calculus BC | 已修，自学；资料、向老师求助及比较极限讲解顺序的例子已确认；考试成绩未提供 |
| 数学与统计 | AP Statistics | 在修 |
| 数学与统计 | Johns Hopkins University Calculus III | 已修，2025 年 12 月；线上学习并考试；A+、4.0 Credits |
| 计算机科学 | AP Computer Science Principles | 已修 |
| 计算机科学 | AP Computer Science A | 已修 |
| 物理与研究 | AP Physics C Mechanics | 已修 |
| 物理与研究 | AP Physics C E&M | 已修 |
| 物理与研究 | Science Research Institute / Schiff Family Science Research Institute | 校内、在修，指导申请研究团队并提供校外机会；与 Cincinnati Children's 的 ARDS 研究相连 |
| 其他课程 | AP Microeconomics | 已修 |
| 其他课程 | AP Macroeconomics | 已修 |
| 其他课程 | AP Music Theory | 已修 |
| 其他课程 | AP English Language and Composition | 已修 |
| 其他课程 | AP US Government | 在修 |
| 其他课程 | AP Psychology | 在修 |
| 其他课程 | AP English Literature and Composition | 在修 |

首版呈现侧重数学与计算机科学，自学 BC 和 Calculus III 作为深入学习的线索。物理、经济、人文与音乐课程作为补充。完整英文文案与接入顺序见 [academic-draft.md](academic-draft.md)。

## 首版结构

1. 学习背景：Summit Country Day School、Class of 2027，以及计算机科学、数据科学、应用数学兴趣简介。
2. 数学与计算机学习：突出 JHU Calculus III 的 A+、4.0 学分、December 2025，以及自学 AP Calculus BC。
3. 学习方式：How I learn 展示自学方法，配以观察极限讲解顺序的个人例子。
4. 学术实践：Schiff Family Science Research Institute → Cincinnati Children's 的同一条研究经历，展示导师、Jun 2026–Present、本人贡献、约 2,000 份报告的评估及演讲入口；详细方法、评估指标和材料留在 Projects。
5. 课程清单：按数学与计算机科学、物理与研究、其他课程分组，标明已修或在修。

成绩、考试、竞赛、奖项或其他经历，收到事实后再判断是否值得展示以及公开范围。当前不添加虚构条目。

## 后续可补充

- 适合展示的其他课程成绩、AP 考试成绩或完成时间（如用户希望展示）。
- 自学 Calculus BC 的原因和时间（如文案需要）；方法与具体例子已有首版。
- 后续人工复核或新结果；目前所选 run 的统计口径已在 Projects 核对。
- JHU Calculus III 的正式项目名称与可用佐证（如展示需要）。
- 具体年级（如需显示）；用户愿意公开的学业成果或其他学术经历。
- 三个申请方向之间的兴趣侧重与想进一步探索的问题。
- 可展示的作业、报告、笔记或其他佐证材料。

早期占位文字 “I enjoy the connection between a mathematical idea…” 已移除，不作为用户已确认的学术观点。

学校、毕业年份、课程、自学与研究经历已形成连贯首版并接入页面。Projects 已补入所选 run 的指标、参考标准与分母说明；以上其余补充项可在后续完善。

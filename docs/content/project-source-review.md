# Projects 本地材料核对

日期：2026-10-14。仅静态读取源项目和汇总评估数据，没有运行三个源项目、连接数据库或调用模型 API。源目录保持只读；当前实现位于个人作品集项目。

## 材料来源与页面用途

| 来源 | 核对内容 | 首版页面用途 |
| --- | --- | --- |
| `D:/jcya(demo)` | README、package.json、backend/pom.xml、现成展示截图 | 技术栈与两个空数据界面 |
| `D:/MIMIC program` | 提取／评估脚本、schema 版本记录、汇总表、所选 run 的 CSV、poster 图表生成脚本 | 贡献分工、规则迭代、工作流、四项指标及评估图 |
| `D:/MuonLab` | Python 依赖、FastAPI 路由、QuarkNet parser、存储／元数据层、分析代码、现成概念图 | 后端处理链、技术栈和带说明的概念图 |

图片直接复制，未裁剪或重绘。五张图的尺寸、来源、SHA256 和复制校验结果记录于 `docs/media/projects-manifest.json`。未公开源目录中的环境配置、访问凭据、临床报告、原始研究 CSV、数据库、可执行文件或完整代码树。

## Clinic

README 确认中文项目名为「京城易安中医门诊管理系统」。前端 React / TypeScript，后端 Java 17 / Spring Boot / PostgreSQL，并有 Electron Windows 客户端。

`output/system-showcase/01-dashboard.png` 与 `02-diagnosis-prescription.png` 已逐张查看：前者是空活动数据总览，后者是空白诊疗／处方表单。页面仅使用这两张界面，不使用财务截图表示财务已完成。材料中有部署相关代码，但实际使用状态仍以用户的最新澄清为准：管理员一台电脑测试、交付前迭代，大部分反馈已处理，财务部分未完善。

## ARDS：所选 run 的指标

数据源：`D:/MIMIC program/main/_judge_output/ards_chest_pipeline test 3/judgments test 3.csv`。静态读取 `pipeline_positive` 与 `judge_label` 汇总二元计数；未打印、复制或公开报告内容、患者标识或 note_id。

| 项目 | 数值 |
| --- | ---: |
| 报告总数／唯一报告数 | 1,997 |
| 二元可评估报告 | 1,984 |
| uncertain，排除 | 13 |
| TP | 341 |
| FP | 36 |
| FN | 71 |
| TN | 1,536 |
| Accuracy = (TP + TN) / N | 94.61% |
| Precision = TP / (TP + FP) | 90.45% |
| Recall = TP / (TP + FN) | 82.77% |
| F1 = 2TP / (2TP + FP + FN) | 86.44% |

评估单位是每份报告是否符合胸部影像标准；参考是 LLM judge 标签。不是医生标注的临床验证，也不是完整 ARDS 诊断。公开汇总保存于 `public/media/projects/ards/metrics.json`。

交叉核对：`research paper/manuscript_tables.md` 及 `outputs/manuscript_figures_matplotlib/create_professional_figures.py` 将上述计数对应至海报／比较图中的 Stage II Test 3。该文件夹内的旧 `confusion_matrix.md` 标题写作 Test 4；存在编号偏移，不能只凭标题确定 run。网页采用 CSV 实际计数和图表映射，不沿用错位标题。

Stage II 四个 run 的报告总数分别为 1,954、1,971、1,997、1,996，二元可评估数分别为 1,944、1,962、1,984、1,987。因此图表呈现各 run 的结果，不能声称在完全相同固定队列上完成严格对照，也不据此计算因果性的改进百分比。

规则叙事依据 `main/classification/ards_chest_imaging_prod_versions.md`：早期单标签阶段收紧排除规则后，相关 bibasal / bibasilar 影像发现也被过滤，随后版本重新允许相应模式。此阶段用于解释设计取舍，不将早期 Stage I 计数与 Stage II 总体指标混用。

页面明确区分：导师提供 annotation tool、API、氧合筛选并协助多标签适配；本人设计 schema、连接工具的 pipeline、其他筛选步骤、judge pipeline 及 metrics / error analysis。

## Muon

依赖与代码确认：Python / FastAPI，Supabase 项目和 run 元数据，R2 存储抽象及本地回退，QuarkNet 文本解析、Parquet 数据输出和 Polars 分析。分析代码涉及 run quality、event rate、channel / ToT、environment metadata、coincidence。

`FrontEnd/public/images/analysis-workspace-flow.png` 用于解释概念，图内包含示意曲线及未来功能。网页 caption 和正文均说明它不是实测结果。前端 imports 中另有参考界面图片，不能当成平台实际用户规模或真实使用证据，未选用。

用户目前亲自测试处理、解析和分析链路；没有将仓库里的路由或图示扩写为已被社团成员正式使用。

## 其余三个项目

CNN 静态检查记录见 `digit-recognizer-notebook-review.md`，未恢复或新跑训练，99% 仍无保存的训练／提交证据，首版不展示数值。微针仍为未测试原型；ChatGPT 研究仍为 15 题问卷、8 人预测试和后续研究计划。

## 实现与验证

网页内容：`content/projects.ts`；布局与展开：`components/ProjectsPage.tsx` 和同名 CSS module。三个重点案例展开，三个补充项目直接阅读。原有七个路由、菜单、海报查看器与页面转场继续复用。

类型、构建和实际浏览器检查结果见 `docs/projects-qa.md`。

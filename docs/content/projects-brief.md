# Projects 内容筹备

日期：2026-10-14。阶段：已检查三个本地项目的材料，完成六个项目的首版页面。页面包含三个可展开重点案例、三个简短项目，以及经过筛选的截图和研究图表。

## 页面目的与首版范围

面向本科招生老师，展示 Yuhan Su 如何理解问题、做出设计选择、检查结果并改进作品。研究项目展开技术与思考过程，Academic 保留学习背景和研究摘要。

用户已提供六个项目。首版突出 ARDS、医院信息系统和 Muon 分析平台；微针图像分析、CNN 复现、青少年与 ChatGPT 的研究各保留独立条目。页面内容存于 `content/projects.ts`，排版与展开交互存于 `components/ProjectsPage.tsx`。密码保存小程序与机器人经历作为后续备选。

| 项目 | 用户提供的角色与时间 | 主要展示角度 |
| --- | --- | --- |
| ARDS radiology report extraction | Researcher；Jun 2026–Present | Schema、评估、错误分析与导师协作 |
| Jing Cheng Yi An Hospital Information System | Independent System Developer；Jun 2025–Present；Remote/Beijing, China | 完整业务流程、数据库、权限与交付前测试 |
| Muon Lab Analysis Platform Design | Backend Developer, School Cosmic Club；Jan 2026–Present；Summit Country Day School | 原始科研数据转换、物理分析与研究工作区 |
| Neuroneedle Networkers – Microneedle | Image Algorithm & Data Analysis Architect；Oct 2025–Jan 2026；Remote | 参考 ImageJ 的图像算法实现；尚未实验测试的原型方案 |
| Kaggle digit recognition CNN reproduction | Machine Learning Researcher；May–Aug 2026；Remote | 模型复现、数据预处理、训练与错例分析 |
| Teen Emotional Dependency on ChatGPT | Independent Researcher；Apr 2026–Present；Remote | 文献、理论框架、研究设计与小规模问卷预测试 |

## ARDS：已确认事实

- 名称：Using LLMs to Identify Pulmonary Findings in Radiology Reports。
- 地点：Cincinnati Children's Hospital。
- 角色按用户提供的简历为 Researcher；时间 Jun 2026–Present。
- 导师：Eneida Mendonca, MD, PhD。
- Schiff Family Science Research Institute 是校内课程／项目，帮助申请研究团队并提供此次校外研究机会；不重复列成第二项研究。
- 问题：人工阅读大量自由文本放射学报告，以查找符合 ARDS 胸部影像标准的证据，耗费时间。
- 数据来自 MIMIC-IV 的自由文本放射学报告；第二阶段约 2,000 份报告。
- 用户构建 schema-guided LLM pipeline，识别双侧阴影等相关影像发现，并区分常见排除项。
- 从 Berlin criteria 出发，结合文献定义与导师修改；最初以包含定义为主，后来加入排除定义，处理错误识别的 cases。
- 用户另建 LLM judge pipeline，使用独立于 extraction schema 的提示词进行评估，再用 metrics 与 error analysis 辅助规则和提示词迭代。
- 用户独立向 Cincinnati Children's Division of Biomedical Informatics 的 all-staff meeting 汇报。
- 演讲入口由用户提供：https://www.youtube.com/watch?v=zc97gzaXZJo&t=50 。视频内容尚未独立核验。

### 新确认的贡献分工

| 部分 | 本人工作 | 导师提供／协助 |
| --- | --- | --- |
| Annotation tool | 编写连接该工具的提取工作流 | 提供已有 annotation tool，调用大模型将 notes 转为 BioXML；格式名称按用户表述记录 |
| Schema | 自己设计，结合文献、评估与错误分析迭代 | 提供修改意见；已有前文记录导师曾修改定义 |
| 数据筛选 | 编写数据库筛选及连接 pipeline 所需流程 | 导师执行 oxygenation 筛选；不将这一步记为本人独立完成 |
| Evaluation pipeline | 自己搭建，使用独立于 extraction schema 的 judge 提示词 | 提供模型 API |
| 单标签到多标签 | 在本人工作流基础上继续迭代 | 导师协助修改提取与评估两个 pipeline，以支持 multi-label schema |
| Metrics analysis | 自己完成指标分析与 error analysis | 暂无其他具体分工信息 |

公开贡献应写为围绕已有 annotation tool 构建工作流，不将该工具、模型 API 或氧合筛选归为本人原创。

## 医院信息系统：用户提供事实

- 页面名称保留用户英文：Jing Cheng Yi An Hospital Information System。本地仓库 README 已确认中文项目名为「京城易安中医门诊管理系统」。
- Independent System Developer；Remote/Beijing, China；Jun 2025–Present。
- 技术栈：React、TypeScript、Java / Spring Boot、PostgreSQL；本地代码另确认 Electron Windows 客户端。
- 目标：将分散的诊所工作流程整合进同一系统，连接患者记录、预约、诊断、处方、药房和收费。
- 为员工提供基于角色的账号和对应工具／信息访问权限；具体权限设计尚未展开。
- 数字处方流程覆盖医生开方、价格查询、库存跟踪、发药及最终交付。
- 收费与财务工具用于汇总费用并记录每日交易；用户最新确认财务部分仍未完善。
- 最新澄清：系统当前交给诊所系统管理员测试，只部署在管理员的一台电脑上，处于最终交付前的修改阶段。以此回复更新此前简历中的跨设备使用表述。
- 用户已做过五个以上版本，当前修改主要涉及开单子的格式。用户同时提到「第2版」和「最后一个版本交付前的第二次更改」；版本编号关系尚未说明，公开文案只写多轮迭代，不推断具体版本号。
- 当前可展示进度为 administrator testing / pre-delivery refinement；诊所日常业务使用及多设备实际使用尚未确认，不写成已有正式运营结果。
- 最新反馈进度：清单中的修改大部分已完成，财务部分还在完善。未逐项列出完成编号或复测／验收结果，不将「大部分完成」扩写为所有非财务项都已通过验收。
- 当前不添加患者数、员工数、效率提升百分比、合规认证或安全审计结论。

### 用户提供的反馈文件清单截图

来源：用户上传的资源管理器文件列表截图，已保存在 `assets/originals/projects/clinic-feedback-file-list.png`。这是文件名层面的材料，未读取清单内各张截图的实际内容；部分文件名被截断，以下为可见主题的归纳。用户已确认总体大部分修改完成、财务部分仍在完善；各编号的状态未单独核对。

| 可见编号 | 主题归纳 | 当前证据状态 |
| --- | --- | --- |
| 2.3–2.4 | 医师端处方录入、常用处方编辑／添加 | 未逐项确认 |
| 3.1–3.4 | 医师预约设置、出诊安排、选择患者时显示身份信息、就诊／取号时间 | 未逐项确认 |
| 3.5 | 医师档案职称文字调整 | 未逐项确认 |
| 3.6–3.7 | 划价收费，以及诊金、提成、挂号费相关规则 | 未逐项确认 |
| 4.1–4.2 | 药房处方管理／审核、中药饮片价格与助记码相关问题 | 未逐项确认 |
| 5 | 打印设置中的打印机配置 | 未逐项确认 |
| 6.1 | 财务收支明细、医师工作量统计 | 所属财务部分仍在完善 |
| 6.2–6.5 | 项目明细、门诊统计、医师提成、药品流向出库统计报表 | 文件名含「参考」，按参考材料记录，不据此声称已实现 |

这份清单与完成进度回复已足够支撑首版的反馈迭代叙事。当前状态为大部分反馈已处理、财务部分仍在完善、准备交付；具体技术修改案例可以后续结合代码或实际截图补充。

## Microneedle：用户提供事实

- 团队／项目：Neuroneedle Networkers – Microneedle；Remote；Oct 2025–Jan 2026。
- 角色：Image Algorithm & Data Analysis Architect。
- 用户提供 Conrad Challenge (Innovator Award)；称号先按原文记录，正式展示可沿用证书上的措辞。
- 团队方向是拟议的可穿戴微针传感器，用于探索与抑郁筛查有关的生物标记物。
- 本人查阅相关激素和生物标记物文献；最新说明算法参考／模仿 ImageJ，实现了图像分析算法。
- 当前整体为 prototype，用户明确表示主要完成算法，尚未进行测试；不推断已有真实传感器数据、实物实验或验证结果。
- 用户补充的流程为：光学信号 → RGB 提取 → 算法估算生物标记物浓度 → 评估抑郁程度的设想。当前仍是已实现算法而尚未测试的原型，最后一步按设计目标表达。
- 校准关系、具体标记物、测试数据及抑郁程度映射的依据尚未提供；首版可展示上述拟议处理链，不写成已测得浓度、已验证的严重程度评估或已经实测建立的浓度转换方法。这些细节可随材料后续补充，不阻碍首版的原型介绍。
- 用户认为此设计此前尚无人设计过；新颖性未核验，公开首版不使用「全球首创」或无先例等表述。算法参考 ImageJ，不将已有算法方法写成原创发明。
- 不添加临床诊断能力、筛查准确率或有效改善抑郁的结论。

## Muon：用户提供事实

- 名称：Muon Lab Analysis Platform Design；Summit Country Day School。
- 角色：Backend Developer, School Cosmic Club；Jan 2026–Present。
- 平台覆盖原始宇宙射线探测器文件从上传到分析的流程；用户负责后端，不将整个团队的前端工作归为本人完成。
- 用户确认的技术组合：Python、Supabase、R2。本地代码另确认 FastAPI 接口、Parquet 数据集与 Polars 分析；Supabase 保存项目／run 元数据，存储层支持 R2 和本地开发回退。
- 将原始 QuarkNet 探测器文件转换为结构化数据，提取时间戳、探测器通道、位置及其他实验信息。
- 分析工具涉及数据质量、muon flux、通道行为、环境测量与粒子符合事件。
- 原简历列出的工作区范围包含账号、上传数据、执行分析和查看结果。
- 最新确认已跑通 QuarkNet 文件处理、数据解析与执行分析，目前由本人测试。具体分析子模块、查看结果界面及账号部分的完成程度未分别展开，公开首版突出已确认的处理链与当前自测进度。
- 当前状态为 developer testing；未确认已由社团成员使用或已正式部署。

## CNN：用户提供事实

- 名称：Kaggle Project: Reproduced a Convolutional Neural Network for Image-Based Digit Recognition。
- 角色：Machine Learning Researcher；May–Aug 2026；Remote。
- 复现 CNN 以识别手写数字 0–9；归一化像素值、准备训练／测试数据，调整模型参数并分析误分类图像。
- 用户已提供赛题：https://www.kaggle.com/competitions/digit-recognizer 。Kaggle 官方介绍确认使用 MNIST 手写数字；官方数据说明为 28×28 灰度图，比赛 test.csv 不提供 label，评分为分类准确率。来源：https://www.kaggle.com/c/digit-recognizer/data?select=train.csv 。
- 已静态读取用户提供的 notebook：`D:/Downloads/digit-welcome-to-deep-learning-cnn-99-may.ipynb`，副本存于 `assets/originals/projects/digit-recognizer/`；未执行或重训练。
- 技术：Python、TensorFlow/Keras、NumPy、pandas、scikit-learn、Matplotlib、Seaborn。
- Notebook 已实现的代码包括读取 Kaggle train.csv／test.csv、缺失值检查、像素值除以 255、重塑为 28×28×1、标签 one-hot 编码。
- 配置从 42,000 条有标签训练样本中划出 10% 验证集，random_state=2；即 37,800 条训练、4,200 条验证。该配置不是 Kaggle 官方无标签测试集的评分。
- CNN 代码含四个卷积层（32、32、64、64 filters）、池化、Dropout、256 单元全连接层与 10 类 softmax；包含旋转、平移、缩放增强及学习率调整配置。
- 代码还包含训练曲线、验证集混淆矩阵、错例显示、无标签测试集预测与 submission CSV 导出。
- 保存的执行记录截至预处理部分；标签编码及后续模型／训练／评估单元未保留 execution_count 或输出。当前 epochs=1，代码注释中提到 30 轮可得 0.9967；注释与文件名中的 99 不能作为此项目实测结果。
- 用户提供的 99% test accuracy 暂保留为待核对的口述结果；本文件无法确认具体准确率或 Kaggle 提交分数。首版展示复现与评估代码流程，不写成已核验的 99% 或竞赛排名，不将复现模型写成新架构。
- 详细静态检查记录见 `docs/content/digit-recognizer-notebook-review.md`。

## ChatGPT 研究：用户提供事实

- 名称：Research on Teen Emotional Dependency on ChatGPT。
- Independent Researcher；Apr 2026–Present；Remote。
- 文献关注青少年与对话式 AI 的情绪依赖、拟人化与现实关系变化。
- 理论框架：Media System Dependency Theory 与 Uses and Gratifications Theory。
- 计划结合问卷和后续访谈，研究情绪性 AI 使用与线下关系。
- 已设计 15 题问卷，并对 8 名受访者进行初步预测试，检查题目是否清晰，为扩大收集做准备。
- 当前阶段为研究设计与 pilot，不写成已有代表性样本、完成正式访谈或得到因果研究结论。

## 现有材料

| 材料 | 当前状态 |
| --- | --- |
| 研究海报 | 项目内已有 `public/media/home-gallery/01-ards-poster-cropped.png`；原图备份 `assets/originals/home-gallery/01-ards-poster.jpg` |
| 演讲视频 | 用户已提供 YouTube 链接，起点 50 秒 |
| Schema 代码 | 已检查 `D:/MIMIC program/main/classification/` 下的规则版本记录 |
| 提取 pipeline 代码 | 已检查 `D:/MIMIC program/main/ards_chest_pipeline.py`；以静态读取核对工作流 |
| Judge pipeline 代码与评估输出 | 已检查 `main/judge_ards_xml.py` 及所选 run 的 CSV；仅将汇总指标写入公开 JSON |
| Poster PPT／slides | 已找到 `D:/MIMIC program/outputs/ARDS_research_poster.pptx`；首版接入已有海报照片，不添加原始 PPT 下载 |
| ARDS 工作流与评估图 | 已接入 `public/media/projects/ards/pipeline.png` 与 `evaluation.png` |
| 医院系统截图 | 已接入空数据总览与空白诊疗表单，位于 `public/media/projects/clinic/` |
| Muon 图示 | 已接入 `public/media/projects/muon/workflow-concept.png`；明确标为概念图，包含示意曲线与未来功能 |
| 医院系统反馈文件清单 | 已保存用户上传的文件列表截图；大部分修改已完成，财务部分仍在完善，各编号未逐项核对 |
| CNN notebook | 已归档原文件并静态检查；赛题、模型、预处理与评估配置已明确，保存的运行输出不足以核对 99% |

本地 `public/media/research-process.png` 的来源与用途尚未核对，不作为研究方法或结果的证据。

## 首版叙事结构

1. 项目概览：研究问题、机构、时间、本人角色、导师、报告数量。
2. What I built：进入项目时已有的基础，以及本人从零编写或修改的部分。
3. How it changed：选一个代表性误判，说明原规则为何误判、修改了什么、怎样检查影响。
4. Evaluation：解释提取与 judge 的关系，展示有明确统计口径的结果及局限。
5. Materials：海报、演讲，以及后续可公开的代码、schema 和汇总图表。

## 结果表述边界

已从所选 Stage II run 的 CSV 独立重新汇总：1,997 份报告，1,984 份具有明确二元 judge 标签，13 份 uncertain 排除；TP=341、FP=36、FN=71、TN=1,536。按每份报告的整体影像标准分类计算，accuracy 94.61%、precision 90.45%、recall 82.77%、F1 86.44%。该 run 在海报／比较图中标为 Test 3；文件夹内旧 Markdown 标题有编号偏移，采用 CSV 计数与图表映射交叉核对。各 run 的报告数量不同，页面不将其描述为同一固定样本上的严格对照实验。完整核对见 `project-source-review.md`。

评估参考为 LLM judge，不能描述为医生标注的临床验证。本项目关注 ARDS 胸部影像标准，不等同完整 ARDS 诊断。后续展示代码或案例时，可使用规则片段、汇总指标或明确标注的合成示例，不默认公开完整原始报告。

## 后续可补充

六个项目已接入首版。材料来源分别为 `D:/jcya(demo)`、`D:/MIMIC program`、`D:/MuonLab`；五张公开图片的来源和哈希见 `docs/media/projects-manifest.json`。CNN 的 99% 仍缺少保存的运行／提交结果；微针原型的实验数据、正式奖项措辞和 ChatGPT 研究后续进度可以之后补充。诊所状态保持管理员单机测试、财务未完善；Muon 状态保持开发者自测。

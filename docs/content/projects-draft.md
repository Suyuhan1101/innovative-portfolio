# Projects 英文工作稿

2026-10-14。六个项目已接入首版页面。本文保留英文叙事工作稿；网页实际文案以 `content/projects.ts` 为准，来源核对见 `project-source-review.md`。

## 页面开场

### Projects

From clinical text and clinic workflows to detector data and image analysis, these projects show how I build, evaluate and refine my work.

## 重点案例

### Using LLMs to Identify Pulmonary Findings in Radiology Reports

Cincinnati Children's Hospital · Jun 2026–Present

Researcher · Mentored by Eneida Mendonca, MD, PhD

I developed a schema-guided workflow to identify ARDS-related chest imaging findings in MIMIC-IV radiology reports. Starting with the Berlin imaging criterion, I refined the schema through published definitions, mentor feedback and error analysis, including rules for common exclusions.

#### My contribution

My mentor provided an annotation tool that uses an LLM to turn notes into BioXML annotations. I designed the schema, built the pipeline connecting to that tool, and wrote database-filtering steps. My mentor handled the oxygenation filtering.

I also built an evaluation pipeline using a judge prompt independent of the extraction schema, and carried out the metrics analysis. My mentor supplied the model API and helped adapt both pipelines from a single-label schema to a multi-label schema.

#### Evaluation and presentation

The selected Stage II run evaluated 1,997 reports. Metrics use 1,984 reports with determinate LLM judge labels; 13 uncertain judgments were excluded. Report-level accuracy was 94.61%, precision 90.45%, recall 82.77% and F1 86.44%, using LLM judge labels as the reference.

I used the judge results and error analysis to guide schema changes. Earlier schema records show how stricter exclusions reduced false positives but also filtered out relevant bibasilar findings, prompting another rule revision. The comparison runs evaluated different numbers of reports.

I independently presented my findings to Cincinnati Children's Division of Biomedical Informatics at an all-staff meeting.

[Watch my presentation](https://www.youtube.com/watch?v=zc97gzaXZJo&t=50)

The evaluation reference was an LLM judge. Clinician validation remains future work.

### Jing Cheng Yi An Hospital Information System

Independent System Developer · Remote/Beijing, China · Jun 2025–Present

React · TypeScript · Java / Spring Boot · PostgreSQL · Electron

In development · Administrator testing

I built a clinic management system connecting patient records, appointments, diagnoses, prescriptions, pharmacy services and billing. Role-based employee accounts provide access to the tools and information needed for different responsibilities.

The prescription workflow connects physician order entry, medication pricing, inventory tracking, dispensing and delivery.

I've revised the system through several versions and deployed the current build on the system administrator's computer for testing ahead of final delivery. I've addressed most of the feedback, including work on order formats. The finance module is still being refined.

### Muon Lab Analysis Platform

Backend Developer · School Cosmic Club, Summit Country Day School · Jan 2026–Present

Python / FastAPI · Supabase · R2 · Parquet · Polars

In development · Developer testing

I developed the backend for a platform that takes raw cosmic ray detector files from upload to analysis. It converts QuarkNet files into structured datasets, extracting timestamps, detector channels, location and experimental information.

FastAPI provides the backend interface. Supabase handles project and run metadata, and the storage layer supports R2 with a local development fallback. The code writes structured Parquet datasets for downstream analysis.

The analysis code covers run quality, event rates, channel and time-over-threshold behavior, environmental metadata and coincidence analysis. I'm currently testing the file-processing, parsing and analysis workflow myself. The displayed concept diagram includes illustrative plots and future features; these are not measured project outcomes.

## 其他项目

### Microneedle Sensor Image Analysis

Neuroneedle Networkers · Image Algorithm & Data Analysis Architect · Oct 2025–Jan 2026

Prototype · Algorithm implementation

I developed an image-analysis prototype inspired by ImageJ for a proposed wearable microneedle sensor. The proposed workflow extracts RGB values from optical signals and uses them to estimate biomarker concentrations, as part of the team's depression-screening concept. I also reviewed research on depression-related biomarkers to inform the design. The work is at the prototype stage, with experimental testing still to come.

### Handwritten Digit Recognition

Kaggle Digit Recognizer · CNN reproduction · May–Aug 2026

Python · TensorFlow/Keras · scikit-learn

I reproduced a convolutional neural network for classifying MNIST handwritten digits from 0 to 9. My notebook implements pixel normalization, a 90/10 training–validation split, convolutional layers and data augmentation.

I added code for training curves, a confusion matrix and inspecting misclassified images, alongside prediction and CSV export for Kaggle submissions.

[View the competition](https://www.kaggle.com/competitions/digit-recognizer)

### Teen Emotional Dependency on ChatGPT

Independent Researcher · Apr 2026–Present

I'm developing a mixed-method study of teenagers' emotional reliance on ChatGPT and its relationship with offline connections. My framework draws on Media System Dependency Theory and Uses and Gratifications Theory.

I designed a 15-question survey and piloted it with eight respondents to test question clarity before broader data collection. The research plan combines survey responses with follow-up interviews.

## 编辑与后续补充（不作页面正文）

- 以上顺序已用于首版：三个可展开案例和三个简短项目，保留原有页面导航与转场。
- ARDS：明确使用导师已有 annotation tool，多标签改造注明导师协助。规则版本记录支撑 bibasilar findings 的包含／排除取舍；所选 Stage II run 的 CSV 汇总已核验，94.61% 明确以 LLM judge 为参考。临床验证仍为后续工作。公开材料仅含工作流、汇总图表与海报／演讲入口。
- 医院系统：当前为交付前的单机管理员测试，已更新此前跨设备日常使用的描述。用户已迭代五个以上版本，具体版本编号关系未展开，正文使用 several versions。大部分反馈修改已完成、财务部分仍在完善，已写入正文；不添加正式运营规模、节省时间或合规认证数字。
- 医院系统补充材料：文件列表截图显示处方、预约、药房、打印和财务等反馈主题；6.2–6.5 为标注「参考」的报表材料。整体进度已确认，但各编号的完成与复测结果未逐项确认，不把整份清单扩写成已交付成果。原截图保存在 `assets/originals/projects/clinic-feedback-file-list.png`。
- Muon：本地后端代码确认 FastAPI、Supabase 元数据、R2／本地存储、Parquet 与 Polars。当前仍由本人自测，不推断已由社团成员使用或整个前端均由本人完成。页面图示标为概念图。
- Microneedle：用户提供 Conrad Challenge (Innovator Award)，后续正式展示可使用证书措辞。已确认参考 ImageJ，实现算法而尚未测试；拟议流程为光学信号 → RGB 提取 → 浓度估算 → 抑郁程度评估设想。正文展示颜色处理与浓度估算的设计方向，说明仍待实验测试；不将浓度转换或严重程度评估写成已验证的结果，不添加未经核验的首创结论。
- CNN：已核对 Digit Recognizer／MNIST，以及 notebook 中的 Python、TensorFlow/Keras、90/10 训练／验证划分、数据增强和评估代码。保存的执行输出未覆盖训练与评分部分，不能从该文件确认用户口述的 99%。正文展示已实现的代码流程，待获得实际运行日志或 Kaggle 提交分数后再补结果。静态检查记录见 `digit-recognizer-notebook-review.md`。
- ChatGPT：保留 15 题问卷、8 人预测试这一实际进度，不从 pilot 推断正式研究结论。
- 已接入五张筛选后的图像，来源与哈希见 `docs/media/projects-manifest.json`；代码仓库、原始研究数据、环境配置和未审查的 PPT 没有复制到公开目录。

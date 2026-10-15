# Digit Recognizer notebook 静态检查

日期：2026-10-14。用途：为 Portfolio 的 CNN 复现项目整理可核对的实现与评估描述。

## 文件与检查范围

- 用户源文件：`D:/Downloads/digit-welcome-to-deep-learning-cnn-99-may.ipynb`。
- 项目备份：`assets/originals/projects/digit-recognizer/digit-welcome-to-deep-learning-cnn-99-may.ipynb`。
- 原文件 SHA-256：`D08C536483BFAAA14B96457D5015C19F62813853940B06C24B5638697F6DC9EA`。
- 30 个 code cells，Python 3 内核。
- 仅解析 JSON、代码和已保存输出；未执行 notebook、下载训练数据或重新训练，原文件未修改。
- Cell 编号以下从 0 开始。

## 外部来源

用户提供 [Kaggle Digit Recognizer](https://www.kaggle.com/competitions/digit-recognizer)。官方 [比赛介绍](https://www.kaggle.com/c/digit-recognizer/) 与 [数据说明](https://www.kaggle.com/c/digit-recognizer/data?select=train.csv) 确认：MNIST 手写数字、28×28 灰度图；test.csv 无 label，需要生成 ImageId／Label 提交；评分为分类准确率。

官网信息说明比赛规则，不代表该用户已提交或获得某个分数。

## 已有代码

| Cells | 代码内容 | 可以支持的文案 |
| --- | --- | --- |
| 0–5 | NumPy、pandas、Matplotlib、Seaborn、scikit-learn、Keras／TensorFlow 导入，读取 train.csv、test.csv | Python、TensorFlow/Keras 技术组合，使用该比赛数据 |
| 6–11 | 标签分布、缺失值与描述统计；保存输出显示 42,000 条训练样本和 784 个像素列 | 已进行部分探索性数据检查 |
| 12–14 | 除以 255、重塑 28×28×1、one-hot 标签编码 | 实现预处理代码 |
| 15 | train_test_split(test_size=0.1, random_state=2) | 配置 90/10 训练／验证划分；由样本数可计算为 37,800／4,200 |
| 17–20 | 四层 Conv2D、池化、Dropout、Dense(256)、10 类 softmax；RMSprop 与 categorical crossentropy；ReduceLROnPlateau | 实现 CNN 复现、优化器与学习率控制配置 |
| 21 | ImageDataGenerator：旋转 10 度、缩放 0.1、水平与垂直平移 0.1 | 添加数据增强配置 |
| 22–24 | epochs=1、batch_size=86；先普通 fit，再使用增强数据 fit | 包含基础与增强训练代码，当前各调用配置为 1 轮 |
| 25–27 | 训练曲线、验证集混淆矩阵、按预测置信差排序的错例显示 | 添加评估和错例检查代码 |
| 28–29 | 无标签 test 预测、argmax、ImageId／Label CSV 导出 | 实现提交文件生成代码 |

## 运行记录与结果边界

保存的 execution_count 从导入到 cell 13 的部分预处理可见；cell 14–29 没有执行计数或输出。训练曲线、混淆矩阵、错例图与提交文件均未作为实际结果保存在本文件中。

Cell 22 的注释写到将 epochs 调为 30 可得到 0.9967。它是代码注释，不是保存的训练日志或评估结果。文件名中的 99 也不足以确认准确率。

因此，本文件能够核对模型和流程的实现，但不能独立确认 99% 的实际结果、其属于本地验证还是 Kaggle 提交、某次成功训练使用的完整参数，或竞赛排名。不由缺少输出反推用户从未在其他版本运行。

## 首版展示决定

项目定位为 CNN reproduction / learning project。展示数据预处理、训练／验证配置、CNN 与增强、评估代码和提交导出；结果数字等待实际日志或 Kaggle 提交记录后补充。无需为整理网站文案而重训练。

Notebook 原件存于素材备份，未设置公开下载入口。后续公开代码时再补充所复现方法／教程的具体来源与用户的修改说明。

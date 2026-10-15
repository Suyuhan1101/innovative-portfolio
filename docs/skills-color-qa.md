# Skills 彩色工具台验收

日期：2026-10-14。范围：用户选择的 1 号分组工具台，加品牌彩色图标。

final result: passed

## 视觉依据与截图

- source visual truth：`docs/design/skills-color-toolbench-reference.png`，1487 × 1058；由已选择的第一张概念图生成，只调整图标颜色，使用内置 Image Gen。
- 生成提示：保持整个分组、字体和纸色布局；Java 蓝红、Python 蓝黄、React 青、TypeScript 蓝、PostgreSQL 蓝、Supabase 绿、Figma 多色、Onshape 绿灰、GitHub / Codex / Vercel 黑、Cloudflare 橙；不增加彩色图标底卡。
- 同状态桌面截图：`docs/qa/skills-color-desktop.png`，浏览器 CSS 1487 × 1058，DPR 约 1，图片输出 1472 × 968。默认 Python，补充工具区折叠，白天纸色主题。
- 完整页：`docs/qa/skills-color-full-page.png`，1472 × 1563。
- 最终正常窗口：`docs/qa/skills-color-final.png`，CSS 1280 × 720，默认 Python，已恢复临时视口覆盖。
- full-view comparison：`docs/qa/skills-color-comparison.png`。左右同时查看依据和实现；统一取左上 1472 × 968 内容区，1:1 拼接，没有把不同尺寸拉伸比较。完整页截图另用于确认下方工具和链接。
- focused region comparison：`docs/qa/skills-color-focused-comparison.png`。裁取两边工具组与详情区域并列比较，保持图像比例，确认图标、标签、选中线、分隔线与项目说明。
- 手机：`docs/qa/skills-color-mobile.png`（390px）、`skills-color-mobile-detail.png`、`skills-color-320.png`。
- 平板：`docs/qa/skills-color-tablet.png`（768px）。

## Findings 与修复记录

1. 初次实现图标和工具台标题相对选中稿偏小（P2），见 `skills-color-comparison-initial.png`。已将桌面图标调整到 64–72px、详情图标 104px，并增加标题与简介的阅读尺寸。修复后重新截图并做完整、局部并排比较。
2. 首次 390px 检查中 PostgreSQL 名称被拆成两行（P2）。改为名称不拆词；370px 以下一组一行，保留两列工具。重新检查 390px、320px 后名称完整，无横向溢出。
3. 首次使用的 Onshape 官方宽字标内含留白，视觉过小（P2）。改用官方 CAD 网站 144px 图标，绿色/白色/灰色标识与其他符号等大；没有从生成稿裁切仿制标志。

修复后没有待处理的 P0/P1/P2 问题。

## 五项视觉核对

- Fonts / typography：沿用项目 DM Serif Display 和 DM Sans，工具台标题与分组使用 serif，正文和工具名称使用 sans；没有引入新字体。主 Skills 标题及页眉保持既有全站尺寸，和草图的大小差异属于沿用已确认的全站规则。
- Spacing / layout：桌面两列工具组加右侧详情，Along the way 横跨左侧；薄分隔线和开放纸面，无嵌套卡片。手机详情在工具组下方。桌面和平板的全部工具、右侧内容、底部链接均完整可读。
- Colors / tokens：页面保持 paper #faf9f4、ink #11141c、green #17492d、muted #69707b、rule #d8d9d1。真实工具素材保留原色，选中线保持绿色；text-link 沿用全站暖色规则。
- Asset fidelity：使用本地 Devicon 原色 SVG、官方 Onshape PNG、现有 Phosphor OpenAI 标识与语义图标。全部图片已加载，无生成图标截图、手绘近似符号或第三方热链。原图标有不同光学比例，TypeScript / GitHub / Vercel 作尺寸补偿。
- Copy / content：每个工具都对应已确认的实际使用。保留 AI-assisted、管理员测试、developer testing 等阶段说明；没有熟练度百分比或精通标签。详情比概念图多一句项目依据，是为读者理解所做的内容补充。

## 交互与构建检查

- 12 个工具逐一选择，详情名称正确，每次恰有一个 aria-pressed=true，aria-controls 指向同一详情区；工具名称始终可见。
- Java 使用 Enter、PostgreSQL 使用 Space 选择成功。状态区播报工具和用途，焦点保留在所选按钮。
- 原生 More tools & methods 用 Enter 展开和收起成功，补充内容含开发环境、研究方法和 AI 工作方式。自动化中 summary 在 DOM snapshot 中不映射为 button，改以实际文本定位验证，控件本身无故障。
- 390px 点击 Onshape 后详情顶部约在 y=105，位于固定页眉下方，未被遮挡。
- 320px、390px、768px 的 scrollWidth 均等于 clientWidth，无横向滚动；320px 的工具触摸区域约 129.5 × 99px。
- 当前系统 reduced motion=true，新面板 computed animation-name 为 none。
- Python 的 Projects 入口实际到达 /projects；Java 的 coursework 入口到达 /academic；Figma 的首页入口到达 /。浏览器返回正确恢复 /skills，未重播欢迎页。
- 最终 /skills，phase=idle、data-entering=false，默认 Python，全部图片加载正常，错误日志为空。
- `npm run typecheck` 通过；最终 `npm run build` 通过，首页与原栏目成功生成，无新增运行依赖。

## 实现文件

- `components/SkillsPage.tsx`、`components/SkillsPage.module.css`
- `content/skill-toolbench.ts`；原 `content/skills.ts` 继续提供补充工具与工作过程。
- `scripts/prepare-skill-icons.mjs`、`public/media/skills/`，素材来源见 `docs/media/skill-icons.md`。

本轮只改本地页面和素材；没有提交、推送、部署或修改域名。后续可根据用户对实际预览的反馈微调图标大小和间距。

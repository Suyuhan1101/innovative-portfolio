# Projects 首版验证

日期：2026-10-14。

## 已检查

- `npm run typecheck` 通过；`npm run build` 通过，包含 Projects 在内的现有页面成功生成。
- 实际浏览器桌面默认视口约 1280px：三个重点案例的预览、展开内容、四项 ARDS 指标与三项补充项目均已显示。
- 分别展开／折叠 ARDS、Clinic、Muon；折叠 panel 高度为 0，并有 `aria-hidden` 和 `inert`。从折叠的 ARDS 按钮按 Tab，焦点直接到下一个案例的预览链接，没有进入隐藏面板。
- 五张新增图片均已实际加载。海报按钮打开既有 Photograph viewer，关闭后回到 Projects。
- 390×844 手机截图已保存；另检查 320px 与 768px 宽度，内容无横向溢出。320px 下正文、标题、表格、图片均处于视口内。
- 菜单 Home 返回首页、首页 Projects 入口进入项目页经过原有转场；站内导航未重播欢迎开场。
- 浏览器错误日志为空。临时响应式视口已恢复。

## 截图

- `docs/qa/projects-first-screen.png`：桌面首屏。
- `docs/qa/projects-ards-expanded.png`：所选 run 的指标、统计分母与比较图。
- `docs/qa/projects-mobile.png`：390px 手机首屏。

## 范围

这是作品集页面的验证。未启动或重新测试诊所、ARDS、Muon 源项目，也未重跑 LLM 评估、训练 CNN、修改源数据库或发布部署。源材料和指标核对见 `docs/content/project-source-review.md`。

## 2026-10-15：演讲嵌入验证

- `npm run typecheck`、`npm run build`、`git diff --check` 通过。
- ARDS 详情初始只显示演讲封面，没有 iframe；按 Enter 或点击封面后，播放器在 `/projects` 页内加载，未跳转到外部页面。
- 实际 YouTube 视频播放成功：`readyState = 4`、`paused = false`，时间从 50 秒继续到 66 秒、85 秒；完整视频时长约 12 分 19 秒。
- 背景音乐原本播放时，开启演讲会暂停音频；点击浮动音乐播放器的播放按钮后，音频恢复、演讲 iframe 被移除。
- 关闭演讲会移除 iframe，焦点回到 `Watch my presentation`；收起 ARDS 案例同样移除 iframe，再展开时恢复封面，没有自动继续播放。
- 320×720 手机视口实际播放成功；iframe 为 231×200px，页面 `scrollWidth` 与 `clientWidth` 同为 305px，无横向溢出。
- 浏览器错误日志为空。测试结束后已停止视频，背景音乐保持暂停，并恢复默认视口。
- 截图：`docs/qa/projects-presentation-desktop.png`（实际播放）、`docs/qa/projects-presentation-mobile.png`（手机实际播放）、`docs/qa/projects-presentation-preview.png`（最终封面）。

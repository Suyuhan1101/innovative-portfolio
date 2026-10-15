# Skills 首版验证

日期：2026-10-14。

## 内容与实现

- 新内容源 `content/skills.ts`，新页面组件 `components/SkillsPage.tsx` 与同名 CSS module；Skills 占位文字已替换，原机器人占位配图移出 Skills 排版。
- 顶部突出 Java / Python；四个领域为 Programming、Web & systems、Data & storage、Research & evaluation。
- 工作台按用途列出 Figma / Onshape、开发环境、Codex / agent skills / spec-driven development / vibe coding、GitHub / Vercel / Cloudflare。
- Onshape 具体用途来自本轮确认：机器人团队的 logo、木材切割布局和原型设计。框架只表达使用经历，不添加未经确认的熟练度。

## 已验证

- `npm run typecheck` 通过。
- `npm run build` 通过，原有路由成功生成；没有新增依赖或后端。
- 浏览器默认桌面约 1280px：页面内容、四个领域、项目例子、工具工作台和工作方式均已实际查看。
- 点击 Web & systems、使用 Enter 选择 Data & storage、使用 Space 选择 Research & evaluation，均更新正确面板；四个入口中恰有一个 `aria-pressed=true`，状态播报与所选领域一致。
- 390px 手机页面可以选择领域，正文为 16px；按钮触摸区域高度 71–91px。
- 320px、390px、768px 宽度均无横向溢出；320px 下标题、列表、按钮和项目说明均在视口内。
- 当前浏览器报告 `prefers-reduced-motion: reduce`，新领域面板的 computed animation-name 为 none，与 CSS 规则一致。
- Skills 的 Projects 链接到达 `/projects`；学习经历链接到达 `/academic`；通过既有菜单返回 Skills。保留原有栏目转场，站内没有重新出现欢迎开场。
- 临时视口覆盖已恢复。
- 最终回到 `/skills`，转场状态 `data-entering=false`、正文 opacity=1，浏览器错误日志为空。

## 截图

- `docs/qa/skills-first-screen.png`：桌面首屏。
- `docs/qa/skills-workspace.png`：工具工作台与开发方式。
- `docs/qa/skills-mobile.png`：390px 手机首屏。
- `docs/qa/skills-full-page.png`：桌面完整页面。

本轮仅更新和验证本地作品集，没有提交、推送或部署，也未改变源项目与域名配置。


## 彩色工具台更新

用户选择 1 号分组图标方案并要求原色图标，首版文字领域按钮布局现由彩色工具台替代。最新截图、构建与交互检查见 [Skills 彩色工具台验收](skills-color-qa.md)。

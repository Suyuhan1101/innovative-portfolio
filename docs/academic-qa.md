# Academic 首版检查

日期：2026-10-14。本地 Next.js 开发预览：http://127.0.0.1:3000/academic。

## 结果

- `npm run typecheck` 通过；最终 `npm run build` 通过，全部静态页面生成成功。
- 浏览器实际渲染 15 个课程按钮：10 个 Completed、5 个 In progress。
- 悬停会更新说明区；点击 JHU 显示完整校名、December 2025、A+、4.0 credits；键盘从 JHU 按 Tab 到 Statistics 显示全名和在修状态。
- 窄屏点击 SRI 后，Schiff Family Science Research Institute 的全名及说明完整换行显示。
- 桌面五列、小屏三列，隔行错开半格。物理两门使用 Mech、E&M，避免简写挤到六边形边缘。
- 固定说明区预留高度；手机说明从上方对齐，不让长名称挤动蜂窝。
- 开场进入 Academic、Academic 返回首页、菜单重新进入 Academic、Academic 到 Projects、浏览器后退均正常。最终页面为 idle、无开场覆盖层、无透明隐藏正文。
- 研究海报可打开已有图片查看器并关闭。演讲保留用户提供的 YouTube 链接，本轮未修改或核验外站内容。
- 浏览器捕获的 JavaScript error 为 0。当前开发导航检查使用 full 动效预览；课程切换 CSS 保留系统减少动态效果分支。

## 响应式检查

| 视口宽度 | 内容宽度／scrollWidth | 结果 |
| --- | --- | --- |
| 320px | 305px／305px | 无横向溢出，课程按钮约 72px 宽，简写未超出按钮 |
| 390px | 375px／375px | 三列蜂窝，课程说明位于下方 |
| 768px | 753px／753px | 五列蜂窝，说明位于下方 |
| 1280px | 1265px／1265px | 五列蜂窝与说明左右并列 |
| 1920px | 1905px／1905px | 无横向溢出，正文 18px，课程按钮约 124px 宽 |

## 预览文件

- `docs/qa/academic-first-screen.png`：桌面首屏。
- `docs/qa/academic-honeycomb-desktop.png`：桌面课程蜂窝，选中 JHU Calculus III。
- `docs/qa/academic-mobile.png`：390px 手机完整页面，选中 SRI。

浏览器临时尺寸覆盖已重置。本轮修改为本地实现。

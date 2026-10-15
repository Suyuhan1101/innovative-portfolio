# Music 首版验收

日期：2026-10-14。

final result: passed

## 页面内容

- 独立 `MusicPage` 已接入 `/music`，移除旧占位文字。
- 四岁开始学琴的开场、Waterloo 八小节练习故事、两段比赛视频、六首常弹曲目、听歌偏好与现有 Flower Dance 播放器，以及朋友音乐会照片。
- 视频分别为用户提供的 xKYULP7QCu0 与 Uj43Vgn40sc。使用核对过的 2022 / 2021 比赛原标题，未猜测演奏曲名或奖项。
- 琴曲名称 Ballade pour Adeline 的拼写已参考出版商核对；其他作品保持用户给出的名称，不添加未确认的作者与编曲。
- 乐团照片明确为朋友的交响乐音乐会，朋友就读辛辛那提大学音乐专业。

## 桌面与手机视觉

- 延续全站 paper / ink / green、DM Serif Display / DM Sans。标题与故事、视频、曲目、听歌、照片各有层次；没有把每首作品做成重复卡片。
- 桌面视频两列，手机单列；封面完整包含官方缩略图，保留原有画面与水印。
- 390px 和 320px 正文 16px；分别测得 clientWidth / scrollWidth 为 375 / 375 与 305 / 305。
- 768px 平板 clientWidth / scrollWidth 为 753 / 753。两列视频各约 333 × 200px。
- 390px 视频约 335 × 200px；320px 约 265 × 200px，符合 YouTube 的最小播放器尺寸。
- 已实际查看桌面全页、手机首屏与比赛区域、平板首屏；标题、曲目、控件、图片均可读，没有待修复的溢出或遮挡。

## 真实播放与交互

- 首次进入：iframe=0，audio=1，audio src=null；封面正常加载。没有自动播放音乐或预先加载 YouTube 播放器。
- Enter 打开 2022 比赛视频，YouTube 内部 video 的 paused=false，实际观察 currentTime 约 59.14s、duration 221.681s；成功播放。
- 关闭 2022 播放器后 iframe=0，焦点返回 Watch 2022 piano competition。
- 启动 Flower Dance 后，Space 打开 2021 视频；背景音频 paused=true，时间约 13.82s，页面只有一个比赛 iframe。
- 2021 视频内 video 的 paused=false，实际观察 currentTime 约 21.89s、duration 300.211s；成功播放。
- 从浮动控制条重新播放 Flower Dance 后，比赛 iframe 被卸载，背景音频 paused=false。
- 点击音乐会照片进入既有大图查看器，图片加载完成；Escape 关闭，焦点返回照片按钮。
- Music → 首页，背景音频持续播放，观察首页 currentTime 约 17.48s；浏览器返回 Music 后时间约 28s，仍只有一个 audio，没有重播欢迎开场。
- 检查结束后 Stop 清除背景音频 src；所有比赛 iframe 为零，保持安静。临时视口覆盖已恢复。
- 最终 /music，phase=idle，data-entering=false，全部图片已加载，浏览器 error 日志为空。

## 构建

- `npm run typecheck` 通过。
- `npm run build` 通过，首页与原有栏目成功静态生成。
- `git diff --check` 无输出。现有项目源码仍大部分未跟踪；没有修改用户原有 README 差异，没有提交、推送、部署或修改域名。

## 证据

- `docs/qa/music-first-screen.png`、`music-full-page.png`：桌面首屏及完整内容。
- `docs/qa/music-video-2022.png`、`music-video-2021.png`：两段真实播放器。
- `docs/qa/music-mobile.png`、`music-mobile-videos.png`、`music-320.png`、`music-tablet.png`：响应式布局。
- `docs/qa/music-concert-viewer.png`：音乐会大图。
- `docs/qa/music-final-first-screen.png`：最终首屏。

部分长页面 screenshot(fullPage) 调用在浏览器提供方返回截图失败，因此手机使用逐屏截图，并用 DOM 几何核对尺寸；桌面完整页已在同一代码版本成功保存并查看。没有把截图失败误判成页面布局错误。

内容来源与播放文档见 `docs/media/music-sources.md`；实现方案见 `docs/content/music-spec.md`。

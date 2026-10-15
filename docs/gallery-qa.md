# Gallery 首版验证

日期：2026-10-14。

## 内容与媒体

- 共 25 张照片，分类计数为 17 / 6 / 2；All photographs 显示 25。
- 源文件备份与网页图片副本哈希逐一一致；原件未覆盖。网页缩略图仅做 CSS 取景，完整查看使用原始比例。
- 一段约 36 秒的中医实习配药视频，网页版本约 3.8MB，H.264 / AAC；旋转与完整解码已核对。详见 `docs/media/gallery.md`。

## 浏览器检查

- 从既有菜单进入 Gallery，使用原有栏目转场。照片进入时按屏幕位置排序，避免分列的 DOM 顺序导致先显示整列。
- Landscapes 显示 17 张；Enter 选择 Places & culture 显示 6 张；Small details 显示 2 张。
- 两张细节照片在桌面分列，未堆在同一列；小于三张时不会强行填满所有列。
- 打开细节照片后，左右方向键和前后按钮按该过滤范围循环，计数 1/2、2/2 正确；Escape 关闭后焦点返回原缩略图。
- 换图后的 alt、caption 与实际图片一致，图片在加载后淡入，旧图不再配上下一张的标题。
- 390px 手机可以打开完整照片，查看器约 335px 宽，竖幅图实际显示比例约 0.7494，与 1279/1706 相符。
- 320px、390px、768px 下无横向溢出；手机一列、768px 两列，桌面三列。
- 视频初始 src=null，preload=none。主动点击后实际播放，浏览器 videoWidth=320、videoHeight=568、duration≈35.939，方向正常；已验证播放至结尾，也能通过原生键盘控件暂停。
- 从 About Me 启动背景音乐并切至 Gallery：音乐原本播放中；启动视频后 audio.paused=true、video.paused=false，浮动音乐入口显示 Paused。
- 测试音乐已停止，音源已移除；临时视口已恢复。
- 首页仍有原来的七个轮播圆点和照片。
- Projects 展开后，原有 ARDS 海报入口仍打开正确的研究海报，新的 Gallery 照片清单未替换首页／项目的查看清单。
- 最终回到 `/gallery`，全站音乐已停止，视频恢复未请求音源的初始状态；浏览器错误日志为空。

## 构建

`npm run typecheck` 通过；最终 `npm run build` 通过，现有路由均成功生成。没有增加运行依赖、后端或云端配置。

## 截图

- `docs/qa/gallery-first-screen.png`
- `docs/qa/gallery-wall.png`
- `docs/qa/gallery-mobile.png`
- `docs/qa/gallery-viewer.png`
- `docs/qa/gallery-video.png`

本轮为本地实现，未提交、推送、部署或修改 DNS。

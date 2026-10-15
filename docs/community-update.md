# Travel 改为 Community

## 2026-10-15：医院西藏义诊活动

- 用户提供七张活动照片，确认作为医院公益活动介绍展示。机构为叙述主体，不标为本人参加或拍摄。
- 新增 `The clinic's outreach in Tibet` 区块，时间为 `Every July–September`，地点为 Tibet。放在个人实习内容之后。
- 团队合影作为横幅，其余六张采用三列排列，手机单列。原有实习介绍、钢琴／诊所视频交互与 Gallery 分类保持原内容。
- 原图和网页副本逐字节保存，总计 870,091 字节，七张均无 EXIF。清单、尺寸与 SHA256 位于 `docs/media/community-sources.json`，整理脚本为 `scripts/prepare-community-photos.mjs`。
- 七张图片均在实际页面加载成功，桌面页面可用宽度与内容宽度同为 1265px。320×720 手机视口两者同为 305px，照片宽度均为 265px，无横向溢出。
- 共享照片查看器可用 Enter 打开，前后按钮和左右方向键切换。已确认 1→7、7→1 的首尾切换及 1→2 的下一张操作；Escape 关闭后焦点回到原照片按钮。手机竖幅查看器完整显示照片及 5/7 计数。
- `npm run typecheck`、最终 `npm run build`、`git diff --check` 通过。临时视口已恢复，所有媒体处于停止状态。
- 截图：`docs/qa/community-outreach-full.png`、`docs/qa/community-outreach-desktop.png`、`docs/qa/community-outreach-mobile-viewer.png`。本轮未发布。

## 2026-10-15：加入诊所实习

- 已用 Jing Cheng Yi An Traditional Chinese Clinic 实习内容替换占位页。用户确认 2024、2025 两个暑假，每次约两个月，地点为北京。
- 页面包含每天约 40–50 份中药配药、两种称量方式、跟诊学习、医生直接监督下的入门针灸练习，以及药材辨识。
- 接入本人制作的诊所介绍视频 `SGG76XnPxqo`，点击封面后页内播放，支持原生控件与全屏。原有 Gallery 里的配药短片继续保留。
- 视频初始不挂载 iframe。键盘 Enter 可开始播放；关闭后恢复封面焦点。播放视频会暂停背景音乐，重新播放背景音乐会停止视频。
- 已在实际浏览器确认视频成功播放：`readyState=4`、`paused=false`，桌面播放到约 42 秒，手机播放到约 31 秒，时长约 1 分 50 秒。
- 相关诊所系统链接经过既有转场进入 Projects；离开时 iframe 被移除，返回 Community 恢复封面，没有自动播放。
- 320×720 手机视口中播放器为 265×200px；内容宽度与可用宽度同为 305px。768px 视口两者同为 753px，均无横向溢出。
- `npm run typecheck`、最终 `npm run build` 与 `git diff --check` 通过，浏览器错误日志为空。测试结束后背景音乐与视频均已停止，响应式视口恢复默认。
- 截图：`docs/qa/community-clinic-full.png`、`docs/qa/community-clinic-desktop.png`、`docs/qa/community-clinic-mobile.png`、`docs/qa/community-clinic-mobile-video.png`、`docs/qa/community-clinic-mobile-details.png`。
- 文案与设计依据见 `docs/content/community-spec.md`。本轮仅修改本地作品集，未发布。

## 2026-10-15：栏目更名记录

日期：2026-10-15。

用户确认将第七个栏目 Travel 改为 Community。本轮完成栏目替换；具体社区经历尚未提供，页面使用简短占位文案。

- 首页入口、菜单、栏目标题、网页标题与站内链接统一改为 Community，路径为 `/community`。
- 沿用既有线框图标风格，将指南针改为 Phosphor UsersThree 多人图标。
- About Me 的旧 Travel 入口同步指向 Community；个人简介、Gallery 中的旅行内容与照片继续保留。
- 旧 `/travel` 返回 308，Location 为 `/community`。
- `npm run typecheck`、`npm run build` 通过；构建清单含 `/community`，不再生成 `/travel`。
- 预览：`docs/qa/community-page.png`。

## 页面验收

- 首页第七个入口为 Community，href 为 `/community`，页面没有指向 `/travel` 的链接。点击后成功进入新栏目，保留原有方块过渡动画。
- 菜单最后一个入口为 Community，页面 h1 与浏览器标题均正确显示，使用多人图标。
- 320 × 720 视口下页面标题完整；小方块标签采用 10px 字号，实测文字宽约 52px，小于 56px 方块宽度。仅对 Community 的小徽标与其飞行动画降低最小字号，首页与菜单字号沿用原设计。
- 临时视口已恢复，浏览器 error 日志为空。最终构建通过。
- 截图：`docs/qa/community-home.png`、`docs/qa/community-menu.png`、`docs/qa/community-mobile.png`。

## 原 Travel 文案归档

原介绍：High places and new perspectives.

In Xinjiang, I hiked at an altitude of 4,700 metres. I love looking down from high places and seeing how the landscape fits together.

Other moments I remember include watching alligators from a small boat in a Miami swamp, seeing dragon boat racing in Shenzhen, and trying new food along the way.

原占位：Places, photographs and travel notes will be added here.
# NTHS / UPchieve · 2026-10-15

- 在 Community 前部加入 Summit Country Day NTHS Chapter，用户确认该分会通过 UPchieve 开展线上辅导。角色为 Founder & President，Jan 2026–Present，Remote。
- 英文正文包含招募六位学生志愿者、建立 Discord 协调团队、辅导五位学生、超过 60 小时平台服务以及额外每周团队支持时间。服务时长不改写为授课时长。
- 截图按自然比例展示，原图和公开目录副本与源文件 SHA-256 相同，3048 × 1095、142,268 字节，无 EXIF；来源记录为 `docs/media/upchieve-source.json`。
- `npm run build` 通过，包括 TypeScript 和全部 10 个静态页面。`git diff --check` 通过。
- 浏览器确认新内容、诊所介绍和义诊图集均存在。桌面截图约 987 × 354 px；320 × 720 下图片约 265 × 95 px，正文单列，页面宽度与滚动宽度均为 305 px。检查后已恢复默认 1280 × 720 视口。
- 桌面预览：`docs/qa/community-upchieve-desktop.png`、`community-upchieve-section.png`；手机布局数据：`docs/qa/community-upchieve-mobile-check.json`。本轮仅修改本地作品集。

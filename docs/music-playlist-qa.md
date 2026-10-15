# Music 曲单与模式验收

日期：2026-10-15。

## 已验证的行为

- 首次进入：只有一个 audio，src=null；没有比赛 iframe。曲单可见六首，默认 Play once。
- 五首新增文件均通过真实播放：Luv Letter、Ballade pour Adeline、Mariage d'Amour、Senbonzakura、The Battle of Waterloo；浏览器 audio 为 paused=false / readyState=4，实测 duration 与文件记录一致。Flower Dance 在循环测试中亦实际播放。
- 通过可见进度滑块的 End 键将 Luv Letter 播到结尾：audio ended=true、paused=true，标题保持 Luv Letter，状态为 Finished · play again。
- 切换到 Loop all，播放列表最后一首 The Battle of Waterloo，再用 End 键到曲终：音源自动变为 Flower Dance，paused=false，观察到新曲时间约 8.47s。
- 切到 Shuffle 并将 Flower Dance 播到曲终：自动续播 Senbonzakura，paused=false，观察到时间约 9.20s；没有重复 Flower Dance。
- 展开面板中 Next 从 Senbonzakura 切到 Luv Letter，Previous 回到 Senbonzakura，封面与标题同步。暂停后 Next 只切换选择，audio paused=true、src=null，保持静音。
- 模式按钮只经过 Play once / Loop all / Shuffle。整页和浮条同步显示，展开后也保留模式。所有按钮使用英文可访问名称，mode 按钮提示下一个模式。
- Music → About Me → Music，仍使用同一音源与同一个 audio，进度持续增加，未重播欢迎开场；About Me 实测 The Battle of Waterloo 约 88.25s、mode=loop、paused=false。
- 打开 2022 比赛视频：背景 audio paused=true，只有一个 iframe；点击 Senbonzakura 恢复背景音乐后 iframe=0、audio paused=false。
- 展开/收起沿用封面共享动画，当前封面正确更新；Escape 可收起，焦点回到浮条。

## 响应式与素材

- 桌面 1265px 两列曲目，各自包含用户提供的封面、英文标题、录音者、时长和播放按钮。当前播放项使用绿色文字与暂停圆标。
- 390px 曲单为单列，clientWidth=375 / scrollWidth=375，浮条高约 66px，bottom=832，小于 innerHeight=844。
- 320px 展开播放器中最长标题 The Battle of Waterloo 完整分两行；封面和控件没有横向溢出，面板内部 clientWidth / scrollWidth=263 / 263，面板约 265 × 554px。下一首、上一首、模式和音量均可见。
- 768px 平板两列曲单与视频正常显示，clientWidth / scrollWidth=753 / 753，长标题自然换行。
- 五个原文件、原封面都已保留；网页使用完整的 320 kbps MP3。完整解码后与源文件 PCM 帧数完全相同；源文件哈希未改变，详见 `docs/media/music-audio.json`。

## 自动检查

- `node --test scripts/music-playback.test.mjs`：4 项通过，覆盖单次停止与手动跳曲、循环全部顺序及回绕、随机索引的可达性和排除当前曲、模式轮换与空/单曲边界。
- `npm run typecheck`：通过。
- `npm run build`：通过，所有栏目成功生成。
- `git diff --check` 无输出。最终浏览器 error 日志为空，audio=1、src=null、paused=true、iframe=0；临时视口已恢复，保留 Music 曲单预览。
- 未提交、推送或部署。保留现有 README 差异。

## 预览

- `docs/qa/music-playlist-desktop.png`
- `docs/qa/music-player-modes.png`
- `docs/qa/music-playlist-mobile.png`
- `docs/qa/music-player-mobile.png`
- `docs/qa/music-player-320.png`
- `docs/qa/music-playlist-tablet.png`
- `docs/qa/music-playlist-final.png`

## 2026-10-15 展开播放器缩小

根据用户截图中「组件有点大了，缩小一点点」的反馈，展开面板最大宽度从 430px 调至 370px。桌面实测约 370 × 534px，宽高较上一版均缩小约 14%；封面限制到 210px，收紧内边距、标题、状态与控件间距。样式限定在展开面板内，播放按钮保留 44 × 44px。

- 1280 × 720 视口：最长曲名 The Battle of Waterloo 完整显示，面板 contentHeight / scrollHeight = 532 / 532，无内部滚动。
- 320 × 720 视口：面板约 265 × 503px，contentWidth / scrollWidth = 263 / 263，contentHeight / scrollHeight = 501 / 501；完整标题分两行，模式、进度和音量全部可见。
- 展开与 Escape 收起正常，临时视口恢复；`npm run typecheck`、`npm run build` 均通过。
- 截图：`docs/qa/music-player-compact-desktop.png`、`docs/qa/music-player-compact-mobile.png`。

## 2026-10-15 返回主页的浮条图层

用户反馈返回首页时，飞动的栏目方块会遮住音乐浮条。将普通浮条置于 z-index 95（栏目动画为 90，欢迎开场为 100）；菜单导航开始后把浮条渲染到同一顶层，避免受菜单 z-index 60 的堆叠上下文限制。菜单稳定打开时仍在菜单内显示控件，保持原有键盘焦点范围。

- Music 直接 Return to Home 的 content-exit 阶段：实测浮条层级 95、飞动图标 90，dockCount=1；最终首页浮条位于栏目方块之上。
- 菜单选择 Music 的 menu-items-exit 阶段：浮条已移到菜单外，层级 95，飞动图标 90，dockCount=1。
- Music → 菜单 → Home 同样实测层级 95 / 90、浮条位于菜单外，最终 phase=idle，audioCount=1、dockCount=1；浏览器 error 日志为空，临时视口已恢复。
- `npm run typecheck`、`npm run build`、`git diff --check` 均通过。
- 预览证据：`docs/qa/music-layer-return-start.png`、`docs/qa/music-layer-return-home.png`、`docs/qa/music-layer-menu-flight.png`、`docs/qa/music-layer-menu-home.png`。

### 手机端播放中补充回归

- 390 × 844 视口，Music 播放 The Battle of Waterloo 后直接回首页：content-exit 阶段浮条 / 图标层级为 95 / 90，audioCount=1、dockCount=1。首页 idle 后仍 paused=false，进度约 19.47s；页面宽度与 scrollWidth 均为 375px。
- 播放中经菜单进入 About Me：导航阶段维持 95 / 90 层级且只有一个浮条；About Me 的完整播放器显示同一曲目，时间约 68.95s，持续播放。
- About Me → 菜单 → Home：浮条处于菜单外，层级 95，图标 90；音乐没有暂停或重置。最终首页 idle，paused=false，时间约 111.64s，audioCount=1、dockCount=1。
- 检查完成后已暂停测试音乐、恢复默认视口。浏览器 error 日志为空；预览服务已恢复。此次仅补充验证记录，没有额外修改实现。
- 最终静音预览使用 390 × 720 视口保存，浮条约 335 × 79px，bottom=708px，完整位于屏幕内，随后已恢复默认视口。
- 证据：`docs/qa/music-layer-mobile-return.png`、`docs/qa/music-layer-mobile-home-playing.png`、`docs/qa/music-layer-mobile-menu-home.png`、`docs/qa/music-layer-mobile-verified.png`。

# Hobby 三分类验证

日期：2026-10-15。用户确认 Music 占左侧大卡，Sport 在右上，Robotics & LEGO 在右下。

- `npm run typecheck`、`npm run build`、`git diff --check` 通过；新增三个详情路由成功预生成，浏览器标题均为 Yuhan Su。
- 1440px 视口下，Hobby、Projects、Community 的卡片相对坐标、尺寸和边框逐项相等：左卡 540×534px，右侧两卡各 540×253px，边框均为 5px。三页直接共用组件与 CSS。
- 完整动画下实际悬停触发同样的绿色扫入效果，颜色 alpha 为 0.75；减少动画模式下过渡时长为 0s。
- Sport 有三段游泳录像；Robotics & LEGO 同页保留比赛、机械臂、行走机器人三段录像。六段本地视频均实际播放，readyState 达到 4、时间正常前进，HTTP 分段响应为 206。
- 视频播放前没有 MP4 请求；视频均按需设置 src，没有自动播放。开始下一段会暂停上一段，离开详情页后播放器已卸载并暂停。
- Music 详情保留两段钢琴演出入口和六首播放列表；未点击演出前没有 iframe。音乐组件与共享播放状态继续复用。
- 三张卡片分别进入 `/hobby/music`、`/hobby/sport`、`/hobby/robotics-lego`。返回入口恢复卡片焦点和滚动位置，浏览器后退／前进正常，重新进入视频详情不会自动续播。
- 390px 与 320px 宽度下三张卡片纵向排列；三个详情页均无横向溢出。泳池录像和竖屏 LEGO 录像保持原显示比例，手机实际播放成功。
- 三段新录像的 H.264 数据与原件的哈希相同，网页副本无音轨；原件保存在忽略目录。来源校验见 `docs/media/swimming-videos.json`，重建脚本为 `scripts/prepare-swimming-videos.py`。
- 浏览器错误和警告均为 0。截图及本地浏览器记录保存在忽略的 `docs/qa/hobby-cards-2026-10-15/`。

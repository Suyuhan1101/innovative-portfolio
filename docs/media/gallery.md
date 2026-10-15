# Gallery 照片与视频

日期：2026-10-14。用户本轮提供 25 张照片和一段视频，并允许裁剪；照片用来展示本人旅行与观察视角。

## 文件与构图

- 原始 JPEG 总计 10,160,596 字节，25 张均保存到 `assets/originals/gallery/`，SHA256 已逐一核对。
- 网页 JPEG 副本在 `public/media/gallery/`，与收到的文件逐字节相同。25 张均未检出 EXIF 块。
- 网页缩略图通过 CSS 取景：横幅通常 4:3、超宽图 16:9、竖幅 4:5；根据主体设置焦点位置。没有重绘照片，也没有覆盖原件。
- 完整查看器使用真实宽高、contain 和适合视口的图片尺寸，保留全部画面。切换时图片重新挂载并在加载后淡入，避免旧图配上新标题。
- 480×640 的瀑布素材保留原尺寸，没有额外放大或虚构细节。
- 公开尺寸清单：`public/media/gallery/manifest.json`；私人来源、大小、哈希及备份记录：`docs/media/gallery-sources.json`；素材整理脚本：`scripts/prepare-gallery.mjs`。

## 地点与描述

用户确认部分山景来自新疆，海边来自迈阿密、龙舟在深圳附近，并去过加州迪士尼；另有中医实习。页面对海浪、龙舟、烟花填写上述地点，其余先用画面内容命名，不把所有雪山、草原和峡谷都标为同一地区。

照片分类：17 张 Landscapes、6 张 Places & culture、2 张 Small details。先以山顶湖景开场，在顺序中穿插建筑、人文和近景；CSS columns 会随宽度自然分列。首页的七张轮播照片和顺序未更改。

## 实习视频

已查看约 2 秒、17 秒、30 秒处的画面：室内药房中整理中药药材的片段，与用户说明的中医实习相符。网页文案为 Preparing herbs during my traditional Chinese medicine internship，不补写机构、日期、岗位资质或医疗效果。

| 项目 | 原件 | 网页版本 |
| --- | --- | --- |
| 保存位置 | `assets/originals/gallery/herb-preparation.mp4` | `public/media/gallery/herb-preparation.mp4` |
| 大小 | 4,570,825 字节 | 3,799,965 字节 |
| 时长 | 约 35.94 秒 | 约 35.94 秒 |
| 显示尺寸 | 320×568 竖屏 | 320×568 竖屏 |
| 音视频 | H.264 Main / AAC LC | 复制原音视频流，未重编码 |
| 其他 | 含附加 mebx 数据轨 | 只保留一条视频、一条音频；移除源容器附加元数据并 faststart |

使用现有 FFmpeg 7.1 工具完成封装整理，保留旋转信息。完整解码校验通过，共 1,078 帧，无解码错误。原件哈希与收到的源文件一致。封面来自原片约第 2 秒，保存为 `public/media/gallery/herb-preparation-poster.jpg`。

网页的 video 初始没有 src，preload=none，显示封面与播放按钮。访客主动点击后才设置 src 并播放，提供原生播放／暂停、进度、音量、全屏控件；播放时暂停正在播放的全站音乐。离开栏目会卸载并暂停此视频。

## 验证记录

网页功能和视口检查见 `docs/gallery-qa.md`。本轮仅本地整理与实现，未推送或发布。

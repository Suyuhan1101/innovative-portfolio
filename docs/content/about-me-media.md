# About Me 素材与展示建议

日期：2026-10-14。状态：原始素材已整理、网页 MP3 已生成并验证；尚未接入页面播放器。

## 图像

| 素材 | 尺寸 | 保存文件 | 建议用途 |
| --- | --- | --- | --- |
| 天蝎座星空图 | 640 × 638 | [scorpio-constellation.png](../../assets/originals/about-me/scorpio-constellation.png) | 个人小档案中的 Scorpio，保留星空氛围。 |
| EV3 相扑机器人 | 1280 × 960，透明背景 | [ev3-sumo-reference.png](../../assets/originals/about-me/ev3-sumo-reference.png) | 编程起点故事的示意图，标记为参考图片；用户说明来自网上。 |
| 太极图 | 250 × 250，透明背景 | [yin-yang.png](../../assets/originals/about-me/yin-yang.png) | 个人传统元素主题的小图，按原有黑白配色呈现。 |
| 五行图 | 2000 × 2000，透明背景 | [five-elements-reference.png](../../assets/originals/about-me/five-elements-reference.png) | 点击展开查看的大图；小档案中突出 Wood · 木。 |
| 音乐封面 | 640 × 640 | [flower-dance-cover.png](../../assets/originals/about-me/flower-dance-cover.png) | Flower Dance 播放区域的封面。 |

原始图片未缩放、裁剪或改色，透明度保留。图像的原始来源链接尚未提供，清单不推断作者或许可信息。参考机器人图用于说明 EV3 类型；用户项目的实际名称与经历沿用已确认的文案。

五行图包含较多文字、箭头和缩写，缩成小卡片后难以辨认。建议在小档案里使用简洁的 Wood · 木 标签，完整图由访客点击展开。太极图保留为小图，避免把 250 px 素材放大到整页。

## 音频

原始文件：[flower-dance.wav](../../assets/originals/audio/flower-dance.wav)。与用户提供的 WAV 逐字节一致。

| 项目 | 实测 |
| --- | --- |
| 曲目 | Flower Dance — DJ Okawari（按用户提供的信息） |
| 编码 | WAV / PCM |
| 采样率 | 44,100 Hz |
| 位深 | 16 bit |
| 声道 | 双声道 |
| 时长 | 265.8 秒，约 4 分 26 秒 |
| 大小 | 46,887,336 字节，约 46.9 MB / 44.7 MiB |

原始 WAV 保存在项目的本地音频备份目录，并被 `.gitignore` 忽略。用户已选择网页使用较小的高质量压缩版本。

网页播放文件：[flower-dance-320.mp3](../../public/media/about-me/flower-dance-320.mp3)。已接入播放器，音源路径为 `/media/about-me/flower-dance-320.mp3`。

| 网页版本 | 实测 |
| --- | --- |
| 编码 | MP3 / LAME，320 kbps 固定码率 |
| 采样率与声道 | 44,100 Hz，双声道 |
| 大小 | 10,635,060 字节，约 10.6 MB / 10.1 MiB |
| 相对原版减小 | 77.32% |
| 完整解码时长 | 265.8 秒 |
| 解码验证 | 11,721,780 个音频帧，与 WAV 完全同长；MPEG 格式、码率、采样率与双声道检查通过 |
| 原版完整性 | 转换后 SHA-256 与备份记录一致 |

编码使用 LAME 的算法质量参数 0；码率与算法质量的含义参见 [FFmpeg 编码器选项](https://ffmpeg.org/ffmpeg-codecs.html#libmp3lame)。转换只压缩音频格式，未剪辑、调速或修改音量。上述验证确认文件完整解码与参数一致，不声称 MP3 与 WAV 的音频数据完全相同。

转换脚本：[prepare-about-audio.py](../../scripts/prepare-about-audio.py)。使用带 libmp3lame 的 FFmpeg：

```powershell
python scripts/prepare-about-audio.py --ffmpeg <FFmpeg可执行文件的路径>
```

脚本核对原始文件哈希，默认拒绝覆盖已有播放文件；成功编码及验证后更新素材清单。

播放器文案使用「Flower Dance — DJ Okawari」。用户会在钢琴上弹奏这首曲子的事实写在个人介绍中；当前收到的文件按原曲音源记录。

## 建议页面顺序

1. 保留 About Me 栏目标记和标题转场；使用轻松的问候。
2. 展示个人小档案：生日月日、Scorpio、Wood · 木、黑白色、秋天、乐器和邮箱。
3. EV3 起点故事配参考机器人图。
4. 音乐段配封面与访客主动点击的播放按钮（首版已按用户选择移至首屏，与小档案并排）。
5. 旅行与课外生活使用已有真实照片及短文。

播放器已提供播放／暂停、进度、音量与时长；由访客点击后才请求音源（preload=none，并在点击时设置 src）。共享音频实例跨栏目继续播放，其他栏目、菜单和媒体弹窗均有暂停入口。五张图的网页副本在 `public/media/about-me/`，逐一核对 SHA-256 与原图相同，未编辑像素。网站既有首页轮播顺序沿用原配置；这批素材供 About Me 使用。

机器可读清单：[about-me-media.json](about-me-media.json)。文案：[about-me-draft.md](about-me-draft.md)。

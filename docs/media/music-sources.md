# Music 素材与参考

日期：2026-10-14。

## 用户演奏视频

用户确认均为自己的童年比赛视频，尚不记得演奏曲名。

| 页面标签 | 用户链接 | 官方 oEmbed 标题 | 缩略图 |
| --- | --- | --- | --- |
| 2022 piano competition | https://www.youtube.com/watch?v=xKYULP7QCu0 | 2022年振兴杯钢琴比赛 | https://i.ytimg.com/vi/xKYULP7QCu0/hqdefault.jpg |
| 2021 piano competition | https://www.youtube.com/watch?v=Uj43Vgn40sc | 2021振兴杯钢琴比赛 | https://i.ytimg.com/vi/Uj43Vgn40sc/hqdefault.jpg |

两个标题与频道名 kai su 已通过 YouTube 官方 oEmbed 接口读取；不从标题推断奖项、排名、年龄或曲目。封面远程显示，不下载视频。每段保留原始 YouTube 链接。

## 既有本地素材

- 乐团照片：content/media.ts 中 name=04-orchestra，沿用已准备的原图与首页裁剪，用户补充为去看辛辛那提大学音乐系朋友的交响乐演出。完整大图复用既有查看器。
- Flower Dance：复用既有封面和 320 kbps MP3，现与其他五首集中于 `content/music-tracks.ts`；原始 WAV 继续保留。网页使用全站唯一音频实例，录音不标成用户演奏。

## 名称与播放器参考

- Ballade pour Adeline：用户原写 Ballade Pour Adelin，展示拼写参考 [Hal Leonard 出版目录](https://www.halleonard.com/product/202054/ballade-pour-adeline)。没有添加未确认的演奏编曲信息。
- 嵌入参数与原生控件：[YouTube Embedded Players and Player Parameters](https://developers.google.com/youtube/player_parameters)。iframe 点击后才加载，保留全屏、键盘与原生进度控制；至少 200px 高。

## 2026-10-15 新增五首本地音乐

用户提供五个音频文件与按顺序对应的五张封面，要求接入 Music、英文曲名与三种播放模式。循环已明确为「全部歌曲按列表循环」。

| 英文展示名 | 文件与演奏者依据 | 封面剪贴板 ID |
| --- | --- | --- |
| Luv Letter | `D:/无损音乐/Dj_Okawari_-_Luv_Letter.wav`；DJ Okawari 依据用户文件名 | a87c3d75-93d3-4cc0-ab53-7211703b25d1 |
| Ballade pour Adeline | `D:/Downloads/Ballade Pour Adeline.flac`；文件内 artist 为 Richard Clayderman | c154614a-41d9-44eb-a6ed-80e3cdcb5772 |
| Mariage d'Amour | `D:/Downloads/Mariage d'Amour.flac`；文件内 artist 为 Richard Clayderman | dd93eb37-4e29-4a80-9e88-215dd3769ce1 |
| Senbonzakura | `D:/Downloads/千本樱.flac`；英文名由用户指定，artist 标签为 Masque_Jupiter | d17062fc-80cf-462a-8d69-da35d67c97b9 |
| The Battle of Waterloo | `D:/Downloads/waterloo.flac`；全名由用户指定，原 artist 为「韩国群星」，仅泛称 Various artists | 24aff120-eaa7-4532-a413-23dad789ff76 |

封面沿用用户给定的对应关系，保持原始像素与图中文字；不据封面推断实际演奏者（Mariage d'Amour 的封面署名与音频标签不同，页面使用音频标签）。网页标题、比赛介绍与控件均不再含中文曲名。法文原题保留其通行拉丁字母拼写。

`scripts/prepare-music-audio.py` 保留原文件与封面副本到被 Git 忽略的 `assets/originals/audio/`，网页版本为 320 kbps / 44.1kHz / stereo MP3；没有更改原文件或音量。五首均完整解码原文件及输出文件并比对 PCM 帧数，检查编码格式与原始 SHA256。具体时长、大小、来源与哈希见 `docs/media/music-audio.json`。脚本工具依赖仅放在被 Git 忽略的 `.tools/audio/`，未增加网站运行依赖。

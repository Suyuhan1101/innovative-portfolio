# Music 内容与实现方案

日期：2026-10-14。用户通过 grill-me 补充经历后，现有内容足够实现首版。

## 内容与事实

- 四岁学钢琴；吉他、架子鼓、马林巴为初学者；已修 AP Music Theory。
- Waterloo：喜欢其斗志昂扬的感觉，最初弹得磕磕绊绊，曾花几个小时练八小节。
- 常弹六首作品按用户名单展示，不给未确认的版本添加作者、难度或练习故事。
- 两条视频均为用户确认的童年比赛演奏。YouTube 官方 oEmbed 标题：xKYULP7QCu0 = 2022年振兴杯钢琴比赛；Uj43Vgn40sc = 2021振兴杯钢琴比赛。用户忘记曲名，因此用比赛年份和原标题，不将视频与 Waterloo 对应，也不推断名次。
- 音乐会照片来自用户朋友的交响乐演出；朋友是辛辛那提大学音乐系学生，作为听演出的经历呈现。
- 听歌段落复用已确认的偏好和 Flower Dance，不新增没有音源的歌曲播放器。

## 视觉计划

继续使用 paper #faf9f4、ink #11141c、green #17492d、accent #b53b24、muted #69707b、rule #d8d9d1。DM Serif Display 用于标题，DM Sans 用于正文与控件；正文 16–18px。左对齐，薄线与留白组织段落，避免给每首曲子套相同卡片。

```text
Music [既有栏目标题]
On the keys, since I was four.       Piano / other instruments / theory

Eight bars of Waterloo              练习故事

Early performances
[2022 视频封面 → 点播]               [2021 视频封面 → 点播]

Pieces I love to play                A little atmosphere.
六首作品的两列列表                    听歌偏好 + 现有 Flower Dance 播放器

An evening of live music             乐团照片 + 真实背景
Back to my world
```

页面记忆点是具体的八小节练习和真实早期演奏素材。采用现有字体和栏目动效，不新建风格、装饰音符或抽象波形。

## 播放与交互

- 比赛封面采用官方 YouTube 缩略图；保留在 YouTube 打开的正常链接，不下载远程视频。
- 初始没有 iframe；点击后才加载 youtube-nocookie 播放器，保留 YouTube 原生控件与全屏。每次只有一个比赛视频 iframe。
- 加载比赛视频时暂停 Flower Dance；访客再次启动背景音乐时卸载比赛播放器，避免两个音源重叠。离开栏目自动卸载 iframe。
- 提供关闭视频并回到封面的入口；关闭后焦点回到相应按钮。Enter / Space 可加载视频。
- 现有全站音频实例、跨栏目续播、浮动播放器、收起动效继续共用。
- 手机单列，视频区域保持至少 200px 高；照片保留完整构图并可进入现有大图查看器。

## 验收

检查实际桌面、390px、320px、平板排版；初始音频无源且 iframe 为零；视频点击后才出现、切换只保留一个、关闭恢复焦点；核对背景音乐互斥、链接、图片查看、现有导航。运行类型检查与生产构建，记录外部 YouTube 实际可用状态。

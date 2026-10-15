# 首页画廊素材

整理日期：2026-10-14（America/New_York）。

本批使用最新上传的七张图片。按用户最新要求，参照已选首页的横向轮播区比例，不采用先前的 3:4。参考图中照片区约为 686 × 440，宽高比约 1.559:1。

只裁剪，不缩放、拉伸或生成内容。对齐首页比例的四张裁剪尺寸在原始像素坐标上取整数，与参考比例的差异小于一像素；海报裁剪保留其比例例外。裁剪版以无损 PNG 保存，已校验全部像素与原图对应裁剪区域完全一致。

用户已确认海报与雪山人物照保留完整主体，作为比例例外。海报现已换成 10 月 14 日新上传的较亮照片，并按最新要求裁掉外围边距；标题、文字、图表、标志与页脚完整保留，仍沿用海报比例例外。

项目中旧海报的网站文件与原始备份均已删除。

检查食物照后发现薯条顶部与主菜下沿也无法同时放入目标比例，因此沿用完整主体优先原则，追加保留原图。食物与雪山两个完整版本为原文件的逐字节复制。

## 文件清单

| 上传顺序 | 内容 | 网站素材 | 尺寸 | 处理 |
| --- | --- | --- | --- | --- |
| 1 | ARDS 研究海报（新照片） | [01-ards-poster-cropped.png](../../public/media/home-gallery/01-ards-poster-cropped.png) | 1550 × 1193 | 仅裁外围边距，完整保留海报内容；比例例外。 |
| 2 | 水墨画照片 | [02-ink-artwork-cropped.png](../../public/media/home-gallery/02-ink-artwork-cropped.png) | 1706 × 1094 | 裁掉外围墙面，保留画作与画框。 |
| 3 | 机器人团队照片 | [03-robotics-team-cropped.png](../../public/media/home-gallery/03-robotics-team-cropped.png) | 1280 × 821 | 保留三人的头部、手部与机器人，去掉上方和前景留白。 |
| 4 | 乐团照片 | [04-orchestra-cropped.png](../../public/media/home-gallery/04-orchestra-cropped.png) | 1994 × 1279 | 保留中央乐团场景与全高，裁掉左右边缘。 |
| 5 | 食物照片 | [05-food-full.jpg](../../public/media/home-gallery/05-food-full.jpg) | 1706 × 1280 | 完整原图，保留主菜与薯条。 |
| 6 | 雪山人物照 | [06-snow-mountain-full.jpg](../../public/media/home-gallery/06-snow-mountain-full.jpg) | 1708 × 1280 | 完整原图，保留山顶与人物。 |
| 7 | 网球照片 | [07-tennis-cropped.png](../../public/media/home-gallery/07-tennis-cropped.png) | 1706 × 1094 | 保留两位球员和球拍，裁掉上下空余区域。 |

网站素材位于 `public/media/home-gallery/`；七张原始文件分别备份于 `assets/originals/home-gallery/`，备份的 SHA-256 与上传文件一致。

新海报原图为 [01-ards-poster.jpg](../../assets/originals/home-gallery/01-ards-poster.jpg)，尺寸 1672 × 1228；裁剪区域从原图坐标 (60, 35) 开始，宽 1550、高 1193。没有缩放或修改像素。

[manifest.json](../../public/media/home-gallery/manifest.json) 按播放顺序记录每张图片的原始尺寸、裁剪坐标、输出尺寸、比例例外及像素校验结果；upload_order 保留原上传位置，playback_order 表示播放位置。

## 播放顺序

[playback-order.json](../../public/media/home-gallery/playback-order.json) 是播放顺序配置。按用户最新要求，前六张顺序如下；未提及的食物照保留为第七张：

1. 人物照（雪山人物照）。
2. 网球。
3. 乐团。
4. 水墨。
5. ARDS（替换后的新照片）。
6. 机器人。
7. 食物（作为第七张保留）。

首次显示人物照，自动播放与七个圆点均遵循此顺序。文件名中的数字仍表示原上传位置，播放顺序由配置决定。

## 后续接入

上方文件清单按上传顺序列出；轮播按独立的播放配置列出。栏目入口继续由栏目配置维护，轮播圆点对应图片播放顺序。

在固定比例轮播区显示海报、食物和雪山三张比例例外图片时，应采用完整显示方式（如 `object-fit: contain`），避免再次裁剪主体。其余四张裁剪版已具有目标比例。

重复生成可在项目目录运行：

```powershell
./scripts/prepare-home-gallery.ps1
```

脚本使用项目内原始备份，不依赖系统临时文件。已有输出会验证后复用；若现有文件与预期不一致，会停止而不覆盖。

# 开发与维护说明

第一轮完成日期：2026-10-14；首版整理日期：2026-10-15。开发分支：`portfolio-first-build`，正式部署分支：`main`。当前功能与发布配置见 [v0.1.0 发布记录](releases/v0.1.0.md)。历史验收文档保留各轮检查时的状态。

## 运行

在项目目录 `D:\innovative-portfolio` 中执行：

```powershell
npm install
npm run dev
```

打开 http://127.0.0.1:3000。开发服务绑定本机地址，不对局域网开放。首次打开或刷新会出现欢迎页，点击页面任意位置或使用 Enter 进入。

```powershell
npm run build
npm run typecheck
# 测试生产模式前先停止占用 3000 的开发服务
npm start
```

`package-lock.json` 固定依赖版本。技术栈为 Next.js 16.4 App Router、React、TypeScript、Motion 和 Phosphor 图标。字体为 next/font 加载的 DM Serif Display 与 DM Sans。

## 内容入口

| 文件 | 维护内容 |
| --- | --- |
| `content/sections.ts` | 七个栏目标题、简介、段落与待补内容提示；同时驱动首页、菜单和静态路由。 |
| `content/media.ts` | 图像描述、说明以及从清单生成的播放数据。 |
| `content/motion.ts` | 所有阶段的时长、错开间隔与缓动曲线；2026-10-14 已按“舒缓连续”调整。 |
| `public/media/home-gallery/playback-order.json` | 七张图的播放顺序；第一张为雪山人物照。 |
| `public/media/home-gallery/manifest.json` | 文件名、原生尺寸、裁剪范围与完整显示的比例例外。 |
| `components/HomePage.tsx` | 首页标题、代表项目、轮播和七个入口。 |
| `components/HomeHeading.tsx` | 首页与 Home 转场共用的标题，确保字体和换行一致。 |
| `components/InstrumentIntro.tsx`、`components/InstrumentIntro.module.css` | 全英文、无声的 YH 仪表启动进场；圆弧、七个刻度和单次扫线，支持 Skip intro。 |
| `components/LandscapeFragments.tsx`、`components/landscape-particles.ts`、`public/media/intro/` | 两股细小风景碎片流；Canvas 图集缓存照片局部裁切，每片独立弯曲漂移和旋转，左上右下。手机端减量，关闭动画或标签页隐藏时停止绘制。 |
| `components/HobbyPage.tsx`、`content/hobby.ts` | Hobby 的 Music、Sport、Robotics & LEGO 三张入口卡片及独立详情；七段本地视频。高中 FTC 测试视频在比赛视频之前，保留原声并默认静音；其余六段保持无声。音乐内容继续由 MusicPage 维护。 |
| `components/GalleryPage.tsx`、`content/gallery.ts` | 43 张照片、分类筛选与两段站内视频；素材尺寸由 public/media/gallery/manifest.json 管理。 |
| `components/Tile.tsx` | 方块图标、名称和箭头，以及保持对比度的反转色视觉层。 |
| `components/SectionPage.tsx` | 各栏目内容与媒体布局。 |
| `components/PortfolioShell.tsx` | 持久页眉、开场、导航、菜单、联系方式和图片弹窗。 |
| `app/portfolio.css`、`app/globals.css` | 共享布局、响应式断点、颜色和字体规则。 |

独立栏目路由为 `/about-me`、`/academic`、`/projects`、`/skills`、`/gallery`、`/hobby`、`/community`；首页为 `/`。`/travel` 永久重定向至 `/community`，原 `/music` 永久重定向至 `/hobby`。Projects、Community 和 Hobby 各有三个独立详情网址，入口数据在 `content/case-studies.ts`，共用卡片布局、详情外框和淡入淡出转场。Hobby 详情为 `/hobby/music`、`/hobby/sport`、`/hobby/robotics-lego`。页面刷新可以直接进入相应栏目或详情，站内导航保留已进入状态。

Hobby 入口按左侧 Music 大卡、右上 Sport、右下 Robotics & LEGO 排列，直接复用 Projects / Community 的 `CaseStudyGallery`。Music 详情保留钢琴视频、播放列表和共享播放器；Sport 详情显示三段游泳视频；Robotics & LEGO 合并比赛录像、机械臂与行走机器人。视频按原比例排列，手机上竖屏视频逐个显示。新视频的音轨已从文件中移除，原件保存在忽略的 `assets/originals/hobby`；`scripts/prepare-hobby-videos.py` 和 `scripts/prepare-swimming-videos.py` 可重新生成无声 MP4、封面及校验报告，结果见 `docs/media/hobby-videos.json` 与 `docs/media/swimming-videos.json`。视频按需加载，离开详情页会卸载并停止播放，返回入口恢复卡片焦点及滚动位置。

原图备份在 `assets/originals/home-gallery`。`scripts/prepare-home-gallery.ps1` 只做原生像素裁剪并核对像素，不改变原图尺寸。现有素材已经准备完成，通常无需重跑。页面通过 Next Image 生成浏览器所需的显示版本，项目中的原图和裁剪图保持原始像素。

## 自适应字号

用户已选择全站自适应，并进一步确认桌面整体缩小约 15–20%、正文 16–18 px。`app/globals.css` 中的 `--text-body`、`--text-lead`、`--text-subtitle`、`--text-small` 等变量集中管理各类文字；默认浏览器字体下，正文限制为 16–18 px。上下限使用 rem，中间值随视口或容器宽度变化。

`app/portfolio.css` 中桌面 `.main-shell` 宽度为 84vw、最大 80rem（默认 1280 px），900 px 以下恢复全宽。页眉独立使用较宽的布局，左右留白为 `clamp(20px, 4.1vw, 74px)`，分隔线与欢迎文字、菜单入口的外侧对齐；正文保持此前的尺寸与位置。首页标题基础字号上限 72 px，栏目标题上限 76 px，开场上限 96 px。不要通过整页 zoom 或 transform 缩放来调整密度，以免影响固定覆盖层和转场测量。

页眉使用自己的宽度计算欢迎文字和 Contact 的大小；首页主标题与介绍按 `.hero-copy` 的宽度计算；栏目标题按 `.section-heading-copy` 剩余空间限制字号，保证长标题在小屏上也能完整显示。欢迎开场同时考虑窗口宽度和高度。菜单和首页按钮使用方块内部的容器宽度，移动层保持同样的规则。保留布局断点，但移除了在这些断点上切换固定字号的规则。

调整窗口会自动触发正文 `ResizeObserver` 重新分行。标题的移动和 Home 交接仍通过真实测量确定位置，不增加逐帧重算字体的逻辑。实际尺寸和截图见 `docs/qa/compact-layout-metrics.json` 与验收记录；`fluid-typography-metrics.json` 保留上一版数据用于对比。移动源按是否为 `.tile` 判断，避免小于 70 px 的真实方块被替换为临时 110 px 方块。

## 动效与状态

首页方块点击依次经历选中固定、内容淡出、方块移动、标题显现、正文显现。菜单另有覆盖、菜单项显现、菜单项退出、页眉显现阶段。路由确认后才开始目标页动画，动画过程中禁用重复操作。正文通过实际字体和容器宽度测量换行，然后逐行显现。

方块移动期间保留原 CSS 宽高，使用 transform 平移／缩放，内部图标和名称也向目标样式对齐；落地时交叉渐显，并同时开始标题动画。每行显现更柔和，总错开跨度限制在 0.8 秒，避免长内容导致持续锁定。实测普通页面转场约 3–4 秒；菜单 Home 增加了方块与首页标题的交接，完整流程约 4.3 秒。

2026-10-16 的进场采用个人化仪表启动：初始为 YH、Yuhan Su 与 Enter my world；点击或按 Enter／空格后，细圆弧、七个刻度与一道绿色扫线分阶段出现，再显示 Welcome to My World。欢迎语随后缩小并飞到左上角页眉，按页眉真实位置与文字宽度对齐，绿色渐变为页眉文字色，落定后揭开原目标页面。启动 1.95 秒，文字移动 0.85 秒，淡出 0.2 秒，整体约 3 秒。播放时提供 Skip intro，Animations Off 直接淡入网站，均跳过文字飞行动画。开场全英文、无声，不包含登录、身份验证或虚假数据状态。此前的照片拼贴和鼠标揭幕已撤销。设计和验收见 `docs/design/instrument-intro.md`、`docs/instrument-intro-qa.md`。

栏目标题通过从左向右的遮罩揭开，同时从左侧轻微移向最终位置。栏目页点击页眉欢迎文字返回时，浮动层保留原栏目的身份，并按 `data-page` 测量首页对应方块；到位后按从上到下显现首页，网格完成显现时再交接。

菜单 Home 以真实 `.home-title` 为目标：移动层的背景独立展开，图标层均匀缩放，随后以从左向右揭开的标题接替。`HomeHeading` 与测量所得的字体、相对行高、字距保证克隆标题与目标标题重合。首页内容恢复时保留克隆标题，介绍区域落定后才交接。没有不可见的 Home 落点，也不增加首页方块。在首页选择菜单 Home 时重置已有渐显样式；异常恢复清除残留的透明度、位移与遮罩。

首页和菜单的可交互方块使用常态层与对比色层，遮罩将背景、图标、文字和箭头同步切换。副本设置 `aria-hidden`，不会生成两个可访问名称；移动层和栏目方块仍使用单一内容层。手机菜单的名称字号与移动层一致，避免点击后突然缩小。

菜单保留底层路由、滚动位置与轮播项；关闭后恢复滚动和焦点。菜单和图片弹窗支持键盘；菜单支持 Escape 和 Tab 焦点循环。浏览器前进／后退恢复相应栏目，使用简化恢复，不重播欢迎页。

开发与生产默认均使用完整动效，保持已确认的舒缓节奏。欢迎页下方和菜单底部的 Animations 使用滑动开关：On 为完整动效，Off 为减少动画模式。开关使用原生 checkbox 和 switch 语义，支持点击标签、空格键切换及菜单 Tab 焦点循环。选择保存在当前网站的 localStorage（`portfolio:motion-preference`），刷新和站内切换均会保留；存储不可用时，当前访问仍能正常切换。旧版保存的 Follow system 偏好仍兼容系统设置，手动切换开关后保存为明确的 full 或 reduced。

JS 转场、轮播和组件 CSS 共用解析后的 `data-motion`，避免显式选择 Full 后仍被组件内的系统媒体查询覆盖。Reduced 保留简短淡入淡出并关闭卡片等装饰过渡。动画执行期间禁用偏好选项，菜单键盘焦点循环包含该选项。

仅开发环境支持 `?qa-motion=full`、`?qa-motion=system` 和 `?qa-motion=reduced`，并在当前标签页的 sessionStorage 保留 QA 选择。通过页面选项改变偏好会清除旧的 QA 存储；带有显式 QA 参数的开发网址刷新时仍按参数执行。生产不会读取这些开发预览参数。2026-10-15 修复了正式版默认跟随系统、开发版默认完整动效造成的速度差异。

## 首轮范围与后续内容

图片轮播、画廊查看器、研究指标、海报、演讲视频、钢琴视频、诊所视频与本地音乐曲目已接入。视频点击后在站内加载播放器；背景音乐由共享状态管理，与视频互斥。长篇项目内容目前由 TypeScript 内容文件维护，没有数据库或 CMS。

Projects 使用已提供的研究事实，明确区分独立提示的 LLM judge 评估与尚待进行的临床验证，不填入未经确认的成绩或性能数字。

## 部署下一步

已确认用户的 Vercel 项目导入本 GitHub 仓库。本地生产构建已通过，生成 21 个页面。推送 `main` 会自动发布至 yhansu.com。使用平台的 Next.js 构建检测；`.vercelignore` 排除本地原件、文档和素材准备脚本。游泳视频的页面数据在 `content/swimming-videos.json`，完整素材校验记录在 `docs/media/swimming-videos.json`，由准备脚本同时生成，页面不依赖被部署排除的文档目录。

DNS 记录应以该 Vercel 项目实际给出的域名设置为准，先取得并验证部署，之后再改 Cloudflare，保留无关记录。实际云端结果单独记录，不以本地构建通过代替部署成功。

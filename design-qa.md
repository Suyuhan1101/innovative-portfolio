# 第一轮设计与交互验收

日期：2026-10-14。范围：本地可运行的首页、开场、七个独立栏目、菜单、轮播和图片查看器。内容占位及未部署状态属于本轮明确范围。

## 设计来源与对照

主要参考：`docs/design/homepage-approved.png`（1402 × 1122）、`docs/design/menu-concept.png`（1487 × 1058）。用户后来提供的真实照片、顺序和比例例外优先于概念图中的生成山景。

浏览器实际截图与参考在同一个输入中并排检查：

- [首页并排对照](docs/qa/home-comparison.png)：参考 1402 × 1122；实际浏览器 CSS 视口 1402 × 1122、有效内容截图 1387 × 1138。
- [菜单并排对照](docs/qa/menu-comparison.png)：参考 1487 × 1058；实际 CSS 视口 1487 × 1058、内容宽 1472。实际全页图的前 1058 像素用于对照菜单视口。

浏览器截图密度为 1；稳定滚动条占 15 像素。对照保留双方原生像素，不拉伸截图，顶部加标签。首页多出的底部高度为实际文本、插图和下边距；不将滚动条或全页截图差异误判为布局缺陷。复现脚本：`scripts/compose-design-comparisons.ps1`。

## 视觉检查

| 项目 | 实际结果 |
| --- | --- |
| 字体与层级 | DM Serif Display 主标题与页眉，DM Sans 正文与按钮；保留大字号两行介绍，名字突出，文字在桌面和手机不溢出。概念图的精确字体未提供。 |
| 桌面布局 | 两栏介绍／轮播，七个同尺寸方块居中一行，下方研究区域两栏；页眉位于顶部并保持可访问。 |
| 颜色 | 暖白 `#faf9f4`、深色 `#11141c`、绿色 `#17492d`、暖色箭头 `#b53b24`，与确认的视觉方向一致。 |
| 方块与菜单 | 图标、完整名称、箭头；菜单 Home 在左上，八项两行四列。当前项与悬停项可同时反转，未采用外部示例的大字母缩写。 |
| 图片 | 七张真实素材使用已核对的裁剪图；雪山人物、海报和食物完整显示，空余位置使用暖底色。研究流程使用独立位图插图，文案限定为影像证据提取与评估。 |
| 手机与平板 | 390、320 像素宽手机没有横向溢出；手机两列，最后一块居中；768 像素平板四列，最后三块居中。 |
| 内容 | 使用已提供的背景和项目事实，尚缺内容明确标注；没有填写虚构成绩、邮箱、代码地址或研究准确率。 |

与概念图相比，字体字形、少量间距和图标细节是轻微差异（P3），没有阻挡首轮交付的 P0／P1／P2 问题。图库真实图像替换概念图属于用户要求；照片完整显示的边缘留白属于已确认的比例例外。

## 修复与复查记录

1. 初始构建后修复字体变量被全局默认值覆盖及大标题超出左栏的问题；最终标题在两种屏幕尺寸内完整显示。
2. 修复 Motion 14 动画完成等待和 Next 路由完成等待，复查选中固定 → 淡出 → 移动 → 标题 → 正文的顺序。
3. 修复菜单关闭时解除滚动锁与焦点恢复顺序。使用实际坐标点击验证：打开前、覆盖时、关闭后滚动值均为 924.3333，恢复一致。
4. 修复初次渲染中减少动画偏好导致的属性水合差异。修改 effect 依赖期间出现过开发热刷新提示；最终新文档／新标签页运行没有控制台错误。
5. 页眉保持顶部可用、窄屏页眉压缩、全屏开场可点击、手动轮播后重置计时。最终重新构建并记录最新桌面截图，再生成上述并排对照。

## 浏览器验证

| 验证 | 结果与证据 |
| --- | --- |
| 开场 | 点击与 Enter 可进入；文字移动到左上页眉，内容从上到下显现。文档刷新重新出现；站内 Home、各栏目及浏览器前进／后退不重播。 |
| 首页到 Projects | 完整动画中选中块保持原来位置，其他内容淡出，页眉可见；随后移动、标题、正文依次完成。最终序列：`selected,content-exit,tile-move,title-enter,body-enter,idle`。 |
| 七个独立栏目 | About Me、Academic、Projects、Skills、Gallery、Music、Travel 均通过实际点击到达正确路径和标题。直接访问及刷新 Projects 可进入正确栏目。 |
| 菜单 | 背景从上向下覆盖后出现八项；当前项反转，悬停其他项也反转。×／Escape 可关闭，焦点回到入口，底层滚动和照片保留。 |
| 菜单选择 | 先退出其他按钮，然后页眉显现、方块移动、标题和正文显现；菜单 Home 直接回首页，无残留第八块。 |
| 正文 | 按真实换行测量逐行显现；手机 Projects 共测得 18 行，布局与内容正常。 |
| 轮播 | 恰好七个圆点；逐个点击七项均得到对应选中状态。自动播放从第 1 项开始，约 27 秒后观察为第 6 项，与 5 秒间隔及指定顺序一致；可暂停。 |
| 媒体 | Gallery 可打开照片，下一张切换到网球照，关闭回原页；海报有完整图片入口。Contact 可打开／关闭并指向真实 GitHub。 |
| 响应式 | CSS 视口 1402 × 1122、1487 × 1058、768 × 1024、390 × 844、320 × 844 已检查。最窄屏内容宽与 scrollWidth 均为 305，没有横向溢出。 |
| 减少动态效果 | 浏览器系统偏好为 reduced；生产逻辑使用简化动效。开发专用 `?qa-motion=full` 另行验证完整时序。 |
| 构建 | 最终 `npm run build` 退出码 0，TypeScript 验证通过，首页及七个栏目全部静态生成。 |
| 运行错误 | 最终干净浏览器标签页 4 的 error 日志为空。 |

截图：[桌面首页](docs/qa/home-desktop.jpg)、[桌面菜单](docs/qa/menu-desktop-home.jpg)、[项目页](docs/qa/projects-desktop.jpg)、[手机首页](docs/qa/home-mobile.jpg)、[手机菜单](docs/qa/menu-mobile.jpg)。

后续仍需补充正式文案、Contact、研究代码、视频／YouTube 和音乐内容，验证 Vercel 预览与域名。首轮并未声称这些已上线。

## 动效调整复查：舒缓连续

2026-10-14，用户反馈转场太快且不够丝滑，并选择整体约 3–4 秒的连续节奏。

- 统一时长与缓动配置在 `content/motion.ts`。方块不再逐帧修改 CSS left／top／width／height，而是在原布局上平移、缩放。图标、名称和箭头柔和对齐目标样式，落地交叉渐显与标题接入同时进行。
- 菜单背景改用从上沿展开的纵向缩放；覆盖后八个按钮按顺序渐显。退出覆盖层与方块移动的末段重叠，保持原有阶段顺序。
- 实测开场 3134 ms；桌面首页 → Projects 3749 ms；菜单 → Academic 3816 ms；菜单 → Projects 4085 ms；手机首页 → Projects 3051 ms；手机菜单 → Home 3381 ms。Home 的普通返回因没有正文阶段更短。
- 菜单展开 1502 ms，关闭并恢复焦点 688 ms。关闭后焦点为 Open menu，滚动锁解除。菜单 Home 保留已进入状态，无残留菜单或浮动方块。
- 方块移动中观察到 CSS 宽度仍为 203 px、left 仍为 874.5 px，而可见宽度为约 195 px，transform 为平移／缩放矩阵；手机 CSS 宽度保持 159.5 px，移动中的可见宽度约 156.2 px。证明飞行期间不再通过宽高变化重排文本。
- 手机 Projects 的 18 行正文完成渐显，布局无横向溢出；减少动态效果模式保留，开场实测 532 ms。最终 TypeScript 与生产构建通过。
- 方块落地并接入标题的时刻，分别比较移动层与目标块的图标、名称矩形：x、y、宽、高差值均为 0，交叉渐显时没有几何跳变。最终浏览器 error 日志为空。

本轮截图：[移动中的方块](docs/qa/motion-in-flight.jpg)、[Academic 落地状态](docs/qa/motion-academic-final.jpg)、[手机 Projects](docs/qa/motion-mobile-final.jpg)、[桌面 Projects](docs/qa/motion-projects-final.jpg)。最终页面结构沿用已通过的首页、菜单与栏目视觉，主要修改为动画轨迹和时间。

## 单行开场、标题方向与返回路径复查

2026-10-14，按用户反馈修复三项：开场换行、标题显现方向，以及点击页眉返回时的方块落点。

- 开场采用单行响应式字号，并与页眉统一相对字距和行高。1280 像素桌面视口文字高 98.79 px、行高 98.80 px；320 像素视口文字宽 194.49 px、高 23.82 px，左／右边界 55.26／249.74 px。均为一行，未发生横向溢出。
- Projects 标题展开过程中，遮罩为 `inset(0px 65.33% 0px 0px)`，向左仅偏移约 13.07 px，再逐渐归零；露出左侧内容，向右揭开。菜单进入 Academic 同样测得右侧遮罩约 57.41%、向左偏移约 11.48 px，方向一致。
- 桌面 Projects 点击页眉返回时，浮动层保留 Projects 图标／名称，从 104 px 的栏目方块移动并扩大到首页第三个入口：x=388.22、y=550.06、宽高=152.18 px。移动期间首页 hero 和 grid 不透明度均为 0，目标入口暂时隐藏；到位后再开始首页显现。
- 手机 Travel 页滚动 178 px 后，原标记已处于 y=-57.81；真实点击页眉后，返回标记从页眉下方 y=98 开始，落到首页最后一个入口 x=90.25、y=919.92、宽高=124.5 px。结束后首页滚动回顶部，七个入口正常显示，无浮动层残留，不重播开场。
- 减少动态效果模式检查通过：直接刷新 Academic、进入并点击页眉返回，目标首页按钮正常可见，浮动层清理完成。最终浏览器 error 日志为空。
- 最后截图发现 SVG 颜色在延迟阶段曾被动画库解析成透明色；已改成明确的起始／结束颜色关键帧。重新检查返回途中图标为 `rgb(250, 249, 244)`、opacity 1、visibility visible，图标和名称均正常显示，移动截图已更新。
- TypeScript 检查与生产构建退出码均为 0，八个页面静态生成完成。

本轮截图：[桌面单行开场](docs/qa/intro-single-line-desktop.jpg)、[手机单行开场](docs/qa/intro-single-line-mobile.jpg)、[标题从左向右展开](docs/qa/title-left-to-right.jpg)、[Projects 返回移动过程](docs/qa/return-to-projects-in-flight.jpg)。

## 菜单 Home 展开为首页标题与按钮反转复查

2026-10-14，用户在三个衔接方向中选择“展开为标题”。实现 Home 方块展开成真实首页标题，再显示其余内容，保留首页原有七个入口。

- 菜单返回首页的阶段为 `selected,menu-items-exit,header-enter,home-panel-move,home-title-morph,home-enter,idle`。从 Projects 菜单返回完整耗时 4369 ms；首页再次选择菜单 Home 为 4322 ms；390 像素手机为 4325 ms。站内均未重播开场。
- 桌面标题接替时，背景区域、克隆标题与真实标题的位置重合：x=37.7604、y=192.3177、宽=377.1458、高=108.2396 px。此时首页介绍区 opacity 为 0，其他内容尚未出现。绿色背景独立展开，图标和 Home 名称按相同比例缩放。
- 手机同样准确对齐：背景和两个标题矩形均为 x=20、y=100、宽=335、高=96.1354 px。页面没有横向溢出。菜单名称与移动层在手机采用一致字号，避免选中后改变大小。
- 标题揭开完成后，克隆标题 opacity=1、Home 图标层 opacity=0，七个入口所在网格起始 opacity=0；随后介绍／轮播、网格和研究内容按顺序出现。结束时真实标题 visibility=visible，没有浮动层、菜单或隐藏按钮残留，入口数量仍为七。
- 方块反转色使用同一个遮罩同步揭开背景、图标、名称和箭头。实际指针进入时观察到遮罩正处于 `inset(0px 4.46375% 0px 0px)`；常态图标保持绿色、反转层保持暖白色。键盘 Tab 可进入 Projects 并出现相同反转效果和焦点轮廓；视觉副本设置 aria-hidden，About Me 仅有一个可访问链接。
- 回归检查手机 Projects → 页眉 Home：移动层仍显示 Projects 名称，保持正方形，到位后交接给首页第三个入口。最终七个入口可见，没有开场重播。
- 减少动态效果模式完成 Home 返回为 373 ms；结束后主内容 inert=false、滚动锁解除、标题可见、菜单和浮动层已清理。桌面与手机验证标签页的 error 日志均为空。
- 最终 `npm run build` 与 `npm run typecheck` 退出码为 0。没有推送、部署或改动域名。

截图：[Home 展开为标题区域](docs/qa/home-title-morph.jpg)、[标题接替后首页渐显](docs/qa/home-title-reveal.jpg)、[手机标题交接](docs/qa/home-title-mobile-morph.jpg)、[手机最终首页](docs/qa/home-title-mobile-final.jpg)、[按钮反转色与键盘焦点](docs/qa/home-button-focus.jpg)。

## 刷新后动效变成瞬间的修复复查

2026-10-14，用户反馈初次打开动效舒缓，刷新后只剩一瞬间。

- 已在同一个 About Me 标签页复现：刷新前 `data-motion=full`，浏览器系统偏好为 reduced；普通地址 `/about-me` 刷新后变为 `data-motion=reduced`，完整开场仅 798 ms。原因是此前开发开关只从首次 URL 查询参数读取，站内导航移除查询参数后，刷新丢失完整动效选择，每段动画被限制为最多 0.12 秒。
- 开发环境现在默认完整动效。显式的 full／system／reduced 选择在当前标签页的 sessionStorage 保留；存储不可用时普通开发地址仍默认完整动效。生产环境继续使用系统偏好，不读取开发覆盖。
- 同一个普通地址 `/about-me` 两次刷新进入：均为 full，耗时分别为 4000、3999 ms，序列均为 `welcome-move,header-enter,title-enter,body-enter,idle`。
- 显式 system 选择经 About Me → Home → 刷新后，普通首页地址仍为 reduced（550 ms）。随后显式 full 选择经 Home → About Me → 刷新后，普通栏目地址仍为 full（4000 ms），没有菜单或浮动层残留。最终交付保留 full 选择。
- 临时启动生产构建在 3001 端口验证：即使 URL 带 `qa-motion=full`，系统偏好为 reduced 时仍使用 reduced，开场 806 ms。测试后已关闭临时生产服务和标签页，3000 开发预览保留。
- 最终开发与生产浏览器 error 日志为空；`npm run typecheck`、`npm run build` 和 `git diff --check` 均通过。没有修改系统设置，也没有推送或部署。

截图：[普通地址刷新后仍保留完整欢迎转场](docs/qa/motion-refresh-welcome.jpg)。

## 全站自适应字号复查

2026-10-14，用户选择“全站自适应，正文保留易读的最小字号”。修改集中在两份 CSS 文件，共享字号变量覆盖欢迎页、页眉、首页、栏目、按钮、图库与弹窗。

| CSS 视口宽度 | 栏目标题 | 正文 | 首页主标题基础字号 |
| --- | --- | --- | --- |
| 320 px | 33.66 px | 18 px | 33.39 px |
| 390 px | 40.875 px | 18 px | 42.21 px |
| 768 px | 57.885 px | 18.6355 px | 86 px |
| 1280 px | 80.925 px | 20.4275 px | 65.7425 px |
| 1920 px | 92 px | 21 px | 81.3665 px |

首页标题随实际介绍栏的宽度变化；768 px 为整行布局，1280 px 为两栏布局，因此不是只按屏幕宽度等比例增长。默认字号设置下，主段落保留 18 px 下限，辅助文字为 16–18 px。该表中的字体为实际 computed style，完整指标保存于 [测量数据](docs/qa/fluid-typography-metrics.json)。

- 上述五种宽度中，页眉无重叠，标题和按钮文字不溢出，页面没有横向溢出。320 px 的 Academic 标题可完整显示，旁侧文字宽 187 px。
- 欢迎文字在 320 × 844、390 × 844、844 × 390 横屏、1280 × 800、1920 × 1080 中均保持单行且完整位于视口内，字号分别约 21.655、26.625、54.6、89.815、112 px。
- 检查旧断点两侧的连续变化：359／361、599／601、899／901、1099／1101 px。最终 599 → 601 px 的页眉字号为 30.0221 → 30.1254 px，栏目标题为 50.28 → 50.37 px，正文为 18.044 → 18.051 px。移除了在 600 px 处覆盖页面边距的规则，使容器宽度也连续变化。
- 窗口变化后，正文重新分行；实际文字与测量源完全一致，各行 opacity 为 1，没有丢失文本或残留隐藏行。
- 320 px 菜单的八个名称均为 16.31 px，并完整位于方块内。Contact 弹窗标题 32 px、正文 18 px，弹窗没有横向溢出。
- 手机菜单 Home 展开标题时，克隆与真实标题的矩形完全一致：x=20、y=100、宽=265、高=74.28646 px，双方字体均为 33.39 px。开场完整动效完成约 3139 ms；刷新后仍为 full。栏目进入、页眉返回和菜单返回均通过回归检查。
- 首页宽屏第二行标题曾轻微越出介绍栏，已调整容器字号系数并重新检查五种宽度。首页介绍、项目标题和栏目副标题采用均衡换行，减少孤立的末行词语。
- 截图前将页面滚回顶部，避免固定页眉在全页截图中遮住标题。最终窗口尺寸已恢复，轮播恢复自动播放。浏览器 error 日志为空，生产构建及其 TypeScript 检查通过。

截图：[桌面首页](docs/qa/fluid-type-home-desktop.jpg)、[手机首页](docs/qa/fluid-type-home-mobile.jpg)、[320 px Academic](docs/qa/fluid-type-academic-mobile.jpg)、[手机开场](docs/qa/fluid-type-intro-mobile.jpg)、[桌面开场](docs/qa/fluid-type-intro-desktop.jpg)。

Final result: **passed**

## 桌面密度调整复查

2026-10-14，用户确认“整体缩小约 15–20%，正文改为 16–18px”。桌面内容区改为 84vw、最大 1280 px；页眉、标题、图片、方块、菜单和间距同步收紧。手机和平板保持全宽布局，不使用整页缩放。

| 视口 | 项目 | 调整前 | 调整后 |
| --- | --- | --- | --- |
| 1280 px | 首页方块 | 152.18 px | 128.95 px |
| 1280 px | 姓名字号 | 76.26 px | 64.84 px |
| 1280 px | 轮播宽度 | 617.50 px | 525.04 px |
| 1280 px | 正文 | 20.43 px | 17.53 px |
| 1920 px | 首页方块 | 190.85 px | 157.14 px |
| 1920 px | 姓名字号 | 94.39 px | 78.05 px |
| 1920 px | 轮播宽度 | 764.23 px | 631.98 px |
| 1920 px | 正文 | 21 px | 18 px |

- 320、390、768、1280、1440、1920 px 宽度均检查过：页面没有横向溢出，页眉没有重叠，首页两行标题完整留在各自内容栏内。320／390 px 手机正文均为 16 px，栏目标题约 31.44／34.06 px。
- 桌面菜单方块从 203 px 降为 172.5 px；320 px 手机菜单八个名称均为 16.31 px，名称完整位于方块内。当前栏目反转状态正确。
- 修复真实小方块被旧高度阈值误判为文字链接的情况。320 px Academic 返回时，源方块与移动层均为 x=20、y=119.34375、宽高=56 px，CSS 宽高也保持 56 px，没有替换为临时 110 px 方块。返回完成后首页七个入口可见，没有浮动层残留。
- 菜单 Home 的标题交接准确：1920 px 下移动标题、背景与真实标题均为 x=360.5、y=216.42709、宽=534.02087、高=149.69272 px；320 px 下两个标题均为 x=20、y=94、宽=265、高=74.28646 px，字号均为 33.39 px。
- 开场继续保持单行：320 px 下字号 20 px、行高与高度均为 22 px；1920 px 下字号 96 px、行高与高度约 105.6 px。刷新后仍为 full，完整开场 3135 ms；动画时长配置未修改。
- Academic 正文调整窗口后重新分行，逐段归一化后的实际文字与测量源完全一致，各行 opacity=1。完整指标保存于 [密度测量数据](docs/qa/compact-layout-metrics.json)。
- 最终 `npm run build` 退出码 0，包括 TypeScript 检查与八个页面静态生成。浏览器 error 日志为空，预览已返回首页、恢复正常窗口尺寸，轮播自动播放。没有推送或部署。

同一 1920 px 视口对比：[调整前](docs/qa/compact-before-1920.jpg)、[调整后](docs/qa/compact-after-1920.jpg)。其他截图：[1280 px 首页](docs/qa/compact-desktop-1280.jpg)、[手机首页](docs/qa/compact-mobile.jpg)、[学术页](docs/qa/compact-academic-desktop.jpg)。

## 页眉向两侧展开复查

2026-10-14，用户确认当前字体尺寸，并要求欢迎文字与菜单入口向两边移动、延长顶部下方的线。

- 将正文宽度限制移到 `.main-shell`，页眉独立布局，左右留白为 `clamp(20px, 4.1vw, 74px)`。1920 px 视口下，欢迎文字 x 从 360.5 降为 74 px；菜单入口 x 从 1500.5 增至 1787 px；分隔线宽从 1184 增至 1757 px。
- 同一视口下，首页标题、轮播和七入口网格的 x、y、宽、高及字号与调整前一致。正文仍为最大 1280 px 的居中内容区。
- 320、390、1280、1920 px 检查没有横向溢出或页眉重叠，手机左右留白 20 px。菜单打开、关闭后恢复 Open menu 焦点。
- 刷新后完整开场 3137 ms，欢迎文字落到 x=74 px 的新位置；开场层正常清理。最终浏览器 error 日志为空，生产构建及 TypeScript 检查通过，正常窗口尺寸与轮播自动播放已恢复。
- 截图：[页眉展开后的首页](docs/qa/header-wide-desktop.jpg)。测量数据：[页眉位置](docs/qa/header-width-metrics.json)。

Final result: **passed**


---

# Skills 彩色工具台验收

日期：2026-10-14。范围：用户选择的 1 号分组工具台，加品牌彩色图标。

final result: passed

## 视觉依据与截图

- source visual truth：`docs/design/skills-color-toolbench-reference.png`，1487 × 1058；由已选择的第一张概念图生成，只调整图标颜色，使用内置 Image Gen。
- 生成提示：保持整个分组、字体和纸色布局；Java 蓝红、Python 蓝黄、React 青、TypeScript 蓝、PostgreSQL 蓝、Supabase 绿、Figma 多色、Onshape 绿灰、GitHub / Codex / Vercel 黑、Cloudflare 橙；不增加彩色图标底卡。
- 同状态桌面截图：`docs/qa/skills-color-desktop.png`，浏览器 CSS 1487 × 1058，DPR 约 1，图片输出 1472 × 968。默认 Python，补充工具区折叠，白天纸色主题。
- 完整页：`docs/qa/skills-color-full-page.png`，1472 × 1563。
- 最终正常窗口：`docs/qa/skills-color-final.png`，CSS 1280 × 720，默认 Python，已恢复临时视口覆盖。
- full-view comparison：`docs/qa/skills-color-comparison.png`。左右同时查看依据和实现；统一取左上 1472 × 968 内容区，1:1 拼接，没有把不同尺寸拉伸比较。完整页截图另用于确认下方工具和链接。
- focused region comparison：`docs/qa/skills-color-focused-comparison.png`。裁取两边工具组与详情区域并列比较，保持图像比例，确认图标、标签、选中线、分隔线与项目说明。
- 手机：`docs/qa/skills-color-mobile.png`（390px）、`skills-color-mobile-detail.png`、`skills-color-320.png`。
- 平板：`docs/qa/skills-color-tablet.png`（768px）。

## Findings 与修复记录

1. 初次实现图标和工具台标题相对选中稿偏小（P2），见 `skills-color-comparison-initial.png`。已将桌面图标调整到 64–72px、详情图标 104px，并增加标题与简介的阅读尺寸。修复后重新截图并做完整、局部并排比较。
2. 首次 390px 检查中 PostgreSQL 名称被拆成两行（P2）。改为名称不拆词；370px 以下一组一行，保留两列工具。重新检查 390px、320px 后名称完整，无横向溢出。
3. 首次使用的 Onshape 官方宽字标内含留白，视觉过小（P2）。改用官方 CAD 网站 144px 图标，绿色/白色/灰色标识与其他符号等大；没有从生成稿裁切仿制标志。

修复后没有待处理的 P0/P1/P2 问题。

## 五项视觉核对

- Fonts / typography：沿用项目 DM Serif Display 和 DM Sans，工具台标题与分组使用 serif，正文和工具名称使用 sans；没有引入新字体。主 Skills 标题及页眉保持既有全站尺寸，和草图的大小差异属于沿用已确认的全站规则。
- Spacing / layout：桌面两列工具组加右侧详情，Along the way 横跨左侧；薄分隔线和开放纸面，无嵌套卡片。手机详情在工具组下方。桌面和平板的全部工具、右侧内容、底部链接均完整可读。
- Colors / tokens：页面保持 paper #faf9f4、ink #11141c、green #17492d、muted #69707b、rule #d8d9d1。真实工具素材保留原色，选中线保持绿色；text-link 沿用全站暖色规则。
- Asset fidelity：使用本地 Devicon 原色 SVG、官方 Onshape PNG、现有 Phosphor OpenAI 标识与语义图标。全部图片已加载，无生成图标截图、手绘近似符号或第三方热链。原图标有不同光学比例，TypeScript / GitHub / Vercel 作尺寸补偿。
- Copy / content：每个工具都对应已确认的实际使用。保留 AI-assisted、管理员测试、developer testing 等阶段说明；没有熟练度百分比或精通标签。详情比概念图多一句项目依据，是为读者理解所做的内容补充。

## 交互与构建检查

- 12 个工具逐一选择，详情名称正确，每次恰有一个 aria-pressed=true，aria-controls 指向同一详情区；工具名称始终可见。
- Java 使用 Enter、PostgreSQL 使用 Space 选择成功。状态区播报工具和用途，焦点保留在所选按钮。
- 原生 More tools & methods 用 Enter 展开和收起成功，补充内容含开发环境、研究方法和 AI 工作方式。自动化中 summary 在 DOM snapshot 中不映射为 button，改以实际文本定位验证，控件本身无故障。
- 390px 点击 Onshape 后详情顶部约在 y=105，位于固定页眉下方，未被遮挡。
- 320px、390px、768px 的 scrollWidth 均等于 clientWidth，无横向滚动；320px 的工具触摸区域约 129.5 × 99px。
- 当前系统 reduced motion=true，新面板 computed animation-name 为 none。
- Python 的 Projects 入口实际到达 /projects；Java 的 coursework 入口到达 /academic；Figma 的首页入口到达 /。浏览器返回正确恢复 /skills，未重播欢迎页。
- 最终 /skills，phase=idle、data-entering=false，默认 Python，全部图片加载正常，错误日志为空。
- `npm run typecheck` 通过；最终 `npm run build` 通过，首页与原栏目成功生成，无新增运行依赖。

## 实现文件

- `components/SkillsPage.tsx`、`components/SkillsPage.module.css`
- `content/skill-toolbench.ts`；原 `content/skills.ts` 继续提供补充工具与工作过程。
- `scripts/prepare-skill-icons.mjs`、`public/media/skills/`，素材来源见 `docs/media/skill-icons.md`。

本轮只改本地页面和素材；没有提交、推送、部署或修改域名。后续可根据用户对实际预览的反馈微调图标大小和间距。


## Music 首版（2026-10-14）

final result: passed

访谈事实与版式规格：docs/content/music-spec.md。桌面与手机截图、两段 YouTube 实际播放、背景音乐互斥和续播、照片查看器、构建及最终安静状态记录于 docs/music-qa.md。未更改既有全站设计。
# 2026-10-15 Music 曲单补充

- 五首用户音频及对应封面接入，曲名使用拉丁字母；Senbonzakura、The Battle of Waterloo 按用户要求命名。
- 三模式及共享播放状态、曲终行为、视频互斥、桌面/手机/平板视觉均通过；构建和类型检查通过。详细记录见 `docs/music-playlist-qa.md`。

# 2026-10-15 Projects 与 Community 图片卡片

本轮按用户提供的参考图改为左侧一张大卡片、右侧两张横卡片。用户明确选择点击后在卡片列表下方展开详情。保留现有栏目页眉、导航、字体、绿色品牌色和全部经历内容。

## 视觉依据与核对

- Source visual truth：`docs/design/case-study-cards-reference.png`，3834 × 1869，原始用户附件的完整副本。实施规格：`docs/design/case-study-cards.md`。
- 在同一对照输入中查看参考与 `docs/qa/community-cards-initial.png`，再查看参考与 `docs/qa/projects-cards-desktop.png`。默认桌面 CSS 视口为 1280 × 720，截图有效内容为 1265 × 712，稳定滚动条占 15px；不将不同截图尺寸拉伸做像素差比较。
- 最终桌面证据：`docs/qa/projects-cards-desktop.png`、`docs/qa/community-cards-desktop.png`。展开详情：`docs/qa/community-cards-expanded.png`。手机 320 × 720：`docs/qa/projects-cards-mobile.png`、`docs/qa/community-cards-mobile.png`、`docs/qa/community-cards-mobile-expanded.png`。

| 核对面 | 结果 |
| --- | --- |
| 字体与层级 | 沿用 DM Serif Display 栏目横幅与 DM Sans 卡片标题；深色粗标题及矩形按钮始终可见。长项目名在手机自然换行，无截断。 |
| 布局与间距 | 深色横幅、厚方框、等宽两列，左卡跨两行；默认桌面左卡约 477 × 474px，右卡约 477 × 223px，列距 32px、行距 28px。手机三卡依序堆叠。 |
| 颜色与表面 | 暖纸色与炭灰卡框，绿色替代参考蓝色；灰度淡化背景与悬停/焦点彩色状态延续参考层级。没有额外圆角、阴影或虚构插画。 |
| 图片与图标 | 采用现有 HIS、ARDS、Muon 素材，以及真实诊所、UPchieve 和义诊照片。详情内完整图像与放大入口保留；卡片仅作图像入口。诊所封面来自已有低分辨率视频缩略图，作为淡化背景仍可辨认。栏目图标使用既有 Phosphor 图标库。 |
| 内容与交互 | 保留学校 NTHS 通过 UPchieve 开展辅导的关系、60+ 小时与五名学生，以及诊所实习和机构义诊的事实。单一详情区位于列表下方，可关闭并返回原卡片；切换详情卸载上一项目内容。 |

有意差异：保留本网站暖白背景、绿色强调、serif 横幅与原有页眉，而非复制参考网站的品牌和蓝色；项目名与图片按真实内容替换。

## 发现与修复

320px 首次检查中卡片最小高度与 aspect-ratio 共同把宽度撑至 310.5px，造成文档横向溢出（P2）。已固定手机卡片为容器 100% 宽，并使用 minmax(0, 1fr) 列。复查两页卡片均为 265 × 230px，文档 clientWidth 和 scrollWidth 均为 305px；Community 展开后仍为 305px，关闭按钮高度 44px。800px 平板仍为左大右双卡，clientWidth 与 scrollWidth 均为 785px。

## 功能与构建

- Community 三卡逐一展开，NTHS 用 Enter 成功打开；展开区滚动至固定页眉下约 100px（手机 85px），焦点进入对应 region。关闭后 hidden=true，焦点返回原卡片。
- 西藏义诊详情含七张照片，点击团队照片打开 Photograph viewer，显示 1 / 7，关闭后返回详情；实习详情保留 Watch my clinic introduction 入口。
- Projects 三卡切换成功；HIS 包含 16 张原指南，下一张切至 2.1，并能打开、关闭 guideline viewer；切换 Muon 后 HIS 详情卸载。ARDS 详情保留评估表、Research presentation 与 View research poster。
- 最终 `npm run build` 退出码 0；TypeScript 检查、10 个静态页面生成完成。

- Academic 浏览器中 Research in practice 正常显示，Watch my presentation 链接数为 0，Explore the project 链接数为 1，并通过实际点击返回 Projects。完整截图：`docs/qa/academic-presentation-button-removed.png`。
- 浏览器页面 error 日志为空。工具自身的 Statsig 请求被 403 拒绝与本地网页无关，不计为应用错误。临时手机/平板视口已恢复。

本轮没有待处理的 P0/P1/P2 问题。仅完成本地修改；未提交、推送、部署或修改域名。

final result: passed

# 2026-10-15 视频参考修订：独立 Case Study 页面

用户撤回上轮“在列表下方展开”的选择，要求点击卡片进入另一个页面；并明确只保留平滑淡入淡出。以下结果取代上轮有关详情展开方式的记录，原有经历、项目材料和栏目卡片排列继续保留。

## 参考与视觉核对

- Source visual truth：用户视频 `D:/Videos/Captures/UX Manager _ infinite imaginations - Google Chrome 2026-10-15 12-32-07.mp4`。提取的参考帧与总览存于 `docs/design/case-study-video/`；更新规格为 `docs/design/case-study-cards.md`。
- 在同一视觉输入中对照视频 frame-19 与本地 HIS 详情截图、frame-05 与本地 Community 卡片截图。核对深色标题横条、左侧强调线、信息图标、居中大图、正文层级，以及卡片深色悬停状态。保留本网站的暖纸色、绿色和字体；用户已明确排除故障闪动。
- 桌面证据：`docs/qa/case-study-routes-projects.png`、`docs/qa/case-study-routes-community.png`、`docs/qa/case-study-his-desktop.png`、`docs/qa/case-study-upchieve-desktop.png`、`docs/qa/case-study-clinic-desktop.png`、`docs/qa/case-study-outreach-desktop.png`。
- 320px 手机证据：`docs/qa/case-study-community-mobile.png`、`docs/qa/case-study-projects-mobile.png`、`docs/qa/case-study-upchieve-mobile.png`、`docs/qa/case-study-outreach-mobile.png`、`docs/qa/case-study-his-mobile.png`。长标题自然换行，最终 HIS 证据已去除程序聚焦标题时多余的轮廓；链接键盘焦点样式保留。

## 路由与交互验证

- 六个卡片分别进入 `/projects/hospital-information-system`、`/projects/ards-imaging-extraction`、`/projects/muon-lab`、`/community/clinic-internship`、`/community/nths-upchieve`、`/community/tibet-outreach`。详情页不再包含卡片网格或列表下方展开区。
- 点击和 Enter 可打开详情；使用 280ms 淡出、500ms 淡入，并遵循减少动态效果设置。返回按钮恢复列表位置和原卡片焦点；一次受控手机验证中返回前后 scrollY 均为 333.3333435058594。
- 浏览器后退、前进正确切换完整路径及内容；刷新西藏义诊详情网址后可正常进入，最终 phase=idle、data-entering=false、内容 opacity=1。
- 手机 HIS、UPchieve、义诊页面的 scrollWidth 与 clientWidth 均为 305px，无横向溢出；桌面最终均为 1265px。临时手机视口已恢复。
- HIS 的 16 张指南保留，下一张正常从 1 切到 2.1；ARDS 评估表、演讲与海报入口保留。Community 保留原诊所视频入口、NTHS 通过 UPchieve 的关系和机构义诊说明；七张义诊照片及照片查看器正常。
- 路由与返回位置记录：`docs/qa/case-study-route-checks.json`。最终状态及应用错误日志：`docs/qa/case-study-route-final.json`，错误数组为空。

## 构建结果

`npm run typecheck` 通过；最终 `npm run build` 退出码 0，成功生成 16 个页面（包含六个独立详情页）。`git diff --check` 通过，无新增生产依赖。本轮没有待处理的 P0/P1/P2 问题；仅修改本地文件，未提交、推送或部署。

final result: passed

# 2026-10-15 卡片横向动效与深绿色

用户进一步要求鼠标移入卡片时产生从左到右的动效，并把黑灰色改为深绿色。Projects 和 Community 使用同一画廊组件，现统一采用 #17492d：卡框、按钮、栏目横条、详情标题横条均已更新。

- 卡片遮罩以左边为原点，通过 scaleX 从 0 到 1 在 550ms 内展开；移出时收回。标题和按钮颜色同步过渡，键盘 focus-visible 触发同一效果。
- 浏览器实际鼠标移入时记录 hover=true，横向比例为 0.634319，完成后为 1；原点 x=0，背景 rgb(23, 73, 45)，时长 0.55s。移出时比例从 0.247227 降至 0.0598676。原始记录：`docs/qa/case-study-green-sweep.json`。
- 检查发现系统 reduced-motion 媒体查询覆盖了站内明确启用的完整动效。改为使用 PortfolioShell 已解析的 data-motion 设置，使系统偏好和显式预览设置遵循同一入口；reduced 模式仍关闭过渡。
- Shift+Tab 实际聚焦 ARDS 卡片，focus-visible=true。最终视觉证据：`docs/qa/case-study-green-hover.png`；过程中截图：`docs/qa/case-study-green-sweep-mid.png`。桌面 clientWidth/scrollWidth 均为 1265px，最终路由 /projects、phase=idle，应用错误日志为空。
- 最终 `npm run build` 通过 TypeScript 和 16 个页面生成；`git diff --check` 通过。此轮为局部 CSS 修改，没有新增依赖、修改内容或调整路由。

final result: passed

# 2026-10-15 正式网站动效速度修复

线上复现：系统的 prefers-reduced-motion 为 true，旧生产版默认跟随系统，开场所有阶段被限制为 120ms，完整开场实测 530ms；开发版却默认 full，导致本地与正式网站节奏不同。

- 开发、生产统一默认完整动效，保持已确认的时长。欢迎页和菜单提供 Full、Reduced、Follow system，选择保存在当前网站的 localStorage。开发专用 qa-motion 参数仍仅在开发环境生效。
- JS 转场和各栏目的装饰 CSS 共用 data-motion，Full 不再被组件自己的系统媒体查询覆盖。Reduced 和 Follow system 仍可使用；菜单焦点循环已包含新增 select，动画执行期间禁用设置。
- 使用 next build + next start 在 3001 端口测试实际生产构建。系统 reduced=true 时默认为 full，首页开场 3133ms，菜单到 Projects 完整转场 4104ms，卡片扫入时长 550ms。
- Reduced 刷新保留选择，开场 539ms、卡片过渡为 0s；Follow system 正确解析为 reduced；恢复 Full 后刷新仍为 full。320px 菜单设置宽约 214px，页面无横向溢出，设置处 Tab 返回 Close menu。
- 本地应用 error 日志为空。生产构建通过 TypeScript 和 16 页生成。浏览器记录：docs/qa/production-motion-checks.json；移动端截图：docs/qa/motion-settings-mobile.png。

final result: passed (local production build)

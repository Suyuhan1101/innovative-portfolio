# About Me 首版验证

2026-10-14，本地 Next.js 开发服务器 `http://127.0.0.1:3000`，实际浏览器 UI 操作。

## 内容与排版

- About Me 已替换占位内容：个人小档案、音乐播放器、EV3 起点、屏幕之外的生活，以及 Projects / Music / Travel 入口。
- 公开生日仅 November 1，邮箱 `caesium6s@zohomail.com`；页面不包含出生年份与电话号码。Contact 的 mailto 链接同步使用该邮箱。
- 五张公开图像与原始备份哈希一致，保留透明度。EV3 明确写作参考图；曲目署名 DJ Okawari。
- 320、390、1280、1920px 宽度均无横向溢出。1280px 正文实测 17.53px，1920px 为 18px。
- 320px 的菜单底部导航方块在 y610 结束，音乐控件从约 y650 开始，留出间隔；栏目页尾有控制条所需的底部留白。

## 音乐与导航

- 新文档点击播放前只有一个 audio，src 未设置、paused=true、currentTime=0。
- 实际点击播放成功；键盘 PageUp 改变进度，ArrowLeft 将音量从 65% 调到 60%。
- About Me → Projects → 菜单 Home → About Me 保留同一音频实例；播放时间持续前进。完整转场实测约 3.68 秒；菜单 Home 展开标题约 4.27 秒。
- 新增内容后的窄屏复查：About Me → Projects 时间约 60 秒、audio=1；浏览器后退回 About Me 时间约 60.2 秒，继续播放且无开场；前进也保留播放状态。
- 菜单中暂停有效；从播放按钮 Tab 到停止，再 Tab 返回菜单关闭按钮，焦点留在菜单中。
- 五行弹窗内可以暂停；Escape 关闭后焦点恢复 Five elements 按钮。Contact 弹窗也提供音乐控制；停止后焦点恢复关闭按钮，再关闭恢复 Contact。
- 菜单停止操作清除 src、暂停、时间归零并收起控制条。
- 独立测试页暂时将 MP3 改名保留，确认真实 404 显示 Retry 和错误提示；恢复文件并核对原哈希后，重试成功。测试备份已恢复，公开音源正常。
- 将进度跳至末尾，确认 Finished 状态，点击后从 0 秒重播。
- 刷新重新出现开场，audio 恢复静音且无 src。
- `?qa-motion=reduced` 下开场、菜单和音乐控件可用；此开发覆盖项不进入生产行为。

## 工程检查与截图

TypeScript 与 Next.js 生产构建通过，普通预览标签页无浏览器 error 级别日志。开发日志有系统减少动态效果提示，以及编辑共享内容模块引起的 Fast Refresh 全页重载提示。音频状态更新仅由播放器订阅，shell 只订阅是否已开启，避免进度更新触发整页文字重新分行。未加入新运行时依赖。

- [首屏](qa/about-first-screen.png)
- [完整桌面页](qa/about-desktop.png)
- [390px 完整页面](qa/about-mobile.png)
- [320px 跨页播放器](qa/about-global-player-mobile.png)
- [五行弹窗](qa/about-five-elements.png)

本轮测试覆盖本地桌面浏览器的响应式视口；真实 iOS / Android / Safari 与公网托管环境尚未验收。

## 2026-10-15：荣誉、奖项与认证

- 在 About Me 页尾、返回首页链接前加入用户提供的 11 个条目，分为荣誉奖项 6 项、研究认证 3 项、音乐与美术 2 项。
- FTC 条目明确标注团队奖项，并保留 2024 年 Miami University 第三名、2025 年 Cincinnati Walnut Hills 第二名，两次均为 Inspire Award。
- 核对全部名称与年份；保留 Director’s List 前 10% GPA 说明、NHS 评选条件、China Conservatory of Music 机构署名。CITI 认证独立分组。
- 本地生产构建通过（含 TypeScript）；实际浏览器检查 1280px 和 320px，手机页面 clientWidth / scrollWidth 均为 305px，所有条目无内部横向溢出。
- 手机长标题、FTC 两条成绩、认证和艺术条目均完整换行；浏览器无 error 级别日志。没有新增运行时依赖。
- 截图：`qa/about-honors-desktop.png`、`qa/about-honors-mobile.png`、`qa/about-honors-mobile-certifications.png`。

## 2026-10-15：荣誉展厅视觉升级

- 按用户“花哨、华丽”的新要求改为深绿色与香槟金的展厅；FTC 铜色第三名、银色第二名奖牌、USACO 银色徽章、CITI 证书签章、钢琴八级和国画四级数字装饰分别对应实际内容。
- 11 个条目、所有年份、两次 FTC 成绩和原有评选说明保留；装饰没有冒充官方奖项标识，均对辅助技术隐藏。所有内容常显，不依赖悬停或点击展开。
- 实际浏览器检查 1280、768、320px；320px clientWidth / scrollWidth 均为 305px，768px 均为 753px，奖项名称与说明无内部横向溢出。
- 悬停实测扫光 animationDuration 为 1.15s，卡片轻微上移；扫光在正文与双奖牌背后，避免遮盖文字。
- 通过站内菜单切换 Reduced，实测根节点 data-motion=reduced，奖杯 animationName=none、卡片 transitionDuration=0s；测试后恢复 Full。视口覆盖也恢复默认。
- 本地生产构建通过（含 TypeScript），无新增运行时依赖。截图见 `qa/honors-showcase-desktop.png`、`qa/honors-showcase-certificates.png`、`qa/honors-showcase-tablet.png`、`qa/honors-showcase-mobile.png`、`qa/honors-showcase-mobile-arts.png`。

## 2026-10-15：中央奖杯与连线奖项网络

- 按用户新选择替代展位布局：中央奖杯与 11 个等大的奖项符号，不预选或突出某项。桌面符号实测均为 60 × 60px，320px 窄屏均为 48 × 48px。
- 实际鼠标悬停 USACO 显示一句短介绍与年份，对应连线强调；拖入奖杯后打开 USACO 完整详情，焦点落在详情区域。拖动 Conrad 到空白处后归位，详情保持隐藏、moving 节点为 0，并显示正确的辅助状态文本。
- 窄屏实际拖动钢琴符号到奖杯后显示 Grade 8 Piano、2023 与 China Conservatory of Music。点击 Good Clinical Practice 正常显示 CITI 认证信息。
- 键盘 Enter 可打开 FTC 并显示两次完整 Inspire Award 记录；Space 可打开 Conrad。方向键从 Good Clinical Practice 切换到 Human Subjects Research；Escape 隐藏悬停介绍。返回按钮恢复来源符号焦点和图形视图。
- 320px 的 clientWidth / scrollWidth 均为 305px；768px 均为 753px，全部短标签完整，无横向溢出。未模拟真实手机硬件触摸，本次窄屏交互使用桌面浏览器指针操作。
- Reduced 模式下节点与奖杯 transitionDuration 为 0s，详情 animationName 为 none，Space 查看详情仍正常。测试后恢复 Full 与默认视口。
- Next.js 生产构建及 TypeScript 通过，浏览器无 error 级别日志；没有新增依赖。截图：`qa/honors-network-preview.png`、`qa/honors-network-details.png`、`qa/honors-network-mobile.png`、`qa/honors-network-mobile-details.png`。

## 2026-10-15：荣誉蜂巢

- 按用户最新选择，用 11 个等大六边形替代中央奖杯与拖放网络；没有初始选中奖项。桌面为四／三／四，手机为两格／一格交替排列。
- 实际鼠标悬停 USACO，上方介绍区显示 Silver Award in computing 与 2026；六边形左至右填充的 transitionDuration 实测为 0.55s。Escape 恢复默认介绍。
- 键盘 Enter 打开 FTC，焦点落在详情区域，两次 Inspire Award 的赛事、年份和名次完整保留。Back to awards 恢复 FTC 来源按钮焦点并收起详情。
- 方向键从 Good Clinical Practice 切到 Human Subjects Research。点击研究认证保留 CITI Program certification；Space 打开钢琴与国画详情，年份及 China Conservatory of Music 信息正确。
- 桌面 11 格均约 177 × 205.6px；320px 窄屏均约 119.5 × 138.9px，文字完整。320px 的 clientWidth / scrollWidth 均为 305px；768px 均为 753px，无横向溢出。手机样式通过桌面响应式视口验证，未模拟真实手机硬件触摸。
- 站内 Reduced 模式下，填色 transitionDuration 为 0s、详情 animationName 为 none，Space 仍可查看详情。测试后恢复 Full 与默认视口。
- 最终 Next.js 生产构建与 TypeScript 通过，没有新增依赖。截图：`qa/honors-honeycomb-details.png`、`qa/honors-honeycomb-mobile.png`、`qa/honors-honeycomb-mobile-details.png`。

## 2026-10-15：按 Coursework 截图改为浅色蜂巢

- 深绿金色展墙替换为现有课程蜂巢同款米白、深绿细边、衬线名称与左蜂巢／右详情布局。11 个格子等大，不预选某一项；手机三列交错、详情在下方。
- 悬停、聚焦或点击切换详情；方向键、Enter 与 Space 正常。FTC 两次 Inspire Award、CITI 机构说明、钢琴机构与国画年份均实测保留。
- 首次 320px 检查发现长名称拥挤和 Research Coord. 内部溢出，增加仅手机使用的短名称后，所有 11 格均无内部溢出，clientWidth / scrollWidth 均为 305px。768px 两者均为 753px。
- Reduced 下填色为 0s、详情动画为 none；验证后恢复 Full 和默认视口。没有新增声音或依赖，浏览器 error 日志为空，最终生产构建和 TypeScript 通过。
- 原参考与实际页面在 `qa/honors-coursework-comparison-final.png` 并排对比；手机修复前后见 `qa/honors-coursework-mobile-comparison.png`，完整验收记录追加在项目根 `design-qa.md`。

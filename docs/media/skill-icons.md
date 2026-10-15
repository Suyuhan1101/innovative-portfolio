# Skills 图标来源

2026-10-14。用户选择分组工具台并要求补充图标颜色；页面使用真实图标素材，不裁剪生成稿中的图标。

- Java、Python、React、TypeScript、PostgreSQL、Supabase、Figma、GitHub、Vercel、Cloudflare：来自 [Devicon](https://github.com/devicons/devicon) 的 original SVG。固定版本和逐项原始地址记录于 `public/media/skills/sources.json`，MIT 许可随素材保存为 `DEVICON-LICENSE.txt`。各品牌名称和标志归其所有者。
- Onshape：使用官方 CAD 网站的 [144px 图标](https://cad.onshape.com/favicon.png)，保留绿色、白色和灰色。另保存了 [PTC 官方下载](https://www.ptc.com/en/brand-guide/logos/onshape) 的 RGB 字标 `onshape.svg` 供核对，没有用带留白的宽字标充当方形图标。
- Codex：复用现有 Phosphor 图标库的 `OpenAiLogoIcon`，与概念图的 OpenAI 标识一致；名称明确写 Codex。
- 箭头、文件、sparkle、展开符号：现有 `@phosphor-icons/react` 图标库，继承页面颜色。

所有实际图标均在本地静态文件或现有图标库中；页面无需从第三方 CDN 加载图标。SVG 下载脚本 `scripts/prepare-skill-icons.mjs` 验证返回内容并拒绝脚本、foreignObject、事件处理器与远程引用。

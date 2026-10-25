# Proposal

## Why

站点发布在 GitHub Pages（`/my-website/` 子路径），但 `<title>` 仍是工程默认值「my-website」，无 meta description、无 canonical、无 robots.txt——爬虫既不知道页面是什么，也不被显式允许抓取；同时内容分区直接挂在 `<body>` 下无 `main` landmark，语义结构有改进空间。搜索引擎收录与分享预览是个人品牌站的基础流量入口，需要一块 SEO 基础能力承接。

## What Changes

- **新能力 `seo-basics`**：
  - HTML 头部治理：`<title>` 改为「站主姓名 + 个人品牌站」形式占位文案、新增 `<meta name="description">`（占位文案，均可直接在 index.html 替换）；`<link rel="canonical">` 的值由**内容常量 `siteUrl`**（`src/content/site.ts`，站主替换入口）在应用启动时写入，index.html 内保留静态占位链作为无 JS 兜底
  - robots.txt：`public/robots.txt` 允许全站抓取（`User-agent: * / Allow: /`），随构建产物进入部署根路径
  - 语义化审查落地修复：内容分区包进 `<main>` landmark、标题层级保持单 `h1`（Hero）、存量图片 alt/lazy 约定核查，修复结果写入 spec 需求并纳入验收
- 不做社交标签（用户明确选择）：无 og:/twitter: 标签、无 JSON-LD、无 sitemap

## Capabilities

### New Capabilities

- `seo-basics`: 页面标题/描述/规范链接的静态 head 治理、robots.txt 抓取许可、语义化结构（main 标注、单 h1、alt 约定）的交付要求

### Modified Capabilities

（无——后将变更为纯新增能力，既有能力需求不受影响）

## Impact on Existing Functionality

- `index.html` 现有 `<script>` 主题初始化内联脚本不动（防闪烁机制，与本变更正交）
- 各分区组件仅包在 `<main>` 中（App.tsx 装配层），各 section 渲染行为、锚点、滚动偏移、毛玻璃均不变——`content-sections`/`navigation` 的需求继续成立
- robots.txt 为纯静态文件，无运行时影响
- 无移除行为、无 BREAKING 变更

## Out of Scope

- 社交 meta 标签（og:*、twitter:*——用户明确选择不做，严禁开发）
- JSON-LD 结构化数据（严禁开发）
- sitemap.xml / robots 的抓取频率与站点地图指令（严禁开发）
- 分析/统计脚本（GA、umami 等，严禁开发）
- 多语言 hreflang（严禁开发）
- og:image / 站点社交分享图素材（严禁开发，素材不存在）
- 真实 title/description 文案（占位文案由站主替换）

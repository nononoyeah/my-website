# Design

## Context

`index.html` 为静态 head（`lang="zh-CN"` 已合规、`title="my-website"` 为工程默认值、无 description/canonical），含防闪烁主题内联脚本（必须保留不动）。App 装配层是 ThemeProvider 直接下挂 header/section 们，无 `<main>`。Vite `base='/my-website/'` 会自动重写 index.html 内静态资源 href；`public/*` 原样拷贝到 dist 根（robots.txt 无 base 前缀，GitHub Pages 项目站请求路径为 `/my-website/robots.txt`，源位于 `public/robots.txt` 即正确落位）。静态 `<head>` 消费不了 TS 常量——canonical 的常量替换入口需要一层运行时写入。

## Goals / Non-Goals

**Goals:**
- title/description/canonical/lang 四项 head 治理 + robots.txt + `<main>` 语义落地，全部纳入产物断言防回退
- canonical 决策尊重用户选择：`site.ts` 常量为唯一替换入口，index.html 静态占位兜底
- 语义修复保持既有各能力 spec 行为不变（锚点/滚动/毛玻璃/主题全不变）

**Non-Goals:**
- 社交标签 og:/twitter:、JSON-LD、sitemap.xml、分析脚本、hreflang、分享用图片素材（out-of-scope 严禁）
- 真实 SEO 文案撰写（占位 + 替换入口）

## Decisions

**D1 `src/content/site.ts`（SEO 内容常量入口）**
```ts
export const siteTitle = '站主姓名 ｜ 个人品牌站'      // index.html 静态占位与之对齐
export const siteDescription = '一句话定位占位文案'
export const siteUrl = 'https://<owner>.github.io/my-website/'
```
仅 3 个字符串常量 +【替换真实内容入口】注释。

**D2 head 改造（index.html 直接编辑）**
- `<title>`：改为静态占位「站主姓名 ｜ 个人品牌站」（替换入口注释标注；不同步运行时——静态 title 才是爬虫 primera 视图，站主改 index.html）
- 新增 `<meta name="description" content="{siteDescription 同文案占位}">`（静态，与 D1 注释提示对齐）
- 新增 `<link rel="canonical" href="{siteUrl 占位}" id="site-canonical" data-static>`（静态兜底）
- 主题内联脚本与 favicon 不动；`lang="zh-CN"` 保留并作为防回退断言

**D3 canonical 启动写入（`main.tsx` 二行级改动）**
启动时应用常量：`document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', siteUrl)`——若标签缺失则 `createElement` 追加（防御）。选择运行时写入而非构建期替换（无 vite 插件依赖）与常量「改 ts 即全局生效」的替换承诺一致；对 Googlebot/Bingbot（执行 JS）有效，index.html 静态占位同时覆盖不执行 JS 的拾荒场景。`siteTitle/siteDescription` 常量本期仅作注释对齐基准≠运行时唯一来源，故不注入（避免双写真相）。

**D4 robots.txt（`public/robots.txt`）**
```
User-agent: *
Allow: /
Sitemap: 不写（sitemap 属 out-of-scope）
```
纯静态，Vite 原样拷贝。

**D5 `<main>` 语义落地（`App.tsx` 装配层）**
将 `HeroSection + ProjectsSection + AboutSection(上线后) + ContactSection` 包进 `<main>`；Navbar（`<header>` fixed）与 ThemeToggle（按钮悬浮件）留在 `main` 之外。为规避 ThemeProvider 渲染结构变化，采用不动 ThemeProvider 的方案：`<ThemeProvider><Navbar/><main>…sections…</main><ThemeToggle/></ThemeProvider>`。既有 spec（分区顺序/锚点/偏移）不受影响——DOM 增加唯一的装配层容器。

**D6 语义审查清单（落地修复口径）**
- `main` 唯一性、`header`/`nav`(aria-label)+`a` 已就绪、单 `h1`（Hero）其余 `h2`（ProjectCard 为 `h3` ✓ 属文章层级）、`article`（ProjectCard ✓）
- `<img>` alt 非空约定：ProjectCard 已带 `alt={project.title}`，AboutSection 规划已含 alt；本期默认数据无 `<img>`，以断言「渲染出 `<img>` 必含 alt」承接（防回退）
- 产物断言：dist/index.html 含新 title/description/canonical/robots.txt、JS 产物含 `main` 包装与 siteUrl 常量

## Risks / Trade-offs

- **运行时 canonical vs 构建期替换**：放弃 vite 插件换取零依赖与「常量入口」承诺；不执行 JS 的极老爬虫读到静态占位兜底值，可接受。
- **siteTitle/siteDescription 常量与 index.html 双处文案**：刻意分离（head 静态文案归 index.html，canonical 归常量），以注释交叉指向，避免运行时注入 title 的爬虫不确定性。若后续需要 i18n/多页 title，再演进 head 管理策略。
- **`<main>` 包裹改 App 结构**：触及既往变更的装配顺序，验收场景与 fabric 断言覆盖防回退。

# Tasks

> 执行规则：每个 Phase 完成后停下来向用户汇报并等待确认，确认后才进入下一 Phase。

## Phase 1: head 治理与 robots.txt（seo-basics）

- [x] 1.1 新增 `src/content/site.ts`：`siteTitle`/`siteDescription`/`siteUrl` 三常量（占位值，insta 注释【替换真实内容入口】）；验证：`tsc`/构建通过
- [x] 1.2 `index.html` head 改造：`<title>` 换为「站主姓名 ｜ 个人品牌站」占位；新增 `<meta name="description">` 占位文案与 `<link rel="canonical" id="site-canonical" href="{siteUrl 占位}">`；带替换入口注释；主题内联脚本/favicon/`lang="zh-CN"` 不动；验证：构建通过
- [x] 1.3 新增 `public/robots.txt`（`User-agent: *` + `Allow: /`）；验证：`dist/robots.txt` 产物存在
- [x] 1.4 Phase 1 集成验证：产物断言 `dist/index.html` 含新 title/description/canonical 且不含「my-website」默认标题；`site.ts` siteUrl 在 JS bundle 中；记录验证结果

## Phase 2: canonical 启动写入与语义落地（seo-basics）

- [x] 2.1 `main.tsx`（或等价启动层）启动写入 canonical：`querySelector('link[rel="canonical"]').setAttribute('href', siteUrl)` + 标签缺失时 createElement 追加防御；验证：构建通过
- [x] 2.2 `App.tsx` 语义修复：Hero/Projects/Contact（及未来 About）包进唯一 `<main>`，Navbar/ThemeToggle 留在 main 外；验证：构建通过、分区渲染与交互（锚点/滚动/theme 切换）无回归
- [x] 2.3 语义审查清单核查（D6 口径）：单 h1（Hero）、分区 h2/h3 层级、`<main>` 唯一、img alt 非空约定（默认数据空集走查）、nav aria-label 就绪；记录审查与修复结果

## Phase 3: 变更级验收

- [x] 3.1 `npm run lint` + `npm run build` 全绿；产物断言：dist/index.html（title/description/canonical/lang、无默认工程名）、dist/robots.txt（Allow: /）、bundle（siteUrl、main 包装、分区锚点未受影响）；记录验证结果
- [x] 3.2 逐条核对 seo-basics delta spec 场景（3 需求/10 场景），对照 out-of-scope 红线（无 og/JSON-LD/sitemap/分析脚本）；记录验收结果

## Workflow follow-up

- 每个 Phase 结束：向用户汇报本 Phase 变更并等待确认，未确认不得进入下一 Phase
- 全部验收通过后，执行 archive 流程归档本变更（seo-basics 新建主 spec）

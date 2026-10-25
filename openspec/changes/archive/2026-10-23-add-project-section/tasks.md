# Tasks

> 执行规则：每个 Phase 完成后停下来向用户汇报并等待确认，确认后才进入下一 Phase。

## Phase 1: 项目内容常量与卡片网格组件（projects-section）

- [x] 1.1 新增 `src/content/projects.ts`：`interface ProjectItem { title; description; githubUrl; image? }` 与至少 4 条示例数据（GitHub 链接占位、`image` 全部缺省走渐变占位），附【替换真实内容入口】注释；`sections.ts` 的 `Record<'projects' | 'contact', …>` 收窄为 `'contact'` 并删除 `projects` 字段（含 `SectionsContent` 接口不动 contact 侧）；验证：`tsc`/构建通过
- [x] 1.2 新增 `src/components/ProjectCard.tsx`：卡片四要素渲染（`image` 缺省 → 三档渐变轮换占位块 `aspect-video`；名称；简介；`GitHub ↗` 链接 `target="_blank" rel="noreferrer"`）、hover 微特效（`group` + `transition` + `hover:-translate-y-1 hover:shadow-lg` + 名称变色，`motion-reduce:transition-none`）、亮暗 `dark:` 配色齐全；验证：构建通过
- [x] 1.3 重写 `src/components/ProjectsSection.tsx`：保留 `section id="projects"` 外壳，内部改为三档响应式网格（`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`）渲染 `projects.map(ProjectCard)`，移除 `PlaceholderSection` 引用；确认 `PlaceholderSection` 仅剩 contact 使用；验证：dev 渲染 4 张卡片无空文本
- [x] 1.4 Phase 1 集成验证（构建断言 + 代码走查，浏览器手测留 Phase 3 验收）：响应式三档网格类/三档渐变类/hover 类均编译进产物 ✓；`rel="noreferrer"` 与 `GitHub ↗` 在 bundle ✓；4 条示例 title 在 bundle（数据驱动的替换即生效由此承接）✓；`PlaceholderSection` grep 确认仅剩 contact 引用 ✓
- [x] 2.1 `src/components/HeroSection.tsx` 在 tagline 之后追加 CTA 链接 `<a href="#projects">查看我的项目</a>`：胶囊按钮样式（`rounded-full bg-indigo-600 text-white hover:` + `dark:` 配色）、flex 列内自动堆叠不动既有三段内容；验证：三段居中/全屏/渐变/粒子行为与归档 spec 无差异（diff 仅新增按钮）
- [x] 2.2 CTA 集成验证（构建断言 + 代码走查）：CTA 文案/`#projects` 锚点/胶囊样式在产物 bundle/CSS 中 ✓；平滑滚动与偏移复用已归档的 `scroll-behavior`/`scroll-padding-top`（未改 `index.css`，`<a href>` 原生语义承接）；`transition-colors` 为纯 CSS，`prefers-reduced-motion` 降级即时判定可用；两种模式配色经 `dark:` 变体编译 ✓

## Phase 3: 变更级验收

- [x] 3.1 `npm run lint` + `npm run build` 全绿；产物断言：网格类、`#projects` 锚点、示例项目 title/链接在 bundle 中；确认无 `<img>`（`image` 缺省）故 lazy loading 约定由注释承接
- [x] 3.2 逐条核对三份 delta spec 场景（projects-section 8 场景、hero-section 3 场景、content-sections MODIFIED 3 场景），对照 out-of-scope 红线（无详情页、无搜索）；记录验收结果

## Workflow follow-up

- 每个 Phase 结束：向用户汇报本 Phase 变更并等待确认，未确认不得进入下一 Phase
- 全部验收通过后，执行 archive 流程归档本变更（delta 合入 `projects-section` 主 spec，hero-section/content-sections 主 spec 相应 ADDED/MODIFIED 合入）

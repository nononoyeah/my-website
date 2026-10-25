# Tasks

> 执行规则：每个 Phase 完成后停下来向用户汇报并等待确认，确认后才进入下一 Phase。

## Phase 1: 关于我内容常量与组件（about-section）

- [x] 1.1 新增 `src/content/about.ts`：`AboutContent { title; photo?; paragraphs: [string, string, string]; brandTag }`，三段占位简介 + `'nononoyeah'`，附【替换真实内容入口】注释；验证：`tsc`/构建通过
- [x] 1.2 新增 `src/components/AboutSection.tsx`：`section id="about"`；`md:` 两栏 grid（左照片框 `aspect-square` 圆角——`photo?` 缺省渐变占位块/否则 `<img loading="lazy">`；右 `<h2>` 标题 + 3 段简介 + `rounded-full` 品牌标签），亮暗 `dark:` 配色齐全；验证：构建通过
- [x] 1.3 `App.tsx` 挂载 `AboutSection`（ProjectsSection 与 ContactSection 之间）；验证：页面顺序 home → projects → about → contact、hash `#about` 可直达

## Phase 2: 导航接入与分区结构演进（navigation + content-sections）

- [x] 2.1 `src/content/nav.ts` 的 `navItems` 在 projects 与 contact 之间插入 `{ id: 'about', label: '关于我' }`（Navbar 零改动）；验证：构建通过、导航链接依序四项
- [x] 2.2 窄屏核查（约 360px）：四链接 + 名称仍单行、whitespace-nowrap 不溢出（构建断言 + 走查；若溢出按 D5 预留压缩）；验证：记录结果
- [x] 2.3 集成验证：导航点击「关于我」平滑滚动带偏移；`prefers-reduced-motion` 降级判定；记录验证结果

## Phase 3: 变更级验收

- [x] 3.1 `npm run lint` + `npm run build` 全绿；产物断言：`id:"about"`、about 文案/brandTag 在 bundle、网格/圆角类编译进 CSS、无 `<img>`（缺省照片）、无表单元素；记录验证结果
- [x] 3.2 逐条核对三份 delta spec 场景（about-section 7 场景、navigation MODIFIED 4 场景、content-sections RENAMED+MODIFIED 2 场景），对照 out-of-scope 红线（无联系表单、无下拉）；记录验收结果

## Workflow follow-up

- 每个 Phase 结束：向用户汇报本 Phase 变更并等待确认，未确认不得进入下一 Phase
- 全部验收通过后，执行 archive 流程归档本变更（about-section 新建主 spec；navigation 两个 MODIFIED、content-sections RENAMED+MODIFIED 合入主 specs）

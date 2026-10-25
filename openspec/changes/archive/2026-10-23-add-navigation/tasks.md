# Tasks

> 执行规则：每个 Phase 完成后停下来向用户汇报并等待确认，确认后才进入下一 Phase。

## Phase 1: 导航项常量、滚动 CSS 与 Navbar 组件（navigation）

- [x] 1.1 新增 `src/content/nav.ts`（`NavItem[]`：home/首页、projects/项目、contact/联系我，附 type 与替换入口注释）与 `src/content/sections.ts`（projects/contact 两组 `title`/`description`/`placeholderNote` 占位文案常量）；验证：`tsc` 通过、字段类型齐全
- [x] 1.2 `src/index.css` `:root` 追加 `scroll-behavior: smooth` 与 `scroll-padding-top: 4rem`（注释关联导航栏 h-16 高度）；验证：构建通过、dev 中锚点跳转目标顶部留出导航高度偏移
- [x] 1.3 新增 `src/components/Navbar.tsx` 基础布局：`fixed top-0 inset-x-0 z-40 h-16`，左侧 `profile.name` 锚向 `#home`，右侧 `<nav>` 内三链接（消费 `nav.ts`），亮暗配色 `dark:` 变体齐全；验证：dev 页面顶部渲染正确、名称与链接文字可读
- [x] 1.4 为 Navbar 接入滚动态毛玻璃：页顶哨兵元素 + IntersectionObserver（try/catch 降级常驻毛玻璃），顶部态透明、离顶态半透明底色 + `backdrop-blur-md` + 细分割线（亮暗各自取色，无过渡动画）；验证：滚动离顶出现毛玻璃、回顶恢复透明
- [x] 1.5 移动端压缩横排：`sm` 断点以下链接组与名称缩小字号/压缩间距（`text-sm`/`gap-3`），名称 `truncate` 限宽、链接 `whitespace-nowrap`，无任何展开交互；验证：约 360px 宽视口单行展示、不折行不溢出
- [x] 1.6 Phase 1 集成验证：Navbar 挂入 `App.tsx`（临时态：`#projects`/`#contact` 目标尚不存在）；验证「点击不存在锚点不报错不跳转」「URL 直访 `#home` 定位正常」，记录验证结果

## Phase 2: 占位 Section 与锚点接驳（content-sections）

- [x] 2.1 新增 `src/components/ProjectsSection.tsx` 与 `ContactSection.tsx`：`section id` 对应锚点、`min-h-[60vh]` 内容居中外壳（标题 `h2` + 说明 + 「内容建设中」提示）、消费 `sections.ts` 常量、亮暗 `dark:` 配色、无粒子背景；验证：dev 渲染两组占位内容无空文本
- [x] 2.2 `HeroSection.tsx` 根 `<section>` 添加 `id="home"`；验证：Hero 展示行为与归档 spec 无差异（全屏/居中/渐变/粒子不变，仅加锚点属性）
- [x] 2.3 Phase 2 集成验证：两个占位 Section 挂入 `App.tsx`（Navbar + Hero + 两个 Section）；验证「页面依序呈现 home/projects/contact」「总高度大于首屏」「替换 sections.ts 文案即改显示（走查）」，记录验证结果

## Phase 3: 最终集成与变更级验收

- [x] 3.1 移除 Phase 1/2 的任何临时验证挂载，固化 `App.tsx` 最终结构（Navbar + HeroSection + ProjectsSection + ContactSection + ThemeToggle）；验证：`npm run lint` 与 `npm run build` 通过，产物资源路径仍受 `/my-website/` base 作用
- [x] 3.2 变更级集成验收：逐条核对 spec——点击三链接平滑滚动且目标顶部带偏移、已在目标时无跳变、快速连续点击以最后目标为准、离顶毛玻璃/回顶透明（两种模式）、约 360px 窄屏单行、长文案防守、占位文案完整可替换、`prefers-reduced-motion` 降级路径走查、无下拉/展开交互且无 JS 逐帧动画（对照 out-of-scope 红线）；记录验收结果

## Workflow follow-up

- 每个 Phase 结束：向用户汇报本 Phase 变更并等待确认，未确认不得进入下一 Phase
- 全部验收通过后，按项目约定执行 archive 流程归档本变更（delta specs 合入 `navigation`/`content-sections` 主 specs）

# Design

## Context

前序能力：`hero-section`（含归档新增的 CTA→`#projects`）、`navigation`（毛玻璃 + 平滑滚动 + `scroll-padding-top`；主 spec 规定三链接）、`content-sections`（三分区；主 spec Requirement 名「三分区结构与锚点 id」）、`projects-section`（卡片网格 + 渐变占位策略）。内容常量模式（profile/nav/sections/projects）已确立；Navbar 组件为 `navItems.map` 数据驱动。

## Goals / Non-Goals

**Goals:**
- `#about` 分区：左照片右三段简介 + 品牌标签「nononoyeah」，位置在项目区之后、联系我之前
- 导航接入「关于我」（常量增项，组件零改动），窄屏仍单行
- 主 spec 三处演进：navigation 两个 MODIFIED、content-sections RENAMED+MODIFIED、about-section 新建

**Non-Goals:**
- 联系我表单（out-of-scope 严禁，About spec 显式写「不引入表单交互」场景）
- 真实照片/真实简介文案（占位接替，out-of-scope）
- 下拉/二级导航、关于我详情页

## Decisions

**D1 数据模型 `src/content/about.ts`（新能力内容入口）**
```ts
export interface AboutContent {
  title: string               // 「关于我」（分区标题，页面内视觉平衡用）
  photo?: string              // 照片相对路径；缺省 → 渐变占位图块
  paragraphs: [string, string, string]  // 三段简介（元组类型锁死三段）
  brandTag: string            // 默认 'nononoyeah'
}
```
元组类型而非 `string[]`：让「三段」在类型层面可编译期校验，比运行时 slice 更符合本项目「常量驱动 + 无测试框架」的保障方式。

**D2 组件 `AboutSection.tsx`**
`section id="about"` 固定形态（不复用 PlaceholderSection/ProjectCard——两栏布局结构唯一，强行抽共享壳只会养出参数怪物）。外层 `bg-white dark:bg-zinc-950`，内容 `max-w-6xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-2 items-center`：
- 左栏：照片框 `aspect-square rounded-xl overflow-hidden`——`photo?` 缺省渲染渐变占位块（沿用 ProjectCard 渐变家族的第一档 indigo 系，保持视觉血缘）；有 `photo` 渲染 `<img loading="lazy" alt={<profile.name的照片>}>`
- 右栏：`<h2>{title}</h2>` + 三个 `<p>`（`paragraphs.map`）+ 品牌标签 `<span class="inline-flex rounded-full border …">{brandTag}</span>`（简介下方独立一行，装饰性）

**D3 导航接入**
`nav.ts` `navItems` 插入 `{ id: 'about', label: '关于我' }`（projects 与 contact 之间）。Navbar 组件 map 驱动，零代码改动；链接顺序自动与分区顺序一致。

**D4 App 装配顺序**
`App.tsx`：Navbar + HeroSection + ProjectsSection + `AboutSection` + ContactSection + ThemeToggle。不动 hero/projects/contact 组件。

**D5 窄屏单行风险（四链接）**
现有防守（`text-sm gap-3 whitespace-nowrap` + 名称 `truncate`）保留不动；四链接中文标签（2–3 字/个）在 360px 的剩余宽度裕量经估算充裕。验收阶段用构建断言 + 走查核查；若溢出再压缩（预留名称 `max-w-[6rem]`，非预置）。

**D6 不触碰面**
`index.css`（scroll 偏移已就绪）、ThemeToggle/主题基建、ProjectCard/HeroSection/ContactSection/PlaceholderSection 均不动；Home/项目/联系锚点行为不受影响。

## Risks / Trade-offs

- **品牌标签语义含糊**（「nononoyeah」作为装饰文本展示）——以独立常量字段承接，站主可替换或删除；不做语义化外链（无 spec 依据）。
- **`md:` 与 `sm:` 的网格断点差异**：ProjectSection 用 `sm:grid-cols-2`，About 两栏用 `md:`——平板竖屏下卡片两列、About 仍单列。刻意选择：两栏文本版式需要最小视口宽度才可读，`md:` 更稳。
- **主 spec requirement 重命名（三分区 → 四分区）**使用 RENAMED + MODIFIED 组合，是首次启用该合并路径，归档时重点核对新旧名替换与场景搬运。

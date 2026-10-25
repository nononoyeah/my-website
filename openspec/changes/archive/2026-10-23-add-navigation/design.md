# Design

## Context

站点现状（见 proposal Impact）：`App.tsx` 为 `ThemeProvider > HeroSection + ThemeToggle` 三组件结构；内容常量仅有 `src/content/profile.ts`；`index.css` 含 Tailwind 入口、`dark` 自定义变体、`min-h-hero` 全屏工具类。`ThemeToggle` 为 `fixed right-4 bottom-4 z-50`，与顶部导航栏无几何重叠。本设计只解答「如何做」，行为契约见两份 delta spec。

## Goals / Non-Goals

**Goals:**

- 导航栏零 JS 逐帧：滚动状态检测与锚点滚动都基于浏览器原生能力
- 与 theme-mode 无缝协作：新组件全部通过 `dark:` 变体着色，不触碰主题基础设施
- 占位 Section 结构先行：真实内容替换零组件改动
- 不破坏 hero-section 任何既有承诺（Hero 只加一个 `id` 属性）

**Non-Goals:**

- 移动端汉堡/抽屉/全屏菜单（out-of-scope，见 proposal）
- 导航项目的 active 高亮跟踪（滚动位置与激活态联动，留给后续变更）
- 真实项目/联系内容填充

## Decisions

**D1. 导航组件与层级：`Navbar.tsx`，`fixed` + `z-40`**

`fixed top-0 inset-x-0 z-40 h-16`，一颗哨兵元素判定滚动状态（D4）。选 `z-40` 低于 `ThemeToggle` 的 `z-50`：二者几何不重叠，但保持全局层级单调（视口浮层 > 页面内容，导航 < 悬浮控件）。左端为 `<a href="#home">` 包裹的 `profile.name`，右端为 `<nav>` 内三链接。

*Alternative considered*：`sticky top-0`（随文档流，不遮挡未滚动内容）——Hero 本身顶满 100svh，sticky 与 fixed 在本站行为等价，但 fixed 保证任意滚动位置一致，语义更贴 spec「固定在页面顶部」，选 fixed。

**D2. 导航项与内容常量：`src/content/nav.ts` + `src/content/sections.ts`**

- `nav.ts`：`NavItem[]`（`id` + `label`），静态导出三项：home/首页、projects/项目、contact/联系我
- `sections.ts`：占位 Section 的标题与说明文案常量（`projects`、`contact` 两组：`title`/`description`/`placeholderNote`）

沿用 profile.ts 的「替换真实内容入口」注释约定。占位文案含「内容建设中」提示，满足 spec 强调的可辨识占位语义。

*Alternative considered*：全部并入 `profile.ts` —— 导航与个人档案是不同演进节奏的内容域（导航项会随站点页面增长），分文件保持单一职责。

**D3. 平滑滚动：CSS 原生 `scroll-behavior` + `scroll-padding-top`，零 JS**

`index.css` 的 `:root` 增加：

```css
:root {
  scroll-behavior: smooth;
  scroll-padding-top: 4rem; /* = 导航栏 h-16 高度 */
}
```

- 链接用原生 `<a href="#projects">` 锚点：可访问性（中键/新开/键盘/touch 天然支持）、URL hash 同步、浏览器前进后退均免费获得
- `scroll-padding-top` 统一处理后置偏移——目标 section 顶部露出导航栏高度间距，不用在每个 section 上写 `scroll-margin`
- `scroll-behavior: smooth` 不支持的环境自动即时跳转（spec 降级场景由同一实现满足）；心灵的「快速连续点击」竞争也由浏览器原生中断语义兜底（后点击取消前一滚动）
- 命中 `prefers-reduced-motion: reduce` 用户时浏览器自动降级即时跳转（无障碍加分，不额外写代码）

*Alternative considered*：JS `scrollIntoView({behavior:'smooth'})` onClick —— 失去原生锚点语义（href 为 `#`、无 hash 同步、中键不可用），且需要手写竞争防御；纯 CSS 路线在行为与可访问性上均占优。

**D4. 滚动状态检测：哨兵元素 + IntersectionObserver**

在 `<body>` 顶部渲染一个 1px 高哨兵 `<div>`，`useRef` 观察：sentinel 不可见 ⇔ 页面离开顶部 ⇔ 导航栏进入毛玻璃态。伪码：

```
sentinel 可见 ──> 顶部态：bg-transparent 无模糊
sentinel 不可见 ─> 离顶态：bg-white/70 dark:bg-zinc-950/70 + backdrop-blur-md + 细分割线
```

- 不监听 `scroll` 事件，无逐帧计算（比 scroll throttling 更符合「零 JS 逐帧」目标）
- 亮/暗两态均显式取色（`white/70` 与 `zinc-950/70`），对应 spec 毛玻璃配色场景
- IO 不可用（极老浏览器）try/catch 降级为常驻毛玻璃——模糊效果存在但状态不切换，页面无报错
- 两态切换不附加 transition 渐变：spec 只约束「状态正确」，保持与既有惯例一致（切换即时）

*Alternative considered*：`scroll` 事件 + 阈值判断 —— 逐帧开销与节流复杂度，收益为零，排除。

**D5. 占位 Section 组件：`ProjectsSection.tsx` / `ContactSection.tsx`**

统一形态（场景不同则复用同一渲染结构，各自消费 `sections.ts` 一组文案）：

```
<section id="projects" className="scroll-target">
  <div className="min-h-[60vh] flex flex-col items-center justify-center ...">
    <h2>{title}</h2>
    <p>{description}</p>
    <p className="占位提示样式">{placeholderNote}</p>   // 「内容建设中」
  </div>
</section>
```

- 高度取 `min-h-[60vh]`（记录假设：占位期不满屏、视觉轻于 Hero，避免占位内容与首屏竞争注意力；替换真实内容时随内容自然增长）——该高度为实现期选型，spec 仅要求「总高大于首屏、内容完整可见」，已满足
- 无粒子/无渐变背景：仅主题底色（`bg-background` 语义由 zinc 色板承载），与「粒子仅属首屏」约定一致
- 明亮模式底色 `bg-white` / 暗色 `bg-zinc-950` 与 Hero 渐变形成区隔层次；标题用 `text-zinc-900 dark:text-zinc-100`，说明与占位提示递减灰阶

**D6. Hero 锚点挂接：仅加 `id="home"`，hero-section 主 spec 不动**

`HeroSection.tsx` 根 `<section>` 增加 `id="home"`。展示行为（全屏/居中/渐变/粒子/文案来源）零变化，映射 proposal「新增 id 属性不改变已承诺行为」的评估，主 spec 无 delta。

**D7. 移动端压缩横排：纯响应式样式，无交互逻辑**

- 链接组与名称在 `sm` 断点以下用缩小字号（`text-sm`）与压缩间距（`gap-3`），`sm` 及以上恢复正常（`text-base`/`gap-8`）
- 名称加 `truncate` 与 `max-w` 上限、链接加 `whitespace-nowrap`：长文案防守场景由样式防御保证，不折行不溢出
- 无任何 JS 断点判断、无展开交互（对应 out-of-scope 决策）

**D8. App 集成结构**

```tsx
<ThemeProvider>
  <Navbar />               {/* fixed 顶部，含哨兵 */}
  <HeroSection />          {/* 已有，仅加 id="home" */}
  <ProjectsSection />      {/* 新增占位 */}
  <ContactSection />       {/* 新增占位 */}
  <ThemeToggle />          {/* 不动 */}
</ThemeProvider>
```

`index.css` 的 `:root` 追加 D3 两条属性；`scroll-behavior: smooth` 与 `color-scheme` 属性共存无冲突。

## Risks / Trade-offs

- **[backdrop-filter 兼容性]** → 不支持时 Tailwind 的 `backdrop-blur-md` 无效但不报错，导航栏仍呈半透明底色（毛玻璃降级为磨砂色块），可访问性与布局不受影响
- **[IntersectionObserver 不可用]** → try/catch 降级常驻毛玻璃，状态切换失效但页面可用（极老浏览器场景）
- **[scroll-padding-top 与导航高度耦合]** → 高度一旦调整（h-16 → 其他）需同步改 CSS 值；统一放在 `index.css` 顶部注释关联，降低漂移风险
- **[占位期间「内容建设中」暴露给访客]** → 接受：占位语义是本次交付的明确行为（spec 占位展示需求），真实内容为独立后续变更
- **[fixed 导航遮挡锚点内容]** → 由 D3 `scroll-padding-top` 统一解决；若未来导航高度变化需同步（见上一条）
- **[占位 section 高度调整]** → 记录为 design 假设（60vh），后续内容变更可低成本覆盖

## Migration Plan

1. 新增 `nav.ts`/`sections.ts` 内容常量（独立可验证：类型齐全、tsc 通过）
2. 新增 `Navbar.tsx`（布局 + 毛玻璃状态 + 移动压缩横排）与 `:root` 滚动 CSS（独立可验证：滚动离顶出现/回顶消失毛玻璃、点击平滑滚动定位正确）
3. 新增占位 Section 组件、`HeroSection` 加 `id`、`App.tsx` 集成（独立可验证：三 section 顺序与锚点齐全、占位文案渲染）
4. 部署无新增变更：base path 已配置、锚点为相对 hash；回滚即 git revert，无数据迁移

## Open Questions

（无阻塞项——占位 Section 高度、毛玻璃透明度/模糊半径均为实现期选型，已记录假设与默认值；它们不改变 spec 承诺的行为，可在实现或 review 时微调。）

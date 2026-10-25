# Design

## Context

前序已归档能力：`hero-section`（全屏 + 粒子）、`navigation`（毛玻璃导航 + 平滑滚动 + `scroll-padding-top: 4rem`）、`content-sections`（三分区结构 + 占位展示）。当前项目区为 `PlaceholderSection` 占位薄壳（`src/components/ProjectsSection.tsx` + `src/content/sections.ts`），消费常量的模式已在 `nav.ts`/`profile.ts`/`sections.ts` 三处确立。无图标库、无测试框架、React 19 + Tailwind v4、base `/my-website/`。

## Goals / Non-Goals

**Goals:**
- 项目区从占位升级为卡片网格（≥4 项目：截图占位、名称、简介、GitHub 链接）
- 悬浮微特效纯 CSS、含触屏与 `prefers-reduced-motion` 降级
- Hero 增加锚向 `#projects` 的 CTA 按钮，不改变既有布局行为
- 项目数据集中于内容常量，替换素材/文案零组件改动

**Non-Goals:**
- 项目详情页、项目搜索、CMS、真实截图处理（out-of-scope 严格执行）

## Decisions

**D1 数据模型 `src/content/projects.ts`**（新能力的内容入口）
```ts
export interface ProjectItem {
  title: string
  description: string
  githubUrl: string
  image?: string   // 截图相对路径；缺省 → 渐变占位图块
}
export const projects: ProjectItem[] = [ ...至少 4 条... ]
```
默认 4 条为示例数据（GitHub 链接形如 `https://github.com/<owner>/<repo>` 形式占位，注明【替换真实内容入口】）。选 `projects.ts` 独立文件而非并入 `sections.ts`：项目是列表型领域数据，与分区文案类型不同，避免单一文件膨胀为垃圾场。

**D2 组件结构与复用边界**
`ProjectsSection.tsx` 重写为项目网格（保留 `section id="projects"` 外壳），不再走 `PlaceholderSection`；`PlaceholderSection` 仅保留给 contact。`sections.ts` 中 `projects` 字段随之删除，`Record<'projects' | 'contact', …>` 收窄为 `'contact'`。删除比隐藏更能保证 type 层面无死配置。

**D3 卡片网格**（Tailwind 原生响应式，零自定义 CSS）
`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`。视口三档与 spec 场景一一对应；页面高度大于首屏由 Hero 100svh 天然保证，无需 min-h 补偿。

**D4 截图占位图块**
`image` 缺省时渲染 `<div>` 渐变块（`aspect-video rounded-lg bg-gradient-to-br` 按 `index % 3` 在 indigo/sky/slate 三档渐变间轮换，避免同名单调）；有 `image` 时渲染 `<img loading="lazy" alt="…">`。默认数据不设 `image`，故本期产物中**不存在 `<img>`**——lazy loading 约定在真实素材替换后自动生效，本期以数据注释约定承接。

**D5 悬浮微特效（纯 CSS）**
卡片容器 `group` + `transition duration-200 motion-reduce:transition-none`，悬浮态 `hover:-translate-y-1 hover:shadow-lg`；卡片内名称 `group-hover:text-…` 变色。墙体规则：无 JS、无 keyframes；触屏无 hover 事件因此无残留态（浏览器语义保证）。`motion-reduce:` 变体为无动画偏好降级。

**D6 GitHub 链接安全**
`<a href={githubUrl} target="_blank" rel="noreferrer">`：`noreferrer` 同时隐含 `noopener`，满足 spec 的 opener 防泄漏；不合成的第三方 icon，链接文字「GitHub ↗」。

**D7 Hero CTA**
`HeroSection.tsx` tagline 之后追加：
`<a href="#projects" className="rounded-full bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 …">查看我的项目</a>`
不新增 JS（复用归档的 `scroll-behavior` + `scroll-padding-top` 偏移）；flex 列布局自动向下堆叠，三段内容居中行为不变。

**D8 不触碰面**
`index.css`（偏移已就绪）、navbar/theme 基建、`content-sections` 组件与 id 均不动；构建与 lint 验证口径与既往变更一致（产物断言 + 手测场景清单放 tasks）。

## Risks / Trade-offs

- **示例数据误导访客**：默认 4 条为占位内容，已用「替换真实内容入口」注释显式暴露；素材与文案替换为站主动作，风险可接受。
- **`transition` 与 `backdrop-blur` 并存的低端设备性能**：仅卡片阴影/位移，GPU 合成友好的 transform/shadow，不做大面积 blur 动画。
- **`motion-reduce:` 非 spec 强制项**：属 design 层防御（与全站「降级即可」基调一致），不计入验收红线。

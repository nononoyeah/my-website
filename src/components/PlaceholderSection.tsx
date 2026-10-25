import type { SectionContent } from '../content/sections'

/**
 * 占位 Section 统一渲染形态：
 * section id 对应导航锚点，内容居中，无粒子背景（粒子仅属首屏）。
 */
export function PlaceholderSection({
  id,
  content,
}: {
  id: 'projects' | 'contact'
  content: SectionContent
}) {
  return (
    <section id={id} className="bg-white dark:bg-zinc-950">
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl dark:text-zinc-100">
          {content.title}
        </h2>
        <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
          {content.description}
        </p>
        <p className="inline-flex items-center rounded-full border border-zinc-300 px-3 py-1 text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
          {content.placeholderNote}
        </p>
      </div>
    </section>
  )
}

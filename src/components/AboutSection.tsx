import { aboutContent } from '../content/about'
import { profile } from '../content/profile'

/**
 * 渐变占位照片块（photo 缺省时使用），与项目卡片渐变家族同一色系
 */
const aboutPhotoGradient =
  'from-indigo-200 via-sky-100 to-slate-100 dark:from-indigo-950 dark:via-indigo-900 dark:to-zinc-900'

/**
 * 左图右文两栏：photo 缺省走渐变占位，填入后自动真实照片 + lazy loading
 */
export function AboutSection() {
  return (
    <section id="about" className="bg-white dark:bg-zinc-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center">
        <div className="aspect-square overflow-hidden rounded-xl">
          {aboutContent.photo ? (
            <img
              src={aboutContent.photo}
              alt={`${profile.name}的照片`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              aria-hidden="true"
              className={'h-full w-full bg-gradient-to-br ' + aboutPhotoGradient}
            />
          )}
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl dark:text-zinc-100">
            {aboutContent.title}
          </h2>
          <div className="mt-6 flex flex-col gap-4">
            {aboutContent.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 6)} className="leading-relaxed text-zinc-600 dark:text-zinc-400">
                {paragraph}
              </p>
            ))}
          </div>
          <span className="mt-8 inline-flex items-center rounded-full border border-zinc-300 px-4 py-1.5 text-sm font-medium tracking-wide text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
            {aboutContent.brandTag}
          </span>
        </div>
      </div>
    </section>
  )
}

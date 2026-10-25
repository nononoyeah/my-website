import type { ProjectItem } from '../content/projects'

/**
 * 渐变占位图块三档配色轮换（image 缺省时使用），避免卡片截图区同名单调
 */
const placeholderGradients = [
  'from-indigo-200 via-sky-100 to-slate-100 dark:from-indigo-950 dark:via-indigo-900 dark:to-zinc-900',
  'from-sky-200 via-cyan-100 to-slate-100 dark:from-sky-950 dark:via-zinc-900 dark:to-indigo-950',
  'from-slate-200 via-zinc-100 to-slate-300 dark:from-zinc-800 dark:via-zinc-900 dark:to-slate-900',
]

export function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  return (
    <article className="group flex flex-col rounded-xl border border-zinc-200 bg-zinc-50 p-4 transition duration-200 motion-reduce:transition-none hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      <div className="aspect-video overflow-hidden rounded-lg">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className={'h-full w-full bg-gradient-to-br ' + placeholderGradients[index % 3]}
          />
        )}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-zinc-900 transition-colors group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400">
        {project.title}
      </h3>
      <p className="mt-2 flex-1 text-sm text-zinc-600 dark:text-zinc-400">{project.description}</p>
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
      >
        GitHub ↗
      </a>
    </article>
  )
}

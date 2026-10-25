import { projects } from '../content/projects'
import { ProjectCard } from './ProjectCard'

export function ProjectsSection() {
  return (
    <section id="projects" className="bg-white dark:bg-zinc-950">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-16 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}

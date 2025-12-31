import type { ProjectsData, Portfolio } from '@/interfaces/Portfolio'

interface ProjectsSectionProps {
  data: ProjectsData
  variant: string
  theme: Portfolio['theme']
}

export function ProjectsSection({ data, variant, theme }: ProjectsSectionProps) {
  switch (variant) {
    case 'A':
      return <ProjectsVariantA data={data} theme={theme} />
    case 'B':
      return <ProjectsVariantB data={data} theme={theme} />
    default:
      return <ProjectsVariantA data={data} theme={theme} />
  }
}

function ProjectsVariantA({ data, theme }: { data: ProjectsData; theme: Portfolio['theme'] }) {
  const isDark = theme.mode === 'dark'
  const bgClass = isDark ? 'bg-gray-900' : 'bg-white'
  const textClass = isDark ? 'text-white' : 'text-gray-900'
  const cardBgClass = isDark ? 'bg-gray-800' : 'bg-gray-50'

  return (
    <section className={`${bgClass} py-16 px-4`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-4xl font-bold ${textClass} mb-12 text-center`}>Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(data.projects || []).map((project) => (
            <div
              key={project.id}
              className={`${cardBgClass} rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow`}
            >
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className={`text-xl font-semibold ${textClass} mb-2`}>{project.title}</h3>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  {project.description}
                </p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 rounded"
                        style={{
                          backgroundColor: `${theme.primaryColor}20`,
                          color: theme.primaryColor,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:opacity-80"
                      style={{ color: theme.primaryColor }}
                    >
                      Live Demo →
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:opacity-80"
                      style={{ color: theme.primaryColor }}
                    >
                      GitHub →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectsVariantB({ data, theme }: { data: ProjectsData; theme: Portfolio['theme'] }) {
  const isDark = theme.mode === 'dark'
  const bgClass = isDark ? 'bg-gray-900' : 'bg-white'
  const textClass = isDark ? 'text-white' : 'text-gray-900'
  const cardBgClass = isDark ? 'bg-gray-800' : 'bg-gray-50'

  return (
    <section className={`${bgClass} py-16 px-4`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-4xl font-bold ${textClass} mb-12 text-center`}>Projects</h2>
        <div className="space-y-12">
          {(data.projects || []).map((project, index) => (
            <div
              key={project.id}
              className={`grid md:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                )}
              </div>
              <div className={`${cardBgClass} p-6 rounded-lg ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <h3 className={`text-2xl font-semibold ${textClass} mb-3`}>{project.title}</h3>
                <p className={`text-base ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  {project.description}
                </p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs px-2 py-1 rounded"
                        style={{
                          backgroundColor: `${theme.primaryColor}20`,
                          color: theme.primaryColor,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:opacity-80"
                      style={{ color: theme.primaryColor }}
                    >
                      Live Demo →
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:opacity-80"
                      style={{ color: theme.primaryColor }}
                    >
                      GitHub →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


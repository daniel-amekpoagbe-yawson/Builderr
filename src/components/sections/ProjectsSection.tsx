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
    case 'C':
      return <ProjectsVariantC data={data} theme={theme} />

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

function ProjectsVariantC({ data, theme }: { data: ProjectsData; theme: Portfolio['theme'] }) {
  const isDark = theme.mode === 'dark'
  const primaryColor = theme.primaryColor
  const textColor = isDark ? 'text-white' : 'text-gray-900'
  const borderColor = isDark ? 'border-gray-700' : 'border-black'
  const cardBg = isDark ? 'bg-gray-900' : 'bg-white'
  const containerBg = isDark ? 'bg-gray-950' : 'bg-stone-50'

  return (
    <section className={`relative py-20 px-4 overflow-hidden ${containerBg}`}>
      {/* Retro Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
           <div
            className={`inline-block px-3 py-1 border-2 ${borderColor} text-sm font-bold tracking-widest uppercase bg-transparent ${textColor}`}
          >
            My Work
          </div>
          <h2 className={`text-4xl md:text-5xl font-black ${textColor} tracking-tight`}>
            FEATURED PROJECTS
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           {(data.projects || []).map((project) => (
            <div
              key={project.id}
              className={`flex flex-col h-full border-2 ${borderColor} ${cardBg} group hover:-translate-y-2 transition-transform duration-300`}
              style={{
                boxShadow: `8px 8px 0px 0px ${primaryColor}`,
              }}
            >
              {/* Image Header with browser-like bar */}
              <div className={`border-b-2 ${borderColor} bg-gray-100 dark:bg-gray-800 p-2 flex items-center gap-2`}>
                 <div className="w-3 h-3 rounded-full border border-black/20 bg-red-400" />
                 <div className="w-3 h-3 rounded-full border border-black/20 bg-yellow-400" />
                 <div className="w-3 h-3 rounded-full border border-black/20 bg-green-400" />
              </div>
              
              {project.imageUrl ? (
                <div className={`border-b-2 ${borderColor} overflow-hidden aspect-video relative`}>
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: `${primaryColor}20`}} />
                </div>
              ) : (
                 <div className={`border-b-2 ${borderColor} aspect-video flex items-center justify-center bg-gray-50 dark:bg-gray-800/50`}>
                    <span className="font-mono text-xs opacity-50">NO_PREVIEW</span>
                 </div>
              )}

              <div className="p-6 flex-1 flex flex-col">
                <h3 className={`text-2xl font-bold ${textColor} mb-3 uppercase tracking-tight`}>{project.title}</h3>
                <p className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-700'} mb-6 leading-relaxed flex-1 font-medium`}>
                  {project.description}
                </p>

                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className={`text-xs px-2 py-1 border ${borderColor} font-mono font-bold uppercase`}
                         style={{
                          backgroundColor: 'transparent',
                          color: textColor === 'text-white' ? 'white' : 'black',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-4 mt-auto">
                   {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 text-center py-3 px-4 border-2 ${borderColor} text-sm font-bold uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors`}
                      style={{
                        backgroundColor: primaryColor,
                        color: 'white',
                        boxShadow: `2px 2px 0px 0px ${isDark ? '#fff' : '#000'}`
                      }}
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 text-center py-3 px-4 border-2 ${borderColor} text-sm font-bold uppercase hover:opacity-80 transition-opacity`}
                       style={{
                        color: textColor === 'text-white' ? 'white' : 'black',
                        backgroundColor: 'transparent'
                      }}
                    >
                      GitHub
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


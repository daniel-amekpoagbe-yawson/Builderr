import type { ExperienceData, Portfolio } from '@/interfaces/Portfolio'

interface ExperienceSectionProps {
  data: ExperienceData
  variant: string
  theme: Portfolio['theme']
}

export function ExperienceSection({ data, theme }: ExperienceSectionProps) {
  const isDark = theme.mode === 'dark'
  const bgClass = isDark ? 'bg-gray-900' : 'bg-white'
  const textClass = isDark ? 'text-white' : 'text-gray-900'
  const subtextClass = isDark ? 'text-gray-300' : 'text-gray-600'

  return (
    <section className={`${bgClass} py-16 px-4`}>
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-4xl font-bold ${textClass} mb-12 text-center`}>Experience</h2>
        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-8 top-0 bottom-0 w-0.5"
            style={{ backgroundColor: theme.primaryColor }}
          />
          <div className="space-y-8">
            {(data.experiences || []).map((exp) => (
              <div key={exp.id} className="relative pl-20">
                {/* Timeline dot */}
                <div
                  className="absolute left-6 top-2 w-4 h-4 rounded-full border-4"
                  style={{
                    backgroundColor: theme.primaryColor,
                    borderColor: isDark ? '#1f2937' : '#ffffff',
                  }}
                />
                <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg p-6 shadow`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className={`text-xl font-semibold ${textClass}`}>{exp.position}</h3>
                      <p className={`text-lg font-medium ${subtextClass}`}>{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${subtextClass}`}>
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate || 'Present'}
                      </p>
                      {exp.current && (
                        <span
                          className="text-xs px-2 py-1 rounded-full text-white"
                          style={{ backgroundColor: theme.primaryColor }}
                        >
                          Current
                        </span>
                      )}
                    </div>
                  </div>
                  <p className={`${subtextClass} leading-relaxed`}>{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


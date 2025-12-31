import type { SkillsData, Portfolio } from '@/interfaces/Portfolio'

interface SkillsSectionProps {
  data: SkillsData
  variant: string
  theme: Portfolio['theme']
}

export function SkillsSection({ data, variant, theme }: SkillsSectionProps) {
  switch (variant) {
    case 'A':
      return <SkillsVariantA data={data} theme={theme} />
    case 'B':
      return <SkillsVariantB data={data} theme={theme} />
    default:
      return <SkillsVariantA data={data} theme={theme} />
  }
}

function SkillsVariantA({ data, theme }: { data: SkillsData; theme: Portfolio['theme'] }) {
  const isDark = theme.mode === 'dark'
  const bgClass = isDark ? 'bg-gray-800' : 'bg-gray-50'
  const textClass = isDark ? 'text-white' : 'text-gray-900'

  return (
    <section className={`${bgClass} py-16 px-4`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-4xl font-bold ${textClass} mb-12 text-center`}>Skills</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(data.categories || []).map((category, index) => (
            <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow">
              <h3 className={`text-xl font-semibold ${textClass} mb-4`}>{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {(category.skills || []).map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: `${theme.primaryColor}20`,
                      color: theme.primaryColor,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillsVariantB({ data, theme }: { data: SkillsData; theme: Portfolio['theme'] }) {
  const isDark = theme.mode === 'dark'
  const bgClass = isDark ? 'bg-gray-800' : 'bg-gray-50'
  const textClass = isDark ? 'text-white' : 'text-gray-900'

  return (
    <section className={`${bgClass} py-16 px-4`}>
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-4xl font-bold ${textClass} mb-12 text-center`}>Skills</h2>
        <div className="space-y-6">
          {(data.categories || []).map((category, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <h3 className={`text-lg font-semibold ${textClass}`}>{category.name}</h3>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {(category.skills || []).length} skills
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="h-3 rounded-full transition-all"
                  style={{
                    width: `${Math.min(100, ((category.skills || []).length / 10) * 100)}%`,
                    backgroundColor: theme.primaryColor,
                  }}
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {(category.skills || []).slice(0, 5).map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="text-sm px-2 py-1 rounded"
                    style={{
                      backgroundColor: `${theme.primaryColor}20`,
                      color: theme.primaryColor,
                    }}
                  >
                    {skill}
                  </span>
                ))}
                {(category.skills || []).length > 5 && (
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    +{(category.skills || []).length - 5} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


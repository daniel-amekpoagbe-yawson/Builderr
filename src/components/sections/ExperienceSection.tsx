import type { ExperienceData, Portfolio } from '@/interfaces/Portfolio'

interface ExperienceSectionProps {
  data: ExperienceData
  variant: string
  theme: Portfolio['theme']
}

export function ExperienceSection({ data, variant, theme }: ExperienceSectionProps) {
  switch (variant) {
    case 'A':
      return <ExperienceVariantA data={data} theme={theme} />
    case 'B':
      return <ExperienceVariantB data={data} theme={theme} />
    default:
      return <ExperienceVariantA data={data} theme={theme} />
  }
}

function ExperienceVariantA({ data, theme }: { data: ExperienceData; theme: Portfolio['theme'] }) {
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

function ExperienceVariantB({ data, theme }: { data: ExperienceData; theme: Portfolio['theme'] }) {
  const isDark = theme.mode === 'dark'
  const primaryColor = theme.primaryColor
  const textColor = isDark ? 'text-white' : 'text-gray-900'
  const borderColor = isDark ? 'border-gray-700' : 'border-black'
  const isDarkBg = isDark ? 'bg-gray-900' : 'bg-white'
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
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
           <div
            className={`inline-block px-3 py-1 border-2 ${borderColor} text-sm font-bold tracking-widest uppercase bg-transparent ${textColor}`}
          >
            Career Path
          </div>
          <h2 className={`text-4xl md:text-5xl font-black ${textColor} tracking-tight`}>
           WORK LOG
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line - Dashed and thick */}
          <div
            className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 border-r-2 border-dashed ${borderColor} -translate-x-1/2`}
          />

          <div className="space-y-12">
            {(data.experiences || []).map((exp, index) => (
              <div key={exp.id} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Timeline dot - Square */}
                <div
                  className={`absolute left-4 md:left-1/2 top-0 w-6 h-6 border-2 ${borderColor} -translate-x-1/2 z-10`}
                  style={{ backgroundColor: primaryColor }}
                />

                {/* Date Side */}
                <div className={`flex-1 md:text-right ${index % 2 === 0 ? 'md:text-left' : ''} pl-12 md:pl-0 pt-1 md:pt-0`}>
                   <div className={`inline-block px-3 py-1 border ${borderColor} text-sm font-mono font-bold ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate || 'Present'}
                   </div>
                </div>

                {/* Content Side */}
                <div className="flex-1 pl-12 md:pl-0">
                   <div
                    className={`${isDarkBg} border-2 ${borderColor} p-6 relative group hover:-translate-y-1 transition-transform`}
                    style={{
                      boxShadow: `8px 8px 0px 0px ${isDark ? '#374151' : '#000'}`,
                    }}
                  >
                    <h3 className={`text-xl font-bold ${textColor} mb-1`}>{exp.position}</h3>
                    <p className={`text-lg font-bold mb-4`} style={{ color: primaryColor }}>{exp.company}</p>
                    <p className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-700'} font-medium leading-relaxed`}>{exp.description}</p>
                    
                    {exp.current && (
                        <div className={`absolute top-0 right-0 -mt-3 -mr-3 px-3 py-1 bg-black text-white text-xs font-bold uppercase tracking-wider transform rotate-12 border border-white`}>
                          Current
                        </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


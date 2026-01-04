import type { SkillsData, Portfolio } from '@/interfaces/Portfolio'
import { Code, Palette, Database, Settings, Sparkles } from 'lucide-react'

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
    case 'C':
      return <SkillsVariantC data={data} theme={theme} />
    default:
      return <SkillsVariantA data={data} theme={theme} />
  }
}

// Icon mapping for categories
const categoryIcons: Record<string, React.ElementType> = {
  Frontend: Code,
  Backend: Database,
  Design: Palette,
  Tools: Settings,
  DevOps: Settings,
  default: Sparkles,
}

function SkillsVariantA({ data, theme }: { data: SkillsData; theme: Portfolio['theme'] }) {
  const isDark = theme.mode === 'dark'
  const bgClass = isDark ? 'bg-gray-900' : 'bg-white'
  const cardBgClass = isDark ? 'bg-gray-800/50' : 'bg-gray-50'
  const textClass = isDark ? 'text-white' : 'text-gray-900'
  const subtextClass = isDark ? 'text-gray-400' : 'text-gray-600'

  return (
    <section className={`${bgClass} py-20 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold ${textClass} mb-4`}>Skills & Expertise</h2>
          <p className={`text-lg ${subtextClass} max-w-2xl mx-auto`}>
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(data.categories || []).map((category, index) => {
            const IconComponent = categoryIcons[category.name] || categoryIcons.default
            return (
              <div
                key={index}
                className={`${cardBgClass} rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                  isDark ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: `${theme.primaryColor}15`,
                      color: theme.primaryColor,
                    }}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${textClass}`}>{category.name}</h3>
                    <p className={`text-sm ${subtextClass}`}>
                      {(category.skills || []).length} skill{(category.skills || []).length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2.5">
                  {(category.skills || []).map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                      style={{
                        backgroundColor: isDark
                          ? `${theme.primaryColor}20`
                          : `${theme.primaryColor}10`,
                        color: theme.primaryColor,
                        border: `1px solid ${theme.primaryColor}30`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {(!data.categories || data.categories.length === 0) && (
          <div className={`text-center py-12 ${subtextClass}`}>
            <p className="text-lg">No skills added yet</p>
          </div>
        )}
      </div>
    </section>
  )
}

function SkillsVariantB({ data, theme }: { data: SkillsData; theme: Portfolio['theme'] }) {
  const isDark = theme.mode === 'dark'
  const bgClass = isDark ? 'bg-gray-900' : 'bg-white'
  const cardBgClass = isDark ? 'bg-gray-800/50' : 'bg-gray-50'
  const textClass = isDark ? 'text-white' : 'text-gray-900'
  const subtextClass = isDark ? 'text-gray-400' : 'text-gray-600'

  return (
    <section className={`${bgClass} py-20 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold ${textClass} mb-4`}>Technical Skills</h2>
          <p className={`text-lg ${subtextClass} max-w-2xl mx-auto`}>
            A comprehensive overview of my technical expertise
          </p>
        </div>

        <div className="space-y-6">
          {(data.categories || []).map((category, index) => {
            const skillCount = (category.skills || []).length
            const progressPercentage = Math.min(100, (skillCount / 10) * 100)
            const IconComponent = categoryIcons[category.name] || categoryIcons.default

            return (
              <div
                key={index}
                className={`${cardBgClass} rounded-2xl p-6 border transition-all duration-300 hover:shadow-lg ${
                  isDark ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                {/* Category Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: `${theme.primaryColor}15`,
                        color: theme.primaryColor,
                      }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold ${textClass}`}>{category.name}</h3>
                      <p className={`text-sm ${subtextClass}`}>{skillCount} skills</p>
                    </div>
                  </div>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: theme.primaryColor }}
                  >
                    {skillCount}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div
                    className={`w-full rounded-full overflow-hidden ${
                      isDark ? 'bg-gray-700' : 'bg-gray-200'
                    }`}
                    style={{ height: '10px' }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out relative"
                      style={{
                        width: `${progressPercentage}%`,
                        background: `linear-gradient(90deg, ${theme.primaryColor}, ${theme.primaryColor}dd)`,
                      }}
                    />
                  </div>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2">
                  {(category.skills || []).slice(0, 6).map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
                      style={{
                        backgroundColor: isDark
                          ? `${theme.primaryColor}15`
                          : `${theme.primaryColor}08`,
                        color: theme.primaryColor,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                  {skillCount > 6 && (
                    <span
                      className="px-3 py-1.5 rounded-lg text-sm font-medium"
                      style={{
                        backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        color: subtextClass,
                      }}
                    >
                      +{skillCount - 6} more
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {(!data.categories || data.categories.length === 0) && (
          <div className={`text-center py-12 ${subtextClass}`}>
            <p className="text-lg">No skills added yet</p>
          </div>
        )}
      </div>
    </section>
  )
}

function SkillsVariantC({ data, theme }: { data: SkillsData; theme: Portfolio['theme'] }) {
  const isDark = theme.mode === 'dark'
  const primaryColor = theme.primaryColor
  const textColor = isDark ? 'text-white' : 'text-gray-900'
  const borderColor = isDark ? 'border-gray-700' : 'border-black'
  const bgColor = isDark ? 'bg-gray-900' : 'bg-white'
  const containerBg = isDark ? 'bg-gray-950' : 'bg-stone-50'

  return (
    <section className={`relative py-16 px-4 overflow-hidden ${containerBg}`}>
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
            Capabilities
          </div>
          <h2 className={`text-4xl md:text-5xl font-black ${textColor} tracking-tight`}>
            TECHNICAL ARSENAL
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           {(data.categories || []).map((category, index) => {
             const IconComponent = categoryIcons[category.name] || categoryIcons.default
             return (
               <div
                 key={index}
                 className={`${bgColor} border-2 ${borderColor} p-6 relative group hover:-translate-y-1 transition-transform duration-300`}
                 style={{
                   boxShadow: `8px 8px 0px 0px ${isDark ? '#374151' : '#000'}`,
                 }}
               >
                 <div className={`flex items-start justify-between mb-6`}>
                    <div className={`p-3 border-2 ${borderColor} ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                       <IconComponent className="w-6 h-6" style={{ color: primaryColor }} />
                    </div>
                    <span className={`font-mono text-sm font-bold ${textColor} opacity-60`}>0{index + 1}</span>
                 </div>

                 <h3 className={`text-xl font-bold ${textColor} mb-6 uppercase tracking-tight`}>{category.name}</h3>

                 <div className="space-y-3">
                   {(category.skills || []).map((skill, skillIndex) => (
                     <div key={skillIndex} className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 border ${borderColor} bg-current`} style={{ color: primaryColor }} />
                        <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{skill}</span>
                     </div>
                   ))}
                 </div>
               </div>
             )
           })}
        </div>
      </div>
    </section>
  )
}

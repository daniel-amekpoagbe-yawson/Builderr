import type { AboutData, Portfolio } from '@/interfaces/Portfolio'

interface AboutSectionProps {
  data: AboutData
  variant: string
  theme: Portfolio['theme']
}

export function AboutSection({ data, theme }: AboutSectionProps) {
  const isDark = theme.mode === 'dark'
  const bgClass = isDark ? 'bg-gray-800' : 'bg-gray-50'
  const textClass = isDark ? 'text-white' : 'text-gray-900'
  const subtextClass = isDark ? 'text-gray-300' : 'text-gray-600'

  return (
    <section className={`${bgClass} py-16 px-4`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-4xl font-bold ${textClass} mb-8 text-center`}>About</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {data.imageUrl && (
            <div>
              <img
                src={data.imageUrl}
                alt="About"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          )}
          <div>
            <p className={`text-lg ${subtextClass} mb-6 leading-relaxed`}>{data.bio}</p>
            {data.highlights && data.highlights.length > 0 && (
              <ul className="space-y-2">
                {data.highlights.map((highlight, index) => (
                  <li key={index} className={`flex items-start ${subtextClass}`}>
                    <span className="mr-2" style={{ color: theme.primaryColor }}>
                      •
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}


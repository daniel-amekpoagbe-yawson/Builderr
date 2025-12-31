import type { HeroData, Portfolio } from '@/interfaces/Portfolio'

interface HeroSectionProps {
  data: HeroData
  variant: string
  theme: Portfolio['theme']
}

export function HeroSection({ data, variant, theme }: HeroSectionProps) {
  switch (variant) {
    case 'A':
      return <HeroVariantA data={data} theme={theme} />
    case 'B':
      return <HeroVariantB data={data} theme={theme} />
    case 'C':
      return <HeroVariantC data={data} theme={theme} />
    default:
      return <HeroVariantA data={data} theme={theme} />
  }
}

function HeroVariantA({ data, theme }: { data: HeroData; theme: Portfolio['theme'] }) {
  const isDark = theme.mode === 'dark'
  const bgClass = isDark ? 'bg-gray-900' : 'bg-white'
  const textClass = isDark ? 'text-white' : 'text-gray-900'
  const subtextClass = isDark ? 'text-gray-300' : 'text-gray-600'

  return (
    <section className={`${bgClass} py-20 px-4`}>
      <div className="max-w-4xl mx-auto text-center">
        {data.imageUrl && (
          <div className="mb-8">
            <img
              src={data.imageUrl}
              alt={data.name}
              className="w-32 h-32 rounded-full mx-auto object-cover border-4"
              style={{ borderColor: theme.primaryColor }}
            />
          </div>
        )}
        <h1 className={`text-5xl md:text-6xl font-bold ${textClass} mb-4`}>{data.name}</h1>
        <h2 className={`text-2xl md:text-3xl font-semibold ${subtextClass} mb-6`}>{data.title}</h2>
        <p className={`text-lg ${subtextClass} mb-8 max-w-2xl mx-auto`}>{data.description}</p>
        {data.ctaText && (
          <a
            href={data.ctaLink || '#'}
            className="inline-block px-8 py-3 rounded-lg font-medium text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: theme.primaryColor }}
          >
            {data.ctaText}
          </a>
        )}
      </div>
    </section>
  )
}

function HeroVariantB({ data, theme }: { data: HeroData; theme: Portfolio['theme'] }) {
  const isDark = theme.mode === 'dark'
  const bgClass = isDark ? 'bg-gray-900' : 'bg-white'
  const textClass = isDark ? 'text-white' : 'text-gray-900'
  const subtextClass = isDark ? 'text-gray-300' : 'text-gray-600'

  return (
    <section className={`${bgClass} py-20 px-4`}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className={`text-5xl md:text-6xl font-bold ${textClass} mb-4`}>{data.name}</h1>
          <h2 className={`text-2xl md:text-3xl font-semibold ${subtextClass} mb-6`}>{data.title}</h2>
          <p className={`text-lg ${subtextClass} mb-8`}>{data.description}</p>
          {data.ctaText && (
            <a
              href={data.ctaLink || '#'}
              className="inline-block px-8 py-3 rounded-lg font-medium text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: theme.primaryColor }}
            >
              {data.ctaText}
            </a>
          )}
        </div>
        {data.imageUrl && (
          <div>
            <img
              src={data.imageUrl}
              alt={data.name}
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        )}
      </div>
    </section>
  )
}

function HeroVariantC({ data, theme }: { data: HeroData; theme: Portfolio['theme'] }) {
  const textClass = 'text-white'

  return (
    <section
      className="py-32 px-4 relative bg-cover bg-center"
      style={{
        backgroundImage: data.imageUrl
          ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${data.imageUrl})`
          : `linear-gradient(135deg, ${theme.primaryColor} 0%, ${theme.primaryColor}dd 100%)`,
      }}
    >
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className={`text-5xl md:text-6xl font-bold ${textClass} mb-4`}>{data.name}</h1>
        <h2 className={`text-2xl md:text-3xl font-semibold ${textClass} mb-6 opacity-90`}>
          {data.title}
        </h2>
        <p className={`text-lg ${textClass} mb-8 max-w-2xl mx-auto opacity-90`}>{data.description}</p>
        {data.ctaText && (
          <a
            href={data.ctaLink || '#'}
            className="inline-block px-8 py-3 rounded-lg font-medium text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: theme.primaryColor }}
          >
            {data.ctaText}
          </a>
        )}
      </div>
    </section>
  )
}


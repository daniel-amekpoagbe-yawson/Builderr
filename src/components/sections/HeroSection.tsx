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
    case 'D':
      return <HeroVariantD data={data} theme={theme} />
    default:
      return <HeroVariantA data={data} theme={theme} />
  }
}

function HeroVariantA({
  data,
  theme,
}: {
  data: HeroData
  theme: Portfolio['theme']
}) {
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
        <h1 className={`text-5xl md:text-6xl font-bold ${textClass} mb-4`}>
          {data.name}
        </h1>
        <h2
          className={`text-2xl md:text-3xl font-semibold ${subtextClass} mb-6`}
        >
          {data.title}
        </h2>
        <p className={`text-lg ${subtextClass} mb-8 max-w-2xl mx-auto`}>
          {data.description}
        </p>
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

function HeroVariantB({
  data,
  theme,
}: {
  data: HeroData
  theme: Portfolio['theme']
}) {
  const isDark = theme.mode === 'dark'
  const bgClass = isDark
    ? 'bg-gray-900'
    : 'bg-gradient-to-br from-gray-50 to-white'
  const textClass = isDark ? 'text-white' : 'text-gray-900'
  const subtextClass = isDark ? 'text-gray-300' : 'text-gray-600'

  return (
    <section
      className={`${bgClass} py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden`}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: theme.primaryColor }}
        ></div>
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: theme.primaryColor }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6">
            <div className="space-y-4">
              <h1
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${textClass} leading-tight`}
              >
                {data.name.split(' ').map((word, index) => (
                  <span key={index}>
                    {index === 0 && (
                      <span style={{ color: theme.primaryColor }}>{word}</span>
                    )}
                    {index !== 0 && ` ${word}`}
                  </span>
                ))}
              </h1>
              <h2
                className={`text-xl sm:text-2xl md:text-3xl font-semibold ${subtextClass} mt-2`}
              >
                {data.title}
              </h2>
            </div>

            <p
              className={`text-base sm:text-lg md:text-xl ${subtextClass} leading-relaxed max-w-2xl ${isDark ? '' : 'text-gray-700'}`}
            >
              {data.description}
            </p>

            {data.ctaText && (
              <div className="pt-4">
                <a
                  href={data.ctaLink || '#'}
                  className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  {data.ctaText}
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </div>
            )}
          </div>

          {/* Right Image */}
          {data.imageUrl && (
            <div className="relative lg:order-last">
              <div className="relative z-10">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={data.imageUrl}
                    alt={data.name}
                    className="w-full h-auto object-cover aspect-square lg:aspect-auto"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>

              {/* Floating decorative elements */}
              <div
                className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-20 blur-xl hidden lg:block"
                style={{ backgroundColor: theme.primaryColor }}
              ></div>
              <div
                className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full opacity-20 blur-xl hidden lg:block"
                style={{ backgroundColor: theme.primaryColor }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function HeroVariantC({
  data,
  theme,
}: {
  data: HeroData
  theme: Portfolio['theme']
}) {
  const isDark = theme.mode === 'dark'
  const primaryColor = theme.primaryColor
  const textColor = isDark ? 'text-white' : 'text-gray-900'
  const borderColor = isDark ? 'border-gray-700' : 'border-black'
  const bgColor = isDark ? 'bg-gray-900' : 'bg-white'
  const containerBg = isDark ? 'bg-gray-950' : 'bg-stone-50'

  return (
    <section
      className={`relative pt-12 pb-12 px-4 overflow-hidden min-h-[70vh] flex flex-col justify-center ${containerBg}`}
    >
      {/* Retro Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 order-2 lg:order-1">
            <div
              className={`${bgColor} border-2 ${borderColor} p-8 md:p-12 relative`}
              style={{
                boxShadow: `8px 8px 0px 0px ${primaryColor}`,
              }}
            >
              <div className="space-y-6">
                <div>
                   <span className={`inline-block px-3 py-1 mb-4 text-xs font-bold uppercase tracking-widest border ${borderColor} ${textColor}`}>
                      Hello_World
                   </span>
                   <h1 className={`text-4xl md:text-6xl font-black ${textColor} leading-none tracking-tighter`}>
                    {data.name.toUpperCase()}
                  </h1>
                </div>
                
                <h2 className={`text-xl md:text-2xl font-bold ${textColor} flex items-center gap-2`}>
                   <span className="w-8 h-1" style={{ backgroundColor: primaryColor }}></span>
                   {data.title}
                </h2>

                <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} font-medium leading-relaxed max-w-lg`}>
                  {data.description}
                </p>

                {data.ctaText && (
                  <div className="pt-4">
                    <a
                      href={data.ctaLink || '#'}
                      className={`
                        inline-block px-8 py-4
                        text-white font-bold text-lg uppercase tracking-wider
                        border-2 ${borderColor}
                        transition-all duration-200
                        hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                      `}
                      style={{ backgroundColor: primaryColor }}
                    >
                      {data.ctaText}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            {data.imageUrl ? (
              <div className="relative w-full max-w-md">
                 <div className={`absolute inset-0 border-2 ${borderColor} translate-x-4 translate-y-4`} style={{ backgroundColor: isDark ? '#333' : '#e5e5e5' }} />
                 <div className={`relative border-2 ${borderColor} bg-gray-200 aspect-square overflow-hidden grayscale hover:grayscale-0 transition-all duration-500`}>
                    <img 
                      src={data.imageUrl} 
                      alt={data.name}
                      className="w-full h-full object-cover"
                    />
                 </div>
              </div>
            ) : (
               <div className={`w-full max-w-md aspect-square border-2 ${borderColor} flex items-center justify-center bg-gray-100 dark:bg-gray-800`}>
                  <span className={`font-mono text-sm ${textColor}`}>NO_SIGNAL</span>
               </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroVariantD({
  data,
  theme,
}: {
  data: HeroData
  theme: Portfolio['theme']
}) {
  const isDark = theme.mode === 'dark'
  const primaryColor = theme.primaryColor
  const textColor = isDark ? 'text-white' : 'text-gray-900'
  const borderColor = isDark ? 'border-gray-700' : 'border-black'
  const bgColor = isDark ? 'bg-gray-900' : 'bg-white'

  return (
    <section
      className={`relative pb-8 pt-4 px-4 overflow-hidden ${isDark ? 'bg-gray-950' : 'bg-stone-50'}`}
    >
      {/* Retro Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div
          className={`
            grid lg:grid-cols-2 gap-8 lg:gap-12 items-center
            p-8 md:p-12
            ${bgColor}
            border-2 ${borderColor}
          `}
          style={{
            boxShadow: `12px 12px 0px 0px ${primaryColor}`,
          }}
        >
          {/* Content */}
          <div className="space-y-8 text-left order-2 lg:order-1">
            <div className="space-y-4">
              <div
                className={`inline-block px-3 py-1 border-2 ${borderColor} text-sm font-bold tracking-widest uppercase bg-transparent ${textColor}`}
              >
                {data.title}
              </div>
              <h1
                className={`text-xl md:text-4xl font-black ${textColor} tracking-tighter leading-[0.9]`}
              >
                {data.name.toUpperCase()}
              </h1>
            </div>

            <p
              className={`text-lg md:text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'} font-medium border-l-2 pl-6 py-1 leading-relaxed`}
              style={{ borderColor: primaryColor }}
            >
              {data.description}
            </p>

            {data.ctaText && (
              <a
                href={data.ctaLink || '#'}
                className={`
                    inline-block px-4 py-3
                    text-white font-bold text-lg uppercase tracking-wider
                    border-2 ${isDark ? 'border-white' : 'border-black'}
                    transition-all duration-200
                    hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                    active:translate-y-0 active:shadow-none
                `}
                style={{ backgroundColor: primaryColor }}
              >
                {data.ctaText}
              </a>
            )}
          </div>

          {/* Image */}
          {data.imageUrl && (
            <div className="relative order-1 lg:order-2 mb-6 lg:mb-0">
              <div className="relative group">
                <div
                  className={`absolute inset-0 border-2 ${borderColor} translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3`}
                  style={{ backgroundColor: primaryColor }}
                />
                <img
                  src={data.imageUrl}
                  alt={data.name}
                  className={`relative z-10 w-full aspect-square object-cover border-2 ${borderColor} grayscale group-hover:grayscale-0 transition-all duration-500`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

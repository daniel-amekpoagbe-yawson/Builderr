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
  const textClass = 'text-white'

  return (
    <section
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative min-h-[600px] md:min-h-[700px] flex items-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: data.imageUrl
          ? `linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.7) 100%), url(${data.imageUrl})`
          : `linear-gradient(135deg, ${theme.primaryColor} 0%, ${theme.primaryColor}dd 50%, ${theme.primaryColor} 100%)`,
      }}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        ></div>
      </div>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <h1
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${textClass} leading-tight`}
              >
                <span className="block">
                  {data.name.split(' ')[0]}
                  <span style={{ color: theme.primaryColor }} className="ml-2">
                    !
                  </span>
                </span>
                {data.name.split(' ').slice(1).length > 0 && (
                  <span className="block mt-2">
                    {data.name.split(' ').slice(1).join(' ')}
                  </span>
                )}
              </h1>
              <h2
                className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold ${textClass} opacity-95 mt-4`}
              >
                {data.title}
              </h2>
            </div>

            <p
              className={`text-base sm:text-lg md:text-xl ${textClass} leading-relaxed max-w-2xl mx-auto lg:mx-0 opacity-90`}
            >
              {data.description}
            </p>

            {data.ctaText && (
              <div className="pt-4">
                <a
                  href={data.ctaLink || '#'}
                  className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-white transition-all hover:scale-105 hover:shadow-2xl backdrop-blur-sm bg-white/10 border border-white/20"
                  style={{
                    backgroundColor: `${theme.primaryColor}dd`,
                    boxShadow: `0 8px 32px ${theme.primaryColor}40`,
                  }}
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

          {/* Right Image/Visual Element */}
          {data.imageUrl && (
            <div className="relative lg:order-last">
              <div className="relative z-10">
                {/* Main image container with floating effect */}
                <div className="relative transform hover:scale-105 transition-transform duration-500">
                  <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-3xl blur-xl opacity-50 animate-pulse"></div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 backdrop-blur-sm">
                    <img
                      src={data.imageUrl}
                      alt={data.name}
                      className="w-full h-auto object-cover aspect-square lg:aspect-4/5"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Floating decorative icons/elements */}
              <div
                className="absolute -top-6 -right-6 w-16 h-16 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center hidden lg:flex animate-bounce"
                style={{ animationDuration: '3s' }}
              >
                <div
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: theme.primaryColor }}
                ></div>
              </div>
              <div
                className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center hidden lg:flex animate-bounce"
                style={{ animationDuration: '4s', animationDelay: '0.5s' }}
              >
                <div
                  className="w-10 h-10 rounded-lg rotate-45"
                  style={{ backgroundColor: theme.primaryColor }}
                ></div>
              </div>
            </div>
          )}
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
                className={`text-4xl md:text-6xl font-black ${textColor} tracking-tighter leading-[0.9]`}
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

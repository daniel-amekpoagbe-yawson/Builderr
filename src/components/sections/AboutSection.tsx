import type { AboutData, Portfolio } from '@/interfaces/Portfolio'
import { Facebook, Dribbble, Instagram, Linkedin, Twitter, Github, Download } from 'lucide-react'



interface AboutSectionProps {
  data: AboutData
  variant: string
  theme: Portfolio['theme']
}

export function AboutSection({ data, variant, theme }: AboutSectionProps) {
  switch (variant) {
    case 'A':
      return <AboutVariantA data={data} theme={theme} />
    case 'B':
      return <AboutVariantB data={data} theme={theme} />
    case 'C':
      return <AboutVariantC data={data} theme={theme} />

    default:
      return <AboutVariantA data={data} theme={theme} />
  }
}

function AboutVariantA({ data, theme }: { data: AboutData; theme: Portfolio['theme'] }) {
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

function AboutVariantB({ data, theme }: { data: AboutData; theme: Portfolio['theme'] }) {
  const isDark = theme.mode === 'dark'
  const bgClass = isDark ? 'bg-gray-900' : 'bg-white'
  const textClass = isDark ? 'text-white' : 'text-gray-900'
  const subtextClass = isDark ? 'text-gray-300' : 'text-gray-600'

  const socialLinks = data.social || {}
  const hasSocialLinks = Object.values(socialLinks).some((link) => link)

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Facebook className="w-5 h-5" />
      case 'dribbble':
        return <Dribbble className="w-5 h-5" />
      case 'instagram':
        return <Instagram className="w-5 h-5" />
      case 'twitter':
        return <Twitter className="w-5 h-5" />
      case 'github':
        return <Github className="w-5 h-5" />
      default:
        return null
    }
  }

  return (
    <section className={`${bgClass} py-16 md:py-24 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Section - Image and Social Icons */}
          <div className="flex flex-col items-center lg:items-start">
            {data.imageUrl && (
              <div className="relative w-full max-w-sm">
                {/* Image Container */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={data.imageUrl}
                    alt="About"
                    className="w-full h-auto object-cover"
                  />
                </div>
                
                {/* Social Media Icons - Positioned to overlap bottom of image */}
                {hasSocialLinks && (
                  <div className="flex items-center gap-3 mt-4 lg:mt-6 justify-center lg:justify-start">
                    {socialLinks.facebook && (
                      <a
                        href={socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:shadow-md"
                        style={{ backgroundColor: theme.primaryColor, color: 'white' }}
                        aria-label="Facebook"
                      >
                        {getSocialIcon('facebook')}
                      </a>
                    )}
                    {socialLinks.dribbble && (
                      <a
                        href={socialLinks.dribbble}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:shadow-md"
                        style={{ backgroundColor: theme.primaryColor, color: 'white' }}
                        aria-label="Dribbble"
                      >
                        {getSocialIcon('dribbble')}
                      </a>
                    )}
                    {socialLinks.instagram && (
                      <a
                        href={socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:shadow-md"
                        style={{ backgroundColor: theme.primaryColor, color: 'white' }}
                        aria-label="Instagram"
                      >
                        {getSocialIcon('instagram')}
                      </a>
                    )}
                    {socialLinks.linkedin && (
                      <a
                        href={socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:shadow-md"
                        style={{ backgroundColor: theme.primaryColor, color: 'white' }}
                        aria-label="LinkedIn"
                      >
                        {getSocialIcon('linkedin')}
                      </a>
                    )}
                 
                    {socialLinks.twitter && (
                      <a
                        href={socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:shadow-md"
                        style={{ backgroundColor: theme.primaryColor, color: 'white' }}
                        aria-label="Twitter"
                      >
                        {getSocialIcon('twitter')}
                      </a>
                    )}
                    {socialLinks.github && (
                      <a
                        href={socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:shadow-md"
                        style={{ backgroundColor: theme.primaryColor, color: 'white' }}
                        aria-label="GitHub"
                      >
                        {getSocialIcon('github')}
                      </a>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Section - Content and Buttons */}
          <div className="space-y-5 lg:space-y-6 mt-8 lg:mt-0">
            {/* Section Title and Subtitle */}
            <div className="space-y-2">
              <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${textClass}`}>
                About
              </h2>
              {data.title && (
                <h3 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold ${textClass} leading-tight`}>
                  {data.title}
                </h3>
              )}
            </div>

            {/* Bio/Description - Multiple paragraphs */}
            <div className="space-y-4">
              {data.bio && (
                <>
                  <p className={`text-base sm:text-lg ${subtextClass} leading-relaxed`}>
                    {data.bio.split('\n\n')[0] || data.bio}
                  </p>
                  {data.bio.split('\n\n').length > 1 && (
                    <p className={`text-base sm:text-lg ${subtextClass} leading-relaxed`}>
                      {data.bio.split('\n\n').slice(1).join('\n\n')}
                    </p>
                  )}
                </>
              )}
            </div>

            {/* CTA Buttons */}
            {(data.ctaButtons?.primary || data.ctaButtons?.secondary) && (
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                {data.ctaButtons.primary && (
                  <a
                    href={data.ctaButtons.primary.link || '#'}
                    className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg font-semibold text-white transition-all hover:opacity-90 shadow-md"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    {data.ctaButtons.primary.text}
                  </a>
                )}
                {data.ctaButtons.secondary && (
                  <a
                    href={data.ctaButtons.secondary.link || '#'}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold border-2 transition-all hover:opacity-90 bg-white"
                    style={{
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.3)' : '#e5e7eb',
                      color: isDark ? 'white' : '#374151',
                    }}
                  >
                    <Download className="w-4 h-4" />
                    {data.ctaButtons.secondary.text}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutVariantC({ data, theme }: { data: AboutData; theme: Portfolio['theme'] }) {
  const isDark = theme.mode === 'dark'
  const primaryColor = theme.primaryColor
  const textColor = isDark ? 'text-white' : 'text-gray-900'
  const borderColor = isDark ? 'border-gray-700' : 'border-black'
  const bgColor = isDark ? 'bg-gray-900' : 'bg-white'
  const containerBg = isDark ? 'bg-gray-950' : 'bg-stone-50'

  const socialLinks = data.social || {}
  const hasSocialLinks = Object.values(socialLinks).some((link) => link)

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Facebook className="w-5 h-5" />
      case 'dribbble':
        return <Dribbble className="w-5 h-5" />
      case 'instagram':
        return <Instagram className="w-5 h-5" />
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />
      case 'twitter':
        return <Twitter className="w-5 h-5" />
      case 'github':
        return <Github className="w-5 h-5" />
      default:
        return null
    }
  }

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
        <div
          className={`${bgColor} border-[1.5px] ${borderColor} p-8 md:p-12`}
          style={{ boxShadow: `6px 6px 0px 0px ${primaryColor}` }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <div className="order-2 md:order-1">
              {data.imageUrl && (
                <div className="relative group">
                  <div
                    className={`absolute inset-0 border ${borderColor} translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3`}
                    style={{ backgroundColor: primaryColor }}
                  />
                  <img
                    src={data.imageUrl}
                    alt="About"
                    className={`relative w-full aspect-4/5 object-cover border ${borderColor} grayscale group-hover:grayscale-0 transition-all duration-500`}
                  />
                </div>
              )}
            </div>

            {/* Content Side */}
            <div className="order-1 md:order-2 space-y-8">
              <div className="space-y-4">
                <div
                  className={`inline-block px-3 py-1 border ${borderColor} text-sm font-bold tracking-widest uppercase bg-transparent ${textColor}`}
                >
                  About Me
                </div>
                <h2 className={`text-4xl md:text-5xl font-black ${textColor} tracking-tight`}>
                  {data.title || 'Who I Am'}
                </h2>
              </div>

              <div className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed font-medium space-y-4`}>
                 {data.bio && (
                  <>
                    <p>{data.bio.split('\n\n')[0]}</p>
                    {data.bio.split('\n\n').length > 1 && (
                      <p>{data.bio.split('\n\n').slice(1).join('\n\n')}</p>
                    )}
                  </>
                )}
              </div>

              {data.highlights && data.highlights.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 border ${borderColor} ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}
                    >
                      <div className="w-2 h-2" style={{ backgroundColor: primaryColor }} />
                      <span className={`font-medium ${textColor} text-sm`}>{highlight}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-4 pt-4 border-t-2 border-dashed" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                {hasSocialLinks && (
                  <div className="flex gap-3">
                    {Object.entries(socialLinks).map(([platform, url]) => {
                      if (!url) return null
                      return (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-12 h-12 flex items-center justify-center border ${borderColor} hover:-translate-y-1 transition-transform`}
                          style={{
                             backgroundColor: isDark ? 'transparent' : 'white',
                             color: textColor === 'text-white' ? 'white' : 'black',
                             boxShadow: `3px 3px 0px 0px ${primaryColor}`
                          }}
                        >
                          {getSocialIcon(platform)}
                        </a>
                      )
                    })}
                  </div>
                )}
              </div>
              
              {/* CTA Buttons */}
              {(data.ctaButtons?.primary || data.ctaButtons?.secondary) && (
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    {data.ctaButtons.primary && (
                      <a
                        href={data.ctaButtons.primary.link || '#'}
                         className={`
                            px-4 py-3 font-bold text-center uppercase tracking-wider text-xs
                            border-2 ${borderColor}
                            hover:-translate-y-0.5 transition-all
                        `}
                        style={{
                           backgroundColor: primaryColor,
                           color: 'white',
                           boxShadow: `2px 2px 0px 0px ${isDark ? '#fff' : '#000'}`
                        }}
                      >
                        {data.ctaButtons.primary.text}
                      </a>
                    )}
                    {data.ctaButtons.secondary && (
                       <a
                        href={data.ctaButtons.secondary.link || '#'}
                        className={`
                            px-4 py-3 font-bold text-center uppercase tracking-wider text-xs
                            border-2 ${borderColor}
                            hover:-translate-y-0.5 transition-all
                            flex items-center justify-center gap-2
                        `}
                        style={{
                           backgroundColor: isDark ? '#1f2937' : 'white',
                           color: textColor === 'text-white' ? 'white' : 'black',
                           boxShadow: `2px 2px 0px 0px ${isDark ? '#fff' : '#000'}`
                        }}
                      >
                        <Download className="w-4 h-4" />
                        {data.ctaButtons.secondary.text}
                      </a>
                    )}
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

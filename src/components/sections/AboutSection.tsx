import type { AboutData, Portfolio } from '@/interfaces/Portfolio'
import { Facebook, Dribbble, Instagram, Linkedin, Twitter, Github, Download } from 'lucide-react'

// Custom Behance icon component
function BehanceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.885 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.859h-6.465v-2.891h6.465v2.891zm-1.179-4.109c-.737 0-1.221-.33-1.221-.885 0-.716.543-.977 1.221-.977.697 0 1.221.261 1.221.977 0 .555-.484.885-1.221.885zm-1.179-4.109h6.465v-2.891h-6.465v2.891z" />
    </svg>
  )
}

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
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />
      case 'behance':
        return <BehanceIcon className="w-5 h-5" />
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
                    {socialLinks.behance && (
                      <a
                        href={socialLinks.behance}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:shadow-md"
                        style={{ backgroundColor: theme.primaryColor, color: 'white' }}
                        aria-label="Behance"
                      >
                        {getSocialIcon('behance')}
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

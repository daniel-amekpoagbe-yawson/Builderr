import type { AboutData, Portfolio } from '@/interfaces/Portfolio'
import { Facebook, Dribbble, Instagram, Linkedin, Twitter, Github, Download } from 'lucide-react'
import { sanitizeUrl } from '@/lib/sanitize'



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
        <div className="grid lg:grid-cols-12 gap-12 items-start">
           
           {/* Left Column: Image/Card */}
           <div className="lg:col-span-5 order-1">
              <div 
                 className={`${bgColor} border-2 ${borderColor} p-4 pb-12 relative`}
                 style={{ boxShadow: `8px 8px 0px 0px ${primaryColor}` }}
              >
                  {/* Browser Dots */}
                  <div className="flex gap-2 mb-4 border-b pb-2" style={{ borderColor: isDark ? '#374151' : '#e5e5e5' }}>
                     <div className="w-3 h-3 rounded-full bg-red-400 border border-black/20" />
                     <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black/20" />
                     <div className="w-3 h-3 rounded-full bg-green-400 border border-black/20" />
                  </div>

                  {data.imageUrl ? (
                     <div className="aspect-4/5 bg-gray-100 dark:bg-gray-800 relative overflow-hidden border border-gray-900/10">
                        <img 
                           src={data.imageUrl} 
                           alt="About Me" 
                           className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        />
                     </div>
                  ) : (
                     <div className="aspect-4/5 bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                        <span className="text-sm font-mono opacity-50">IMG_SOURCE_NOT_FOUND</span>
                     </div>
                  )}

                  {/* Absolute Badge */}
                  <div 
                     className="absolute bottom-6 -right-6 px-6 py-2 border-2 border-black font-bold uppercase tracking-widest text-sm bg-white text-black transform -rotate-2"
                     style={{ 
                        boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)'
                     }}
                  >
                     Est. 2024
                  </div>
              </div>
           </div>

           {/* Right Column: Text */}
           <div className="lg:col-span-7 order-2 space-y-8 lg:pl-8">
              <div>
                 <h2 className={`text-5xl font-black ${textColor} mb-2 tracking-tighter`}>
                    ABOUT ME
                 </h2>
                 <div className="h-2 w-24" style={{ backgroundColor: primaryColor }} />
              </div>

              <div className={`space-y-4 text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} font-medium leading-relaxed`}>
                 {data.bio?.split('\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                 ))}
              </div>

               {data.highlights && (
                  <div className="grid sm:grid-cols-2 gap-4 pt-4">
                     {data.highlights.map((item, i) => (
                        <div key={i} className={`flex items-center gap-3 p-3 border-l-4 ${isDark ? 'bg-gray-900' : 'bg-white'}`} style={{ borderColor: primaryColor }}>
                           <span className={`font-bold ${textColor}`}>{item}</span>
                        </div>
                     ))}
                  </div>
               )}
            
              <div className="pt-8 flex flex-wrap gap-4 items-center">
                 {hasSocialLinks && (
                    <div className="flex gap-2">
                       {Object.entries(socialLinks).map(([platform, url]) => (
                          url && (
                             <a 
                                key={platform}
                                href={sanitizeUrl(url)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-10 h-10 border-2 ${borderColor} flex items-center justify-center hover:-translate-y-1 transition-transform ${textColor}`}
                                style={{ boxShadow: `4px 4px 0px 0px ${isDark ? '#fff' : '#000'}` }}
                             >
                                {getSocialIcon(platform)}
                             </a>
                          )
                       ))}
                    </div>
                 )}

                 {data.ctaButtons?.primary && (
                    <a
                      href={sanitizeUrl(data.ctaButtons.primary.link)}
                      className={`
                         ml-auto px-8 py-3 
                         font-bold uppercase tracking-widest text-sm
                         border-2 ${borderColor} bg-transparent ${textColor}
                         hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black
                         transition-colors
                      `}
                    >
                       {data.ctaButtons.primary.text}
                    </a>
                 )}
              </div>
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
                          href={sanitizeUrl(url)}
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
                        href={sanitizeUrl(data.ctaButtons.primary.link)}
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
                        href={sanitizeUrl(data.ctaButtons.secondary.link)}
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

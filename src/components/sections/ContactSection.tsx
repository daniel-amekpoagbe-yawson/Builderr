import type { ContactData, Portfolio } from '@/interfaces/Portfolio'
import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Twitter,
  Send,
  CheckCircle2,
} from 'lucide-react'

interface ContactSectionProps {
  data: ContactData
  variant: string
  theme: Portfolio['theme']
}

export function ContactSection({ data, variant, theme }: ContactSectionProps) {
  switch (variant) {
    case 'A':
      return <ContactVariantA data={data} theme={theme} />
    case 'B':
      return <ContactVariantB data={data} theme={theme} />
    default:
      return <ContactVariantA data={data} theme={theme} />
  }
}

function ContactVariantA({ data, theme }: { data: ContactData; theme: Portfolio['theme'] }) {
  const isDark = theme.mode === 'dark'
  const bgClass = isDark ? 'bg-gray-900' : 'bg-white'
  const cardBgClass = isDark ? 'bg-gray-800/50' : 'bg-gray-50'
  const textClass = isDark ? 'text-white' : 'text-gray-900'
  const subtextClass = isDark ? 'text-gray-400' : 'text-gray-600'
  const inputBgClass = isDark ? 'bg-gray-800' : 'bg-white'
  const inputTextClass = isDark ? 'text-white' : 'text-gray-900'
  const borderClass = isDark ? 'border-gray-700' : 'border-gray-200'

  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSubmitted(true)
    setIsSubmitting(false)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  const socialLinks = [
    { key: 'github', icon: Github, url: data.social?.github, label: 'GitHub' },
    {
      key: 'linkedin',
      icon: Linkedin,
      url: data.social?.linkedin,
      label: 'LinkedIn',
    },
    {
      key: 'twitter',
      icon: Twitter,
      url: data.social?.twitter,
      label: 'Twitter',
    },
  ].filter((link) => link.url)

  return (
    <section className={`${bgClass} py-20 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold ${textClass} mb-4`}>
            Get In Touch
          </h2>
          <p className={`text-lg ${subtextClass} max-w-2xl mx-auto`}>
            Have a project in mind or want to collaborate? I'd love to hear from
            you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information Card */}
          <div
            className={`${cardBgClass} rounded-2xl p-8 border ${borderClass}`}
          >
            <h3 className={`text-2xl font-bold ${textClass} mb-6`}>
              Contact Information
            </h3>

            {/* User Image and Bio */}
            {(data.imageUrl || data.bio) && (
              <div className="mb-8 pb-8 border-b border-gray-200/5 dark:border-gray-700">
                {data.imageUrl && (
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <img
                        src={data.imageUrl}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 shadow-lg"
                        style={{ borderColor: theme.primaryColor }}
                      />
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          boxShadow: `0 0 0 4px ${theme.primaryColor}20`,
                        }}
                      />
                    </div>
                  </div>
                )}
                {data.bio && (
                  <p
                    className={`text-sm ${subtextClass} text-center leading-relaxed max-w-xs mx-auto`}
                  >
                    {data.bio}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-6">
              {data.email && (
                <a
                  href={`mailto:${data.email}`}
                  className="flex items-start gap-4 group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: `${theme.primaryColor}15`,
                      color: theme.primaryColor,
                    }}
                  >
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${subtextClass} mb-1`}>
                      Email
                    </p>
                    <p
                      className={`text-lg font-semibold ${textClass} group-hover:opacity-80 transition-opacity break-all`}
                      style={{ color: theme.primaryColor }}
                    >
                      {data.email}
                    </p>
                  </div>
                </a>
              )}

              {data.phone && (
                <a
                  href={`tel:${data.phone}`}
                  className="flex items-start gap-4 group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: `${theme.primaryColor}15`,
                      color: theme.primaryColor,
                    }}
                  >
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${subtextClass} mb-1`}>
                      Phone
                    </p>
                    <p
                      className={`text-lg font-semibold ${textClass} group-hover:opacity-80 transition-opacity`}
                      style={{ color: theme.primaryColor }}
                    >
                      {data.phone}
                    </p>
                  </div>
                </a>
              )}

              {socialLinks.length > 0 && (
                <div>
                  <p className={`text-sm font-medium ${subtextClass} mb-4`}>
                    Follow Me
                  </p>
                  <div className="flex gap-3">
                    {socialLinks.map(({ key, icon: Icon, url, label }) => (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                          isDark
                            ? 'bg-gray-700 hover:bg-gray-600'
                            : 'bg-white hover:bg-gray-50'
                        } border ${borderClass}`}
                        style={{
                          color: theme.primaryColor,
                        }}
                        aria-label={label}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Form Card */}
          <div
            className={`${cardBgClass} rounded-2xl p-8 border ${borderClass}`}
          >
            <h3 className={`text-2xl font-bold ${textClass} mb-6`}>
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className={`block text-sm font-medium ${subtextClass} mb-2`}
                >
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className={`w-full px-4 py-3 rounded-xl border ${inputBgClass} ${inputTextClass} ${borderClass} focus:ring-2 focus:border-transparent transition-all outline-none`}
                  style={
                    {
                      '--tw-ring-color': theme.primaryColor,
                    } as React.CSSProperties
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium ${subtextClass} mb-2`}
                >
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className={`w-full px-4 py-3 rounded-xl border ${inputBgClass} ${inputTextClass} ${borderClass} focus:ring-2 focus:border-transparent transition-all outline-none`}
                  style={
                    {
                      '--tw-ring-color': theme.primaryColor,
                    } as React.CSSProperties
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className={`block text-sm font-medium ${subtextClass} mb-2`}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={6}
                  className={`w-full px-4 py-3 rounded-xl border ${inputBgClass} ${inputTextClass} ${borderClass} focus:ring-2 focus:border-transparent transition-all resize-none outline-none`}
                  style={
                    {
                      '--tw-ring-color': theme.primaryColor,
                    } as React.CSSProperties
                  }
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || submitted}
                className={`w-full px-6 py-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                  submitted
                    ? 'bg-green-500'
                    : isSubmitting
                      ? 'opacity-70 cursor-not-allowed'
                      : 'hover:opacity-90 hover:shadow-lg hover:scale-[1.02]'
                }`}
                style={{
                  backgroundColor: submitted ? undefined : theme.primaryColor,
                }}
              >
                {submitted ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactVariantB({ data, theme }: { data: ContactData; theme: Portfolio['theme'] }) {
  const isDark = theme.mode === 'dark'
  const primaryColor = theme.primaryColor
  const textColor = isDark ? 'text-white' : 'text-gray-900'
  const borderColor = isDark ? 'border-gray-700' : 'border-black'
  const bgColor = isDark ? 'bg-gray-900' : 'bg-white'
  const containerBg = isDark ? 'bg-gray-950' : 'bg-stone-50'

  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSubmitted(true)
    setIsSubmitting(false)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

   const socialLinks = [
    { key: 'github', icon: Github, url: data.social?.github, label: 'GitHub' },
    {
      key: 'linkedin',
      icon: Linkedin,
      url: data.social?.linkedin,
      label: 'LinkedIn',
    },
    {
      key: 'twitter',
      icon: Twitter,
      url: data.social?.twitter,
      label: 'Twitter',
    },
  ].filter((link) => link.url)

  return (
    <section className={`relative py-10 px-4 overflow-hidden ${containerBg}`}>
      {/* Retro Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8 space-y-4">
           <div
            className={`inline-block px-3 py-1 border ${borderColor} text-sm font-bold tracking-widest uppercase bg-transparent ${textColor}`}
          >
            Connect
          </div>
          <h2 className={`text-4xl md:text-5xl font-black ${textColor} tracking-tight`}>
            Contact Me
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className={`${bgColor} border ${borderColor} p-8 relative`} style={{ boxShadow: `4px 4px 0px 0px ${primaryColor}` }}>
               <h3 className={`text-2xl font-black ${textColor} mb-8 uppercase tracking-wide`}>Contact Information</h3>
               
               <div className="space-y-8">
                  {(data.imageUrl || data.bio) && (
                     <div className="flex gap-6 items-start">
                        {data.imageUrl && (
                           <img src={data.imageUrl} alt="Profile" className={`w-20 h-20 border-2 ${borderColor} object-cover grayscale`} />
                        )}
                         {data.bio && <p className={`${isDark ? 'text-gray-400' : 'text-gray-700'} font-medium`}>{data.bio}</p>}
                     </div>
                  )}

                  <div className="space-y-4">
                     {data.email && (
                        <div className={`flex items-center gap-4 p-4 border ${borderColor} ${isDark ? 'bg-gray-950' : 'bg-white'}`}>
                           <Mail className="w-5 h-5" style={{ color: primaryColor }} />
                           <span className={`font-mono ${textColor}`}>{data.email}</span>
                        </div>
                     )}
                     {data.phone && (
                        <div className={`flex items-center gap-4 p-4 border ${borderColor} ${isDark ? 'bg-gray-950' : 'bg-white'}`}>
                           <Phone className="w-5 h-5" style={{ color: primaryColor }} />
                           <span className={`font-mono ${textColor}`}>{data.phone}</span>
                        </div>
                     )}
                  </div>

                  {socialLinks.length > 0 && (
                     <div className="flex gap-4 pt-4 border-t border-dashed" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                        {socialLinks.map(({ key, icon: Icon, url }) => (
                           <a
                              key={key}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`w-12 h-12 flex items-center justify-center border-2 ${borderColor} hover:-translate-y-1 transition-transform`}
                              style={{ 
                                 backgroundColor: isDark ? 'transparent' : 'white',
                                 boxShadow: `4px 4px 0px 0px ${isDark ? '#fff' : '#000'}`,
                                 color: textColor === 'text-white' ? 'white' : 'black'
                              }}
                           >
                              <Icon className="w-5 h-5" />
                           </a>
                        ))}
                     </div>
                  )}
               </div>
            </div>

            {/* Form */}
             <div className={`${bgColor} border ${borderColor} p-8 relative`} style={{ boxShadow: `4px 4px 0px 0px ${isDark ? '#fff' : '#000'}` }}>
               <h3 className={`text-2xl font-black ${textColor} mb-8 uppercase tracking-wide`}>Send Message</h3>
               
               <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                     <label htmlFor="name" className={`block font-bold text-sm uppercase mb-2 ${textColor}`}>Name</label>
                     <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className={`w-full p-3 bg-transparent border ${borderColor} outline-none focus:ring-1 ring-opacity-20 ${textColor}`}
                        style={{ '--tw-ring-color': primaryColor } as React.CSSProperties}
                        placeholder="Enter your name"
                     />
                  </div>
                  <div>
                     <label htmlFor="email" className={`block font-bold text-sm uppercase mb-2 ${textColor}`}>Email</label>
                     <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className={`w-full p-3 bg-transparent border ${borderColor} outline-none focus:ring-1 ring-opacity-20 ${textColor}`}
                        style={{ '--tw-ring-color': primaryColor } as React.CSSProperties}
                        placeholder="Enter your email"
                     />
                  </div>
                   <div>
                     <label htmlFor="message" className={`block font-bold text-sm uppercase mb-2 ${textColor}`}>Message</label>
                     <textarea
                        id="message"
                         value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={5}
                        className={`w-full p-3 bg-transparent border ${borderColor} outline-none focus:ring-1 ring-opacity-20 ${textColor} resize-none`}
                        style={{ '--tw-ring-color': primaryColor } as React.CSSProperties}
                        placeholder="Enter your message"
                     />
                  </div>
                  
                  <button
                     type="submit"
                     disabled={isSubmitting || submitted}
                     className={`w-full py-4 font-black uppercase tracking-widest text-white border ${borderColor} hover:-translate-y-1 transition-all active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed`}
                     style={{ 
                        backgroundColor: submitted ? '#10B981' : primaryColor,
                        boxShadow: `2px 2px 0px 0px ${isDark ? '#fff' : '#000'}`
                     }}
                  >
                     {submitted ? 'Transmission Received' : isSubmitting ? 'Transmitting...' : 'Initiate Transmission'}
                  </button>
               </form>
            </div>
        </div>
      </div>
    </section>
  )
}

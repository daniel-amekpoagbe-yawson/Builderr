import type { ContactData, Portfolio } from '@/interfaces/Portfolio'
import { useState } from 'react'
import type { FormEvent } from 'react'

interface ContactSectionProps {
  data: ContactData
  variant: string
  theme: Portfolio['theme']
}

export function ContactSection({ data, theme }: ContactSectionProps) {
  const isDark = theme.mode === 'dark'
  const bgClass = isDark ? 'bg-gray-800' : 'bg-gray-50'
  const textClass = isDark ? 'text-white' : 'text-gray-900'
  const inputBgClass = isDark ? 'bg-gray-700' : 'bg-white'
  const inputTextClass = isDark ? 'text-white' : 'text-gray-900'

  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // In a real app, this would send an email or save to database
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className={`${bgClass} py-16 px-4`}>
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-4xl font-bold ${textClass} mb-12 text-center`}>Get In Touch</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className={`text-2xl font-semibold ${textClass} mb-6`}>Contact Information</h3>
            <div className="space-y-4">
              {data.email && (
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                    Email
                  </p>
                  <a
                    href={`mailto:${data.email}`}
                    className={`text-lg ${textClass} hover:opacity-80`}
                    style={{ color: theme.primaryColor }}
                  >
                    {data.email}
                  </a>
                </div>
              )}
              {data.phone && (
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                    Phone
                  </p>
                  <a
                    href={`tel:${data.phone}`}
                    className={`text-lg ${textClass} hover:opacity-80`}
                    style={{ color: theme.primaryColor }}
                  >
                    {data.phone}
                  </a>
                </div>
              )}
              {(data.social?.github || data.social?.linkedin || data.social?.twitter) && (
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
                    Social
                  </p>
                  <div className="flex gap-4">
                    {data.social.github && (
                      <a
                        href={data.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl hover:opacity-80"
                        style={{ color: theme.primaryColor }}
                      >
                        GitHub
                      </a>
                    )}
                    {data.social.linkedin && (
                      <a
                        href={data.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl hover:opacity-80"
                        style={{ color: theme.primaryColor }}
                      >
                        LinkedIn
                      </a>
                    )}
                    {data.social.twitter && (
                      <a
                        href={data.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl hover:opacity-80"
                        style={{ color: theme.primaryColor }}
                      >
                        Twitter
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className={`text-2xl font-semibold ${textClass} mb-6`}>Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className={`w-full px-4 py-3 rounded-lg border ${inputBgClass} ${inputTextClass} border-gray-300 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors`}
                  style={{ '--tw-ring-color': theme.primaryColor } as React.CSSProperties}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className={`w-full px-4 py-3 rounded-lg border ${inputBgClass} ${inputTextClass} border-gray-300 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors`}
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border ${inputBgClass} ${inputTextClass} border-gray-300 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors`}
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg font-medium text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: theme.primaryColor }}
              >
                {submitted ? 'Message Sent!' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}


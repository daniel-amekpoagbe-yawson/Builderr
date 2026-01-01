import type { Portfolio } from '@/interfaces/Portfolio'
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react'

interface PortfolioFooterProps {
  portfolio: Portfolio
}

export function PortfolioFooter({ portfolio }: PortfolioFooterProps) {
  const isDark = portfolio.theme.mode === 'dark'
  const bgClass = isDark ? 'bg-gray-900' : 'bg-white'
  const textClass = isDark ? 'text-white' : 'text-gray-900'
  const subtextClass = isDark ? 'text-gray-400' : 'text-gray-600'
  const borderClass = isDark ? 'border-gray-800' : 'border-gray-200'

  // Extract social links from contact and about sections
  const contactSection = portfolio.sections.find((s) => s.type === 'contact')
  const aboutSection = portfolio.sections.find((s) => s.type === 'about')
  const contactData = contactSection?.data as any
  const aboutData = aboutSection?.data as any

  const socialLinks = [
    {
      key: 'github',
      icon: Github,
      url: contactData?.social?.github || aboutData?.social?.github,
    },
    {
      key: 'linkedin',
      icon: Linkedin,
      url: contactData?.social?.linkedin || aboutData?.social?.linkedin,
    },
    {
      key: 'twitter',
      icon: Twitter,
      url: contactData?.social?.twitter || aboutData?.social?.twitter,
    },
  ].filter((link) => link.url)

  const email = contactData?.email || aboutData?.email

  return (
    <footer className={`${bgClass} border-t ${borderClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center gap-6">
          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-4">
              {socialLinks.map(({ key, icon: Icon, url }) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors ${subtextClass} hover:${textClass}`}
                  aria-label={key}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className={`transition-colors ${subtextClass} hover:${textClass}`}
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              )}
            </div>
          )}

          {/* Copyright */}
          <div className="flex items-center gap-2">
            <p className={`${subtextClass} text-sm`}>
              © {new Date().getFullYear()} {portfolio.title}
            </p>
            <span className={subtextClass}>•</span>
            <p className={`${subtextClass} text-sm`}>
              Built with{' '}
              <Heart
                className="w-3.5 h-3.5 inline mx-0.5"
                style={{ color: portfolio.theme.primaryColor }}
                fill={portfolio.theme.primaryColor}
              />{' '}
              using{' '}
              <a
                href="/"
                className="font-medium hover:opacity-80 transition-opacity"
                style={{ color: portfolio.theme.primaryColor }}
              >
                Buildrr
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

import type { Portfolio } from '@/interfaces/Portfolio'

interface PortfolioFooterProps {
  portfolio: Portfolio
}

export function PortfolioFooter({ portfolio }: PortfolioFooterProps) {
  const isDark = portfolio.theme.mode === 'dark'
  const bgClass = isDark ? 'bg-gray-900' : 'bg-gray-50'
  const textClass = isDark ? 'text-gray-300' : 'text-gray-600'
  const borderClass = isDark ? 'border-gray-800' : 'border-gray-200'

  return (
    <>
      <footer className={`${bgClass} border-t ${borderClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {portfolio.title}
              </h3>
              <p className={`${textClass} text-sm leading-relaxed`}>
                A professional portfolio showcasing skills, projects, and experience.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className={`text-sm font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Quick Links
              </h4>
              <ul className={`space-y-2.5 ${textClass} text-sm`}>
                {portfolio.sections
                  .filter((s) => s.enabled)
                  .sort((a, b) => a.order - b.order)
                  .map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#section-${section.type}`}
                        onClick={(e) => {
                          e.preventDefault()
                          const element = document.getElementById(`section-${section.type}`)
                          element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }}
                        className="hover:opacity-80 transition-opacity capitalize inline-block"
                      >
                        {section.type}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Connect Section */}
            <div>
              <h4 className={`text-sm font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Connect
              </h4>
              <p className={`${textClass} text-sm leading-relaxed`}>
                Get in touch through the contact section above or reach out directly.
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className={`mt-10 pt-8 border-t ${borderClass}`}>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className={`${textClass} text-sm text-center sm:text-left`}>
                © {new Date().getFullYear()} {portfolio.title}. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Watermark */}
      <div className={`${bgClass} border-t ${borderClass} py-3`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className={`${textClass} text-xs text-center`}>
            Built with{' '}
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
    </>
  )
}

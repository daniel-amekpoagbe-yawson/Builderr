import type { Portfolio } from '@/interfaces/Portfolio'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface PortfolioNavbarProps {
  portfolio: Portfolio
}

export function PortfolioNavbar({ portfolio }: PortfolioNavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const isDark = portfolio.theme.mode === 'dark'
  const bgClass = isDark ? 'bg-gray-900' : 'bg-white'
  const textClass = isDark ? 'text-white' : 'text-gray-900'
  const borderClass = isDark ? 'border-gray-800' : 'border-gray-200'

  // Get section IDs for smooth scrolling
  const sectionIds = portfolio.sections
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order)
    .map((s) => s.type)

  const scrollToSection = (sectionType: string) => {
    const element = document.getElementById(`section-${sectionType}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsOpen(false)
    }
  }

  return (
    <nav className={`sticky top-0 z-50 ${bgClass} border-b ${borderClass} shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="#" className={`text-xl font-bold ${textClass}`}>
              {portfolio.title}
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {sectionIds.map((sectionType) => (
              <Button
                key={sectionType}
                variant="ghost"
                onClick={() => scrollToSection(sectionType)}
                className={`capitalize ${textClass} hover:opacity-80`}
                style={{
                  color: isDark ? 'white' : undefined,
                }}
              >
                {sectionType}
              </Button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className={textClass}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className={`md:hidden ${bgClass} border-t ${borderClass}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {sectionIds.map((sectionType) => (
              <Button
                key={sectionType}
                variant="ghost"
                onClick={() => scrollToSection(sectionType)}
                className={`w-full justify-start capitalize ${textClass}`}
                style={{
                  color: isDark ? 'white' : undefined,
                }}
              >
                {sectionType}
              </Button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}


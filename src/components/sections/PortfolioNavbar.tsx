import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import type { Portfolio } from '@/interfaces/Portfolio'
import { Button } from '@/components/ui/button'

interface PortfolioNavbarProps {
  portfolio: Portfolio
}

export function PortfolioNavbar({ portfolio }: PortfolioNavbarProps) {
  const navbarVariant = portfolio.theme.navbarVariant || 'default'

  switch (navbarVariant) {
    case 'A':
      return <FloatingNavbar portfolio={portfolio} />
    case 'B':
      return <RetroNavbar portfolio={portfolio} />
    default:
      return <DefaultNavbar portfolio={portfolio} />
  }
}

function RetroNavbar({ portfolio }: PortfolioNavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const isDark = portfolio.theme.mode === 'dark'
  const primaryColor = portfolio.theme.primaryColor
  const textColor = isDark ? 'text-white' : 'text-gray-900'
  const borderColor = isDark ? 'border-gray-700' : 'border-black'
  const bgColor = isDark ? 'bg-gray-900' : 'bg-stone-50'

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
    <nav className={`sticky top-0 z-50 ${bgColor} border-b-2 ${borderColor} shadow-none`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <a 
              href="#" 
              className={`text-2xl font-black uppercase tracking-tighter ${textColor} border-2 ${borderColor} px-4 py-1 transition-transform hover:-translate-y-0.5`}
              style={{ boxShadow: `4px 4px 0px 0px ${primaryColor}` }}
            >
              {portfolio.title}
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {sectionIds.map((sectionType) => (
              <button
                key={sectionType}
                onClick={() => scrollToSection(sectionType)}
                className={`
                  capitalize font-bold text-sm tracking-widest px-4 py-2 
                  border-2 ${borderColor} transition-all
                  hover:-translate-y-0.5 active:translate-y-0
                  ${isDark ? 'text-white hover:bg-gray-800' : 'text-gray-900 hover:bg-white'}
                `}
                style={{ 
                  boxShadow: `3px 3px 0px 0px ${isDark ? '#fff' : '#000'}`,
                }}
              >
                {sectionType}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 border-2 ${borderColor} ${textColor} transition-transform hover:-translate-y-0.5 active:translate-y-0`}
              style={{ boxShadow: `4px 4px 0px 0px ${primaryColor}` }}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className={`md:hidden ${bgColor} border-t-2 ${borderColor} p-4 space-y-4`}>
          {sectionIds.map((sectionType) => (
            <button
              key={sectionType}
              onClick={() => scrollToSection(sectionType)}
              className={`
                w-full text-left capitalize font-bold text-sm tracking-widest px-4 py-3
                border-2 ${borderColor} transition-all
                ${isDark ? 'text-white' : 'text-gray-900'}
              `}
              style={{ 
                boxShadow: `4px 4px 0px 0px ${primaryColor}`,
              }}
            >
              {sectionType}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

function DefaultNavbar({ portfolio }: PortfolioNavbarProps) {
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

function FloatingNavbar({ portfolio }: PortfolioNavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isDark = portfolio.theme.mode === 'dark'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        scrolled ? 'w-[95%] max-w-5xl' : 'w-[90%] max-w-4xl'
      }`}
    >
      <div
        className={`rounded-full px-4 sm:px-6 lg:px-8 backdrop-blur-md border transition-all duration-300 ${
          isDark
            ? 'bg-gray-900/80 border-gray-700/50'
            : 'bg-white/80 border-gray-200/50'
        } ${scrolled ? 'shadow-xl' : 'shadow-lg'}`}
      >
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center">
            <a
              href="#"
              className={`text-lg sm:text-xl font-bold transition-colors ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
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
                className={`capitalize rounded-full px-4 py-2 transition-all hover:scale-105 ${
                  isDark
                    ? 'text-white hover:bg-white/10'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
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
              className={`rounded-full ${
                isDark ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div
          className={`mt-2 rounded-2xl backdrop-blur-md border overflow-hidden transition-all ${
            isDark
              ? 'bg-gray-900/90 border-gray-700/50'
              : 'bg-white/90 border-gray-200/50'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {sectionIds.map((sectionType) => (
              <Button
                key={sectionType}
                variant="ghost"
                onClick={() => scrollToSection(sectionType)}
                className={`w-full justify-start capitalize rounded-lg ${
                  isDark
                    ? 'text-white hover:bg-white/10'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
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

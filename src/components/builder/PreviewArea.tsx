import type { Portfolio, Section, FontFamily } from '@/interfaces/Portfolio'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { GallerySection } from '@/components/sections/GallerySection'
import { PortfolioNavbar } from '@/components/sections/PortfolioNavbar'
import { PortfolioFooter } from '@/components/sections/PortfolioFooter'

// Font family CSS mapping
const fontFamilyMap: Record<FontFamily, string> = {
  inter: "'Inter', sans-serif",
  roboto: "'Roboto', sans-serif",
  poppins: "'Poppins', sans-serif",
  playfair: "'Playfair Display', serif",
  'space-grotesk': "'Space Grotesk', sans-serif",
  'dm-sans': "'DM Sans', sans-serif",
  'jetbrains-mono': "'JetBrains Mono', monospace",
  'source-serif': "'Source Serif Pro', serif",
}

interface PreviewAreaProps {
  portfolio: Portfolio
  selectedSectionId?: string | null
  onSelectSection?: (id: string) => void
  isPreviewMode: boolean
}

export function PreviewArea({ portfolio, selectedSectionId, onSelectSection, isPreviewMode }: PreviewAreaProps) {
  const sortedSections = [...portfolio.sections]
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order)

  const renderSection = (section: Section) => {
    const isSelected = selectedSectionId === section.id
    const baseClasses = isSelected && !isPreviewMode
      ? 'ring-4 ring-indigo-500 ring-offset-4'
      : ''

    switch (section.type) {
      case 'hero':
        return (
          <div className={baseClasses} onClick={() => onSelectSection?.(section.id)}>
            <HeroSection data={section.data as any} variant={section.variant} theme={portfolio.theme} />
          </div>
        )
      case 'about':
        return (
          <div className={baseClasses} onClick={() => onSelectSection?.(section.id)}>
            <AboutSection data={section.data as any} variant={section.variant} theme={portfolio.theme} />
          </div>
        )
      case 'projects':
        return (
          <div className={baseClasses} onClick={() => onSelectSection?.(section.id)}>
            <ProjectsSection data={section.data as any} variant={section.variant} theme={portfolio.theme} />
          </div>
        )
      case 'skills':
        return (
          <div className={baseClasses} onClick={() => onSelectSection?.(section.id)}>
            <SkillsSection data={section.data as any} variant={section.variant} theme={portfolio.theme} />
          </div>
        )
      case 'experience':
        return (
          <div className={baseClasses} onClick={() => onSelectSection?.(section.id)}>
            <ExperienceSection data={section.data as any} variant={section.variant} theme={portfolio.theme} />
          </div>
        )
      case 'contact':
        return (
          <div className={baseClasses} onClick={() => onSelectSection?.(section.id)}>
            <ContactSection data={section.data as any} variant={section.variant} theme={portfolio.theme} />
          </div>
        )
      case 'gallery':
        return (
          <div className={baseClasses} onClick={() => onSelectSection?.(section.id)}>
            <GallerySection data={section.data as any} variant={section.variant} theme={portfolio.theme} />
          </div>
        )
      default:
        return null
    }
  }

  const fontFamily = fontFamilyMap[portfolio.theme.fontFamily] || fontFamilyMap.inter

  return (
    <div
      className={`min-h-full ${portfolio.theme.mode === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
      style={{
        fontFamily,
        '--primary-color': portfolio.theme.primaryColor,
        '--secondary-color': portfolio.theme.secondaryColor || portfolio.theme.primaryColor,
        '--accent-color': portfolio.theme.accentColor || portfolio.theme.primaryColor,
      } as React.CSSProperties}
    >
      {sortedSections.length === 0 ? (
        <div className="flex items-center justify-center min-h-screen text-gray-500">
          <div className="text-center">
            <p className="text-lg mb-2">No sections yet</p>
            <p className="text-sm">Add a section from the sidebar</p>
          </div>
        </div>
      ) : (
        <>
          {isPreviewMode && <PortfolioNavbar portfolio={portfolio} />}
          <div
            className={
              isPreviewMode && (portfolio.theme.navbarVariant === 'A')
                ? 'pt-24 sm:pt-28'
                : ''
            }
          >
            {sortedSections.map((section) => (
              <div key={section.id} id={`section-${section.type}`}>
                {renderSection(section)}
              </div>
            ))}
          </div>
          {isPreviewMode && <PortfolioFooter portfolio={portfolio} />}
        </>
      )}
    </div>
  )
}


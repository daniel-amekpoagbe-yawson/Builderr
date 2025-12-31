import type { Portfolio, Section } from '@/interfaces/Portfolio'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { ContactSection } from '@/components/sections/ContactSection'

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
          <div key={section.id} className={baseClasses} onClick={() => onSelectSection?.(section.id)}>
            <HeroSection data={section.data as any} variant={section.variant} theme={portfolio.theme} />
          </div>
        )
      case 'about':
        return (
          <div key={section.id} className={baseClasses} onClick={() => onSelectSection?.(section.id)}>
            <AboutSection data={section.data as any} variant={section.variant} theme={portfolio.theme} />
          </div>
        )
      case 'projects':
        return (
          <div key={section.id} className={baseClasses} onClick={() => onSelectSection?.(section.id)}>
            <ProjectsSection data={section.data as any} variant={section.variant} theme={portfolio.theme} />
          </div>
        )
      case 'skills':
        return (
          <div key={section.id} className={baseClasses} onClick={() => onSelectSection?.(section.id)}>
            <SkillsSection data={section.data as any} variant={section.variant} theme={portfolio.theme} />
          </div>
        )
      case 'experience':
        return (
          <div key={section.id} className={baseClasses} onClick={() => onSelectSection?.(section.id)}>
            <ExperienceSection data={section.data as any} variant={section.variant} theme={portfolio.theme} />
          </div>
        )
      case 'contact':
        return (
          <div key={section.id} className={baseClasses} onClick={() => onSelectSection?.(section.id)}>
            <ContactSection data={section.data as any} variant={section.variant} theme={portfolio.theme} />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div
      className={`min-h-full ${portfolio.theme.mode === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
      style={{
        fontFamily: portfolio.theme.fontFamily === 'roboto' ? 'Roboto, sans-serif' : 'Inter, sans-serif',
        '--primary-color': portfolio.theme.primaryColor,
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
        <div>{sortedSections.map(renderSection)}</div>
      )}
    </div>
  )
}


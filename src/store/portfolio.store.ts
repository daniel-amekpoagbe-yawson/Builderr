import { create } from 'zustand'
import type { Portfolio, Section, SectionType } from '@/interfaces/Portfolio'
import { portfolioService } from '@/services/portfolio.service'
import { useAuthStore } from '@/store/auth.store'

interface PortfolioStore {
  currentPortfolio: Portfolio | null
  portfolios: Array<Portfolio>
  loading: boolean
  saving: boolean
  autoSaveTimer: NodeJS.Timeout | null
  loadPortfolio: (id: string) => Promise<void>
  loadUserPortfolios: () => Promise<void>
  createPortfolio: (title: string) => Promise<Portfolio>
  updateSection: (sectionId: string, updates: Partial<Section>) => void
  addSection: (type: SectionType) => void
  removeSection: (sectionId: string) => void
  reorderSections: (oldIndex: number, newIndex: number) => void
  updateTheme: (theme: Partial<Portfolio['theme']>) => void
  updateTitle: (title: string) => void
  savePortfolio: () => Promise<void>
  scheduleAutoSave: () => void
  publishPortfolio: () => Promise<string> // returns public URL
  unpublishPortfolio: () => Promise<void>
  exportHTML: () => string
  deletePortfolio: (id: string) => Promise<void>
  duplicatePortfolio: (id: string) => Promise<Portfolio>
}

const defaultTheme: Portfolio['theme'] = {
  mode: 'light',
  primaryColor: '#4f46e5', // indigo-600
  fontFamily: 'inter',
  navbarVariant: 'default',
}

export const usePortfolioStore = create<PortfolioStore>((set, get) => ({
  currentPortfolio: null,
  portfolios: [],
  loading: false,
  saving: false,
  autoSaveTimer: null,

  loadPortfolio: async (id: string) => {
    set({ loading: true })
    try {
      const portfolio = await portfolioService.getPortfolio(id)
      set({ currentPortfolio: portfolio, loading: false })
      get().scheduleAutoSave()
    } catch (error) {
      console.error('Failed to load portfolio:', error)
      set({ loading: false })
      throw error
    }
  },

  loadUserPortfolios: async () => {
    set({ loading: true })
    try {
      const portfolios = await portfolioService.getUserPortfolios()
      set({ portfolios, loading: false })
    } catch (error) {
      console.error('Failed to load portfolios:', error)
      set({ loading: false })
      throw error
    }
  },

  createPortfolio: async (title: string) => {
    const user = useAuthStore.getState().user
    if (!user) throw new Error('User not authenticated')

    const newPortfolio: Portfolio = {
      id: crypto.randomUUID(),
      title,
      userId: user.id,
      theme: { ...defaultTheme },
      sections: [],
    }

    try {
      const saved = await portfolioService.createPortfolio(newPortfolio)
      set((state) => ({
        portfolios: [...state.portfolios, saved],
        currentPortfolio: saved,
      }))
      get().scheduleAutoSave()
      return saved
    } catch (error) {
      console.error('Failed to create portfolio:', error)
      throw error
    }
  },

  updateSection: (sectionId: string, updates: Partial<Section>) => {
    const state = get()
    if (!state.currentPortfolio) return

    const updatedSections = state.currentPortfolio.sections.map((section) =>
      section.id === sectionId ? { ...section, ...updates } : section,
    )

    set({
      currentPortfolio: {
        ...state.currentPortfolio,
        sections: updatedSections,
      },
    })

    get().scheduleAutoSave()
  },

  addSection: (type: SectionType) => {
    const state = get()
    if (!state.currentPortfolio) return

    const newSection: Section = {
      id: crypto.randomUUID(),
      type,
      enabled: true,
      variant: 'A',
      order: state.currentPortfolio.sections.length,
      data: getDefaultSectionData(type),
    }

    set({
      currentPortfolio: {
        ...state.currentPortfolio,
        sections: [...state.currentPortfolio.sections, newSection],
      },
    })

    get().scheduleAutoSave()
  },

  removeSection: (sectionId: string) => {
    const state = get()
    if (!state.currentPortfolio) return

    const updatedSections = state.currentPortfolio.sections
      .filter((s) => s.id !== sectionId)
      .map((s, index) => ({ ...s, order: index }))

    set({
      currentPortfolio: {
        ...state.currentPortfolio,
        sections: updatedSections,
      },
    })

    get().scheduleAutoSave()
  },

  reorderSections: (oldIndex: number, newIndex: number) => {
    const state = get()
    if (!state.currentPortfolio) return

    const sections = [...state.currentPortfolio.sections]
    const [moved] = sections.splice(oldIndex, 1)
    sections.splice(newIndex, 0, moved)

    const reordered = sections.map((s, index) => ({ ...s, order: index }))

    set({
      currentPortfolio: {
        ...state.currentPortfolio,
        sections: reordered,
      },
    })

    get().scheduleAutoSave()
  },

  updateTheme: (theme: Partial<Portfolio['theme']>) => {
    const state = get()
    if (!state.currentPortfolio) return

    set({
      currentPortfolio: {
        ...state.currentPortfolio,
        theme: { ...state.currentPortfolio.theme, ...theme },
      },
    })

    get().scheduleAutoSave()
  },

  updateTitle: (title: string) => {
    const state = get()
    if (!state.currentPortfolio) return

    set({
      currentPortfolio: {
        ...state.currentPortfolio,
        title,
      },
    })

    get().scheduleAutoSave()
  },

  scheduleAutoSave: () => {
    const state = get()
    if (state.autoSaveTimer) {
      clearTimeout(state.autoSaveTimer)
    }

    const timer = setTimeout(() => {
      get().savePortfolio()
    }, 3000) // 3 second debounce

    set({ autoSaveTimer: timer })
  },

  savePortfolio: async () => {
    const state = get()
    if (!state.currentPortfolio) return

    set({ saving: true })
    try {
      const saved = await portfolioService.updatePortfolio(
        state.currentPortfolio,
      )
      set({
        currentPortfolio: saved,
        saving: false,
        portfolios: state.portfolios.map((p) =>
          p.id === saved.id ? saved : p,
        ),
      })
    } catch (error) {
      console.error('Failed to save portfolio:', error)
      set({ saving: false })
      throw error
    }
  },

  publishPortfolio: async () => {
    const state = get()
    if (!state.currentPortfolio) return ''

    try {
      const slug = await portfolioService.publishPortfolio(
        state.currentPortfolio.id,
      )
      const updated = {
        ...state.currentPortfolio,
        slug,
        isPublished: true,
      }
      set({
        currentPortfolio: updated,
        portfolios: state.portfolios.map((p) =>
          p.id === updated.id ? updated : p,
        ),
      })
      return slug
    } catch (error) {
      console.error('Failed to publish portfolio:', error)
      throw error
    }
  },

  unpublishPortfolio: async () => {
    const state = get()
    if (!state.currentPortfolio) return

    try {
      await portfolioService.unpublishPortfolio(state.currentPortfolio.id)
      const updated = {
        ...state.currentPortfolio,
        isPublished: false,
      }
      set({
        currentPortfolio: updated,
        portfolios: state.portfolios.map((p) =>
          p.id === updated.id ? updated : p,
        ),
      })
    } catch (error) {
      console.error('Failed to unpublish portfolio:', error)
      throw error
    }
  },

  exportHTML: () => {
    const state = get()
    if (!state.currentPortfolio) return ''

    const portfolio = state.currentPortfolio
    const sortedSections = [...portfolio.sections]
      .filter((s) => s.enabled)
      .sort((a, b) => a.order - b.order)

    // Generate HTML for each section (simplified - in production, render actual components)
    const sectionsHTML = sortedSections
      .map((section) => {
        // This is a simplified version - in production, you'd render the actual React components to HTML
        return `<section class="section-${section.type}">
          <!-- ${section.type} section variant ${section.variant} -->
          <div class="section-content">
            ${JSON.stringify(section.data, null, 2)}
          </div>
        </section>`
      })
      .join('\n')

    const html = `<!DOCTYPE html>
<html lang="en" data-theme="${portfolio.theme.mode}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${portfolio.title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root {
      --primary-color: ${portfolio.theme.primaryColor};
    }
    body {
      font-family: ${portfolio.theme.fontFamily === 'roboto' ? 'Roboto, sans-serif' : 'Inter, sans-serif'};
      margin: 0;
      padding: 0;
    }
    [data-theme="dark"] {
      background-color: #111827;
      color: #ffffff;
    }
    [data-theme="light"] {
      background-color: #ffffff;
      color: #111827;
    }
    .section-content {
      padding: 2rem;
    }
  </style>
</head>
<body>
  ${sectionsHTML}
  <footer style="background: #f3f4f6; padding: 1rem; text-align: center; font-size: 0.875rem; color: #6b7280;">
    <p>Built with <a href="https://buildrr.com" style="color: ${portfolio.theme.primaryColor}; font-weight: 500;">Buildrr</a></p>
  </footer>
</body>
</html>`

    return html
  },

  deletePortfolio: async (id: string) => {
    try {
      await portfolioService.deletePortfolio(id)
      set((state) => ({
        portfolios: state.portfolios.filter((p) => p.id !== id),
        currentPortfolio:
          state.currentPortfolio?.id === id ? null : state.currentPortfolio,
      }))
    } catch (error) {
      console.error('Failed to delete portfolio:', error)
      throw error
    }
  },

  duplicatePortfolio: async (id: string) => {
    try {
      const original = await portfolioService.getPortfolio(id)
      const duplicated: Portfolio = {
        ...original,
        id: crypto.randomUUID(),
        title: `${original.title} (Copy)`,
        slug: undefined,
        isPublished: false,
      }
      const saved = await portfolioService.createPortfolio(duplicated)
      set((state) => ({
        portfolios: [...state.portfolios, saved],
      }))
      return saved
    } catch (error) {
      console.error('Failed to duplicate portfolio:', error)
      throw error
    }
  },
}))

// Helper function to get default data for each section type
function getDefaultSectionData(type: SectionType): Record<string, any> {
  switch (type) {
    case 'hero':
      return {
        name: 'Your Name',
        title: 'Your Title',
        description: 'A brief description about yourself',
        ctaText: 'Get Started',
        ctaLink: '#',
      }
    case 'projects':
      return {
        projects: [],
      }
    case 'skills':
      return {
        categories: [],
      }
    case 'about':
      return {
        bio: 'Tell your story...',
        highlights: [],
      }
    case 'experience':
      return {
        experiences: [],
      }
    case 'contact':
      return {
        email: '',
        social: {},
      }
    default:
      return {}
  }
}

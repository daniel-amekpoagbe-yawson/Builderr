import { create } from 'zustand'
import type { Portfolio, Section, SectionType } from '@/interfaces/Portfolio'
import { portfolioService } from '@/services/portfolio.service'
import { useAuthStore } from '@/store/auth.store'
import type { PortfolioTemplate } from '@/lib/templates'

// ── Limits ──────────────────────────────────────────────────────────────────
const MAX_PORTFOLIOS = 10
const MAX_SECTIONS_PER_PORTFOLIO = 20

interface PortfolioStore {
  currentPortfolio: Portfolio | null
  portfolios: Array<Portfolio>
  loading: boolean
  saving: boolean
  isDirty: boolean // tracks unsaved changes
  autoSaveTimer: ReturnType<typeof setTimeout> | null
  loadPortfolio: (id: string) => Promise<void>
  loadUserPortfolios: () => Promise<void>
  createPortfolio: (title: string) => Promise<Portfolio>
  createPortfolioFromTemplate: (template: PortfolioTemplate, title: string) => Promise<Portfolio>
  updateSection: (sectionId: string, updates: Partial<Section>) => void
  addSection: (type: SectionType) => void
  duplicateSection: (sectionId: string) => void
  removeSection: (sectionId: string) => void
  reorderSections: (oldIndex: number, newIndex: number) => void
  updateTheme: (theme: Partial<Portfolio['theme']>) => void
  updateTitle: (title: string) => void
  savePortfolio: () => Promise<void>
  scheduleAutoSave: () => void
  cancelAutoSave: () => void
  publishPortfolio: () => Promise<string> // returns public URL
  unpublishPortfolio: () => Promise<void>
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
  isDirty: false,
  autoSaveTimer: null,

  loadPortfolio: async (id: string) => {
    set({ loading: true })
    try {
      const portfolio = await portfolioService.getPortfolio(id)
      set({ currentPortfolio: portfolio, loading: false, isDirty: false })
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

    // Enforce portfolio limit
    const state = get()
    if (state.portfolios.length >= MAX_PORTFOLIOS) {
      throw new Error(`You can create up to ${MAX_PORTFOLIOS} portfolios. Please delete an existing one first.`)
    }

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
        isDirty: false,
      }))
      return saved
    } catch (error) {
      console.error('Failed to create portfolio:', error)
      throw error
    }
  },

  createPortfolioFromTemplate: async (template: PortfolioTemplate, title: string) => {
    const user = useAuthStore.getState().user
    if (!user) throw new Error('User not authenticated')

    // Enforce portfolio limit
    const state = get()
    if (state.portfolios.length >= MAX_PORTFOLIOS) {
      throw new Error(`You can create up to ${MAX_PORTFOLIOS} portfolios. Please delete an existing one first.`)
    }

    // Create portfolio with template's theme and sections
    const newPortfolio: Portfolio = {
      id: crypto.randomUUID(),
      title,
      userId: user.id,
      theme: { ...template.theme },
      sections: template.sections.map((section, index) => ({
        ...section,
        id: crypto.randomUUID(),
        order: index,
      })),
      templateId: template.id,
    }

    try {
      const saved = await portfolioService.createPortfolio(newPortfolio)
      set((state) => ({
        portfolios: [...state.portfolios, saved],
        currentPortfolio: saved,
        isDirty: false,
      }))
      return saved
    } catch (error) {
      console.error('Failed to create portfolio from template:', error)
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
      isDirty: true,
    })

    get().scheduleAutoSave()
  },

  addSection: (type: SectionType) => {
    const state = get()
    if (!state.currentPortfolio) return

    // Enforce section limit
    if (state.currentPortfolio.sections.length >= MAX_SECTIONS_PER_PORTFOLIO) {
      throw new Error(`Maximum ${MAX_SECTIONS_PER_PORTFOLIO} sections per portfolio.`)
    }

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
      isDirty: true,
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
      isDirty: true,
    })

    get().scheduleAutoSave()
  },

  duplicateSection: (sectionId: string) => {
    const state = get()
    if (!state.currentPortfolio) return

    // Enforce section limit
    if (state.currentPortfolio.sections.length >= MAX_SECTIONS_PER_PORTFOLIO) {
      throw new Error(`Maximum ${MAX_SECTIONS_PER_PORTFOLIO} sections per portfolio.`)
    }

    const sectionToDuplicate = state.currentPortfolio.sections.find((s) => s.id === sectionId)
    if (!sectionToDuplicate) return

    const newSection = {
      ...sectionToDuplicate,
      id: crypto.randomUUID(),
      order: state.currentPortfolio.sections.length,
    }

    set({
      currentPortfolio: {
        ...state.currentPortfolio,
        sections: [...state.currentPortfolio.sections, newSection],
      },
      isDirty: true,
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
      isDirty: true,
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
      isDirty: true,
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
      isDirty: true,
    })

    get().scheduleAutoSave()
  },

  scheduleAutoSave: () => {
    const state = get()
    if (state.autoSaveTimer) {
      clearTimeout(state.autoSaveTimer)
    }

    const timer = setTimeout(() => {
      // Only save if there are actual unsaved changes
      if (get().isDirty) {
        get().savePortfolio()
      }
    }, 5000) // 5 second debounce (increased from 3s to reduce API load)

    set({ autoSaveTimer: timer })
  },

  cancelAutoSave: () => {
    const state = get()
    if (state.autoSaveTimer) {
      clearTimeout(state.autoSaveTimer)
      set({ autoSaveTimer: null })
    }
  },

  savePortfolio: async () => {
    const state = get()
    if (!state.currentPortfolio || !state.isDirty) return

    set({ saving: true })
    try {
      const saved = await portfolioService.updatePortfolio(
        state.currentPortfolio,
      )
      set({
        currentPortfolio: saved,
        saving: false,
        isDirty: false,
        portfolios: state.portfolios.map((p) =>
          p.id === saved.id ? saved : p,
        ),
      })
    } catch (error) {
      console.error('Failed to save portfolio:', error)
      set({ saving: false })
      // Don't clear isDirty on failure — keep retrying on next schedule
      throw error
    }
  },

  publishPortfolio: async () => {
    const state = get()
    if (!state.currentPortfolio) return ''

    // Save any pending changes first
    if (state.isDirty) {
      await get().savePortfolio()
    }

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
    // Enforce portfolio limit
    const state = get()
    if (state.portfolios.length >= MAX_PORTFOLIOS) {
      throw new Error(`You can create up to ${MAX_PORTFOLIOS} portfolios. Please delete an existing one first.`)
    }

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
    case 'gallery':
      return {
        title: 'Gallery',
        description: '',
        layout: 'masonry',
        categories: ['All'],
        images: [],
      }
    default:
      return {}
  }
}

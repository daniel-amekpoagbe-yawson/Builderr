import { create } from 'zustand'
import type { Portfolio, Section, SectionType } from '@/interfaces/Portfolio'
import { portfolioService } from '@/services/portfolio.service'
import { useAuthStore } from '@/store/auth.store'
import type { PortfolioTemplate } from '@/lib/templates'

// ── Limits ──────────────────────────────────────────────────────────────────
const MAX_PORTFOLIOS = 10
const MAX_SECTIONS_PER_PORTFOLIO = 20
const MAX_HISTORY = 50

interface PortfolioStore {
  currentPortfolio: Portfolio | null
  portfolios: Array<Portfolio>
  loading: boolean
  saving: boolean
  isDirty: boolean
  lastSavedAt: number | null // timestamp for "Saved ✓" flash
  autoSaveTimer: ReturnType<typeof setTimeout> | null

  // ── History (Undo/Redo) ─────────────────────────────────────────────────
  _history: Portfolio[]
  _historyIndex: number
  _pushHistory: () => void
  undo: () => void
  redo: () => void
  canUndo: () => boolean
  canRedo: () => boolean

  // ── Actions ─────────────────────────────────────────────────────────────
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
  publishPortfolio: () => Promise<string>
  unpublishPortfolio: () => Promise<void>
  deletePortfolio: (id: string) => Promise<void>
  duplicatePortfolio: (id: string) => Promise<Portfolio>
}

const defaultTheme: Portfolio['theme'] = {
  mode: 'light',
  primaryColor: '#4f46e5',
  fontFamily: 'inter',
  navbarVariant: 'default',
}

export const usePortfolioStore = create<PortfolioStore>((set, get) => ({
  currentPortfolio: null,
  portfolios: [],
  loading: false,
  saving: false,
  isDirty: false,
  lastSavedAt: null,
  autoSaveTimer: null,

  // ── History State ───────────────────────────────────────────────────────
  _history: [],
  _historyIndex: -1,

  /**
   * Snapshots the current portfolio into the history stack (called before every mutation).
   * Truncates any "redo" entries beyond the current pointer.
   */
  _pushHistory: () => {
    const state = get()
    if (!state.currentPortfolio) return

    const snapshot = JSON.parse(JSON.stringify(state.currentPortfolio))
    const newHistory = state._history.slice(0, state._historyIndex + 1)
    newHistory.push(snapshot)

    // Keep history bounded
    if (newHistory.length > MAX_HISTORY) {
      newHistory.shift()
    }

    set({
      _history: newHistory,
      _historyIndex: newHistory.length - 1,
    })
  },

  undo: () => {
    const state = get()
    if (state._historyIndex < 0 || !state.currentPortfolio) return

    // If we're at the end of history, save current state first so redo works
    if (state._historyIndex === state._history.length - 1) {
      const current = JSON.parse(JSON.stringify(state.currentPortfolio))
      const newHistory = [...state._history, current]
      const restoredPortfolio = state._history[state._historyIndex]
      set({
        currentPortfolio: restoredPortfolio,
        _history: newHistory,
        _historyIndex: state._historyIndex - 1,
        isDirty: true,
      })
    } else {
      const restoredPortfolio = state._history[state._historyIndex]
      set({
        currentPortfolio: restoredPortfolio,
        _historyIndex: state._historyIndex - 1,
        isDirty: true,
      })
    }
    get().scheduleAutoSave()
  },

  redo: () => {
    const state = get()
    if (state._historyIndex >= state._history.length - 1) return

    const nextIndex = state._historyIndex + 2
    if (nextIndex >= state._history.length) return

    set({
      currentPortfolio: state._history[nextIndex],
      _historyIndex: state._historyIndex + 1,
      isDirty: true,
    })
    get().scheduleAutoSave()
  },

  canUndo: () => {
    const state = get()
    return state._historyIndex >= 0
  },

  canRedo: () => {
    const state = get()
    return state._historyIndex < state._history.length - 2
  },

  // ── Data Loading ────────────────────────────────────────────────────────
  loadPortfolio: async (id: string) => {
    set({ loading: true })
    try {
      const portfolio = await portfolioService.getPortfolio(id)
      set({
        currentPortfolio: portfolio,
        loading: false,
        isDirty: false,
        _history: [],
        _historyIndex: -1,
      })
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

    const state = get()
    if (state.portfolios.length >= MAX_PORTFOLIOS) {
      throw new Error(`You can create up to ${MAX_PORTFOLIOS} portfolios. Please delete an existing one first.`)
    }

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

  // ── Section Mutations (with history) ────────────────────────────────────
  updateSection: (sectionId: string, updates: Partial<Section>) => {
    const state = get()
    if (!state.currentPortfolio) return

    state._pushHistory()

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

    if (state.currentPortfolio.sections.length >= MAX_SECTIONS_PER_PORTFOLIO) {
      throw new Error(`Maximum ${MAX_SECTIONS_PER_PORTFOLIO} sections per portfolio.`)
    }

    state._pushHistory()

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

    state._pushHistory()

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

    if (state.currentPortfolio.sections.length >= MAX_SECTIONS_PER_PORTFOLIO) {
      throw new Error(`Maximum ${MAX_SECTIONS_PER_PORTFOLIO} sections per portfolio.`)
    }

    state._pushHistory()

    const sectionToDuplicate = state.currentPortfolio.sections.find((s) => s.id === sectionId)
    if (!sectionToDuplicate) return

    const newSection = {
      ...JSON.parse(JSON.stringify(sectionToDuplicate)),
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

    state._pushHistory()

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

    state._pushHistory()

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

    state._pushHistory()

    set({
      currentPortfolio: {
        ...state.currentPortfolio,
        title,
      },
      isDirty: true,
    })

    get().scheduleAutoSave()
  },

  // ── Auto-Save ───────────────────────────────────────────────────────────
  scheduleAutoSave: () => {
    const state = get()
    if (state.autoSaveTimer) {
      clearTimeout(state.autoSaveTimer)
    }

    const timer = setTimeout(() => {
      if (get().isDirty) {
        get().savePortfolio()
      }
    }, 5000)

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
        lastSavedAt: Date.now(),
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

  // ── Publish / Unpublish ─────────────────────────────────────────────────
  publishPortfolio: async () => {
    const state = get()
    if (!state.currentPortfolio) return ''

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

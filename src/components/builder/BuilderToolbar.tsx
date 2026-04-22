import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { ArrowLeft, Eye, Globe, Palette, Save, Undo2, Redo2, Check } from 'lucide-react'
import type { Portfolio } from '@/interfaces/Portfolio'
import { usePortfolioStore } from '@/store/portfolio.store'

interface BuilderToolbarProps {
  portfolio: Portfolio
  saving: boolean
  isDirty: boolean
  lastSavedAt: number | null
  onBack: () => void
  onPreview: () => void
  onThemeSettings: () => void
  onPublish: () => void
  isPublished: boolean
}

export function BuilderToolbar({
  portfolio,
  saving,
  isDirty,
  lastSavedAt,
  onBack,
  onPreview,
  onThemeSettings,
  onPublish,
  isPublished,
}: BuilderToolbarProps) {
  const { undo, redo, canUndo, canRedo } = usePortfolioStore()
  const [showSavedFlash, setShowSavedFlash] = useState(false)

  // Flash "Saved ✓" briefly after each successful save
  useEffect(() => {
    if (lastSavedAt && !saving) {
      setShowSavedFlash(true)
      const timer = setTimeout(() => setShowSavedFlash(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [lastSavedAt, saving])

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Dashboard</span>
        </button>
        <div className="h-6 w-px bg-gray-300"></div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-gray-900">{portfolio.title}</h1>
          {/* Unsaved changes indicator */}
          {isDirty && (
            <span className="relative flex h-2.5 w-2.5" title="Unsaved changes">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
          )}
        </div>
        {/* Save status indicator */}
        <div className="flex items-center gap-2 text-sm min-w-[80px]">
          {saving ? (
            <span className="flex items-center gap-1.5 text-gray-500">
              <Save className="w-3.5 h-3.5 animate-spin" />
              Saving…
            </span>
          ) : showSavedFlash ? (
            <span className="flex items-center gap-1.5 text-green-600 animate-in fade-in duration-200">
              <Check className="w-3.5 h-3.5" />
              Saved
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Undo / Redo */}
        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={undo}
            disabled={!canUndo()}
            className="flex items-center gap-1 px-2.5 py-2 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <div className="w-px h-5 bg-gray-200" />
          <button
            onClick={redo}
            disabled={!canRedo()}
            className="flex items-center gap-1 px-2.5 py-2 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={onThemeSettings}
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          title="Theme Settings"
        >
          <Palette className="w-4 h-4" />
          Theme
        </button>
        <button
          onClick={onPreview}
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Eye className="w-4 h-4" />
          Preview
        </button>
        <button
          onClick={() => {
            toast(`Are you sure you want to ${isPublished ? 'unpublish' : 'publish'} this portfolio?`, {
              action: {
                label: isPublished ? 'Unpublish' : 'Publish',
                onClick: onPublish,
              },
            })
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isPublished
              ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          <Globe className="w-4 h-4" />
          {isPublished ? 'Unpublish' : 'Publish'}
        </button>
      </div>
    </div>
  )
}

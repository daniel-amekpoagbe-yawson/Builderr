import { toast } from 'sonner'
import { ArrowLeft, Eye, Globe, Palette, Save } from 'lucide-react'
import type { Portfolio } from '@/interfaces/Portfolio'

interface BuilderToolbarProps {
  portfolio: Portfolio
  saving: boolean
  onBack: () => void
  onPreview: () => void
  onThemeSettings: () => void
  onPublish: () => void
  // onExport: () => void
  isPublished: boolean
}

export function BuilderToolbar({
  portfolio,
  saving,
  onBack,
  onPreview,
  onThemeSettings,
  onPublish,
  // onExport,
  isPublished,
}: BuilderToolbarProps) {
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
        <h1 className="text-lg font-semibold text-gray-900">{portfolio.title}</h1>
        {saving && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Save className="w-4 h-4 animate-spin" />
            <span>Saving...</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
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
        {/* <button
          onClick={onExport}
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export HTML
        </button> */}
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


import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { usePortfolioStore } from '@/store/portfolio.store'
import type { SectionType } from '@/interfaces/Portfolio'
import { SectionSidebar } from './builder/SectionSidebar'
import { PreviewArea } from './builder/PreviewArea'
import { ConfigPanel } from './builder/ConfigPanel'
import { BuilderToolbar } from './builder/BuilderToolbar'
import { ThemeConfig } from './builder/ThemeConfig'
import { toast } from 'sonner'
import { X } from 'lucide-react'

export function BuilderInterface() {
  const navigate = useNavigate()
  const { currentPortfolio, saving, publishPortfolio, unpublishPortfolio, exportHTML } =
    usePortfolioStore()
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null)
  const [previewMode, setPreviewMode] = useState(false)
  const [showPublishDialog, setShowPublishDialog] = useState(false)

  if (!currentPortfolio) return null

  const selectedSection = currentPortfolio.sections.find((s) => s.id === selectedSectionId)

  const handlePublish = async () => {
    try {
      await publishPortfolio()
      setShowPublishDialog(true)
      toast.success('Portfolio published!')
    } catch (error: any) {
      toast.error(error.message || 'Failed to publish portfolio')
    }
  }

  const handleUnpublish = async () => {
    try {
      await unpublishPortfolio()
      toast.success('Portfolio unpublished')
    } catch (error: any) {
      toast.error(error.message || 'Failed to unpublish portfolio')
    }
  }

  const handleExport = () => {
    const html = exportHTML()
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${currentPortfolio.title.replace(/\s+/g, '-')}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Portfolio exported!')
  }

  if (previewMode) {
    return (
      <div className="h-screen flex flex-col bg-gray-900">
        <div className="bg-gray-800 text-white px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPreviewMode(false)}
              className="flex items-center gap-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
            >
              <X className="w-4 h-4" />
              Exit Preview
            </button>
            <span className="text-sm text-gray-400">Preview Mode</span>
          </div>
        </div>
        <div className="flex-1 overflow-auto bg-white">
          <PreviewArea portfolio={currentPortfolio} isPreviewMode={true} />
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Toolbar */}
      <BuilderToolbar
        portfolio={currentPortfolio}
        saving={saving}
        onBack={() => navigate({ to: '/dashboard' })}
        onPreview={() => setPreviewMode(true)}
        onPublish={currentPortfolio.isPublished ? handleUnpublish : handlePublish}
        onExport={handleExport}
        isPublished={currentPortfolio.isPublished || false}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Section Selector */}
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <SectionSidebar
            sections={currentPortfolio.sections}
            selectedSectionId={selectedSectionId}
            onSelectSection={setSelectedSectionId}
            onAddSection={(type: SectionType) => {
              usePortfolioStore.getState().addSection(type)
              toast.success('Section added!')
            }}
          />
        </div>

        {/* Center - Preview Area */}
        <div className="flex-1 overflow-y-auto bg-gray-100">
          <PreviewArea
            portfolio={currentPortfolio}
            selectedSectionId={selectedSectionId}
            onSelectSection={setSelectedSectionId}
            isPreviewMode={false}
          />
        </div>

        {/* Right Sidebar - Configuration Panel */}
        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          {selectedSection ? (
            <ConfigPanel
              section={selectedSection}
              portfolio={currentPortfolio}
              onUpdate={(updates) => {
                usePortfolioStore.getState().updateSection(selectedSection.id, updates)
              }}
              onDelete={() => {
                usePortfolioStore.getState().removeSection(selectedSection.id)
                setSelectedSectionId(null)
                toast.success('Section removed')
              }}
            />
          ) : (
            <div className="p-6">
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Theme Settings</h3>
                <ThemeConfig
                  theme={currentPortfolio.theme}
                  onUpdate={(theme) => {
                    usePortfolioStore.getState().updateTheme(theme)
                  }}
                />
              </div>
              <div className="pt-6 border-t border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Title</label>
                <input
                  type="text"
                  value={currentPortfolio.title}
                  onChange={(e) => {
                    usePortfolioStore.getState().updateTitle(e.target.value)
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div className="mt-6 text-center text-gray-500 text-sm">
                <p>Select a section to configure</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Publish Success Dialog */}
      {showPublishDialog && currentPortfolio.slug && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Portfolio Published!</h3>
            <p className="text-gray-600 mb-4">
              Your portfolio is now live at:
            </p>
            <div className="bg-gray-50 p-3 rounded mb-4">
              <code className="text-sm text-indigo-600 break-all">
                {window.location.origin}/site/{currentPortfolio.slug}
              </code>
            </div>
            <div className="flex gap-3">
              <a
                href={`/site/${currentPortfolio.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-center transition-colors"
              >
                View Live Site
              </a>
              <button
                onClick={() => setShowPublishDialog(false)}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


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
  const { currentPortfolio, saving, publishPortfolio, unpublishPortfolio } =
    usePortfolioStore()
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null)
  const [previewMode, setPreviewMode] = useState(false)
  const [showPublishDialog, setShowPublishDialog] = useState(false)
  const [showThemeSettings, setShowThemeSettings] = useState(false)

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

  // const handleExport = () => {
  //   const html = exportHTML()
  //   const blob = new Blob([html], { type: 'text/html' })
  //   const url = URL.createObjectURL(blob)
  //   const a = document.createElement('a')
  //   a.href = url
  //   a.download = `${currentPortfolio.title.replace(/\s+/g, '-')}.html`
  //   document.body.appendChild(a)
  //   a.click()
  //   document.body.removeChild(a)
  //   URL.revokeObjectURL(url)
  //   toast.success('Portfolio exported!')
  // }

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

  // State to control the visibility of the left sidebar (Section Selector)
  // When true, the sidebar is hidden to give more space to the preview area
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Toolbar */}
      <BuilderToolbar
        portfolio={currentPortfolio}
        saving={saving}
        onBack={() => navigate({ to: '/dashboard' })}
        onPreview={() => setPreviewMode(true)}
        onThemeSettings={() => {
          setShowThemeSettings(true)
          setSelectedSectionId(null)
        }}
        onPublish={currentPortfolio.isPublished ? handleUnpublish : handlePublish}
        // onExport={handleExport}
        isPublished={currentPortfolio.isPublished || false}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar - Section Selector */}
        {/* We use dynamic classes to control width and transitions for a smooth collapse effect */}
        <div 
          className={`
            ${isSidebarCollapsed ? 'w-0 border-none' : 'w-64 border-r'} 
            bg-white border-gray-200 overflow-y-auto transition-all duration-300 ease-in-out relative
          `}
        >
          {/* Prevent content from wrapping when collapsing by using min-w-max or hiding overflow */}
          <div className={`${isSidebarCollapsed ? 'hidden' : 'block'}`}>
             <SectionSidebar
              sections={currentPortfolio.sections}
              selectedSectionId={selectedSectionId}
              onSelectSection={(id) => {
                setSelectedSectionId(id)
                setShowThemeSettings(false)
              }}
              onAddSection={(type: SectionType) => {
                usePortfolioStore.getState().addSection(type)
                toast.success('Section added!')
              }}
            />
          </div>
        </div>

        {/* 
          Collapsible Toggle Button 
          This button floats absolutely to the left of the preview area.
          It allows the user to toggle the sidebar visibility.
        */}
        <div className={`absolute top-1/2 -translate-y-1/2 z-10 transition-all duration-300 ${isSidebarCollapsed ? 'left-0' : 'left-64'}`}>
           <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="bg-white border border-gray-200 p-1.5 rounded-r-lg shadow-md hover:bg-gray-50 text-gray-600 focus:outline-none flex items-center justify-center transform hover:scale-105 transition-all"
            title={isSidebarCollapsed ? "Show Sidebar" : "Hide Sidebar"}
          >
            {/* Rotate icon based on state */}
            {isSidebarCollapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            )}
          </button>
        </div>

        {/* Center - Preview Area */}
        <div className="flex-1 overflow-y-auto bg-gray-100">
          <PreviewArea
            portfolio={currentPortfolio}
            selectedSectionId={selectedSectionId}
            onSelectSection={(id) => {
              setSelectedSectionId(id)
              setShowThemeSettings(false)
            }}
            isPreviewMode={false}
          />
        </div>

        {/* Right Sidebar - Configuration Panel */}
        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          {showThemeSettings || !selectedSection ? (
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Theme Settings</h3>
                  {selectedSection && (
                    <button
                      onClick={() => setShowThemeSettings(false)}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Back to Section
                    </button>
                  )}
                </div>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              {!selectedSection && (
                <div className="mt-6 text-center text-gray-500 text-sm">
                  <p>Select a section to configure</p>
                </div>
              )}
            </div>
          ) : (
            <ConfigPanel
              section={selectedSection}
              portfolio={currentPortfolio}
              onUpdate={(updates) => {
                usePortfolioStore.getState().updateSection(selectedSection.id, updates)
              }}
              onDelete={() => {
                usePortfolioStore.getState().removeSection(selectedSection.id)
                setSelectedSectionId(null)
                setShowThemeSettings(false)
                toast.success('Section removed')
              }}
            />
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
                onClick={() => {
                  // Ensure it opens in a new tab
                  window.open(`/site/${currentPortfolio.slug}`, '_blank', 'noopener,noreferrer')
                }}
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


import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { AuthGuard } from '@/app/auth-guard'
import { usePortfolioStore } from '@/store/portfolio.store'
import { useAuthStore } from '@/store/auth.store'
import { TemplateSelector } from '@/components/TemplateSelector'
import type { PortfolioTemplate } from '@/lib/templates'
import { toast } from 'sonner'
import { Plus, Edit, Trash2, Copy, ExternalLink, LogOut, Sparkles, Code2, Palette, Camera } from 'lucide-react'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { ProjectName } from '@/constant'
import Spinner from '@/components/Spinner'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

// Template badge component for portfolio cards
function TemplateBadge({ templateId }: { templateId?: string }) {
  if (!templateId || templateId === 'blank') return null

  const templateConfig: Record<string, { icon: React.ElementType; label: string; className: string }> = {
    developer: { icon: Code2, label: 'Developer', className: 'bg-blue-100 text-blue-700' },
    designer: { icon: Palette, label: 'Designer', className: 'bg-pink-100 text-pink-700' },
    photographer: { icon: Camera, label: 'Photographer', className: 'bg-zinc-100 text-zinc-700' },
  }

  const config = templateConfig[templateId]
  if (!config) return null

  const Icon = config.icon

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${config.className}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  )
}

function DashboardPage() {
  const navigate = useNavigate()
  const { portfolios, loading, loadUserPortfolios, deletePortfolio, duplicatePortfolio, createPortfolioFromTemplate } =
    usePortfolioStore()
  const { signOut, user } = useAuthStore()
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; title: string } | null>(null)

  useEffect(() => {
    loadUserPortfolios()
  }, [loadUserPortfolios])

  const handleTemplateSelect = async (template: PortfolioTemplate, title: string) => {
    try {
      const newPortfolio = await createPortfolioFromTemplate(template, title)
      setShowTemplateSelector(false)
      navigate({ to: '/builder/$portfolioId', params: { portfolioId: newPortfolio.id } })
      toast.success(`Portfolio created from ${template.name} template!`)
    } catch (error: any) {
      toast.error(error.message || 'Failed to create portfolio')
    }
  }

  const handleEdit = (id: string) => {
    navigate({ to: '/builder/$portfolioId', params: { portfolioId: id } })
  }

  const handleDelete = (id: string, title: string) => {
    setDeleteConfirm({ id, title })
  }

  const confirmDelete = async () => {
    if (!deleteConfirm) return

    try {
      await deletePortfolio(deleteConfirm.id)
      toast.success('Portfolio deleted')
      setDeleteConfirm(null)
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete portfolio')
    }
  }

  const handleDuplicate = async (id: string) => {
    try {
      const duplicated = await duplicatePortfolio(id)
      toast.success('Portfolio duplicated!')
      navigate({ to: '/builder/$portfolioId', params: { portfolioId: duplicated.id } })
    } catch (error: any) {
      toast.error(error.message || 'Failed to duplicate portfolio')
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate({ to: '/' })
      toast.success('Signed out successfully')
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign out')
    }
  }

  const getPublicUrl = (slug?: string) => {
    if (!slug) return null
    return `${window.location.origin}/site/${slug}`
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{ProjectName}</h1>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowTemplateSelector(true)}
                  className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl hover:bg-gray-900 transition-all"
                >
                  <Plus className="w-5 h-5" />
                  New Portfolio
                </button>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">My Portfolios</h2>
            <p className="text-gray-600 mt-1">Create and manage your professional portfolios</p>
          </div>

          {loading ? (
       <Spinner/>
          ) : portfolios.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Create Your First Portfolio
                </h2>
                <p className="text-gray-600 mb-8">
                  Choose from professionally designed templates for developers, designers, photographers, or start from scratch.
                </p>
                <button
                  onClick={() => setShowTemplateSelector(true)}
                  className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-900 transition-all text-lg font-medium"
                >
                  <Plus className="w-6 h-6" />
                  Choose a Template
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolios.map((portfolio) => (
                <div
                  key={portfolio.id}
                  className="group bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-gray-400 transition-all duration-300 overflow-hidden"
                >
                  {/* Preview Header */}
                  <div
                    className="h-32 relative"
                    style={{
                      background: portfolio.theme.mode === 'dark'
                        ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
                        : `linear-gradient(135deg, ${portfolio.theme.primaryColor}22 0%, ${portfolio.theme.primaryColor}44 100%)`,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: portfolio.theme.primaryColor }}
                      >
                        <span className="text-white text-xl font-bold">
                          {portfolio.title.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    {/* Status badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <TemplateBadge templateId={portfolio.templateId} />
                    </div>
                    {portfolio.isPublished && (
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                          Live
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                      {portfolio.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                      <span>{portfolio.sections.length} section{portfolio.sections.length !== 1 ? 's' : ''}</span>
                      {portfolio.updatedAt && (
                        <>
                          <span className="w-1 h-1 bg-gray-300 rounded-full" />
                          <span>Updated {new Date(portfolio.updatedAt).toLocaleDateString()}</span>
                        </>
                      )}
                    </div>

                    {portfolio.isPublished && portfolio.slug && (
                      <a
                        href={getPublicUrl(portfolio.slug) || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-black hover:text-gray-700 text-sm font-medium mb-4 group/link"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="group-hover/link:underline">View Live Site</span>
                      </a>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => handleEdit(portfolio.id)}
                        className="flex-1 flex items-center justify-center gap-2 bg-black text-white px-4 py-2.5 rounded-xl hover:bg-gray-900 transition-colors text-sm font-medium"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDuplicate(portfolio.id)}
                        className="flex items-center justify-center bg-gray-100 text-gray-700 px-3 py-2.5 rounded-xl hover:bg-gray-200 transition-colors"
                        title="Duplicate"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(portfolio.id, portfolio.title)}
                        className="flex items-center justify-center bg-red-50 text-red-600 px-3 py-2.5 rounded-xl hover:bg-red-100 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add New Card */}
              <button
                onClick={() => setShowTemplateSelector(true)}
                className="group bg-white rounded-2xl border-2 border-dashed border-gray-300 hover:border-black hover:bg-gray-50 transition-all duration-300 p-6 min-h-[280px] flex flex-col items-center justify-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-gray-100 group-hover:bg-black flex items-center justify-center mb-4 transition-colors">
                  <Plus className="w-7 h-7 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <span className="text-gray-600 group-hover:text-black font-medium transition-colors">
                  Create New Portfolio
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Template Selector Modal */}
        <TemplateSelector
          isOpen={showTemplateSelector}
          onClose={() => setShowTemplateSelector(false)}
          onSelect={handleTemplateSelect}
        />

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          open={!!deleteConfirm}
          title="Delete Portfolio"
          message={`Are you sure you want to delete "${deleteConfirm?.title}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          variant="destructive"
          onConfirm={confirmDelete}
          onCancel={() => setDeleteConfirm(null)}
        />
      </div>
    </AuthGuard>
  )
}

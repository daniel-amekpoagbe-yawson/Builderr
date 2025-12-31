import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { AuthGuard } from '@/app/auth-guard'
import { usePortfolioStore } from '@/store/portfolio.store'
import { useAuthStore } from '@/store/auth.store'
import { toast } from 'sonner'
import { Plus, Edit, Trash2, Copy, ExternalLink, LogOut } from 'lucide-react'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  const navigate = useNavigate()
  const { portfolios, loading, loadUserPortfolios, deletePortfolio, duplicatePortfolio } =
    usePortfolioStore()
  const { signOut, user } = useAuthStore()

  useEffect(() => {
    loadUserPortfolios()
  }, [loadUserPortfolios])

  const handleCreateNew = async () => {
    try {
      const newPortfolio = await usePortfolioStore.getState().createPortfolio('New Portfolio')
      navigate({ to: '/builder/$portfolioId', params: { portfolioId: newPortfolio.id } })
      toast.success('Portfolio created!')
    } catch (error: any) {
      toast.error(error.message || 'Failed to create portfolio')
    }
  }

  const handleEdit = (id: string) => {
    navigate({ to: '/builder/$portfolioId', params: { portfolioId: id } })
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return
    }

    try {
      await deletePortfolio(id)
      toast.success('Portfolio deleted')
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
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Portfolios</h1>
              <p className="text-gray-600 mt-1">Welcome back, {user?.email}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCreateNew}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Create New Portfolio
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : portfolios.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  No portfolios yet
                </h2>
                <p className="text-gray-600 mb-6">
                  Get started by creating your first portfolio
                </p>
                <button
                  onClick={handleCreateNew}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Create Your First Portfolio
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolios.map((portfolio) => (
                <div
                  key={portfolio.id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{portfolio.title}</h3>
                    {portfolio.isPublished && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                        Published
                      </span>
                    )}
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    <p>
                      {portfolio.sections.length} section{portfolio.sections.length !== 1 ? 's' : ''}
                    </p>
                    {portfolio.updatedAt && (
                      <p>Updated {new Date(portfolio.updatedAt).toLocaleDateString()}</p>
                    )}
                  </div>

                  {portfolio.isPublished && portfolio.slug && (
                    <div className="mb-4">
                      <a
                        href={getPublicUrl(portfolio.slug) || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-700 text-sm flex items-center gap-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Live Site
                      </a>
                    </div>
                  )}

                  <div className="flex gap-2 pt-4 border-t">
                    <button
                      onClick={() => handleEdit(portfolio.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded hover:bg-indigo-700 transition-colors text-sm"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDuplicate(portfolio.id)}
                      className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded hover:bg-gray-200 transition-colors text-sm"
                      title="Duplicate"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(portfolio.id, portfolio.title)}
                      className="flex items-center justify-center gap-2 bg-red-100 text-red-700 px-3 py-2 rounded hover:bg-red-200 transition-colors text-sm"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}

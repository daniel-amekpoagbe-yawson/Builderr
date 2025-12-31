import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { AuthGuard } from '@/app/auth-guard'
import { usePortfolioStore } from '@/store/portfolio.store'
import { BuilderInterface } from '@/components/BuilderInterface'

export const Route = createFileRoute('/builder/$portfolioId')({
  component: BuilderPage,
})

function BuilderPage() {
  const { portfolioId } = Route.useParams()
  const { loadPortfolio, currentPortfolio, loading } = usePortfolioStore()
  const navigate = useNavigate()

  useEffect(() => {
    loadPortfolio(portfolioId).catch((error) => {
      console.error('Failed to load portfolio:', error)
      navigate({ to: '/dashboard' })
    })
  }, [portfolioId, loadPortfolio, navigate])

  if (loading) {
    return (
      <AuthGuard>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading portfolio...</p>
          </div>
        </div>
      </AuthGuard>
    )
  }

  if (!currentPortfolio) {
    return (
      <AuthGuard>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-gray-600">Portfolio not found</p>
            <button
              onClick={() => navigate({ to: '/dashboard' })}
              className="mt-4 text-indigo-600 hover:text-indigo-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <BuilderInterface />
    </AuthGuard>
  )
}

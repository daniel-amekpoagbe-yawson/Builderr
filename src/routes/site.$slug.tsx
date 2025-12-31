import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { portfolioService } from '@/services/portfolio.service'
import type { Portfolio } from '@/interfaces/Portfolio'
import { PreviewArea } from '@/components/builder/PreviewArea'

export const Route = createFileRoute('/site/$slug')({
  component: PublicSitePage,
})

function PublicSitePage() {
  const { slug } = Route.useParams()
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const data = await portfolioService.getPortfolioBySlug(slug)
        if (!data) {
          setError('Portfolio not found')
        } else {
          setPortfolio(data)
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load portfolio')
      } finally {
        setLoading(false)
      }
    }

    loadPortfolio()
  }, [slug])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  if (error || !portfolio) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Portfolio Not Found</h1>
          <p className="text-gray-600">{error || 'This portfolio does not exist or is not published.'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <PreviewArea portfolio={portfolio} isPreviewMode={true} />
      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
        <p>
          Built with{' '}
          <a href="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Buildrr
          </a>
        </p>
      </footer>
    </div>
  )
}

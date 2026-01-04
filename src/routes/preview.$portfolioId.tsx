import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { portfolioService } from '@/services/portfolio.service'
import type { Portfolio } from '@/interfaces/Portfolio'
import { PreviewArea } from '@/components/builder/PreviewArea'
import SpinerPreview from '@/components/SpinnerPreview'

export const Route = createFileRoute('/preview/$portfolioId')({
  component: PreviewPage,
})

function PreviewPage() {
  const { portfolioId } = Route.useParams()
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const data = await portfolioService.getPortfolio(portfolioId)
        setPortfolio(data)
      } catch (err: any) {
        setError(err.message || 'Failed to load portfolio')
      } finally {
        setLoading(false)
      }
    }

    loadPortfolio()
  }, [portfolioId])

  if (loading) {
    return (
     <SpinerPreview/>
    )
  }

  if (error || !portfolio) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Preview Error</h1>
          <p className="text-gray-600">{error || 'Portfolio not found'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <PreviewArea portfolio={portfolio} isPreviewMode={true} />
    </div>
  )
}

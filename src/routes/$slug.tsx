import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { portfolioService } from '@/services/portfolio.service'
import type { Portfolio } from '@/interfaces/Portfolio'
import { PreviewArea } from '@/components/builder/PreviewArea'
import SpinnerMini from '@/components/SpinnerMini'

export const Route = createFileRoute('/$slug')({
  component: PublicSitePage,
})

/**
 * Updates document meta tags dynamically for SEO on public portfolio pages.
 * Since this is a client-side SPA, search engines using JS rendering will pick these up.
 */
function setPortfolioMeta(portfolio: Portfolio) {
  // Set page title
  document.title = `${portfolio.title} | Builderr`

  // Find the hero section to extract description
  const heroSection = portfolio.sections.find((s) => s.type === 'hero' && s.enabled)
  const description = heroSection?.data?.description || `${portfolio.title} — Built with Builderr`

  // Update or create meta description
  let metaDesc = document.querySelector('meta[name="description"]')
  if (metaDesc) {
    metaDesc.setAttribute('content', description)
  } else {
    metaDesc = document.createElement('meta')
    metaDesc.setAttribute('name', 'description')
    metaDesc.setAttribute('content', description)
    document.head.appendChild(metaDesc)
  }

  // Update Open Graph tags
  setMetaProperty('og:title', portfolio.title)
  setMetaProperty('og:description', description)
  setMetaProperty('og:url', window.location.href)
  setMetaProperty('og:type', 'website')

  // Update Twitter tags
  setMetaProperty('twitter:title', portfolio.title)
  setMetaProperty('twitter:description', description)
}

function setMetaProperty(property: string, content: string) {
  let meta = document.querySelector(`meta[property="${property}"]`)
  if (meta) {
    meta.setAttribute('content', content)
  } else {
    meta = document.createElement('meta')
    meta.setAttribute('property', property)
    meta.setAttribute('content', content)
    document.head.appendChild(meta)
  }
}

/**
 * Restores the default Builderr meta tags when navigating away from a public portfolio.
 */
function restoreDefaultMeta() {
  document.title = 'Builderr'
  const metaDesc = document.querySelector('meta[name="description"]')
  if (metaDesc) {
    metaDesc.setAttribute(
      'content',
      'Builderr - Create beautiful professional portfolios in minutes. The effortless portfolio builder for developers and creatives.',
    )
  }
}

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
          setPortfolioMeta(data)
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load portfolio')
      } finally {
        setLoading(false)
      }
    }

    loadPortfolio()

    // Restore default meta when leaving this page
    return () => {
      restoreDefaultMeta()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <SpinnerMini />
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
    </div>
  )
}

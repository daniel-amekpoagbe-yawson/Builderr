import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { AuthGuard } from '@/app/auth-guard'
import { usePortfolioStore } from '@/store/portfolio.store'
import { BuilderInterface } from '@/components/BuilderInterface'
import SpinnerMini from '@/components/SpinnerMini'
import { Monitor, ArrowLeft, Sparkles } from 'lucide-react'

export const Route = createFileRoute('/builder/$portfolioId')({
  component: BuilderPage,
})

function BuilderPage() {
  const { portfolioId } = Route.useParams()
  const { loadPortfolio, currentPortfolio, loading } = usePortfolioStore()
  const navigate = useNavigate()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // Less than lg breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    loadPortfolio(portfolioId).catch((error) => {
      console.error('Failed to load portfolio:', error)
      navigate({ to: '/dashboard' })
    })

    // Cleanup: cancel auto-save timer and save any pending changes when leaving
    return () => {
      const store = usePortfolioStore.getState()
      store.cancelAutoSave()
      // Save any unsaved changes before unmounting
      if (store.isDirty && store.currentPortfolio) {
        store.savePortfolio().catch((err) =>
          console.error('Failed to save on unmount:', err)
        )
      }
    }
  }, [portfolioId, loadPortfolio, navigate])

  if (loading) {
    return (
      <AuthGuard>
       <SpinnerMini/>
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

  // Mobile warning screen
  if (isMobile) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
          <div className="max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
            <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Monitor className="text-white" size={40} />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Desktop Recommended
            </h2>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              The portfolio builder works best on desktop or laptop computers. 
              For the best editing experience, please switch to a larger screen.
            </p>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-gray-700" />
                <p className="text-sm text-gray-900 font-semibold">
                  Pro Tip
                </p>
              </div>
              <p className="text-sm text-gray-600">
                Your published portfolios look great on any device! 
                Only the builder needs a desktop.
              </p>
            </div>
            
            <button
              onClick={() => navigate({ to: '/dashboard' })}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
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

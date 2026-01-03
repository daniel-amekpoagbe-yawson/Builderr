import { Zap, Palette, Globe } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import Preview from './Preview'
import Divider from './Divider'
import Footer from './Footer'

export default function App() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section id="home" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-12">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Build Your Developer Portfolio in Minutes
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            No coding required. Choose from beautiful section layouts, customize your content, and deploy instantly with a public URL.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate({ to: '/auth/Register' })}
              className="px-8 py-3 bg-black text-white text-lg rounded-lg hover:bg-gray-900 transition-colors font-medium"
            >
              Start Building Free
            </button>
            <button
              onClick={() => navigate({ to: '/auth/Login' })}
              className="px-6 py-3 bg-white text-gray-900 text-lg rounded-lg border-2 border-black hover:bg-gray-50 transition-colors font-medium"
            >
              Sign In
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            No credit card required • Deploy in under 10 minutes
          </p>
        </div>
      </section>
      <Divider flip={true} />

      {/* Features Section */}
      <section id="features" className="bg-white py-8 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Build professional portfolios with powerful features designed for developers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-6">
                <Zap className="text-black/60" strokeWidth={1}  size={32}  />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                Create and deploy your portfolio in under 10 minutes. No technical setup required.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-6">
                <Palette className="text-black/60" strokeWidth={1}  size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Multiple Layouts
              </h3>
              <p className="text-gray-600">
                Choose from multiple variants for each section. Mix and match to create your unique style.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-6">
                <Globe className="text-black/60" strokeWidth={1}  size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Instant Deploy
              </h3>
              <p className="text-gray-600">
                Get a public URL instantly. Share your portfolio with one click. Export HTML anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Divider />

      {/* Examples Section */}
      <div>
      <Preview />

      </div>

   

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Build Your Portfolio?
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Join hundreds of developers who've already created their portfolios with DevFolio
          </p>
          <button
            onClick={() => navigate({ to: '/auth/Register' })}
            className="px-8 py-4 bg-black text-white text-lg rounded-lg hover:bg-gray-900 transition-colors font-medium"
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  )
}
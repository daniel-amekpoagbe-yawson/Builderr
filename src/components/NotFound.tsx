import { Link } from '@tanstack/react-router'
import {  ArrowLeft,Home } from 'lucide-react'

export function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center">
    

      {/* Text Content */}
      <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-4 tracking-tighter">
        404
      </h1>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
        Under Construction Or Missing entirely
      </h2>
      <p className="text-gray-600 max-w-md mx-auto mb-10 text-base">
        Oops! The page you're looking for seems to have been demolished or never existed in the first place.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/"
          className="px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          Go Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-white text-gray-900 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>
    </div>
  )
}

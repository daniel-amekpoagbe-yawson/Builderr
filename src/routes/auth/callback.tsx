import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/Supabase'
import { useAuthStore } from '@/store/auth.store'

export const Route = createFileRoute('/auth/callback')({
  component: CallbackPage,
})

function CallbackPage() {
  const navigate = useNavigate()
  const { initialize } = useAuthStore()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('Verifying your email...')

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Handle the auth callback
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          throw error
        }

        if (data.session) {
          // Re-initialize auth store with new session
          await initialize()
          setStatus('success')
          setMessage('Email verified! Redirecting to dashboard...')
          
          // Redirect to dashboard after a short delay
          setTimeout(() => {
            navigate({ to: '/dashboard' })
          }, 1500)
        } else {
          setStatus('error')
          setMessage('Verification failed. Please try again.')
        }
      } catch (err: any) {
        console.error('Auth callback error:', err)
        setStatus('error')
        setMessage(err.message || 'Verification failed. Please try again.')
      }
    }

    handleAuthCallback()
  }, [navigate, initialize])

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-white px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {status === 'loading' && (
          <>
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Verifying Email</h1>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h1>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <button
              onClick={() => navigate({ to: '/auth/Login' })}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Go to Login
            </button>
          </>
        )}
      </div>
    </div>
  )
}

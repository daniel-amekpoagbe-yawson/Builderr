import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/store/auth.store'

/**
 * GuestGuard Component
 * 
 * This component is used to protect routes that should ONLY be accessible to unauthenticated users
 * (guests), such as the Login and Register pages.
 * 
 * HOW IT WORKS:
 * 1. It listens to the authentication state from the `useAuthStore`.
 * 2. If the user is already authenticated (`user` is not null) and the auth state is fully 
 *    initialized, it automatically redirects the user to the Dashboard.
 * 3. While the authentication state is being checked (initialization), it shows a loading 
 *    spinner to prevent "flashing" of the guest-only content.
 * 4. If the user is NOT authenticated, it simply renders its children (the Login or Register form).
 */
export function GuestGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const { user, initialized, initialize } = useAuthStore()

  // Ensure the auth store is initialized when this component mounts
  useEffect(() => {
    if (!initialized) {
      initialize()
    }
  }, [initialized, initialize])

  // Perform redirection logic based on the user's authentication status
  useEffect(() => {
    // If the check is complete and we HAVE a user, they shouldn't be here.
    // We send them to the dashboard instead.
    if (initialized && user) {
      navigate({ to: '/dashboard' })
    }
  }, [initialized, user, navigate])

  // Show a loading state while we are determining if the user is logged in.
  // This prevents the login form from showing for a split second before the redirect happens.
  if (!initialized || user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-500 font-medium tracking-tight">Syncing session...</p>
        </div>
      </div>
    )
  }

  // If we reach here, it means initialized is true AND user is null (not logged in).
  // Perfect! They are a guest, so show them the guest content.
  return <>{children}</>
}

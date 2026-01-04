import { Outlet, createRootRoute, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { useEffect } from 'react'
import { Toaster } from 'sonner'

import Header from '@/components/Header'
import { useAuthStore } from '@/store/auth.store'
import { NotFound } from '@/components/NotFound'

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
})


function RootComponent() {
  const { initialize, initialized } = useAuthStore()
  const router = useRouterState()
  const currentPath = router.location.pathname

  // Hide header for public portfolio routes and preview routes
  // List of known app routes - header should be shown on these
  const appRoutes = ['/', '/dashboard', '/builder', '/auth', '/preview', '/About', '/Contact']
  const isAppRoute = appRoutes.some(route => 
    currentPath === route || currentPath.startsWith(route + '/')
  )
  const hideHeader = !isAppRoute || currentPath.startsWith('/preview/')

  useEffect(() => {
    if (!initialized) {
      initialize()
    }
  }, [initialized, initialize])

  return (
    <>
      {!hideHeader && <Header />}
      <Outlet />
      <Toaster position="top-right" richColors />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  )
}

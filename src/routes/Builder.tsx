import { AuthGuard } from '@/app/auth-guard'
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/Builder')({
  component: RouteComponent,
})

function RouteComponent() {
  return 
    <AuthGuard >
      
     <h2>Builder</h2>
      </AuthGuard>
}

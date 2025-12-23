import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/Register')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/auth/Register"!</div>
}

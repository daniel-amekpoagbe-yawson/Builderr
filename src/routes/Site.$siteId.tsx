import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Site/$siteId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/Site/$siteId"!</div>
}

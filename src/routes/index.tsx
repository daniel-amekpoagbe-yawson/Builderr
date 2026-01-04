import { createFileRoute } from '@tanstack/react-router'
import Homepage from '@/components/Homepage'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="text-center">
     <Homepage />
    </div>
  )
}

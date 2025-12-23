import { useEffect, useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { supabase } from "@/libs/Supabase"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate({ to: "/auth/Login" })
      } else {
        setLoading(false)
      }
    })
  }, [])

  if (loading) return <p>Checking auth...</p>

  return <>{children}</>
}

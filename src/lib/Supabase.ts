import { createClient } from "@supabase/supabase-js"

// Get the site URL from environment or use current origin
const getSiteUrl = () => {
  // Use environment variable if set (for production)
  if (import.meta.env.VITE_SITE_URL) {
    return import.meta.env.VITE_SITE_URL
  }
  // Fallback to current origin (works for both localhost and production)
  return window.location.origin
}

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!,
  {
    auth: {
      redirectTo: `${getSiteUrl()}/auth/callback`,
      // Auto-refresh session
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  }
)

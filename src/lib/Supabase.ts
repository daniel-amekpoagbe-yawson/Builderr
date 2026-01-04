import { createClient } from "@supabase/supabase-js"

// Get the site URL from environment or use current origin
export const getSiteUrl = () => {
  // Use environment variable if set (for production)
  if (import.meta.env.VITE_SITE_URL) {
    return import.meta.env.VITE_SITE_URL
  }
  // Fallback to current origin (works for both localhost and production)
  return window.location.origin
}

// Custom storage adapter to use cookies instead of localStorage
const cookieStorage = {
  getItem: (key: string): string | null => {
    const name = `${key}=`
    const decodedCookie = decodeURIComponent(document.cookie)
    const ca = decodedCookie.split(";")
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === " ") {
        c = c.substring(1)
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length)
      }
    }
    return null
  },
  setItem: (key: string, value: string): void => {
    // Set cookie to expire in 1 year
    const d = new Date()
    d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000)
    const expires = `expires=${d.toUTCString()}`
    
    // Only use Secure flag in production (HTTPS)
    const isProduction = window.location.protocol === 'https:'
    const secure = isProduction ? ';Secure' : ''
    
    // Use Strict for better security (change to Lax if you need external link support)
    document.cookie = `${key}=${value};${expires};path=/;SameSite=Lax${secure}`
  },
  removeItem: (key: string): void => {
    document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
  },
}

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      storage: cookieStorage,
    },
  },
)
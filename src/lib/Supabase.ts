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

// Validate required environment variables at startup
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '[Builderr] Missing required environment variables.\n' +
    'Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file.\n' +
    'See README.md for setup instructions.'
  )
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      // Use default localStorage — avoids 4KB cookie size limit issues with JWTs
    },
  },
)
import { create } from 'zustand'
import type { User, Session, Subscription } from '@supabase/supabase-js'
import { supabase } from '@/lib/Supabase'

interface AuthStore {
  user: User | null
  session: Session | null
  loading: boolean
  initialized: boolean
  _authSubscription: Subscription | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  session: null,
  loading: false,
  initialized: false,
  _authSubscription: null,

  initialize: async () => {
    // Prevent multiple initializations
    if (get().initialized) return

    set({ loading: true })
    try {
      // Clean up any existing subscription to prevent leaks
      const existingSub = get()._authSubscription
      if (existingSub) {
        existingSub.unsubscribe()
      }

      const { data, error } = await supabase.auth.getSession()
      if (error) throw error

      set({
        user: data.session?.user ?? null,
        session: data.session,
        loading: false,
        initialized: true,
      })

      // Listen for auth changes and store the subscription for cleanup
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        set({
          user: session?.user ?? null,
          session: session,
        })
      })

      set({ _authSubscription: subscription })
    } catch (error) {
      console.error('Auth initialization error:', error)
      set({ loading: false, initialized: true })
    }
  },

  signIn: async (email: string, password: string) => {
    set({ loading: true })
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error

      set({
        user: data.user,
        session: data.session,
        loading: false,
      })
    } catch (error: any) {
      set({ loading: false })
      throw error
    }
  },

  signUp: async (email: string, password: string) => {
    set({ loading: true })
    try {
      // Get the current site URL for email redirect
      const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${siteUrl}/auth/callback`,
        },
      })
      if (error) throw error

      set({
        user: data.user,
        session: data.session,
        loading: false,
      })
    } catch (error: any) {
      set({ loading: false })
      throw error
    }
  },

  signOut: async () => {
    set({ loading: true })
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      set({
        user: null,
        session: null,
        loading: false,
      })
    } catch (error: any) {
      set({ loading: false })
      throw error
    }
  },
}))

import { supabase } from '@/lib/Supabase'
import type { Portfolio, DatabasePortfolio } from '@/interfaces/Portfolio'

// Slugs that cannot be used for published portfolios — they collide with app routes or are reserved
const RESERVED_SLUGS = new Set([
  'dashboard', 'builder', 'auth', 'preview', 'about', 'contact',
  'api', 'admin', 'login', 'register', 'settings', 'profile',
  'signup', 'signin', 'signout', 'logout', 'account', 'help',
  'support', 'pricing', 'terms', 'privacy', 'blog', 'docs',
  'app', 'static', 'assets', 'public', 'favicon', 'robots',
  'sitemap', 'manifest', 'sw', 'service-worker',
])

class PortfolioService {
  // Convert database format to app format
  private dbToApp(db: DatabasePortfolio): Portfolio {
    return {
      ...db.config,
      id: db.id,
      userId: db.user_id,
      slug: db.slug ?? undefined,
      isPublished: db.is_published,
      createdAt: db.created_at,
      updatedAt: db.updated_at,
    }
  }

  // Convert app format to database format
  private appToDb(portfolio: Portfolio): Partial<DatabasePortfolio> {
    return {
      title: portfolio.title,
      config: portfolio,
      slug: portfolio.slug ?? null,
      is_published: portfolio.isPublished ?? false,
    }
  }

  async getPortfolio(id: string): Promise<Portfolio> {
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    if (!data) throw new Error('Portfolio not found')

    return this.dbToApp(data as DatabasePortfolio)
  }

  async getUserPortfolios(): Promise<Portfolio[]> {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })

    if (error) throw error
    return (data || []).map((item) => this.dbToApp(item as DatabasePortfolio))
  }

  async createPortfolio(portfolio: Portfolio): Promise<Portfolio> {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const dbData = {
      ...this.appToDb(portfolio),
      user_id: user.id,
    }

    const { data, error } = await supabase
      .from('portfolios')
      .insert(dbData)
      .select()
      .single()

    if (error) throw error
    return this.dbToApp(data as DatabasePortfolio)
  }

  async updatePortfolio(portfolio: Portfolio): Promise<Portfolio> {
    const dbData = {
      ...this.appToDb(portfolio),
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from('portfolios')
      .update(dbData)
      .eq('id', portfolio.id)
      .select()
      .single()

    if (error) throw error
    return this.dbToApp(data as DatabasePortfolio)
  }

  async deletePortfolio(id: string): Promise<void> {
    const { error } = await supabase.from('portfolios').delete().eq('id', id)
    if (error) throw error
  }

  async publishPortfolio(id: string): Promise<string> {
    // Generate unique slug
    const portfolio = await this.getPortfolio(id)
    let slug = portfolio.slug

    if (!slug) {
      // Generate slug from title
      slug = portfolio.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')

      // Ensure slug doesn't collide with reserved app routes
      if (!slug || RESERVED_SLUGS.has(slug)) {
        slug = `p-${slug || 'portfolio'}`
      }

      // Ensure uniqueness
      let uniqueSlug = slug
      let counter = 1
      while (await this.slugExists(uniqueSlug, id)) {
        uniqueSlug = `${slug}-${counter}`
        counter++
      }
      slug = uniqueSlug
    }

    const { error } = await supabase
      .from('portfolios')
      .update({
        slug,
        is_published: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (error) throw error
    return slug
  }

  async unpublishPortfolio(id: string): Promise<void> {
    const { error } = await supabase
      .from('portfolios')
      .update({
        is_published: false,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (error) throw error
  }

  async getPortfolioBySlug(slug: string): Promise<Portfolio | null> {
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null // Not found
      throw error
    }

    return data ? this.dbToApp(data as DatabasePortfolio) : null
  }

  private async slugExists(slug: string, excludeId?: string): Promise<boolean> {
    let query = supabase.from('portfolios').select('id').eq('slug', slug)

    if (excludeId) {
      query = query.neq('id', excludeId)
    }

    const { data, error } = await query
    if (error) throw error
    return (data?.length ?? 0) > 0
  }
}

export const portfolioService = new PortfolioService()


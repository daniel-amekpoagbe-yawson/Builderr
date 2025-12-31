export interface Portfolio {
  id: string
  title: string
  userId: string
  theme: {
    mode: 'light' | 'dark'
    primaryColor: string
    fontFamily: 'inter' | 'roboto'
    navbarVariant?: 'default' | 'A'
  }
  sections: Section[]
  slug?: string
  isPublished?: boolean
  createdAt?: string
  updatedAt?: string
}

export type SectionType = 'hero' | 'projects' | 'skills' | 'about' | 'experience' | 'contact'

export interface Section {
  id: string // unique section instance ID
  type: SectionType
  enabled: boolean
  variant: string // 'A', 'B', 'C', etc.
  order: number
  data: Record<string, any> // section-specific data
}

// Hero Section Data
export interface HeroData {
  name: string
  title: string
  description: string
  ctaText: string
  ctaLink: string
  imageUrl?: string
}

// Projects Section Data
export interface ProjectsData {
  projects: Array<{
    id: string
    title: string
    description: string
    imageUrl: string
    technologies: string[]
    liveUrl?: string
    githubUrl?: string
  }>
}

// Skills Section Data
export interface SkillsData {
  categories: Array<{
    name: string
    skills: string[]
  }>
}

// About Section Data
export interface AboutData {
  bio: string
  imageUrl?: string
  highlights: string[]
  title?: string // Professional title/role
  social?: {
    facebook?: string
    dribbble?: string
    instagram?: string
    linkedin?: string
    behance?: string
    twitter?: string
    github?: string
  }
  ctaButtons?: {
    primary?: {
      text: string
      link: string
    }
    secondary?: {
      text: string
      link: string
    }
  }
}

// Experience Section Data
export interface ExperienceData {
  experiences: Array<{
    id: string
    company: string
    position: string
    startDate: string
    endDate?: string
    description: string
    current: boolean
  }>
}

// Contact Section Data
export interface ContactData {
  email: string
  phone?: string
  social: {
    github?: string
    linkedin?: string
    twitter?: string
  }
}

// Database Portfolio (as stored in Supabase)
export interface DatabasePortfolio {
  id: string
  user_id: string
  title: string
  config: Portfolio
  slug: string | null
  is_published: boolean
  created_at: string
  updated_at: string
}

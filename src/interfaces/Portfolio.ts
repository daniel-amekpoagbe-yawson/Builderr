export type Portfolio = {
  id: string
  userId: string
  theme: {
    mode: "light" | "dark"
    accent: string
  }
  sections: Section[]
}

export type Section =
  | HeroSection
  | ProjectsSection

export type HeroSection = {
  id: string
  type: "hero"
  variant: "A" | "B"
  data: {
    name: string
    role: string
    bio: string
    cta: string
  }
}

export type ProjectsSection = {
  id: string
  type: "projects"
  variant: "grid" | "list"
  data: {
    projects: {
      title: string
      description: string
      link: string
    }[]
  }
}

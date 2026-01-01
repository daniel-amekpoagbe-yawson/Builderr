import type { Portfolio, Section, FontFamily } from '@/interfaces/Portfolio'

export interface PortfolioTemplate {
  id: string
  name: string
  description: string
  category: 'developer' | 'designer' | 'photographer' | 'blank'
  icon: string // Lucide icon name
  preview: string // Preview image or gradient
  theme: Portfolio['theme']
  sections: Omit<Section, 'id'>[]
  features: string[]
}

// Font configurations for different templates
export const fontConfigs: Record<
  FontFamily,
  { name: string; import: string; css: string }
> = {
  inter: {
    name: 'Inter',
    import: 'Inter:wght@400;500;600;700',
    css: "'Inter', sans-serif",
  },
  roboto: {
    name: 'Roboto',
    import: 'Roboto:wght@400;500;700',
    css: "'Roboto', sans-serif",
  },
  poppins: {
    name: 'Poppins',
    import: 'Poppins:wght@400;500;600;700',
    css: "'Poppins', sans-serif",
  },
  playfair: {
    name: 'Playfair Display',
    import: 'Playfair+Display:wght@400;500;600;700',
    css: "'Playfair Display', serif",
  },
  'space-grotesk': {
    name: 'Space Grotesk',
    import: 'Space+Grotesk:wght@400;500;600;700',
    css: "'Space Grotesk', sans-serif",
  },
  'dm-sans': {
    name: 'DM Sans',
    import: 'DM+Sans:wght@400;500;600;700',
    css: "'DM Sans', sans-serif",
  },
  'jetbrains-mono': {
    name: 'JetBrains Mono',
    import: 'JetBrains+Mono:wght@400;500;600;700',
    css: "'JetBrains Mono', monospace",
  },
  'source-serif': {
    name: 'Source Serif Pro',
    import: 'Source+Serif+Pro:wght@400;600;700',
    css: "'Source Serif Pro', serif",
  },
}

// ============================================
// DEVELOPER TEMPLATE
// ============================================
const developerTemplate: PortfolioTemplate = {
  id: 'developer',
  name: 'Software Developer',
  description:
    'Clean, code-focused portfolio with GitHub integration and project showcases',
  category: 'developer',
  icon: 'Code2',
  preview: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
  theme: {
    mode: 'dark',
    primaryColor: '#3b82f6', // Blue
    secondaryColor: '#10b981', // Emerald
    accentColor: '#f59e0b', // Amber
    fontFamily: 'jetbrains-mono',
    headingFont: 'space-grotesk',
    navbarVariant: 'default',
  },
  features: [
    'GitHub repository showcase',
    'Tech stack visualization',
    'Code-themed design',
    'Dark mode optimized',
  ],
  sections: [
    {
      type: 'hero',
      enabled: true,
      variant: 'A',
      order: 0,
      data: {
        name: 'Alex Developer',
        title: 'Full Stack Developer',
        description:
          "I build exceptional digital experiences with clean, efficient code. Passionate about open source and creating tools that make developers' lives easier.",
        ctaText: 'View My Work',
        ctaLink: '#projects',
        imageUrl: '',
      },
    },
    {
      type: 'about',
      enabled: true,
      variant: 'A',
      order: 1,
      data: {
        bio: "I'm a full-stack developer with 5+ years of experience building web applications. I specialize in React, Node.js, and cloud architecture. When I'm not coding, you'll find me contributing to open source projects or writing technical blog posts.",
        highlights: [
          '5+ years of professional experience',
          'Open source contributor',
          'Technical writer & mentor',
          'AWS & GCP certified',
        ],
        social: {
          github: 'https://github.com',
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
        },
      },
    },
    {
      type: 'skills',
      enabled: true,
      variant: 'A',
      order: 2,
      data: {
        categories: [
          {
            name: 'Frontend',
            skills: [
              'React',
              'TypeScript',
              'Next.js',
              'Tailwind CSS',
              'Vue.js',
            ],
          },
          {
            name: 'Backend',
            skills: ['Node.js', 'Python', 'PostgreSQL', 'GraphQL', 'Redis'],
          },
          {
            name: 'DevOps',
            skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'],
          },
          {
            name: 'Tools',
            skills: ['Git', 'VS Code', 'Figma', 'Postman', 'Linux'],
          },
        ],
      },
    },
    {
      type: 'projects',
      enabled: true,
      variant: 'A',
      order: 3,
      data: {
        projects: [
          {
            id: crypto.randomUUID(),
            title: 'DevFlow',
            description:
              'A developer productivity tool that integrates with GitHub to streamline code reviews and automate workflows.',
            imageUrl: '',
            technologies: ['React', 'Node.js', 'GraphQL', 'PostgreSQL'],
            liveUrl: 'https://example.com',
            githubUrl: 'https://github.com',
          },
          {
            id: crypto.randomUUID(),
            title: 'CloudDeploy CLI',
            description:
              'Open-source CLI tool for deploying applications to multiple cloud providers with a single command.',
            imageUrl: '',
            technologies: ['Go', 'Docker', 'AWS', 'GCP'],
            githubUrl: 'https://github.com',
          },
          {
            id: crypto.randomUUID(),
            title: 'API Gateway',
            description:
              'High-performance API gateway with rate limiting, caching, and analytics built for microservices.',
            imageUrl: '',
            technologies: ['Rust', 'Redis', 'Kubernetes'],
            githubUrl: 'https://github.com',
          },
        ],
      },
    },
    {
      type: 'experience',
      enabled: true,
      variant: 'A',
      order: 4,
      data: {
        experiences: [
          {
            id: crypto.randomUUID(),
            company: 'TechCorp Inc.',
            position: 'Senior Software Engineer',
            startDate: '2022-01',
            description:
              'Leading development of microservices architecture serving 1M+ users. Implemented CI/CD pipelines reducing deployment time by 60%.',
            current: true,
          },
          {
            id: crypto.randomUUID(),
            company: 'StartupXYZ',
            position: 'Full Stack Developer',
            startDate: '2020-03',
            endDate: '2022-01',
            description:
              'Built and scaled the core product from 0 to 100k users. Developed real-time features using WebSockets and Redis.',
            current: false,
          },
        ],
      },
    },
    {
      type: 'contact',
      enabled: true,
      variant: 'A',
      order: 5,
      data: {
        email: 'alex@developer.com',
        social: {
          github: 'https://github.com',
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
        },
      },
    },
  ],
}

// ============================================
// DESIGNER TEMPLATE
// ============================================
const designerTemplate: PortfolioTemplate = {
  id: 'designer',
  name: 'Creative Designer',
  description:
    'Visual-first portfolio with elegant typography and creative layouts',
  category: 'designer',
  icon: 'Palette',
  preview: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)',
  theme: {
    mode: 'light',
    primaryColor: '#ec4899', // Pink
    secondaryColor: '#8b5cf6', // Violet
    accentColor: '#f97316', // Orange
    fontFamily: 'dm-sans',
    headingFont: 'playfair',
    navbarVariant: 'A',
  },
  features: [
    'Dribbble/Behance showcase',
    'Visual-heavy layouts',
    'Elegant typography',
    'Creative animations',
  ],
  sections: [
    {
      type: 'hero',
      enabled: true,
      variant: 'B',
      order: 0,
      data: {
        name: 'Sarah Creative',
        title: 'UI/UX Designer',
        description:
          'I craft beautiful, intuitive digital experiences that users love. Specializing in brand identity, web design, and mobile app interfaces.',
        ctaText: 'See My Designs',
        ctaLink: '#projects',
        imageUrl: '',
      },
    },
    {
      type: 'about',
      enabled: true,
      variant: 'B',
      order: 1,
      data: {
        title: 'I am a Creative Designer passionate about visual storytelling',
        bio: "With over 6 years of experience in design, I've had the privilege of working with brands ranging from ambitious startups to Fortune 500 companies. My approach combines strategic thinking with creative execution to deliver designs that not only look beautiful but drive results.",
        highlights: [
          'Award-winning designer',
          'Brand identity specialist',
          'Mobile-first approach',
          'Worked with clients worldwide',
        ],
        imageUrl: '',
        social: {
          dribbble: 'https://dribbble.com',
          behance: 'https://behance.net',
          instagram: 'https://instagram.com',
          linkedin: 'https://linkedin.com',
        },
        ctaButtons: {
          primary: {
            text: 'View Portfolio',
            link: '#projects',
          },
          secondary: {
            text: 'Download Resume',
            link: '#',
          },
        },
      },
    },
    {
      type: 'skills',
      enabled: true,
      variant: 'A',
      order: 2,
      data: {
        categories: [
          {
            name: 'Design',
            skills: [
              'UI Design',
              'UX Design',
              'Brand Identity',
              'Typography',
              'Illustration',
            ],
          },
          {
            name: 'Tools',
            skills: [
              'Figma',
              'Adobe XD',
              'Photoshop',
              'Illustrator',
              'After Effects',
            ],
          },
          {
            name: 'Development',
            skills: ['HTML/CSS', 'Framer', 'Webflow', 'Prototyping'],
          },
        ],
      },
    },
    {
      type: 'projects',
      enabled: true,
      variant: 'B',
      order: 3,
      data: {
        projects: [
          {
            id: crypto.randomUUID(),
            title: 'Luxe Fashion Brand',
            description:
              'Complete brand identity and e-commerce experience for a luxury fashion startup. Increased conversion by 45%.',
            imageUrl: '',
            technologies: ['Brand Identity', 'Web Design', 'E-commerce'],
            liveUrl: 'https://dribbble.com',
          },
          {
            id: crypto.randomUUID(),
            title: 'FinTech Mobile App',
            description:
              'Award-winning mobile banking app design with focus on accessibility and user delight.',
            imageUrl: '',
            technologies: ['Mobile Design', 'UX Research', 'Prototyping'],
            liveUrl: 'https://behance.net',
          },
          {
            id: crypto.randomUUID(),
            title: 'SaaS Dashboard',
            description:
              'Data visualization dashboard for enterprise analytics platform. Clean, intuitive interface for complex data.',
            imageUrl: '',
            technologies: ['Dashboard Design', 'Data Viz', 'Design System'],
            liveUrl: 'https://dribbble.com',
          },
          {
            id: crypto.randomUUID(),
            title: 'Wellness Brand',
            description:
              'Holistic brand identity including logo, packaging, and digital presence for a wellness startup.',
            imageUrl: '',
            technologies: ['Brand Identity', 'Packaging', 'Social Media'],
            liveUrl: 'https://behance.net',
          },
        ],
      },
    },
    {
      type: 'contact',
      enabled: true,
      variant: 'A',
      order: 4,
      data: {
        email: 'hello@sarahcreative.com',
        social: {
          dribbble: 'https://dribbble.com',
          behance: 'https://behance.net',
          instagram: 'https://instagram.com',
          linkedin: 'https://linkedin.com',
        },
      },
    },
  ],
}

// ============================================
// PHOTOGRAPHER TEMPLATE
// ============================================
const photographerTemplate: PortfolioTemplate = {
  id: 'photographer',
  name: 'Photographer',
  description:
    'Gallery-focused portfolio with lightbox and stunning image presentations',
  category: 'photographer',
  icon: 'Camera',
  preview: 'linear-gradient(135deg, #18181b 0%, #27272a 50%, #3f3f46 100%)',
  theme: {
    mode: 'dark',
    primaryColor: '#ffffff', // White
    secondaryColor: '#a1a1aa', // Zinc
    accentColor: '#fbbf24', // Amber
    fontFamily: 'source-serif',
    headingFont: 'playfair',
    navbarVariant: 'A',
  },
  features: [
    'Full-screen gallery',
    'Lightbox viewer',
    'Category filtering',
    'Minimal, image-focused',
  ],
  sections: [
    {
      type: 'hero',
      enabled: true,
      variant: 'C',
      order: 0,
      data: {
        name: 'Marcus Lens',
        title: 'Visual Storyteller',
        description:
          'Capturing moments that speak louder than words. Specializing in portrait, landscape, and editorial photography.',
        ctaText: 'View Gallery',
        ctaLink: '#gallery',
        imageUrl: '',
      },
    },
    {
      type: 'about',
      enabled: true,
      variant: 'A',
      order: 1,
      data: {
        bio: 'Photography has been my passion for over a decade. I believe every frame tells a story, and my mission is to capture the authentic essence of every moment. From intimate portraits to sweeping landscapes, I approach each project with curiosity and dedication to craft.',
        highlights: [
          '10+ years experience',
          'National Geographic featured',
          'Traveled to 40+ countries',
          'Published in major magazines',
        ],
        imageUrl: '',
        social: {
          instagram: 'https://instagram.com',
          behance: 'https://behance.net',
          twitter: 'https://twitter.com',
        },
      },
    },
    {
      type: 'gallery',
      enabled: true,
      variant: 'A',
      order: 2,
      data: {
        title: 'Portfolio',
        description: 'A selection of my favorite work across different genres',
        layout: 'masonry',
        categories: ['All', 'Portrait', 'Landscape', 'Editorial', 'Street'],
        images: [
          {
            id: crypto.randomUUID(),
            url: '',
            title: 'Urban Solitude',
            description: 'Street photography in Tokyo',
            category: 'Street',
          },
          {
            id: crypto.randomUUID(),
            url: '',
            title: 'Mountain Dawn',
            description: 'Sunrise at the Alps',
            category: 'Landscape',
          },
          {
            id: crypto.randomUUID(),
            url: '',
            title: 'Portrait Study',
            description: 'Natural light portrait session',
            category: 'Portrait',
          },
          {
            id: crypto.randomUUID(),
            url: '',
            title: 'Fashion Forward',
            description: 'Editorial for Vogue',
            category: 'Editorial',
          },
          {
            id: crypto.randomUUID(),
            url: '',
            title: 'City Lights',
            description: 'Night photography in New York',
            category: 'Street',
          },
          {
            id: crypto.randomUUID(),
            url: '',
            title: 'Ocean Calm',
            description: 'Long exposure seascape',
            category: 'Landscape',
          },
        ],
      },
    },
    {
      type: 'experience',
      enabled: true,
      variant: 'A',
      order: 3,
      data: {
        experiences: [
          {
            id: crypto.randomUUID(),
            company: 'Freelance',
            position: 'Professional Photographer',
            startDate: '2018-01',
            description:
              'Working with brands, magazines, and private clients worldwide. Specializing in portrait, landscape, and editorial photography.',
            current: true,
          },
          {
            id: crypto.randomUUID(),
            company: 'National Geographic',
            position: 'Contributing Photographer',
            startDate: '2020-06',
            endDate: '2023-12',
            description:
              'Contributed to multiple features on wildlife and landscape photography. Traveled to remote locations for documentary projects.',
            current: false,
          },
        ],
      },
    },
    {
      type: 'contact',
      enabled: true,
      variant: 'A',
      order: 4,
      data: {
        email: 'hello@marcuslens.com',
        phone: '+1 (555) 123-4567',
        social: {
          instagram: 'https://instagram.com',
          twitter: 'https://twitter.com',
        },
      },
    },
  ],
}

// ============================================
// BLANK TEMPLATE
// ============================================
const blankTemplate: PortfolioTemplate = {
  id: 'blank',
  name: 'Start from Scratch',
  description: 'Empty canvas to build your unique portfolio from the ground up',
  category: 'blank',
  icon: 'Plus',
  preview: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
  theme: {
    mode: 'light',
    primaryColor: '#4f46e5',
    fontFamily: 'inter',
    navbarVariant: 'default',
  },
  features: [
    'Complete freedom',
    'Add any sections',
    'Custom styling',
    'Your vision, your way',
  ],
  sections: [],
}

// Export all templates
export const portfolioTemplates: PortfolioTemplate[] = [
  developerTemplate,
  designerTemplate,
  photographerTemplate,
  blankTemplate,
]

// Helper function to get template by ID
export function getTemplateById(id: string): PortfolioTemplate | undefined {
  return portfolioTemplates.find((t) => t.id === id)
}

// Helper function to create portfolio from template
export function createPortfolioFromTemplate(
  template: PortfolioTemplate,
  userId: string,
  title: string,
): Portfolio {
  return {
    id: crypto.randomUUID(),
    title,
    userId,
    theme: { ...template.theme },
    sections: template.sections.map((section, index) => ({
      ...section,
      id: crypto.randomUUID(),
      order: index,
    })),
    templateId: template.id,
  }
}

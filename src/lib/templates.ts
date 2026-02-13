import type { Portfolio, Section, FontFamily } from '@/interfaces/Portfolio'

export interface PortfolioTemplate {
  id: string
  name: string
  description: string
  category: 'developer' | 'designer' | 'photographer' | 'professional' | 'blank'
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
    'Minimalist and clean portfolio with a focus on typography and whitespace',
  category: 'designer',
  icon: 'Palette',
  preview: 'linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%)',
  theme: {
    mode: 'light',
    primaryColor: '#111827', // Gray 900
    secondaryColor: '#6b7280', // Gray 500
    accentColor: '#2563eb', // Blue 600
    fontFamily: 'inter',
    headingFont: 'space-grotesk',
    navbarVariant: 'A',
  },
  features: [
    'Clean typography',
    'Minimalist layout',
    'Case study focus',
    'Modern aesthetics',
  ],
  sections: [
    {
      type: 'hero',
      enabled: true,
      variant: 'B',
      order: 0,
      data: {
        name: 'Sarah Design',
        title: 'Product Designer',
        description:
          'Specializing in building digital products that are simple, beautiful, and easy to use. Currently crafting experiences at Tech Co.',
        ctaText: 'View Work',
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
        title: 'Designing with purpose and clarity.',
        bio: "I'm a multidisciplinary designer with a focus on User Interface and User Experience. I believe that good design is obvious, but great design is transparent. My work is grounded in research and driven by a desire to solve complex problems with simple, elegant solutions.",
        highlights: [
          'Product Strategy',
          'Design Systems',
          'User Research',
          'Prototyping',
        ],
        imageUrl: '',
        social: {
          dribbble: 'https://dribbble.com',
          behance: 'https://behance.net',
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
        },
        ctaButtons: {
          primary: {
            text: 'View Resume',
            link: '#',
          },
        },
      },
    },
    {
      type: 'experience',
      enabled: true,
      variant: 'A',
      order: 2,
      data: {
        experiences: [
          {
            id: crypto.randomUUID(),
            company: 'Studio Alpha',
            position: 'Senior Product Designer',
            startDate: '2022',
            description:
              'Leading the design system initiative and mentoring junior designers. improved design-to-dev handoff process.',
            current: true,
          },
          {
            id: crypto.randomUUID(),
            company: 'Creative Agency',
            position: 'UI/UX Designer',
            startDate: '2020',
            endDate: '2022',
            description:
              'Worked with various clients to deliver high-fidelity prototypes and marketing websites.',
            current: false,
          },
        ],
      },
    },
    {
      type: 'skills',
      enabled: true,
      variant: 'A',
      order: 3,
      data: {
        categories: [
          {
            name: 'Expertise',
            skills: [
              'UI/UX',
              'Product Design',
              'Interaction',
              'Design Systems',
              'Prototyping',
            ],
          },
          {
            name: 'Tools',
            skills: ['Figma', 'Principle', 'Adobe CC', 'Webflow', 'Notion'],
          },
        ],
      },
    },
    {
      type: 'projects',
      enabled: true,
      variant: 'B',
      order: 4,
      data: {
        projects: [
          {
            id: crypto.randomUUID(),
            title: 'Finance App',
            description:
              'A complete redesign of a banking application to improve user engagement and accessibility.',
            imageUrl: '',
            technologies: ['Case Study', 'Fintech', 'Mobile'],
            liveUrl: 'https://dribbble.com',
          },
          {
            id: crypto.randomUUID(),
            title: 'E-commerce Platform',
            description:
              'Scalable design system for a global fashion retailer, focused on conversion optimization.',
            imageUrl: '',
            technologies: ['Design System', 'Web', 'Retail'],
            liveUrl: 'https://behance.net',
          },
          {
            id: crypto.randomUUID(),
            title: 'Travel Guide',
            description:
              'Concept app for travelers to find and book local experiences with a minimalist interface.',
            imageUrl: '',
            technologies: ['Concept', 'Mobile', 'Travel'],
            liveUrl: 'https://dribbble.com',
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
        email: 'hello@sarahdesign.com',
        social: {
          dribbble: 'https://dribbble.com',
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
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

// ============================================
// MODERN PROFESSIONAL TEMPLATE
// ============================================
const modernProfessionalTemplate: PortfolioTemplate = {
  id: 'modern-professional',
  name: 'Modern Professional',
  description:
    'A clean, high-end template for consultants, freelancers, and professionals',
  category: 'professional',
  icon: 'Briefcase',
  preview: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
  theme: {
    mode: 'light',
    primaryColor: '#6366f1', // Indigo 500
    secondaryColor: '#475569', // Slate 600
    accentColor: '#8b5cf6', // Violet 500
    fontFamily: 'dm-sans',
    headingFont: 'inter',
    navbarVariant: 'A',
  },
  features: [
    'Floating modern navbar',
    'Clean, professional layout',
    'Focus on experience and skills',
    'Fully responsive design',
  ],
  sections: [
    {
      type: 'hero',
      enabled: true,
      variant: 'B',
      order: 0,
      data: {
        name: 'Jordan Professional',
        title: 'Strategy Consultant & Specialist',
        description:
          'Helping businesses scale through strategic planning and modern solutions. I bridge the gap between complex problems and elegant, actionable results.',
        ctaText: 'Let\'s Connect',
        ctaLink: '#contact',
        imageUrl: '',
      },
    },
    {
      type: 'about',
      enabled: true,
      variant: 'B',
      order: 1,
      data: {
        title: 'Driving impact through strategic thinking.',
        bio: "With over 8 years of experience in business transformation and professional services, I bring a unique perspective to every project. My approach is data-driven, client-focused, and ALWAYS results-oriented. I've helped dozens of startups and established firms redefine their market position and achieve sustainable growth.",
        highlights: [
          'Strategy Development',
          'Market Analysis',
          'Operational Efficiency',
          'Client Management',
        ],
        imageUrl: '',
        social: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
        },
        ctaButtons: {
          primary: {
            text: 'View Portfolio',
            link: '#projects',
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
            name: 'Core Expertise',
            skills: [
              'Business Strategy',
              'Project Management',
              'Leadership',
              'Data Analysis',
              'Public Speaking',
            ],
          },
          {
            name: 'Tools & Software',
            skills: ['Asana', 'Tableau', 'Notion', 'Slack', 'PowerBI'],
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
            company: 'Peak Consulting Group',
            position: 'Lead Consultant',
            startDate: '2021-06',
            description:
              'Leading cross-functional teams to deliver high-impact strategic initiatives for Fortune 500 clients. Managed $2M+ annual budget.',
            current: true,
          },
          {
            id: crypto.randomUUID(),
            company: 'Global Solutions Inc.',
            position: 'Senior Analyst',
            startDate: '2018-03',
            endDate: '2021-05',
            description:
              'Analyzed market trends and competitor strategies to provide actionable insights for C-suite executives.',
            current: false,
          },
        ],
      },
    },
    {
      type: 'projects',
      enabled: true,
      variant: 'A',
      order: 4,
      data: {
        projects: [
          {
            id: crypto.randomUUID(),
            title: 'Digital Transformation',
            description:
              'Led a complete digital overhaul for a regional logistics firm, resulting in a 30% increase in operational efficiency.',
            imageUrl: '',
            technologies: ['Consulting', 'Workflow', 'Efficiency'],
            liveUrl: 'https://example.com',
          },
          {
            id: crypto.randomUUID(),
            title: 'Market Entry Strategy',
            description:
              'Developed a comprehensive market entry plan for a fintech startup expanding into Southeast Asia.',
            imageUrl: '',
            technologies: ['Strategy', 'Research', 'Fintech'],
            liveUrl: 'https://example.com',
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
        email: 'jordan@professional.com',
        social: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
          github: 'https://github.com',
        },
      },
    },
  ],
}

// Export all templates
export const portfolioTemplates: PortfolioTemplate[] = [
  developerTemplate,
  designerTemplate,
  photographerTemplate,
  modernProfessionalTemplate,
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

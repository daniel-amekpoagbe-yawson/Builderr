import type { Section, Portfolio, HeroData, ProjectsData, SkillsData, AboutData, ContactData } from '@/interfaces/Portfolio'

interface SectionConfigFormProps {
  section: Section
  portfolio?: Portfolio
  onUpdate: (updates: Partial<Section>) => void
}

export function SectionConfigForm({ section, onUpdate }: SectionConfigFormProps) {
  const updateData = (updates: Partial<Section['data']>) => {
    onUpdate({
      data: { ...section.data, ...updates },
    })
  }

  switch (section.type) {
    case 'hero':
      return <HeroConfigForm data={section.data as HeroData} onUpdate={updateData} />
    case 'projects':
      return <ProjectsConfigForm data={section.data as ProjectsData} onUpdate={updateData} />
    case 'skills':
      return <SkillsConfigForm data={section.data as SkillsData} onUpdate={updateData} />
    case 'about':
      return <AboutConfigForm data={section.data as AboutData} onUpdate={updateData} />
    case 'experience':
      return <ExperienceConfigForm />
    case 'contact':
      return <ContactConfigForm data={section.data as ContactData} onUpdate={updateData} />
    default:
      return <div className="text-sm text-gray-500">No configuration available</div>
  }
}

function HeroConfigForm({ data, onUpdate }: { data: HeroData; onUpdate: (updates: Partial<HeroData>) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          value={data.name || ''}
          onChange={(e) => onUpdate({ name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={data.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={data.description || ''}
          onChange={(e) => onUpdate({ description: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">CTA Text</label>
        <input
          type="text"
          value={data.ctaText || ''}
          onChange={(e) => onUpdate({ ctaText: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">CTA Link</label>
        <input
          type="text"
          value={data.ctaLink || ''}
          onChange={(e) => onUpdate({ ctaLink: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (optional)</label>
        <input
          type="url"
          value={data.imageUrl || ''}
          onChange={(e) => onUpdate({ imageUrl: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
    </div>
  )
}

function ProjectsConfigForm({ data, onUpdate }: { data: ProjectsData; onUpdate: (updates: Partial<ProjectsData>) => void }) {
  const addProject = () => {
    const newProject = {
      id: crypto.randomUUID(),
      title: 'New Project',
      description: '',
      imageUrl: '',
      technologies: [],
    }
    onUpdate({ projects: [...(data.projects || []), newProject] })
  }

  const updateProject = (id: string, updates: Partial<ProjectsData['projects'][0]>) => {
    onUpdate({
      projects: data.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })
  }

  const removeProject = (id: string) => {
    onUpdate({ projects: data.projects.filter((p) => p.id !== id) })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">Projects</label>
        <button
          onClick={addProject}
          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
        >
          + Add Project
        </button>
      </div>
      <div className="space-y-3">
        {(data.projects || []).map((project) => (
          <div key={project.id} className="border border-gray-200 rounded-lg p-3 space-y-2">
            <input
              type="text"
              value={project.title}
              onChange={(e) => updateProject(project.id, { title: e.target.value })}
              placeholder="Project title"
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              value={project.description}
              onChange={(e) => updateProject(project.id, { description: e.target.value })}
              placeholder="Description"
              rows={2}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="url"
              value={project.imageUrl}
              onChange={(e) => updateProject(project.id, { imageUrl: e.target.value })}
              placeholder="Image URL"
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={() => removeProject(project.id)}
              className="text-xs text-red-600 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function SkillsConfigForm({ data, onUpdate }: { data: SkillsData; onUpdate: (updates: Partial<SkillsData>) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">Skill Categories</label>
        <button
          onClick={() => onUpdate({ categories: [...(data.categories || []), { name: '', skills: [] }] })}
          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
        >
          + Add Category
        </button>
      </div>
      <div className="text-sm text-gray-500">Skill configuration coming soon</div>
    </div>
  )
}

function AboutConfigForm({ data, onUpdate }: { data: AboutData; onUpdate: (updates: Partial<AboutData>) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
        <textarea
          value={data.bio || ''}
          onChange={(e) => onUpdate({ bio: e.target.value })}
          rows={5}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (optional)</label>
        <input
          type="url"
          value={data.imageUrl || ''}
          onChange={(e) => onUpdate({ imageUrl: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
    </div>
  )
}

function ExperienceConfigForm() {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Experience</label>
      <div className="text-sm text-gray-500">Experience configuration coming soon</div>
    </div>
  )
}

function ContactConfigForm({ data, onUpdate }: { data: ContactData; onUpdate: (updates: Partial<ContactData>) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={data.email || ''}
          onChange={(e) => onUpdate({ email: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
        <input
          type="tel"
          value={data.phone || ''}
          onChange={(e) => onUpdate({ phone: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
        <input
          type="url"
          value={data.social?.github || ''}
          onChange={(e) => onUpdate({ social: { ...data.social, github: e.target.value } })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
        <input
          type="url"
          value={data.social?.linkedin || ''}
          onChange={(e) => onUpdate({ social: { ...data.social, linkedin: e.target.value } })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
    </div>
  )
}


import type { Section, Portfolio, HeroData, ProjectsData, SkillsData, AboutData, ExperienceData, ContactData } from '@/interfaces/Portfolio'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Trash2 } from 'lucide-react'

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
      return <ExperienceConfigForm data={section.data as ExperienceData} onUpdate={updateData} />
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
        <Label>Name</Label>
        <Input
          type="text"
          value={data.name || ''}
          onChange={(e) => onUpdate({ name: e.target.value })}
          placeholder="Your name"
        />
      </div>
      <div>
        <Label>Title</Label>
        <Input
          type="text"
          value={data.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Your job title"
        />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea
          value={data.description || ''}
          onChange={(e) => onUpdate({ description: e.target.value })}
          rows={3}
          placeholder="A brief description about yourself"
        />
      </div>
      <div>
        <Label>CTA Text</Label>
        <Input
          type="text"
          value={data.ctaText || ''}
          onChange={(e) => onUpdate({ ctaText: e.target.value })}
          placeholder="Get Started"
        />
      </div>
      <div>
        <Label>CTA Link</Label>
        <Input
          type="text"
          value={data.ctaLink || ''}
          onChange={(e) => onUpdate({ ctaLink: e.target.value })}
          placeholder="# or URL"
        />
      </div>
      <div>
        <Label>Image URL (optional)</Label>
        <Input
          type="url"
          value={data.imageUrl || ''}
          onChange={(e) => onUpdate({ imageUrl: e.target.value })}
          placeholder="https://example.com/image.jpg"
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
            <Input
              value={project.title}
              onChange={(e) => updateProject(project.id, { title: e.target.value })}
              placeholder="Project title"
              className="text-sm"
            />
            <Textarea
              value={project.description}
              onChange={(e) => updateProject(project.id, { description: e.target.value })}
              placeholder="Description"
              rows={2}
              className="text-sm"
            />
            <Input
              type="url"
              value={project.imageUrl}
              onChange={(e) => updateProject(project.id, { imageUrl: e.target.value })}
              placeholder="Image URL"
              className="text-sm"
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="url"
                value={project.liveUrl || ''}
                onChange={(e) => updateProject(project.id, { liveUrl: e.target.value })}
                placeholder="Live URL"
                className="text-sm"
              />
              <Input
                type="url"
                value={project.githubUrl || ''}
                onChange={(e) => updateProject(project.id, { githubUrl: e.target.value })}
                placeholder="GitHub URL"
                className="text-sm"
              />
            </div>
            <div>
              <Label className="text-xs mb-1">Technologies (comma-separated)</Label>
              <Input
                value={(project.technologies || []).join(', ')}
                onChange={(e) => {
                  const techs = e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                  updateProject(project.id, { technologies: techs })
                }}
                placeholder="React, TypeScript, Tailwind"
                className="text-sm"
              />
            </div>
            <Button
              onClick={() => removeProject(project.id)}
              size="sm"
              variant="ghost"
              className="text-red-600 hover:text-red-700 w-full"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Remove Project
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

function SkillsConfigForm({ data, onUpdate }: { data: SkillsData; onUpdate: (updates: Partial<SkillsData>) => void }) {
  const addCategory = () => {
    onUpdate({ categories: [...(data.categories || []), { name: '', skills: [] }] })
  }

  const updateCategory = (index: number, updates: Partial<{ name: string; skills: string[] }>) => {
    const categories = [...(data.categories || [])]
    categories[index] = { ...categories[index], ...updates }
    onUpdate({ categories })
  }

  const removeCategory = (index: number) => {
    const categories = (data.categories || []).filter((_, i) => i !== index)
    onUpdate({ categories })
  }

  const addSkill = (categoryIndex: number) => {
    const categories = [...(data.categories || [])]
    categories[categoryIndex].skills = [...(categories[categoryIndex].skills || []), '']
    onUpdate({ categories })
  }

  const updateSkill = (categoryIndex: number, skillIndex: number, value: string) => {
    const categories = [...(data.categories || [])]
    categories[categoryIndex].skills[skillIndex] = value
    onUpdate({ categories })
  }

  const removeSkill = (categoryIndex: number, skillIndex: number) => {
    const categories = [...(data.categories || [])]
    categories[categoryIndex].skills = categories[categoryIndex].skills.filter((_, i) => i !== skillIndex)
    onUpdate({ categories })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>Skill Categories</Label>
        <Button onClick={addCategory} size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-1" />
          Add Category
        </Button>
      </div>
      <div className="space-y-4">
        {(data.categories || []).map((category, catIndex) => (
          <Card key={catIndex}>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Input
                  value={category.name}
                  onChange={(e) => updateCategory(catIndex, { name: e.target.value })}
                  placeholder="Category name (e.g., Frontend, Backend)"
                  className="flex-1 mr-2"
                />
                <Button
                  onClick={() => removeCategory(catIndex)}
                  size="sm"
                  variant="ghost"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-sm">Skills</Label>
                  <Button
                    onClick={() => addSkill(catIndex)}
                    size="sm"
                    variant="ghost"
                    className="h-7 text-xs"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Skill
                  </Button>
                </div>
                <div className="space-y-2">
                  {(category.skills || []).map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex gap-2">
                      <Input
                        value={skill}
                        onChange={(e) => updateSkill(catIndex, skillIndex, e.target.value)}
                        placeholder="Skill name"
                        className="flex-1"
                      />
                      <Button
                        onClick={() => removeSkill(catIndex, skillIndex)}
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {(!data.categories || data.categories.length === 0) && (
          <p className="text-sm text-gray-500 text-center py-4">No categories yet. Add one to get started.</p>
        )}
      </div>
    </div>
  )
}

function AboutConfigForm({ data, onUpdate }: { data: AboutData; onUpdate: (updates: Partial<AboutData>) => void }) {
  const addHighlight = () => {
    onUpdate({ highlights: [...(data.highlights || []), ''] })
  }

  const updateHighlight = (index: number, value: string) => {
    const highlights = [...(data.highlights || [])]
    highlights[index] = value
    onUpdate({ highlights })
  }

  const removeHighlight = (index: number) => {
    const highlights = (data.highlights || []).filter((_, i) => i !== index)
    onUpdate({ highlights })
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Bio</Label>
        <Textarea
          value={data.bio || ''}
          onChange={(e) => onUpdate({ bio: e.target.value })}
          rows={5}
          placeholder="Tell your story..."
        />
      </div>
      <div>
        <Label>Image URL (optional)</Label>
        <Input
          type="url"
          value={data.imageUrl || ''}
          onChange={(e) => onUpdate({ imageUrl: e.target.value })}
          placeholder="https://example.com/image.jpg"
        />
      </div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <Label>Highlights</Label>
          <Button onClick={addHighlight} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
        <div className="space-y-2">
          {(data.highlights || []).map((highlight, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={highlight}
                onChange={(e) => updateHighlight(index, e.target.value)}
                placeholder="Highlight point"
              />
              <Button
                onClick={() => removeHighlight(index)}
                size="sm"
                variant="ghost"
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ExperienceConfigForm({ data, onUpdate }: { data: ExperienceData; onUpdate: (updates: Partial<ExperienceData>) => void }) {
  const addExperience = () => {
    const newExp = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      current: false,
    }
    onUpdate({ experiences: [...(data.experiences || []), newExp] })
  }

  const updateExperience = (id: string, updates: Partial<ExperienceData['experiences'][0]>) => {
    onUpdate({
      experiences: (data.experiences || []).map((exp) => (exp.id === id ? { ...exp, ...updates } : exp)),
    })
  }

  const removeExperience = (id: string) => {
    onUpdate({ experiences: (data.experiences || []).filter((exp) => exp.id !== id) })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>Work Experience</Label>
        <Button onClick={addExperience} size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-1" />
          Add Experience
        </Button>
      </div>
      <div className="space-y-4">
        {(data.experiences || []).map((exp) => (
          <Card key={exp.id}>
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-3">
                  <Input
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                    placeholder="Position/Title"
                  />
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                    placeholder="Company name"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="date"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                      placeholder="Start date"
                    />
                    {!exp.current && (
                      <Input
                        type="date"
                        value={exp.endDate || ''}
                        onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                        placeholder="End date"
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => updateExperience(exp.id, { current: e.target.checked, endDate: e.target.checked ? undefined : exp.endDate })}
                      className="rounded"
                      id={`current-${exp.id}`}
                    />
                    <Label htmlFor={`current-${exp.id}`} className="text-sm cursor-pointer">
                      Currently working here
                    </Label>
                  </div>
                  <Textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                    placeholder="Job description and achievements"
                    rows={4}
                  />
                </div>
                <Button
                  onClick={() => removeExperience(exp.id)}
                  size="sm"
                  variant="ghost"
                  className="text-red-600 hover:text-red-700 ml-2"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {(!data.experiences || data.experiences.length === 0) && (
          <p className="text-sm text-gray-500 text-center py-4">No experiences yet. Add one to get started.</p>
        )}
      </div>
    </div>
  )
}

function ContactConfigForm({ data, onUpdate }: { data: ContactData; onUpdate: (updates: Partial<ContactData>) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Email</Label>
        <Input
          type="email"
          value={data.email || ''}
          onChange={(e) => onUpdate({ email: e.target.value })}
          placeholder="your@email.com"
        />
      </div>
      <div>
        <Label>Phone (optional)</Label>
        <Input
          type="tel"
          value={data.phone || ''}
          onChange={(e) => onUpdate({ phone: e.target.value })}
          placeholder="+1 (555) 123-4567"
        />
      </div>
      <div>
        <Label>GitHub</Label>
        <Input
          type="url"
          value={data.social?.github || ''}
          onChange={(e) => onUpdate({ social: { ...data.social, github: e.target.value } })}
          placeholder="https://github.com/username"
        />
      </div>
      <div>
        <Label>LinkedIn</Label>
        <Input
          type="url"
          value={data.social?.linkedin || ''}
          onChange={(e) => onUpdate({ social: { ...data.social, linkedin: e.target.value } })}
          placeholder="https://linkedin.com/in/username"
        />
      </div>
      <div>
        <Label>Twitter/X (optional)</Label>
        <Input
          type="url"
          value={data.social?.twitter || ''}
          onChange={(e) => onUpdate({ social: { ...data.social, twitter: e.target.value } })}
          placeholder="https://twitter.com/username"
        />
      </div>
    </div>
  )
}


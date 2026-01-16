import type { Section, Portfolio, HeroData, ProjectsData, SkillsData, AboutData, ExperienceData, ContactData, GalleryData } from '@/interfaces/Portfolio'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { ImageUpload } from '@/components/ui/image-upload'
import { Plus, Trash2, Grid, LayoutGrid, Image, AlertCircle } from 'lucide-react'

const validateUrl = (url: string) => {
  if (!url || url.startsWith('#')) return true
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

function CharacterCount({ current, max }: { current: number; max: number }) {
  const isOver = current > max
  return (
    <span className={`text-[10px] tabular-nums ${isOver ? 'text-red-500 font-bold' : 'text-gray-400'}`}>
      {current}/{max}
    </span>
  )
}

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
    case 'gallery':
      return <GalleryConfigForm data={section.data as GalleryData} onUpdate={updateData} />
    default:
      return <div className="text-sm text-gray-500">No configuration available</div>
  }
}

function HeroConfigForm({ data, onUpdate }: { data: HeroData; onUpdate: (updates: Partial<HeroData>) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-center mb-1">
          <Label>Name</Label>
          <CharacterCount current={(data.name || '').length} max={50} />
        </div>
        <Input
          type="text"
          value={data.name || ''}
          onChange={(e) => onUpdate({ name: e.target.value })}
          placeholder="Your name"
        />
      </div>
      <div>
        <div className="flex justify-between items-center mb-1">
          <Label>Title</Label>
          <CharacterCount current={(data.title || '').length} max={100} />
        </div>
        <Input
          type="text"
          value={data.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Your job title"
        />
      </div>
      <div>
        <div className="flex justify-between items-center mb-1">
          <Label>Description</Label>
          <CharacterCount current={(data.description || '').length} max={500} />
        </div>
        <Textarea
          value={data.description || ''}
          onChange={(e) => onUpdate({ description: e.target.value })}
          rows={3}
          placeholder="A brief description about yourself"
        />
      </div>
      <div>
        <div className="flex justify-between items-center mb-1">
          <Label>CTA Text</Label>
          <CharacterCount current={(data.ctaText || '').length} max={30} />
        </div>
        <Input
          type="text"
          value={data.ctaText || ''}
          onChange={(e) => onUpdate({ ctaText: e.target.value })}
          placeholder="Get Started"
        />
      </div>
      <div>
        <div className="flex justify-between items-center mb-1">
          <Label>CTA Link</Label>
          {!validateUrl(data.ctaLink || '') && (
            <span className="text-[10px] text-red-500 flex items-center gap-1">
              <AlertCircle size={10} /> Invalid URL
            </span>
          )}
        </div>
        <Input
          type="text"
          value={data.ctaLink || ''}
          onChange={(e) => onUpdate({ ctaLink: e.target.value })}
          placeholder="# or URL"
          className={!validateUrl(data.ctaLink || '') ? 'border-red-500 focus:ring-red-500' : ''}
        />
      </div>
      <div>
        <Label>Profile Image</Label>
        <p className="text-xs text-gray-500 mb-2">
          Upload a photo or paste an image URL
        </p>
        <ImageUpload
          value={data.imageUrl || ''}
          onChange={(url) => onUpdate({ imageUrl: url })}
          aspectRatio="square"
          placeholder="Drag & drop your profile photo"
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
          <div key={project.id} className="border border-gray-200 rounded-lg p-3 space-y-3">
            <div className="flex justify-between items-center mb-1">
              <CharacterCount current={(project.title || '').length} max={100} />
            </div>
            <Input
              value={project.title}
              onChange={(e) => updateProject(project.id, { title: e.target.value })}
              placeholder="Project title"
              className="text-sm"
            />
            <div className="flex justify-between items-center mb-1">
              <CharacterCount current={(project.description || '').length} max={300} />
            </div>
            <Textarea
              value={project.description}
              onChange={(e) => updateProject(project.id, { description: e.target.value })}
              placeholder="Description"
              rows={2}
              className="text-sm"
            />
            <div>
              <Label className="text-xs text-gray-500 mb-1.5 block">Project Image</Label>
              <ImageUpload
                value={project.imageUrl || ''}
                onChange={(url) => updateProject(project.id, { imageUrl: url })}
                aspectRatio="video"
                placeholder="Add project screenshot"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Input
                  type="url"
                  value={project.liveUrl || ''}
                  onChange={(e) => updateProject(project.id, { liveUrl: e.target.value })}
                  placeholder="Live URL"
                  className={`text-sm ${!validateUrl(project.liveUrl || '') ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                {!validateUrl(project.liveUrl || '') && <span className="text-[10px] text-red-500 flex items-center gap-1"><AlertCircle size={10} /> Invalid URL</span>}
              </div>
              <div className="space-y-1">
                <Input
                  type="url"
                  value={project.githubUrl || ''}
                  onChange={(e) => updateProject(project.id, { githubUrl: e.target.value })}
                  placeholder="GitHub URL"
                  className={`text-sm ${!validateUrl(project.githubUrl || '') ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                {!validateUrl(project.githubUrl || '') && <span className="text-[10px] text-red-500 flex items-center gap-1"><AlertCircle size={10} /> Invalid URL</span>}
              </div>
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

  const updateSocialLink = (platform: string, value: string) => {
    onUpdate({
      social: {
        ...(data.social || {}),
        [platform]: value,
      },
    })
  }

  const updateCTAButton = (type: 'primary' | 'secondary', field: 'text' | 'link', value: string) => {
    onUpdate({
      ctaButtons: {
        ...(data.ctaButtons || {}),
        [type]: {
          ...(data.ctaButtons?.[type] || { text: '', link: '' }),
          [field]: value,
        },
      },
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <Label>Professional Title/Subtitle (for Variant B)</Label>
        <Input
          value={data.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="e.g., I am Professional User Experience Designer"
        />
        <p className="text-xs text-gray-500 mt-1">
          This appears as a subtitle below "About" heading
        </p>
      </div>
      <div>
        <div className="flex justify-between items-center mb-1">
          <Label>Bio</Label>
          <CharacterCount current={(data.bio || '').length} max={1000} />
        </div>
        <Textarea
          value={data.bio || ''}
          onChange={(e) => onUpdate({ bio: e.target.value })}
          rows={5}
          placeholder="Tell your story..."
        />
      </div>
      <div>
        <Label>About Image</Label>
        <p className="text-xs text-gray-500 mb-2">
          Upload a photo for your about section
        </p>
        <ImageUpload
          value={data.imageUrl || ''}
          onChange={(url) => onUpdate({ imageUrl: url })}
          aspectRatio="portrait"
          placeholder="Drag & drop your photo"
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

      {/* Social Links */}
      <div>
        <Label className="mb-3 block">Social Media Links (for Variant B)</Label>
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-gray-500 mb-1">Facebook</Label>
            <Input
              type="url"
              value={data.social?.facebook || ''}
              onChange={(e) => updateSocialLink('facebook', e.target.value)}
              placeholder="https://facebook.com/username"
            />
          </div>
          <div>
            <Label className="text-xs text-gray-500 mb-1">Dribbble</Label>
            <Input
              type="url"
              value={data.social?.dribbble || ''}
              onChange={(e) => updateSocialLink('dribbble', e.target.value)}
              placeholder="https://dribbble.com/username"
            />
          </div>
          <div>
            <Label className="text-xs text-gray-500 mb-1">Instagram</Label>
            <Input
              type="url"
              value={data.social?.instagram || ''}
              onChange={(e) => updateSocialLink('instagram', e.target.value)}
              placeholder="https://instagram.com/username"
            />
          </div>
          <div>
            <Label className="text-xs text-gray-500 mb-1">LinkedIn</Label>
            <Input
              type="url"
              value={data.social?.linkedin || ''}
              onChange={(e) => updateSocialLink('linkedin', e.target.value)}
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          <div>
            <Label className="text-xs text-gray-500 mb-1">Behance</Label>
            <Input
              type="url"
              value={data.social?.behance || ''}
              onChange={(e) => updateSocialLink('behance', e.target.value)}
              placeholder="https://behance.net/username"
            />
          </div>
          <div>
            <Label className="text-xs text-gray-500 mb-1">Twitter/X</Label>
            <Input
              type="url"
              value={data.social?.twitter || ''}
              onChange={(e) => updateSocialLink('twitter', e.target.value)}
              placeholder="https://twitter.com/username"
            />
          </div>
          <div>
            <Label className="text-xs text-gray-500 mb-1">GitHub</Label>
            <Input
              type="url"
              value={data.social?.github || ''}
              onChange={(e) => updateSocialLink('github', e.target.value)}
              placeholder="https://github.com/username"
            />
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div>
        <Label className="mb-3 block">Call-to-Action Buttons (for Variant B)</Label>
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4 space-y-3">
              <Label className="text-sm font-semibold">Primary Button</Label>
              <Input
                value={data.ctaButtons?.primary?.text || ''}
                onChange={(e) => updateCTAButton('primary', 'text', e.target.value)}
                placeholder="Button text (e.g., My Projects)"
              />
              <Input
                type="url"
                value={data.ctaButtons?.primary?.link || ''}
                onChange={(e) => updateCTAButton('primary', 'link', e.target.value)}
                placeholder="Button link URL"
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 space-y-3">
              <Label className="text-sm font-semibold">Secondary Button</Label>
              <Input
                value={data.ctaButtons?.secondary?.text || ''}
                onChange={(e) => updateCTAButton('secondary', 'text', e.target.value)}
                placeholder="Button text (e.g., Download CV)"
              />
              <Input
                type="url"
                value={data.ctaButtons?.secondary?.link || ''}
                onChange={(e) => updateCTAButton('secondary', 'link', e.target.value)}
                placeholder="Button link URL"
              />
            </CardContent>
          </Card>
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
                  <div className="flex justify-between items-center mb-1">
                    <Label>Position/Title</Label>
                    <CharacterCount current={(exp.position || '').length} max={100} />
                  </div>
                  <Input
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                    placeholder="Position/Title"
                  />
                  <div className="flex justify-between items-center mb-1">
                    <Label>Company name</Label>
                    <CharacterCount current={(exp.company || '').length} max={100} />
                  </div>
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
                  <div className="flex justify-between items-center mb-1">
                    <Label>Description</Label>
                    <CharacterCount current={(exp.description || '').length} max={500} />
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
        <div className="flex justify-between items-center mb-1">
          <Label>Email</Label>
          {!validateUrl(`mailto:${data.email}`) && data.email && !data.email.includes('@') && (
            <span className="text-[10px] text-red-500 flex items-center gap-1"><AlertCircle size={10} /> Invalid Email</span>
          )}
        </div>
        <Input
          type="email"
          value={data.email || ''}
          onChange={(e) => onUpdate({ email: e.target.value })}
          placeholder="your@email.com"
          className={data.email && !data.email.includes('@') ? 'border-red-500' : ''}
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
        <Label>Profile Image</Label>
        <p className="text-xs text-gray-500 mb-2">
          Upload a profile photo to display in the contact section
        </p>
        <ImageUpload
          value={data.imageUrl || ''}
          onChange={(url) => onUpdate({ imageUrl: url })}
          aspectRatio="square"
          placeholder="Drag & drop your profile photo"
        />
      </div>
      <div>
        <div className="flex justify-between items-center mb-1">
          <Label>Bio (optional)</Label>
          <CharacterCount current={(data.bio || '').length} max={300} />
        </div>
        <Textarea
          value={data.bio || ''}
          onChange={(e) => onUpdate({ bio: e.target.value })}
          placeholder="A brief bio about yourself"
          rows={3}
        />
        <p className="text-xs text-gray-500 mt-1">
          This will appear below your profile image
        </p>
      </div>
      <div>
        <div className="flex justify-between items-center mb-1">
          <Label>GitHub</Label>
          {!validateUrl(data.social?.github || '') && data.social?.github && (
            <span className="text-[10px] text-red-500 flex items-center gap-1"><AlertCircle size={10} /> Invalid URL</span>
          )}
        </div>
        <Input
          type="url"
          value={data.social?.github || ''}
          onChange={(e) => onUpdate({ social: { ...data.social, github: e.target.value } })}
          placeholder="https://github.com/username"
          className={!validateUrl(data.social?.github || '') && data.social?.github ? 'border-red-500' : ''}
        />
      </div>
      <div>
        <div className="flex justify-between items-center mb-1">
          <Label>LinkedIn</Label>
          {!validateUrl(data.social?.linkedin || '') && data.social?.linkedin && (
            <span className="text-[10px] text-red-500 flex items-center gap-1"><AlertCircle size={10} /> Invalid URL</span>
          )}
        </div>
        <Input
          type="url"
          value={data.social?.linkedin || ''}
          onChange={(e) => onUpdate({ social: { ...data.social, linkedin: e.target.value } })}
          placeholder="https://linkedin.com/in/username"
          className={!validateUrl(data.social?.linkedin || '') && data.social?.linkedin ? 'border-red-500' : ''}
        />
      </div>
      <div>
        <div className="flex justify-between items-center mb-1">
          <Label>Twitter/X (optional)</Label>
          {!validateUrl(data.social?.twitter || '') && data.social?.twitter && (
            <span className="text-[10px] text-red-500 flex items-center gap-1"><AlertCircle size={10} /> Invalid URL</span>
          )}
        </div>
        <Input
          type="url"
          value={data.social?.twitter || ''}
          onChange={(e) => onUpdate({ social: { ...data.social, twitter: e.target.value } })}
          placeholder="https://twitter.com/username"
          className={!validateUrl(data.social?.twitter || '') && data.social?.twitter ? 'border-red-500' : ''}
        />
      </div>
    </div>
  )
}

function GalleryConfigForm({ data, onUpdate }: { data: GalleryData; onUpdate: (updates: Partial<GalleryData>) => void }) {
  const addImage = () => {
    const newImage = {
      id: crypto.randomUUID(),
      url: '',
      title: '',
      description: '',
      category: data.categories?.[0] || '',
    }
    onUpdate({ images: [...(data.images || []), newImage] })
  }

  const updateImage = (id: string, updates: Partial<GalleryData['images'][0]>) => {
    onUpdate({
      images: (data.images || []).map((img) => (img.id === id ? { ...img, ...updates } : img)),
    })
  }

  const removeImage = (id: string) => {
    onUpdate({ images: (data.images || []).filter((img) => img.id !== id) })
  }

  const layouts = [
    { value: 'masonry', label: 'Masonry', icon: LayoutGrid },
    { value: 'grid', label: 'Grid', icon: Grid },
    { value: 'carousel', label: 'Featured', icon: Image },
  ] as const

  return (
    <div className="space-y-6">
      {/* Gallery Title & Description */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <Label>Gallery Title</Label>
            <CharacterCount current={(data.title || '').length} max={100} />
          </div>
          <Input
            value={data.title || ''}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="My Gallery"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <Label>Description</Label>
            <CharacterCount current={(data.description || '').length} max={300} />
          </div>
          <Textarea
            value={data.description || ''}
            onChange={(e) => onUpdate({ description: e.target.value })}
            placeholder="A brief description of your work"
            rows={2}
          />
        </div>
      </div>

      {/* Layout Selection */}
      <div>
        <Label className="mb-3 block">Layout Style</Label>
        <div className="grid grid-cols-3 gap-2">
          {layouts.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => onUpdate({ layout: value })}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                data.layout === value
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <Label className="mb-2 block">Categories (comma-separated)</Label>
        <Input
          value={(data.categories || []).join(', ')}
          onChange={(e) => {
            const cats = e.target.value.split(',').map((c) => c.trim()).filter(Boolean)
            // Always include 'All' at the start
            const uniqueCats = ['All', ...cats.filter((c) => c !== 'All')]
            onUpdate({ categories: uniqueCats })
          }}
          placeholder="Portrait, Landscape, Street"
        />
        <p className="text-xs text-gray-500 mt-1">"All" category is added automatically</p>
      </div>

      {/* Images */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <Label>Gallery Images</Label>
          <Button onClick={addImage} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-1" />
            Add Image
          </Button>
        </div>
        <div className="space-y-4">
          {(data.images || []).map((image, index) => (
            <Card key={image.id}>
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-500">Image {index + 1}</span>
                  <Button
                    onClick={() => removeImage(image.id)}
                    size="sm"
                    variant="ghost"
                    className="text-red-600 hover:text-red-700 h-7"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <ImageUpload
                  value={image.url || ''}
                  onChange={(url) => updateImage(image.id, { url })}
                  aspectRatio="video"
                  placeholder="Upload gallery image"
                />
                <Input
                  value={image.title || ''}
                  onChange={(e) => updateImage(image.id, { title: e.target.value })}
                  placeholder="Image title"
                  className="text-sm"
                />
                <Input
                  value={image.description || ''}
                  onChange={(e) => updateImage(image.id, { description: e.target.value })}
                  placeholder="Image description"
                  className="text-sm"
                />
                {data.categories && data.categories.length > 1 && (
                  <select
                    value={image.category || ''}
                    onChange={(e) => updateImage(image.id, { category: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select category</option>
                    {data.categories.filter((c) => c !== 'All').map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                )}
              </CardContent>
            </Card>
          ))}
          {(!data.images || data.images.length === 0) && (
            <p className="text-sm text-gray-500 text-center py-4">No images yet. Add one to get started.</p>
          )}
        </div>
      </div>
    </div>
  )
}

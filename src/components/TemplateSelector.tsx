import { useState } from 'react'
import { portfolioTemplates, type PortfolioTemplate } from '@/lib/templates'
import { Code2, Palette, Camera, Plus, Check, X, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TemplateSelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (template: PortfolioTemplate, title: string) => void
}

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Palette,
  Camera,
  Plus,
}

export function TemplateSelector({ isOpen, onClose, onSelect }: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<PortfolioTemplate | null>(null)
  const [portfolioTitle, setPortfolioTitle] = useState('')
  const [step, setStep] = useState<'select' | 'configure'>('select')

  if (!isOpen) return null

  const handleTemplateSelect = (template: PortfolioTemplate) => {
    setSelectedTemplate(template)
    setStep('configure')
    setPortfolioTitle(template.id === 'blank' ? 'My Portfolio' : `My ${template.name} Portfolio`)
  }

  const handleBack = () => {
    setStep('select')
    setSelectedTemplate(null)
  }

  const handleCreate = () => {
    if (selectedTemplate && portfolioTitle.trim()) {
      onSelect(selectedTemplate, portfolioTitle.trim())
      // Reset state
      setSelectedTemplate(null)
      setPortfolioTitle('')
      setStep('select')
    }
  }

  const handleClose = () => {
    setSelectedTemplate(null)
    setPortfolioTitle('')
    setStep('select')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-900 rounded-none sm:rounded-2xl shadow-2xl w-full sm:max-w-5xl h-full sm:h-auto sm:max-h-[90vh] overflow-hidden sm:mx-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-800 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-black flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white truncate">
                {step === 'select' ? 'Choose a Template' : 'Configure Your Portfolio'}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                {step === 'select'
                  ? 'Start with a professionally designed template'
                  : 'Customize your portfolio details'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {step === 'select' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {portfolioTemplates.map((template) => {
                const IconComponent = iconMap[template.icon] || Plus
                const isSelected = selectedTemplate?.id === template.id

                return (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateSelect(template)}
                    className={cn(
                      'group relative text-left rounded-2xl border transition-all duration-300 overflow-hidden',
                      'hover:shadow-xl hover:scale-[1.02] hover:border-black/60',
                      isSelected
                        ? 'border-black shadow-lg'
                        : 'border-gray-200 dark:border-gray-700',
                    )}
                  >
                    {/* Preview Area */}
                    <div
                      className="h-32 sm:h-40 relative"
                      style={{ background: template.preview }}
                    >
                      {/* Overlay pattern for visual interest */}
                      <div className="absolute inset-0 opacity-10">
                        <div
                          className="w-full h-full"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                          }}
                        />
                      </div>

                      {/* Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className={cn(
                            'w-16 h-16 rounded-2xl flex items-center justify-center',
                            'bg-white/20 backdrop-blur-sm',
                            'group-hover:scale-110 transition-transform duration-300',
                          )}
                        >
                          <IconComponent
                            className={cn(
                              'w-8 h-8',
                              template.theme.mode === 'dark' ? 'text-white' : 'text-gray-800',
                            )}
                          />
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={cn(
                            'px-3 py-1 rounded-full text-xs font-medium',
                            'bg-white/90 dark:bg-black/50 backdrop-blur-sm',
                            template.theme.mode === 'dark'
                              ? 'text-gray-800 dark:text-white'
                              : 'text-gray-800',
                          )}
                        >
                          {template.category === 'blank' ? 'Custom' : template.category}
                        </span>
                      </div>

                      {/* Selection indicator */}
                      {isSelected && (
                        <div className="absolute top-3 right-3">
                          <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-5 bg-white dark:bg-gray-900">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {template.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        {template.description}
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2">
                        {template.features.slice(0, 3).map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                          >
                            {feature}
                          </span>
                        ))}
                        {template.features.length > 3 && (
                          <span className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500">
                            +{template.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          ) : (
            /* Configuration Step */
            <div className="max-w-xl mx-auto">
              {selectedTemplate && (
                <div className="space-y-8">
                  {/* Selected Template Preview */}
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center"
                      style={{ background: selectedTemplate.preview }}
                    >
                      {(() => {
                        const IconComponent = iconMap[selectedTemplate.icon] || Plus
                        return (
                          <IconComponent
                            className={cn(
                              'w-8 h-8',
                              selectedTemplate.theme.mode === 'dark'
                                ? 'text-white'
                                : 'text-gray-800',
                            )}
                          />
                        )
                      })()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {selectedTemplate.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedTemplate.sections.length} pre-configured sections
                      </p>
                    </div>
                  </div>

                  {/* Portfolio Title Input */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Portfolio Title
                    </label>
                    <input
                      type="text"
                      value={portfolioTitle}
                      onChange={(e) => setPortfolioTitle(e.target.value)}
                      placeholder="Enter your portfolio title"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-black transition-all"
                      autoFocus
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      You can change this anytime in the builder
                    </p>
                  </div>

                  {/* Theme Preview */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Theme Preview
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-2">
                        <div
                          className="w-full h-12 rounded-lg"
                          style={{ backgroundColor: selectedTemplate.theme.primaryColor }}
                        />
                        <p className="text-xs text-center text-gray-500">Primary</p>
                      </div>
                      {selectedTemplate.theme.secondaryColor && (
                        <div className="space-y-2">
                          <div
                            className="w-full h-12 rounded-lg"
                            style={{ backgroundColor: selectedTemplate.theme.secondaryColor }}
                          />
                          <p className="text-xs text-center text-gray-500">Secondary</p>
                        </div>
                      )}
                      {selectedTemplate.theme.accentColor && (
                        <div className="space-y-2">
                          <div
                            className="w-full h-12 rounded-lg"
                            style={{ backgroundColor: selectedTemplate.theme.accentColor }}
                          />
                          <p className="text-xs text-center text-gray-500">Accent</p>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Colors and fonts can be customized in the theme settings
                    </p>
                  </div>

                  {/* Included Sections */}
                  {selectedTemplate.sections.length > 0 && (
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Included Sections
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {selectedTemplate.sections.map((section, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 capitalize"
                          >
                            {section.type}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 shrink-0">
          {step === 'configure' ? (
            <>
              <button
                onClick={handleBack}
                className="px-4 py-2.5 text-gray-900 bg-gray-200 dark:bg-gray-800 rounded-xl dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors text-center"
              >
                ← Back to Templates
              </button>
              <button
                onClick={handleCreate}
                disabled={!portfolioTitle.trim()}
                className={cn(
                  'px-6 py-2.5 rounded-xl font-medium text-sm transition-all',
                  'bg-black text-white',
                  'hover:bg-gray-900 hover:shadow-lg',
                  'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none',
                )}
              >
                Create Portfolio →
              </button>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">
                Select a template to get started
              </p>
              <button
                onClick={handleClose}
                className="px-4 py-2.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors bg-gray-200 dark:bg-gray-700 rounded-xl sm:bg-transparent sm:dark:bg-transparent"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}


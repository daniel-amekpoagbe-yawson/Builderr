import type { Section, Portfolio } from '@/interfaces/Portfolio'
import { Trash2, Eye, EyeOff } from 'lucide-react'
import { VariantSelector } from './VariantSelector'
import { SectionConfigForm } from './SectionConfigForm'

interface ConfigPanelProps {
  section: Section
  portfolio: Portfolio
  onUpdate: (updates: Partial<Section>) => void
  onDelete: () => void
}

export function ConfigPanel({ section, portfolio, onUpdate, onDelete }: ConfigPanelProps) {
  const variants = getVariantsForSection(section.type)

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 capitalize">{section.type} Section</h3>
          <button
            onClick={onDelete}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete section"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onUpdate({ enabled: !section.enabled })}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              section.enabled
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {section.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span className="text-sm">{section.enabled ? 'Enabled' : 'Disabled'}</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Variant</label>
          <VariantSelector
            sectionType={section.type}
            currentVariant={section.variant}
            variants={variants}
            onSelect={(variant) => onUpdate({ variant })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Content</label>
          <SectionConfigForm section={section} portfolio={portfolio} onUpdate={onUpdate} />
        </div>
      </div>
    </div>
  )
}

function getVariantsForSection(type: Section['type']): string[] {
  switch (type) {
    case 'hero':
      return ['A', 'B', 'C']
    case 'projects':
      return ['A', 'B']
    case 'skills':
      return ['A', 'B']
    case 'about':
    case 'experience':
    case 'contact':
      return ['A']
    default:
      return ['A']
  }
}


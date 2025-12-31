import type { SectionType } from '@/interfaces/Portfolio'

interface VariantSelectorProps {
  sectionType: SectionType
  currentVariant: string
  variants: string[]
  onSelect: (variant: string) => void
}

export function VariantSelector({ currentVariant, variants, onSelect }: VariantSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {variants.map((variant) => (
        <button
          key={variant}
          onClick={() => onSelect(variant)}
          className={`relative aspect-video rounded-lg border-2 transition-all ${
            currentVariant === variant
              ? 'border-indigo-600 ring-2 ring-indigo-200'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded">
            <span className="text-2xl font-bold text-gray-400">{variant}</span>
          </div>
          {currentVariant === variant && (
            <div className="absolute top-1 right-1 w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          )}
        </button>
      ))}
    </div>
  )
}


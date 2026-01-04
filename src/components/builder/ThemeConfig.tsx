import type { Portfolio, FontFamily } from '@/interfaces/Portfolio'
import { Moon, Sun, Palette, Type, Navigation } from 'lucide-react'

interface ThemeConfigProps {
  theme: Portfolio['theme']
  onUpdate: (theme: Partial<Portfolio['theme']>) => void
}

const fontOptions: { value: FontFamily; label: string; preview: string }[] = [
  { value: 'inter', label: 'Inter', preview: "'Inter', sans-serif" },
  { value: 'roboto', label: 'Roboto', preview: "'Roboto', sans-serif" },
  { value: 'poppins', label: 'Poppins', preview: "'Poppins', sans-serif" },
  { value: 'dm-sans', label: 'DM Sans', preview: "'DM Sans', sans-serif" },
  { value: 'space-grotesk', label: 'Space Grotesk', preview: "'Space Grotesk', sans-serif" },
  { value: 'playfair', label: 'Playfair Display', preview: "'Playfair Display', serif" },
  { value: 'source-serif', label: 'Source Serif', preview: "'Source Serif Pro', serif" },
  { value: 'jetbrains-mono', label: 'JetBrains Mono', preview: "'JetBrains Mono', monospace" },
]

const colorPresets = [
  { color: '#4f46e5', name: 'Indigo' },
  { color: '#3b82f6', name: 'Blue' },
  { color: '#10b981', name: 'Emerald' },
  { color: '#ec4899', name: 'Pink' },
  { color: '#8b5cf6', name: 'Violet' },
  { color: '#f59e0b', name: 'Amber' },
  { color: '#ef4444', name: 'Red' },
  { color: '#06b6d4', name: 'Cyan' },
]

export function ThemeConfig({ theme, onUpdate }: ThemeConfigProps) {
  return (
    <div className="space-y-6">
      {/* Theme Mode */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <Sun className="w-4 h-4" />
          Theme Mode
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => onUpdate({ mode: 'light' })}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${
              theme.mode === 'light'
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm'
                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            <Sun className="w-4 h-4" />
            Light
          </button>
          <button
            onClick={() => onUpdate({ mode: 'dark' })}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${
              theme.mode === 'dark'
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm'
                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            <Moon className="w-4 h-4" />
            Dark
          </button>
        </div>
      </div>

      {/* Primary Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Primary Color
        </label>
        <div className="flex gap-2 mb-3">
          <div className="relative">
            <input
              type="color"
              value={theme.primaryColor}
              onChange={(e) => onUpdate({ primaryColor: e.target.value })}
              className="w-12 h-12 rounded-xl border-2 border-gray-200 cursor-pointer appearance-none bg-transparent"
              style={{ backgroundColor: theme.primaryColor }}
            />
          </div>
          <input
            type="text"
            value={theme.primaryColor}
            onChange={(e) => onUpdate({ primaryColor: e.target.value })}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm font-mono"
            placeholder="#4f46e5"
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {colorPresets.map(({ color, name }) => (
            <button
              key={color}
              onClick={() => onUpdate({ primaryColor: color })}
              className={`group relative h-10 rounded-lg border-2 transition-all hover:scale-105 ${
                theme.primaryColor === color
                  ? 'border-gray-900 ring-2 ring-offset-2 ring-gray-400'
                  : 'border-transparent hover:border-gray-300'
              }`}
              style={{ backgroundColor: color }}
              title={name}
            >
              <span className="sr-only">{name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Secondary Color (optional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Secondary Color
          <span className="text-gray-400 font-normal ml-1">(optional)</span>
        </label>
        <div className="flex gap-2">
          <div className="relative">
            <input
              type="color"
              value={theme.secondaryColor || theme.primaryColor}
              onChange={(e) => onUpdate({ secondaryColor: e.target.value })}
              className="w-12 h-12 rounded-xl border-2 border-gray-200 cursor-pointer appearance-none bg-transparent"
              style={{ backgroundColor: theme.secondaryColor || theme.primaryColor }}
            />
          </div>
          <input
            type="text"
            value={theme.secondaryColor || ''}
            onChange={(e) => onUpdate({ secondaryColor: e.target.value || undefined })}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm font-mono"
            placeholder="Same as primary"
          />
        </div>
      </div>

      {/* Font Family */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <Type className="w-4 h-4" />
          Font Family
        </label>
        <div className="grid grid-cols-2 gap-2">
          {fontOptions.map(({ value, label, preview }) => (
            <button
              key={value}
              onClick={() => onUpdate({ fontFamily: value })}
              className={`px-3 py-2.5 rounded-lg border-2 transition-all text-left ${
                theme.fontFamily === value
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300'
              }`}
              style={{ fontFamily: preview }}
            >
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Navbar Style */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <Navigation className="w-4 h-4" />
          Navbar Style
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => onUpdate({ navbarVariant: 'default' })}
            className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all ${
              (theme.navbarVariant || 'default') === 'default'
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm'
                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            <div className="text-sm font-medium">Standard</div>
            <div className="text-xs opacity-70 mt-0.5">Sticky top</div>
          </button>
          <button
            onClick={() => onUpdate({ navbarVariant: 'A' })}
            className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all ${
              theme.navbarVariant === 'A'
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm'
                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            <div className="text-sm font-medium">Floating</div>
            <div className="text-xs opacity-70 mt-0.5">Glassmorphism</div>
          </button>
          <button
            onClick={() => onUpdate({ navbarVariant: 'B' })}
            className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all ${
              theme.navbarVariant === 'B'
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm'
                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            <div className="text-sm font-medium">Retro</div>
            <div className="text-xs opacity-70 mt-0.5">Brutalist</div>
          </button>
        </div>
      </div>
    </div>
  )
}

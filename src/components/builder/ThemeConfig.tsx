import type { Portfolio } from '@/interfaces/Portfolio'
import { Moon, Sun, Palette, Type, Navigation } from 'lucide-react'

interface ThemeConfigProps {
  theme: Portfolio['theme']
  onUpdate: (theme: Partial<Portfolio['theme']>) => void
}

export function ThemeConfig({ theme, onUpdate }: ThemeConfigProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <Sun className="w-4 h-4" />
          Theme Mode
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => onUpdate({ mode: 'light' })}
            className={`flex-1 px-4 py-2 rounded-lg border-2 transition-colors ${
              theme.mode === 'light'
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Light
          </button>
          <button
            onClick={() => onUpdate({ mode: 'dark' })}
            className={`flex-1 px-4 py-2 rounded-lg border-2 transition-colors ${
              theme.mode === 'dark'
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Moon className="w-4 h-4 inline mr-2" />
            Dark
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Primary Color
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={theme.primaryColor}
            onChange={(e) => onUpdate({ primaryColor: e.target.value })}
            className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={theme.primaryColor}
            onChange={(e) => onUpdate({ primaryColor: e.target.value })}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-transparent"
            placeholder="#4f46e5"
          />
        </div>
        <div className="mt-2 flex gap-2 flex-wrap">
          {['#4f46e5', '#dc2626', '#059669', '#ea580c', '#7c3aed', '#be185d'].map((color) => (
            <button
              key={color}
              onClick={() => onUpdate({ primaryColor: color })}
              className="w-8 h-8 rounded border-2 border-gray-300 hover:border-gray-400 transition-colors"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <Type className="w-4 h-4" />
          Font Family
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => onUpdate({ fontFamily: 'inter' })}
            className={`flex-1 px-4 py-2 rounded-lg border-2 transition-colors ${
              theme.fontFamily === 'inter'
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Inter
          </button>
          <button
            onClick={() => onUpdate({ fontFamily: 'roboto' })}
            className={`flex-1 px-4 py-2 rounded-lg border-2 transition-colors ${
              theme.fontFamily === 'roboto'
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            Roboto
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <Navigation className="w-4 h-4" />
          Navbar Style
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => onUpdate({ navbarVariant: 'default' })}
            className={`flex-1 px-4 py-2 rounded-lg border-2 transition-colors ${
              (theme.navbarVariant || 'default') === 'default'
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Default
          </button>
          <button
            onClick={() => onUpdate({ navbarVariant: 'A' })}
            className={`flex-1 px-4 py-2 rounded-lg border-2 transition-colors ${
              theme.navbarVariant === 'A'
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Floating
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {theme.navbarVariant === 'A'
            ? 'Floating navbar with glassmorphism effect'
            : 'Standard sticky navbar'}
        </p>
      </div>
    </div>
  )
}


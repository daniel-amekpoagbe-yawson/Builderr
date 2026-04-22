import type { Section, SectionType } from '@/interfaces/Portfolio'
import React, { useState } from 'react'
import {
  GripVertical,
  Target,
  User,
  Briefcase,
  Wrench,
  Calendar,
  Image as ImageIcon,
  Mail,
  FileText,
  Eye,
  EyeOff,
  Search,
} from 'lucide-react'
import { useSortable } from '@dnd-kit/sortable'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { usePortfolioStore } from '@/store/portfolio.store'

interface SectionSidebarProps {
  sections: Section[]
  selectedSectionId: string | null
  onSelectSection: (id: string) => void
  onAddSection: (type: SectionType) => void
}

const sectionTypes: {
  type: SectionType
  label: string
  icon: React.ElementType
}[] = [
  { type: 'hero', label: 'Hero', icon: Target },
  { type: 'about', label: 'About', icon: User },
  { type: 'projects', label: 'Projects', icon: Briefcase },
  { type: 'skills', label: 'Skills', icon: Wrench },
  { type: 'experience', label: 'Experience', icon: Calendar },
  { type: 'gallery', label: 'Gallery', icon: ImageIcon },
  { type: 'contact', label: 'Contact', icon: Mail },
]

function SectionItem({
  section,
  isSelected,
  onSelect,
  onToggleEnabled,
}: {
  section: Section
  isSelected: boolean
  onSelect: () => void
  onToggleEnabled: (e: React.MouseEvent) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: section.id,
    })

  const style = {
    transform: transform ? `translateY(${transform.y}px)` : undefined,
    transition,
  }

  const sectionType = sectionTypes.find((st) => st.type === section.type)
  const IconComponent = sectionType?.icon || FileText

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onSelect}
      className={`flex items-center gap-2.5 p-2.5 rounded-lg cursor-pointer transition-colors group ${
        isSelected
          ? 'bg-indigo-50 border-2 border-indigo-500'
          : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
      } ${!section.enabled ? 'opacity-50' : ''}`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="w-4 h-4 text-gray-400" />
      </div>
      <div
        className={`flex-shrink-0 ${isSelected ? 'text-indigo-600' : 'text-gray-500'}`}
      >
        <IconComponent className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm text-gray-900 truncate">
          {sectionType?.label || section.type}
        </div>
        <div className="text-[10px] text-gray-400">Variant {section.variant}</div>
      </div>
      {/* Quick enable/disable toggle */}
      <button
        onClick={onToggleEnabled}
        className={`p-1 rounded transition-colors opacity-0 group-hover:opacity-100 ${
          section.enabled
            ? 'text-green-600 hover:bg-green-50'
            : 'text-gray-400 hover:bg-gray-200'
        }`}
        title={section.enabled ? 'Disable section' : 'Enable section'}
      >
        {section.enabled ? (
          <Eye className="w-3.5 h-3.5" />
        ) : (
          <EyeOff className="w-3.5 h-3.5" />
        )}
      </button>
      {!section.enabled && (
        <span className="text-[10px] text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded">
          Off
        </span>
      )}
    </div>
  )
}

export function SectionSidebar({
  sections,
  selectedSectionId,
  onSelectSection,
  onAddSection,
}: SectionSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id)
      const newIndex = sections.findIndex((s) => s.id === over.id)
      usePortfolioStore.getState().reorderSections(oldIndex, newIndex)
    }
  }

  const handleToggleEnabled = (sectionId: string, e: React.MouseEvent) => {
    e.stopPropagation() // Don't select the section when toggling
    const section = sections.find((s) => s.id === sectionId)
    if (section) {
      usePortfolioStore.getState().updateSection(sectionId, { enabled: !section.enabled })
    }
  }

  const sortedSections = [...sections].sort((a, b) => a.order - b.order)

  // Filter section "Add" buttons by search query
  const filteredSectionTypes = searchQuery
    ? sectionTypes.filter((st) =>
        st.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sectionTypes

  // Filter existing sections by search query
  const filteredSections = searchQuery
    ? sortedSections.filter((section) => {
        const st = sectionTypes.find((t) => t.type === section.type)
        return st?.label.toLowerCase().includes(searchQuery.toLowerCase())
      })
    : sortedSections

  return (
    <div className="h-full flex flex-col">
      {/* Search */}
      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sections…"
            className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50"
          />
        </div>
      </div>

      {/* Add Section Buttons */}
      <div className="p-3 border-b border-gray-200">
        <h2 className="font-semibold text-gray-900 mb-2 text-sm">Add Section</h2>
        <div className="space-y-1">
          {filteredSectionTypes.map((st) => {
            const IconComponent = st.icon
            return (
              <button
                key={st.type}
                onClick={() => onAddSection(st.type)}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-sm bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                <IconComponent className="w-4 h-4" />
                <span>Add {st.label}</span>
              </button>
            )
          })}
          {filteredSectionTypes.length === 0 && (
            <p className="text-xs text-gray-400 text-center py-2">No matching sections</p>
          )}
        </div>
      </div>

      {/* Section List */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-gray-900 text-sm">Sections</h2>
          <span className="text-xs text-gray-400">{sections.length} total</span>
        </div>
        {filteredSections.length === 0 ? (
          <div className="text-center text-gray-500 text-sm py-8">
            {searchQuery ? (
              <p>No sections matching "{searchQuery}"</p>
            ) : (
              <>
                <p>No sections yet</p>
                <p className="text-xs mt-1">Add a section above</p>
              </>
            )}
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={filteredSections.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-1.5">
                {filteredSections.map((section) => (
                  <SectionItem
                    key={section.id}
                    section={section}
                    isSelected={selectedSectionId === section.id}
                    onSelect={() => onSelectSection(section.id)}
                    onToggleEnabled={(e) => handleToggleEnabled(section.id, e)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  )
}

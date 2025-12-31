import type { Section, SectionType } from '@/interfaces/Portfolio'
import { Plus, GripVertical } from 'lucide-react'
import { useSortable } from '@dnd-kit/sortable'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { usePortfolioStore } from '@/store/portfolio.store'

interface SectionSidebarProps {
  sections: Section[]
  selectedSectionId: string | null
  onSelectSection: (id: string) => void
  onAddSection: (type: SectionType) => void
}

const sectionTypes: { type: SectionType; label: string; icon: string }[] = [
  { type: 'hero', label: 'Hero', icon: '🎯' },
  { type: 'about', label: 'About', icon: '👤' },
  { type: 'projects', label: 'Projects', icon: '💼' },
  { type: 'skills', label: 'Skills', icon: '🛠️' },
  { type: 'experience', label: 'Experience', icon: '📅' },
  { type: 'contact', label: 'Contact', icon: '📧' },
]

function SectionItem({ section, isSelected, onSelect }: { section: Section; isSelected: boolean; onSelect: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: section.id,
  })

  const style = {
    transform: transform ? `translateY(${transform.y}px)` : undefined,
    transition,
  }

  const sectionType = sectionTypes.find((st) => st.type === section.type)

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onSelect}
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
        isSelected ? 'bg-indigo-50 border-2 border-indigo-500' : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
      }`}
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
        <GripVertical className="w-4 h-4 text-gray-400" />
      </div>
      <span className="text-xl">{sectionType?.icon || '📄'}</span>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm text-gray-900 truncate">
          {sectionType?.label || section.type}
        </div>
        <div className="text-xs text-gray-500">Variant {section.variant}</div>
      </div>
      {!section.enabled && (
        <span className="text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded">Disabled</span>
      )}
    </div>
  )
}

export function SectionSidebar({ sections, selectedSectionId, onSelectSection, onAddSection }: SectionSidebarProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id)
      const newIndex = sections.findIndex((s) => s.id === over.id)
      usePortfolioStore.getState().reorderSections(oldIndex, newIndex)
    }
  }

  const sortedSections = [...sections].sort((a, b) => a.order - b.order)

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-900 mb-3">Sections</h2>
        <div className="space-y-2">
          {sectionTypes.map((st) => (
            <button
              key={st.type}
              onClick={() => onAddSection(st.type)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add {st.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {sortedSections.length === 0 ? (
          <div className="text-center text-gray-500 text-sm py-8">
            <p>No sections yet</p>
            <p className="text-xs mt-1">Add a section above</p>
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={sortedSections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {sortedSections.map((section) => (
                  <SectionItem
                    key={section.id}
                    section={section}
                    isSelected={selectedSectionId === section.id}
                    onSelect={() => onSelectSection(section.id)}
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


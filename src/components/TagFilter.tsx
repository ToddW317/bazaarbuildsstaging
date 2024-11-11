'use client'

interface TagFilterProps {
  selectedTags: string[]
  onTagSelect: (tag: string) => void
  availableTags: string[]
}

export default function TagFilter({ selectedTags, onTagSelect, availableTags }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {availableTags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagSelect(tag)}
          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
            selectedTags.includes(tag)
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          #{tag}
        </button>
      ))}
    </div>
  )
} 
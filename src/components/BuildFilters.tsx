'use client'

import { BuildType } from '@/types/types'
import { HEROES } from '@/config/heroes'
import { useState } from 'react'

interface FiltersState {
  hero: string
  buildType: BuildType | ''
  difficulty: 'Easy' | 'Medium' | 'Hard' | ''
  sortBy: string
  tags: string[]
  searchTag: string
}

interface BuildFiltersProps {
  filters: FiltersState
  setFilters: (filters: FiltersState) => void
  availableTags: string[]
}

export default function BuildFilters({ filters, setFilters, availableTags }: BuildFiltersProps) {
  const [tagInput, setTagInput] = useState('')

  const handleTagSearch = (input: string) => {
    setTagInput(input)
    setFilters({
      ...filters,
      searchTag: input.toLowerCase()
    })
  }

  const filteredTags = availableTags.filter(tag => 
    tag.toLowerCase().includes(filters.searchTag.toLowerCase())
  )

  return (
    <div className="space-y-4 mb-8">
      <div className="flex flex-wrap gap-4">
        <select
          value={filters.hero}
          onChange={(e) => setFilters({ ...filters, hero: e.target.value })}
          className="p-2 border rounded-lg min-w-[150px]"
        >
          <option value="">All Heroes</option>
          {HEROES.map(hero => (
            <option key={hero.id} value={hero.id}>
              {hero.name}
            </option>
          ))}
        </select>

        <select
          value={filters.buildType}
          onChange={(e) => setFilters({ ...filters, buildType: e.target.value as BuildType | '' })}
          className="p-2 border rounded-lg min-w-[150px]"
        >
          <option value="">All Build Types</option>
          <option value="Aggro">Aggro</option>
          <option value="Shield">Shield</option>
          <option value="Health">Health</option>
        </select>

        <select
          value={filters.difficulty}
          onChange={(e) => setFilters({ ...filters, difficulty: e.target.value as 'Easy' | 'Medium' | 'Hard' | '' })}
          className="p-2 border rounded-lg min-w-[150px]"
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <select
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
          className="p-2 border rounded-lg min-w-[150px]"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="mostLiked">Most Liked</option>
          <option value="leastLiked">Least Liked</option>
        </select>
      </div>

      {/* Tag Search and Filter */}
      <div className="space-y-2">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => handleTagSearch(e.target.value)}
          placeholder="Search tags..."
          className="p-2 border rounded-lg w-full"
        />
        
        {tagInput && filteredTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {filteredTags.map(tag => (
              <button
                key={tag}
                onClick={() => {
                  if (!filters.tags.includes(tag)) {
                    setFilters({
                      ...filters,
                      tags: [...filters.tags, tag]
                    })
                  }
                  setTagInput('')
                }}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm"
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        {/* Selected Tags */}
        {filters.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {filters.tags.map(tag => (
              <span
                key={tag}
                className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                #{tag}
                <button
                  onClick={() => setFilters({
                    ...filters,
                    tags: filters.tags.filter(t => t !== tag)
                  })}
                  className="text-blue-500 hover:text-blue-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 
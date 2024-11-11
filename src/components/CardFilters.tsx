'use client'

import { useState, useEffect } from 'react'
import { Search, Filter } from 'lucide-react'

interface CardFiltersProps {
  onFilterChange: (filters: {
    search: string;
    tags: string[];
    heroes: string[];
    tiers: string[];
  }) => void;
  availableTags: string[];
  availableHeroes: string[];
  availableTiers: string[];
}

export default function CardFilters({ 
  onFilterChange, 
  availableTags, 
  availableHeroes,
  availableTiers 
}: CardFiltersProps) {
  const [search, setSearch] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedHeroes, setSelectedHeroes] = useState<string[]>([])
  const [selectedTiers, setSelectedTiers] = useState<string[]>([])
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  useEffect(() => {
    onFilterChange({
      search,
      tags: selectedTags,
      heroes: selectedHeroes,
      tiers: selectedTiers
    })
  }, [search, selectedTags, selectedHeroes, selectedTiers])

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search cards..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg text-white placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Filters Toggle */}
      <button
        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <Filter className="w-4 h-4" />
        <span>Filters</span>
      </button>

      {/* Filter Options */}
      {isFiltersOpen && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-800 rounded-lg">
          {/* Heroes Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">Heroes</h3>
            <div className="space-y-2">
              {availableHeroes.map(hero => (
                <label key={hero} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedHeroes.includes(hero)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedHeroes([...selectedHeroes, hero])
                      } else {
                        setSelectedHeroes(selectedHeroes.filter(h => h !== hero))
                      }
                    }}
                    className="rounded border-gray-600 text-blue-500 focus:ring-blue-500 bg-gray-700"
                  />
                  <span className="text-gray-300">{hero}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tags Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">Tags</h3>
            <div className="space-y-2">
              {availableTags.map(tag => (
                <label key={tag} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTags([...selectedTags, tag])
                      } else {
                        setSelectedTags(selectedTags.filter(t => t !== tag))
                      }
                    }}
                    className="rounded border-gray-600 text-blue-500 focus:ring-blue-500 bg-gray-700"
                  />
                  <span className="text-gray-300">{tag}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tiers Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">Tiers</h3>
            <div className="space-y-2">
              {availableTiers.map(tier => (
                <label key={tier} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedTiers.includes(tier)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTiers([...selectedTiers, tier])
                      } else {
                        setSelectedTiers(selectedTiers.filter(t => t !== tier))
                      }
                    }}
                    className="rounded border-gray-600 text-blue-500 focus:ring-blue-500 bg-gray-700"
                  />
                  <span className="text-gray-300">{tier}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

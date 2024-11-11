import { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import { getPrefixes } from '@/types/skills'

interface SkillFiltersProps {
  onFilterChange: (filters: {
    search: string
    types: string[]
    levels: number[]
    prefixes: string[]
  }) => void
}

const heroNames: { [key: string]: string } = {
  'DOO': 'Doomsday',
  'JUL': 'Jules',
  'PYG': 'Pygmalien',
  'STE': 'Stelle',
  'VAN': 'Van Daemon'
};

export default function SkillFilters({ onFilterChange }: SkillFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedPrefixes, setSelectedPrefixes] = useState<string[]>([])

  const handleFilterChange = () => {
    onFilterChange({
      search,
      types: [], // Empty array since we removed type filters
      levels: [], // Empty array since we removed level filters
      prefixes: selectedPrefixes
    })
  }

  return (
    <div className="mb-6 space-y-4">
      {/* Search and Filter Toggle */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search skills..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white 
              focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              handleFilterChange()
            }}
          />
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            px-4 py-2 rounded-lg text-white flex items-center gap-2 transition-colors
            ${isOpen 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-gray-800 border border-gray-700 hover:border-blue-500'
            }
          `}
        >
          <Filter size={20} />
          Heroes
        </button>
      </div>

      {/* Hero Filter Section */}
      {isOpen && (
        <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg animate-fadeIn">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {getPrefixes().map((prefix) => (
              <button
                key={prefix}
                onClick={() => {
                  setSelectedPrefixes(
                    selectedPrefixes.includes(prefix)
                      ? selectedPrefixes.filter(p => p !== prefix)
                      : [...selectedPrefixes, prefix]
                  );
                  handleFilterChange();
                }}
                className={`
                  px-3 py-2 rounded-lg text-sm font-medium transition-all
                  flex items-center justify-center gap-2
                  ${selectedPrefixes.includes(prefix)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }
                `}
              >
                {heroNames[prefix]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {selectedPrefixes.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedPrefixes.map((prefix) => (
            <span
              key={prefix}
              className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded-lg text-sm flex items-center gap-1"
            >
              {heroNames[prefix]}
              <button
                onClick={() => {
                  setSelectedPrefixes(selectedPrefixes.filter(p => p !== prefix));
                  handleFilterChange();
                }}
                className="hover:text-white"
              >
                ×
              </button>
            </span>
          ))}
          <button
            onClick={() => {
              setSelectedPrefixes([]);
              handleFilterChange();
            }}
            className="px-2 py-1 text-gray-400 hover:text-white text-sm"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}

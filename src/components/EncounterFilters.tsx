'use client'

import { Search } from 'lucide-react'

interface EncounterFiltersProps {
  search: string
  onSearchChange: (value: string) => void
}

export default function EncounterFilters({ search, onSearchChange }: EncounterFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search encounters..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg text-white placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  )
}

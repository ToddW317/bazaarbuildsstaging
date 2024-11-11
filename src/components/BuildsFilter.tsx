'use client'

import { useState } from 'react'
import { BuildSortOption } from '@/types/types'

interface BuildsFilterProps {
  onSortChange: (sort: BuildSortOption) => void
  onTagSearch: (tag: string) => void
}

export default function BuildsFilter({ onSortChange, onTagSearch }: BuildsFilterProps) {
  const [searchInput, setSearchInput] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onTagSearch(searchInput.toLowerCase())
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by tag..."
            className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded-lg 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
              text-gray-100 placeholder-gray-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg 
              hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      <div className="flex gap-2">
        <select
          onChange={(e) => onSortChange(e.target.value as BuildSortOption)}
          className="p-2 bg-gray-700 border border-gray-600 rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
            text-gray-100"
        >
          <option value="newest">Newest</option>
          <option value="popular">Most Liked</option>
          <option value="mostViewed">Most Viewed</option>
          <option value="topRated">Top Rated</option>
        </select>
      </div>
    </div>
  )
} 
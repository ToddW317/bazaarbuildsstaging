'use client'

import { HEROES } from '@/config/heroes'
import { BuildSortOption, BuildType } from '@/types/types'

interface BuildsFilterSidebarProps {
  onSortChange: (sort: BuildSortOption) => void
  onTagSearch: (tag: string) => void
  onHeroFilter: (hero: string | null) => void
  onBuildTypeFilter: (type: string | null) => void
  onDifficultyFilter: (difficulty: string | null) => void
  onSearch: (search: string) => void
  searchValue: string
  activeFilters: {
    hero: string | null
    buildType: string | null
    difficulty: string | null
    tag: string
    sort: BuildSortOption
  }
  className?: string
}

export default function BuildsFilterSidebar({
  onSortChange,
  onTagSearch,
  onHeroFilter,
  onBuildTypeFilter,
  onDifficultyFilter,
  onSearch,
  searchValue,
  activeFilters,
  className = ''
}: BuildsFilterSidebarProps) {
  return (
    <div className={`bg-gray-800 rounded-lg p-4 ${className}`}>
      {/* Search Bar */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-3">Search</h3>
        <div className="relative">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search by title or tags..."
            className="w-full p-2 pl-8 bg-gray-700 border border-gray-600 rounded-lg 
              text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Sort Options */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-3">Sort By</h3>
        <select
          value={activeFilters.sort}
          onChange={(e) => onSortChange(e.target.value as BuildSortOption)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg 
            text-gray-100 focus:ring-2 focus:ring-blue-500"
        >
          <option value="newest">Newest</option>
          <option value="popular">Most Popular</option>
          <option value="mostViewed">Most Viewed</option>
          <option value="topRated">Top Rated</option>
        </select>
      </div>

      {/* Hero Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-3">Hero</h3>
        <select
          value={activeFilters.hero || ''}
          onChange={(e) => onHeroFilter(e.target.value || null)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg 
            text-gray-100 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Heroes</option>
          {Object.entries(HEROES).map(([id, hero]) => (
            <option key={id} value={id}>{hero.name}</option>
          ))}
        </select>
      </div>

      {/* Build Type Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-3">Build Type</h3>
        <select
          value={activeFilters.buildType || ''}
          onChange={(e) => onBuildTypeFilter(e.target.value || null)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg 
            text-gray-100 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Types</option>
          <option value="Aggro">Aggro</option>
          <option value="Control">Control</option>
          <option value="Midrange">Midrange</option>
        </select>
      </div>

      {/* Difficulty Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-3">Difficulty</h3>
        <select
          value={activeFilters.difficulty || ''}
          onChange={(e) => onDifficultyFilter(e.target.value || null)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg 
            text-gray-100 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {/* Tag Search */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Search by Tag</h3>
        <input
          type="text"
          value={activeFilters.tag}
          onChange={(e) => onTagSearch(e.target.value)}
          placeholder="Enter tag..."
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg 
            text-gray-100 focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  )
} 
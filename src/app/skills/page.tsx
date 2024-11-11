'use client'

import { useState } from 'react'
import { skills } from '@/data/skills.js'
import SkillCard from '@/components/skills/SkillCard'
import SkillFilters from '@/components/skills/SkillFilters'
import { getSkillPrefix } from '@/types/skills'

const ITEMS_PER_PAGE = 15

export default function SkillsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    search: '',
    types: [] as string[],
    levels: [] as number[],
    prefixes: [] as string[]
  })

  const filteredSkills = skills.filter(skill => {
    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      const skillName = skill.name.toLowerCase()
      const skillDescription = (skill.description || '').toLowerCase()
      
      if (!skillName.includes(searchTerm) && !skillDescription.includes(searchTerm)) {
        return false
      }
    }

    // Apply prefix (hero) filter
    if (filters.prefixes.length > 0) {
      const prefix = getSkillPrefix(skill.name)
      if (!prefix || !filters.prefixes.includes(prefix)) {
        return false
      }
    }

    return true
  })

  const totalPages = Math.ceil(filteredSkills.length / ITEMS_PER_PAGE)
  const paginatedSkills = filteredSkills.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // Reset to first page when filters change
  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Skills</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Browse all available skills in The Bazaar. Each skill provides unique advantages and can be crucial to your strategy.
          </p>
          <div className="mt-4 text-gray-400">
            Showing {paginatedSkills.length} of {filteredSkills.length} skills
          </div>
        </div>

        <SkillFilters onFilterChange={handleFilterChange} />

        {filteredSkills.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p className="text-xl">No skills found matching your filters</p>
            <button 
              onClick={() => handleFilterChange({
                search: '',
                types: [],
                levels: [],
                prefixes: []
              })}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedSkills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded ${
                    currentPage === 1
                      ? 'bg-gray-700 text-gray-500'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded ${
                      currentPage === i + 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded ${
                    currentPage === totalPages
                      ? 'bg-gray-700 text-gray-500'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
} 
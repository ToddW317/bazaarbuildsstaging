'use client'

import { useState, useMemo } from 'react'
import encounterData from '@/data/out.json'
import CardDisplay from '@/components/CardDisplay'
import CardFilters from '@/components/CardFilters'
import { Item } from '@/types/encounters'
import { ChevronDown } from 'lucide-react'
import EnchantmentsDisplay from '@/components/EnchantmentsDisplay'

export default function CardsPage() {
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [currentPage, setCurrentPage] = useState(1)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Get all items with proper image mapping
  const allItems = Object.entries(encounterData.items as unknown as Record<string, Item>)
    .map(([id, item]) => {
      const completeItem: Item = {
        ...item,
        id,
        images: [],
        InternalName: item.ArtKey 
          ? ((encounterData.items as any)[item.ArtKey]?.InternalName || item.InternalName)
          : item.InternalName
      };
      return completeItem;
    })
    .filter(item => !item.InternalName.includes('[DEBUG]'))
    .sort((a, b) => a.InternalName.localeCompare(b.InternalName));

  // Filter state
  const [filteredItems, setFilteredItems] = useState(allItems)

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Filter handler
  const handleFilterChange = ({
    search,
    tags,
    heroes,
    tiers
  }: {
    search: string;
    tags: string[];
    heroes: string[];
    tiers: string[];
  }) => {
    let filtered = allItems

    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(item => 
        item.InternalName.toLowerCase().includes(searchLower)
      )
    }

    if (tags.length > 0) {
      filtered = filtered.filter(item =>
        tags.every(tag => item.Tags.includes(tag))
      )
    }

    if (heroes.length > 0) {
      filtered = filtered.filter(item =>
        heroes.some(hero => item.Heroes.includes(hero))
      )
    }

    if (tiers.length > 0) {
      filtered = filtered.filter(item =>
        tiers.some(tier => Object.keys(item.Tiers).includes(tier))
      )
    }

    setFilteredItems(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }

  const itemsPerPageOptions = [25, 50, 100]

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: "1920px" }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Cards</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Browse all available cards in The Bazaar. Each card provides unique advantages and can be crucial to your strategy.
          </p>
        </div>

        <EnchantmentsDisplay />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Cards</h1>
          <div className="flex justify-between items-center mb-4">
            <div className="text-gray-400">
              Showing {paginatedItems.length} of {filteredItems.length} cards
            </div>
            
            {/* Items per page dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 
                  rounded-lg text-white hover:bg-gray-700 transition-colors"
              >
                {itemsPerPage} per page
                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 py-2 w-40 bg-gray-800 border border-gray-700 
                  rounded-lg shadow-lg z-10">
                  {itemsPerPageOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setItemsPerPage(option)
                        setIsDropdownOpen(false)
                        setCurrentPage(1)
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors
                        ${itemsPerPage === option ? 'text-blue-400' : 'text-white'}`}
                    >
                      {option} per page
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <CardFilters
            onFilterChange={handleFilterChange}
            availableTags={Array.from(new Set(allItems.flatMap(item => item.Tags)))}
            availableHeroes={Array.from(new Set(allItems.flatMap(item => item.Heroes)))}
            availableTiers={Array.from(new Set(allItems.flatMap(item => Object.keys(item.Tiers))))}
          />
        </div>
        
        {/* Updated grid layout with max 5 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {paginatedItems.map((item) => (
            <CardDisplay 
              key={item.id}
              item={item} 
              itemId={item.id!} 
            />
          ))}
        </div>

        {/* Pagination Controls */}
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
      </div>
    </div>
  )
}
